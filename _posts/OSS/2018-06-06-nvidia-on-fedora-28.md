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
published: false
---
{% include JB/setup %}


## Just use Negativo's Repo...

Since Nvidia totally screwed up the ```gcc``` versioning/ABI on Fedora 24, I decided to 
take the *easy option* and use someone else's pre-packaged Nvidia installation.

I had tried this method before (on previous Fedoras), but the choices of paths had
left me unconvinced (particularly since during the 'teething' phase of getting the
installation working, error messages can come from all sorts of sources/reasons).

*However*, the Negativo repo has been quickly updated to ```cuda-9.1``` and it seems that 
the ```TensorFlow``` team has decided : 

*  that ```9.1``` is going to be an orphan version as far as ```TensorFlow``` goes;
*  that everything will be fixed in the ```1.9``` release of ```TensorFlow```;
*  and that means that if you're upgrading, you're basically stuck until the 1.9RC magically appears.

So, given that my installation was already working for Fedora 27, 
I wanted to do an upgrade without disturbing the existing ```cuda-9.0``` packages.

Here's a quick run-down of what has worked for me (building on the [previous installation](/oss/2017/12/13/nvidia-on-fedora-27)) :


### Sanity-check the existing installation

First ensure that the following is in ```/etc/dnf/dnf.conf``` : 

{% highlight bash %}
exclude=kernel* cuda* *nvidia* nvidia-driver-NVML nvidia-driver-cuda-libs 
{% endhighlight %}

This means that the standard upgrade won't touch the kernel or working ```cuda``` installation (will be fixed later).

Also, take notes about which ```.conf``` files are in:
{% highlight bash %}
/etc/X11/
/etc/X11/xorg.conf.d/
{% endhighlight %}

For my installation (which has a GPU card which isn't connected to a monitor, and motherboard integrated ```intel```
graphics connected to the actual monitor), there are *NO* special ```.conf``` files : It all works 
via autoconfiguration.  Note that NVidia has a habbit of trying to fix this up for you by writing their own
configuration files without asking : These should be moved to ```.conf-disabled``` if you get any new problems with the following steps...


### Upgrade the fedora version (excluding kernels)

Then follow the [standard upgrade steps](https://fedoraproject.org/wiki/DNF_system_upgrade) :

{% highlight bash %}
dnf upgrade --refresh
dnf install dnf-plugin-system-upgrade
# reboot should be fairly quick

dnf system-upgrade download --refresh --releasever=28
dnf system-upgrade reboot
# reboot takes ~ 40mins
{% endhighlight %}

Hopefully, everything should come back as before.  


### Check that you've got a GPU

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











### Install ```TensorFlow``` for the GPU 

<!--
https://negativo17.org/cuda-9-0-cudnn-7-0-and-wayland-support-in-fedora-27/
!-->

Looking within the [TensorFlow installation instructions](https://www.tensorflow.org/install/install_linux) 
for "Download and install cuDNN" shows that TensorFlow v1.4 (the current stable release) expects ```CUDA toolkit v8.0```, 
which is not good, because Negativo packing supplies ```CUDA v9.0``` (there's a similar issue for ```cuDNN```, for which
Negativo supplies ```v7.0```).

To counteract this, install the (now available)  ```TensorFlow``` 'nightly' build, which is apparently built to be 
ready for the latest versions
(this assumes ```python 3.x```, which should be the obvious choice by now): 

{% highlight bash %}
virtualenv --system-site-packages -p python3 ~/env3
. ~/env3/bin/activate

# Then, for either version :
pip install tf-nightly-gpu

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
2017-12-13 13:52:24.519403: I tensorflow/core/platform/cpu_feature_guard.cc:137] Your CPU supports instructions that this TensorFlow binary was not compiled to use: SSE4.1 SSE4.2 AVX AVX2 FMA
2017-12-13 13:52:24.760070: I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:895] successful NUMA node read from SysFS had negative value (-1), but there must be at least one NUMA node, so returning NUMA node zero
2017-12-13 13:52:24.760300: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1103] Found device 0 with properties: 
name: GeForce GTX 760 major: 3 minor: 0 memoryClockRate(GHz): 1.137
pciBusID: 0000:01:00.0
totalMemory: 1.95GiB freeMemory: 1.91GiB
2017-12-13 13:52:24.760315: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1193] Creating TensorFlow device (/device:GPU:0) -> (device: 0, name: GeForce GTX 760, pci bus id: 0000:01:00.0, compute capability: 3.0)
Device mapping:
/job:localhost/replica:0/task:0/device:GPU:0 -> device: 0, name: GeForce GTX 760, pci bus id: 0000:01:00.0, compute capability: 3.0
2017-12-13 13:52:24.923252: I tensorflow/core/common_runtime/direct_session.cc:297] Device mapping:
/job:localhost/replica:0/task:0/device:GPU:0 -> device: 0, name: GeForce GTX 760, pci bus id: 0000:01:00.0, compute capability: 3.0

