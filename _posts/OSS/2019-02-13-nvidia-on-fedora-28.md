---
date: 2019-02-13
title: 'Nvidia (10.0) for TensorFlow & PyTorch on Fedora 28'
category: OSS
tags:
- fedora
- linux
- Nvidia
- TensorFlow
- PyTorch
layout: post
published: false
---
{% include JB/setup %}


## Now ```tf-nightly``` &amp; ```PyTorch``` work on ```cuda 10``` ...

Ever since Nvidia totally screwed up the ```gcc``` versioning/ABI on Fedora 24, I decided to 
take the *easy option* and use someone else's pre-packaged Nvidia installation.  My packager
of choice has been [Negativo](https://negativo17.org/nvidia-driver/).  

*However*, around Fedora 26/27 the Negativo repo was quickly updated to ```cuda-9.1``` 
whereas it seems that the ```TensorFlow``` team decided to skip ```9.1``` 
and move to ```9.2``` directly, but not go for ```10.0``` when all Fedora, 
the repos and ```PyTorch``` did.

The situation has now become more unified, assuming you're willing to 
take a risk on installing the ```tensorflow``` *nightly* builds (1.13.xxx), 
which have been ```cuda 10.0``` ready since (apparently) mid-Dec-2018.

Here's a quick run-down of what has worked for me (having had to install Nvidia/cuda from the Nvidia website for Fedora recently,
or compiling ```tensorflow``` from scratch, which are both painful )...

( Happy to be back using a 'proper' repo, and ```pip install``` for the frameworks again. )


### Clean out previous installations

{% highlight bash %}
dnf remove xorg-x11-drv-nvidia  # 1Gb of stuff disappears
dnf remove cuda-repo-*

rm -rf /usr/local/cuda*
# And remove the reminants of any other blind-alleys you've previously gone down...
{% endhighlight %}


### Check that you've got a GPU

Running :

{% highlight bash %}
sudo lspci | grep -i NVIDIA
{% endhighlight %}

should result in a line that mentions your VGA adapter.


### Add the Negativo Nvidia Repo

The [negativo Nvidia repo](http://negativo17.org/nvidia-driver/) should now be added :

{% highlight bash %}
dnf config-manager --add-repo=http://negativo17.org/repos/fedora-nvidia.repo
{% endhighlight %}


And then install the nvidia driver, and the necessary libraries for ```cuda``` operations.  

Note that if you want X11 to run on the graphics card, you'll obviously need a monitor 
attached.  However, since I didn't attach a monitor to the machine while doing this, 
it's not proven that the video card ends up capable of doing anything but ```cuda``` operations :: But that's fine with me,
because this is a machine that won't ever have a monitor attached to it (much to the 
disappointment of the gamers in the office).

The following will each pull in a load more dependencies (the Negativo repo is intentionally modular / fragmented) :

{% highlight bash %}
dnf install kernel-devel dkms-nvidia  nvidia-driver-cuda
dnf install cuda-devel cuda-cudnn-devel
{% endhighlight %}

In my case, I also added an ```intel``` driver for the internal on-board video subsystem 
(just so that ```X11``` might be tempted to run if there's a monitor plugged in - but check out the 
[companion post](/oss/2016/11/28/intel-modesetting-and-xorg) on how to get the ```X11``` 
configuration working properly if you *do* want to add a monitor, and also enable 
the Nvidia card for CUDA without it having a display attached) :

{% highlight bash %}
dnf install xorg-x11-drv-intel nvidia-modprobe
{% endhighlight %}


Now after rebooting : 

{% highlight bash %}
# sudo lsmod  | grep nv
nvidia_drm             45056  0
nvidia_modeset        901120  1 nvidia_drm
nvidia_uvm            684032  0
nvidia              13914112  2 nvidia_modeset,nvidia_uvm
drm_kms_helper        159744  2 i915,nvidia_drm
drm                   352256  5 i915,nvidia_drm,drm_kms_helper
{% endhighlight %}

The key thing here are the references to ```nvidia``` and ```nvidia_uvm```.

If you've got references to ```nouveau``` appearing in ```lsmod```, something didn't work correctly.


### Install ```TensorFlow``` for the GPU 

<!--
https://negativo17.org/cuda-9-0-cudnn-7-0-and-wayland-support-in-fedora-27/
!-->

