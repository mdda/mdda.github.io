---
layout: post
category: AI
title: TensorFlow 2.1 from source on Fedora 30
tagline: Actually worked
date: 2019-12-04
tags: [TensorFlow,Fedora,Python]
published: true
---
{% include JB/setup %}


## ```TensorFlow 2.1``` from source

### Check the nvidia packages

The drive for building from source was that `Negativo` (my preferred Nvidia driver repo)
had moved its `cuda` version on from 10.0 to 10.1.

The following `rpm` packages are required (your versions may differ, 
but the packages should be there).  As ```root``` :

{% highlight bash %}
# https://github.com/negativo17/cuda
rpm -qa | grep nvidia-driver-devel
nvidia-driver-devel-440.31-3.fc30.x86_64
rpm -qa | grep cuda-devel
cuda-devel-10.1.243-1.fc30.x86_64
rpm -qa | grep cuda-cudnn-devel
cuda-cudnn-devel-7.6.4.38-2.fc30.x86_64

# Install this - will be made use of if detected
dnf install blas-devel
{% endhighlight %}




### Prepare user-land set-up

Building `TensorFlow` needs several preparatory steps  :

*  Create a ```virtualenv``` so that Python knows which version it's building for
*  Set up the defaults correctly (some CLI interaction)
*  Build a ```pip``` package with ```bazel``` (iterate to fix the problems...)
*  Install the ```pip``` package


#### Set up Python : ```python-3.7 virtualenv```

NB: Do this outside the eventual `tensorflow` source tree:

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

As a regular user, make `bazelisk` available and invocable as `bazel` :

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

The following is the command-line configuration equivalent to 
answering a lot of in-line questions (which resist being automated otherwise) :

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
#  5.2 ~ Titan X (Maxwell)
#  6.1 ~ 1060
#  7.5 ~ 2070S
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
# 29.0k actions + extra
bazel build //tensorflow/tools/pip_package:build_pip_package
{% endhighlight %}


#### ( Fixes required to successfully compile )

Fix an apparent mistake (surely not??) in the `bazel` configuration :

{% highlight bash %}
joe ./third_party/gpus/cuda_configure.bzl  L621 :: stub="" # always
{% endhighlight %}

Fix the `gcc` version detection inside the `cuda` headers :

{% highlight bash %}
joe /usr/include/cuda/crt/host_config.h  L138 ::  >8 -> >18
{% endhighlight %}




#### Build the ```pip whl``` package itself

This creates the 'wheel' in ```/tmp/tensorflow_pkg```, and then installs it into the ```env37``` :

{% highlight bash %}
./bazel-bin/tensorflow/tools/pip_package/build_pip_package ~/tmp/tensorflow_pkg

pip install -U ~/tmp/tensorflow_pkg/tensorflow-2.1.0rc0-cp37-cp37m-linux_x86_64.whl
{% endhighlight %}



### Test the install

Run ```python``` within the `env37` environment to get a python prompt, and :

{% highlight python %}

# See : https://www.tensorflow.org/beta/guide/using_gpu
import tensorflow as tf

tf.debugging.set_log_device_placement(True)

a = tf.constant([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], shape=[2, 3], name='a')
b = tf.constant([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]], shape=[3, 2], name='b')
c = tf.matmul(a, b)

# Eager mode FTW!
print(c)

print(c.device)  # Hope for : /job:localhost/replica:0/task:0/device:GPU:0
{% endhighlight %}

All Done!

