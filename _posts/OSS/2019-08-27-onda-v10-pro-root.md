---
date: 2019-08-27
title: Onda V10 Pro root
category: OSS
tags:
- fedora
- linux
- android
layout: post
published: false
---
{% include JB/setup %}

# dnf install android-tools


[root@square andrewsm]# adb shell
error: device unauthorized.
This adb server's $ADB_VENDOR_KEYS is not set
Try 'adb kill-server' if that seems wrong.
Otherwise check for a confirmation dialog on your device.
[root@square andrewsm]# adb devices 
List of devices attached
0123456789ABCDEF	unauthorized

[root@square andrewsm]# adb devices -l
List of devices attached
0123456789ABCDEF       unauthorized usb:3-1 transport_id:3

[root@square andrewsm]# adb devices -l
List of devices attached
0123456789ABCDEF       device usb:3-1 product:ONDA model:V10_Pro device:V10_Pro transport_id:3

