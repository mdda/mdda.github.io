---
date: 2017-08-11
title: 'Nvidia (8.0) installation for TensorFlow & PyTorch on Fedora 26'
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
for "Download and install cuDNN" shows that TensorFlow v1.2 expects ```CUDA toolkit v8.0```, which is good, because
that is what the Negativo packing supplies, but also ```cuDNN v5.1```, 
which is no longer the main ```cuDNN``` supplied by Negativo, but there's a back-ported package still there : 

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

This back-port package is not needed for ```TensorFlow 1.3```, which is compatible with ```cuDNN v6``` - so 
the standard ```cuda-cudnn``` package works fine (this should have been installed already as as dependency of ```cuda-cudnn-devel``` above).

Now install ```TensorFlow``` (this assumes ```python 3.x```, which should be the obvious choice by now): 

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

Hmm - a quick test shows that there's a ```numpy``` ABI version incompatibility...  
Fedora 26's default for python3 is ```numpy 1.12.1```, but PyTorch for Python-3.6 wants ```numpy 1.13.1```, 
fix this just inside the ```virtualenv```:

{% highlight bash %}
pip install --ignore-installed  numpy
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

<!--

No nouveau blacklist in /etc/modprobe.d/

/etc/default/grub :
GRUB_CMDLINE_LINUX="rd.driver.blacklist=nouveau nvidia.modeset=0 nouveau.modeset=0 intel.modeset=1 rd.lvm.lv=fedora00/root rd.lvm.lv=fedora00/swap rhgb quiet"

/etc/X11/xorg.conf absent
/etc/X11/xorg.conf.d/ has no nvidia-related entries

# lsmod  | grep drm
nvidia_drm             45056  0
nvidia_modeset        843776  1 nvidia_drm
drm_kms_helper        151552  2 i915,nvidia_drm
drm                   348160  7 i915,nvidia_drm,drm_kms_helper


[root@square andrewsm]# dkms status
nvidia, 384.59, 4.11.11-300.fc26.x86_64, x86_64: installed
nvidia, 384.59, 4.11.12-200.fc25.x86_64, x86_64: installed


# rpm -qa | grep nvidia | sort
dkms-nvidia-384.59-1.fc26.x86_64
nvidia-driver-384.59-2.fc26.x86_64
nvidia-driver-cuda-384.59-2.fc26.x86_64
nvidia-driver-cuda-libs-384.59-2.fc26.x86_64
nvidia-driver-libs-384.59-2.fc26.x86_64
nvidia-driver-NVML-384.59-2.fc26.x86_64
nvidia-modprobe-384.59-1.fc26.x86_64
nvidia-persistenced-384.59-1.fc26.x86_64

# rpm -qa | grep libglvnd | sort
libglvnd-0.2.999-19.20170620gitd850cdd.fc26.i686
libglvnd-0.2.999-19.20170620gitd850cdd.fc26.x86_64
libglvnd-egl-0.2.999-19.20170620gitd850cdd.fc26.i686
libglvnd-egl-0.2.999-19.20170620gitd850cdd.fc26.x86_64
libglvnd-gles-0.2.999-19.20170620gitd850cdd.fc26.x86_64
libglvnd-glx-0.2.999-19.20170620gitd850cdd.fc26.i686
libglvnd-glx-0.2.999-19.20170620gitd850cdd.fc26.x86_64
libglvnd-opengl-0.2.999-19.20170620gitd850cdd.fc26.x86_64

# rpm -qa | grep libvdpau | sort
libvdpau-1.1.1-4.fc26.x86_64

[root@square andrewsm]# cat /var/log/Xorg.0.log
[     6.987] 
X.Org X Server 1.19.3
Release Date: 2017-03-15
[     6.987] X Protocol Version 11, Revision 0
[     6.987] Build Operating System:  4.10.6-200.fc25.x86_64 
[     6.987] Current Operating System: Linux square.herald 4.11.12-200.fc25.x86_64 #1 SMP Fri Jul 21 16:41:43 UTC 2017 x86_64
[     6.987] Kernel command line: BOOT_IMAGE=/vmlinuz-4.11.12-200.fc25.x86_64 root=/dev/mapper/fedora00-root ro rd.driver.blacklist=nouveau nvidia.modeset=0 nouveau.modeset=0 intel.modeset=1 rd.lvm.lv=fedora00/root rd.lvm.lv=fedora00/swap rhgb quiet
[     6.987] Build Date: 23 April 2017  11:51:31PM
[     6.987] Build ID: xorg-x11-server 1.19.3-4.fc26 
[     6.987] Current version of pixman: 0.34.0
[     6.987] 	Before reporting problems, check http://wiki.x.org
	to make sure that you have the latest version.
[     6.987] Markers: (--) probed, (**) from config file, (==) default setting,
	(++) from command line, (!!) notice, (II) informational,
	(WW) warning, (EE) error, (NI) not implemented, (??) unknown.
[     6.987] (==) Log file: "/var/log/Xorg.0.log", Time: Sat Aug 12 10:14:27 2017
[     6.989] (==) Using config directory: "/etc/X11/xorg.conf.d"
[     6.989] (==) Using system config directory "/usr/share/X11/xorg.conf.d"
[     6.990] (==) No Layout section.  Using the first Screen section.
[     6.990] (==) No screen section available. Using defaults.
[     6.990] (**) |--&gt;Screen "Default Screen Section" (0)
[     6.990] (**) |   |--&gt;Monitor "&lt;default monitor&gt;"
[     6.991] (==) No monitor specified for screen "Default Screen Section".
	Using a default monitor configuration.
[     6.991] (==) Automatically adding devices
[     6.991] (==) Automatically enabling devices
[     6.991] (==) Automatically adding GPU devices
[     6.991] (==) Automatically binding GPU devices
[     6.991] (==) Max clients allowed: 256, resource mask: 0x1fffff
[     6.991] (==) FontPath set to:
	catalogue:/etc/X11/fontpath.d,
	built-ins
[     6.991] (==) ModulePath set to "/usr/lib64/xorg/modules"
[     6.991] (II) The server relies on udev to provide the list of input devices.
	If no devices become available, reconfigure udev or disable AutoAddDevices.
[     6.991] (II) Loader magic: 0x823e00
[     6.991] (II) Module ABI versions:
[     6.991] 	X.Org ANSI C Emulation: 0.4
[     6.991] 	X.Org Video Driver: 23.0
[     6.991] 	X.Org XInput driver : 24.1
[     6.991] 	X.Org Server Extension : 10.0
[     6.992] (++) using VT number 1

[     6.992] (II) systemd-logind: logind integration requires -keeptty and -keeptty was not provided, disabling logind integration
[     6.992] (II) xfree86: Adding drm device (/dev/dri/card1)
[     6.992] (II) xfree86: Adding drm device (/dev/dri/card0)
[     7.006] (--) PCI:*(0:0:2:0) 8086:0412:1458:d000 rev 6, Mem @ 0xf7400000/4194304, 0xd0000000/268435456, I/O @ 0x0000f000/64, BIOS @ 0x????????/131072
[     7.006] (--) PCI: (0:1:0:0) 10de:17c2:10de:1132 rev 161, Mem @ 0xf6000000/16777216, 0xe0000000/268435456, 0xf0000000/33554432, I/O @ 0x0000e000/128, BIOS @ 0x????????/524288
[     7.006] (II) LoadModule: "glx"
[     7.013] (II) Loading /usr/lib64/xorg/modules/extensions/libglx.so
[     7.026] (II) Module glx: vendor="X.Org Foundation"
[     7.026] 	compiled for 1.19.3, module version = 1.0.0
[     7.026] 	ABI class: X.Org Server Extension, version 10.0
[     7.173] (==) Matched nouveau as autoconfigured driver 0
[     7.173] (==) Matched nv as autoconfigured driver 1
[     7.173] (==) Matched modesetting as autoconfigured driver 2
[     7.173] (==) Matched fbdev as autoconfigured driver 3
[     7.173] (==) Matched vesa as autoconfigured driver 4
[     7.173] (==) Assigned the driver to the xf86ConfigLayout
[     7.173] (II) LoadModule: "nouveau"
[     7.173] (II) Loading /usr/lib64/xorg/modules/drivers/nouveau_drv.so
[     7.175] (II) Module nouveau: vendor="X.Org Foundation"
[     7.175] 	compiled for 1.19.3, module version = 1.0.15
[     7.175] 	Module class: X.Org Video Driver
[     7.175] 	ABI class: X.Org Video Driver, version 23.0
[     7.175] (II) LoadModule: "nv"
[     7.175] (WW) Warning, couldn't open module nv
[     7.175] (II) UnloadModule: "nv"
[     7.175] (II) Unloading nv
[     7.175] (EE) Failed to load module "nv" (module does not exist, 0)
[     7.175] (II) LoadModule: "modesetting"
[     7.175] (II) Loading /usr/lib64/xorg/modules/drivers/modesetting_drv.so
[     7.176] (II) Module modesetting: vendor="X.Org Foundation"
[     7.176] 	compiled for 1.19.3, module version = 1.19.3
[     7.176] 	Module class: X.Org Video Driver
[     7.176] 	ABI class: X.Org Video Driver, version 23.0
[     7.176] (II) LoadModule: "fbdev"
[     7.176] (II) Loading /usr/lib64/xorg/modules/drivers/fbdev_drv.so
[     7.177] (II) Module fbdev: vendor="X.Org Foundation"
[     7.177] 	compiled for 1.19.1, module version = 0.4.3
[     7.177] 	Module class: X.Org Video Driver
[     7.177] 	ABI class: X.Org Video Driver, version 23.0
[     7.177] (II) LoadModule: "vesa"
[     7.177] (II) Loading /usr/lib64/xorg/modules/drivers/vesa_drv.so
[     7.177] (II) Module vesa: vendor="X.Org Foundation"
[     7.177] 	compiled for 1.19.1, module version = 2.3.2
[     7.177] 	Module class: X.Org Video Driver
[     7.177] 	ABI class: X.Org Video Driver, version 23.0
[     7.177] (II) NOUVEAU driver 
[     7.177] (II) NOUVEAU driver for NVIDIA chipset families :
[     7.177] 	RIVA TNT        (NV04)
[     7.177] 	RIVA TNT2       (NV05)
[     7.177] 	GeForce 256     (NV10)
[     7.177] 	GeForce 2       (NV11, NV15)
[     7.177] 	GeForce 4MX     (NV17, NV18)
[     7.177] 	GeForce 3       (NV20)
[     7.177] 	GeForce 4Ti     (NV25, NV28)
[     7.177] 	GeForce FX      (NV3x)
[     7.177] 	GeForce 6       (NV4x)
[     7.177] 	GeForce 7       (G7x)
[     7.177] 	GeForce 8       (G8x)
[     7.177] 	GeForce GTX 200 (NVA0)
[     7.177] 	GeForce GTX 400 (NVC0)
[     7.177] (II) modesetting: Driver for Modesetting Kernel Drivers: kms
[     7.177] (II) FBDEV: driver for framebuffer: fbdev
[     7.177] (II) VESA: driver for VESA chipsets: vesa
[     7.189] (II) modeset(0): using drv /dev/dri/card0
[     7.189] (WW) Falling back to old probe method for fbdev
[     7.189] (II) Loading sub module "fbdevhw"
[     7.189] (II) LoadModule: "fbdevhw"
[     7.189] (II) Loading /usr/lib64/xorg/modules/libfbdevhw.so
[     7.189] (II) Module fbdevhw: vendor="X.Org Foundation"
[     7.189] 	compiled for 1.19.3, module version = 0.0.2
[     7.189] 	ABI class: X.Org Video Driver, version 23.0
[     7.189] (WW) Falling back to old probe method for vesa
[     7.189] (EE) [drm] Failed to open DRM device for (null): -22
[     7.189] (II) modeset(0): Creating default Display subsection in Screen section
	"Default Screen Section" for depth/fbbpp 24/32
