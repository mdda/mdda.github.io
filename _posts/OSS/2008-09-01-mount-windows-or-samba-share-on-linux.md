---
comments: false
date: 2008-09-07 22:40:00+00:00
title: Mount Windows (or Samba) share on Linux
category: OSS
wordpress_id: 151
wp_parent: '0'
wp_slug: mount-windows-or-samba-share-on-linux
tags:
- linux
- samba
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


After a suitable mount-point is created (in this example `mkdir -p /mnt/fscapital_server/`), into /etc/fstab put the following (all on one line) :  
  

{% highlight bash %}
# Mount windows Server drive :  
//192.168.10.120/server /mnt/fscapital_server/ cifs username=andrewsm,password=whatever 0 0   

{% endhighlight %}
where each of the spaces above is really a cntrl-t (Tab) - just for neatness, really.  
  
Then one can `mount /mnt/fscapital_server/` and see the drive immediately with `ls -l /mnt/fscapital_server/`.  Simple.
