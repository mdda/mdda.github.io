---
date: 2015-02-08
title: Upgrading FC19(!) to FC21 on a VPS
category: OSS
tags:
- fedora
- linux
- fc21
- fedup
layout: post
published: false
---
{% include JB/setup %}

Because of the 'GHOST' scare, and the apparent lack of patched RPMs available for ```glibc``` for Fedora 19, 
I decided to bite the bullet and upgrade some VPSs to Fedora 21.  However, instead of doing the 
sane thing (creating a fresh VPS and copying everything over) I decided to throw caution to the
wind and upgrade the VPS in-situ.

## Digital Ocean Control Panel = SCORE!

The thing that makes it bearable on Digital Ocean is that the control panel
makes it easy to switch kernels (which would otherwise be ```grub``` on a standalone machine).

On the other hand, they don't appear to have all the kernel version available, 
which means that a straight 'upgrade' needs to be fixed by installing a previous kernel 
(one which they do have on the drop-down list).

Snapshot on 2015-02-07 01:15 SGT

    162.243.140.234
    Active
    512MB Ram
    20GB SSD Disk
    San Francisco 1
    Fedora Fedora 19 x64

## See : https://gist.github.com/kallisti5/01f6df3bfb77b978abfe


[root@d1 ~]# uname -a
Linux d1.platformedia.com 3.9.8-300.fc19.x86_64 #1 SMP Thu Jun 27 19:24:23 UTC 2013 x86_64 x86_64 x86_64 GNU/Linux

yum --releasever=21 distro-sync 
yum remove perl-PlRPC-0.2020-13.fc19.noarch

service webmin stop
Stopping Webmin server in /usr/libexec/webmin
[root@d1 ~]# service nginx stop
Redirecting to /bin/systemctl stop  nginx.service
[root@d1 ~]# service postfix stop
Redirecting to /bin/systemctl stop  postfix.service

# Error with prestodeltas: Lack of memory


yum remove firewalld-config-standard 
# Nothing to do (using iptables)

shutdown -h now

# Change kernel on control panel to : same as currently running (fc19)
# Power On takes a while...
# Now change kernel to latest : kernel-3.18.5-201.fc21.x86_64

## Hmm, but latest fc21 not on kernel list at DO...
## Search for most recent one listed on DigitalOcean at Koji :

## Visit : http://koji.fedoraproject.org/koji/packageinfo?packageID=8
## And go into the 3.18.3-201.fc21 page, and pick out the three required RPMs : 
https://kojipkgs.fedoraproject.org//packages/kernel/3.18.3/201.fc21/x86_64/kernel-modules-3.18.3-201.fc21.x86_64.rpm

shutdown -h now

## Change to latest kernel on DigitalOcean control panel
# Power On

[root@d1 ~]# uname -a
Linux d1.platformedia.com 3.18.3-201.fc21.x86_64 #1 SMP Mon Jan 19 15:59:31 UTC 2015 x86_64 x86_64 x86_64 GNU/Linux

## Success!!

yum install perl-DBI perl-DBD-MySQL

## Still shows 'Fedora Fedora 19 x64' in droplet control panel



{% highlight bash %}
{% endhighlight %}
