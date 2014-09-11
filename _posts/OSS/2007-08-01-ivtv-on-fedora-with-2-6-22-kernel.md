---
comments: false
date: 2007-08-21 04:06:00+00:00
title: ivtv on Fedora with 2.6.22 kernel
category: OSS
wordpress_id: 133
wp_parent: '0'
wp_slug: ivtv-on-fedora-with-2-6-22-kernel
tags:
- f7
- fedora
- Hauppauge
- ivtv
- MythTV
- PVR350
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Upgrade to 2.6.22 seems to break *everything* in the ivtv suite.  It all disappeared from the rpms, so we need to install from source.  
  


    * ivtv
    * ivtv-fb
    * ivtv-xdriver  

    * ivtvfbctl (now gone)
  
  
In particular, some web posts indicate that support for the PVR-350 has been eliminated somehow.  This doesn't seem to be completely true - but maybe there's a problem with the hardware decoding from MythTV.  By doing the following, the PVR-350 can be made to display X in framebuffer mode, and do the output via the framebuffer too...  
  
If the hardware-based decoding (which can be overlaid on the X display) can be made to work then the Use PVR-350 output in MythTV can be enabled.  Which also means that doing MythTV should result in very low processor load.  
  


### ivtv and ivtv-fb on Fedora 7 : 2.6.22

  
  

{% highlight bash %}
yum install kernel-devel kernel-headers  

{% endhighlight %}
We don't need to build the ivtv stuff entirely from source : the ivtv driver has now been moved into the kernel.  However, the ivtv-fb isn't in the kernel...  So we need to compile that part afresh (the rest of ivtv is in the v4l-dvb / v4l tree, shown below).  
  
_This is the only part that needs to be done if you're upgrading between 2.6.22.xx versions._  
  

{% highlight bash %}
/sbin/modprobe ivtv-fb # Should fail now  
curl -O http://dl.ivtvdriver.org/ivtv/stable/ivtv-1.0.2.tar.gz  
tar -xzf ivtv-1.0.2.tar.gz  
cd ivtv-1.0.2/  
cp v4l-cx2341x-init.mpg /lib/firmware/  
make clean  
make   
make install # To create the ivtv-fb module  
/sbin/modprobe ivtv-fb # Should work now  

{% endhighlight %}
To install the firmware (may not be necessary now)  

{% highlight bash %}
yum install ivtv-firmware  

{% endhighlight %}
or  

{% highlight bash %}
cp ivtv-1.0.2/v4l-cx2341x-init.mpg /lib/firmware/  

{% endhighlight %}
### For the v4l stuff - actually, may be better for ivtvfb

  
  
_Do this only if the old FC6 v4l stuff is installed, since the control commands are expecting a different version of ivtv to be answering on the other end._  
  
This includes the control suite necessary to change alpha and input/output channels on the card - so it's important to have this in sync with the ivtv version.  
  
Go to http://linuxtv.org/ and then pick up the most recent tar from the link at the top of the page : http://linuxtv.org/hg/v4l-dvb  
  

{% highlight bash %}
mkdir -p /root/MythTV/2.6.22-ivtv/  
cd /root/MythTV/2.6.22-ivtv/  
curl -O http://linuxtv.org/hg/v4l-dvb/archive/tip.tar.gz   # around 2.7Mb  
tar -xzf tip.tar.gz  
cd v4l-dvb-* # Adjust this directory name  
make clean  
make  
make install  

{% endhighlight %}
#### ivtv-fb (?) : Installing Firmware

  
Fedora 7 : The location where hotplug expects firmware to be loaded into (for example, firmware for Cardbus cards) has changed from `/usr/lib/hotplug/firmware` to `/lib/firmware`.  Existing firmware files must be moved into the new directory.  
  
Get the firmware from the main ivtv page : `http://ivtvdriver.org/index.php/Main_Page`.  
  
  
  
References :  


  

  * http://www.gossamer-threads.com/lists/ivtv/users/36406
  
  
  
  


### Fedora 7 xdriver

  
  

{% highlight bash %}
yum install video4linux  
yum remove ivtv_xdriver  # This is the old fc6 version  

{% endhighlight %}
Check whether it's there already :  

{% highlight bash %}
ls -l /usr/lib/xorg/modules/drivers/ | grep ivtv  

{% endhighlight %}
If there's no `ivtvdev_drv.so` we need to build it :  
  

{% highlight bash %}
curl -O http://ivtvdriver.org/viewcvs/xdriver/trunk.tar.gz?view=tar  
tar -xf trunk.tar.gz\?view\=tar  
cd trunk  
ls -l  
more README  
chmod 755 configure  
./configure --prefix=/usr/  
make clean  
make  
make install  

