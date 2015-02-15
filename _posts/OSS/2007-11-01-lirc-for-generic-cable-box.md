---
comments: false
date: 2007-11-02 05:51:00+00:00
title: LIRC for Generic Cable Box
category: OSS
wordpress_id: 135
wp_parent: '0'
wp_slug: lirc-for-generic-cable-box
tags:
- fc7
- fedora
- Hauppauge-PVR350
- lirc
- mythtv
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Simple schematic for building serial interface :  
  
http://fly.cc.fer.hr/~mozgic/UIR/  
http://www.lirc.org/receivers.html  
  
On 9-pin Serial plug :  
Ground : Pin 5  
Data : Pin 1 (actually DCD)  
  
Existing Hauppauge interface :  
http://www.irblaster.info/hauppauge_ir.html  
  
2.5mm Connector  
TSOP 2238 IR Receiver  
Tip  VCC  
Ring  Signal  
Shield  Ground  
  
VSOP (or Everlight) IRM2238  
http://www.datasheetarchive.com/preview/1808114.html  
VCC=5V, 38KHz  
  
USB Pinout :  
http://pinouts.ru/SerialPortsCables/usb_cable_pinout.shtml  
Pin 1 : VCC (+5V)  
Pin 2 : Data-  
Pin 3 : Data+  
Pin 4 : Ground  
  
  
Even simpler circuit for IR receiver used the +5V power from USB bus.  This does away with the need for the regulator and the capacitor.  Only component required (in addition to the Hauppauge IR receiver) is a 3K3 Ohm resistor wired as a data pull-up to the +5V VCC from the USB.  Connect the grounds of USB, Serial port and IR receiver together.  
  
Since I only wanted the receiver for long enough to record a few remote controls, no elegant solution was needed.  Indeed, the rats' nest of wires is too embarrassing to even show to anyone.  
  
[root@americas yoshika]# /sbin/rmmod lirc_serial  
[root@americas yoshika]# joe /etc/modprobe.conf  
  
alias char-major-61 lirc_serial  
# For COM1 :  
install lirc_serial /bin/setserial /dev/ttyS0 uart none ; /sbin/modprobe --ignore-install lirc_serial  
options lirc_serial irq=4 io=0x3f8  
  
# Or for COM2 :  
#install lirc_serial /bin/setserial /dev/ttyS1 uart none ; /sbin/modprobe --ignore-install lirc_serial  
#options lirc_serial irq=3 io=0x2f8  
  
  
  
[root@americas recorded]# irrecord Marantz_RC4300CC  
  
[root@americas recorded]# mode2  
pulse 29  
space 1892519  
pulse 2843  
space 999  
pulse 915  
space 2897  
  
[root@americas recorded]# cp viewmaxpro /etc/lircd.conf  
  
  
[root@americas recorded]# /etc/init.d/lircd restart  
Stopping infrared remote control daemon:                   [  OK  ]  
Starting infrared remote control daemon:                   [  OK  ]  
[root@americas recorded]# irsend LIST "" ""  
irsend: viewmaxpro  
[root@americas recorded]# irsend SEND_ONCE viewmaxpro Mute  
[root@americas recorded]# irsend SEND_ONCE viewmaxpro Mute  
[root@americas recorded]# irsend SEND_ONCE viewmaxpro Mute  
  
Test that something is being sent using a digital camera (which should see flashes from both remote control LEDs and the IR blaster.  
  
[root@americas recorded]# irsend SEND_ONCE viewmaxpro 5;sleep .2;irsend SEND_ONCE viewmaxpro 6;sleep .2
