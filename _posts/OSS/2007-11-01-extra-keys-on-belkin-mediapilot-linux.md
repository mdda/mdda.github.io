---
comments: false
date: 2007-11-06 06:03:00+00:00
title: Extra keys on Belkin MediaPilot (linux)
category: OSS
wordpress_id: 138
wp_parent: '0'
wp_slug: extra-keys-on-belkin-mediapilot-linux
tags:
- Belkin-MediaPilot
- dual-screen
- fc7
- linux 
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Here are the keycodes that I was able to uncover using `showkey -k`.    
  
Unfortunately, the kernel logs don't complain when I hit the unknown keys so there's probably no point in setting up the extra scancodes (particularly since this Belkin MediaPilot keyboard is not the primary keyboard in the system, and the `setkeycodes` documentation suggests that it only works on the primary keyboard).  I've tried to use useful codes out of `linux/input.h`, and can confirm that these actually feed through to MythTV, so that they can be used as JumpPoints, or whatever.  
  
Into `~/.Xmodmap` put (note that '!' is the comment character) :  
  

{% highlight bash %}
keycode 189 = F1  
keycode 142 = F2  
keycode 242 = F3  
keycode 214 = F4  
keycode 181 = F5  
keycode 139 = F6  
keycode 190 = F7  
! keycode ??? = F8  
keycode 240 = F9  
keycode 241 = F10  
keycode 239 = F11  
! keycode ??? = F12  
  
! keycode ??? = BelkinPower  
! keycode ??? = XF86PowerDown  
  
! keycode 180 = BelkinTuner  
keycode 180 = XF86Launch0  
  
! keycode 163 = BelkinCD  
keycode 163 = XF86Launch1  
  
! keycode ??? = BelkinVCR  
! keycode ??? = XF86Launch2  
  
! keycode 243 = BelkinAux  
keycode 243 = XF86Launch3  
  
! keycode 152 = BelkinTV  
keycode 152 = XF86Launch4  
  
! keycode ??? = BelkinDVD  
! keycode ??? = XF86Launch5  
  
! keycode 148 = BelkinVid1  
keycode 148 = XF86Launch6  
  
! keycode 218 = BelkinVid2  
keycode 218 = XF86Launch7  
  
! keycode 179 = BelkinMenu  
keycode 179 = XF86MenuKB  
  
! keycode 173 = BelkinBack  
keycode 173 = XF86Back  
  
! keycode 171 = BelkinFwd  
keycode 171 = XF86Forward  
  
! keycode 123 = BelkinVolUp  
keycode 123 = XF86AudioRaiseVolume  
  
! keycode 122 = BelkinVolDown  
keycode 122 = XF86AudioLowerVolume  
  
! keycode 121 = BelkinMute  
keycode 121 = XF86AudioMute  
  
! keycode ??? = BelkinRecord  
  
! keycode 174 = BelkinStop  
keycode 174 = XF86Stop  
  
! keycode 172 = BelkinPlay  
keycode 172 = XF86Start  

{% endhighlight %}
And in my `~/.xinitrc` I've got :   
  

{% highlight bash %}
xsetroot -solid \#400040 -cursor_name top_left_arrow  
xmodmap /home/myth/.Xmodmap  
mythfrontend &> /home/myth/myth.frontend.log  
setterm -reset  
echo;echo;echo  

{% endhighlight %}
Just for completeness, I've appended the following code to my `~/.bash_profile` - this detects whether it's running as the console on my second keyboard, and launches appropriately :  
  

{% highlight bash %}
if [ -z "$DISPLAY" ]  
then  
       if [ `tty` == "/dev/tty1" ]  
       then  
               setterm -blank 0 -powersave off -powerdown 0 -cursor off  
  
               export DISPLAY=:1.0  
# The following starts :  
#  Xmyth according to the settings in .xserverrc  
#  mythfrontend according to the settings in .xinitrc  
               xinit -- :1 &  
       else  
               echo "Remote Terminal"  
       fi  
else  
       echo "X is running"  
fi  

{% endhighlight %}
and `.xserverrc` contains :  
  

{% highlight bash %}
#! /bin/bash  
killall Xmyth > /dev/null  
exec Xmyth -novtswitch -sharevts -isolateDevice PCI:1:5:0 -nolisten tcp -layout MythTV :1 &> /home/myth/myth.x.log  

{% endhighlight %}
