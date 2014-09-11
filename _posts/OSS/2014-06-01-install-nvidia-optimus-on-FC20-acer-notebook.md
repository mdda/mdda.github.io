---
comments: true
date: 2014-06-15
title: Install nvidia Optimus drivers on Fedora FC20 Acer Notebook - BumbleBee
category: OSS
tags:
- nvidia
- fedora
- linux
- opencl
- fc20
- acer
- GT 750M
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


The Acer i5 laptop comes with two graphics paths : 

  * The i5 associated (Intel) chipset, and 
  
  * A 'discrete' nVidia GT 750M / 4Gb graphics card (which looks like the more interesting OpenCL device)
  
One issue, though, is that the Intel graphics chip is low-power, and I love the ~7hr battery life.  Whereas running the NVidia card (according to people on the internet) reduces the laptop battery life to 1.5hr.

So, it's important to be able to switch the NVidia card on only when necessary (which is what the 'Optimus' technology apparently does on Windows).

### Steps taken

To get the device driver installed for the NVidia card, here are the basic steps (ignore the first two) : 

   * Fiddle around with doing it the hard way (install from souce download)
   
   * Try something promising-looking `kmod` or `akmod`
   
   * Cave in and do it the best way : `bumblebee-nvidia`

Cutting a long story short, the hard way uncovered the fact that the new kernel driver needs signing to work with `UEFI`.  But that's tricky.  

### Disable Secure Boot (on Acer) 

So I disabled Secure Boot (no matter, at least for now : I don't feel too insecure, being on a laptop with few internet-facing services).

See : http://acer--uk.custhelp.com/app/answers/detail/a_id/27071/~/how-to-enable-or-disable-secure-boot


### Doing the NVidia install the Bumblebee way 

See https://fedoraproject.org/wiki/Bumblebee#fedora20

Before the process `lsmod | tail` gives : 

{% highlight bash %}
dm_crypt               23177  1 
crct10dif_pclmul       14289  0 
i915                  796439  3 
crc32_pclmul           13113  0 
crc32c_intel           22079  0 
ghash_clmulni_intel    13216  0 
i2c_algo_bit           13257  1 i915
drm_kms_helper         50652  1 i915
drm                   283747  2 i915,drm_kms_helper
r8169                  71677  0 
mii                    13527  1 r8169
i2c_core               38656  6 drm,i915,i2c_i801,drm_kms_helper,i2c_algo_bit,videodev
wmi                    18804  1 acer_wmi
video                  19261  2 i915,acer_wmi

{% endhighlight %}

Then do the bumblebee install : 

{% highlight bash %}
yum install -y libbsd-devel libbsd glibc-devel libX11-devel help2man autoconf git tar glib2 glib2-devel kernel-devel kernel-headers automake gcc gtk2-devel
yum install VirtualGL 

yum -y --nogpgcheck install http://install.linux.ncsu.edu/pub/yum/itecs/public/bumblebee/fedora20/noarch/bumblebee-release-1.1-1.noarch.rpm
yum -y install bbswitch bumblebee

yum -y --nogpgcheck install http://install.linux.ncsu.edu/pub/yum/itecs/public/bumblebee-nonfree/fedora20/noarch/bumblebee-nonfree-release-1.1-1.noarch.rpm
yum -y install bumblebee-nvidia

{% endhighlight %}

To force a recompilation on the next reboot : 

{% highlight bash %}
touch /etc/sysconfig/nvidia/compile-nvidia-driver
reboot
{% endhighlight %}

### But where is the driver ?

Importantly, on boot, Bumblebee doesn't install the new driver immediately.

Here's my (meagre) understanding of how it works : 

When you require the NVidia Graphics card (specifically, when you run an `optirun GRAPHICS-PROGRAM` on the command line) the bumblebee system appears to load the `nvidia` driver into the kernel, and tell it that it's in control of a small screen (which matches the dimensions of X application you're running).  By the magic of X, the graphics card is none-the-wiser, and bumblebee then 'takes a picture' of the application at 60fps, and slaps it on the actual screen (still run by the Intel graphics chip).


### Can this run OpenCL graphics coprocessor jobs?

Remains to be seen...

