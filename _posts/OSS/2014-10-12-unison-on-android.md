---
date: 2014-10-12
title: Getting Unison file-sync working on Android
category: OSS
tags:
- linux
- unison
- android
layout: post
published:false
---
{% include JB/setup %}


{% highlight bash %}
{% endhighlight %}


Daniel Roggen

https://play.google.com/store/apps/details?id=net.danielroggen.unison&hl=en



more /etc/udev/rules.d/51-android.rules
# /etc/udev/rules.d/51-android.rules

SUBSYSTEM=="usb", ATTRS{idVendor}=="0bb4", MODE="0666"

[root@square Investments]# udevadm control --reload-rules


 adb -d shell


$ more ~/.unison/android/ToRead.sh 
## Execute this using 'sh', when root

export HOME=/data/data/net.danielroggen.unison/files/
cd $HOME

## check that unison runs (and also check on server, to match)
#./unison-2.45.28 -version
#./unison-2.40.102 -version

## Generate key pair
#./ssh-keygen -t rsa -f orsa.key -P ""
#more orsa.key.pub 
## Upload public key into server's ".ssh/authorized_keys"

./unison-2.40.102 -auto -fat -sshargs "-i orsa.key -p 22321" -sshcmd ./ssh /storage/sdcard0/ToRead ssh://unison@unison.platformedia.com/ToRead

## adb -d push ~/.unison/android/ToRead.sh /storage/sdcard0/ToRead.sh

