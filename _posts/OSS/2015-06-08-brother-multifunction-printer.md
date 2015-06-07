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
published: true
---
{% include JB/setup %}

This is a (somewhat grey and ugly printer/scanner) that I picked up recently at a ["PC Show" at Singapore Expo](http://itfairsg.com/pcshow2015/brother-printers-laser-inkjet-colour-led-mfc-hl-dcp-mfc-price-list-flyer-brochure-15024/).

For an effective price that was less than S$200 (~U$150), this is a pretty decent deal, 
particularly since it came with a 2600-page toner, and a hand-trolley to carry it back home
with...

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

Using the standard printer configuration dialog (in XFCE for me), simply go into the printer
and update the settings to be on the network : 

*  Type : "LPD/LPR Host or Printer"
*  Host : ```192.168.1.8```
*  Queue : ```bianry_p1```
  - Device URI will become : ```lpd://192.168.1.8/binary_p1```

### Network Scanner setup 

After installing the package (which, I believe should require ```sane-backends-scanners``` 
to be installed beforehand,  based on installation error messages about unfound files), 
the Brother driver also needs to understand that it's a network-attached device.

The Magic command line (not specified in anything from Brother, but found via random internet searches) : 

```
brsaneconfig4 -a name="DCP-L2540DW" model="DCP-L2540DW" ip=192.168.1.8
```

This then adjusts the settings that can be found in :
```
/etc/opt/brother/scanner/brscan4/brsanenetdevice4.cfg
# More ideas via :
brsaneconfig4 --help
```

Hope this helps someone.
