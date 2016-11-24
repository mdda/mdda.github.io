---
date: 2016-11-25
title: Nvidia (8.0) installation for Tensorflow on Fedora 25
category: OSS
tags:
- fedora
- linux
- Nvidia
- tensorflow
layout: post
published: false
---
{% include JB/setup %}


### Just use Negativo's Repo...

Since Nvidia totally screwed up the ```gcc``` versioning/ABI on Fedora 24, I decided to 
take the *easy option* and use someone else's pre-packaged Nvidia installation.

I had tried this method before (on previous Fedoras), but the choices of paths had
left me unconvinced (particularly since during the 'teething' phase of getting the
installation working, error messages can come from all sorts of sources/reasons).

Here's a quick run-down of what has worked for me...

{% highlight bash %}
dnf remove xorg-x11-drv-nvidia  # 1Gb of stuff disappears...
dnf remove cuda-repo-rhel7-7-0-local-7.0-28.x86_64

rm -rf /usr/local/cuda*
{% endhighlight %}



Add the [http://negativo17.org/nvidia-driver/](negativo Nvidia repo):

{% highlight bash %}
dnf config-manager --add-repo=http://negativo17.org/repos/fedora-nvidia.repo
{% endhighlight %}

And then install the nvidia driver, and the necessary libraries for ```cuda``` operations.  
Note that if you want X11 to run, you'll need a monitor attached.  
I didn't attach a monitor to the machine while doing this, so it's not proven that 
the video card ends up doing anything but ```cuda``` operations :: But that's fine with me.

{% highlight bash %}
dnf install kernel-devel dkms-nvidia  nvidia-driver-cuda
dnf install cuda-devel cuda-cudnn-devel
{% endhighlight %}


For on-board intel driver (xorg failing to initialize - but no screen plugged in), as a precautionary measure) :

{% highlight bash %}
dnf install xorg-x11-drv-intel
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


https://www.tensorflow.org/versions/r0.11/get_started/os_setup.html
Ctrl-F for : Download and install cuDNN

{% highlight bash %}
virtualenv --system-site-packages ~/env
. ~/env/bin/activate

export TF_BINARY_URL=https://storage.googleapis.com/tensorflow/linux/gpu/tensorflow-0.11.0-cp27-none-linux_x86_64.whl

# python 2.7
pip install --ignore-installed --upgrade $TF_BINARY_URL
{% endhighlight %}



{% highlight python %}
python
import tensorflow as tf
sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))

a = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[2, 3], name='a')
b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[3, 2], name='b')
c = tf.matmul(a, b)
print sess.run(c)
{% endhighlight %}

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
>>> # Creates a graph.
... a = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[2, 3], name='a')
>>> b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[3, 2], name='b')
>>> c = tf.matmul(a, b)
>>> # Creates a session with log_device_placement set to True.
... sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))
E tensorflow/stream_executor/cuda/cuda_driver.cc:491] failed call to cuInit: CUDA_ERROR_UNKNOWN
I tensorflow/stream_executor/cuda/cuda_diagnostics.cc:147] no NVIDIA GPU device is present: /dev/nvidia0 does not exist
Device mapping: no known devices.
I tensorflow/core/common_runtime/direct_session.cc:252] Device mapping:

>>> # Runs the op.
... print sess.run(c)
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


{% highlight python %}
python
Python 2.7.12 (default, Sep 29 2016, 12:52:02) 
[GCC 6.2.1 20160916 (Red Hat 6.2.1-2)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import tensorflow as tf
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcublas.so locally
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcudnn.so locally
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcufft.so locally
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcuda.so.1 locally
I tensorflow/stream_executor/dso_loader.cc:111] successfully opened CUDA library libcurand.so locally

>>> sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))

E tensorflow/stream_executor/cuda/cuda_driver.cc:491] failed call to cuInit: CUDA_ERROR_UNKNOWN
I tensorflow/stream_executor/cuda/cuda_diagnostics.cc:147] no NVIDIA GPU device is present: /dev/nvidia0 does not exist
Device mapping: no known devices.
I tensorflow/core/common_runtime/direct_session.cc:252] Device mapping:
{% endhighlight %}


After running the [bash script inside Nvidia installation instructions](http://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#runfile-verifications), it all works as expected :

{% highlight bash %}
more /root/fedora25-cuda/make-nvidia-device-nodes.bash 

#!/bin/bash

/sbin/modprobe nvidia

if [ "$?" -eq 0 ]; then
  # Count the number of NVIDIA controllers found.
  NVDEVS=`lspci | grep -i NVIDIA`
  N3D=`echo "$NVDEVS" | grep "3D controller" | wc -l`
  NVGA=`echo "$NVDEVS" | grep "VGA compatible controller" | wc -l`

  N=`expr $N3D + $NVGA - 1`
  for i in `seq 0 $N`; do
    mknod -m 666 /dev/nvidia$i c 195 $i
  done

  mknod -m 666 /dev/nvidiactl c 195 255

else
  exit 1
fi

/sbin/modprobe nvidia-uvm

if [ "$?" -eq 0 ]; then
  # Find out the major device number used by the nvidia-uvm driver
  D=`grep nvidia-uvm /proc/devices | awk '{print $1}'`

  mknod -m 666 /dev/nvidia-uvm c $D 0
else
  exit 1
fi
{% endhighlight %}




{% highlight python %}
python
import tensorflow as tf
sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))

a = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[2, 3], name='a')
b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[3, 2], name='b')
c = tf.matmul(a, b)
print sess.run(c)
{% endhighlight %}

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
