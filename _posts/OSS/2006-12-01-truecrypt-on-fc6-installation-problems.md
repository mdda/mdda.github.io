---
comments: false
date: 2006-12-31 20:54:00+00:00
title: 'TrueCrypt on FC6 : Installation Problems'
category: OSS
wordpress_id: 108
wp_parent: '0'
wp_slug: truecrypt-on-fc6-installation-problems
tags:
- fedora
- truecrypt
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Anaconda bug had i586 kernel being installed on Dell 600m laptop, with `uname -a` mis-reporting an i686 installation.  
  
i586 -> i686 kernel change required, then truecrypt modules on farm.repo work like magic.  
  
When installing packages with kmods (e.g. the rt2500 and truecrypt drivers) you might run into trouble like this:  

{% highlight bash %}
Transaction Check Error:   package kernel-2.6.18-1.2798.fc6 is already installed  
file /boot/System.map-2.6.18-1.2798.fc6 from install of kernel-2.6.18-1.2798.fc6 conflicts with file from package kernel-2.6.18-1.2798.fc6  
file /boot/config-2.6.18-1.2798.fc6 from install of kernel-2.6.18-1.2798.fc6 conflicts with file from package kernel-2.6.18-1.2798.fc6  
file /boot/symvers-2.6.18-1.2798.fc6.gz from install of kernel-2.6.18-1.2798.fc6 conflicts with file from package kernel-2.6.18-1.2798.fc6  
file /boot/vmlinuz-2.6.18-1.2798.fc6 from install of kernel-2.6.18-1.2798.fc6 conflicts with file from package kernel-2.6.18-1.2798.fc6  

{% endhighlight %}
This is due to a bug in anaconda (the Fedora Core installer) that accidentally installed an i586 kernel on your i686 machine. Workaround is to switch to the i686 kernel and try again after a reboot.  
  
Method 1  
  
The fix shown on the farm.repo site was to swap out the i586 kernel for the i686 with yum, rather than rpm directly, and it worked just fine:  


  1. save /boot/grub/menu.lst
  2. yum remove kernel kernel-devel
  3. yum install kernel.i686 kernel-devel.i686
  4. yum install (the list of a dozen odd i386 kernel depencies removed in step #1, such as "gnome-volume-manager" and "compiz")
  5.   reuse the saved menu.lst
Method 2 (used sucessfully)  
  
Install yumdownloader which is in the yum-utils package.  

{% highlight bash %}
# yumdownloader kernel-2.6.18-1.2798.fc6.i686  
# rpm -Uvh --replacefiles --replacepkgs kernel-2.6.18-1.2798.fc6.i686.rpm  

{% endhighlight %}
