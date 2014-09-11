---
comments: false
date: 2009-07-12 02:12:00+00:00
title: OpenVZ timezone
category: OSS
wordpress_id: 169
wp_parent: '0'
wp_slug: openvz-timezone
tags:
- OpenVZ
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Quick fix in a container (assuming the host has the correct time :


{% highlight bash %}
rm /etc/localtime
ln -s /usr/share/zoneinfo/US/Eastern /etc/localtime

{% endhighlight %}
