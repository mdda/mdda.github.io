---
comments: false
date: 2008-03-06 17:11:00+00:00
title: MythTV sharing ALSA with other Desktop
category: OSS
wordpress_id: 140
wp_parent: '0'
wp_slug: mythtv-sharing-alsa-with-other-desktop
tags:
- alsa
- fc9
- fedora
- sound
- udev
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


See : http://alsa.opensrc.org/index.php/AlsaSharing  
  
Make `udev` assign the right permissions to the sound devices, but putting the following in `/etc/udev/rules.d/90-alsa-extra.rules` :    

{% highlight bash %}
# Fix up sound devices for all users  
NAME=="snd/*", MODE="0666"  

{% endhighlight %}
In `/etc/asound.conf`, something along these lines :  

{% highlight bash %}
pcm.card0 {  
   type hw  
   card 0  
# mmap_emulation true  
}  
pcm.dmixer {  
   type dmix  
   ipc_key 36739  
   ipc_key_add_uid false  
   ipc_perm 0666  
   slave {  
#        pcm "hw:0,0"  
       pcm "card0"  
       period_time 0  
       period_size 1024  
       buffer_size 8192  
       #periods 128  
       #rate 44100  
       rate 48000  
    }  
    bindings {  
       0 0  
       1 1  
    }  
}  
  
ctl.mixer0 {  
   type hw  
   card 0  
}  
pcm.dsnoop0 {  
   type dsnoop  
   ipc_key 36741  
   slave {  
       pcm "card0"  
   }  
}  
pcm.asym0 {  
   type asym  
   playback.pcm "dmixer"  
   capture.pcm "dsnoop0"  
}  
pcm.pasym0 {  
   type plug  
   slave.pcm "asym0"  
}  
# 'dsp0' is espected by OSS emulation etc.  
pcm.dsp0 {  
   type plug  
   slave.pcm "asym0"  
}  
ctl.dsp0 {  
   type hw  
   card 0  
}  
pcm.!default {  
   type plug  
   slave.pcm "asym0"  
}  

{% endhighlight %}
