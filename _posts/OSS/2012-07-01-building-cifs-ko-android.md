---
comments: true
date: 2012-07-26 01:54:20+00:00
title: Building CIFS.ko for a no-name Android TV device
category: OSS
wordpress_id: 544
wp_parent: '0'
wp_slug: building-cifs-ko-android
tags:
- android
- cifs
- kernel
- linux
- mythtv
- samba
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Much more fill-in detail to follow...


{% highlight bash %}
mkdir 2-kernel
cd 2-kernel/

# http://wiki.cyanogenmod.com/wiki/Building_Kernel_from_source

scp root@wifitv.herald:/proc/config.gz ..

git clone https://android.googlesource.com/platform/prebuilt
git clone git://github.com/madmaze/Meson-3-Kernel.git 


gunzip config.gz 
cp config Meson-3-Kernel/.config
cd Meson-3-Kernel

more .config 
git log

export PATH=$(pwd)/../prebuilt/linux-x86/toolchain/arm-eabi-4.4.3/bin:$PATH
export ARCH=arm
export SUBARCH=arm
export CROSS_COMPILE=arm-eabi-

# Hmmm - someone misplaced a folder...
mkdir -p ../out/target/product/f16ref/root

make menuconfig
# Set 'M' next to CIFS (not '*' or 'Y')

# http://forum.xda-developers.com/showthread.php?t=1113191

cp kernel/slow-work.{c,h} fs/cifs/

CREATE fs/cifs/slow-work-addon.c
cat fs/cifs/slow-work-addon.c >> fs/cifs/slow-work.c 
 
scite fs/cifs/Makefile
obj-$(CONFIG_CIFS) += cifs.o slow-work.o

make

scp fs/cifs/*.ko root@wifitv.herald:/mnt/sda1/2-Kernel/

# On android device :
insmod /mnt/sda1/2-Kernel/slow-work.ko                                             
insmod /mnt/sda1/2-Kernel/cifs.ko     

cp /mnt/sda1/2-Kernel/*.ko /boot/
insmod /boot/slow-work.ko                                             
insmod /boot/cifs.ko     

130|root@android:/data/local # cat /proc/kmsg 


  720  more .config
  721  cp ../config .config
  722  make menuconfig
# Select the option to create a standalone CIFS module
  723  make
  728  cp kernel/slow-work.{c,h} fs/cifs/
  729  scite fs/cifs/slow-work.c 
  730  scite fs/cifs/slow-work-addon.c 
  732  cat fs/cifs/slow-work-addon.c >> fs/cifs/slow-work.c 
  733  scite fs/cifs/Makefile
  734  make

  741  more /etc/fstab 
  742  more /home/andrewsm/.cifs/bigdisk 
  743  man mount.cifs


[andrewsm@square ~]$ cd ./Downloads/Android/root-tv-device/2-kernel/Meson-3-Kernel/fs/cifs/
[andrewsm@square cifs]$ ls -l *.ko
-rw-r--r--. 1 root root 2932362 Jul 15 00:41 cifs.ko
-rw-r--r--. 1 root root  127808 Jul 15 00:41 slow-work.ko
[andrewsm@square cifs]$ scp *.ko root@wifitv:/mnt/sdcard/kernel-modules/


busybox
insmod /mnt/sdcard/kernel-modules/slow-work.ko 
insmod /mnt/sdcard/kernel-modules/cifs.ko 
mkdir /mnt/cifs
mount -t cifs -o rw,username=myth,password=myth //192.168.1.1/bigdisk /mnt/cifs
cd /mnt/
chown system.system cifs 
ln -s cifs/mythtv/Music Music
ln -s cifs/mythtv/TV TV
ln -s cifs/mythtv/Video Video



{% endhighlight %}
