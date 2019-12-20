---
layout: post
category: AI
title: TensorFlow 2.1 from source on Fedora 30
tagline: Actually worked
date: 2019-12-04
tags: [TensorFlow,Fedora,Python]
published: false
---
{% include JB/setup %}


## ```TensorFlow 2.1``` from source

### Check the nvidia packages

The drive for building from source was that Negativo (my preferred Nvidia driver repo)
had moved its `cuda` version on from 10.0 to 10.1

As ```root``` :
{% highlight bash %}
# https://github.com/negativo17/cuda
rpm -qa | grep nvidia-driver-devel
nvidia-driver-devel-440.31-3.fc30.x86_64
rpm -qa | grep cuda-devel
cuda-devel-10.1.243-1.fc30.x86_64
rpm -qa | grep cuda-cudnn-devel
cuda-cudnn-devel-7.6.4.38-2.fc30.x86_64

# Install this - will be made use of
dnf install blas-devel
{% endhighlight %}



# https://github.com/tensorflow/tensorflow/issues/7542#issue-207940753
export PYTHON_BIN_PATH=`which python`
export PYTHON_LIB_PATH=`dirname \`which python\``/../lib/python3.7/site-packages
export TF_ENABLE_XLA=1
export TF_NEED_CUDA=1
export TF_NEED_TENSORRT=0
export TF_NEED_OPENCL=0
export TF_NEED_OPENCL_SYCL=0
export TF_NEED_ROCM=0
export TF_NEED_HDFS=0
#https://en.wikipedia.org/wiki/CUDA
#5.2	Titan X (Maxwell)
#6.1 1060
#7.5 2070Sexport TF_CUDA_COMPUTE_CAPABILITIES=5.2,6.1,7.5  # TitanX, 1060 and 2070
export TF_CUDA_CLANG=0
export GCC_HOST_COMPILER_PATH=`which gcc`
export CC_OPT_FLAGS="-march=native -Wno-sign-compare"
export TF_SET_ANDROID_WORKSPACE=0
./configure
....  /usr/include/cuda/,/usr/lib64/,/usr/bin/  NOPE
dnf install cuda-cudnn-devel
....  /usr/  # defaults work (move away cuda-10.0 and cuda-9.x from search path)
dnf install nvidia-driver-devel-440.31-3
scite ./third_party/gpus/cuda_configure.bzl  L621 :: stub="" # always
scite /usr/include/cuda/crt/host_config.h  L138 ::  >8 -> >18
# 29.0k actions + extra
bazel build //tensorflow/tools/pip_package:build_pip_package
./bazel-bin/tensorflow/tools/pip_package/build_pip_package ~/tmp/tensorflow_pkg
pip install -U ~/tmp/tensorflow_pkg/tensorflow-2.1.0rc0-cp37-cp37m-linux_x86_64.whl


### Prepare user-land set-up

#### ```virtualenv``` set-up

{% highlight bash %}
# https://www.tensorflow.org/install/source 
pip install -U pip six numpy wheel setuptools mock 'future>=0.17.1'
pip install -U keras_applications --no-deps
pip install -U keras_preprocessing --no-deps
{% endhighlight %}


#### ```bazel``` installation via ```bazelisk```

As a regular user :

{% highlight bash %}
# https://github.com/bazelbuild/bazelisk
USE_BAZEL_VERSION=0.29.1 bazel
export USE_BAZEL_VERSION
wget https://github.com/bazelbuild/bazelisk/releases/download/v1.1.0/bazelisk-linux-amd64
mv bazelisk-linux-amd64 ~/env37/bin/bazel
chmod 754 ~/env37/bin/bazel

# Seems to unpack stuff..

bazel version

#Build label: 0.5.4
#Build target: bazel-out/local-fastbuild/bin/src/main/java/com/google/devtools/build/lib/bazel/BazelServer_deploy.jar
#Build time: Fri Aug 25 10:00:00 2017 (1503655200)
{% endhighlight %}


#### Download ```tensorflow``` at a specific release

As a regular user :

{% highlight bash %}
git clone https://github.com/tensorflow/tensorflow.git
cd tensorflow/

