---
comments: false
date: 2007-06-17 04:39:00+00:00
title: Fedora Core 7 Upgrade Problems
category: OSS
wordpress_id: 125
wp_parent: '0'
wp_slug: fedora-core-7-upgrade-problems
tags:
- fc7
- fc6
- fedora
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Upgrading FC6 -> F7 is not painless at all (whereas FC5 -> FC6 was a breeze).  The things that needed sorting out were :  
  


  * Samba shares no longer work - not sure why.  Quickest to rebuild /etc/samba/smb.conf rather than sort it out properly.
  * xorg.conf file fails (causing even greeter login to fail).  Probably due to wacom driver not being fully updated in the distribution
  * libata complains about CDROM drive - stalling booting process.
There's sure to be more, but that's a flavour.
