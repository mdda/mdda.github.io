---
comments: false
date: 2009-03-29 19:31:00+00:00
title: lmms with Fedora - compile source
category: OSS
wordpress_id: 164
wp_parent: '0'
wp_slug: lmms-with-fedora-compile-source
tags:
- fedora
- linux
- lmms
- music
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


lmms has some dependencies that are not so easy to determine for Fedora

Basic setup :

{% highlight bash %}
yum install cmake git
yum install qt qt-devel

{% endhighlight %}

Synth extras :

{% highlight bash %}
yum install libsndfile libsndfile-devel
yum install fluidsynth fluidsynth-devel
yum install stk stk-devel
yum install fftw-devel

{% endhighlight %}

Importantly for wine VST(i) :

{% highlight bash %}
yum install wine wine-devel
yum install glibc-devel.i386

{% endhighlight %}

Hope this helps

