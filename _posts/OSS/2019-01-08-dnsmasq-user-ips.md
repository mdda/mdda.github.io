---
date: 2019-01-08
title: User updateable /etc/hosts
category: OSS
tags:
- fedora
- linux
- dnsmasq
layout: post
published: true
---
{% include JB/setup %}

The DNS resolution provided on the local machine via ```/etc/hosts``` isn't updatable 
by a user account, which makes the following use-case a problem without ```root``` access :

>   DNS can be used as a poor-man's microservice resolution system, whereby
>   a given microservice name can be switched to point from a local development machine to 
>   a remote testing machine, to a production machine purely (and immediately) by adjusting DNS entries.


### Cleanest way didn't pan out...

One solution considered was to install a local DNS server.  However, while the
obvious choice (```dnsmasq```) can make use of one or more ```--addn-hosts``` files and 
even watch ```--hostsdir``` directories for updated files - the addresses there are 
*cumulative* - so that if an address is flipped from one IP to another and back, both
IPs will be returned in a round-robin fashion.  To reload the configuration requires a ```SIPHUP``` 
that a regular user cannot (?) issue.  This eliminated this almost-clean route.

At the end of a lengthy internal debate, the cave-in approach was chosen : Change the mode of ```/etc/hosts``` to 
allow the ```dnsmasq``` group (or another suitable one on your machine) to have ```rw``` permissions,
and grant your user access to that group...


#### Change permissions

Simply change permissions on the ```/etc/hosts``` file :

{% highlight bash %}
chmod g+w /etc/hosts
chown root:dnsmasq /etc/hosts
ls -l /etc/hosts

usermod -G dnsmasq myusername
{% endhighlight %}


#### Test the user's new permissions

The change will be system-wide upon next login.  But can also be used immediately in a terminal
in the current boot-cycle using :

{% highlight bash %}
su -i -u  $(whoami)
{% endhighlight %}


Done (with a bit of a sigh).