>>> print(sess.run(c))
MatMul: (MatMul): /job:localhost/replica:0/task:0/device:GPU:0
2017-12-13 13:52:24.923963: I tensorflow/core/common_runtime/placer.cc:874] MatMul: (MatMul)/job:localhost/replica:0/task:0/device:GPU:0
b: (Const): /job:localhost/replica:0/task:0/device:GPU:0
2017-12-13 13:52:24.923988: I tensorflow/core/common_runtime/placer.cc:874] b: (Const)/job:localhost/replica:0/task:0/device:GPU:0
a: (Const): /job:localhost/replica:0/task:0/device:GPU:0
2017-12-13 13:52:24.923999: I tensorflow/core/common_runtime/placer.cc:874] a: (Const)/job:localhost/replica:0/task:0/device:GPU:0
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
an option for CUDA toolkit v9.0, which is good, and Python 3.6 is supported (also good).

{% highlight bash %}
pip3 install http://download.pytorch.org/whl/cu90/torch-0.3.0.post4-cp36-cp36m-linux_x86_64.whl 
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
nvidia, 387.22, 4.13.12-300.fc27.x86_64, x86_64: installed


# rpm -qa | grep nvidia | sort
dkms-nvidia-387.22-1.fc27.x86_64
nvidia-driver-387.22-1.fc27.x86_64
nvidia-driver-cuda-387.22-1.fc27.x86_64
nvidia-driver-cuda-libs-387.22-1.fc27.x86_64
nvidia-driver-libs-387.22-1.fc27.x86_64
nvidia-driver-NVML-387.22-1.fc27.x86_64
nvidia-modprobe-387.22-1.fc27.x86_64
nvidia-persistenced-387.22-1.fc27.x86_64

# rpm -qa | grep libglvnd | sort
libglvnd-0.2.999-24.20170818git8d4d03f.fc27.i686
libglvnd-0.2.999-24.20170818git8d4d03f.fc27.x86_64
libglvnd-egl-0.2.999-24.20170818git8d4d03f.fc27.i686
libglvnd-egl-0.2.999-24.20170818git8d4d03f.fc27.x86_64
libglvnd-gles-0.2.999-24.20170818git8d4d03f.fc27.x86_64
libglvnd-glx-0.2.999-24.20170818git8d4d03f.fc27.i686
libglvnd-glx-0.2.999-24.20170818git8d4d03f.fc27.x86_64
libglvnd-opengl-0.2.999-24.20170818git8d4d03f.fc27.x86_64


# rpm -qa | grep libvdpau | sort
libvdpau-1.1.1-6.fc27.x86_64

[root@square andrewsm]# cat /var/log/Xorg.0.log
[     5.723] 
X.Org X Server 1.19.5
Release Date: 2017-10-12
[     5.723] X Protocol Version 11, Revision 0
[     5.723] Build Operating System:  4.12.9-300.fc26.x86_64 
[     5.723] Current Operating System: Linux simlim.herald 4.13.12-300.fc27.x86_64 #1 SMP Wed Nov 8 16:38:01 UTC 2017 x86_64
[     5.723] Kernel command line: BOOT_IMAGE=/vmlinuz-4.13.12-300.fc27.x86_64 root=/dev/mapper/fedora-root ro rd.driver.blacklist=nouveau rd.lvm.lv=fedora/swap rd.lvm.lv=fedora/root rhgb quiet LANG=en_US.UTF-8
[     5.723] Build Date: 12 October 2017  07:35:27PM
[     5.723] Build ID: xorg-x11-server 1.19.5-1.fc27 
[     5.723] Current version of pixman: 0.34.0
[     5.723] 	Before reporting problems, check http://wiki.x.org
	to make sure that you have the latest version.
[     5.723] Markers: (--) probed, (**) from config file, (==) default setting,
	(++) from command line, (!!) notice, (II) informational,
	(WW) warning, (EE) error, (NI) not implemented, (??) unknown.
[     5.724] (==) Log file: "/var/log/Xorg.0.log", Time: Wed Nov 15 16:26:24 2017
[     5.727] (==) Using config file: "/etc/X11/xorg.conf"
[     5.727] (==) Using config directory: "/etc/X11/xorg.conf.d"
[     5.727] (==) Using system config directory "/usr/share/X11/xorg.conf.d"
[     5.730] (==) ServerLayout "layout"
[     5.730] (**) |--&gt;Screen "intel" (0)
[     5.730] (**) |   |--&gt;Monitor "<default monitor&gt;"
[     5.731] (**) |   |--&gt;Device "intel"
[     5.731] (**) |   |--&gt;GPUDevice "intel"
[     5.731] (==) No monitor specified for screen "intel".
	Using a default monitor configuration.
