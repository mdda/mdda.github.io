---
date: 2017-08-11
title: Nvidia (8.0) installation for TensorFlow on Fedora 26
category: OSS
tags:
- fedora
- linux
- Nvidia
- TensorFlow
layout: post
published: true
---
{% include JB/setup %}


## Just use Negativo's Repo...

Since Nvidia totally screwed up the ```gcc``` versioning/ABI on Fedora 24, I decided to 
take the *easy option* and use someone else's pre-packaged Nvidia installation.

I had tried this method before (on previous Fedoras), but the choices of paths had
left me unconvinced (particularly since during the 'teething' phase of getting the
installation working, error messages can come from all sorts of sources/reasons).

Here's a quick run-down of what has worked for me :


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
nvidia_drm             49152  0
nvidia_modeset        790528  1 nvidia_drm
nvidia_uvm            749568  0
nvidia              11911168  2 nvidia_modeset,nvidia_uvm
drm_kms_helper        151552  2 i915,nvidia_drm
drm                   344064  4 i915,nvidia_drm,drm_kms_helper
{% endhighlight %}

The key thing here are the references to ```nvidia``` and ```nvidia_uvm```.

If you've got references to ```nouveau``` appearing in ```lsmod```, something didn't work correctly.


### Install ```TensorFlow``` for the GPU 

Looking within the [TensorFlow installation instructions](https://www.tensorflow.org/install/install_linux) 
for "Download and install cuDNN" shows that TensorFlow is expecting CUDA toolkit v8.0, which is good, because
that is what the Negativo packing supplies, but (for now) cuDNN v5.1, which is no longer the main cuDNN supplied by
Negativo, but there's a back-ported package still there : 

{% highlight bash %}
sudo dnf search cudnn

#Last metadata expiration check: 0:35:09 ago on Fri 11 Aug 2017 11:18:41 PM +08.
#============================================ Summary & Name Matched: cudnn =============================================
#cuda-cudnn-devel.x86_64 : Development files for cuda-cudnn
#cuda-cudnn5.1-devel.x86_64 : Development files for cuda-cudnn
#cuda-cudnn.x86_64 : NVIDIA CUDA Deep Neural Network library (cuDNN)
#cuda-cudnn5.1.x86_64 : NVIDIA CUDA Deep Neural Network library (cuDNN)

sudo dnf install cuda-cudnn5.1  # (42Mb download)
{% endhighlight %}


Now, find and install the right version ```TensorFlow``` (this assumes python 3.x, which should be the obvious choice by now): 

{% highlight bash %}
virtualenv --system-site-packages -p python3 ~/env3
. ~/env3/bin/activate

# Then, for either version :
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
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcublas.so locally
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcudnn.so locally
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcufft.so locally
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcuda.so.1 locally
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcurand.so locally

I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:925] successful NUMA node read from SysFS had negative value (-1), but there must be at least one NUMA node, so returning NUMA node zero
I tensorflow/core/common_runtime/gpu/gpu_device.cc:951] Found device 0 with properties:
name: GeForce GTX 760
major: 3 minor: 0 memoryClockRate (GHz) 1.137
pciBusID 0000:01:00.0
Total memory: 1.98GiB
Free memory: 1.94GiB
I tensorflow/core/common_runtime/gpu/gpu_device.cc:972] DMA: 0
I tensorflow/core/common_runtime/gpu/gpu_device.cc:982] 0:   Y
I tensorflow/core/common_runtime/gpu/gpu_device.cc:1041] Creating TensorFlow device (/gpu:0) -> (device: 0, name: GeForce GTX 760, pci bus id: 0000:01:00.0)
Device mapping:
/job:localhost/replica:0/task:0/gpu:0 -> device: 0, name: GeForce GTX 760, pci bus id: 0000:01:00.0
I tensorflow/core/common_runtime/direct_session.cc:252] Device mapping:
/job:localhost/replica:0/task:0/gpu:0 -> device: 0, name: GeForce GTX 760, pci bus id: 0000:01:00.0

MatMul: /job:localhost/replica:0/task:0/gpu:0
I tensorflow/core/common_runtime/simple_placer.cc:819] MatMul: /job:localhost/replica:0/task:0/gpu:0
b: /job:localhost/replica:0/task:0/gpu:0
I tensorflow/core/common_runtime/simple_placer.cc:819] b: /job:localhost/replica:0/task:0/gpu:0
a: /job:localhost/replica:0/task:0/gpu:0
I tensorflow/core/common_runtime/simple_placer.cc:819] a: /job:localhost/replica:0/task:0/gpu:0
[[ 22.  28.]
 [ 49.  64.]]
{% endhighlight %}

or the relevant device lines on another machine : 


{% highlight python %}
#...
I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:925] successful NUMA node read from SysFS had negative value (-1), but there must be at least one NUMA node, so returning NUMA node zero
I tensorflow/core/common_runtime/gpu/gpu_device.cc:951] Found device 0 with properties: 
name: GeForce GTX TITAN X
major: 5 minor: 2 memoryClockRate (GHz) 1.076
pciBusID 0000:01:00.0
Total memory: 11.95GiB
Free memory: 11.84GiB
I tensorflow/core/common_runtime/gpu/gpu_device.cc:972] DMA: 0 
I tensorflow/core/common_runtime/gpu/gpu_device.cc:982] 0:   Y 
I tensorflow/core/common_runtime/gpu/gpu_device.cc:1041] Creating TensorFlow device (/gpu:0) -> (device: 0, name: GeForce GTX TITAN X, pci bus id: 0000:01:00.0)
Device mapping:
/job:localhost/replica:0/task:0/gpu:0 -> device: 0, name: GeForce GTX TITAN X, pci bus id: 0000:01:00.0
I tensorflow/core/common_runtime/direct_session.cc:252] Device mapping:
/job:localhost/replica:0/task:0/gpu:0 -> device: 0, name: GeForce GTX TITAN X, pci bus id: 0000:01:00.0
{% endhighlight %}




### Install ```PyTorch``` for the GPU 

Looking within the [PyTorch installation instructions](http://pytorch.org/) we see that there's 
an option for CUDA toolkit v8.0, which is good, and Python 3.6 is supported (also good).

{% highlight bash %}
pip install http://download.pytorch.org/whl/cu80/torch-0.2.0.post1-cp36-cp36m-manylinux1_x86_64.whl  # 486Mb download!
pip install torchvision  # (48Kb download)
{% endhighlight %}

Hmm - there's a ```numpy``` ABI version incompatability...

Fedora 26 default python3 ```numpy 1.12.1```, but PyTorch wants ```numpy 1.13.1``` :

{% highlight bash %}
pip install --ignore-installed  numpy
{% endhighlight %}


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

