---
comments: true
date: 2014-05-30 
title: Install Official Radeon Catalyst drivers on Fedora FC20
category: OSS
tags:
- AMD
- radeon
- HD5570
- fedora
- linux
- drivers
- opencl
- fc20
layout: post
from_mdda_blog: true
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

### Fixing the bugs...

Probably have to fix up the source (this was particularly true for fglrx-14.20, whereas the fglrx-14.301... worked first time).

The best way to do this is to run two terminals : 

  * First terminal runs the installers (as above), until it reaches the 'all extracted' phase
  
  * Second terminal dives into the extracted source, and modifies it so that the first terminal can run to completion.
  
So, having run through the uncompress stage in the installer, leave it mid-operation, and find the extracted directory (called fglrx-install.1KZ6NX here, but the final digits/letters see random).
  
{% highlight bash %}
cd fglrx-install.1KZ6NX/install/lib/modules/fglrx/ 
joe 2.6.x/firegl_public.c
{% endhighlight %}

This is the 'source' source file (and will later be copied into `/usr/src/fglrx-14.20/firegl_public.c`, for subsequent kernels updates, presumably).

It needs a modification as follows (this is a kludge-fix, the key thing is that it returns the `__kuid_val(current_euid());`, which somehow, the `#define`s seem to route around): 

{% highlight bash %}
/** /brief Return the effective user ID
 *  /return OS dependent value of the effective user ID
 */
KCL_TYPE_Uid ATI_API_CALL KCL_GetEffectiveUid(void)
{
#ifdef CONFIG_UIDGID_STRICT_TYPE_CHECKS
    return __kuid_val(current_euid());
#else
    return __kuid_val(current_euid());

#ifdef current_euid
//    return current_euid();
#else
    return current->euid;
#endif

#endif
}

{% endhighlight %}

Then, rebuild the module : 

{% highlight bash %}
cd build_mod/
./make.sh
cd ..
./make_install.sh
lsmod
{% endhighlight %}

From there, one can let the installer (first terminal) run to completion.

{% highlight bash %}
lsmod
reboot
lsmod
dmesg 
{% endhighlight %}

### Check that the module is installed properly 
  
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

