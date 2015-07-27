---
date: 2015-07-27
title: Fedora - Converting from Server to Workstation
category: OSS
tags:
- fedora
- linux
- Nvidia
- intel
- X11
layout: post
published: true
---
{% include JB/setup %}

## Converting a Fedora Server install into a Workstation

One of out machines was originally configured without a GUI (since it 
was intended to purely run at GPU card in GPGPU mode, accessed via ssh).

However, now it's going to be slightly repurposed, so that a new developer
can also use the machine for editing, etc.  However, since the GPU is still
to be used for GPGPU activities, the GUI X-session will be connected 
to the onboard intel graphics, with the GPU card left free of graphics duties.

### Adding required Groups and RPMs

{% highlight bash %}
dnf group install xfce
dnf install xorg-x11-drv-evdev lightdm
{% endhighlight %}

### Tell ```systemd``` about the new target

{% highlight bash %}
systemctl set-default graphical.target
{% endhighlight %}

{% highlight bash %}
systemctl enable lightdm
{% endhighlight %}

### Remove 'Nvidia cruft' from X11 install

The proprietary Nvidia driver makes strong assumptions that it is going
to be the principal graphics card in a system, and so adds a lot of Nvidia-specific
details to /etc/X11/* without asking.  These can be safely commented out.

{% highlight bash %}
ls -l /etc/X11/xorg.conf
ls -l /etc/X11/xorg.conf.d/
{% endhighlight %}

### Make X11 only want the intel card

The following idea should be represented in ``/etc/X11/xorg.conf`` :

{% highlight bash %}
Section "ServerLayout"
    Identifier "layout"
    Screen 0 "intel"
    #Inactive "nvidia"
EndSection

#Section "Screen"
#    Identifier "nvidia"
#    Device "nvidia"
#    Option "AllowEmptyInitialConfiguration" "Yes"
#EndSection

Section "Screen"
    Identifier "intel"
    Device "intel"
EndSection

#Section "Device"
#    Identifier "nvidia"
#    Driver "nvidia"
#    BusID "PCI:1:0:0"
#EndSection

Section "Device"
    Identifier "intel"
    Driver "modesetting"
    #Option "AccelMethod"  "none"
    #BusID "PCI:00:02.0"
EndSection
{% endhighlight %}

### Finally...

{% highlight bash %}
reboot
{% endhighlight %}


### and if it's not working yet...
{% highlight bash %}
more /var/log/Xorg.0.log
{% endhighlight %}
