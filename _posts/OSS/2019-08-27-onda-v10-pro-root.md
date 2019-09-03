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


## Obtaining `root` on the Onda V10 Pro

First off, let me say that I picked this Android tablet up on BangGood - so 
it's basically a no-frills Chinese tablet (at a really attractive price).

My criteria for buying it were a little non-standard, since all I am going to use it for is reading PDFs of papers,
of which I have a huge backlog 'organised' in a folder structure on my various machines.  The Onda V10 Pro
has 4Gb RAM, high resolution display, and good speed statistics.  One shortcoming was the Android 6.0 OS - but
I decided that I didn't need some more modern features given the specs.

One thing I should have checked more thoroughly, though, is how easy it would be to obtain `root` access...

Why did I want that?

*  The file-syncing set-up I have (based on my own servers and `unison`) probably needs `root` to operate 'Free'

*  I have `root` on all my devices (desctops, servers, laptops, phones, tablets, TV, etc.) - it's a bit of a compulsion.


The following are step-by-step instructions about how to do it - and is the result of reading multiple Russian-based
forums, lots of dead-ends, and lots of trial-and-error.  Hope this makes it easier for you too!


{% highlight bash %}

# dnf install android-tools

[root]# adb shell
error: device unauthorized.
This adb server's $ADB_VENDOR_KEYS is not set
Try 'adb kill-server' if that seems wrong.
Otherwise check for a confirmation dialog on your device.
[root]# adb devices 
List of devices attached
0123456789ABCDEF	unauthorized

[root]# adb devices -l
List of devices attached
0123456789ABCDEF       unauthorized usb:3-1 transport_id:3

[root]# adb devices -l
List of devices attached
0123456789ABCDEF       device usb:3-1 product:ONDA model:V10_Pro device:V10_Pro transport_id:3

{% endhighlight %}
{% highlight bash %}


https://forum.xda-developers.com/apps/magisk/official-magisk-v7-universal-systemless-t3473445):

https://topjohnwu.github.io/Magisk/install.html#boot-image-patching

https://github.com/topjohnwu/Magisk/releases/tag/manager-v7.3.2
apk install

you are required to obtain a copy of the stock boot image, which can be found by extracting OEM provided factory images or extracting from OTA update zip

Current firmware, reported System-Settings-AboutTablet-DeviceFirmwareVersion = v1.0.1_V7
https://4pda.ru/pages/go/?u=https%3A%2F%2Fwww.dropbox.com%2Fs%2Fhp4zfla1j8qvbdk%2FV10%2520Pro_V1.0.1_V7.rar%3Fdl%3D0&e=77513633
https://www.dropbox.com/s/hp4zfla1j8qvbdk/V10%20Pro_V1.0.1_V7.rar?dl=0
# Download 818Mb file

{% endhighlight %}




{% highlight bash %}
mkdir OndaV10Pro
[user]$ cd OndaV10Pro/
mv ../V10\ Pro_V1.0.1_V7.rar .

dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
dnf install unrar

unrar l V10\ Pro_V1.0.1_V7.rar | grep boot-verified.img
unrar e V10\ Pro_V1.0.1_V7.rar *boot-verified.img
ll
# -rw-rw-r--. 1 andrewsm andrewsm   9388288 Jan  2  2018  boot-verified.img

[user]$ adb push boot-verified.img /sdcard/
Saved a log in /storage/emulated/0/Download/magick_install... .log

adb pull  /storage/emulated/0/Download/magisk_install_log_2019-08-26T02\:54\:30Z.log

/storage/emulated/0/Download/magick_patched.img

adb pull /sdcard/Download/magisk_patched.img
{% endhighlight %}


# FASTBOOT approach merely/nearly bricked my device...


https://spflashtool.com/

https://forum.xda-developers.com/general/rooting-roms/tutorial-how-to-setup-spflashtoollinux-t3160802

Download SPFlashTool for Linux - 64 Bit
https://spflashtool.com/download/SP_Flash_Tool_exe_Linux_64Bit_v5.1520.00.100.zip

{% highlight bash %}
[user]$ unzip SP_Flash_Tool_exe_Linux_64Bit_v5.1520.00.100.zip 
# This is a 2015 version...
{% endhighlight %}


{% highlight bash %}
[user]$ cd SP_Flash_Tool_exe_Linux_64Bit_v5.1520.00.100
[user]$ ./flash_tool
[user]$ ./flash_tool: error while loading shared libraries: libQtWebKit.so.4: cannot open shared object file: No such file or directory

[root]# dnf install qtwebkit

[user]$ unrar x V10\ Pro_V1.0.1_V7.rar 
[user]$ ./flash_tool
{% endhighlight %}

Scatter File is in :
`V10 Pro_V1.0.1_V7/SP_Flash_Tool_exe_Windows_v5.1640.00.000/Firemware/`