[     7.189] (==) modeset(0): Depth 24, (==) framebuffer bpp 32
[     7.189] (==) modeset(0): RGB weight 888
[     7.189] (==) modeset(0): Default visual is TrueColor
[     7.189] (II) Loading sub module "glamoregl"
[     7.189] (II) LoadModule: "glamoregl"
[     7.189] (II) Loading /usr/lib64/xorg/modules/libglamoregl.so
[     7.197] (II) Module glamoregl: vendor="X.Org Foundation"
[     7.197] 	compiled for 1.19.3, module version = 1.0.0
[     7.197] 	ABI class: X.Org ANSI C Emulation, version 0.4
[     7.197] (II) glamor: OpenGL accelerated X.org driver based.
[     7.251] (II) glamor: EGL version 1.4 (DRI2):
[     7.264] (II) modeset(0): glamor initialized
[     7.269] (II) modeset(0): Output VGA-1 has no monitor section
[     7.277] (II) modeset(0): Output HDMI-1 has no monitor section
[     7.320] (II) modeset(0): Output HDMI-2 has no monitor section
[     7.325] (II) modeset(0): EDID for output VGA-1
[     7.333] (II) modeset(0): EDID for output HDMI-1
[     7.376] (II) modeset(0): EDID for output HDMI-2
[     7.376] (II) modeset(0): Manufacturer: VSC  Model: a21e  Serial#: 16843009
[     7.376] (II) modeset(0): Year: 2010  Week: 9
[     7.376] (II) modeset(0): EDID Version: 1.3
[     7.376] (II) modeset(0): Digital Display Input
[     7.376] (II) modeset(0): Max Image Size [cm]: horiz.: 47  vert.: 30
[     7.376] (II) modeset(0): Gamma: 2.20
[     7.376] (II) modeset(0): DPMS capabilities: Off
[     7.376] (II) modeset(0): Supported color encodings: RGB 4:4:4 YCrCb 4:4:4 
[     7.376] (II) modeset(0): Default color space is primary color space
[     7.376] (II) modeset(0): First detailed timing is preferred mode
[     7.376] (II) modeset(0): redX: 0.640 redY: 0.333   greenX: 0.285 greenY: 0.602
[     7.376] (II) modeset(0): blueX: 0.152 blueY: 0.074   whiteX: 0.313 whiteY: 0.329
[     7.376] (II) modeset(0): Supported established timings:
[     7.376] (II) modeset(0): 720x400@70Hz
[     7.376] (II) modeset(0): 640x480@60Hz
[     7.376] (II) modeset(0): 640x480@67Hz
[     7.376] (II) modeset(0): 640x480@72Hz
[     7.376] (II) modeset(0): 640x480@75Hz
[     7.376] (II) modeset(0): 800x600@56Hz
[     7.376] (II) modeset(0): 800x600@60Hz
[     7.376] (II) modeset(0): 800x600@72Hz
[     7.376] (II) modeset(0): 800x600@75Hz
[     7.376] (II) modeset(0): 832x624@75Hz
[     7.376] (II) modeset(0): 1024x768@60Hz
[     7.376] (II) modeset(0): 1024x768@70Hz
[     7.376] (II) modeset(0): 1024x768@75Hz
[     7.376] (II) modeset(0): 1280x1024@75Hz
[     7.376] (II) modeset(0): 1152x864@75Hz
[     7.376] (II) modeset(0): Manufacturer's mask: 0
[     7.376] (II) modeset(0): Supported standard timings:
[     7.376] (II) modeset(0): #0: hsize: 1680  vsize 1050  refresh: 60  vid: 179
[     7.376] (II) modeset(0): #1: hsize: 1600  vsize 1200  refresh: 60  vid: 16553
[     7.376] (II) modeset(0): #2: hsize: 1440  vsize 900  refresh: 60  vid: 149
[     7.376] (II) modeset(0): #3: hsize: 1400  vsize 1050  refresh: 60  vid: 16528
[     7.376] (II) modeset(0): #4: hsize: 1280  vsize 1024  refresh: 60  vid: 32897
[     7.376] (II) modeset(0): #5: hsize: 1280  vsize 960  refresh: 60  vid: 16513
[     7.376] (II) modeset(0): #6: hsize: 1152  vsize 864  refresh: 75  vid: 20337
[     7.376] (II) modeset(0): #7: hsize: 640  vsize 400  refresh: 70  vid: 2609
[     7.376] (II) modeset(0): Supported detailed timing:
[     7.376] (II) modeset(0): clock: 146.2 MHz   Image Size:  474 x 296 mm
[     7.376] (II) modeset(0): h_active: 1680  h_sync: 1784  h_sync_end 1960 h_blank_end 2240 h_border: 0
[     7.376] (II) modeset(0): v_active: 1050  v_sync: 1053  v_sync_end 1059 v_blanking: 1089 v_border: 0
[     7.376] (II) modeset(0): Serial No: RBD100900310
[     7.376] (II) modeset(0): Ranges: V min: 50 V max: 75 Hz, H min: 30 H max: 82 kHz, PixClock max 175 MHz
[     7.376] (II) modeset(0): Monitor name: VG2230wm
[     7.376] (II) modeset(0): EDID (in hex):
[     7.376] (II) modeset(0): 	00ffffffffffff005a631ea201010101
[     7.376] (II) modeset(0): 	09140103802f1e782ed005a355499a27
[     7.376] (II) modeset(0): 	135054bfef80b300a940950090408180
[     7.376] (II) modeset(0): 	8140714f310a21399030621a274068b0
[     7.376] (II) modeset(0): 	3600da281100001c000000ff00524244
[     7.376] (II) modeset(0): 	3130303930303331300a000000fd0032
[     7.376] (II) modeset(0): 	4b1e5211000a202020202020000000fc
[     7.376] (II) modeset(0): 	00564732323330776d0a2020202000cb
[     7.376] (II) modeset(0): Printing probed modes for output HDMI-2
[     7.376] (II) modeset(0): Modeline "1680x1050"x60.0  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync (65.3 kHz eP)
[     7.376] (II) modeset(0): Modeline "1600x1200"x60.0  162.00  1600 1664 1856 2160  1200 1201 1204 1250 +hsync +vsync (75.0 kHz e)
[     7.376] (II) modeset(0): Modeline "1400x1050"x59.9  101.00  1400 1448 1480 1560  1050 1053 1057 1080 +hsync -vsync (64.7 kHz e)
[     7.376] (II) modeset(0): Modeline "1280x1024"x75.0  135.00  1280 1296 1440 1688  1024 1025 1028 1066 +hsync +vsync (80.0 kHz e)
[     7.376] (II) modeset(0): Modeline "1280x1024"x60.0  108.00  1280 1328 1440 1688  1024 1025 1028 1066 +hsync +vsync (64.0 kHz e)
[     7.376] (II) modeset(0): Modeline "1440x900"x59.9   88.75  1440 1488 1520 1600  900 903 909 926 +hsync -vsync (55.5 kHz e)
[     7.376] (II) modeset(0): Modeline "1280x960"x60.0  108.00  1280 1376 1488 1800  960 961 964 1000 +hsync +vsync (60.0 kHz e)
[     7.376] (II) modeset(0): Modeline "1152x864"x75.0  108.00  1152 1216 1344 1600  864 865 868 900 +hsync +vsync (67.5 kHz e)
[     7.376] (II) modeset(0): Modeline "1024x768"x75.0   78.75  1024 1040 1136 1312  768 769 772 800 +hsync +vsync (60.0 kHz e)
[     7.376] (II) modeset(0): Modeline "1024x768"x70.1   75.00  1024 1048 1184 1328  768 771 777 806 -hsync -vsync (56.5 kHz e)
[     7.376] (II) modeset(0): Modeline "1024x768"x60.0   65.00  1024 1048 1184 1344  768 771 777 806 -hsync -vsync (48.4 kHz e)
[     7.376] (II) modeset(0): Modeline "832x624"x74.6   57.28  832 864 928 1152  624 625 628 667 -hsync -vsync (49.7 kHz e)
[     7.376] (II) modeset(0): Modeline "800x600"x72.2   50.00  800 856 976 1040  600 637 643 666 +hsync +vsync (48.1 kHz e)
[     7.376] (II) modeset(0): Modeline "800x600"x75.0   49.50  800 816 896 1056  600 601 604 625 +hsync +vsync (46.9 kHz e)
[     7.376] (II) modeset(0): Modeline "800x600"x60.3   40.00  800 840 968 1056  600 601 605 628 +hsync +vsync (37.9 kHz e)
[     7.376] (II) modeset(0): Modeline "800x600"x56.2   36.00  800 824 896 1024  600 601 603 625 +hsync +vsync (35.2 kHz e)
[     7.376] (II) modeset(0): Modeline "640x480"x75.0   31.50  640 656 720 840  480 481 484 500 -hsync -vsync (37.5 kHz e)
[     7.376] (II) modeset(0): Modeline "640x480"x72.8   31.50  640 664 704 832  480 489 492 520 -hsync -vsync (37.9 kHz e)
[     7.376] (II) modeset(0): Modeline "640x480"x66.7   30.24  640 704 768 864  480 483 486 525 -hsync -vsync (35.0 kHz e)
[     7.376] (II) modeset(0): Modeline "640x480"x59.9   25.18  640 656 752 800  480 490 492 525 -hsync -vsync (31.5 kHz e)
[     7.376] (II) modeset(0): Modeline "720x400"x70.1   28.32  720 738 846 900  400 412 414 449 -hsync +vsync (31.5 kHz e)
[     7.376] (II) modeset(0): Modeline "640x400"x70.0   23.35  640 656 720 800  400 401 404 417 -hsync +vsync (29.2 kHz)
[     7.376] (II) modeset(0): Output VGA-1 disconnected
[     7.376] (II) modeset(0): Output HDMI-1 disconnected
[     7.376] (II) modeset(0): Output HDMI-2 connected
[     7.376] (II) modeset(0): Using exact sizes for initial modes
[     7.376] (II) modeset(0): Output HDMI-2 using initial mode 1680x1050 +0+0
[     7.376] (==) modeset(0): Using gamma correction (1.0, 1.0, 1.0)
[     7.376] (==) modeset(0): DPI set to (96, 96)
[     7.376] (II) Loading sub module "fb"
[     7.376] (II) LoadModule: "fb"
[     7.376] (II) Loading /usr/lib64/xorg/modules/libfb.so
[     7.377] (II) Module fb: vendor="X.Org Foundation"
[     7.377] 	compiled for 1.19.3, module version = 1.0.0
[     7.377] 	ABI class: X.Org ANSI C Emulation, version 0.4
[     7.377] (II) UnloadModule: "fbdev"
[     7.377] (II) Unloading fbdev
[     7.377] (II) UnloadSubModule: "fbdevhw"
[     7.377] (II) Unloading fbdevhw
[     7.377] (II) UnloadModule: "vesa"
[     7.377] (II) Unloading vesa
[     7.377] (==) Depth 24 pixmap format is 32 bpp
[     7.477] (==) modeset(0): Backing store enabled
[     7.477] (==) modeset(0): Silken mouse enabled
[     7.478] (II) modeset(0): RandR 1.2 enabled, ignore the following RandR disabled message.
[     7.506] (==) modeset(0): DPMS enabled
[     7.506] (II) modeset(0): [DRI2] Setup complete
[     7.506] (II) modeset(0): [DRI2]   DRI driver: i965
[     7.506] (II) modeset(0): [DRI2]   VDPAU driver: va_gl
[     7.506] (--) RandR disabled
[     7.508] (II) SELinux: Disabled by boolean
[     7.512] (II) AIGLX: enabled GLX_MESA_copy_sub_buffer
[     7.512] (II) AIGLX: enabled GLX_ARB_create_context
[     7.512] (II) AIGLX: enabled GLX_ARB_create_context_profile
[     7.512] (II) AIGLX: enabled GLX_EXT_create_context_es{,2}_profile
[     7.512] (II) AIGLX: enabled GLX_INTEL_swap_event
[     7.512] (II) AIGLX: enabled GLX_SGI_swap_control
[     7.512] (II) AIGLX: enabled GLX_EXT_framebuffer_sRGB
[     7.512] (II) AIGLX: enabled GLX_ARB_fbconfig_float
[     7.512] (II) AIGLX: enabled GLX_EXT_fbconfig_packed_float
[     7.512] (II) AIGLX: GLX_EXT_texture_from_pixmap backed by buffer objects
[     7.512] (II) AIGLX: enabled GLX_ARB_create_context_robustness
[     7.512] (II) AIGLX: Loaded and initialized i965
[     7.512] (II) GLX: Initialized DRI2 GL provider for screen 0
[     7.514] (II) modeset(0): Damage tracking initialized
[     7.514] (II) modeset(0): Setting screen physical size to 444 x 277
[     7.556] (II) config/udev: Adding input device Power Button (/dev/input/event1)
[     7.556] (**) Power Button: Applying InputClass "evdev keyboard catchall"
[     7.556] (**) Power Button: Applying InputClass "libinput keyboard catchall"
[     7.556] (**) Power Button: Applying InputClass "system-keyboard"
[     7.556] (II) LoadModule: "libinput"
[     7.556] (II) Loading /usr/lib64/xorg/modules/input/libinput_drv.so
[     7.562] (II) Module libinput: vendor="X.Org Foundation"
[     7.562] 	compiled for 1.19.3, module version = 0.25.1
[     7.562] 	Module class: X.Org XInput Driver
[     7.562] 	ABI class: X.Org XInput driver, version 24.1
[     7.562] (II) Using input driver 'libinput' for 'Power Button'
[     7.562] (**) Power Button: always reports core events
[     7.562] (**) Option "Device" "/dev/input/event1"
[     7.563] (**) Option "_source" "server/udev"
[     7.563] (II) event1  - (II) Power Button: (II) is tagged by udev as: Keyboard
[     7.563] (II) event1  - (II) Power Button: (II) device is a keyboard
[     7.563] (II) event1  - (II) Power Button: (II) device removed
[     7.578] (**) Option "config_info" "udev:/sys/devices/LNXSYSTM:00/LNXPWRBN:00/input/input1/event1"
[     7.578] (II) XINPUT: Adding extended input device "Power Button" (type: KEYBOARD, id 6)
[     7.578] (**) Option "xkb_layout" "us"
[     7.578] (II) event1  - (II) Power Button: (II) is tagged by udev as: Keyboard
[     7.578] (II) event1  - (II) Power Button: (II) device is a keyboard
[     7.578] (II) config/udev: Adding input device Video Bus (/dev/input/event14)
[     7.578] (**) Video Bus: Applying InputClass "evdev keyboard catchall"
[     7.578] (**) Video Bus: Applying InputClass "libinput keyboard catchall"
[     7.578] (**) Video Bus: Applying InputClass "system-keyboard"
[     7.578] (II) Using input driver 'libinput' for 'Video Bus'
[     7.578] (**) Video Bus: always reports core events
[     7.578] (**) Option "Device" "/dev/input/event14"
[     7.578] (**) Option "_source" "server/udev"
[     7.578] (II) event14 - (II) Video Bus: (II) is tagged by udev as: Keyboard
[     7.578] (II) event14 - (II) Video Bus: (II) device is a keyboard
[     7.578] (II) event14 - (II) Video Bus: (II) device removed
[     7.590] (**) Option "config_info" "udev:/sys/devices/LNXSYSTM:00/LNXSYBUS:00/PNP0A08:00/LNXVIDEO:00/input/input14/event14"
[     7.590] (II) XINPUT: Adding extended input device "Video Bus" (type: KEYBOARD, id 7)
[     7.590] (**) Option "xkb_layout" "us"
[     7.590] (II) event14 - (II) Video Bus: (II) is tagged by udev as: Keyboard
[     7.590] (II) event14 - (II) Video Bus: (II) device is a keyboard
[     7.590] (II) config/udev: Adding input device Power Button (/dev/input/event0)
[     7.590] (**) Power Button: Applying InputClass "evdev keyboard catchall"
[     7.590] (**) Power Button: Applying InputClass "libinput keyboard catchall"
[     7.590] (**) Power Button: Applying InputClass "system-keyboard"
[     7.590] (II) Using input driver 'libinput' for 'Power Button'
[     7.590] (**) Power Button: always reports core events
[     7.590] (**) Option "Device" "/dev/input/event0"
[     7.590] (**) Option "_source" "server/udev"
[     7.590] (II) event0  - (II) Power Button: (II) is tagged by udev as: Keyboard
[     7.590] (II) event0  - (II) Power Button: (II) device is a keyboard
[     7.590] (II) event0  - (II) Power Button: (II) device removed
[     7.598] (**) Option "config_info" "udev:/sys/devices/LNXSYSTM:00/LNXSYBUS:00/PNP0C0C:00/input/input0/event0"
[     7.598] (II) XINPUT: Adding extended input device "Power Button" (type: KEYBOARD, id 8)
[     7.598] (**) Option "xkb_layout" "us"
[     7.598] (II) event0  - (II) Power Button: (II) is tagged by udev as: Keyboard
[     7.598] (II) event0  - (II) Power Button: (II) device is a keyboard
[     7.598] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=3 (/dev/input/event20)
[     7.598] (II) No input driver specified, ignoring this device.
[     7.598] (II) This device may have been added with another device file.
[     7.598] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=7 (/dev/input/event21)
[     7.598] (II) No input driver specified, ignoring this device.
[     7.598] (II) This device may have been added with another device file.
[     7.599] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=8 (/dev/input/event22)
[     7.599] (II) No input driver specified, ignoring this device.
[     7.599] (II) This device may have been added with another device file.
[     7.599] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=9 (/dev/input/event23)
[     7.599] (II) No input driver specified, ignoring this device.
[     7.599] (II) This device may have been added with another device file.
[     7.599] (II) config/udev: Adding input device HDA Intel HDMI HDMI/DP,pcm=3 (/dev/input/event15)
[     7.599] (II) No input driver specified, ignoring this device.
[     7.599] (II) This device may have been added with another device file.
[     7.599] (II) config/udev: Adding input device HDA Intel HDMI HDMI/DP,pcm=7 (/dev/input/event16)
[     7.599] (II) No input driver specified, ignoring this device.
[     7.599] (II) This device may have been added with another device file.
[     7.599] (II) config/udev: Adding input device HDA Intel HDMI HDMI/DP,pcm=8 (/dev/input/event17)
[     7.599] (II) No input driver specified, ignoring this device.
[     7.599] (II) This device may have been added with another device file.
[     7.599] (II) config/udev: Adding input device HDA Intel HDMI HDMI/DP,pcm=9 (/dev/input/event18)
[     7.599] (II) No input driver specified, ignoring this device.
[     7.599] (II) This device may have been added with another device file.
[     7.600] (II) config/udev: Adding input device HDA Intel HDMI HDMI/DP,pcm=10 (/dev/input/event19)
[     7.600] (II) No input driver specified, ignoring this device.
[     7.600] (II) This device may have been added with another device file.
[     7.600] (II) config/udev: Adding input device MOSART Semi. 2.4G Keyboard Mouse (/dev/input/event3)
[     7.600] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "evdev keyboard catchall"
[     7.600] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "libinput keyboard catchall"
[     7.600] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "system-keyboard"
[     7.600] (II) Using input driver 'libinput' for 'MOSART Semi. 2.4G Keyboard Mouse'
[     7.600] (**) MOSART Semi. 2.4G Keyboard Mouse: always reports core events
[     7.600] (**) Option "Device" "/dev/input/event3"
[     7.600] (**) Option "_source" "server/udev"
[     7.600] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) is tagged by udev as: Keyboard
[     7.600] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a keyboard
[     7.600] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device removed
[     7.610] (**) Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-12/3-12:1.0/0003:062A:4101.0002/input/input3/event3"
[     7.610] (II) XINPUT: Adding extended input device "MOSART Semi. 2.4G Keyboard Mouse" (type: KEYBOARD, id 9)
[     7.610] (**) Option "xkb_layout" "us"
[     7.610] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) is tagged by udev as: Keyboard
[     7.610] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a keyboard
[     7.610] (II) config/udev: Adding input device MOSART Semi. 2.4G Keyboard Mouse (/dev/input/event4)
[     7.610] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "evdev pointer catchall"
[     7.610] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "evdev keyboard catchall"
[     7.610] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "libinput pointer catchall"
[     7.610] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "libinput keyboard catchall"
[     7.610] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "system-keyboard"
[     7.610] (II) Using input driver 'libinput' for 'MOSART Semi. 2.4G Keyboard Mouse'
[     7.610] (**) MOSART Semi. 2.4G Keyboard Mouse: always reports core events
[     7.610] (**) Option "Device" "/dev/input/event4"
[     7.610] (**) Option "_source" "server/udev"
[     7.611] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) is tagged by udev as: Keyboard Mouse
[     7.611] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a pointer
[     7.611] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a keyboard
[     7.611] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device removed
[     7.622] (II) libinput: MOSART Semi. 2.4G Keyboard Mouse: needs a virtual subdevice
[     7.622] (**) Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-12/3-12:1.1/0003:062A:4101.0003/input/input4/event4"
[     7.622] (II) XINPUT: Adding extended input device "MOSART Semi. 2.4G Keyboard Mouse" (type: MOUSE, id 10)
[     7.622] (**) Option "AccelerationScheme" "none"
[     7.622] (**) MOSART Semi. 2.4G Keyboard Mouse: (accel) selected scheme none/0
[     7.622] (**) MOSART Semi. 2.4G Keyboard Mouse: (accel) acceleration factor: 2.000
[     7.622] (**) MOSART Semi. 2.4G Keyboard Mouse: (accel) acceleration threshold: 4
[     7.622] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) is tagged by udev as: Keyboard Mouse
[     7.622] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a pointer
[     7.622] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a keyboard
[     7.622] (II) config/udev: Adding input device MOSART Semi. 2.4G Keyboard Mouse (/dev/input/mouse0)
[     7.622] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "system-keyboard"
[     7.622] (II) No input driver specified, ignoring this device.
[     7.622] (II) This device may have been added with another device file.
[     7.623] (II) config/udev: Adding input device UVC Camera (046d:081a) (/dev/input/event13)
[     7.623] (**) UVC Camera (046d:081a): Applying InputClass "evdev keyboard catchall"
[     7.623] (**) UVC Camera (046d:081a): Applying InputClass "libinput keyboard catchall"
[     7.623] (**) UVC Camera (046d:081a): Applying InputClass "system-keyboard"
[     7.623] (II) Using input driver 'libinput' for 'UVC Camera (046d:081a)'
[     7.623] (**) UVC Camera (046d:081a): always reports core events
[     7.623] (**) Option "Device" "/dev/input/event13"
[     7.623] (**) Option "_source" "server/udev"
[     7.623] (II) event13 - (II) UVC Camera (046d:081a): (II) is tagged by udev as: Keyboard
[     7.623] (II) event13 - (II) UVC Camera (046d:081a): (II) device is a keyboard
[     7.623] (II) event13 - (II) UVC Camera (046d:081a): (II) device removed
[     7.642] (**) Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-3/3-3:1.0/input/input13/event13"
[     7.642] (II) XINPUT: Adding extended input device "UVC Camera (046d:081a)" (type: KEYBOARD, id 11)
[     7.642] (**) Option "xkb_layout" "us"
[     7.642] (II) event13 - (II) UVC Camera (046d:081a): (II) is tagged by udev as: Keyboard
[     7.642] (II) event13 - (II) UVC Camera (046d:081a): (II) device is a keyboard
[     7.642] (II) config/udev: Adding input device Dell Dell USB Keyboard (/dev/input/event2)
[     7.642] (**) Dell Dell USB Keyboard: Applying InputClass "evdev keyboard catchall"
[     7.642] (**) Dell Dell USB Keyboard: Applying InputClass "libinput keyboard catchall"
[     7.642] (**) Dell Dell USB Keyboard: Applying InputClass "system-keyboard"
[     7.642] (II) Using input driver 'libinput' for 'Dell Dell USB Keyboard'
[     7.642] (**) Dell Dell USB Keyboard: always reports core events
[     7.642] (**) Option "Device" "/dev/input/event2"
[     7.642] (**) Option "_source" "server/udev"
[     7.642] (II) event2  - (II) Dell Dell USB Keyboard: (II) is tagged by udev as: Keyboard
[     7.643] (II) event2  - (II) Dell Dell USB Keyboard: (II) device is a keyboard
[     7.643] (II) event2  - (II) Dell Dell USB Keyboard: (II) device removed
[     7.658] (**) Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-7/3-7:1.0/0003:413C:2105.0001/input/input2/event2"
[     7.658] (II) XINPUT: Adding extended input device "Dell Dell USB Keyboard" (type: KEYBOARD, id 12)
[     7.658] (**) Option "xkb_layout" "us"
[     7.658] (II) event2  - (II) Dell Dell USB Keyboard: (II) is tagged by udev as: Keyboard
[     7.658] (II) event2  - (II) Dell Dell USB Keyboard: (II) device is a keyboard
[     7.658] (II) config/udev: Adding input device HDA Intel PCH Line Out CLFE (/dev/input/event10)
[     7.658] (II) No input driver specified, ignoring this device.
[     7.658] (II) This device may have been added with another device file.
[     7.658] (II) config/udev: Adding input device HDA Intel PCH Line Out Side (/dev/input/event11)
[     7.658] (II) No input driver specified, ignoring this device.
[     7.658] (II) This device may have been added with another device file.
[     7.658] (II) config/udev: Adding input device HDA Intel PCH Front Headphone (/dev/input/event12)
[     7.658] (II) No input driver specified, ignoring this device.
[     7.658] (II) This device may have been added with another device file.
[     7.659] (II) config/udev: Adding input device HDA Intel PCH Front Mic (/dev/input/event5)
[     7.659] (II) No input driver specified, ignoring this device.
[     7.659] (II) This device may have been added with another device file.
[     7.659] (II) config/udev: Adding input device HDA Intel PCH Rear Mic (/dev/input/event6)
[     7.659] (II) No input driver specified, ignoring this device.
[     7.659] (II) This device may have been added with another device file.
[     7.659] (II) config/udev: Adding input device HDA Intel PCH Line (/dev/input/event7)
[     7.659] (II) No input driver specified, ignoring this device.
[     7.659] (II) This device may have been added with another device file.
[     7.659] (II) config/udev: Adding input device HDA Intel PCH Line Out Front (/dev/input/event8)
[     7.659] (II) No input driver specified, ignoring this device.
[     7.659] (II) This device may have been added with another device file.
[     7.659] (II) config/udev: Adding input device HDA Intel PCH Line Out Surround (/dev/input/event9)
[     7.659] (II) No input driver specified, ignoring this device.
[     7.659] (II) This device may have been added with another device file.
[     7.673] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "evdev pointer catchall"
[     7.673] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "evdev keyboard catchall"
[     7.673] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "libinput pointer catchall"
[     7.673] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "libinput keyboard catchall"
[     7.673] (**) MOSART Semi. 2.4G Keyboard Mouse: Applying InputClass "system-keyboard"
[     7.673] (II) Using input driver 'libinput' for 'MOSART Semi. 2.4G Keyboard Mouse'
[     7.673] (**) MOSART Semi. 2.4G Keyboard Mouse: always reports core events
[     7.673] (**) Option "Device" "/dev/input/event4"
[     7.673] (**) Option "_source" "_driver/libinput"
[     7.673] (II) libinput: MOSART Semi. 2.4G Keyboard Mouse: is a virtual subdevice
[     7.673] (**) Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-12/3-12:1.1/0003:062A:4101.0003/input/input4/event4"
[     7.673] (II) XINPUT: Adding extended input device "MOSART Semi. 2.4G Keyboard Mouse" (type: KEYBOARD, id 13)
[     7.673] (**) Option "xkb_layout" "us"
[    14.985] (II) modeset(0): EDID vendor "VSC", prod id 41502
[    14.985] (II) modeset(0): Using EDID range info for horizontal sync
[    14.985] (II) modeset(0): Using EDID range info for vertical refresh
[    14.985] (II) modeset(0): Printing DDC gathered Modelines:
[    14.985] (II) modeset(0): Modeline "1680x1050"x0.0  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync (65.3 kHz eP)
[    14.985] (II) modeset(0): Modeline "800x600"x0.0   40.00  800 840 968 1056  600 601 605 628 +hsync +vsync (37.9 kHz e)
[    14.985] (II) modeset(0): Modeline "800x600"x0.0   36.00  800 824 896 1024  600 601 603 625 +hsync +vsync (35.2 kHz e)
[    14.985] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 656 720 840  480 481 484 500 -hsync -vsync (37.5 kHz e)
[    14.985] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 664 704 832  480 489 492 520 -hsync -vsync (37.9 kHz e)
[    14.985] (II) modeset(0): Modeline "640x480"x0.0   30.24  640 704 768 864  480 483 486 525 -hsync -vsync (35.0 kHz e)
[    14.985] (II) modeset(0): Modeline "640x480"x0.0   25.18  640 656 752 800  480 490 492 525 -hsync -vsync (31.5 kHz e)
[    14.985] (II) modeset(0): Modeline "720x400"x0.0   28.32  720 738 846 900  400 412 414 449 -hsync +vsync (31.5 kHz e)
[    14.985] (II) modeset(0): Modeline "1280x1024"x0.0  135.00  1280 1296 1440 1688  1024 1025 1028 1066 +hsync +vsync (80.0 kHz e)
[    14.985] (II) modeset(0): Modeline "1024x768"x0.0   78.75  1024 1040 1136 1312  768 769 772 800 +hsync +vsync (60.0 kHz e)
[    14.985] (II) modeset(0): Modeline "1024x768"x0.0   75.00  1024 1048 1184 1328  768 771 777 806 -hsync -vsync (56.5 kHz e)
[    14.985] (II) modeset(0): Modeline "1024x768"x0.0   65.00  1024 1048 1184 1344  768 771 777 806 -hsync -vsync (48.4 kHz e)
[    14.985] (II) modeset(0): Modeline "832x624"x0.0   57.28  832 864 928 1152  624 625 628 667 -hsync -vsync (49.7 kHz e)
[    14.985] (II) modeset(0): Modeline "800x600"x0.0   49.50  800 816 896 1056  600 601 604 625 +hsync +vsync (46.9 kHz e)
[    14.985] (II) modeset(0): Modeline "800x600"x0.0   50.00  800 856 976 1040  600 637 643 666 +hsync +vsync (48.1 kHz e)
[    14.985] (II) modeset(0): Modeline "1152x864"x0.0  108.00  1152 1216 1344 1600  864 865 868 900 +hsync +vsync (67.5 kHz e)
[    14.985] (II) modeset(0): Modeline "1680x1050"x0.0  119.00  1680 1728 1760 1840  1050 1053 1059 1080 +hsync -vsync (64.7 kHz e)
[    14.985] (II) modeset(0): Modeline "1600x1200"x0.0  162.00  1600 1664 1856 2160  1200 1201 1204 1250 +hsync +vsync (75.0 kHz e)
[    14.985] (II) modeset(0): Modeline "1440x900"x0.0   88.75  1440 1488 1520 1600  900 903 909 926 +hsync -vsync (55.5 kHz e)
[    14.985] (II) modeset(0): Modeline "1400x1050"x0.0  101.00  1400 1448 1480 1560  1050 1053 1057 1080 +hsync -vsync (64.7 kHz e)
[    14.985] (II) modeset(0): Modeline "1280x1024"x0.0  108.00  1280 1328 1440 1688  1024 1025 1028 1066 +hsync +vsync (64.0 kHz e)
[    14.985] (II) modeset(0): Modeline "1280x960"x0.0  108.00  1280 1376 1488 1800  960 961 964 1000 +hsync +vsync (60.0 kHz e)
[    14.985] (II) modeset(0): Modeline "640x400"x70.0   23.35  640 656 720 800  400 401 404 417 -hsync +vsync (29.2 kHz e)
[    15.057] (II) modeset(0): EDID vendor "VSC", prod id 41502
[    15.057] (II) modeset(0): Using hsync ranges from config file
[    15.057] (II) modeset(0): Using vrefresh ranges from config file
[    15.057] (II) modeset(0): Printing DDC gathered Modelines:
[    15.057] (II) modeset(0): Modeline "1680x1050"x0.0  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync (65.3 kHz eP)
[    15.057] (II) modeset(0): Modeline "800x600"x0.0   40.00  800 840 968 1056  600 601 605 628 +hsync +vsync (37.9 kHz e)
[    15.057] (II) modeset(0): Modeline "800x600"x0.0   36.00  800 824 896 1024  600 601 603 625 +hsync +vsync (35.2 kHz e)
[    15.057] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 656 720 840  480 481 484 500 -hsync -vsync (37.5 kHz e)
[    15.057] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 664 704 832  480 489 492 520 -hsync -vsync (37.9 kHz e)
[    15.057] (II) modeset(0): Modeline "640x480"x0.0   30.24  640 704 768 864  480 483 486 525 -hsync -vsync (35.0 kHz e)
[    15.057] (II) modeset(0): Modeline "640x480"x0.0   25.18  640 656 752 800  480 490 492 525 -hsync -vsync (31.5 kHz e)
[    15.057] (II) modeset(0): Modeline "720x400"x0.0   28.32  720 738 846 900  400 412 414 449 -hsync +vsync (31.5 kHz e)
[    15.057] (II) modeset(0): Modeline "1280x1024"x0.0  135.00  1280 1296 1440 1688  1024 1025 1028 1066 +hsync +vsync (80.0 kHz e)
[    15.057] (II) modeset(0): Modeline "1024x768"x0.0   78.75  1024 1040 1136 1312  768 769 772 800 +hsync +vsync (60.0 kHz e)
[    15.057] (II) modeset(0): Modeline "1024x768"x0.0   75.00  1024 1048 1184 1328  768 771 777 806 -hsync -vsync (56.5 kHz e)
[    15.057] (II) modeset(0): Modeline "1024x768"x0.0   65.00  1024 1048 1184 1344  768 771 777 806 -hsync -vsync (48.4 kHz e)
[    15.057] (II) modeset(0): Modeline "832x624"x0.0   57.28  832 864 928 1152  624 625 628 667 -hsync -vsync (49.7 kHz e)
[    15.057] (II) modeset(0): Modeline "800x600"x0.0   49.50  800 816 896 1056  600 601 604 625 +hsync +vsync (46.9 kHz e)
[    15.057] (II) modeset(0): Modeline "800x600"x0.0   50.00  800 856 976 1040  600 637 643 666 +hsync +vsync (48.1 kHz e)
[    15.057] (II) modeset(0): Modeline "1152x864"x0.0  108.00  1152 1216 1344 1600  864 865 868 900 +hsync +vsync (67.5 kHz e)
[    15.057] (II) modeset(0): Modeline "1680x1050"x0.0  119.00  1680 1728 1760 1840  1050 1053 1059 1080 +hsync -vsync (64.7 kHz e)
[    15.057] (II) modeset(0): Modeline "1600x1200"x0.0  162.00  1600 1664 1856 2160  1200 1201 1204 1250 +hsync +vsync (75.0 kHz e)
[    15.057] (II) modeset(0): Modeline "1440x900"x0.0   88.75  1440 1488 1520 1600  900 903 909 926 +hsync -vsync (55.5 kHz e)
[    15.057] (II) modeset(0): Modeline "1400x1050"x0.0  101.00  1400 1448 1480 1560  1050 1053 1057 1080 +hsync -vsync (64.7 kHz e)
[    15.057] (II) modeset(0): Modeline "1280x1024"x0.0  108.00  1280 1328 1440 1688  1024 1025 1028 1066 +hsync +vsync (64.0 kHz e)
[    15.057] (II) modeset(0): Modeline "1280x960"x0.0  108.00  1280 1376 1488 1800  960 961 964 1000 +hsync +vsync (60.0 kHz e)
[    15.057] (II) modeset(0): Modeline "640x400"x70.0   23.35  640 656 720 800  400 401 404 417 -hsync +vsync (29.2 kHz e)
[    15.127] (II) modeset(0): EDID vendor "VSC", prod id 41502
[    15.127] (II) modeset(0): Using hsync ranges from config file
[    15.127] (II) modeset(0): Using vrefresh ranges from config file
[    15.127] (II) modeset(0): Printing DDC gathered Modelines:
[    15.127] (II) modeset(0): Modeline "1680x1050"x0.0  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync (65.3 kHz eP)
[    15.127] (II) modeset(0): Modeline "800x600"x0.0   40.00  800 840 968 1056  600 601 605 628 +hsync +vsync (37.9 kHz e)
[    15.127] (II) modeset(0): Modeline "800x600"x0.0   36.00  800 824 896 1024  600 601 603 625 +hsync +vsync (35.2 kHz e)
[    15.127] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 656 720 840  480 481 484 500 -hsync -vsync (37.5 kHz e)
[    15.127] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 664 704 832  480 489 492 520 -hsync -vsync (37.9 kHz e)
[    15.127] (II) modeset(0): Modeline "640x480"x0.0   30.24  640 704 768 864  480 483 486 525 -hsync -vsync (35.0 kHz e)
[    15.127] (II) modeset(0): Modeline "640x480"x0.0   25.18  640 656 752 800  480 490 492 525 -hsync -vsync (31.5 kHz e)
[    15.127] (II) modeset(0): Modeline "720x400"x0.0   28.32  720 738 846 900  400 412 414 449 -hsync +vsync (31.5 kHz e)
[    15.127] (II) modeset(0): Modeline "1280x1024"x0.0  135.00  1280 1296 1440 1688  1024 1025 1028 1066 +hsync +vsync (80.0 kHz e)
[    15.127] (II) modeset(0): Modeline "1024x768"x0.0   78.75  1024 1040 1136 1312  768 769 772 800 +hsync +vsync (60.0 kHz e)
[    15.127] (II) modeset(0): Modeline "1024x768"x0.0   75.00  1024 1048 1184 1328  768 771 777 806 -hsync -vsync (56.5 kHz e)
[    15.127] (II) modeset(0): Modeline "1024x768"x0.0   65.00  1024 1048 1184 1344  768 771 777 806 -hsync -vsync (48.4 kHz e)
[    15.127] (II) modeset(0): Modeline "832x624"x0.0   57.28  832 864 928 1152  624 625 628 667 -hsync -vsync (49.7 kHz e)
[    15.127] (II) modeset(0): Modeline "800x600"x0.0   49.50  800 816 896 1056  600 601 604 625 +hsync +vsync (46.9 kHz e)
[    15.127] (II) modeset(0): Modeline "800x600"x0.0   50.00  800 856 976 1040  600 637 643 666 +hsync +vsync (48.1 kHz e)
[    15.127] (II) modeset(0): Modeline "1152x864"x0.0  108.00  1152 1216 1344 1600  864 865 868 900 +hsync +vsync (67.5 kHz e)
[    15.127] (II) modeset(0): Modeline "1680x1050"x0.0  119.00  1680 1728 1760 1840  1050 1053 1059 1080 +hsync -vsync (64.7 kHz e)
[    15.127] (II) modeset(0): Modeline "1600x1200"x0.0  162.00  1600 1664 1856 2160  1200 1201 1204 1250 +hsync +vsync (75.0 kHz e)
[    15.127] (II) modeset(0): Modeline "1440x900"x0.0   88.75  1440 1488 1520 1600  900 903 909 926 +hsync -vsync (55.5 kHz e)
[    15.127] (II) modeset(0): Modeline "1400x1050"x0.0  101.00  1400 1448 1480 1560  1050 1053 1057 1080 +hsync -vsync (64.7 kHz e)
[    15.127] (II) modeset(0): Modeline "1280x1024"x0.0  108.00  1280 1328 1440 1688  1024 1025 1028 1066 +hsync +vsync (64.0 kHz e)
[    15.127] (II) modeset(0): Modeline "1280x960"x0.0  108.00  1280 1376 1488 1800  960 961 964 1000 +hsync +vsync (60.0 kHz e)
[    15.127] (II) modeset(0): Modeline "640x400"x70.0   23.35  640 656 720 800  400 401 404 417 -hsync +vsync (29.2 kHz e)
[    15.644] (II) modeset(0): EDID vendor "VSC", prod id 41502
[    15.644] (II) modeset(0): Using hsync ranges from config file
[    15.644] (II) modeset(0): Using vrefresh ranges from config file
[    15.644] (II) modeset(0): Printing DDC gathered Modelines:
[    15.644] (II) modeset(0): Modeline "1680x1050"x0.0  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync (65.3 kHz eP)
[    15.644] (II) modeset(0): Modeline "800x600"x0.0   40.00  800 840 968 1056  600 601 605 628 +hsync +vsync (37.9 kHz e)
[    15.644] (II) modeset(0): Modeline "800x600"x0.0   36.00  800 824 896 1024  600 601 603 625 +hsync +vsync (35.2 kHz e)
[    15.644] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 656 720 840  480 481 484 500 -hsync -vsync (37.5 kHz e)
[    15.644] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 664 704 832  480 489 492 520 -hsync -vsync (37.9 kHz e)
[    15.644] (II) modeset(0): Modeline "640x480"x0.0   30.24  640 704 768 864  480 483 486 525 -hsync -vsync (35.0 kHz e)
[    15.644] (II) modeset(0): Modeline "640x480"x0.0   25.18  640 656 752 800  480 490 492 525 -hsync -vsync (31.5 kHz e)
[    15.644] (II) modeset(0): Modeline "720x400"x0.0   28.32  720 738 846 900  400 412 414 449 -hsync +vsync (31.5 kHz e)
[    15.644] (II) modeset(0): Modeline "1280x1024"x0.0  135.00  1280 1296 1440 1688  1024 1025 1028 1066 +hsync +vsync (80.0 kHz e)
[    15.644] (II) modeset(0): Modeline "1024x768"x0.0   78.75  1024 1040 1136 1312  768 769 772 800 +hsync +vsync (60.0 kHz e)
[    15.644] (II) modeset(0): Modeline "1024x768"x0.0   75.00  1024 1048 1184 1328  768 771 777 806 -hsync -vsync (56.5 kHz e)
[    15.644] (II) modeset(0): Modeline "1024x768"x0.0   65.00  1024 1048 1184 1344  768 771 777 806 -hsync -vsync (48.4 kHz e)
[    15.644] (II) modeset(0): Modeline "832x624"x0.0   57.28  832 864 928 1152  624 625 628 667 -hsync -vsync (49.7 kHz e)
[    15.644] (II) modeset(0): Modeline "800x600"x0.0   49.50  800 816 896 1056  600 601 604 625 +hsync +vsync (46.9 kHz e)
[    15.644] (II) modeset(0): Modeline "800x600"x0.0   50.00  800 856 976 1040  600 637 643 666 +hsync +vsync (48.1 kHz e)
[    15.644] (II) modeset(0): Modeline "1152x864"x0.0  108.00  1152 1216 1344 1600  864 865 868 900 +hsync +vsync (67.5 kHz e)
[    15.644] (II) modeset(0): Modeline "1680x1050"x0.0  119.00  1680 1728 1760 1840  1050 1053 1059 1080 +hsync -vsync (64.7 kHz e)
[    15.644] (II) modeset(0): Modeline "1600x1200"x0.0  162.00  1600 1664 1856 2160  1200 1201 1204 1250 +hsync +vsync (75.0 kHz e)
[    15.644] (II) modeset(0): Modeline "1440x900"x0.0   88.75  1440 1488 1520 1600  900 903 909 926 +hsync -vsync (55.5 kHz e)
[    15.644] (II) modeset(0): Modeline "1400x1050"x0.0  101.00  1400 1448 1480 1560  1050 1053 1057 1080 +hsync -vsync (64.7 kHz e)
[    15.644] (II) modeset(0): Modeline "1280x1024"x0.0  108.00  1280 1328 1440 1688  1024 1025 1028 1066 +hsync +vsync (64.0 kHz e)
[    15.644] (II) modeset(0): Modeline "1280x960"x0.0  108.00  1280 1376 1488 1800  960 961 964 1000 +hsync +vsync (60.0 kHz e)
[    15.644] (II) modeset(0): Modeline "640x400"x70.0   23.35  640 656 720 800  400 401 404 417 -hsync +vsync (29.2 kHz e)
[    15.702] (II) modeset(0): EDID vendor "VSC", prod id 41502
[    15.702] (II) modeset(0): Using hsync ranges from config file
[    15.702] (II) modeset(0): Using vrefresh ranges from config file
[    15.702] (II) modeset(0): Printing DDC gathered Modelines:
[    15.702] (II) modeset(0): Modeline "1680x1050"x0.0  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync (65.3 kHz eP)
[    15.702] (II) modeset(0): Modeline "800x600"x0.0   40.00  800 840 968 1056  600 601 605 628 +hsync +vsync (37.9 kHz e)
[    15.702] (II) modeset(0): Modeline "800x600"x0.0   36.00  800 824 896 1024  600 601 603 625 +hsync +vsync (35.2 kHz e)
[    15.702] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 656 720 840  480 481 484 500 -hsync -vsync (37.5 kHz e)
[    15.702] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 664 704 832  480 489 492 520 -hsync -vsync (37.9 kHz e)
[    15.702] (II) modeset(0): Modeline "640x480"x0.0   30.24  640 704 768 864  480 483 486 525 -hsync -vsync (35.0 kHz e)
[    15.702] (II) modeset(0): Modeline "640x480"x0.0   25.18  640 656 752 800  480 490 492 525 -hsync -vsync (31.5 kHz e)
[    15.702] (II) modeset(0): Modeline "720x400"x0.0   28.32  720 738 846 900  400 412 414 449 -hsync +vsync (31.5 kHz e)
[    15.702] (II) modeset(0): Modeline "1280x1024"x0.0  135.00  1280 1296 1440 1688  1024 1025 1028 1066 +hsync +vsync (80.0 kHz e)
[    15.702] (II) modeset(0): Modeline "1024x768"x0.0   78.75  1024 1040 1136 1312  768 769 772 800 +hsync +vsync (60.0 kHz e)
[    15.702] (II) modeset(0): Modeline "1024x768"x0.0   75.00  1024 1048 1184 1328  768 771 777 806 -hsync -vsync (56.5 kHz e)
[    15.702] (II) modeset(0): Modeline "1024x768"x0.0   65.00  1024 1048 1184 1344  768 771 777 806 -hsync -vsync (48.4 kHz e)
[    15.702] (II) modeset(0): Modeline "832x624"x0.0   57.28  832 864 928 1152  624 625 628 667 -hsync -vsync (49.7 kHz e)
[    15.702] (II) modeset(0): Modeline "800x600"x0.0   49.50  800 816 896 1056  600 601 604 625 +hsync +vsync (46.9 kHz e)
[    15.702] (II) modeset(0): Modeline "800x600"x0.0   50.00  800 856 976 1040  600 637 643 666 +hsync +vsync (48.1 kHz e)
[    15.702] (II) modeset(0): Modeline "1152x864"x0.0  108.00  1152 1216 1344 1600  864 865 868 900 +hsync +vsync (67.5 kHz e)
[    15.702] (II) modeset(0): Modeline "1680x1050"x0.0  119.00  1680 1728 1760 1840  1050 1053 1059 1080 +hsync -vsync (64.7 kHz e)
[    15.702] (II) modeset(0): Modeline "1600x1200"x0.0  162.00  1600 1664 1856 2160  1200 1201 1204 1250 +hsync +vsync (75.0 kHz e)
[    15.702] (II) modeset(0): Modeline "1440x900"x0.0   88.75  1440 1488 1520 1600  900 903 909 926 +hsync -vsync (55.5 kHz e)
[    15.702] (II) modeset(0): Modeline "1400x1050"x0.0  101.00  1400 1448 1480 1560  1050 1053 1057 1080 +hsync -vsync (64.7 kHz e)
[    15.702] (II) modeset(0): Modeline "1280x1024"x0.0  108.00  1280 1328 1440 1688  1024 1025 1028 1066 +hsync +vsync (64.0 kHz e)
[    15.702] (II) modeset(0): Modeline "1280x960"x0.0  108.00  1280 1376 1488 1800  960 961 964 1000 +hsync +vsync (60.0 kHz e)
[    15.702] (II) modeset(0): Modeline "640x400"x70.0   23.35  640 656 720 800  400 401 404 417 -hsync +vsync (29.2 kHz e)
[ 58008.866] (II) event1  - (II) Power Button: (II) device removed
[ 58008.884] (II) event14 - (II) Video Bus: (II) device removed
[ 58008.900] (II) event0  - (II) Power Button: (II) device removed
[ 58008.908] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device removed
[ 58008.920] (II) event13 - (II) UVC Camera (046d:081a): (II) device removed
[ 58008.932] (II) event2  - (II) Dell Dell USB Keyboard: (II) device removed
[ 58008.948] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device removed
[ 58008.962] (II) AIGLX: Suspending AIGLX clients for VT switch
[ 58009.789] (II) AIGLX: Resuming AIGLX clients after VT switch
[ 58010.019] (II) modeset(0): EDID vendor "VSC", prod id 41502
[ 58010.019] (II) modeset(0): Using hsync ranges from config file
[ 58010.019] (II) modeset(0): Using vrefresh ranges from config file
[ 58010.019] (II) modeset(0): Printing DDC gathered Modelines:
[ 58010.019] (II) modeset(0): Modeline "1680x1050"x0.0  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync (65.3 kHz eP)
[ 58010.019] (II) modeset(0): Modeline "800x600"x0.0   40.00  800 840 968 1056  600 601 605 628 +hsync +vsync (37.9 kHz e)
[ 58010.019] (II) modeset(0): Modeline "800x600"x0.0   36.00  800 824 896 1024  600 601 603 625 +hsync +vsync (35.2 kHz e)
[ 58010.019] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 656 720 840  480 481 484 500 -hsync -vsync (37.5 kHz e)
[ 58010.019] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 664 704 832  480 489 492 520 -hsync -vsync (37.9 kHz e)
[ 58010.019] (II) modeset(0): Modeline "640x480"x0.0   30.24  640 704 768 864  480 483 486 525 -hsync -vsync (35.0 kHz e)
[ 58010.019] (II) modeset(0): Modeline "640x480"x0.0   25.18  640 656 752 800  480 490 492 525 -hsync -vsync (31.5 kHz e)
[ 58010.019] (II) modeset(0): Modeline "720x400"x0.0   28.32  720 738 846 900  400 412 414 449 -hsync +vsync (31.5 kHz e)
[ 58010.019] (II) modeset(0): Modeline "1280x1024"x0.0  135.00  1280 1296 1440 1688  1024 1025 1028 1066 +hsync +vsync (80.0 kHz e)
[ 58010.019] (II) modeset(0): Modeline "1024x768"x0.0   78.75  1024 1040 1136 1312  768 769 772 800 +hsync +vsync (60.0 kHz e)
[ 58010.019] (II) modeset(0): Modeline "1024x768"x0.0   75.00  1024 1048 1184 1328  768 771 777 806 -hsync -vsync (56.5 kHz e)
[ 58010.019] (II) modeset(0): Modeline "1024x768"x0.0   65.00  1024 1048 1184 1344  768 771 777 806 -hsync -vsync (48.4 kHz e)
[ 58010.019] (II) modeset(0): Modeline "832x624"x0.0   57.28  832 864 928 1152  624 625 628 667 -hsync -vsync (49.7 kHz e)
[ 58010.019] (II) modeset(0): Modeline "800x600"x0.0   49.50  800 816 896 1056  600 601 604 625 +hsync +vsync (46.9 kHz e)
[ 58010.019] (II) modeset(0): Modeline "800x600"x0.0   50.00  800 856 976 1040  600 637 643 666 +hsync +vsync (48.1 kHz e)
[ 58010.019] (II) modeset(0): Modeline "1152x864"x0.0  108.00  1152 1216 1344 1600  864 865 868 900 +hsync +vsync (67.5 kHz e)
[ 58010.019] (II) modeset(0): Modeline "1680x1050"x0.0  119.00  1680 1728 1760 1840  1050 1053 1059 1080 +hsync -vsync (64.7 kHz e)
[ 58010.019] (II) modeset(0): Modeline "1600x1200"x0.0  162.00  1600 1664 1856 2160  1200 1201 1204 1250 +hsync +vsync (75.0 kHz e)
[ 58010.019] (II) modeset(0): Modeline "1440x900"x0.0   88.75  1440 1488 1520 1600  900 903 909 926 +hsync -vsync (55.5 kHz e)
[ 58010.019] (II) modeset(0): Modeline "1400x1050"x0.0  101.00  1400 1448 1480 1560  1050 1053 1057 1080 +hsync -vsync (64.7 kHz e)
[ 58010.019] (II) modeset(0): Modeline "1280x1024"x0.0  108.00  1280 1328 1440 1688  1024 1025 1028 1066 +hsync +vsync (64.0 kHz e)
[ 58010.019] (II) modeset(0): Modeline "1280x960"x0.0  108.00  1280 1376 1488 1800  960 961 964 1000 +hsync +vsync (60.0 kHz e)
[ 58010.019] (II) modeset(0): Modeline "640x400"x70.0   23.35  640 656 720 800  400 401 404 417 -hsync +vsync (29.2 kHz e)
[ 58010.032] (II) event1  - (II) Power Button: (II) is tagged by udev as: Keyboard
[ 58010.032] (II) event1  - (II) Power Button: (II) device is a keyboard
[ 58010.033] (II) event14 - (II) Video Bus: (II) is tagged by udev as: Keyboard
[ 58010.033] (II) event14 - (II) Video Bus: (II) device is a keyboard
[ 58010.033] (II) event0  - (II) Power Button: (II) is tagged by udev as: Keyboard
[ 58010.033] (II) event0  - (II) Power Button: (II) device is a keyboard
[ 58010.034] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) is tagged by udev as: Keyboard
[ 58010.034] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a keyboard
[ 58010.034] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) is tagged by udev as: Keyboard Mouse
[ 58010.034] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a pointer
[ 58010.034] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a keyboard
[ 58010.035] (II) event13 - (II) UVC Camera (046d:081a): (II) is tagged by udev as: Keyboard
[ 58010.035] (II) event13 - (II) UVC Camera (046d:081a): (II) device is a keyboard
[ 58010.035] (II) event2  - (II) Dell Dell USB Keyboard: (II) is tagged by udev as: Keyboard
[ 58010.035] (II) event2  - (II) Dell Dell USB Keyboard: (II) device is a keyboard
[ 58090.115] (II) event1  - (II) Power Button: (II) device removed
[ 58090.124] (II) event14 - (II) Video Bus: (II) device removed
[ 58090.140] (II) event0  - (II) Power Button: (II) device removed
[ 58090.148] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device removed
[ 58090.160] (II) event13 - (II) UVC Camera (046d:081a): (II) device removed
[ 58090.172] (II) event2  - (II) Dell Dell USB Keyboard: (II) device removed
[ 58090.184] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device removed
[ 58090.196] (II) AIGLX: Suspending AIGLX clients for VT switch
[ 58091.012] (II) AIGLX: Resuming AIGLX clients after VT switch
[ 58091.126] (II) modeset(0): EDID vendor "VSC", prod id 41502
[ 58091.126] (II) modeset(0): Using hsync ranges from config file
[ 58091.126] (II) modeset(0): Using vrefresh ranges from config file
[ 58091.126] (II) modeset(0): Printing DDC gathered Modelines:
[ 58091.126] (II) modeset(0): Modeline "1680x1050"x0.0  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync (65.3 kHz eP)
[ 58091.126] (II) modeset(0): Modeline "800x600"x0.0   40.00  800 840 968 1056  600 601 605 628 +hsync +vsync (37.9 kHz e)
[ 58091.126] (II) modeset(0): Modeline "800x600"x0.0   36.00  800 824 896 1024  600 601 603 625 +hsync +vsync (35.2 kHz e)
[ 58091.126] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 656 720 840  480 481 484 500 -hsync -vsync (37.5 kHz e)
[ 58091.126] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 664 704 832  480 489 492 520 -hsync -vsync (37.9 kHz e)
[ 58091.126] (II) modeset(0): Modeline "640x480"x0.0   30.24  640 704 768 864  480 483 486 525 -hsync -vsync (35.0 kHz e)
[ 58091.126] (II) modeset(0): Modeline "640x480"x0.0   25.18  640 656 752 800  480 490 492 525 -hsync -vsync (31.5 kHz e)
[ 58091.126] (II) modeset(0): Modeline "720x400"x0.0   28.32  720 738 846 900  400 412 414 449 -hsync +vsync (31.5 kHz e)
[ 58091.126] (II) modeset(0): Modeline "1280x1024"x0.0  135.00  1280 1296 1440 1688  1024 1025 1028 1066 +hsync +vsync (80.0 kHz e)
[ 58091.126] (II) modeset(0): Modeline "1024x768"x0.0   78.75  1024 1040 1136 1312  768 769 772 800 +hsync +vsync (60.0 kHz e)
[ 58091.126] (II) modeset(0): Modeline "1024x768"x0.0   75.00  1024 1048 1184 1328  768 771 777 806 -hsync -vsync (56.5 kHz e)
[ 58091.126] (II) modeset(0): Modeline "1024x768"x0.0   65.00  1024 1048 1184 1344  768 771 777 806 -hsync -vsync (48.4 kHz e)
[ 58091.126] (II) modeset(0): Modeline "832x624"x0.0   57.28  832 864 928 1152  624 625 628 667 -hsync -vsync (49.7 kHz e)
[ 58091.126] (II) modeset(0): Modeline "800x600"x0.0   49.50  800 816 896 1056  600 601 604 625 +hsync +vsync (46.9 kHz e)
[ 58091.126] (II) modeset(0): Modeline "800x600"x0.0   50.00  800 856 976 1040  600 637 643 666 +hsync +vsync (48.1 kHz e)
[ 58091.126] (II) modeset(0): Modeline "1152x864"x0.0  108.00  1152 1216 1344 1600  864 865 868 900 +hsync +vsync (67.5 kHz e)
[ 58091.126] (II) modeset(0): Modeline "1680x1050"x0.0  119.00  1680 1728 1760 1840  1050 1053 1059 1080 +hsync -vsync (64.7 kHz e)
[ 58091.126] (II) modeset(0): Modeline "1600x1200"x0.0  162.00  1600 1664 1856 2160  1200 1201 1204 1250 +hsync +vsync (75.0 kHz e)
[ 58091.126] (II) modeset(0): Modeline "1440x900"x0.0   88.75  1440 1488 1520 1600  900 903 909 926 +hsync -vsync (55.5 kHz e)
[ 58091.126] (II) modeset(0): Modeline "1400x1050"x0.0  101.00  1400 1448 1480 1560  1050 1053 1057 1080 +hsync -vsync (64.7 kHz e)
[ 58091.126] (II) modeset(0): Modeline "1280x1024"x0.0  108.00  1280 1328 1440 1688  1024 1025 1028 1066 +hsync +vsync (64.0 kHz e)
[ 58091.126] (II) modeset(0): Modeline "1280x960"x0.0  108.00  1280 1376 1488 1800  960 961 964 1000 +hsync +vsync (60.0 kHz e)
[ 58091.126] (II) modeset(0): Modeline "640x400"x70.0   23.35  640 656 720 800  400 401 404 417 -hsync +vsync (29.2 kHz e)
[ 58091.138] (II) event1  - (II) Power Button: (II) is tagged by udev as: Keyboard
[ 58091.138] (II) event1  - (II) Power Button: (II) device is a keyboard
[ 58091.138] (II) event14 - (II) Video Bus: (II) is tagged by udev as: Keyboard
[ 58091.138] (II) event14 - (II) Video Bus: (II) device is a keyboard
[ 58091.139] (II) event0  - (II) Power Button: (II) is tagged by udev as: Keyboard
[ 58091.139] (II) event0  - (II) Power Button: (II) device is a keyboard
[ 58091.139] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) is tagged by udev as: Keyboard
[ 58091.139] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a keyboard
[ 58091.140] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) is tagged by udev as: Keyboard Mouse
[ 58091.140] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a pointer
[ 58091.140] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a keyboard
[ 58091.140] (II) event13 - (II) UVC Camera (046d:081a): (II) is tagged by udev as: Keyboard
[ 58091.140] (II) event13 - (II) UVC Camera (046d:081a): (II) device is a keyboard
[ 58091.141] (II) event2  - (II) Dell Dell USB Keyboard: (II) is tagged by udev as: Keyboard
[ 58091.141] (II) event2  - (II) Dell Dell USB Keyboard: (II) device is a keyboard
[100860.895] (II) event1  - (II) Power Button: (II) device removed
[100860.903] (II) event14 - (II) Video Bus: (II) device removed
[100860.919] (II) event0  - (II) Power Button: (II) device removed
[100860.927] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device removed
[100860.939] (II) event13 - (II) UVC Camera (046d:081a): (II) device removed
[100860.955] (II) event2  - (II) Dell Dell USB Keyboard: (II) device removed
[100860.967] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device removed
[100860.979] (II) AIGLX: Suspending AIGLX clients for VT switch
[100861.796] (II) AIGLX: Resuming AIGLX clients after VT switch
[100861.910] (II) modeset(0): EDID vendor "VSC", prod id 41502
[100861.910] (II) modeset(0): Using hsync ranges from config file
[100861.910] (II) modeset(0): Using vrefresh ranges from config file
[100861.910] (II) modeset(0): Printing DDC gathered Modelines:
[100861.910] (II) modeset(0): Modeline "1680x1050"x0.0  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync (65.3 kHz eP)
[100861.910] (II) modeset(0): Modeline "800x600"x0.0   40.00  800 840 968 1056  600 601 605 628 +hsync +vsync (37.9 kHz e)
[100861.910] (II) modeset(0): Modeline "800x600"x0.0   36.00  800 824 896 1024  600 601 603 625 +hsync +vsync (35.2 kHz e)
[100861.910] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 656 720 840  480 481 484 500 -hsync -vsync (37.5 kHz e)
[100861.910] (II) modeset(0): Modeline "640x480"x0.0   31.50  640 664 704 832  480 489 492 520 -hsync -vsync (37.9 kHz e)
[100861.910] (II) modeset(0): Modeline "640x480"x0.0   30.24  640 704 768 864  480 483 486 525 -hsync -vsync (35.0 kHz e)
[100861.910] (II) modeset(0): Modeline "640x480"x0.0   25.18  640 656 752 800  480 490 492 525 -hsync -vsync (31.5 kHz e)
[100861.910] (II) modeset(0): Modeline "720x400"x0.0   28.32  720 738 846 900  400 412 414 449 -hsync +vsync (31.5 kHz e)
[100861.910] (II) modeset(0): Modeline "1280x1024"x0.0  135.00  1280 1296 1440 1688  1024 1025 1028 1066 +hsync +vsync (80.0 kHz e)
[100861.910] (II) modeset(0): Modeline "1024x768"x0.0   78.75  1024 1040 1136 1312  768 769 772 800 +hsync +vsync (60.0 kHz e)
[100861.910] (II) modeset(0): Modeline "1024x768"x0.0   75.00  1024 1048 1184 1328  768 771 777 806 -hsync -vsync (56.5 kHz e)
[100861.910] (II) modeset(0): Modeline "1024x768"x0.0   65.00  1024 1048 1184 1344  768 771 777 806 -hsync -vsync (48.4 kHz e)
[100861.910] (II) modeset(0): Modeline "832x624"x0.0   57.28  832 864 928 1152  624 625 628 667 -hsync -vsync (49.7 kHz e)
[100861.910] (II) modeset(0): Modeline "800x600"x0.0   49.50  800 816 896 1056  600 601 604 625 +hsync +vsync (46.9 kHz e)
[100861.910] (II) modeset(0): Modeline "800x600"x0.0   50.00  800 856 976 1040  600 637 643 666 +hsync +vsync (48.1 kHz e)
[100861.910] (II) modeset(0): Modeline "1152x864"x0.0  108.00  1152 1216 1344 1600  864 865 868 900 +hsync +vsync (67.5 kHz e)
[100861.910] (II) modeset(0): Modeline "1680x1050"x0.0  119.00  1680 1728 1760 1840  1050 1053 1059 1080 +hsync -vsync (64.7 kHz e)
[100861.911] (II) modeset(0): Modeline "1600x1200"x0.0  162.00  1600 1664 1856 2160  1200 1201 1204 1250 +hsync +vsync (75.0 kHz e)
[100861.911] (II) modeset(0): Modeline "1440x900"x0.0   88.75  1440 1488 1520 1600  900 903 909 926 +hsync -vsync (55.5 kHz e)
[100861.911] (II) modeset(0): Modeline "1400x1050"x0.0  101.00  1400 1448 1480 1560  1050 1053 1057 1080 +hsync -vsync (64.7 kHz e)
[100861.911] (II) modeset(0): Modeline "1280x1024"x0.0  108.00  1280 1328 1440 1688  1024 1025 1028 1066 +hsync +vsync (64.0 kHz e)
[100861.911] (II) modeset(0): Modeline "1280x960"x0.0  108.00  1280 1376 1488 1800  960 961 964 1000 +hsync +vsync (60.0 kHz e)
[100861.911] (II) modeset(0): Modeline "640x400"x70.0   23.35  640 656 720 800  400 401 404 417 -hsync +vsync (29.2 kHz e)
[100861.923] (II) event1  - (II) Power Button: (II) is tagged by udev as: Keyboard
[100861.923] (II) event1  - (II) Power Button: (II) device is a keyboard
[100861.923] (II) event14 - (II) Video Bus: (II) is tagged by udev as: Keyboard
[100861.923] (II) event14 - (II) Video Bus: (II) device is a keyboard
[100861.924] (II) event0  - (II) Power Button: (II) is tagged by udev as: Keyboard
[100861.924] (II) event0  - (II) Power Button: (II) device is a keyboard
[100861.924] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) is tagged by udev as: Keyboard
[100861.924] (II) event3  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a keyboard
[100861.925] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) is tagged by udev as: Keyboard Mouse
[100861.925] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a pointer
[100861.925] (II) event4  - (II) MOSART Semi. 2.4G Keyboard Mouse: (II) device is a keyboard
[100861.925] (II) event13 - (II) UVC Camera (046d:081a): (II) is tagged by udev as: Keyboard
[100861.925] (II) event13 - (II) UVC Camera (046d:081a): (II) device is a keyboard
[100861.926] (II) event2  - (II) Dell Dell USB Keyboard: (II) is tagged by udev as: Keyboard
[100861.926] (II) event2  - (II) Dell Dell USB Keyboard: (II) device is a keyboard
[root@square andrewsm]# 