[     5.731] (**) |--&gt;Inactive Device "nvidia"
[     5.731] (==) Automatically adding devices
[     5.731] (==) Automatically enabling devices
[     5.731] (==) Automatically adding GPU devices
[     5.731] (==) Automatically binding GPU devices
[     5.731] (==) Max clients allowed: 256, resource mask: 0x1fffff
[     5.731] (==) FontPath set to:
	catalogue:/etc/X11/fontpath.d,
	built-ins
[     5.731] (==) ModulePath set to "/usr/lib64/xorg/modules"
[     5.731] (II) The server relies on udev to provide the list of input devices.
	If no devices become available, reconfigure udev or disable AutoAddDevices.
[     5.731] (II) Loader magic: 0x821e00
[     5.731] (II) Module ABI versions:
[     5.731] 	X.Org ANSI C Emulation: 0.4
[     5.731] 	X.Org Video Driver: 23.0
[     5.731] 	X.Org XInput driver : 24.1
[     5.731] 	X.Org Server Extension : 10.0
[     5.732] (++) using VT number 1

[     5.732] (II) systemd-logind: logind integration requires -keeptty and -keeptty was not provided, disabling logind integration
[     5.732] (II) xfree86: Adding drm device (/dev/dri/card1)
[     5.732] (II) xfree86: Adding drm device (/dev/dri/card0)
[     5.736] (--) PCI:*(0:0:2:0) 8086:0412:1458:d000 rev 6, Mem @ 0xdb400000/4194304, 0xc0000000/268435456, I/O @ 0x0000f000/64, BIOS @ 0x????????/131072
[     5.736] (--) PCI: (0:1:0:0) 10de:1187:1569:1187 rev 161, Mem @ 0xda000000/16777216, 0xd0000000/134217728, 0xd8000000/33554432, I/O @ 0x0000e000/128, BIOS @ 0x????????/524288
[     5.736] (II) LoadModule: "glx"
[     5.741] (II) Loading /usr/lib64/xorg/modules/extensions/libglx.so
[     5.831] (II) Module glx: vendor="X.Org Foundation"
[     5.831] 	compiled for 1.19.5, module version = 1.0.0
[     5.831] 	ABI class: X.Org Server Extension, version 10.0
[     5.831] (II) LoadModule: "intel"
[     5.831] (II) Loading /usr/lib64/xorg/modules/drivers/intel_drv.so
[     5.837] (II) Module intel: vendor="X.Org Foundation"
[     5.837] 	compiled for 1.19.5, module version = 2.99.917
[     5.837] 	Module class: X.Org Video Driver
[     5.837] 	ABI class: X.Org Video Driver, version 23.0
[     5.837] (II) LoadModule: "nvidia"
[     5.837] (II) Loading /usr/lib64/xorg/modules/drivers/nvidia_drv.so
[     5.848] (II) Module nvidia: vendor="NVIDIA Corporation"
[     5.848] 	compiled for 4.0.2, module version = 1.0.0
[     5.848] 	Module class: X.Org Video Driver
[     5.848] (II) intel: Driver for Intel(R) Integrated Graphics Chipsets:
	i810, i810-dc100, i810e, i815, i830M, 845G, 854, 852GM/855GM, 865G,
	915G, E7221 (i915), 915GM, 945G, 945GM, 945GME, Pineview GM,
	Pineview G, 965G, G35, 965Q, 946GZ, 965GM, 965GME/GLE, G33, Q35, Q33,
	GM45, 4 Series, G45/G43, Q45/Q43, G41, B43
[     5.849] (II) intel: Driver for Intel(R) HD Graphics
[     5.849] (II) intel: Driver for Intel(R) Iris(TM) Graphics
[     5.849] (II) intel: Driver for Intel(R) Iris(TM) Pro Graphics
[     5.849] (II) NVIDIA dlloader X Driver  387.22  Wed Oct 25 22:14:47 PDT 2017
[     5.849] (II) NVIDIA Unified Driver for all Supported NVIDIA GPUs
[     5.851] (II) intel(0): Using Kernel Mode Setting driver: i915, version 1.6.0 20170619
[     5.899] (II) Loading sub module "fb"
[     5.899] (II) LoadModule: "fb"
[     5.900] (II) Loading /usr/lib64/xorg/modules/libfb.so
[     5.905] (II) Module fb: vendor="X.Org Foundation"
[     5.905] 	compiled for 1.19.5, module version = 1.0.0
[     5.905] 	ABI class: X.Org ANSI C Emulation, version 0.4
[     5.905] (II) Loading sub module "wfb"
[     5.905] (II) LoadModule: "wfb"
[     5.905] (II) Loading /usr/lib64/xorg/modules/libwfb.so
[     5.915] (II) Module wfb: vendor="X.Org Foundation"
[     5.915] 	compiled for 1.19.5, module version = 1.0.0
[     5.915] 	ABI class: X.Org ANSI C Emulation, version 0.4
[     5.915] (II) Loading sub module "ramdac"
[     5.915] (II) LoadModule: "ramdac"
[     5.915] (II) Module "ramdac" already built-in
[     5.920] (--) intel(0): Integrated Graphics Chipset: Intel(R) HD Graphics 4600
[     5.920] (--) intel(0): CPU: x86-64, sse2, sse3, ssse3, sse4.1, sse4.2, avx, avx2; using a maximum of 4 threads
[     5.920] (II) intel(0): Creating default Display subsection in Screen section
	"intel" for depth/fbbpp 24/32
