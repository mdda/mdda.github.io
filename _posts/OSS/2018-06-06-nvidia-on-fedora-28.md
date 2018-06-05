---
date: 2018-06-06
title: 'Nvidia (9.0) retention for TensorFlow & PyTorch on Fedora 28'
category: OSS
tags:
- fedora
- linux
- Nvidia
- TensorFlow
- PyTorch
layout: post
published: true
---
{% include JB/setup %}


## Negativo's Repo is a bit too quick...

Since Nvidia totally screwed up the ```gcc``` versioning/ABI on Fedora 24, I decided to 
take the *easy option* and use someone else's pre-packaged Nvidia installation.  My packager
of choice has been [Negativo](https://negativo17.org/nvidia-driver/).

*However*, the Negativo repo has been quickly updated to ```cuda-9.1``` whereas it seems that 
the ```TensorFlow``` team has decided : 

*  that ```9.1``` is going to be an orphan version as far as ```TensorFlow``` goes;
*  that everything will be fixed in the ```1.9``` release of ```TensorFlow```; and 
*  if you're upgrading, you're basically stuck until the 1.9RC magically appears.

So, given that my installation was already working for Fedora 27, 
I wanted to do an upgrade without disturbing the existing ```cuda-9.0``` packages.

Here's a quick run-down of what has worked for me (building on the [previous installation](/oss/2017/12/13/nvidia-on-fedora-27))...


### Sanity-check the existing installation

First ensure that the following is in ```/etc/dnf/dnf.conf``` :

{% highlight bash %}
exclude=kernel* cuda* *nvidia* nvidia-driver-NVML nvidia-driver-cuda-libs 
{% endhighlight %}

This means that the standard upgrade won't touch the kernel or working ```cuda``` installation (will be fixed later).


Also, check the versions of the ```nvidia``` driver, ```cuda``` and ```cudnn``` :

{% highlight bash %}
rpm -qa | grep nvidia
# dkms-nvidia-XXX
# nvidia-driver-XXX
# nvidia-driver-cuda-libs-XXX
# nvidia-driver-libs-XXX
# nvidia-driver-NVML-XXX
# nvidia-modprobe-XXX

rpm -qa | grep cuda
#cuda-cudnn-devel-7-1.fc27.x86_64
#cuda-cufft-9.0.176-2.fc27.x86_64
#cuda-cufft-devel-9.0.176-2.fc27.x86_64
#cuda-cupti-devel-9.0.176-2.fc27.x86_64
#cuda-cusparse-devel-9.0.176-2.fc27.x86_64
#cuda-devel-9.0.176-2.fc27.x86_64
#cuda-libs-9.0.176-2.fc27.x86_64
#cuda-npp-9.0.176-2.fc27.x86_64
#cuda-nvgraph-devel-9.0.176-2.fc27.x86_64
#cuda-nvrtc-9.0.176-2.fc27.x86_64
#nvidia-driver-cuda-libs-XXX

rpm -qa | grep cudnn
#cuda-cudnn-devel-7-1.fc27.x86_64
{% endhighlight %}


And also, take notes about which ```.conf``` files are in:
{% highlight bash %}
/etc/X11/
/etc/X11/xorg.conf.d/
{% endhighlight %}

For my installation (which has a GPU card which isn't connected to a monitor, and motherboard integrated ```intel```
graphics connected to the actual monitor), there are *NO* special ```.conf``` files : It all works 
via autoconfiguration.  Note that NVidia has a habbit of trying to fix this up for you by writing their own
configuration files without asking : These should be moved to ```.conf-disabled``` if you get any new problems with the following steps...

Copy the information above onto a machine that isn't the one being upgraded, since 
if this process fails then there's a chance you won't be able to see anything on the monitor, which is *frustrating*.


### Upgrade the fedora version (excluding kernels)

Follow the [standard upgrade steps](https://fedoraproject.org/wiki/DNF_system_upgrade) :

{% highlight bash %}
dnf upgrade --refresh
dnf install dnf-plugin-system-upgrade
# reboot should be fairly quick

dnf system-upgrade download --refresh --releasever=28
dnf system-upgrade reboot
# reboot takes ~ 40mins
{% endhighlight %}

Hopefully, everything should come back as before.  


### Check that you've (still) got a GPU

Running :

{% highlight bash %}
sudo lspci | grep -i NVIDIA
{% endhighlight %}

should result in a line that mentions your VGA adapter, and the following modules should also be loaded : 

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


### Now upgrade the ```nvidia``` driver

Change the ```/etc/dnf/dnf.conf``` : 

{% highlight bash %}
#exclude=kernel* cuda* *nvidia* nvidia-driver-NVML nvidia-driver-cuda-libs 
exclude=cuda* 
{% endhighlight %}

And then run an update (and make sure you have ```nvidia-driver-NVML``` too, 
which confused me with bad version messages for *ages*) : 

{% highlight bash %}
dnf update
dnf install nvidia-driver-NVML nvidia-driver-cuda-libs 
{% endhighlight %}


At this point, check that your ```/etc/X11``` configuration hasn't been messed up, before the :

{% highlight bash %}
shutdown -r now # moment of truth
{% endhighlight %}



### Disable further updates

Change the ```/etc/dnf/dnf.conf``` back : 

{% highlight bash %}
exclude=kernel* cuda* *nvidia* nvidia-driver-NVML nvidia-driver-cuda-libs 
#exclude=cuda* 
{% endhighlight %}


### Check that the versions still make sense 

Also, check the versions of the ```nvidia``` driver, ```cuda``` and ```cudnn``` (note that the latter sets are unchanged):

{% highlight bash %}
rpm -qa | grep nvidia
# dkms-nvidia-396.24-1.fc28.x86_64
# nvidia-driver-396.24-1.fc28.x86_64
# nvidia-driver-cuda-libs-396.24-1.fc28.x86_64
# nvidia-driver-libs-396.24-1.fc28.x86_64
# nvidia-driver-NVML-396.24-1.fc28.x86_64
# nvidia-modprobe-396.24-1.fc28.x86_64

rpm -qa | grep cuda
#cuda-cudnn-devel-7-1.fc27.x86_64
#cuda-cufft-9.0.176-2.fc27.x86_64
#cuda-cufft-devel-9.0.176-2.fc27.x86_64
#cuda-cupti-devel-9.0.176-2.fc27.x86_64
#cuda-cusparse-devel-9.0.176-2.fc27.x86_64
#cuda-devel-9.0.176-2.fc27.x86_64
#cuda-libs-9.0.176-2.fc27.x86_64
#cuda-npp-9.0.176-2.fc27.x86_64
#cuda-nvgraph-devel-9.0.176-2.fc27.x86_64
#cuda-nvrtc-9.0.176-2.fc27.x86_64
#nvidia-driver-cuda-libs-XXX

rpm -qa | grep cudnn
#cuda-cudnn-devel-7-1.fc27.x86_64
{% endhighlight %}

NB: These ```rpms``` are confirmed to work on my machine, at least.
 


### Install ```TensorFlow``` for the GPU 

<!--
https://negativo17.org/cuda-9-0-cudnn-7-0-and-wayland-support-in-fedora-27/
!-->

Install the latest ```TensorFlow``` version (currently 1.8) 
(this assumes ```python 3.x```, which should be the obvious choice by now): 

{% highlight bash %}
virtualenv --system-site-packages -p python3 ~/env3
. ~/env3/bin/activate

# Then, for either python version :
pip install tensorflow-gpu
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

This is what will appear if the installation **DIDN'T WORK** :

{% highlight python %}
Python 2.7.12 (default, Sep 29 2016, 12:52:02) 
[GCC 6.2.1 20160916 (Red Hat 6.2.1-2)] on linux2
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
2018-06-05 22:09:09.986930: I tensorflow/core/platform/cpu_feature_guard.cc:140] Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX2 FMA
2018-06-05 22:09:10.238016: I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:898] successful NUMA node read from SysFS had negative value (-1), but there must be at least one NUMA node, so returning NUMA node zero
2018-06-05 22:09:10.238519: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1356] Found device 0 with properties: 
name: GeForce GTX TITAN X major: 5 minor: 2 memoryClockRate(GHz): 1.076
pciBusID: 0000:01:00.0
totalMemory: 11.93GiB freeMemory: 11.81GiB
2018-06-05 22:09:10.238535: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1435] Adding visible gpu devices: 0
2018-06-05 22:09:10.423658: I tensorflow/core/common_runtime/gpu/gpu_device.cc:923] Device interconnect StreamExecutor with strength 1 edge matrix:
2018-06-05 22:09:10.423711: I tensorflow/core/common_runtime/gpu/gpu_device.cc:929]      0 
2018-06-05 22:09:10.423719: I tensorflow/core/common_runtime/gpu/gpu_device.cc:942] 0:   N 
2018-06-05 22:09:10.423953: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1053] Created TensorFlow device (/job:localhost/replica:0/task:0/device:GPU:0 with 11436 MB memory) -> physical GPU (device: 0, name: GeForce GTX TITAN X, pci bus id: 0000:01:00.0, compute capability: 5.2)
Device mapping:
/job:localhost/replica:0/task:0/device:GPU:0 -> device: 0, name: GeForce GTX TITAN X, pci bus id: 0000:01:00.0, compute capability: 5.2
2018-06-05 22:09:10.524894: I tensorflow/core/common_runtime/direct_session.cc:284] Device mapping:
/job:localhost/replica:0/task:0/device:GPU:0 -> device: 0, name: GeForce GTX TITAN X, pci bus id: 0000:01:00.0, compute capability: 5.2

