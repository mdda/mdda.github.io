---
comments: false
date: 2008-10-04 00:28:00+00:00
title: Sharing a Partition between Vista and Linux
category: OSS
wordpress_id: 153
wp_parent: '0'
wp_slug: sharing-a-partition-between-vista-and-linux
tags:
- fedora
- partitioning
- Vista
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


  
For a dual-boot machine (where the main desktop would be Linux), a common 'data' partition makes sense (rather than allowing root access by Linux to the Vista install, or visa-versa).  


  
  


### Shared Partition

  
Since the Vista driver requires it, you need to format the shared 'ext3' partition with :   

{% highlight bash %}
/sbin/mkfs.ext3 -I 128 /dev/sd_A_  

{% endhighlight %}
### Partitioning Problems

  
The Vista driver seems to overwrite the UID of the partition.  This means that if the UID is used in /etc/fstab to define the mount-point, and the parameters are set to mount it at boot time, then you can get dropped into a very unhelpful boot-fix shell ("Good Luck!").  
  
Use the following to remount the root partition as read-write (so that /etc/fstab can be altered and saved) :   
  

{% highlight bash %}
mount -w -o remount /  

{% endhighlight %}
Best solution is to reference the drive by its 'LABEL' - use '/sbin/e2label LABEL=nameofdisk' to do this, and adjusting the line in /etc/fstab to match. (Do this before ever mounting it in Vista)  
  


### Ext3 Driver for Vista

  
I found that the one at [fs-driver.org](fs-driver.org) works just fine on Vista32.  It seems to 'just work', and the latest features even mention that it takes care of `ext3` journals.  Niiice.
