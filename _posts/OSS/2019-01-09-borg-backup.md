---
date: 2019-01-09
title: Borg Backup (replacing rdiff-backup)
category: OSS
tags:
- fedora
- linux
- Fortinet
- forticlient
- vpn
layout: post
published: false
---
{% include JB/setup %}

For whatever reason, my previous Fortigate client UI stopped working recently.

Since I haven't been able to configure anything using the NetworkManager VPN GUI,
and the Fortigate binary has stopped working, something else was required
The FortiClient package, which appears to do virus scanning, etc, and
hide the VPN functionality (AFAICT), was quickly removed (after a &gt;200Mb download)...


### Single package required

The Fortigate custom openvpn is even part of the standard Fedora system repo ! :

{% highlight bash %}
# dnf whatprovides openfortivpn

openfortivpn-1.6.0-1.fc28.x86_64 : Client for PPP+SSL VPN tunnel services
Repo        : @System
Matched from:
Provide    : openfortivpn = 1.6.0-1.fc28

{% endhighlight %}




All done.


