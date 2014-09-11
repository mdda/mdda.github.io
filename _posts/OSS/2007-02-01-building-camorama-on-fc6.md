---
comments: false
date: 2007-02-09 23:28:00+00:00
title: Building Camorama on FC6
category: OSS
wordpress_id: 119
wp_parent: '0'
wp_slug: building-camorama-on-fc6
tags:
- fc6
- webcam
layout: post
from_mdda_blog: true
---
{% include JB/setup %}



{% highlight bash %}
# curl -O http://camorama.fixedgear.org/downloads/camorama-0.18.tar.bz2  
# bunzip2 camorama-0.18.tar.bz2   
# tar -xf camorama-0.18.tar   
# cd camorama-0.18  
# ./configure  
# yum install libgnomeui-devel  
### possibly also : yum install gdk-pixbuf libglade glade2   
# make  
# make install  
$ camorama &   
$ (Need to set save directory for image grabs to /home/xyz/WebCam, instead of ~/WebCam)  

{% endhighlight %}
