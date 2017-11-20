---
layout: post
category: AI
title: TensorFlow from source on Fedora 27
tagline: Should be easy
date: 2017-11-16
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


##
##Do you wish to build TensorFlow with CUDA support? [y/N]: 
##No CUDA support will be enabled for TensorFlow.
##


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

Please specify the CUDA SDK version you want to use, e.g. 7.0. [Leave empty to default to CUDA 8.0]: 9.0


Please specify the location where CUDA 9.0 toolkit is installed. Refer to README.md for more details. [Default is /usr/local/cuda]: /usr/lib64


Invalid path to CUDA 9.0 toolkit. /usr/lib64/lib64/libcudart.so.9.0 cannot be found
Please specify the CUDA SDK version you want to use, e.g. 7.0. [Leave empty to default to CUDA 8.0]: 9.0


Please specify the location where CUDA 9.0 toolkit is installed. Refer to README.md for more details. [Default is /usr/local/cuda]: /usr    


Please specify the cuDNN version you want to use. [Leave empty to default to cuDNN 6.0]: 


Please specify the location where cuDNN 6 library is installed. Refer to README.md for more details. [Default is /usr]:/usr/include/cuda 


Please specify a list of comma-separated Cuda compute capabilities you want to build with.
You can find the compute capability of your device at: https://developer.nvidia.com/cuda-gpus.
Please note that each additional compute capability significantly increases your build time and binary size. [Default is: 3.5,5.2]


Do you want to use clang as CUDA compiler? [y/N]: 
nvcc will be used as CUDA compiler.

Please specify which gcc should be used by nvcc as the host compiler. [Default is /usr/bin/gcc]: 


Do you wish to build TensorFlow with MPI support? [y/N]: 
No MPI support will be enabled for TensorFlow.

Please specify optimization flags to use during compilation when bazel option "--config=opt" is specified [Default is -march=native]: 


Add "--config=mkl" to your bazel command to build with MKL support.
Please note that MKL on MacOS or windows is still not supported.
If you would like to use a local MKL instead of downloading, please set the environment variable "TF_MKL_ROOT" every time before build.
Configuration finished