[     5.920] (==) intel(0): Depth 24, (--) framebuffer bpp 32
[     5.920] (==) intel(0): RGB weight 888
[     5.920] (==) intel(0): Default visual is TrueColor
[     5.920] (II) intel(0): Output VGA1 has no monitor section
[     5.920] (II) intel(0): Enabled output VGA1
[     5.920] (II) intel(0): Output HDMI1 has no monitor section
[     5.920] (II) intel(0): Enabled output HDMI1
[     5.920] (II) intel(0): Output HDMI2 has no monitor section
[     5.920] (II) intel(0): Enabled output HDMI2
[     5.920] (--) intel(0): Using a maximum size of 256x256 for hardware cursors
[     5.920] (II) intel(0): Output VIRTUAL1 has no monitor section
[     5.920] (II) intel(0): Enabled output VIRTUAL1
[     5.920] (--) intel(0): Output HDMI1 using initial mode 1920x1080 on pipe 0
[     5.921] (==) intel(0): TearFree disabled
[     5.921] (==) intel(0): Using gamma correction (1.0, 1.0, 1.0)
[     5.921] (==) intel(0): DPI set to (96, 96)
[     5.921] (II) Loading sub module "dri3"
[     5.921] (II) LoadModule: "dri3"
[     5.921] (II) Module "dri3" already built-in
[     5.921] (II) Loading sub module "dri2"
[     5.921] (II) LoadModule: "dri2"
[     5.921] (II) Module "dri2" already built-in
[     5.921] (II) Loading sub module "present"
[     5.921] (II) LoadModule: "present"
[     5.921] (II) Module "present" already built-in
[     5.921] (==) Depth 24 pixmap format is 32 bpp
[     5.930] (II) intel(0): SNA initialized with Haswell (gen7.5, gt2) backend
[     5.930] (==) intel(0): Backing store enabled
[     5.930] (==) intel(0): Silken mouse enabled
[     5.931] (II) intel(0): HW Cursor enabled
[     5.931] (II) intel(0): RandR 1.2 enabled, ignore the following RandR disabled message.
[     5.933] (==) intel(0): DPMS enabled
[     5.933] (==) intel(0): Display hotplug detection enabled
[     5.933] (II) intel(0): [DRI2] Setup complete
[     5.933] (II) intel(0): [DRI2]   DRI driver: i965
[     5.933] (II) intel(0): [DRI2]   VDPAU driver: va_gl
[     5.933] (II) intel(0): direct rendering: DRI2 DRI3 enabled
[     5.933] (II) intel(0): hardware support for Present enabled
[     5.933] (--) RandR disabled
[     5.936] (II) SELinux: Disabled by boolean
[     5.985] (II) AIGLX: enabled GLX_MESA_copy_sub_buffer
[     5.985] (II) AIGLX: enabled GLX_ARB_create_context
[     5.985] (II) AIGLX: enabled GLX_ARB_create_context_profile
[     5.985] (II) AIGLX: enabled GLX_EXT_create_context_es{,2}_profile
[     5.985] (II) AIGLX: enabled GLX_INTEL_swap_event
[     5.985] (II) AIGLX: enabled GLX_SGI_swap_control
[     5.985] (II) AIGLX: enabled GLX_EXT_framebuffer_sRGB
[     5.985] (II) AIGLX: enabled GLX_ARB_fbconfig_float
[     5.985] (II) AIGLX: enabled GLX_EXT_fbconfig_packed_float
[     5.985] (II) AIGLX: GLX_EXT_texture_from_pixmap backed by buffer objects
[     5.985] (II) AIGLX: enabled GLX_ARB_create_context_robustness
[     5.985] (II) AIGLX: Loaded and initialized i965
[     5.985] (II) GLX: Initialized DRI2 GL provider for screen 0
[     5.987] (II) intel(0): switch to mode 1920x1080@60.0 on HDMI1 using pipe 0, position (0, 0), rotation normal, reflection none
[     6.001] (II) intel(0): Setting screen physical size to 508 x 285
[     6.051] (II) config/udev: Adding input device Power Button (/dev/input/event1)
[     6.051] (**) Power Button: Applying InputClass "evdev keyboard catchall"
[     6.051] (**) Power Button: Applying InputClass "libinput keyboard catchall"
[     6.051] (**) Power Button: Applying InputClass "system-keyboard"
[     6.051] (II) LoadModule: "libinput"
[     6.051] (II) Loading /usr/lib64/xorg/modules/input/libinput_drv.so
[     6.059] (II) Module libinput: vendor="X.Org Foundation"
[     6.059] 	compiled for 1.19.3, module version = 0.26.0
[     6.059] 	Module class: X.Org XInput Driver
[     6.059] 	ABI class: X.Org XInput driver, version 24.1
[     6.059] (II) Using input driver 'libinput' for 'Power Button'
[     6.059] (**) Power Button: always reports core events
[     6.059] (**) Option "Device" "/dev/input/event1"
[     6.059] (**) Option "_source" "server/udev"
[     6.059] (II) event1  - (II) Power Button: (II) is tagged by udev as: Keyboard
[     6.059] (II) event1  - (II) Power Button: (II) device is a keyboard
[     6.059] (II) event1  - (II) Power Button: (II) device removed
[     6.068] (**) Option "config_info" "udev:/sys/devices/LNXSYSTM:00/LNXPWRBN:00/input/input1/event1"
[     6.068] (II) XINPUT: Adding extended input device "Power Button" (type: KEYBOARD, id 6)
[     6.068] (**) Option "xkb_layout" "us"
[     6.068] (II) event1  - (II) Power Button: (II) is tagged by udev as: Keyboard
[     6.068] (II) event1  - (II) Power Button: (II) device is a keyboard
[     6.068] (II) config/udev: Adding input device Video Bus (/dev/input/event3)
[     6.068] (**) Video Bus: Applying InputClass "evdev keyboard catchall"
[     6.068] (**) Video Bus: Applying InputClass "libinput keyboard catchall"
[     6.068] (**) Video Bus: Applying InputClass "system-keyboard"
[     6.068] (II) Using input driver 'libinput' for 'Video Bus'
[     6.068] (**) Video Bus: always reports core events
[     6.068] (**) Option "Device" "/dev/input/event3"
[     6.068] (**) Option "_source" "server/udev"
[     6.069] (II) event3  - (II) Video Bus: (II) is tagged by udev as: Keyboard
[     6.069] (II) event3  - (II) Video Bus: (II) device is a keyboard
[     6.069] (II) event3  - (II) Video Bus: (II) device removed
[     6.090] (**) Option "config_info" "udev:/sys/devices/LNXSYSTM:00/LNXSYBUS:00/PNP0A08:00/LNXVIDEO:00/input/input3/event3"
[     6.090] (II) XINPUT: Adding extended input device "Video Bus" (type: KEYBOARD, id 7)
[     6.090] (**) Option "xkb_layout" "us"
[     6.090] (II) event3  - (II) Video Bus: (II) is tagged by udev as: Keyboard
[     6.090] (II) event3  - (II) Video Bus: (II) device is a keyboard
[     6.090] (II) config/udev: Adding input device Power Button (/dev/input/event0)
[     6.090] (**) Power Button: Applying InputClass "evdev keyboard catchall"
[     6.090] (**) Power Button: Applying InputClass "libinput keyboard catchall"
[     6.090] (**) Power Button: Applying InputClass "system-keyboard"
[     6.090] (II) Using input driver 'libinput' for 'Power Button'
[     6.090] (**) Power Button: always reports core events
[     6.090] (**) Option "Device" "/dev/input/event0"
[     6.090] (**) Option "_source" "server/udev"
[     6.090] (II) event0  - (II) Power Button: (II) is tagged by udev as: Keyboard
[     6.090] (II) event0  - (II) Power Button: (II) device is a keyboard
[     6.090] (II) event0  - (II) Power Button: (II) device removed
[     6.099] (**) Option "config_info" "udev:/sys/devices/LNXSYSTM:00/LNXSYBUS:00/PNP0C0C:00/input/input0/event0"
[     6.099] (II) XINPUT: Adding extended input device "Power Button" (type: KEYBOARD, id 8)
[     6.099] (**) Option "xkb_layout" "us"
[     6.099] (II) event0  - (II) Power Button: (II) is tagged by udev as: Keyboard
[     6.099] (II) event0  - (II) Power Button: (II) device is a keyboard
[     6.099] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=3 (/dev/input/event18)
[     6.099] (II) No input driver specified, ignoring this device.
[     6.099] (II) This device may have been added with another device file.
[     6.099] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=7 (/dev/input/event19)
[     6.099] (II) No input driver specified, ignoring this device.
[     6.099] (II) This device may have been added with another device file.
[     6.100] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=8 (/dev/input/event20)
[     6.100] (II) No input driver specified, ignoring this device.
[     6.100] (II) This device may have been added with another device file.
[     6.100] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=9 (/dev/input/event21)
[     6.100] (II) No input driver specified, ignoring this device.
[     6.100] (II) This device may have been added with another device file.
[     6.100] (II) config/udev: Adding input device HDA Intel HDMI HDMI/DP,pcm=3 (/dev/input/event5)
[     6.100] (II) No input driver specified, ignoring this device.
[     6.100] (II) This device may have been added with another device file.
[     6.100] (II) config/udev: Adding input device HDA Intel HDMI HDMI/DP,pcm=7 (/dev/input/event6)
[     6.100] (II) No input driver specified, ignoring this device.
[     6.100] (II) This device may have been added with another device file.
[     6.101] (II) config/udev: Adding input device HDA Intel HDMI HDMI/DP,pcm=8 (/dev/input/event7)
[     6.101] (II) No input driver specified, ignoring this device.
[     6.101] (II) This device may have been added with another device file.
[     6.101] (II) config/udev: Adding input device HDA Intel HDMI HDMI/DP,pcm=9 (/dev/input/event8)
[     6.101] (II) No input driver specified, ignoring this device.
[     6.101] (II) This device may have been added with another device file.
[     6.101] (II) config/udev: Adding input device HDA Intel HDMI HDMI/DP,pcm=10 (/dev/input/event9)
[     6.101] (II) No input driver specified, ignoring this device.
[     6.101] (II) This device may have been added with another device file.
[     6.101] (II) config/udev: Adding input device Dell Dell USB Keyboard (/dev/input/event2)
[     6.101] (**) Dell Dell USB Keyboard: Applying InputClass "evdev keyboard catchall"
[     6.101] (**) Dell Dell USB Keyboard: Applying InputClass "libinput keyboard catchall"
[     6.101] (**) Dell Dell USB Keyboard: Applying InputClass "system-keyboard"
[     6.101] (II) Using input driver 'libinput' for 'Dell Dell USB Keyboard'
[     6.101] (**) Dell Dell USB Keyboard: always reports core events
[     6.101] (**) Option "Device" "/dev/input/event2"
[     6.101] (**) Option "_source" "server/udev"
[     6.102] (II) event2  - (II) Dell Dell USB Keyboard: (II) is tagged by udev as: Keyboard
[     6.102] (II) event2  - (II) Dell Dell USB Keyboard: (II) device is a keyboard
[     6.102] (II) event2  - (II) Dell Dell USB Keyboard: (II) device removed
[     6.112] (**) Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-3/3-3:1.0/0003:413C:2003.0001/input/input2/event2"
[     6.112] (II) XINPUT: Adding extended input device "Dell Dell USB Keyboard" (type: KEYBOARD, id 9)
[     6.112] (**) Option "xkb_layout" "us"
[     6.112] (II) event2  - (II) Dell Dell USB Keyboard: (II) is tagged by udev as: Keyboard
[     6.112] (II) event2  - (II) Dell Dell USB Keyboard: (II) device is a keyboard
[     6.112] (II) config/udev: Adding input device  USB OPTICAL MOUSE (/dev/input/event4)
[     6.112] (**)  USB OPTICAL MOUSE: Applying InputClass "evdev pointer catchall"
[     6.112] (**)  USB OPTICAL MOUSE: Applying InputClass "libinput pointer catchall"
[     6.112] (II) Using input driver 'libinput' for ' USB OPTICAL MOUSE'
[     6.112] (**)  USB OPTICAL MOUSE: always reports core events
[     6.112] (**) Option "Device" "/dev/input/event4"
[     6.112] (**) Option "_source" "server/udev"
[     6.164] (II) event4  - (II)  USB OPTICAL MOUSE: (II) is tagged by udev as: Mouse
[     6.164] (II) event4  - (II)  USB OPTICAL MOUSE: (II) device is a pointer
[     6.164] (II) event4  - (II)  USB OPTICAL MOUSE: (II) device removed
[     6.180] (**) Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-4/3-4:1.0/0003:0000:0538.0002/input/input4/event4"
[     6.180] (II) XINPUT: Adding extended input device " USB OPTICAL MOUSE" (type: MOUSE, id 10)
[     6.180] (**) Option "AccelerationScheme" "none"
[     6.180] (**)  USB OPTICAL MOUSE: (accel) selected scheme none/0
[     6.180] (**)  USB OPTICAL MOUSE: (accel) acceleration factor: 2.000
[     6.180] (**)  USB OPTICAL MOUSE: (accel) acceleration threshold: 4
[     6.232] (II) event4  - (II)  USB OPTICAL MOUSE: (II) is tagged by udev as: Mouse
[     6.232] (II) event4  - (II)  USB OPTICAL MOUSE: (II) device is a pointer
[     6.232] (II) config/udev: Adding input device  USB OPTICAL MOUSE (/dev/input/mouse0)
[     6.232] (II) No input driver specified, ignoring this device.
[     6.232] (II) This device may have been added with another device file.
[     6.233] (II) config/udev: Adding input device HDA Intel PCH Front Mic (/dev/input/event10)
[     6.233] (II) No input driver specified, ignoring this device.
[     6.233] (II) This device may have been added with another device file.
[     6.233] (II) config/udev: Adding input device HDA Intel PCH Rear Mic (/dev/input/event11)
[     6.233] (II) No input driver specified, ignoring this device.
[     6.233] (II) This device may have been added with another device file.
[     6.233] (II) config/udev: Adding input device HDA Intel PCH Line (/dev/input/event12)
[     6.234] (II) No input driver specified, ignoring this device.
[     6.234] (II) This device may have been added with another device file.
[     6.234] (II) config/udev: Adding input device HDA Intel PCH Line Out Front (/dev/input/event13)
[     6.234] (II) No input driver specified, ignoring this device.
[     6.234] (II) This device may have been added with another device file.
[     6.235] (II) config/udev: Adding input device HDA Intel PCH Line Out Surround (/dev/input/event14)
[     6.235] (II) No input driver specified, ignoring this device.
[     6.235] (II) This device may have been added with another device file.
[     6.235] (II) config/udev: Adding input device HDA Intel PCH Line Out CLFE (/dev/input/event15)
[     6.235] (II) No input driver specified, ignoring this device.
[     6.235] (II) This device may have been added with another device file.
[     6.235] (II) config/udev: Adding input device HDA Intel PCH Line Out Side (/dev/input/event16)
[     6.236] (II) No input driver specified, ignoring this device.
[     6.236] (II) This device may have been added with another device file.
[     6.236] (II) config/udev: Adding input device HDA Intel PCH Front Headphone (/dev/input/event17)
[     6.236] (II) No input driver specified, ignoring this device.
[     6.236] (II) This device may have been added with another device file.
[     7.962] (II) intel(0): EDID vendor "ACR", prod id 991
[     7.962] (II) intel(0): Using EDID range info for horizontal sync
[     7.962] (II) intel(0): Using EDID range info for vertical refresh
[     7.962] (II) intel(0): Printing DDC gathered Modelines:
[     7.962] (II) intel(0): Modeline "1920x1080"x0.0  148.50  1920 2008 2052 2200  1080 1084 1089 1125 +hsync +vsync (67.5 kHz eP)
[     7.962] (II) intel(0): Modeline "800x600"x0.0   40.00  800 840 968 1056  600 601 605 628 +hsync +vsync (37.9 kHz e)
[     7.962] (II) intel(0): Modeline "800x600"x0.0   36.00  800 824 896 1024  600 601 603 625 +hsync +vsync (35.2 kHz e)
[     7.962] (II) intel(0): Modeline "640x480"x0.0   30.24  640 704 768 864  480 483 486 525 -hsync -vsync (35.0 kHz e)
[     7.962] (II) intel(0): Modeline "640x480"x0.0   25.18  640 656 752 800  480 490 492 525 -hsync -vsync (31.5 kHz e)
[     7.962] (II) intel(0): Modeline "720x400"x0.0   28.32  720 738 846 900  400 412 414 449 -hsync +vsync (31.5 kHz e)
[     7.962] (II) intel(0): Modeline "1024x768"x0.0   75.00  1024 1048 1184 1328  768 771 777 806 -hsync -vsync (56.5 kHz e)
[     7.962] (II) intel(0): Modeline "1024x768"x0.0   65.00  1024 1048 1184 1344  768 771 777 806 -hsync -vsync (48.4 kHz e)
[     7.962] (II) intel(0): Modeline "1152x864"x0.0  108.00  1152 1216 1344 1600  864 865 868 900 +hsync +vsync (67.5 kHz e)
[     7.962] (II) intel(0): Modeline "1280x1024"x0.0  108.00  1280 1328 1440 1688  1024 1025 1028 1066 +hsync +vsync (64.0 kHz e)
[     7.962] (II) intel(0): Modeline "1280x720"x60.0   74.48  1280 1336 1472 1664  720 721 724 746 -hsync +vsync (44.8 kHz e)
[     7.962] (II) intel(0): Modeline "1280x800"x0.0   71.00  1280 1328 1360 1440  800 803 809 823 +hsync -vsync (49.3 kHz e)
[     7.962] (II) intel(0): Modeline "1440x900"x0.0   88.75  1440 1488 1520 1600  900 903 909 926 +hsync -vsync (55.5 kHz e)
[     7.962] (II) intel(0): Modeline "1680x1050"x0.0  119.00  1680 1728 1760 1840  1050 1053 1059 1080 +hsync -vsync (64.7 kHz e)
[     7.962] (II) intel(0): Modeline "1920x1080"x60.0  172.80  1920 2040 2248 2576  1080 1081 1084 1118 -hsync +vsync (67.1 kHz e)

