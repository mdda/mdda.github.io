---
comments: true
date: 2014-10-29
title: Install Official Radeon Catalyst drivers on Fedora FC20 (updated)
category: OSS
tags:
- AMD
- radeon
- Radeon-HD5570
- fedora
- linux
- drivers
- opencl
- fc20
layout: post
---
{% include JB/setup %}


Basic steps : 

  * Install ATI Official Drivers
    * Fix the bugs

  * Prove that the install worked

### Download the official drivers

Have a look at the [AMD Linux download page](http://support.amd.com/en-us/download/desktop?os=Linux+x86).  The direct (CLI) download below may not work due to cookies, etc, so you may have to resort to downloading through the browser...

*OLD*
{% highlight bash %}
wget http://www2.ati.com/drivers/beta/linux-amd-catalyst-14.6-beta-v1.0-may23.zip
unzip linux-amd-catalyst-14.6-beta-v1.0-may23.zip 
rm linux-amd-catalyst-14.6-beta-v1.0-may23.zip 
cd fglrx-14.20/
./check.sh 
{% endhighlight %}

{% highlight bash %}
wget http://www2.ati.com/drivers/linux/amd-catalyst-14-9-linux-x86-x86-64.zip
unzip amd-catalyst-14-9-linux-x86-x86-64.zip 
# Leave a hint as to where the drivers came from (but still free up the disk space)
echo "" > amd-catalyst-14-9-linux-x86-x86-64.zip 
cd fglrx-14.301.1001/
./check.sh 
{% endhighlight %}

Then, as root, run the amd-driver-installer: 

{% highlight bash %}
yum install kernel-devel kernel-headers gcc
./amd-driver-installer-*.run 
{% endhighlight %}

### Success?  : Next steps will be :

Then check that radeon has been blacklisted, and check that fglrx has been loaded : 

{% highlight bash %}
joe /etc/modprobe.d/blacklist-fglrx.conf 
reboot
lsmod | grep fgl
{% endhighlight %}

### No success?

{% highlight bash %}
more /usr/share/ati/fglrx-install.log
{% endhighlight %}

### Fixing the bugs... (if any)

If you have to fix up the source (this was true for fglrx-14.20, whereas the fglrx-14.301... worked first time), have a look at this same section in [the previous post](/oss/2014/05/30/install-AMD-radeon-drivers-on-FC20/) for pointers.

### Check that the module is installed properly 

This has to be done once X is available (really needs to be done on the local machine, rather than on an SSH terminal, since the "-display :0.0" option doesn't appear to work) :  

{% highlight bash %}
fglrxinfo 
fglrxinfo -v
{% endhighlight %}


### Make sure that the X11/xorg.conf has been updated appropriately

(NB : If you're doing this from a separate machine ssh session - which is probably a good idea - the display-oriented commands need to be prefixed with `DISPLAY=:0.0 `) :

{% highlight bash %}
more /etc/X11/xorg.conf
lsmod | grep fg
lspci
DISPLAY=:0.0 aticonfig --initial=check
DISPLAY=:0.0 aticonfig --query-monitor
{% endhighlight %}

Set X11 to start with the right monitor (and resolution)

{% highlight bash %}
xrandr -d :0.0

{% endhighlight %}

Gives output (for me) : 

{% highlight bash %}
Screen 0: minimum 320 x 200, current 1680 x 1050, maximum 8192 x 8192
DFP1 disconnected (normal left inverted right x axis y axis)
DFP2 disconnected (normal left inverted right x axis y axis)
DFP3 connected 1680x1050+0+0 (normal left inverted right x axis y axis) 474mm x 296mm
   1680x1050      60.0*+
   1600x1200      60.0 
   1400x1050      60.0 
   1600x900       60.0 
   1360x1024      60.0 
   1280x1024      75.0     60.0 
   1440x900       59.9 
   1280x960       60.0 
   1280x800       60.0 
   1152x864       60.0     75.0 
   1280x768       60.0 
   1280x720       60.0 
   1024x768       75.0     70.1     60.0 
   800x600        72.2     75.0     60.3     56.2 
   640x480        75.0     72.8     66.6     59.9 
CRT1 disconnected (normal left inverted right x axis y axis)
{% endhighlight %}

Select the appropriate display (1680x1050 for me), and let `aticonfig` fix up the `xorg.conf` file.


{% highlight bash %}
aticonfig --list-adapters
aticonfig --initial
aticonfig --resolution=0,1680x1050
aticonfig --enable-monitor=dfp3
{% endhighlight %}


### Fix up the initial gdm interface (replace with lightdm)

{% highlight bash %}
yum remove gdm mutter-wayland
yum install lightdm
{% endhighlight %}

Test it from command line : 

{% highlight bash %}
lightdm-gtk-greeter 
{% endhighlight %}

When looking good : 

{% highlight bash %}
service lightdm start
systemctl enable lightdm

reboot
{% endhighlight %}


### Test the new card out 

{% highlight bash %}
fgl_glxgears 
fgl_glxgears -loop 1000 -info
{% endhighlight %}

