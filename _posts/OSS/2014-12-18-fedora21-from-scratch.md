---
date: 2014-12-18
title: Fedora 21 machine setup
category: OSS
tags:
- fedora
- linux
- fc21
layout: post
published: false
---
{% include JB/setup %}

This is the (almost) complete list of actions performed at the command line to 
bring up an Acer Laptop to 'operational standard' from its original
installation via 'Fedora 21 XFCE Live Spin (64-bit)' from a USB drive onto
the laptop's brand new SSD drive.

### Update machine after initial USB install

{% highlight bash %}
yum install yum-plugin-fastestmirror
yum update
reboot
{% endhighlight %}

### Install tool essentials

{% highlight bash %}
yum install firefox geany joe scite git libreoffice unison keepassx 
{% endhighlight %}

### Copy lots of stuff from previous HD

This was stored on the HD using full-disk encryption - which I expected to 
make mounting/reading it painfull.  However, Fedora appears to detect
what's going on when the HD is plugged in (now using a USB-to-SATA interface)
and the mounting goes through flawlessly (after the password is entered).
the ```ln -s``` is done for command-line convenience.

{% highlight bash %}
ls -l /mnt/
ln -s /run/media/andrewsm/8f8d7243-4319-4e55-897e-76e53e16b43b /mnt/hd
ls -l /mnt/hd/home/andrewsm/

mkdir install-old-hd
cp  /mnt/hd/home/andrewsm/install.* install-old-hd/

# All OSS projects (but includes some data directories)
rsync -avz --progress  /mnt/hd/home/andrewsm/OpenSource .    

# Internal 'sketchpad' for miscellaneous works-in-progree
rsync -avz --progress  /mnt/hd/home/andrewsm/sketchpad .

# Bring over settings so that logins work elsewhere (clone old HD's settings)
rsync -avz --progress  /mnt/hd/home/andrewsm/.ssh .

# Bring over old unison file-sync settings to make it seamless
rsync -avz --progress  /mnt/hd/home/andrewsm/.unison .

# Bring over a file-sync directory directly to avoid needless network sync
rsync -avz --progress  /mnt/hd/home/andrewsm/Personal .
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}
