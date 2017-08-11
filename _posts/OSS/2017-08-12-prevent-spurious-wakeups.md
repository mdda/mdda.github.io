---
date: 2017-08-12
title: Prevent Spurious Wakeup from Suspend
category: OSS
tags:
- fedora
- linux
- ACPI
layout: post
published: false
---
{% include JB/setup %}


## Track down the mouse...

First, get an idea of which strings/devices you should be searching for :

{% highlight bash %}
/sys/bus/usb/devices/*/product 
{% endhighlight %}

Now, specify that you need the 'mouse' device id:

{% highlight bash %}
grep -i  "mouse" /sys/bus/usb/devices/*/product 
#/sys/bus/usb/devices/3-12/product:2.4G Keyboard Mouse
{% endhighlight %}

Use the device id found to disable the power wakeup (just once) :

{% highlight bash %}
echo "disabled" > /sys/bus/usb/devices/3-12/power/wakeup
{% endhighlight %}

Test the resume-from-suspend cycle is no longer triggered by the mouse...



All done.

