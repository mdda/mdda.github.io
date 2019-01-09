---
date: 2019-01-08
title: User updateable /etc/hosts
category: OSS
tags:
- fedora
- linux
- dnsmasq
layout: post
published: false
---
{% include JB/setup %}

The DNS resolution provided on the local machine via ```/etc/hosts``` isn't updatable 
by a user account.  

One possible solution was to install a local DNS server.  However, while the
obvious choice (```dnsmasq```) can make use of ```--usehosts``` files and 
even watch ```--hostsdir`` directories for updated files - the addresses there are 
*cumulative* - so that if an address is flipped from one IP to another and back, both
IPs will be returned in a round-robin fashion.  This eliminated this almost-clean route.

Finally, the cave-in approach worked : Change the mode of ```/etc/hosts``` to 
allow the ```dnsmasq``` group (or another suitable one on your machine``` to have ```rw``` permissions,
and grant your user access to that group.


### Change permissions

Simply change permissions on the ```/etc/hosts``` file :

{% highlight bash %}
chmod g+w /etc/hosts
chown root:dnsmasq /etc/hosts
ls -l /etc/hosts

usermod -G dnsmasq myusername
{% endhighlight %}


### Test the user's new permissions

The change will be system-wide upon next login.  But can also be used immediately in a terminal
in the current boot-cycle using :

{% highlight bash %}
su -i -u  $(whoami)
{% endhighlight %}

