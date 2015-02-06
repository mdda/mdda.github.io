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
published: true
---
{% include JB/setup %}

Because of the 'GHOST' scare, and the apparent lack of patched RPMs available for ```glibc``` for Fedora 19, 
I decided to bite the bullet and upgrade some VPSs to Fedora 21.  However, instead of doing the 
sane thing (creating a fresh VPS and copying everything over) I decided to throw caution to the
wind and upgrade the VPS *in situ*.

## Digital Ocean Control Panel = SCORE!

The thing that makes it bearable on Digital Ocean is that the control panel
makes it easy to switch kernels (which would otherwise be ```grub``` on a standalone machine).

On the other hand, they don't appear to have all the kernel version available, 
which means that a straight 'upgrade' needs to be fixed by installing a previous kernel 
(one which they do have on the drop-down list).

## Step 1 : Take a snapshot

(unless you are actually insane).

## Step 2 : Step through a helpful script 

Check out [this script](https://gist.github.com/kallisti5/01f6df3bfb77b978abfe).

However, I went through this step-by step, since running a clean ```yum``` 
after more than a year of bit-rot would be a surprise.

First, note the kernel that's being run :

{% highlight bash %}
# uname -a
Linux d1.platformedia.com 3.9.8-300.fc19.x86_64 #1 SMP Thu Jun 27 19:24:23 UTC 2013 x86_64 x86_64 x86_64 GNU/Linux
{% endhighlight %}

Then have a run through the first (uncontraversial) steps :

{% highlight bash %}
yum update
rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-21-$(uname -i)
yum update yum
yum clean all
{% endhighlight %}

Then onto the upgrade proper : 

{% highlight bash %}
yum --releasever=21 distro-sync 
{% endhighlight %}

This threw up a series of niggles...

### Step 2a : Fix dependency issues

{% highlight bash %}
yum remove perl-PlRPC-0.2020-13.fc19.noarch
{% endhighlight %}

Remember to reinstall its dependencies ```perl-DBI``` and ```perl-DBD-MySQL```.

### Step 2b : ```yum``` runs into memory issues

This is a little disheartening, but the VPS is only 512Mb...  
So, refusing to give up, shut down running processes :

{% highlight bash %}
#service webmin stop
##Stopping Webmin server in /usr/libexec/webmin

service nginx stop
##Redirecting to /bin/systemctl stop  nginx.service

service postfix stop
##Redirecting to /bin/systemctl stop  postfix.service
{% endhighlight %}


### Step 2c : ```yum```+presto runs into memory issues

The solution to this was just to repeatedly re-run ```yum --releasever=21 distro-sync``` - 
eventually all the RPMs get downloaded / expanded successfully (about 3 iterations required).


### Step 2d : Continue with the script

{% highlight bash %}
yum remove firewalld-config-standard 
## Nothing to do (using iptables)

shutdown -h now
{% endhighlight %}

## Step 3 : Change  kernel on control panel

According to script : same as currently running (fc19).

Power On (via the Panel) takes a while...

## Step 4 : Change to upgraded kernel on control panel

Ah - but here's a problem : ```yum``` gave us ```kernel-3.18.5-201.fc21.x86_64```,
but the Panel only lists a previous version.

Therefore, need to install the previous version so that we can 
successfully switch to it.

So : Search for most recent one listed on DigitalOcean,
by visiting [the Koju build site](http://koji.fedoraproject.org/koji/packageinfo?packageID=8),
and going to the ```3.18.3-201.fc21``` page.  There snag the three required RPMs : 

{% highlight bash %}
k=https://kojipkgs.fedoraproject.org//packages/kernel/3.18.3/201.fc21/x86_64
v=3.18.3-201.fc21.x86_64
yum install ${k}/kernel-${v}.rpm \
            ${k}/kernel-core-${v}.rpm \
            ${k}/kernel-modules-${v}.rpm
{% endhighlight %}

Fortunately, that works.

{% highlight bash %}
shutdown -h now
{% endhighlight %}

## Step 5 : Change (for real, this time) to the FC21 kernel on the control panel

Power On.  

{% highlight bash %}
uname -a
## Linux d1.platformedia.com 3.18.3-201.fc21.x86_64 #1 SMP Mon Jan 19 15:59:31 UTC 2015 x86_64 x86_64 x86_64 GNU/LinuxSuccess!!
{% endhighlight %}

SUCCESS!

## Step 6 : Backtrack over packages that ```yum``` complained about

{% highlight bash %}
yum install perl-DBI perl-DBD-MySQL
{% endhighlight %}

## Minor outstanding issue

The Digital Ocean panel still shows 'Fedora Fedora 19 x64' in the droplet's header field
(presumably because that's the image it was originally created from).