Looking within the [TensorFlow installation instructions](https://www.tensorflow.org/install/install_linux) and 
it's linked [helper page](https://www.tensorflow.org/install/gpu), 
shows that TensorFlow v1.12 (the current stable release) expects ```CUDA toolkit v9.0```, 
which is not good, because Negativo packing supplies ```CUDA v10.0```.

To counteract this, install the (now available)  ```TensorFlow``` 'nightly' build, which is apparently built to be 
ready for the latest versions
(this assumes ```python 3.x```, which should be the obvious choice by now): 

{% highlight bash %}
virtualenv --system-site-packages -p python3 ~/env3
. ~/env3/bin/activate

# Then, for either version :
pip install tf-nightly-gpu
# Working version : 1.13.0.dev20190207

# Not working version : 1.13.0.dev20190212 
##  Different machine, did 'pip install -U absl-py' due to error message then
##   'pip install -U tf-nightly-gpu' gave :
# Working version : 1.13.0.dev20190213

{% endhighlight %}


### Test ```TensorFlow``` with the GPU

The following can be executed (the second line onwards will be within the Python REPL) :

{% highlight python %}
python
import tensorflow as tf

a = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[2, 3], name='a')
b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[3, 2], name='b')
c = tf.matmul(a, b)

sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))
print(sess.run(c))
{% endhighlight %}

This is the kind of message that will appear if the installation **DIDN'T WORK** :

{% highlight python %}
Python 3.6.8 (default, Jan 31 2019, 09:38:34) 
[GCC 8.2.1 20181215 (Red Hat 8.2.1-6)] on linux
Type "help", "copyright", "credits" or "license" for more information.

>>> import tensorflow as tf
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcublas.so locally
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcudnn.so locally
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcufft.so locally
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcuda.so.1 locally
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcurand.so locally
>>> 
>>> a = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[2, 3], name='a')
>>> b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[3, 2], name='b')
>>> c = tf.matmul(a, b)
>>> 
>>> sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))
E tensorflow/stream_executor/cuda/cuda_driver.cc:491] failed call to cuInit: CUDA_ERROR_UNKNOWN
I tensorflow/stream_executor/cuda/cuda_diagnostics.cc:147] no NVIDIA GPU device is present: /dev/nvidia0 does not exist
Device mapping: no known devices.
I tensorflow/core/common_runtime/direct_session.cc:252] Device mapping:

>>> print(sess.run(c))
MatMul: /job:localhost/replica:0/task:0/cpu:0
I tensorflow/core/common_runtime/simple_placer.cc:819] MatMul: /job:localhost/replica:0/task:0/cpu:0
b: /job:localhost/replica:0/task:0/cpu:0
I tensorflow/core/common_runtime/simple_placer.cc:819] b: /job:localhost/replica:0/task:0/cpu:0
a: /job:localhost/replica:0/task:0/cpu:0
I tensorflow/core/common_runtime/simple_placer.cc:819] a: /job:localhost/replica:0/task:0/cpu:0
[[ 22.  28.]
 [ 49.  64.]]
>>> 
{% endhighlight %}


### Fixing the ```/dev/nvidia0``` problem

This should not happen if you're running on the Nvidia card as a display adapter, or
have installed the ```nvidia-modprobe``` package above.  If there's still a problem,
have a look at the [solution previously found](/oss/2016/11/25/nvidia-on-fedora-25).



### When it finally works...

Then the python REPL code :

{% highlight python %}
python
import tensorflow as tf

a = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[2, 3], name='a')
b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[3, 2], name='b')
c = tf.matmul(a, b)

sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))
print(sess.run(c))
{% endhighlight %}

Produces the following happy messages : 

