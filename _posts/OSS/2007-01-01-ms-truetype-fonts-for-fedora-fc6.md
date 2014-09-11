---
comments: false
date: 2007-01-23 18:13:00+00:00
title: MS TrueType Fonts for Fedora FC6
category: OSS
wordpress_id: 115
wp_parent: '0'
wp_slug: ms-truetype-fonts-for-fedora-fc6
tags:
- fc6
- fedora
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Many people will find it handy to have MS TrueType fonts available to make sure many websites render correctly. You can download the latest RPM from `http://www.mjmwired.net/resources/mjm-fedora-fc5.html#ttf` and install it as follows:  
  

{% highlight bash %}
#  wget --referer=http://www.mjmwired.net/resources/mjm-fedora-fc6.html \  
  http://www.mjmwired.net/resources/files/msttcorefonts-2.0-1.noarch.rpm  
# rpm -ihv msttcorefonts-2.0-1.noarch.rpm  
# /etc/init.d/xfs restart  

{% endhighlight %}
