---
layout: post
category: AI
title: TensorFlow from source on Fedora 26
tagline: Should be easy
date: 2017-08-30
tags: [TensorFlow,Fedora]
published: false
---
{% include JB/setup %}


https://jasonqsy.github.io/compile-tensorflow-with-gpu-support-on-fedora.html


## ```TensorFlow``` from source

"This should be easy" = Famous last words...  We'll see.


### Prepare the system packages

As ```root``` :
{% highlight bash %}

{% endhighlight %}



### Prepare the user set-up

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


As a regular user :




{% highlight bash %}
git clone https://github.com/tensorflow/tensorflow   # Downloads ~120Mb

cd tensorflow

{% endhighlight %}

### Build

As a regular user :

{% highlight bash %}
git clone https://github.com/tensorflow/tensorflow   # Downloads ~120Mb

cd tensorflow
{% endhighlight %}


### ```python-3.6 virtualenv```

{% highlight bash %}
virtualenv-3.6 --system-site-packages env3
. ./env3/bin/activate
{% endhighlight %}


### ```./configure``` machine compilation defaults

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

### ```bazel``` build TF

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


Magic fix : 
  * https://stackoverflow.com/questions/40373686/freeze-graph-py-throws-an-error-during-build/40374431#40374431
  * https://github.com/tensorflow/serving/issues/6
  * https://github.com/grpc/grpc/issues/10843
 
{% highlight bash %}
bazel build -c O --config=opt //tensorflow/tools/pip_package:build_pip_package
23:40 ... 01:10 
# INFO: Elapsed time: 5218.471s, Critical Path: 86.01s
{% endhighlight %}

### Test the install

{% highlight bash %}

{% endhighlight %}

### Test the install

{% highlight bash %}

{% endhighlight %}

### Test the install

{% highlight bash %}

{% endhighlight %}

### Test the install

{% highlight python %}
{% endhighlight %}

