---
comments: false
date: 2007-07-21 18:22:00+00:00
title: Air-H Edge Card H407P Setup
category: OSS
wordpress_id: 130
wp_parent: '0'
wp_slug: air-h-edge-card-h407p-setup
tags:
- 600m
- AirH
- dell
- f7
- fedora
- H407P
- linux
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


## Situation

  
Trusting to the power of Linux on my laptop, I blindly ordered an AirH Edge connectivity card from JCR ([Air-H (Edge) Data Card for Laptops - No Airtime or Data Charges](http://jcrcorp.com/plans/cellular_rental_plans_main.htm)).  
  
Prior to leaving the US, I downloaded a few things, anticipating that I'd be 'flying blind' since I wouldn't be able to connect until it actually worked.  I was able to get it working eventually, but the following shows the results of a process that wasn't plain sailing at all.  
  


## Problems

  
Inserting the card had promising results :  

{% highlight bash %}
# tail /var/log/messages  
Jul 21 11:22:54 hudson kernel: pccard: PCMCIA card inserted into slot 0  
Jul 21 11:22:54 hudson kernel: cs: memory probe 0xf6000000-0xfbffffff: excluding 0xf6000000-0xf71fffff 0xf7e00000-0xf83fffff 0xf9c00000-0xfa1fffff 0xfae00000-0xfb3fffff  
Jul 21 11:22:54 hudson kernel: pcmcia: registering new device pcmcia0.0  
Jul 21 11:22:54 hudson kernel: 0.0: ttyS1 at I/O 0x2f8 (irq = 3) is a 16550A  

{% endhighlight %}
But the interrupt situation seemed worrying :  

{% highlight bash %}
andrewsm]# more /proc/interrupts   
          CPU0         
 0:    4519231    XT-PIC-XT        timer  
 1:      18190    XT-PIC-XT        i8042  
 2:          0    XT-PIC-XT        cascade  
 3:     157708    XT-PIC-XT        serial  
 5:     458618    XT-PIC-XT        Intel 82801DB-ICH4, ipw2200  
 7:          2    XT-PIC-XT        parport0  
 8:          1    XT-PIC-XT        rtc  
 9:          5    XT-PIC-XT        acpi  
11:    2519527    XT-PIC-XT        yenta, yenta, uhci_hcd:usb1, uhci_hcd:usb2,   
uhci_hcd:usb3, ehci_hcd:usb4, radeon@pci:0000:01:00.0  
12:        209    XT-PIC-XT        i8042  
14:      45115    XT-PIC-XT        libata  
15:     184709    XT-PIC-XT        libata  
NMI:          0   
LOC:          0   
ERR:          0  
MIS:          0  

{% endhighlight %}
More worryingly, the GnomePPP applet reported /dev/ttyS1 as busy (and it still does, even though I've got everything otherwise operational).  
  
Also, `wvdialconf` didn't find a modem.  
  
So, on to `minicom` to try and debug things interactively.  Interestingly, it seems that multi-part initialization strings all result in 'ERROR' from the modem.  After a bit of messing around, `ATDTxxxxxxxx` got a 'CONNECT' but wasn't responsive after that.  
  
Finally, I decided to let wvdial do the work (since it knows about flow control and passwords).  Success!  It appears that `wvdialconf` interrogates the modem with a multi-option string, which doesn't appear to work on this modem.  
  


## Solution

  
The following setup in /etc/wvdial.conf allows `wvdial nifty` to work :  

{% highlight bash %}
[root@hudson andrewsm]# more /etc/wvdial.conf  
[Modem0]  
Modem = /dev/ttyS1  
Baud = 115200  
SetVolume = 0  
Dial Command = ATDT  
Init1 = ATZ  
Init3 = ATM0  
FlowControl = CRTSCTS  
  
[Dialer nifty]  
Username = BCK02dddd@nifty.com  
Password = JCRxddddxx  
Phone = 0570990999##99  
Stupid Mode = 1  
Init1 = ATZ  
# This was the default - and the modem doesn't  
# seem to understand multi-option commands...  
#Init2 = ATQ0 V1 E1 S0=0 &C1; &D2 +FCLASS=0  
# So, splitting it up seems to do the trick  
Init2 = ATQ0  
Init3 = ATV1  
Init4 = ATE1  
Init5 = ATS0=0  
Init6 = AT&C1;  
Init7 = AT&D2  
# And kill this one, which gives 'ERROR'  
#Init8 = AT+FCLASS=0  
Inherits = Modem0  

{% endhighlight %}
Setting up a new network connection in the System-Administration-Networking dialog (using ppp and nifty as a provider name) allows the `ppp0` to be set up, to allow regular network `ifup` and `ifdown` commands.  
  


## Finally

  
Doing the following works fine : (test with ping yahoo.com, for instance) :  

{% highlight bash %}
# /sbin/ifup ppp0  

{% endhighlight %}
