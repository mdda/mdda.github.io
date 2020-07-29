---
layout: post
category: AI
title: TensorFlow 2.3 from source on Fedora 32
tagline: Actually worked
date: 2020-07-29
tags: [TensorFlow,Fedora,Python]
published: false
---
{% include JB/setup %}


## ```TensorFlow 2.3``` from source

### Check the nvidia packages

The drive for building from source was that : 

* my Nvidia Titan X (Maxwell) GPU has a Compute Capability of 5.2, which is no longer supported by prebuilt TensorFlow.
* `Negativo` (my preferred Nvidia driver repo) had moved its `cuda` version on from 10.0 to 10.2.

The following `rpm` packages are required (your versions may differ, 
but the packages should be there).  As ```root``` :

{% highlight bash %}
dnf config-manager --add-repo=https://negativo17.org/repos/fedora-nvidia.repo
dnf install cuda cuda-devel cuda-cudnn-devel nvidia-driver-cuda
dnf install cuda-gcc cuda-gcc-c++ cuda-gcc-gfortran
# Install this - will be made use of if detected
dnf install blas-devel




# https://github.com/negativo17/cuda
rpm -qa | grep nvidia-driver-devel
nvidia-driver-devel-440.31-3.fc30.x86_64
rpm -qa | grep cuda-devel
cuda-devel-10.1.243-1.fc30.x86_64
rpm -qa | grep cuda-cudnn-devel
cuda-cudnn-devel-7.6.4.38-2.fc30.x86_64

{% endhighlight %}




### Prepare user-land set-up

Building `TensorFlow` needs several preparatory steps  :

*  Create a ```virtualenv``` so that Python knows which version it's building for
*  Set up the defaults correctly (some CLI interaction)
*  Build a ```pip``` package with ```bazel``` (iterate to fix the problems...)
*  Install the ```pip``` package


#### Set up Python : ```python-3.8 virtualenv```

NB: Do this outside the eventual `tensorflow` souce tree:

{% highlight bash %}
virtualenv-3.7 --system-site-packages ~/env37
. ~/env37/bin/activate
{% endhighlight %}


#### ```virtualenv``` set-up

{% highlight bash %}
# https://www.tensorflow.org/install/source 
##pip install -U pip six numpy wheel setuptools mock 'future>=0.17.1'
pip install -U pip six 'numpy<1.19.0' wheel setuptools mock 'future>=0.17.1'
pip install -U keras_applications --no-deps
pip install -U keras_preprocessing --no-deps
{% endhighlight %}


#### Download ```tensorflow``` at a specific release

As a regular user :

{% highlight bash %}
git clone https://github.com/tensorflow/tensorflow.git
cd tensorflow/

# https://github.com/tensorflow/tensorflow/releases
git checkout v2.3.0
{% endhighlight %}


#### ```bazel``` installation via ```bazelisk```

As a regular user, make `bazelisk` available and invocable as `bazel` :

{% highlight bash %}
# https://github.com/bazelbuild/bazelisk
#   5.9Mb download
wget https://github.com/bazelbuild/bazelisk/releases/download/v1.1.0/bazelisk-linux-amd64  
mv bazelisk-linux-amd64 ~/env38/bin/bazel
chmod 754 ~/env38/bin/bazel

# Seems to unpack stuff..

# Check the version required:
grep _BAZEL_VERSION tensorflow/configure.py

#USE_BAZEL_VERSION=0.29.1
USE_BAZEL_VERSION=3.4.1
export USE_BAZEL_VERSION

bazel version

#Build label: 3.4.1
#Build target: bazel-out/k8-opt/bin/src/main/java/com/google/devtools/build/lib/bazel/BazelServer_deploy.jar
#Build time: Tue Jul 14 06:27:53 2020 (1594708073)
{% endhighlight %}


#### ```./configure``` machine compilation defaults

The following is the command-line configuration equivalent to 
answering a lot of in-line questions (which resist being automated otherwise) :

{% highlight bash %}
# https://github.com/tensorflow/tensorflow/issues/7542#issue-207940753
export PYTHON_BIN_PATH=`which python`
export PYTHON_LIB_PATH=`dirname \`which python\``/../lib/python3.8/site-packages

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
export TF_CUDA_COMPUTE_CAPABILITIES=5.2  # TitanX
#export TF_CUDA_COMPUTE_CAPABILITIES=5.2,6.1,7.5  # TitanX, 1060 and 2070

export TF_CUDA_CLANG=0
export GCC_HOST_COMPILER_PATH=`which gcc`
export CC_OPT_FLAGS="-march=native -Wno-sign-compare"
export TF_SET_ANDROID_WORKSPACE=0

./configure

#You have bazel 3.4.1 installed.
#Found CUDA 10.2 in:
#    /usr/lib64
#    /usr/include/cuda
#Found cuDNN 7 in:
#    /usr/lib64
#    /usr/include/cuda

{% endhighlight %}


#### ( Fixes required to successfully compile )




Fix an apparent mistake (surely not??) in the `bazel` configuration :

{% highlight bash %}
## Manual method :
#joe ./third_party/gpus/cuda_configure.bzl  L621 :: stub="" # always

## Reproducible method :
mkdir -p /usr/lib64/stubs/
ln -s /usr/lib64/libcuda.so /usr/lib64/stubs/libcuda.so
ls -l  /usr/lib64/stubs/

{% endhighlight %}

>  No library found under: /usr/lib64/stubs/libcuda.so
>    https://github.com/negativo17/cuda/issues/18
>      https://github.com/tensorflow/tensorflow/issues/29797
    




Fix the `gcc` version to make it compatible with `cuda` :

{% highlight bash %}
## Bad method :
#joe /usr/include/cuda/crt/host_config.h  L138 ::  >8 -> >18

## Better methods (requires `dnf install cuda-gcc ...` from above
pushd /usr/local/bin/
ln -s /usr/bin/cuda-gcc gcc
ln -s /usr/bin/cuda-g++ g++
ln -s /usr/bin/cuda-gcc-gfortran gcc-gfortran
popd 


AFTER: 

pushd /usr/local/bin/
rm gcc g++ gcc-gfortran
popd 

{% endhighlight %}



#### ```bazel``` build the ```pip``` package (builds ```tensorflow``` too)


This took over 4 hours (when it worked cleanly) on an 8-thread i7 machine 
(with 16GB memory and codebase on SSD): 

{% highlight bash %}
bazel build //tensorflow/tools/pip_package:build_pip_package
#INFO: Elapsed time: 15012.545s, Critical Path: 358.50s
#INFO: 24110 processes: 24110 local.
#INFO: Build completed successfully, 35202 total actions
## 15012sec ~= 4h10m
{% endhighlight %}



#### Build the ```pip whl``` package itself

This creates the 'wheel' in ```/tmp/tensorflow_pkg```, and then installs it into the ```env37``` :

{% highlight bash %}
./bazel-bin/tensorflow/tools/pip_package/build_pip_package ./tensorflow_pkg
# Takes ~1 minute, creates a 205MB whl file in ./tensorflow_pkg

pip install -U ./tensorflow_pkg/tensorflow-*.whl  
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

