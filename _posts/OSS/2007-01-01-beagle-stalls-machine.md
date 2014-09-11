---
comments: false
date: 2007-01-08 03:22:00+00:00
title: Beagle stalls machine
category: OSS
wordpress_id: 113
wp_parent: '0'
wp_slug: beagle-stalls-machine
tags:
- beagle
- fc6
- fedora
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


I never asked for beagle to be installed (must be standard in FC6).  Apparently it's a mono application that likes to take over the machine with 100% CPU usage...  
  
Simple solution :  

{% highlight bash %}
yum remove beagle  

{% endhighlight %}
