---
comments: false
date: 2007-04-24 04:22:00+00:00
title: 'TrueCrypt 4.3 on FC6 : Build from Zero'
category: OSS
wordpress_id: 121
wp_parent: '0'
wp_slug: truecrypt-4-3-on-fc6-build-from-zero
tags:
- fc6
- fedora
- truecrypt
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


This was modified for the instructions given for 4.2 from the (German) blog at http://fedorawiki.de/index.php/Truecrypt  
  


### Set up yum

  

{% highlight bash %}
# yum install yum-utils  
# yum install rpm-build redhat-rpm-config unifdef  

{% endhighlight %}
### Install Kernel Sources

  
This install the sources from the rpm downloaded into the current directory.  The rpm can be discarded afterwards.  

{% highlight bash %}
# yumdownloader --source kernel --enablerepo core-source --enablerepo updates-source  
# mkdir /usr/src/redhat # due to packaging problem, I guess  
# rpm -ivh kernel-$(uname -r).src.rpm  

{% endhighlight %}
`  
# cd /usr/src/redhat/SPECS  
# rpmbuild -bp --target $(uname -m) kernel-2.6.spec  

{% highlight bash %}
### Copy dm.h into the right place

  

{% endhighlight %}
# cp /usr/src/redhat/BUILD/kernel-2.6.19/linux-2.6.19.$(uname -p)/drivers/md/dm.h  /usr/src/kernels/$(uname -r)-$(uname -m)/drivers/md/  

{% highlight bash %}
### Get and unpack truecrypt sources

  
Get [truecrypt source](http://www.truecrypt.org/downloads.php).  

{% endhighlight %}
# tar -xfz truecrypt-4.3-source-code.tar.gz -C /tmp  

{% highlight bash %}
Now, the kernel version is taken care of automatically - no need for a patch file.  
  


### Build truecrypt for real

  
(this is now painless)  

{% endhighlight %}
# cd Linux  
# ./build.sh  

{% highlight bash %}
### Install truecrypt module

  

{% endhighlight %}
# su - # to get /sbin/modprobe into path  
# ./install.sh  

{% highlight bash %}
(just accept the defaults - but consider allowing regular users to use truecrypt)  
  


### Load truecrypt module

  

{% endhighlight %}
# /sbin/modprobe truecrypt  
# /sbin/lsmod |grep truecrypt  
truecrypt             163588  0   
dm_mod                 63449  3 truecrypt,dm_mirror,dm_multipath  

```
