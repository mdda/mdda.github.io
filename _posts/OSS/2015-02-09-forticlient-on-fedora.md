---
date: 2015-02-09
title: FortiClient SSL VPN on Fedora
category: OSS
tags:
- fedora
- linux
- fortinet
- forticlient
- VPN
layout: post
published: false
---
{% include JB/setup %}

http://kb.arubacloud.com/en/computing/recovery-console/installing-and-connecting-forticlient-ssl-vpn-in-linux.aspx
http://portal.modeldriven.org/sites/default/files/SSL_VPN_Client_User_Guide.pdf
http://www.homecomputerlab.com/fortinet-fortigate-linux-ssl-vpn-client

{% highlight bash %}
http://kb.arubacloud.com/en/computing/recovery-console/installing-and-connecting-forticlient-ssl-vpn-in-linux.aspx
{% endhighlight %}

{% highlight bash %}
Feb 09 14:53:34 Installed: avahi-libs-0.6.31-30.fc21.i686
Feb 09 14:53:34 Installed: 1:cups-libs-1.7.5-13.fc21.i686
Feb 09 14:53:35 Installed: atk-2.14.0-1.fc21.i686
Feb 09 14:53:35 Installed: libXcomposite-0.4.4-6.fc21.i686
Feb 09 14:53:35 Installed: jasper-libs-1.900.1-29.fc21.i686
Feb 09 14:53:35 Installed: gdk-pixbuf2-2.31.1-1.fc21.i686
Feb 09 14:53:36 Installed: gtk2-2.24.25-1.fc21.i686
Feb 09 14:54:58 Installed: glibc-devel-2.20-7.fc21.i686
{% endhighlight %}

{% highlight bash %}
yum install xterm
{% endhighlight %}

{% highlight bash %}
./forticlientsslvpn_cli --server SERVERNAME.fortiddns.com:10443 --vpnuser USERNAME
{% endhighlight %}

