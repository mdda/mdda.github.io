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



https://forum.xda-developers.com/apps/magisk/official-magisk-v7-universal-systemless-t3473445):


https://topjohnwu.github.io/Magisk/install.html#boot-image-patching

https://github.com/topjohnwu/Magisk/releases/tag/manager-v7.3.2
apk install

you are required to obtain a copy of the stock boot image, which can be found by extracting OEM provided factory images or extracting from OTA update zip

Current firmware, reported System-Settings-AboutTablet-DeviceFirmwareVersion = v1.0.1_V7
https://4pda.ru/pages/go/?u=https%3A%2F%2Fwww.dropbox.com%2Fs%2Fhp4zfla1j8qvbdk%2FV10%2520Pro_V1.0.1_V7.rar%3Fdl%3D0&e=77513633
https://www.dropbox.com/s/hp4zfla1j8qvbdk/V10%20Pro_V1.0.1_V7.rar?dl=0
# Download 818Mb file

mkdir OndaV10Pro
[andrewsm@square Downloads]$ cd OndaV10Pro/
mv ../V10\ Pro_V1.0.1_V7.rar .

dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
dnf install unrar

unrar l V10\ Pro_V1.0.1_V7.rar | grep boot-verified.img
unrar e V10\ Pro_V1.0.1_V7.rar *boot-verified.img
ll
# -rw-rw-r--. 1 andrewsm andrewsm   9388288 Jan  2  2018  boot-verified.img

adb push boot-verified.img /sdcard/

Saved a log in /storage/emulated/0/Download/magick_install... .log

abd pull  /storage/emulated/0/Download/magisk_install_log_2019-08-26T02\:54\:30Z.log

/storage/emulated/0/Download/magick_patched.img

adb pull /sdcard/Download/magisk_patched.img

adb reboot bootloader

# Tiny little prompt "=> FASTBOOT mode..." in bottom of Onda screen

fastboot devices
$ If user # no permissions; see [http://developer.android.com/tools/device.html]	fastboot
# If root # 0123456789ABCDEF	fastboot

fastboot flash boot magisk_patched.img 
# Sending 'boot' (9393 KB)                           OKAY [  0.502s]
# Writing 'boot'                                     FAILED (remote: 'download for partition 'boot' is not allowed

# Tiny little prompt "USB Transferring..."\
# Tiny little prompt "USB Transmission OK  Time:429mn Vel:22421KB/s"


fastboot oem unlock
# Little prompts warns about voiding warrantee ! 
# VolUp = Unlock (may void)
# VolDn = Abort

Pressed vol towards corner of tablet (not closest to power button) : Apparently this is Unlock

=> Fastboot mode... Again

# DID NOT DO ... #fastboot erase boot 

astboot flash boot magisk_patched.img 
Sending 'boot' (9393 KB)                           OKAY [  0.500s]
Writing 'boot'                                     OKAY [  0.005s]
Finished. Total time: 0.508s

fastboot reboot

Android person with cogs whirring
Reboots again (long wait...)