# https://github.com/tensorflow/tensorflow/releases
git checkout v2.1.0-rc0
{% endhighlight %}


### Build ```tensorflow```

This needs several preparatory steps  :

*  Create a ```virtualenv``` so that Python knows which version it's building for
*  Set up the defaults correctly (some CLI interaction)
*  Build a ```pip``` package with ```bazel``` (iterate to fix the problems...)
*  Install the ```pip``` package


#### Set up Python : ```python-3.6 virtualenv```

I did this in the repo base directory itself.  That may have been an unhelpful choice,
since (later) I found that I couldn't use ```import tensorflow``` there, since
the repo itself has a ```tensorflow/__init__.py``` which seems to take priority.  OTOH,
this doesn't stop me using the newly built ```tensorflow``` anywhere else...

{% highlight bash %}
virtualenv-3.6 --system-site-packages env3
. ./env3/bin/activate
{% endhighlight %}


#### ```./configure``` machine compilation defaults

(All default options apart from adding XLA support) :

{% highlight bash %}
./configure

You have bazel 0.5.4 installed.
Please specify the location of python. 
[Default is /home/andrewsm/OpenSource/tensorflow/env3/bin/python]: 

Traceback (most recent call last):
  File "<string>", line 1, in <module>
AttributeError: module 'site' has no attribute 'getsitepackages'
Found possible Python library paths:
  /home/andrewsm/OpenSource/tensorflow/env3/lib/python3.6/site-packages

Please input the desired Python library path to use.  
Default is [/home/andrewsm/OpenSource/tensorflow/env3/lib/python3.6/site-packages]

Do you wish to build TensorFlow with jemalloc as malloc support? [Y/n]: 
jemalloc as malloc support will be enabled for TensorFlow.

Do you wish to build TensorFlow with Google Cloud Platform support? [y/N]: 
No Google Cloud Platform support will be enabled for TensorFlow.

Do you wish to build TensorFlow with Hadoop File System support? [y/N]: 
No Hadoop File System support will be enabled for TensorFlow.

Do you wish to build TensorFlow with XLA JIT support? [y/N]: Y
XLA JIT support will be enabled for TensorFlow.

Do you wish to build TensorFlow with GDR support? [y/N]: 
No GDR support will be enabled for TensorFlow.

Do you wish to build TensorFlow with VERBS support? [y/N]: 
No VERBS support will be enabled for TensorFlow.

Do you wish to build TensorFlow with OpenCL support? [y/N]: 
No OpenCL support will be enabled for TensorFlow.

Do you wish to build TensorFlow with CUDA support? [y/N]: 
No CUDA support will be enabled for TensorFlow.

Do you wish to build TensorFlow with MPI support? [y/N]: 
No MPI support will be enabled for TensorFlow.

Please specify optimization flags to use during compilation 
when bazel option "--config=opt" is specified [Default is -march=native]: 

Add "--config=mkl" to your bazel command to build with MKL support.
Please note that MKL on MacOS or windows is still not supported.
If you would like to use a local MKL instead of downloading, 
please set the environment variable "TF_MKL_ROOT" every time before build.

Configuration finished
{% endhighlight %}


<!--
Please specify the location where CUDA 8.0 toolkit is installed. Refer to README.md for more details. [Default is /usr/local/cuda]: /usr
#... But this then barfs during the build ::
#Cuda Configuration Error: Cannot find cudnn.h under /usr

Please specify the location where CUDA 8.0 toolkit is installed. Refer to README.md for more details. [Default is /usr/local/cuda]:  /usr/include/cuda
#... Problem is that fedora does /usr/XYZ/{include,lib64,...)/
#... Whereas this expects /usr/{include,lib64,...)/XYZ/

# How about faking the default install?
cd /usr/local/
mkdir cuda
cd cuda
ln -s /usr/include/cuda include
ln -s /usr/lib64 .
ln -s /usr/bin .

# find: ‘/usr/local/cuda/nvvm’: No such file or directory
#  but we don't have nvvm anyway...

scite /home/andrewsm/OpenSource/tensorflow/third_party/gpus/cuda_configure.bzl  # ~ line 917