{% endhighlight %}
### Setting up the modprobe configuration

  
  
Into `/etc/modprobe.conf` put :  
  

{% highlight bash %}
# load ivtv-fb for PVR-350 output  
alias char-major-81 videodev  
alias char-major-81-0 ivtv  
options ivtv-fb osd_compat=1  
install ivtv /sbin/modprobe --ignore-install ivtv; /sbin/modprobe ivtv-fb  

{% endhighlight %}
### Checking it all works

  
  

{% highlight bash %}
# ll /dev/video*  
lrwxrwxrwx  1 root    root      6 2007-06-13 09:18 /dev/video -> video0  
crw-------+ 1 yoshika root 81,  0 2007-06-13 09:18 /dev/video0  
crw-------+ 1 yoshika root 81, 16 2007-06-13 09:18 /dev/video16  
crw-------+ 1 yoshika root 81, 24 2007-06-13 09:18 /dev/video24  
crw-------+ 1 yoshika root 81, 32 2007-06-13 09:18 /dev/video32  
crw-------+ 1 yoshika root 81, 48 2007-06-13 09:18 /dev/video48  

{% endhighlight %}
`  
# /bin/dmesg |grep Initialized  
ivtv0: Initialized Hauppauge WinTV PVR-350, card #0  
[drm] Initialized drm 1.1.0 20060810  
[drm] Initialized i915 1.6.0 20060119 on minor 0  

{% highlight bash %}
This shows that the framebuffer is on /dev/fb0 :  

{% endhighlight %}
# cat /proc/fb  
0 cx23415 TV out  

{% highlight bash %}
And, just to confirm :  

{% endhighlight %}
# ls -l /dev/fb*  
lrwxrwxrwx 1 root    root     3 2007-06-13 09:18 /dev/fb -> fb0  
crw------- 1 yoshika root 29, 0 2007-06-13 09:18 /dev/fb0  

{% highlight bash %}
To find the BusId of the PVR-350 (for the /etc/X11/xorg.conf file) :  
  

{% endhighlight %}
# /sbin/lspci | grep "Internext Compression"  
01:05.0 Multimedia video controller: Internext Compression Inc iTVC15 MPEG-2 Encoder (rev 01)  

{% highlight bash %}
### Testing the Devices Work

  
  
Set up the Inputs and Outputs to Composite (the RCA connectors) :  

{% endhighlight %}
# v4l2-ctl -i 2  
# v4l2-ctl -o 2  

{% highlight bash %}
Test the input connection :  

{% endhighlight %}
# cat /dev/video0 > /tmp/test_capture.mpg  
# mplayer /tmp/test_capture.mpg  

{% highlight bash %}
**NEW IN 2.6.22 : ivtvfbctl no longer working - must use v4l2 to control alpha**  
  
Set the framebuffer to be hidden :  

{% endhighlight %}
# OLD VERSION : ivtvfbctl --device=/dev/fb0 --globalalpha=on --localalpha=on -v 0  
# v4l2-ctl --set-fmt-output-overlay=global_alpha=0  

{% highlight bash %}
Get the video signal to passthrough :  

{% endhighlight %}
# ivtvctl -K 1  

{% highlight bash %}
This should show a passthrough video/audio signal.  
(or, as a one-liner :  
`# v4l2-ctl -i 2; v4l2-ctl -o 2; ``  
# OLD VERSION : ivtvfbctl --device=/dev/fb0 --globalalpha=on --localalpha=on -v 0  
# v4l2-ctl --set-fmt-output-overlay=global_alpha=0  
``  
ivtvctl -K 1  

{% endhighlight %}
)  
  
  
Set the framebuffer to be entirely in front of MPEG decoder :  

{% highlight bash %}
# OLD VERSION : ivtvfbctl --device=/dev/fb0 --globalalpha=on --localalpha=on -v 255  
# v4l2-ctl --set-fmt-output-overlay=global_alpha=255  
  

{% endhighlight %}
Set the framebuffer to be dimly in front of MPEG decoder :  

{% highlight bash %}
# OLD VERSION : ivtvfbctl --device=/dev/fb0 --globalalpha=on --localalpha=on -v 100  
# v4l2-ctl --set-fmt-output-overlay=global_alpha=100  

{% endhighlight %}
Test whether the encode/decode cycle works :  

{% highlight bash %}
# ivtvctl -K 0  
# dd if=/dev/video0 of=/dev/video16 bs=64k  

{% endhighlight %}
This may come in handy later :  

{% highlight bash %}
# v4l2-ctl -d /dev/video0 --set-fmt-video=width=720,height=480  

{% endhighlight %}
