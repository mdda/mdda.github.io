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

## Check whether USB events might be causing the wakeup

If ```EHC1```, ```EHC1``` or ```XHC``` (USB3) are shown as enabled, then it's possible that a USB 
device might be the culprit :

{% highlight bash %}
grep enabled /proc/acpi/wakeup 

#PXSX	  S4	*enabled   pci:0000:03:00.0
#EHC1	  S4	*enabled   pci:0000:00:1d.0
#EHC2	  S4	*enabled   pci:0000:00:1a.0
#XHC	  S4	*enabled   pci:0000:00:14.0
#PWRB	  S3	*enabled   platform:PNP0C0C:00
{% endhighlight %}

One *can* disable specific device-types using the following script :

{% highlight bash %}
## parse wakeup and disable wakeup for ARPT(wifi) and XHC1(usb)
cat /proc/acpi/wakeup | tail -n +2 | awk ‘{print $1,$3}’ | while read ss st;
do
  if [ $ss = “ARPT” ] || [ $ss = “XHC1” ]; then
    if [ $st = “*enabled” ]; then
      echo $ss > /proc/acpi/wakeup
    fi
  fi
{% endhighlight %}

However, this is a blunt tool if a single USB device is causing the problem.


## Track down the mouse...

First, get an idea of which strings/devices you should be searching for :

{% highlight bash %}
cat /sys/bus/usb/devices/*/product 
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

## Make the change permanent...

Put the one-liner above in a (possibly new) file ```/etc/rc.local``` with a ```bash``` invocation : 

{% highlight bash %}
#!/bin/bash
echo "disabled" > /sys/bus/usb/devices/3-12/power/wakeup
{% endhighlight %}

And then make it executable :

{% highlight bash %}
chmod +x /etc/rc.local
{% endhighlight %}

Check that the ```rc-local.service``` does exist (though it appears to be defined internally, 
rather than through a ```.service``` file like many other services) :

{% highlight bash %}
systemctl status rc-local.service 
{% endhighlight %}



All done.

