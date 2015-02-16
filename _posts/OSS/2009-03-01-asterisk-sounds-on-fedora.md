---
comments: false
date: 2009-03-01 22:54:00+00:00
title: Asterisk Sounds on Fedora
category: OSS
wordpress_id: 162
wp_parent: '0'
wp_slug: asterisk-sounds-on-fedora
tags:
- asterisk
- fedora
- fc6
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


While all the packages I've seen try to put the sounds for Asterisk in _/var/lib/asterisk/sounds_, Fedora 10 (which includes asterisk-1.6.0.5-2) has a directory (empty) at _/usr/share/asterisk_.

To fix the problem :

{% highlight bash %}
cd /usr/share/asterisk
rmdir sounds
ln -s /var/lib/asterisk/sounds .

{% endhighlight %}
