---
comments: false
date: 2006-12-31 21:06:00+00:00
title: SpeedHouse machine installation
category: OSS
wordpress_id: 110
wp_parent: '0'
wp_slug: speedhouse-machine-installation
tags:
- fedora
- uk
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


From the DVD, install Basic Desktop for Fedora Core 6.  However, much more is required (and the dependencies will be pulled in automatically).  
  

{% highlight bash %}
yum install yum-fastestmirror  
rpm -ivh http://rpm.livna.org/livna-release-6.rpm  
rpm --import http://rpm.livna.org/RPM-LIVNA-GPG-KEY  
yum update  

{% endhighlight %}
Programming :  

{% highlight bash %}
yum install joe scite  

{% endhighlight %}
Japanese :  

{% highlight bash %}
yum install scim-anthy  
yum install VLGothic-fonts　fonts-japanese.noarch  
yum install gnome-sudoku  

{% endhighlight %}
Graphics :  

{% highlight bash %}
yum install inkscape  
yum install koffice-krita  
yum install xscreensaver-gl-extras-gss rss-glx-gnome-screensaver  

{% endhighlight %}
Music :  

{% highlight bash %}
yum update kernel alsa-lib alsa-utils  
yum install ardour  
yum install rosegarden4  
;yum install hydrogen # Not in extras  

{% endhighlight %}
Video / Music Players :  

{% highlight bash %}
yum install gstreamer gstreamer-plugins-ugly  
yum install videolan-client  
rpm -ivh ftp://ftp.pbone.net/mirror/rpm.livna.org/fedora/6/x86_64/libdvdcss-1.2.9-4.lvn6.x86_64.rpm  

{% endhighlight %}