{% highlight python %}
2019-02-13 21:34:28.563550: I tensorflow/core/platform/cpu_feature_guard.cc:142] Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX2 FMA
2019-02-13 21:34:28.568060: I tensorflow/stream_executor/platform/default/dso_loader.cc:161] successfully opened CUDA library libcuda.so.1 locally
2019-02-13 21:34:28.663449: I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:1010] successful NUMA node read from SysFS had negative value (-1), but there must be at least one NUMA node, so returning NUMA node zero
2019-02-13 21:34:28.664499: I tensorflow/compiler/xla/service/service.cc:162] XLA service 0x55ffe8e62690 executing computations on platform CUDA. Devices:
2019-02-13 21:34:28.664528: I tensorflow/compiler/xla/service/service.cc:169]   StreamExecutor device (0): GeForce GTX TITAN X, Compute Capability 5.2
2019-02-13 21:34:28.666780: I tensorflow/core/platform/profile_utils/cpu_utils.cc:94] CPU Frequency: 3591915000 Hz
2019-02-13 21:34:28.667177: I tensorflow/compiler/xla/service/service.cc:162] XLA service 0x55ffe8e5f460 executing computations on platform Host. Devices:
2019-02-13 21:34:28.667197: I tensorflow/compiler/xla/service/service.cc:169]   StreamExecutor device (0): <undefined>, <undefined>
2019-02-13 21:34:28.667923: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1464] Found device 0 with properties: 
name: GeForce GTX TITAN X major: 5 minor: 2 memoryClockRate(GHz): 1.076
pciBusID: 0000:01:00.0
totalMemory: 11.93GiB freeMemory: 11.81GiB
2019-02-13 21:34:28.667945: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1543] Adding visible gpu devices: 0
2019-02-13 21:34:28.668034: I tensorflow/stream_executor/platform/default/dso_loader.cc:161] successfully opened CUDA library libcudart.so.10.0 locally
2019-02-13 21:34:28.669792: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1015] Device interconnect StreamExecutor with strength 1 edge matrix:
2019-02-13 21:34:28.669813: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1021]      0 
2019-02-13 21:34:28.669822: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1034] 0:   N 
2019-02-13 21:34:28.670484: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1146] Created TensorFlow device (/job:localhost/replica:0/task:0/device:GPU:0 with 11492 MB memory) -> physical GPU (device: 0, name: GeForce GTX TITAN X, pci bus id: 0000:01:00.0, compute capability: 5.2)
Device mapping:
/job:localhost/replica:0/task:0/device:XLA_GPU:0 -> device: XLA_GPU device
/job:localhost/replica:0/task:0/device:XLA_CPU:0 -> device: XLA_CPU device
/job:localhost/replica:0/task:0/device:GPU:0 -> device: 0, name: GeForce GTX TITAN X, pci bus id: 0000:01:00.0, compute capability: 5.2
2019-02-13 21:34:28.671279: I tensorflow/core/common_runtime/direct_session.cc:316] Device mapping:
/job:localhost/replica:0/task:0/device:XLA_GPU:0 -> device: XLA_GPU device
/job:localhost/replica:0/task:0/device:XLA_CPU:0 -> device: XLA_CPU device
/job:localhost/replica:0/task:0/device:GPU:0 -> device: 0, name: GeForce GTX TITAN X, pci bus id: 0000:01:00.0, compute capability: 5.2

>>> print(sess.run(c))
MatMul: (MatMul): /job:localhost/replica:0/task:0/device:GPU:0
2019-02-13 21:34:28.673124: I tensorflow/core/common_runtime/placer.cc:1083] MatMul: (MatMul)/job:localhost/replica:0/task:0/device:GPU:0
a: (Const): /job:localhost/replica:0/task:0/device:GPU:0
2019-02-13 21:34:28.673148: I tensorflow/core/common_runtime/placer.cc:1083] a: (Const)/job:localhost/replica:0/task:0/device:GPU:0
b: (Const): /job:localhost/replica:0/task:0/device:GPU:0
2019-02-13 21:34:28.673163: I tensorflow/core/common_runtime/placer.cc:1083] b: (Const)/job:localhost/replica:0/task:0/device:GPU:0
[[22. 28.]
 [49. 64.]]
{% endhighlight %}

NB: ```tensorflow``` has to be [compiled from source to work with compute capability of <3.5](https://github.com/tensorflow/tensorflow/issues/17445#issuecomment-378459655). Unfortunately, 
my [GTX 760 has a compute capability of 3.0](https://www.myzhar.com/blog/tutorials/tutorial-nvidia-gpu-cuda-compute-capability/).




### Install ```PyTorch``` for the GPU 

Looking within the [PyTorch installation instructions](http://pytorch.org/) we see that there's 
an option for CUDA toolkit v10.0, which is good, and Python 3.6 is supported (also good).

{% highlight bash %}
pip3 install https://download.pytorch.org/whl/cu100/torch-1.0.1.post2-cp36-cp36m-linux_x86_64.whl
pip install torchvision  # (48Kb download)
{% endhighlight %}

Then finally test it with the same Hello World calculation as we did for TensorFlow :

{% highlight python %}
python
import torch

#dtype = torch.FloatTensor  # Use this to run on CPU
dtype = torch.cuda.FloatTensor # Use this to run on GPU

a = torch.Tensor( [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]]).type(dtype)
b = torch.Tensor( [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]]).type(dtype)

print(a.mm(b))  # matrix-multiply (should state : on GPU)
{% endhighlight %}


All done.

