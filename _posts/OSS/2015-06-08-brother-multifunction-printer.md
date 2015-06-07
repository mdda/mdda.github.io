---
date: 2015-06-08
title: Brother DCP-L2540DW Printer/Scanner Fedora Install
category: OSS
tags:
- linux
- fedora
- Brother
- DCP-L2540DW
layout: post
published: false
---
{% include JB/setup %}

This is a (somewhat grey and ugly printer/scanner) that I picked up recently at a "PC Show" at Singapore Expo.

### Downloads from Brother site

The Brother site has a [linux link](http://support.brother.com/g/b/downloadlist.aspx?c=sg&lang=en&prod=dcpl2540dw_us_as&os=127) direct to the 
RPMs required.  Unfortunately, each one requires a separate "EULA" to be clicked-through, which is clunky.

The downloads I needed were :

*  LPR printer driver (rpm package)
*  CUPSwrapper printer driver (rpm package)
*  Scanner driver 64bit (rpm package)

and they can be installed with :

```
dnf install dcpl2540dw*.rpm brscan4-*.x86_64.rpm
```

### Network setup 

Using the control panel on the front of the printer (no Windows/MacOS computer required), 
one can set up the WiFi SSID, password, and a static IP for the printer itself.

In the following, assume WOLOG that it's set to ```192.168.1.8```.

### Network Printer setup 

The installation of the RPM 'helpfully' adds the printer as a device locally 
connected via USB, which is misleading...

Using the standard printer configuration dialog (in XFCE for me)


### Network Scanner setup 

Magic command line (not specified in anything from Brother) : 
```
brsaneconfig4 -a name="DCP-L2540DW" model="DCP-L2540DW" ip=192.168.1.8
```
