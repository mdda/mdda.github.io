---
comments: false
date: 2008-07-20 23:22:00+00:00
title: MythTV on Fedora 7, PVR-350 & Dual Screen
category: OSS
wordpress_id: 145
wp_parent: '0'
wp_slug: mythtv-on-fedora-7-pvr-350-dual-screen-2
tags:
- DualScreen
- fc9
- MythTV
- PVR350
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Aim : Use 1 computer for two tasks :   
a) Desktop for GF to use as a regular linux machine (web browsing, photos, etc)  
b) Completely independent MythTV set-up, with the output going to the TV.  
  
Also, the set-up has to be turn-key, with both sessions logging in automatically (goodbye `gdm`).  
  
There's a lot going on for this one.  Fortunately, Fedora 9 (FC9) doesn't require recompilation of any raw code (phew).  
  
However, the major twist is that xorg now (by default) defers input device detection to HAL, which doesn't appear to have any relevant documentation about how to allocate the discovered devices to the different screens/users.  
  


## The X11 setup

  
First, the setup in `/etc/X11/xorg.conf` :  

{% highlight bash %}
# Xorg configuration created by mdda  
Section "ServerFlags"  
Option "blank time" "0"  
Option "standby time" "0"  
Option "suspend time" "0"  
Option "off time" "0"  
Option "Xinerama"  "0"  
       Option "AutoAddDevices" "false"   
EndSection  
  
Section "Module"  
       Load    "dbe"  
       Load    "evdev"  
       Load    "extmod"  
       Load    "freetype"  
       Load    "glx"  
Load "fbdevhw"  
  
# New :  
SubSection  "extmod"  
 Option    "omit xfree86-dga"   # don't initialise the DGA extension  
EndSubSection  
EndSection  
  
Section "ServerLayout"  
Identifier     "Default"  
Option     "DefaultServerLayout"  
Screen  "Screen0" 0 0  
InputDevice    "Mouse0" "SendCoreEvents"  
InputDevice    "Keyboard0" "CoreKeyboard"  
EndSection  
  
Section "ServerLayout"  
Identifier "MythTV"  
Screen  "Television" 0 0  
InputDevice "MouseWireless" "CorePointer"  
InputDevice "KeyboardWireless" "CoreKeyboard"  
EndSection  
  
Section "InputDevice"  
Identifier "Keyboard0"  
Driver "evdev"  
Option "Name" "AT Translated Set 2 keyboard"  
Option "Device" "/dev/input/event1"  
Option  "XkbModel" "evdev"  
Option "XkbLayout" "us"  
EndSection  
  
Section "InputDevice"  
Identifier "Mouse0"  
Driver "evdev"  
Option "Device" "/dev/input/event2"  
Option "ZAxisMapping" "4 5"  
Option "Protocol" "IMPS/2"  
Option "Emulate3Buttons" "false"  
Option "CorePointer"  
Option "SendCoreEvents" "true"  
EndSection  
  
Section "InputDevice"  
Identifier "KeyboardWireless"  
Driver "evdev"  
Option "Device" "/dev/input/event3"  
Option  "XkbModel" "evdev"  
Option "XkbLayout" "us"  
Option "evBits" "+1"  
Option "keyBits" "~1-511"  
EndSection  
  
Section "InputDevice"  
Identifier "MouseWireless"  
Driver "evdev"  
Option "Device" "/dev/input/event4"  
Option "Emulate3Buttons" "false"  
Option "Protocol" "IMPS/2"  
Option "ZAxisMapping" "4 5"  
Option "CorePointer"  
Option "SendCoreEvents" "true"  
EndSection  
  
Section "Monitor"  
Identifier   "Monitor0"  
ModelName    "LCD Panel 1280x1024"  
HorizSync    31.5 - 67.0  
VertRefresh  59.0 - 69.0  
EndSection  
  
Section "Monitor"  
Identifier "NTSC Monitor"  
DisplaySize 182 122  
HorizSync 30.0 - 68.0  
VertRefresh 50.0 - 120.0  
Option  "DPMS" "off"  
  
Mode "720x480"  
     DotClock 23.832  
 HTimings 720 775 799 800  
 VTimings 480 494 496 497  
 Flags    "-HSync" "-VSync"  
EndMode  
EndSection  
  
Section "Device"  
Identifier "Videocard0"  
Driver "intel"  
# Option "NoAccel" "true"  
  
Option "FramebufferCompression" "true"  
Option "Tiling" "true"  
Option "DRI" "true"  
  
Option "Legacy3D" "true"  
Option "XVideo" "false"  
Option "AperTexSize" "8"  
  
Option "AccelMethod" "XAA"  
#Option "AccelMethod" "EXA"  
  
Option "ModeDebug" "true"  
  
BusID "PCI:0:2:0"  
EndSection  
  
