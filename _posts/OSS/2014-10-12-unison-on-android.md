---
date: 2014-10-12
title: Getting Unison file-sync working on Android
category: OSS
tags:
- linux
- unison
- android
layout: post
published: false
---
{% include JB/setup %}

While Daniel Roggen has done a great job in porting ```unison``` and associated utilities to Android in a [simple, free package](https://play.google.com/store/apps/details?id=net.danielroggen.unison&hl=en), the actual synchronization step is left to either (a) the user, at the command line, or (b) using his for-pay sync App.

Not that I object to earning money by selling apps, but 'just because', here are steps that worked for me on my Android phone (which can be 'rooted' simply by changing the settings in 'Settings-Security-Superuser').

## Enabling Android Debugging

This makes development of scripts much easier, and uploading/downloading files while doing so. 

On a local 'real' machine, plug in the device, and find the ```idVendor``` from watching ```tail -f /var/log/messages```.  Then create a new ```udev``` rules file :

{% highlight bash %}
more /etc/udev/rules.d/51-android.rules
# /etc/udev/rules.d/51-android.rules
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bb4", MODE="0666"
{% endhighlight %}

And reload the ruleset : 
{% highlight bash %}
udevadm control --reload-rules
{% endhighlight %}

Thereafter, ```adb``` commands will work :
{% highlight bash %}
adb -d shell
{% endhighlight %}


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

./unison-2.40.102 -auto -fat -sshargs "-i orsa.key -p 23456" -sshcmd ./ssh /storage/sdcard0/ToRead ssh://unison@unison.example.com/ToRead

## adb -d push ~/.unison/android/ToRead.sh /storage/sdcard0/ToRead.sh