# See : https://en.wikipedia.org/wiki/CUDA
Please note that each additional compute capability significantly increases your build time and binary size. [Default is: 3.5,5.2]5.2


!-->

#### ```bazel``` build the ```pip``` package (builds ```tensorflow``` too)

This took over an hour (even when it worked cleanly) : 

{% highlight bash %}
#bazel build --config=opt --config=cuda //tensorflow/tools/pip_package:build_pip_package
bazel build --config=opt //tensorflow/tools/pip_package:build_pip_package
# Lots of downloads...
# including protobuf, llvm, ...
{% endhighlight %}

{% highlight bash %}
ERROR: /home/andrewsm/.cache/bazel/_bazel_andrewsm/9351d4e112bea0cfc5cadba941a18293/external/boringssl/BUILD:116:1: 
   C++ compilation of rule '@boringssl//:crypto' failed (Exit 1).

In file included from /usr/include/string.h:639:0,
                 from external/boringssl/src/crypto/asn1/a_bitstr.c:59:
In function 'memcpy',
    inlined from 'i2c_ASN1_BIT_STRING' at external/boringssl/src/crypto/asn1/a_bitstr.c:118:5:
/usr/include/bits/string3.h:53:10: error: '__builtin_memcpy': specified size between 18446744071562067968 and 18446744073709551615 exceeds maximum object size 9223372036854775807 [-Werror=stringop-overflow=]

{% endhighlight %}


Magic fix hints: 

  *  [stackoverflow](https://stackoverflow.com/questions/40373686/freeze-graph-py-throws-an-error-during-build/40374431#40374431)
  *  [TF serving](https://github.com/tensorflow/serving/issues/6)
  *  [grpc](https://github.com/grpc/grpc/issues/10843)

Finally iterate to the following (working) command line : 
 
{% highlight bash %}
bazel build -c 0 --config=opt //tensorflow/tools/pip_package:build_pip_package
# 23:40 ... 01:10 
# INFO: Elapsed time: 5218.471s, Critical Path: 86.01s
{% endhighlight %}


A second ```bazel build``` takes 9 seconds to figure out that nothing needs to be recompiled.

A third ```bazel build``` takes 0.5 seconds to figure out that nothing needs to be recompiled.



#### Build the ```pip whl``` package itself

This creates the 'wheel' in ```/tmp/tensorflow_pkg```, and then installs it into the ```env3``` :

{% highlight bash %}
bazel-bin/tensorflow/tools/pip_package/build_pip_package /tmp/tensorflow_pkg

pip install /tmp/tensorflow_pkg/tensorflow-*.whl
{% endhighlight %}



### Size of built code

{% highlight bash %}
du -bh --exclude='env3/*'
# 194Mb  (including all the git history)

du -bh --exclude='.git/*' --exclude='env3/*'
# 69Mb
{% endhighlight %}


### Test the install

You need to use the ```env3``` with the freshly built tensorflow inside it, 
but then move to a directory other than the base repo, since that includes a 'distracting'
```tensorflow/__init__.py``` file.  Then, run ```python``` to get a python prompt, and :

{% highlight python %}
import tensorflow as tf

a = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[2, 3], name='a')
b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[3, 2], name='b')
c = tf.matmul(a, b)

sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))

print(sess.run(c))
{% endhighlight %}

should give you results (slightly reformatted) :

{% highlight python %}
MatMul: (MatMul): /job:localhost/replica:0/task:0/cpu:0
2017-08-31 01:23:54.678983: I tensorflow/core/common_runtime/simple_placer.cc:875] 
  MatMul: (MatMul)/job:localhost/replica:0/task:0/cpu:0

b: (Const): /job:localhost/replica:0/task:0/cpu:0
2017-08-31 01:23:54.679009: I tensorflow/core/common_runtime/simple_placer.cc:875] 
  b: (Const)/job:localhost/replica:0/task:0/cpu:0

a: (Const): /job:localhost/replica:0/task:0/cpu:0
2017-08-31 01:23:54.679021: I tensorflow/core/common_runtime/simple_placer.cc:875] 
  a: (Const)/job:localhost/replica:0/task:0/cpu:0

[[ 22.  28.]
 [ 49.  64.]]
{% endhighlight %}



All Done!

