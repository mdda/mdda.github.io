---
comments: false
date: 2008-07-20 23:07:00+00:00
title: lirc_serial stopped working...
category: OSS
wordpress_id: 144
wp_parent: '0'
wp_slug: lirc_serial-stopped-working
tags:
- fc9
- fedora
- LIRC
- MythTV
- PVR350
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


After upgrading to FC9, the previously working serial port channel-changer (bought from [IRblaster.info]( http://www.irblaster.info/)) stopped working.  None of the configuration had changed.  
  
In addition to the serial port transmitter, there's a receiver on the PVR350 card - handled by lirc_i2c  
  
After much searching, an additional option came to light : `softcarrier=1`.  
  
Here are the relevant parts of a confirmed working setup :  
  
* From `/etc/modprobe.conf` :  

{% highlight bash %}
# This is for the PVR350 IR receiver  
alias char-major-61-0 lirc_i2c  
install lirc_i2c /sbin/modprobe ivtv; /sbin/modprobe --ignore-install lirc_i2c  
  
# This is for the InfraRed on the Serial Port COM1  
alias char-major-61-1 lirc_serial  
install lirc_serial /bin/setserial /dev/ttyS0 uart none ; /sbin/modprobe --ignore-install lirc_serial  
options lirc_serial irq=4 io=0x3f8 softcarrier=1  
  
# Version for COM2  
#install lirc_serial /bin/setserial /dev/ttyS1 uart none ; /sbin/modprobe --ignore-install lirc_serial  
#options lirc_serial irq=3 io=0x2f8 softcarrier=1  

{% endhighlight %}
* From `/etc/rc.local` :  

{% highlight bash %}
/sbin/modprobe lirc_i2c  
/sbin/modprobe lirc_serial  
  
# This will be the lirc_i2c    (hauppauge receiver)  
/usr/sbin/lircd --device=/dev/lirc  --output=/dev/lircd  
  
# This will be the COM1 device (blaster)  
/usr/sbin/lircd --device=/dev/lirc1 --output=/dev/lircd1 --driver=default --pidf  
ile=/var/run/lircd1.pid  
  
chmod 0666 /dev/lirc0  
chmod 0666 /dev/lirc1  

{% endhighlight %}