[root@square andrewsm]# uname -a
Linux square.herald 4.11.12-200.fc25.x86_64 #1 SMP Fri Jul 21 16:41:43 UTC 2017 x86_64 x86_64 x86_64 GNU/Linux
### OOOOh


# rpm -qa | grep nouveau
xorg-x11-drv-nouveau-1.0.15-1.fc26.x86_64

# rpm -qa | grep intel
xorg-x11-drv-intel-2.99.917-28.20160929.fc26.x86_64


[root@square andrewsm]# ls -l /usr/lib64/xorg/modules
total 928
drwxr-xr-x. 2 root root   4096 Aug 11 22:48 drivers
drwxr-xr-x. 2 root root   4096 Aug  6 01:13 extensions
drwxr-xr-x. 2 root root   4096 Aug  6 01:19 input
-rwxr-xr-x. 1 root root  99536 Apr 24 07:53 libexa.so
-rwxr-xr-x. 1 root root  19992 Apr 24 07:53 libfbdevhw.so
-rwxr-xr-x. 1 root root 144840 Apr 24 07:53 libfb.so
-rwxr-xr-x. 1 root root 212464 Apr 24 07:53 libglamoregl.so
-rwxr-xr-x. 1 root root 151056 Apr 24 07:53 libint10.so
-rwxr-xr-x. 1 root root  11416 Apr 24 07:53 libshadowfb.so
-rwxr-xr-x. 1 root root  36176 Apr 24 07:53 libshadow.so
-rwxr-xr-x. 1 root root  28232 Apr 24 07:53 libvbe.so
-rwxr-xr-x. 1 root root  33616 Apr 24 07:53 libvgahw.so
-rwxr-xr-x. 1 root root 185776 Apr 24 07:53 libwfb.so

