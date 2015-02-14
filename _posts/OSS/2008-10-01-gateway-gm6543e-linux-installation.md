---
comments: false
date: 2008-10-04 00:34:00+00:00
title: Gateway GM6543E Linux Installation
category: OSS
wordpress_id: 155
wp_parent: '0'
wp_slug: gateway-gm6543e-linux-installation
tags:
- fedora
- Gateway-GM6543E
- linux
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


### Initial Boot Problems

  
Booting kernel on stock Fedora 9 x64 DVD requires the kernel option : 'intel_iommu=off' to be appended to the kernel boot line.  
  
Updated kernels (after, say, 2.2.26), no longer need this extra parameter.  
  


### USB Keyboard

  
Unless 'Legacy USB' is set in the BIOS (which it is by default), the USB keyboard can't be used to change GRUB selections.  
  


### Hibernate

  
Seems to work.  
  


### Suspend

  
Arrrrgh! - Vista does this beautifully : Why can't Linux?  All quirks tested (it seems like it at least)...  
  
If the POST seems to fail (beeps :  5 long high, 10 short low), then disconnect the power cord (!), and hold in the power button for 15 seconds.  Then (after re-attaching the power cord) the machine should boot fine.  This became necessary when investigating the S3-related quirks.  
  


### Dual Booting

  
See other posts.  Of interest on the Gateway is that the system rescue partition is seen by the Vista loader (under GRUB) as being on `hd(0,0)`.  This is a little confusing, since the first Vista boot under a dual-boot GRUB appears to be trying to rescue the machine.    
  
The Vista line in `/boot/grub/grub.conf` should read `hd(0,1)`