[root@square andrewsm]# uname -a
Linux simlim.herald 4.13.12-300.fc27.x86_64 #1 SMP Wed Nov 8 16:38:01 UTC 2017 x86_64 x86_64 x86_64 GNU/Linux
### OOOOh


# rpm -qa | grep nouveau
xorg-x11-drv-nouveau-1.0.15-3.fc27.x86_64

# rpm -qa | grep intel
xorg-x11-drv-intel-2.99.917-31.20171025.fc27.x86_64


[root@square andrewsm]# ls -l /usr/lib64/xorg/modules
total 928
drwxr-xr-x. 2 root root   4096 Nov 15 16:00 drivers
drwxr-xr-x. 2 root root   4096 Nov 15 15:54 extensions
drwxr-xr-x. 2 root root   4096 Nov 15 16:00 input
-rwxr-xr-x. 1 root root  99576 Oct 13 03:37 libexa.so
-rwxr-xr-x. 1 root root  20016 Oct 13 03:37 libfbdevhw.so
-rwxr-xr-x. 1 root root 144864 Oct 13 03:37 libfb.so
-rwxr-xr-x. 1 root root 212544 Oct 13 03:37 libglamoregl.so
-rwxr-xr-x. 1 root root 151072 Oct 13 03:37 libint10.so
-rwxr-xr-x. 1 root root  11432 Oct 13 03:37 libshadowfb.so
-rwxr-xr-x. 1 root root  36192 Oct 13 03:37 libshadow.so
-rwxr-xr-x. 1 root root  28256 Oct 13 03:37 libvbe.so
-rwxr-xr-x. 1 root root  33632 Oct 13 03:37 libvgahw.so
-rwxr-xr-x. 1 root root 185800 Oct 13 03:37 libwfb.so

