---
comments: false
date: 2007-08-30 23:42:00+00:00
title: Verizon USB720 on Fedora
category: OSS
wordpress_id: 134
wp_parent: '0'
wp_slug: verizon-usb720-on-fedora
tags:
- fedora
- laptop
- linux
- USB720
- Verizon
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


The device was initially registered with Verizon using the VZaccess application on Windows.  This may be a step that requires their annoy-ware.  After that initial stage, the device contains an embedded phone number, that is required to do proper logging-in for _National Access / Broadband Access_.  
  
Plugging this into a spare USB port on my Fedora Linux laptop (and looking in `/var/log/messages`) showed that Fedora 7 recognizes the device 'out of the box', without any special modifications.  Visually, after a short pause upon insertion, the yellow/green light switches from _off_ to constantly _on_.  
  
In order to set up `ppp` properly, you need to find the phone number associated with the Verizon modem.    
  
Normally, this is visible in the Windows VZaccess application 'Help-About' box.  However, for the USB720 I was lent, this box just said 'Unable to read hardware' (or something to that effect.  
  
To discover the phone number, I fired up `minicom` and (after changing the modem device to `/dev/ttyUSB0`, and the rate to 19200N1) saw that the modem was responding to the slew of commands that `minicom` had in its initialization step.  Then, from a helpful (but ad-laden site) I found the following commands to type into the `minicom` interactive terminal :  
  

{% highlight bash %}
AT+GSN  
# returns something like :  
# 0x5B5DF555 (the ESN in hex)  

{% endhighlight %}
`  
AT+GMR   
# returns something like :  
# m6800A-RAPTOR_VZW_141 April 05, 2007 14:00:00 EST  
# (the version #s)  

{% highlight bash %}
`f7,   
AT$QCMIPGETP  
# returns something like :   
# ... lots of stuff ...  
#  {MyPhoneNumber}@vzw3g.com  
# ... lots of other stuff ...  

{% endhighlight %}
Bingo!  
  
I believe (untested, but seen many places) that the correct `ppp` setup includes the following (where the PhoneNumber is as found using `minicom` as above) :  
  

{% highlight bash %}
phone number to dial : #777  
username             : PhoneNumber@vzw3g.com   
password             : _Blank_ or _vzw_   

{% endhighlight %}
There are various scripts and tweaks available, but the above seems like a major trick that isn't so readily available.  
  


### Here's something that definitely works

  
Into `/etc/ppp/peers/verizon` put :   

{% highlight bash %}
ttyUSB0  
115200  
debug  
noauth  
defaultroute  
usepeerdns  
connect-delay 10000  
user XXXYYYZZZZ@vzw3g.com  
show-password  
crtscts  
lock  
lcp-echo-failure 4  
lcp-echo-interval 65535  
connect '/usr/sbin/chat -v -t3 -f /etc/ppp/peers/verizon_chat'  

{% endhighlight %}
Where XXXYYYZZZZ is the phone number from above.  
  
Into `/etc/ppp/peers/verizon_chat` put :   

{% highlight bash %}
ABORT 'NO CARRIER' ABORT ERROR ABORT 'NO DIALTONE' ABORT BUSY ABORT 'NO ANSWER'  
'' 'ATTEV1&F;&D2;&C1;&C2S0;=0S7=60'  
'OK-ATTEV1&F;&D2;&C1;&C2S0;=0S7=60-OK-ATTEV1&F;&D2;&C1;&C2S0;=0S7=60-OK' 'AT+CSQ;D#777'  
TIMEOUT 70  
'CONNECT-AT+CSQ;D#777-CONNECT'  

{% endhighlight %}
To start the connection use:  

{% highlight bash %}
/usr/sbin/ppp call verizon  
# Optional :  
/tail -f /var/log/messages  

{% endhighlight %}
If the DNS doesn't seem to be picking up, have a look at /var/log/messages for the Primary DNS, and edit /etc/resolv.conf manually (in my case doing ` echo "nameserver 66.174.95.44" > /etc/resolv.conf` works).  Running /sbin/dhclient-script can also do the trick.
