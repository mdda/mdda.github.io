---
comments: false
date: 2010-05-20 16:19:32+00:00
title: udev rule for Android G1 phone
category: OSS
wordpress_id: 324
wp_parent: '0'
wp_slug: udev-rule-for-android-g1-phone
tags:
- android
- fedora
- mobile
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Create _/etc/udev/rules.d/91-android.rules_ with the contents :


{% highlight bash %}
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bb4", SYMLINK+="android_adb", MODE="0666", OWNER="rmbsanal"

{% endhighlight %}

Then

{% highlight bash %}
/etc/init.d/udev-post reload

{% endhighlight %}

and re-plug in your Android phone.  That's it.
