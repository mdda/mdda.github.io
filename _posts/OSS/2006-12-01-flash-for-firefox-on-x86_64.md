---
comments: false
date: 2006-12-31 19:48:00+00:00
title: Flash for Firefox on x86_64
category: OSS
wordpress_id: 102
wp_parent: '0'
wp_slug: flash-for-firefox-on-x86_64
tags:
- 64bit
- Flash
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Best solution : nspluginwrapper  
  
Gnash looks promising, but has problems :  


  * Lack of aliased fonts
  * Memory leaks cause small Flash panels to take over machine after a couple of dormant hours
  * No embedded video for video.google.com or youtube.com
  
http://gwenole.beauchesne.info/en/projects/nspluginwrapper/help#release_notes  

{% highlight bash %}
-rw-r--r-- 1 platformedia users   53132 Dec 31 19:39 nspluginwrapper-0.9.91.2-1.x86_64.rpm  
-rw-r--r-- 1 platformedia users   50362 Dec 31 19:39 nspluginwrapper-i386-0.9.91.2-1.x86_64.rpm  

{% endhighlight %}
`  
# rpm -ivh nspluginwrapper-*  

{% highlight bash %}
#### Flash Player 9

 

 Flash Player 9 beta 1 (9.0.21.55) is not supported. [Flash Player 9 beta 2](http://labs.adobe.com/downloads/flashplayer9.html) (9.0.21.78) will work correctly, including with sites using javascript to navigate through other pages. There is a check to prevent the use of FP9 beta 1.  


 

http://labs.adobe.com/downloads/flashplayer9.html  
  

{% endhighlight %}
# tar -xzf FP9_plugin_beta_112006.tar.gz  
# cd flash-player-plugin-9.0.21.78/  

{% highlight bash %}
`  
# cp libflashplayer.so /usr/lib/firefox-1.5.0.9/plugins/  
# nspluginwrapper -i /usr/lib/firefox-1.5.0.9/plugins/lib  
# nspluginwrapper -l  
/usr/lib64/mozilla/plugins/npwrapper.libflashplayer.so  
Original plugin: /usr/lib/firefox-1.5.0.9/plugins/libflashplayer.so  
Wrapper version string: 0.9.91.2  

{% endhighlight %}
about:plugins  
http://www.colbertnation.com/
