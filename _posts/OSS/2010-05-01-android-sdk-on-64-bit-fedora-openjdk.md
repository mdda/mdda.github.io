---
comments: false
date: 2010-05-20 16:30:44+00:00
title: Android SDK on 64-bit fedora (openjdk)
category: OSS
wordpress_id: 326
wp_parent: '0'
wp_slug: android-sdk-on-64-bit-fedora-openjdk
tags:
- android
- fedora
- mobile
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Requirement : Get the 32-bit Android SDK to work on a 64-bit Fedora machine (Fedora 11 tested below), using the standard openjdk rather than Sun Java.  No eclipse required, since development will be done using Titanium.

32-bit libraries are required.  To clear out existing libraries (only if you know you haven't got anything else dependent on 32-bitness) : 

{% highlight bash %}
yum remove *.i586

{% endhighlight %}

The following (plus the dependencies it pulls in) seems to be the minimum set required : 

{% highlight bash %}
yum install \
 libX11.i586 mesa-libGL.i586 SDL.i586 \
 ncurses-libs.i586 libstdc++.i586 \
 esound-libs.i586 zlib.i686  

{% endhighlight %}

After doing that, confirm that the emulator (./tools/emulator) works.


For interest's sake, the following is the complete, working 32-bit set pulled in :

{% highlight bash %}
libX11-1.2.2-1.fc11.i586
mesa-dri-drivers-7.6-0.1.fc11.i586
SDL-1.2.13-9.1.fc11.i586
esound-libs-0.2.41-2.fc11.i586
expat-2.0.1-8.fc11.i586
libgcc-4.4.1-2.fc11.i586
libXxf86vm-1.0.2-2.fc11.i586
libstdc++-4.4.1-2.fc11.i586
libXext-1.0.99.1-3.fc11.i586
nss-softokn-freebl-3.12.6-1.2.fc11.i586
mesa-libGL-7.6-0.1.fc11.i586
libXau-1.0.4-5.fc11.i586
alsa-lib-1.0.23-1.fc11.i586
libdrm-poulsbo-2.3.0-10.fc11.i586
libXdamage-1.1.1-6.fc11.i586
ncurses-libs-5.7-2.20090207.fc11.i586
libselinux-2.0.80-1.fc11.i586
audiofile-0.2.6-10.fc11.i586
libXfixes-4.0.3-5.fc11.i586
libxcb-1.2-5.fc11.i586
libdrm-2.4.11-2.fc11.i586

glibc-2.10.2-1.i686

{% endhighlight %}

