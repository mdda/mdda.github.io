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

Building `TensorFlow` needs several preparatory steps  :

*  Create a ```virtualenv``` so that Python knows which version it's building for
*  Set up the defaults correctly (some CLI interaction)
*  Build a ```pip``` package with ```bazel``` (iterate to fix the problems...)
*  Install the ```pip``` package


#### Set up Python : ```python-3.7 virtualenv```

NB: Do this outside the eventual `tensorflow` souce tree:

{% highlight bash %}
virtualenv-3.7 --system-site-packages ~/env37
. ~/env37/bin/activate
{% endhighlight %}


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
wget https://github.com/bazelbuild/bazelisk/releases/download/v1.1.0/bazelisk-linux-amd64
mv bazelisk-linux-amd64 ~/env37/bin/bazel
chmod 754 ~/env37/bin/bazel

# Seems to unpack stuff..

USE_BAZEL_VERSION=0.29.1
export USE_BAZEL_VERSION

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


#### ```./configure``` machine compilation defaults

The following is the commandline configuration equivalent to 
answering a lot of in-line questions (which cannot be automated) :

{% highlight bash %}
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
#7.5 2070S
export TF_CUDA_COMPUTE_CAPABILITIES=5.2,6.1,7.5  # TitanX, 1060 and 2070

export TF_CUDA_CLANG=0
export GCC_HOST_COMPILER_PATH=`which gcc`
export CC_OPT_FLAGS="-march=native -Wno-sign-compare"
export TF_SET_ANDROID_WORKSPACE=0

./configure
{% endhighlight %}






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

