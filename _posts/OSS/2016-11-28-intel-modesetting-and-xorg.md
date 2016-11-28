---
date: 2016-11-28
title: Intel xorg.conf on Fedora 25 (x Nvidia)
category: OSS
tags:
- fedora
- linux
- Nvidia
- intel
layout: post
published: false
---
{% include JB/setup %}


## Intel for X11 (while ignoring Nvidia card)

Having [re-installed the Nvidia drivers]() (this time using Negativo's repository),
suddenly X11 didn't boot properly.  And it's a real headache fiddling with the setup - the
following is what worked for me (and some of the process).

Bottom line:  Get the kernel parameters right, and the xorg.conf will take care of itself...  


### My particular (possibly peculiar) set-up

Two graphics systems installed in computer : 
 
*  On-board intel chipset (FWIW on a Gigabyte B85M-DH-A) with a monitor attached
*  Nvidia Titan-X graphics card with no monitor (intended for GPGPU processing only)

The main stumbling block is that the Nvidia installation (I think) modified the 
kernel parameters so that the Nvidia driver was happy - but that prevents the 
```intel``` driver from enabling ```modesetting```, which X11 requires to be 
*enabled* for the X-server to boot cleanly.

### Checking the system

Check the cards installed :

{% highlight bash %}
sudo lspci -k | grep -A3 VGA
#00:02.0 VGA compatible controller: Intel Corporation Xeon E3-1200 v3/4th Gen Core Processor Integrated Graphics Controller (rev 06)
#	Subsystem: Gigabyte Technology Co., Ltd Device d000
#	Kernel driver in use: i915
#	Kernel modules: i915
#--
#01:00.0 VGA compatible controller: NVIDIA Corporation GM200 [GeForce GTX TITAN X] (rev a1)
#	Subsystem: NVIDIA Corporation Device 1132
#	Kernel driver in use: nvidia
#	Kernel modules: nouveau, nvidia_drm, nvidia
{% endhighlight %}

Ensure the ```intel``` driver for the internal on-board video subsystem is installed :

{% highlight bash %}
dnf install xorg-x11-drv-intel
{% endhighlight %}

### Updating the kernel parameters

These can be edited on the 


### Reboot

Now after rebooting : 

{% highlight bash %}
lsmod  | grep drm
#nvidia_drm             49152  0
#nvidia_modeset        790528  1 nvidia_drm
#drm_kms_helper        151552  2 i915,nvidia_drm
#drm                   344064  6 i915,nvidia_drm,drm_kms_helper

dmesg | grep drm
#[    1.310803] [drm] Initialized drm 1.1.0 20060810
#[    1.365926] [drm] Memory usable by graphics device = 2048M
#[    1.365928] fb: switching to inteldrmfb from EFI VGA
#[    1.366003] [drm] Replacing VGA console driver
#[    1.371938] [drm] Supports vblank timestamp caching Rev 2 (21.10.2013).
#[    1.371939] [drm] Driver supports precise vblank timestamp query.
#[    1.404019] [drm] Initialized i915 1.6.0 20160711 for 0000:00:02.0 on minor 0
#[    1.419206] fbcon: inteldrmfb (fb0) is primary device
#[    1.471432] i915 0000:00:02.0: fb0: inteldrmfb frame buffer device
#[    2.750981] [drm] [nvidia-drm] [GPU ID 0x00000100] Loading driver
{% endhighlight %}

The key thing here are the references to ```nvidia``` and ```nvidia_uvm```.

If you've got references to ```nouveau``` appearing in ```lsmod```, something didn't work correctly.


### ```/etc/X11/xorg.conf```



All done.

