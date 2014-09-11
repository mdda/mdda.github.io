---
comments: false
date: 2006-12-31 20:42:00+00:00
title: FC6 x86_64 Speedtouch 330 Wanadoo/Orange
category: OSS
wordpress_id: 106
wp_parent: '0'
wp_slug: fc6-x86_64-speedtouch-330-wanadooorange
tags:
- 64bit
- fedora
- uk
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Speedtouch driver now part of Fedora Core 6 (FC6).  
  
http://www.linux-usb.org/SpeedTouch/fedora/index.html  
  
`awk '/4061/ { print $5 }' /proc/bus/usb/devices`  
  
http://www.speedtouch.com/download/drivers/USB/SpeedTouch330_firmware_3012.zip  
  

{% highlight bash %}
unzip SpeedTouch330_firmware_3012.zip &&amp;  
chmod +x firmware-extractor &&  
./firmware-extractor ZZZL_3.012  

{% endhighlight %}
When ppp calls up your ISP it will need to know your username and password. Open a text editor (On the top Panel, Applications > Accessories > Text Editor) and enter one line in this format  
"username@isp" "*" "password"  
  
username@isp should be your username with your ISP and password should be the password for your internet account. Don't miss out the spaces in the " "*" " bit. Save that file in your home folder and call it secrets.  
  
PPP Over ATM  
  
Create a configuration file for pppd. Open a text editor, copy and paste this into it and save it in your home folder in a file called ifcfg-ppp0  
  

{% highlight bash %}
PEERDNS=yes  
TYPE=xDSL  
DEVICE=ppp0  
BOOTPROTO=dialup  
PIDFILE=/var/run/pppoa-adsl.pid  
CONNECT_POLL=6  
CONNECT_TIMEOUT=300  
SYNCHRONOUS=no  
DEFROUTE=yes  
LCP_INTERVAL=10  
LCP_FAILURE=2  
USER='username@isp'  
VPI=vpi-number  
VCI=vci-number  
LINUX_PLUGIN=pppoatm.so  

{% endhighlight %}
Change username@isp for the username your ISP knows you by. Often (but not always) it has an @isp bit at the end (It may be @dsl4.bt, for example). Also, change the vpi-number and vci-number for the VPI/VCI numbers for your country and ISP.  
  
( VPI/VCI ) = ( 0/38 ) for Orange/Wanadoo in the UK.  

{% highlight bash %}
cp speedtch-{1,2}.bin /lib/firmware  
install -m400 ifcfg-ppp0 /etc/sysconfig/network-scripts  
install -m400 secrets /etc/ppp/chap-secrets  
install -m400 secrets /etc/ppp/pap-secrets  

{% endhighlight %}