Section "Device"  
Identifier "Hauppauge PVR 350 iTVC15 Framebuffer"  
Driver "ivtv"  
Option "fbdev" "/dev/fb0"      # <-- modify if using another device  
BusID "PCI:1:5:0"  
#        Option  "VideoOverlay" "on"  
#        Option  "XVideo" "1"  
EndSection  
  
Section "Screen"  
Identifier "Screen0"  
Device "Videocard0"  
Monitor "Monitor0"  
DefaultDepth 16  
SubSection "Display"  
 Viewport 0 0  
 Modes "1280x1024"   
EndSubSection  
EndSection  
  
Section "Screen"  
Identifier "Television"  
Device "Hauppauge PVR 350 iTVC15 Framebuffer"  
Monitor "NTSC Monitor"  
DefaultDepth     24  
DefaultFbBPP     32  
SubSection "Display"  
 Depth     24  
 FbBPP     32  
 Modes    "720x480"  
EndSubSection  
EndSection  
  
Section "DRI"  
Mode         0666  
EndSection  

{% endhighlight %}
## The myth user

  
Append to `~/.bash_profile` :  

{% highlight bash %}
#...  
if [ -z "$DISPLAY" ]; then  
if [ `tty` == "/dev/tty6" ];then  
 setterm -blank 0 -powersave off -powerdown 0 -cursor off  
  
 export DISPLAY=:1.0  
# The following starts :  
#  Xmyth according to the settings in .xserverrc  
#  mythfrontend according to the settings in .xinitrc  
 xinit -- :1 &  
#xmodmap /home/myth/.Xmodmap  
else  
 echo "Remote Terminal"  
  
fi  
else  
echo "X is running"  
fi  

{% endhighlight %}
Into `~/.xinitrc` :  

{% highlight bash %}
xsetroot -solid \#400040 -cursor_name top_left_arrow  
xmodmap /home/myth/.Xmodmap  
mythfrontend &> /home/myth/myth.frontend.log  
setterm -reset  
echo;echo;echo  

{% endhighlight %}
Into `~/.xserverrc` :  

{% highlight bash %}
#! /bin/bash  
killall Xmyth > /dev/null  
exec Xmyth -novtswitch -sharevts -isolateDevice PCI:1:5:0 -nolisten tcp tty6 -layout MythTV :1 &> /home/myth/myth.x.log  

{% endhighlight %}
## The desktop user

  
Append to `~/.bash_profile` :  

{% highlight bash %}
#...  
if [ -z "$DISPLAY" ]; then  
if [ `tty` == "/dev/tty7" ]; then  
 setterm -blank 0 -powersave off -powerdown 0 -cursor off  
  
 export DISPLAY=:0.0  
# The following starts :  
#  X0 according to the settings in .xserverrc  
 xinit -- :0 &  
else  
 echo "Remote Terminal"  
  
fi  
else  
echo "X is running"  
fi  

{% endhighlight %}
Into `~/.xinitrc` :  

{% highlight bash %}
exec /usr/bin/startxfce4  

{% endhighlight %}
Into `~/.xserverrc` :  

{% highlight bash %}
#! /bin/bash  
killall X0 > /dev/null  
exec X0 -isolateDevice PCI:0:2:0 -novtswitch -sharevts -nolisten tcp tty7 -layout Default :0  

{% endhighlight %}
## The auto-login

  
This is all handled by `upstart` now, which uses  `/etc/initab` only for the `id:5:initdefault:` line.  Make sure it contains :  

{% highlight bash %}
id:5:initdefault:  

{% endhighlight %}
Add the following two files to  `/etc/event.d` :  

{% highlight bash %}
# In /etc/event.d/login-mythuser   
#  
# Autologin myth on tty6 - starts X  
#  
# This service maintains a getty on tty6 from the point the system is  
# started until it is shut down again.  
  
start on stopped rc5  
stop on runlevel [!5]  
  
respawn  
exec /sbin/mingetty --autologin=myth tty6  

{% endhighlight %}
and  

{% highlight bash %}
# In /etc/event.d/login-desktopuser   
#  
# Autologin yoshika on tty7 - starts X  
#  
# This service maintains a getty on tty1 from the point the system is  
# started until it is shut down again.  
  
start on stopped rc5  
stop on runlevel [!5]  
  
#respawn  
exec /sbin/mingetty --autologin=yoshika tty7  

{% endhighlight %}
Also, comment out every line in `/etc/event.d/prefdm` (this file is the one that creates the gdm login manager, which is not required if the users are auto-logged in as above).  
  


## MythTV in general

  
The permissions for the video devices are not set up correctly for access by both the desktop and the mythtv user.  So put the following in `/etc/udev/rules.d/50-udev-extra.rules` :  

{% highlight bash %}
# Let everyone get at the video devices  
KERNEL=="video*", MODE="0666"  
KERNEL=="fb0",  MODE="0666"  
  
# Create links ready for xine (eg : /dev/dvd1)  
SUBSYSTEM=="block", KERNEL=="sr[0-9]*", SYMLINK+="dvd%n"  

{% endhighlight %}
See other posts for `lircd`, `alsa`, etc...
