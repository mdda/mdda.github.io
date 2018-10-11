---
date: 2018-10-12
title: Open alternative to FortiClient SSL VPN on Fedora
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

Found that the following works, when run as root :

{% highlight bash %}
mv /etc/openfortivpn/config /etc/openfortivpn/config.old

openfortivpn somewhere.fortiddns.com:10443 -u username --trusted-cert dead1e96dead013cdead5c14dead8f5ddeadd3c5deadf3c9dead008bdead6c074

{% endhighlight %}

Where the ```--trusted-cert``` is given to you in the debug message, if it fails to match the VPN destination.

Just check : How did this magic appear on my machine... It's even part of the standard install! :

{% highlight bash %}
# dnf whatprovides openfortivpn

openfortivpn-1.6.0-1.fc28.x86_64 : Client for PPP+SSL VPN tunnel services
Repo        : @System
Matched from:
Provide    : openfortivpn = 1.6.0-1.fc28

{% endhighlight %}

