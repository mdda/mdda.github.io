---
date: 2016-01-17
title: Chronyd and SELINUX
category: OSS
tags:
- linux
- chrony
- selinux
- fedora
- fc22
layout: post
published: true
---
{% include JB/setup %}

This is a small thing : ```chrony``` seemed to have lost track of time,
the fix was simple - and had to do with ```SELINUX```.

### Losing Track of Time

The clock on my machine seemed unusually 'off'.  My first comparison was to my mobile phone
- an easy check, since mobiles are typically synced against the mobile-provider / cell towers.

Checking as to the state of play on the machine itself : 

{% highlight bash %}
systemctl status chronyd
## reports a normal-looking status (running, and enabled)
chronyc sourcestats
## reports Zero sources...  Something is up
{% endhighlight %}

### Where are the sources?

The default Fedora ```/etc/chrony.conf``` contains a valid 'pool' configuration :

{% highlight bash %}
# Use public servers from the pool.ntp.org project.
# Please consider joining the pool (http://www.pool.ntp.org/join.html).
pool 2.fedora.pool.ntp.org iburst

#....
{% endhighlight %}

so why are no sources picked up?  Checking ```/var/log/messages``` shows  :

{% highlight bash %}
Jan 17 02:09:07 square kernel: audit: type=1400 audit(1452967747.816:791): \
  avc:  denied  { read } for  pid=12887 comm="chronyd" name="resolv.conf" dev="sdb1" \
  ino=3425971 scontext=system_u:system_r:chronyd_t:s0 \
  tcontext=unconfined_u:object_r:user_home_t:s0 \
  tclass=file permissive=0
{% endhighlight %}

This tells us that ```chronyd``` is being denied something by ```SELINUX``` (something
that I felt sure I had turned to ```permissive mode```, since it's often a source of 
hard-to-fathom errors).

### Bug in chronyd?

At first blush, this seemed like an error with ```chronyd```, since the rest of the 
system was working fine.

However, ```SELINUX``` is doing a typical mis-direct here : The problem actually
lay with the ```/etc/resolv.conf``` file itself - it had somehow become *mislabled*.

### Simple Fix

{% highlight bash %}
## Relabel (SELINUX-wise) the file in question
restorecon -v /etc/resolv.conf

## Restart chronyd to force it to retry accessing the file
systemctl restart chronyd

## Check that chronyd now has a non-zero 'Number of sources'
chronyc sourcestats

210 Number of sources = 4
Name/IP Address            NP  NR  Span  Frequency  Freq Skew  Offset  Std Dev
==============================================================================
186.211.189.118.static.m1  17  13   43m     +1.256      0.300  +6034us   210us
ntp01.cosmicflu.com        17   9   31m     +0.152      0.216  +7966us   129us
time1.maxonline.com.sg      0   0     0     +0.000   2000.000     +0ns  4000ms
unknown.maxonline.com.sg   15   6   35m     +1.158      6.231  -6320us  3137us
{% endhighlight %}

Solved.