# ls -l /sys/module/nvidia
total 0
-r--r--r--. 1 root root 4096 Aug 14 23:00 coresize
drwxr-xr-x. 2 root root    0 Aug 14 23:25 drivers
drwxr-xr-x. 2 root root    0 Aug 14 23:00 holders
-r--r--r--. 1 root root 4096 Aug 14 23:25 initsize
-r--r--r--. 1 root root 4096 Aug 14 23:25 initstate
drwxr-xr-x. 2 root root    0 Aug 14 23:25 notes
-r--r--r--. 1 root root 4096 Aug 14 23:00 refcnt
drwxr-xr-x. 2 root root    0 Aug 14 23:25 sections
-r--r--r--. 1 root root 4096 Aug 14 23:25 srcversion
-r--r--r--. 1 root root 4096 Aug 14 23:25 taint
--w-------. 1 root root 4096 Aug 14 23:25 uevent
-r--r--r--. 1 root root 4096 Aug 14 23:25 version

# more /sys/module/nvidia/version 
384.59

# rpm -qa | grep kernel | sort
abrt-addon-kerneloops-2.10.3-1.fc26.x86_64
kernel-4.10.11-200.fc25.x86_64
kernel-4.11.11-300.fc26.x86_64
kernel-4.11.12-200.fc25.x86_64
kernel-core-4.10.11-200.fc25.x86_64
kernel-core-4.11.11-300.fc26.x86_64
kernel-core-4.11.12-200.fc25.x86_64
kernel-devel-4.10.11-200.fc25.x86_64
kernel-devel-4.11.11-300.fc26.x86_64
kernel-devel-4.11.12-200.fc25.x86_64
kernel-headers-4.11.11-300.fc26.x86_64
kernel-modules-4.10.11-200.fc25.x86_64
kernel-modules-4.11.11-300.fc26.x86_64
kernel-modules-4.11.12-200.fc25.x86_64
kernel-modules-extra-4.10.11-200.fc25.x86_64
kernel-modules-extra-4.11.11-300.fc26.x86_64
kernel-modules-extra-4.11.12-200.fc25.x86_64
libreport-plugin-kerneloops-2.9.1-2.fc26.x86_64