Select just 'logo' for testing...

Hit 'Download' and plug in device (which was turned off)

{% highlight bash %}
BROM ERROR : S_COM_PORT_OPEN_FAIL (1013)
[COM] Failed to open COM port.
[HINT]:
{% endhighlight %}

So we blacklist it for the two MTK vendor IDs the flash tool uses...

As `root`, create : /etc/udev/rules.d/20-mm-blacklist-mtk.rules containing :

{% highlight bash %}
ATTRS{idVendor}=="0e8d", ENV{ID_MM_DEVICE_IGNORE}="1"
ATTRS{idVendor}=="6000", ENV{ID_MM_DEVICE_IGNORE}="1"
{% endhighlight %}


{% highlight bash %}
[root]# udevadm control --reload
[root]# udevadm info --export-db | joe

P: /devices/pci0000:00/0000:00:14.0/usb3/3-1
N: bus/usb/003/052
L: 0
S: libmtp-3-1
E: DEVPATH=/devices/pci0000:00/0000:00:14.0/usb3/3-1
E: SUBSYSTEM=usb
E: DEVNAME=/dev/bus/usb/003/052
E: DEVTYPE=usb_device
E: DRIVER=usb
E: PRODUCT=e8d/2008/ffff
E: TYPE=0/0/0
E: BUSNUM=003
E: DEVNUM=052
E: MAJOR=189
E: MINOR=307
E: USEC_INITIALIZED=57614799732
E: ID_MM_DEVICE_IGNORE=1  ######### WORKS
E: ID_VENDOR=MediaTek
E: ID_VENDOR_ENC=MediaTek
E: ID_VENDOR_ID=0e8d
E: ID_MODEL=MT65xx_Android_Phone
E: ID_MODEL_ENC=MT65xx\x20Android\x20Phone
E: ID_MODEL_ID=2008
E: ID_REVISION=ffff
E: ID_SERIAL=MediaTek_MT65xx_Android_Phone_0123456789ABCDEF
E: ID_SERIAL_SHORT=0123456789ABCDEF
E: ID_BUS=usb
E: ID_USB_INTERFACES=:ffff00:
E: ID_GPHOTO2=1
E: GPHOTO2_DRIVER=proprietary
E: ID_MEDIA_PLAYER=1
E: ID_VENDOR_FROM_DATABASE=MediaTek Inc.
E: ID_MTP_DEVICE=1
E: ID_PATH=pci-0000:00:14.0-usb-0:1
E: ID_PATH_TAG=pci-0000_00_14_0-usb-0_1
E: ID_FOR_SEAT=usb-pci-0000_00_14_0-usb-0_1
E: COLORD_DEVICE=1
E: COLORD_KIND=camera
E: DEVLINKS=/dev/libmtp-3-1
E: TAGS=:seat:uaccess:


P: /devices/pci0000:00/0000:00:14.0/usb3/3-1/3-1:1.0
L: 0
E: DEVPATH=/devices/pci0000:00/0000:00:14.0/usb3/3-1/3-1:1.0
E: SUBSYSTEM=usb
E: DEVTYPE=usb_interface
E: PRODUCT=e8d/2008/ffff
E: TYPE=0/0/0
E: INTERFACE=255/255/0
E: MODALIAS=usb:v0E8Dp2008dFFFFdc00dsc00dp00icFFiscFFip00in00
E: USEC_INITIALIZED=57614811887
E: ID_MM_DEVICE_IGNORE=1  ######### WORKS
E: ID_VENDOR_FROM_DATABASE=MediaTek Inc.
{% endhighlight %}

https://askubuntu.com/questions/399263/udev-rules-seem-ignored-can-not-prevent-modem-manager-from-grabbing-device

{% highlight bash %}
[root]# mmcli -G DEBUG;

[root]# journalctl -f | grep "ModemManager.*\[filter\]"
Aug 26 23:10:53 square.herald ModemManager[1161]: <debug> [filter] (tty/ttyACM0): port filtered: device is blacklisted

---
# Device allowed with strict filter policy
[filter] (tty/...): port allowed:... 
# Device filtered with default filter policy and udev tags
[filter] (tty/...): port filtered: device is blacklisted     ### << This one seems to apply
# Device filtered with strict filter policy and environment variables
[filter] (tty/...) port filtered: forbidden
---

[root]# mmcli -G ERR;
{% endhighlight %}




https://android.googlesource.com/kernel/mediatek/+/android-6.0.0_r0.6/Documentation/usb/acm.txt

{% highlight bash %}
[user]$ ./flash_tool