(env-tf-master) [andrewsm@simlim tensorflow]$ bazel build --config=opt --config=cuda //tensorflow/tools/pip_package:build_pip_package
........
ERROR: error loading package 'tensorflow/tools/pip_package': Encountered error while reading extension file 'cuda/build_defs.bzl': no such package '@local_config_cuda//cuda': Traceback (most recent call last):
	File "/home/andrewsm/OpenSource/tensorflow/third_party/gpus/cuda_configure.bzl", line 1042
		_create_local_cuda_repository(repository_ctx)
	File "/home/andrewsm/OpenSource/tensorflow/third_party/gpus/cuda_configure.bzl", line 905, in _create_local_cuda_repository
		_get_cuda_config(repository_ctx)
	File "/home/andrewsm/OpenSource/tensorflow/third_party/gpus/cuda_configure.bzl", line 662, in _get_cuda_config
		_cudnn_version(repository_ctx, cudnn_install_base..., ...)
	File "/home/andrewsm/OpenSource/tensorflow/third_party/gpus/cuda_configure.bzl", line 360, in _cudnn_version
		_find_cudnn_header_dir(repository_ctx, cudnn_install_base...)
	File "/home/andrewsm/OpenSource/tensorflow/third_party/gpus/cuda_configure.bzl", line 612, in _find_cudnn_header_dir
		auto_configure_fail(("Cannot find cudnn.h under %s" ...))
	File "/home/andrewsm/OpenSource/tensorflow/third_party/gpus/cuda_configure.bzl", line 129, in auto_configure_fail
		fail(("\n%sCuda Configuration Error:%...)))

Cuda Configuration Error: Cannot find cudnn.h under /
.
INFO: Elapsed time: 1.326s



Please specify the location where CUDA 9.0 toolkit is installed. Refer to README.md for more details. [Default is /usr/local/cuda]: /usr/lib64
Invalid path to CUDA 9.0 toolkit. /usr/lib64/lib64/libcudart.so.9.0 cannot be found
== FAIL

Please specify the CUDA SDK version you want to use, e.g. 7.0. [Leave empty to default to CUDA 8.0]: 9.0
Please specify the location where CUDA 9.0 toolkit is installed. Refer to README.md for more details. [Default is /usr/local/cuda]: /usr    





#more third_party/gpus/cuda_configure.bzl 
Indicates :
cuda_toolkit_path = /usr/bin/  # from location of nvcc
cudnn_install_basedir = /usr/include/cuda/

_find_cudnn_header_dir should return /usr/include/cuda
_find_cudnn_lib_path   should return /usr/lib64

cuda_config.cuda_toolkit_path should be path to /usr/lib64/{libcudart.so.9.0, ...}

/usr/bin/nvcc
/usr/include/cuda/cudnn.h
/usr/lib64/libcudart.so.9.0
/usr/lib64/libcudnn.so.6

Recent card compute capability : 6.1?
My Titan X = 5.2, probably


## Updated .tf_configure.bazelrc :

build --action_env TF_NEED_CUDA="1"
#build --action_env CUDA_TOOLKIT_PATH="/usr/bin"
build --action_env CUDA_TOOLKIT_PATH="/usr"
build --action_env TF_CUDA_VERSION="9.0"
#build --action_env CUDNN_INSTALL_PATH="/lib64"
build --action_env CUDNN_INSTALL_PATH="/usr/include/cuda"
build --action_env TF_CUDNN_VERSION="6"
build --action_env TF_CUDA_COMPUTE_CAPABILITIES="3.5,5.2"
build --action_env TF_CUDA_CLANG="0"
build --action_env GCC_HOST_COMPILER_PATH="/usr/bin/gcc"
build --config=cuda
test --config=cuda

bazel build --config=opt --config=cuda //tensorflow/tools/pip_package:build_pip_package
# Now complains about ```nvvm```


# Download the cuda 9.0 toolkit from 
#   https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&target_distro=Fedora&target_version=25&target_type=runfilelocal
# As root : 
mkdir /root/fedora27-cuda
cd /root/fedora27-cuda
mv /home/andrewsm/Downloads/cuda_9.0.176_384.81_linux.run .
chmod 744 cuda_9.0.176_384.81_linux.run 
./cuda_9.0.176_384.81_linux.run --extract `pwd`
##./cuda-linux.9.0.176-22781540.run --extract cuda-linux.9.0
./cuda-linux.9.0.176-22781540.run -noprompt -nosymlink -prefix=`pwd`/orig


find orig | grep nvvm  # pruned a bit to reduce duplication
./nvvm
./nvvm/lib64
./nvvm/lib64/libnvvm.so.3.2.0
./nvvm/lib64/libnvvm.so
./nvvm/libnvvm-samples/cuda-c-linking/CMakeLists.txt
./nvvm/libnvvm-samples/simple/CMakeLists.txt
./nvvm/libnvvm-samples/ptxgen/CMakeLists.txt
./nvvm/libnvvm-samples/README.txt
./nvvm/libnvvm-samples/common/include/drvapi_error_string.h
./nvvm/libdevice/libdevice.10.bc
./nvvm/bin/cicc
./nvvm/include/nvvm.h
./doc/man/man7/libnvvm.so.7
./doc/html/libnvvm-api/modules.html
./doc/html/nvvm-ir-spec/index.html



Logging to /tmp/cuda-installer-13899
========================================
Please make sure that
 -   PATH includes /root/fedora27-cuda/bin
 -   LD_LIBRARY_PATH includes /root/fedora27-cuda/lib64, or, add /root/fedora27-cuda/lib64 to /etc/ld.so.conf and run ldconfig as root
Please read the release notes in /root/fedora27-cuda/doc/
To uninstall the CUDA Toolkit, run the uninstall script in /root/fedora27-cuda/bin
Installation Complete




dnf remove cuda\*
Dependencies resolved.
==============================================================================================================================================================================================
 Package                                            Arch                                  Version                                         Repository                                     Size
==============================================================================================================================================================================================
Removing:
 cuda                                               x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                 41 M
 cuda-cublas                                        x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                 51 M
 cuda-cublas-devel                                  x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                123 M
 cuda-cudart                                        x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                548 k
 cuda-cudart-devel                                  x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                3.9 M
 cuda-cudnn6.0                                      x86_64                                1:6.0-1.fc26                                    @fedora-nvidia                                147 M
 cuda-cudnn6.0-devel                                x86_64                                1:6.0-1.fc26                                    @fedora-nvidia                                147 M
 cuda-cufft                                         x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                127 M
 cuda-cufft-devel                                   x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                131 M
 cuda-cupti                                         x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                5.5 M
 cuda-cupti-devel                                   x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                1.8 M
 cuda-curand                                        x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                 56 M
 cuda-curand-devel                                  x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                122 M
 cuda-cusolver                                      x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                 74 M
 cuda-cusolver-devel                                x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                 34 M
 cuda-cusparse                                      x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                 53 M
 cuda-cusparse-devel                                x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                 62 M
 cuda-devel                                         x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                9.5 M
 cuda-libs                                          x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                 28 M
 cuda-npp                                           x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                136 M
 cuda-npp-devel                                     x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                165 M
 cuda-nvgraph                                       x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                 74 M
 cuda-nvgraph-devel                                 x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                 15 k
 cuda-nvml-devel                                    x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                286 k
 cuda-nvrtc                                         x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                 25 M
 cuda-nvrtc-devel                                   x86_64                                1:9.0.176-1.fc27                                @fedora-nvidia                                 20 k

Transaction Summary
==============================================================================================================================================================================================
Remove  26 Packages

Freed space: 1.6 G


# rpm -qa | grep nvidia | sort
dkms-nvidia-387.22-1.fc27.x86_64
nvidia-driver-387.22-1.fc27.x86_64
nvidia-driver-cuda-387.22-1.fc27.x86_64
nvidia-driver-cuda-libs-387.22-1.fc27.x86_64
nvidia-driver-libs-387.22-1.fc27.x86_64
nvidia-driver-NVML-387.22-1.fc27.x86_64
nvidia-modprobe-387.22-1.fc27.x86_64
nvidia-persistenced-387.22-1.fc27.x86_64


./cuda-linux.9.0.176-22781540.run
accept
/usr/local/cuda-9.0
no desktop shortcuts
Creating symbolic link /usr/local/cuda -> /usr/local/cuda-9.0

Please make sure that
 -   PATH includes /usr/local/cuda-9.0/bin
 -   LD_LIBRARY_PATH includes /usr/local/cuda-9.0/lib64, or, add /usr/local/cuda-9.0/lib64 to /etc/ld.so.conf and run ldconfig as root
Please read the release notes in /usr/local/cuda-9.0/doc/
To uninstall the CUDA Toolkit, run the uninstall script in /usr/local/cuda-9.0/bin
Installation Complete

more /etc/ld.so.conf.d/cuda.conf
/usr/local/cuda-9.0/lib64
ldconfig

# Add to ~/.bash_profile
PATH=$PATH:/usr/local/cuda-9.0/bin

# Also need cudnn (separate download)
#  Goto : https://developer.nvidia.com/rdp/cudnn-download
https://developer.nvidia.com/compute/machine-learning/cudnn/secure/v7.0.4/prod/9.0_20171031/cudnn-9.0-linux-x64-v7

mv /home/andrewsm/Downloads/cudnn-9.0-linux-x64-v7.tgz .
tar -xzf cudnn-9.0-linux-x64-v7.tgz --directory /usr/local

bazel build --config=opt --config=cuda //tensorflow/tools/pip_package:build_pip_package

/usr/local/cuda-9.0/bin/..//include/crt/host_config.h:119:2: error: #error -- unsupported GNU version! gcc versions later than 6 are not supported!
 #error -- unsupported GNU version! gcc versions later than 6 are not supported!
  ^~~~~



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

