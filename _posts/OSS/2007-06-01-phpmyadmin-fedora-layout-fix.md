---
comments: false
date: 2007-06-13 14:41:00+00:00
title: phpMyAdmin Fedora layout fix
category: OSS
wordpress_id: 123
wp_parent: '0'
wp_slug: phpmyadmin-fedora-layout-fix
tags:
- fedora
- mysql
- php
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Because Fedora expects Apache to be running as `root:apache`, the default session information directory for php has the wrong permissions if it's running as (say) `someone:nobody`.  This disturbs the layout of the phpMyAdmin.    
  
The fix :  
  
`# chown :nobody /var/lib/php/session/`