Connecting to BROM...
Scanning USB port...
Search usb, timeout set as 3600000 ms
add@/devices/pci0000:00/0000:00:14.0/usb3/3-1
add@/devices/pci0000:00/0000:00:14.0/usb3/3-1/3-1:1.0
add@/devices/pci0000:00/0000:00:14.0/usb3/3-1/3-1:1.1
bind@/devices/pci0000:00/0000:00:14.0/usb3/3-1/3-1:1.0
add@/devices/pci0000:00/0000:00:14.0/usb3/3-1/3-1:1.1/tty/ttyACM0

vid is 0e8d
device vid = 0e8d
pid is 2000
device pid = 2000

com portName is: /dev/ttyACM0
Total wait time = -1566833481.000000

USB port is obtained. path name(/dev/ttyACM0), port name(/dev/ttyACM0)
USB port detected: /dev/ttyACM0
{% endhighlight %}


{% highlight bash %}
[root]# ll /dev/ttyACM0
ls: cannot access '/dev/ttyACM0': No such file or directory
[root]# ll /dev/ttyACM0
ls: cannot access '/dev/ttyACM0': No such file or directory
[root]# ll /dev/ttyACM0
ls: cannot access '/dev/ttyACM0': No such file or directory
[root]# ll /dev/ttyACM0
crw-rw----. 1 root dialout 166, 0 Aug 26 23:39 /dev/ttyACM0
[root]# ll /dev/ttyACM0
crw-rw----. 1 root dialout 166, 0 Aug 26 23:39 /dev/ttyACM0
[root]# ll /dev/ttyACM0
crw-rw----. 1 root dialout 166, 0 Aug 26 23:39 /dev/ttyACM0
[root]# ll /dev/ttyACM0
crw-rw----. 1 root dialout 166, 0 Aug 26 23:39 /dev/ttyACM0
[root]# ll /dev/ttyACM0
crw-rw----. 1 root dialout 166, 0 Aug 26 23:39 /dev/ttyACM0
[root]# ll /dev/ttyACM0
ls: cannot access '/dev/ttyACM0': No such file or directory
[root]# ll /dev/ttyACM0
ls: cannot access '/dev/ttyACM0': No such file or directory
[root]# ll /dev/ttyACM0
ls: cannot access '/dev/ttyACM0': No such file or directory
{% endhighlight %}



{% highlight bash %}
[root]# getent group dialout
dialout:x:18:

[root]# usermod -aG dialout andrewsm

# Log out, log back in...
[user]$ id -a
uid=1000(user) gid=1000(user) groups=1000(user),18(dialout),980(vboxusers),992(pulse-rt),994(jackuser) context=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023
{% endhighlight %}


# DIFFERENT OUTPUT RESULTS!!


{% highlight bash %}

com portName is: /dev/ttyACM0
Total wait time = -1566834592.000000
USB port is obtained. path name(/dev/ttyACM0), port name(/dev/ttyACM0)
USB port detected: /dev/ttyACM0
BROM connected
Downloading & Connecting to DA...
COM port is open. Trying to sync with the target...
DA Connected
executing DADownloadAll...
Download failed.
Disconnect!
BROM Exception! ( BROM ERROR : S_FTHND_FILE_IS_NOT_LOADED_YET (5007)

There is file not loaded yet!!
[HINT]:

                1. Please check if the DA path is correct.
                2. Please check if all the ROM files exist.
                3. Please check if the scatter file description is sync with the exist ROM files.)((exec,../../../qt_flash_tool/Cmd/DADownloadAll.cpp,84))

{% endhighlight %}



{% highlight bash %}

