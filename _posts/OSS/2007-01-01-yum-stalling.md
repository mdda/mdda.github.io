---
comments: false
date: 2007-01-08 03:19:00+00:00
title: Yum stalling
category: OSS
wordpress_id: 112
wp_parent: '0'
wp_slug: yum-stalling
tags:
- fedora
- yum
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


It appears that the RPM database needs rebuilding if a yum process is killed  
prematurely, since it probably had the RPM db open and now it's in an inconsistent  
state.  
  
The steps :  
  


  * Kill all yum and rpm processes.
  * `rm -f /var/lib/rpm/__db*`
  * `rpm --rebuilddb`  (add -vv if you want to see what it's doing)
  * Retry `yum update`.