# lspci -k
00:02.0 VGA compatible controller: Intel Corporation Xeon E3-1200 v3/4th Gen Core Processor Integrated Graphics Controller (rev 06)
	Subsystem: Gigabyte Technology Co., Ltd Device d000
	Kernel driver in use: i915
	Kernel modules: i915
...
01:00.0 VGA compatible controller: NVIDIA Corporation GM200 [GeForce GTX TITAN X] (rev a1)
	Subsystem: NVIDIA Corporation Device 1132
	Kernel driver in use: nvidia
	Kernel modules: nouveau, nvidia_drm, nvidia
...


Could use simplest xorg.conf (suggested on https://negativo17.org/nvidia-driver/) :
Section "ServerLayout"
    Identifier "layout"
    Screen 0 "intel"
    Inactive "nvidia"
EndSection
 
Section "Device"
    Identifier "nvidia"
    Driver "nvidia"
    BusID "&lt;BusID for NVIDIA device here&gt;"
EndSection
 
Section "Screen"
    Identifier "nvidia"
    Device "nvidia"
    Option "AllowEmptyInitialConfiguration"
EndSection
 
Section "Device"
    Identifier "intel"
    Driver "modesetting"
EndSection
 
Section "Screen"
    Identifier "intel"
    Device "intel"
EndSection



!-->