Downloading & Connecting to DA...
COM port is open. Trying to sync with the target...
DA Connected
Format Succeeded.
Format Succeeded.
Format Succeeded.
Format Succeeded.
executing DADownloadAll...
Download failed.
Disconnect!
BROM Exception! ( BROM ERROR : S_FTHND_FILE_IS_NOT_LOADED_YET (5007)

There is file not loaded yet!!

App Exception! (proinfo: Failed to get PMT info.
{% endhighlight %}



{% highlight bash %}
## Just Format All :
USB port is obtained. path name(/dev/ttyACM0), port name(/dev/ttyACM0)
DA high speed USB port detected: /dev/ttyACM0
DA Connected
Format Succeeded.
Format Succeeded.
Format Succeeded.
Format Succeeded.
Disconnect!
{% endhighlight %}

# With a Big Tick output



## Try to Download everything

{% highlight bash %}
BROM ERROR : S_FTHND_FILE_IS_NOT_LOADED_YET (5007)

There is file not loaded yet!!
[HINT]:

                1. Please check if the DA path is correct.
                2. Please check if all the ROM files exist.
                3. Please check if the scatter file description is sync with the exist ROM files.

# In Firemware : 
[user]$ ls -l | grep verified
-rw-r--r--. 1 user user     9388288 Jan  2  2018 boot-verified.img
-rw-r--r--. 1 user user      311552 Jan  2  2018 lk-verified.bin
-rw-r--r--. 1 user user     2715904 Jan  2  2018 logo-verified.bin
-rw-r--r--. 1 user user    10289408 Jan  2  2018 recovery-verified.img
-rw-r--r--. 1 user user      135424 Jan  2  2018 secro-verified.img

[user]$ cp boot-verified.img boot.img 
[user]$ cp lk-verified.bin lk.bin 
[user]$ cp logo-verified.bin logo.bin 
[user]$ cp recovery-verified.img recovery.img 
[user]$ cp secro-verified.img secro.img 

## Ahah - now all entries on the RHS in SP Tool have Location listed...
## And then some kind of downloading seems to be occurring!  at ~10MB/s

# YES : When a green circle with a white checkmark appears, you are done. 
{% endhighlight %}

Reset button
Power button (hold 3 seconds)
Onda logo
System initlaizting, please wait...
# ( PHONENIX OS... )  NOOO!

There's an 'OS Switch' in the start menu folder's second page
The Android 6 there shows :
Device firmware = V1.0.1_V7
Patch level March 5. 2017
Kernel 3.18.19+
tUE jAN 2 22:33:04 CST 2018 (!)

Again, go for 'OEM unlocking'=Enabled.  'USB Debugging'=Enabled

Helpful people : 
https://techtablets.com/forum/topic/onda-v10-pro-google-play-services-update-error/page/3/

V1.0.4_V5 (with Phoenix)
V10 Pro_V1.0.1_V7  (with Phoenix)

http://onda.cn/Search.aspx?keyword=V10 Pro&ch=0

To find the version number of your device, please see the ninth, 10th position of the SN code on the back of the case 'V7'



https://topjohnwu.github.io/Magisk/install.html#boot-image-patching


Hmm : Now that we've got a completely consistent boot+loader etc image, perhaps the Magisk thing will work...

https://forum.xda-developers.com/showpost.php?s=f5a26bcd5d381487feee16f999f4fadf&p=77196170&postcount=8

Install Magisk 7.3.2 (224) direct from GitHub releases

Connect USB, and AllowDebugging

{% endhighlight %}

{% highlight bash %}
adb devices -l
List of devices attached
0123456789ABCDEF       device usb:3-1 product:ONDA model:V10_Pro device:V10_Pro transport_id:4

[user]$ adb push V10\ Pro_V1.0.1_V7/SP_Flash_Tool_exe_Windows_v5.1640.00.000/Firemware/boot-verified.img /sdcard/
{% endhighlight %}

In Magisk, do 'install v19....'  by just 'patch .img file'  Choose /sdcard/boot-verified.img


{% highlight bash %}
[root]# adb shell
shell@V10_Pro:/ $ ls -l /storage/emulated/0/Download/
-rw-rw---- root     sdcard_rw  2840501 2019-08-27 01:25 MagiskManager-v7.3.2.apk
-rw-rw---- root     sdcard_rw     2354 2019-08-27 01:31 magisk_install_log_2019-08-27T01:31:29Z.log
-rw-rw---- root     sdcard_rw  9618899 2019-08-27 01:31 magisk_patched.img
shell@V10_Pro:/ $ exit
[root]# adb pull  /storage/emulated/0/Download/magisk_install_log_2019-08-27T01:31:29Z.log
/storage/emulated/0/Download/magisk_install_log_2019-08-27T01:31:29Z.log: 1 file pulled. 1.4 MB/s (2354 bytes in 0.002s)
[root]# adb pull  /storage/emulated/0/Download/magisk_patched.img
/storage/emulated/0/Download/magisk_patched.img: 1 file pulled. 7.9 MB/s (9618899 bytes in 1.155s)

# Put the patched file where the boot.img file *was* in the V10\ Pro_V1.0.1_V7 image
cp magisk_patched.img V10\ Pro_V1.0.1_V7/SP_Flash_Tool_exe_Windows_v5.1640.00.000/Firemware/boot.img 
{% endhighlight %}

# So, now we can reflash using the same SP Tool again (need only select the boot.img file, I guess)

Press reset
PowerButton 3 secs
Boots with PhoenixOS logo - but straight back into Android desktop unchanged
Load 'Terminal' from 360 store (!)
Try 'su'  :: Magisk will offer to Grant Forever!  SUCCESS!


Install aptoid app using Chrome
Look for 'Google Play Services' in AptOid app

>  yes exactly, I download aptoide apk from the official site, 
>  I installed it and search in aptoide the google play services, 
>  I press update and the google play services updated automatically without problems.

Currently Google Play Store = 7.2.13
(Kill 360 App - there was an annoying Ad)
(Kill WPS Mail - looks like junk)

Use Aptoid to install 'Google Play' v16.3.36-all

install 'ssh server' (has a folder-like icon) on tablet

# Do the unison thing
