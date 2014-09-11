---
comments: false
date: 2007-08-01 17:00:00+00:00
title: MythTV on Fedora 7, PVR-350 & Dual Screen
category: OSS
wordpress_id: 131
wp_parent: '0'
wp_slug: mythtv-on-fedora-7-pvr-350-dual-screen
tags:
- DualScreen
- f7
- fedora
- Hauppauge
- MythTV
- PVR350
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Aim :  


  * Enable a lightly used Linux machine to additionally host a MythTV video card.
Major Issues :  


  * Upgrade to 2.6.22 breaks *everything* :
    * ivtv
    * ivtv-fb
    * ivtv-xdriver  

    * ivtvfb-ctl (now gone)  

  * Want to have two independent displays (two simultaneous X servers running)
    * Complex `/etc/X11/xorg.conf`
    * Need to use `evdev` to have dual keyboards
  

    * Toy with `/etc/gdm/custom.conf` (not necessary, hardly working)  

  * Added a Belkin wireless keyboard (from woot.com)
    * Set up special keys for MythTV  

  * Control cable box via IR transmitter
Each of these will be addressed in separate postings.  
  
NB: This MythTV experience is certainly not an advertisement for building a DIY PVR.  Lots of the documentation, Wiki entries, and forum advice is badly out-of-date.  Oh well.
