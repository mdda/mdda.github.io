---
date: 2015-06-07
title: Android MTP for Fedora Linux
category: OSS
tags:
- linux
- fedora
- phone
- android
- mtp
layout: post
published: true
---
{% include JB/setup %}

I recently bought an 'Elephone 6000' via Aliexpress.  It came with Android 5.0 
(and is, incidentally, a nice phone for USD $130 delivered).  But the internal
storage no longer mounted automatically on my Fedora 22 machine when connected via USB.

### Installing MTP

All that is required for Thunar to see the phone's internal storage is : 

```
dnf install gvfs-mtp
```

and *reboot* - this step seemed mandatory (probably just re-logging into X would work, but 
the machine wanted an update anyway).

### Results

Works fine - which is becoming pretty standard practice for Linux stuff nowadays.  And that 
makes me happy.
