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
published: true
---
{% include JB/setup %}


## Intel for X11 (while ignoring Nvidia card)

Having [re-installed the Nvidia drivers]() (this time using Negativo's repository),
suddenly X11 didn't boot properly.  And it's a real headache fiddling with the setup - the
following is what worked for me (and some of the process).

Bottom line:  Get the kernel parameters right, and the ```xorg.conf``` will take care of itself...  


### My Deep Learning computer set-up

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

The important thing to note is the ```00:02.0``` as the PCI 'slot' for the Intel controller 
(this number needs to be slightly reformatted for a ```xorg.conf``` file).

Ensure the ```intel``` driver for the internal on-board video subsystem is installed :

{% highlight bash %}
dnf install xorg-x11-drv-intel
{% endhighlight %}

### Updating the kernel parameters

NB: These can be edited during the boot process as a check/backup while testing things.

The relevant contents of ```/etc/default/grub``` were set as follows by the Nvidia installer :

{% highlight bash %}
GRUB_CMDLINE_LINUX="nouveau.modeset=0 rd.driver.blacklist=nouveau nomodeset \
  gfxpayload=vga=normal rd.lvm.lv=fedora swap rd.lvm.lv=fedora/root rhgb quiet"
{% endhighlight %}

But the basic point is that ```xorg-x11-drv-intel``` requires the ```intel``` driver
(which is loaded by the kernel, for me, via ```i915```)  to be in ```modesetting``` mode.

Therefore, the ```/etc/default/grub``` line needs to be updated to :

{% highlight bash %}
GRUB_CMDLINE_LINUX="rd.driver.blacklist=nouveau nvidia.modeset=0 nouveau.modeset=0 intel.modeset=1 \
  gfxpayload=vga=normal rd.lvm.lv=fedora/swap rd.lvm.lv=fedora/root rhgb quiet"
{% endhighlight %}

(notice that all the available graphics modules are ```.modeset=0``` apart from ```intel.modeset=1```,
and that ```nouveau``` is still disabled).

Once that has been updated, run :

{% highlight bash %}
grub2-mkconfig -o /boot/grub2/grub.cfg
# or, if EFI boot is enabled (which it is for me) :
grub2-mkconfig -o /boot/efi/EFI/fedora/grub.cfg
{% endhighlight %}

As helpfully pointed out by the creator of the Negativo RPMs, it's probably not essential to 
explicitly set all the ```.modeset``` parameters individually - there's likely to be a 
leaner combination that works.  However, given how irritating it is having a machine that boots badly,
I feel that doing it 'long-hand' has its own benefits...


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


### ```/etc/X11/xorg.conf```

During experimentation, I was fiddling with an ```/etc/X11/xorg.conf``` that ended up like this (working, but rather hacky) : 

{% highlight bash %}
Section "ServerLayout"
	Identifier     "X.org Configured"
	Screen      0  "Screen0" 0 0
	#Screen      1  "Screen1" RightOf "Screen0"
	InputDevice    "Mouse0" "CorePointer"
	InputDevice    "Keyboard0" "CoreKeyboard"
	#Inactive 	"nouveau"  # Must be a Device Identifier
	#Inactive 	"nvidia"   # Must be a Device Identifier
	Inactive 	"Card0"
EndSection

Section "Files"
	ModulePath   "/usr/lib64/xorg/modules"
	FontPath     "catalogue:/etc/X11/fontpath.d"
	FontPath     "built-ins"
EndSection

Section "Module"
	Load  "glx"
EndSection

Section "Module"
	Load "dri2"
	Load "glamoregl"
	Load "modesetting"
EndSection

Section "InputDevice"
	Identifier  "Keyboard0"
	Driver      "kbd"
EndSection

Section "InputDevice"
	Identifier  "Mouse0"
	Driver      "mouse"
	Option	    "Protocol" "auto"
	Option	    "Device" "/dev/input/mice"
	Option	    "ZAxisMapping" "4 5 6 7"
EndSection

Section "Device"
	Identifier  "Card0"
	#Driver      "nouveau"
	Driver      "nvidia"
	BusID       "PCI:1:0:0"
EndSection

Section "Device"
	Identifier  "Card1"

	# modesetting (doesn't seem to work at all)
	#Driver      "modesetting"
	#Option      "AccelMethod"	"glamore"
	#Option	    "DRI"      		"false"
	
	# This works at correct resolution, but is very slow
	#Driver      "vesa"

	# This works only at /etc/fb.modes (?) and chooses 1024x768
	#Driver      "fbdev"

	# This now works, but only if 'nomodeset' is removed from kernel
	# options, and intel.modeset=1 is present (and no other .modeset=1)
	Driver      "intel"
	#Option	    "NoAccel" "True"
	#Option	    "DRI"	"false"

	# Needs to be set to match the value given by `lscpi`
	BusID       "PCI:0:2:0"
EndSection

Section "Screen"
	Identifier "Screen0"
	Device     "Card1"
	Monitor    "Monitor0"
EndSection

Section "Monitor"
	Identifier   "Monitor0"
	VendorName   "Monitor Vendor"
	ModelName    "Monitor Model"

	# Run "cvt X Y"
	Modeline "1024x768"   63.50  1024 1072 1176 1328  768 771 775 798 -hsync +vsync
	Modeline "1680x1050"  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync
	Modeline "1920x1080"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync

	#Option          "PreferredMode" "1680x1050"
	Option          "PreferredMode" "1920x1080"
EndSection
{% endhighlight %}

However, while it's nice that the above ```/etc/X11/xorg.conf``` works, it's nicer still 
that if the system starts without an ```/etc/X11/xorg.conf```, it will configure itself automatically.

Fortunately, with the correct kernel parameters (as above), the system auto-configuration works perfectly,
and X boots on the on-board graphics chip both with acceleration switched on and in the correct resolution
(the window manager Display tool will list of all the available resolutions too).


All done.

