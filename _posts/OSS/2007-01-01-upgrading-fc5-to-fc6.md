---
comments: false
date: 2007-01-15 17:30:00+00:00
title: Upgrading FC5 to FC6
category: OSS
wordpress_id: 114
wp_parent: '0'
wp_slug: upgrading-fc5-to-fc6
tags:
- fc5
- fc6
- fedora
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Even though the official instructions advise against it, it works fairly smoothly.  In particular :  


  * 'americas' doesn't have a (non-USB) DVD drive, and won't boot of the USB external DVD-R;
  * 'cello' and 'flute' are remote servers, so popping in the DVD is impossible.
Here's a transcript of the not-so-smooth part :  

{% highlight bash %}
# yum install yum-fastestmirror  
# rpm -Uhv ftp://download.fedora.redhat.com/pub/fedora/linux/core/6/i386/os/Fedora/RPMS/fedora-release-*.noarch.rpm  
# yum upgrade  
Error: Package VFlib2 needs libttf.so.2, this is not available.  
Error: Package gtkhtml needs libgnomecanvaspixbuf.so.1, this is not available.  
--> Processing Conflict: hal conflicts kernel < 2.6.17  
--> Processing Conflict: autofs conflicts kernel < 2.6.17  
# yum remove VFlib2  
# yum remove gtkhtml  
# yum upgrade  

{% endhighlight %}
Still have kernel conflicts...  

{% highlight bash %}
# curl -O http://download.fedora.redhat.com/pub/fedora/linux/core/6/i386/os/Fedora/RPMS/kernel-2.6.18-1.2798.fc6.i686.rpm  
# rpm -Uvh --replacefiles --replacepkgs kernel-2.6.18-1.2798.fc6.i686.rpm   

{% endhighlight %}
Even though this is not the latest FC6 kernel, it gives us a better chance at satisfying the dependencies (this also seems to clear out kernels from FC5 in grub), the kernel version gets updated below anyway :  

{% highlight bash %}
# yum upgrade  
# shutdown -r now  

{% endhighlight %}
