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

## Dry run through

These instructions were also helpfully given in the Unison App (but having them here makes them much easier to implement).  

Go into the right directory :

{% highlight bash %}
adb -d shell
su
export HOME=/data/data/net.danielroggen.unison/files/
cd $HOME
{% endhighlight %}

### Check that unison runs 

One should also check out what version is running on the server, so that they can be matched :

{% highlight bash %}
./unison-2.45.28 -version
./unison-2.40.102 -version
{% endhighlight %}

### Generate key pair

{% highlight bash %}
./ssh-keygen -t rsa -f orsa.key -P ""
{% endhighlight %}

and then inspect the public key, so that it can be uploaded to the server's ```.ssh/authorized_keys```  :

{% highlight bash %}
more orsa.key.pub 
{% endhighlight %}

### Now test the sync command works

Here, you'll need to choose suitable entries for : 

* a (writeable) local directory for the sync'd folder

* the server's sync'd folder

* the server's port (here '23456')

* the server's domain (here 'unison.example')

* the user running unison on the server (here 'unison')

{% highlight bash %}
./unison-2.40.102 -auto -fat -sshargs "-i orsa.key -p 23456" -sshcmd ./ssh /storage/sdcard0/ToRead ssh://unison@unison.example.com/ToRead
{% endhighlight %}

## Running the script on the phone

Having checked all that works, the final script (with comments) can be assembled on the local 'real' machine.  Mine looks like : 

{% highlight bash %}
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
{% endhighlight %}


### Load the script onto the phone

Choose a suitable place for the script to live, and execute on the local 'real' machine  : 

{% highlight bash %}
adb -d push ~/.unison/android/ToRead.sh /storage/sdcard0/ToRead.sh
{% endhighlight %}












$ more ~/.unison/android/ToRead.sh 
