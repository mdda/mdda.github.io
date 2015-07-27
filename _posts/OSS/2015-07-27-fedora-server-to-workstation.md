---
date: 2015-07-27
title: Fedora : Converting from Server to Workstation
category: OSS
tags:
- fedora
- linux
- Nvidia
- intel
- X11
layout: post
published: false
---
{% include JB/setup %}

### Converting a Fedora Server install into a Workstation

{% highlight bash %}
dnf group install xfce
dnf install xorg-x11-drv-evdev lightdm
{% endhighlight %}

{% highlight bash %}
systemctl set-default graphical.target
{% endhighlight %}


{% highlight bash %}
ls -l /etc/X11/xorg.conf
ls -l /etc/X11/xorg.conf.d/
{% endhighlight %}

{% highlight bash %}
systemctl enable lightdm
{% endhighlight %}

{% highlight bash %}
more /var/log/Xorg.0.log
{% endhighlight %}

{% highlight bash %}
joe /etc/X11/xorg.conf
{% endhighlight %}

{% highlight bash %}
reboot
{% endhighlight %}
