---
comments: true
date: 2012-01-07 23:33:37+00:00
title: G2X connecting in developer mode
category: OSS
wordpress_id: 510
wp_parent: '0'
wp_slug: g2x-developer-mode
tags:
- adb
- android
- fedora
- TMobile-G2X
- linux
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


On Fedora, I was having issues getting my T-Mobile G2X to connect in developer mode.

For sure, I was setting Settings-Applications-USBdebugging to Checked.  And when plugging in the device, the SD card (and/or) internal memory space was showing up on the desktop (and the output in /var/log/messages looked equivalent to that from my working G1) - but no joy with : _adb devices_.

The Fix :  Eventually, after trying everything I could think of, to no avail, I finally toggled Settings-Applications-USBdebugging off-and-on while the phone is connected via USB.  Works fine now : 


{% highlight bash %}
$ adb devices
List of devices attached 
emulator-5554	device
0288NN0NN2ffb517	device

{% endhighlight %}

In fact, it works rather too well, since I can't go back to the old non-working situation to check that that was really the fix.  The step I took just prior was to cancel the Service for Car Home.  But that's running now, without causing any problems.  Very strange.

Please leave a comment if you have more information that can help prove/disprove that this is the right fix.