# ls -l /sys/module/nvidia
total 0
-r--r--r--. 1 root root 4096 Dec 13 11:35 coresize
drwxr-xr-x. 2 root root    0 Dec 13 13:56 drivers
drwxr-xr-x. 2 root root    0 Dec 13 11:35 holders
-r--r--r--. 1 root root 4096 Dec 13 13:56 initsize
-r--r--r--. 1 root root 4096 Dec 13 13:56 initstate
drwxr-xr-x. 2 root root    0 Dec 13 13:56 notes
-r--r--r--. 1 root root 4096 Dec 13 11:35 refcnt
drwxr-xr-x. 2 root root    0 Dec 13 13:56 sections
-r--r--r--. 1 root root 4096 Dec 13 13:56 srcversion
-r--r--r--. 1 root root 4096 Dec 13 13:56 taint
--w-------. 1 root root 4096 Dec 13 13:56 uevent
-r--r--r--. 1 root root 4096 Dec 13 13:56 version

# more /sys/module/nvidia/version 
387.22

# rpm -qa | grep kernel | sort
abrt-addon-kerneloops-2.10.5-1.fc27.x86_64
kernel-4.13.12-200.fc26.x86_64
kernel-4.13.12-300.fc27.x86_64
kernel-4.13.5-200.fc26.x86_64
kernel-core-4.13.12-200.fc26.x86_64
kernel-core-4.13.12-300.fc27.x86_64
kernel-core-4.13.5-200.fc26.x86_64
kernel-debug-devel-4.13.12-200.fc26.x86_64
kernel-debug-devel-4.13.12-300.fc27.x86_64
kernel-debug-devel-4.13.5-200.fc26.x86_64
kernel-devel-4.13.12-200.fc26.x86_64
kernel-devel-4.13.12-300.fc27.x86_64
kernel-devel-4.13.5-200.fc26.x86_64
kernel-headers-4.13.12-300.fc27.x86_64
kernel-modules-4.13.12-200.fc26.x86_64
kernel-modules-4.13.12-300.fc27.x86_64
kernel-modules-4.13.5-200.fc26.x86_64
kernel-modules-extra-4.13.12-200.fc26.x86_64
kernel-modules-extra-4.13.12-300.fc27.x86_64
kernel-modules-extra-4.13.5-200.fc26.x86_64
libreport-plugin-kerneloops-2.9.3-1.fc27.x86_64
texlive-l3kernel-svn41246-36.fc27.5.noarch


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
