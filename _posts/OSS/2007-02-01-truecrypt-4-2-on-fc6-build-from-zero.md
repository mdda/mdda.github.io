---
comments: false
date: 2007-02-06 05:18:00+00:00
title: 'TrueCrypt 4.2 on FC6 : Build from Zero'
category: OSS
wordpress_id: 117
wp_parent: '0'
wp_slug: truecrypt-4-2-on-fc6-build-from-zero
tags:
- fc6
- fedora
- truecrypt
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


This was wholesale copied from the (German) blog at http://fedorawiki.de/index.php/Truecrypt  
  


### Set up yum

  

{% highlight bash %}
# yum install yum-utils  
# yum install rpm-build redhat-rpm-config unifdef  

{% endhighlight %}
`  
# yumdownloader --source kernel --enablerepo core-source --enablerepo updates-source  

{% highlight bash %}
### Install Kernel Sources

  

{% endhighlight %}
# mkdir /usr/src/redhat # due to packaging problem, I guess  
# rpm -ivh kernel-$(uname -r).src.rpm  

{% highlight bash %}
`  
# cd /usr/src/redhat/SPECS  
# rpmbuild -bp --target $(uname -m) kernel-2.6.spec  

{% endhighlight %}
### Copy dm.h into the right place

  

{% highlight bash %}
# cp /usr/src/redhat/BUILD/kernel-2.6.19/linux-2.6.19.$(uname -p)/drivers/md/dm.h  /usr/src/kernels/$(uname -r)-$(uname -m)/drivers/md/  

{% endhighlight %}
### Get and unpack truecrypt sources

  
Get [truecrypt source](http://www.truecrypt.org/downloads.php).  

{% highlight bash %}
# tar xfz truecrypt-4.2a-source-code.tar.gz -C /tmp  

{% endhighlight %}
### Patch the truecrypt source to cope with dm.h 'issues'

  
Patch is [  
truecrypt-4.2a-Dm-target.c--kernel-2.6.18-and-2.6.19.patch  
](http://cante.net/~jaalto/tmp/bug/truecrypt/truecrypt-4.2a-Dm-target.c--kernel-2.6.18-and-2.6.19.patch), put this in the main truecrypt-4.2a directory (which _contains_ the Linux directory).  

{% highlight bash %}
# cd /tmp  
# mv truecrypt-4.2a-Dm-target.c--kernel-2.6.18-and-2.6.19.patch truecrypt-4.2a/  
# cd truecrypt-4.2a/  
# patch -p1 < truecrypt-4.2a-Dm-target.c--kernel-2.6.18-and-2.6.19.patch  
# cd Linux  

{% endhighlight %}
### Build truecrypt for real

  
Using `/usr/src/kernels/$(uname -r)-$(uname -m)/` as location of linux sources when prompted  

{% highlight bash %}
# cd Linux  
# ./build.sh  

{% endhighlight %}
### Install truecrypt module

  

{% highlight bash %}
# su - # to get /sbin/modprobe into path  
# ./install.sh  

{% endhighlight %}
### Load truecrypt module

  

{% highlight bash %}
# /sbin/modprobe truecrypt  
  
# /sbin/lsmod |grep truecrypt  
truecrypt             163588  0   
dm_mod                 63449  3 truecrypt,dm_mirror,dm_multipath  

{% endhighlight %}