>>> print(sess.run(c))
MatMul: (MatMul): /job:localhost/replica:0/task:0/device:GPU:0
2018-06-05 22:09:10.525619: I tensorflow/core/common_runtime/placer.cc:886] MatMul: (MatMul)/job:localhost/replica:0/task:0/device:GPU:0
b: (Const): /job:localhost/replica:0/task:0/device:GPU:0
2018-06-05 22:09:10.525647: I tensorflow/core/common_runtime/placer.cc:886] b: (Const)/job:localhost/replica:0/task:0/device:GPU:0
a: (Const): /job:localhost/replica:0/task:0/device:GPU:0
2018-06-05 22:09:10.525654: I tensorflow/core/common_runtime/placer.cc:886] a: (Const)/job:localhost/replica:0/task:0/device:GPU:0
[[22. 28.]
 [49. 64.]]
{% endhighlight %}




### Install ```PyTorch``` for the GPU 

Looking within the [PyTorch installation instructions](http://pytorch.org/) we see that there's 
an option for CUDA toolkit v9.0, which is good, and Python 3.6 is supported (also good).

{% highlight bash %}
pip3 install http://download.pytorch.org/whl/cu90/torch-0.4.0-cp36-cp36m-linux_x86_64.whl 
pip install torchvision  # (48Kb download)
{% endhighlight %}

Then finally test it with the same Hello World calculation as we did for TensorFlow :

{% highlight python %}
python
import torch

#device = torch.device("cpu")    # Use this to run on CPU
device = torch.device("cuda:0") # Use this to run on GPU

a = torch.Tensor( [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]]).to(device)
b = torch.Tensor( [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]]).to(device)

print(a.mm(b))  # matrix-multiply : Look for device 'cuda:0' 
# tensor([[ 22.,  28.],
#        [ 49.,  64.]], device='cuda:0')
{% endhighlight %}


All done.
