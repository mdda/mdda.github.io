---
layout: post
category: AI
title: TensorFlow from source on Fedora 26
tagline: Should be easy
date: 2017-08-30
tags: [TensorFlow,Fedora,Python]
published: true
---
{% include JB/setup %}


## ```TensorFlow``` from source

"This should be easy" = Famous last words...  We'll see.

I used this [very helpful guide](https://jasonqsy.github.io/compile-tensorflow-with-gpu-support-on-fedora.html)
but with the following differences :

  *  This was a laptop install, so no GPU required
  *  The ```gcc``` version issues discussed in the helpful guide above are really a CUDA problem.  
  *  Since I use the negativo Nvidia repo to deal with this, 
     these compilation tweaks would have already been taken care of if I were using a GPU
  *  Anaconda didn't seem necessary


### Prepare the system packages

As ```root``` :
{% highlight bash %}
# Actually nothing new required...
{% endhighlight %}


### Prepare user-land set-up

#### ```bazel``` installation

As a regular user :

{% highlight bash %}

wget https://github.com/bazelbuild/bazel/releases/download/0.5.4/bazel-0.5.4-installer-linux-x86_64.sh
# This downloads 185Mb of ...

chmod +x bazel-0.5.4-installer-linux-x86_64.sh 

# This will install it to ~/bin/ which is Ok, since 
# ```which missing-binary``` shows is in that path
./bazel-0.5.4-installer-linux-x86_64.sh --user 

# Seems to unpack stuff..

bazel version

#Build label: 0.5.4
#Build target: bazel-out/local-fastbuild/bin/src/main/java/com/google/devtools/build/lib/bazel/BazelServer_deploy.jar
#Build time: Fri Aug 25 10:00:00 2017 (1503655200)
{% endhighlight %}


#### Download ```tensorflow```

As a regular user :

{% highlight bash %}
git clone https://github.com/tensorflow/tensorflow   # Downloads ~120Mb

cd tensorflow
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

