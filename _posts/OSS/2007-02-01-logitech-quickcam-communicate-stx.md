---
comments: false
date: 2007-02-06 05:49:00+00:00
title: Logitech QuickCam Communicate STX
category: OSS
wordpress_id: 118
wp_parent: '0'
wp_slug: logitech-quickcam-communicate-stx
tags:
- fc6
- webcam
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


There are two versions of the QuickCam Communicate, the newer of which shows up as `046d:08d7` under `lsusb`.  This version needs `gspca` module.  
  


##### Install kernel headers

  

{% highlight bash %}
# yum install kernel-devel  

{% endhighlight %}
##### Build and install from `gspcavl` sources

  
The source can be found on the [main download](http://mxhaard.free.fr/download.html) page.  

{% highlight bash %}
cd gspcav1-20070110  
make  
make install  
modprobe gspca  
lsmod | grep gsp  

{% endhighlight %}
##### Check it works

  
Load up Ekiga, and select the `V4L` driver - images should display in the user interface.
