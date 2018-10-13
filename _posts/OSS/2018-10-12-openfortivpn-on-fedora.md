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
published: true
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


### Initial tests

Try to connect manually first...  Run as ```root``` :

{% highlight bash %}
# First, move away the configuration file, so that everything has to be explicit :
mv /etc/openfortivpn/config /etc/openfortivpn/config.old

# Now connect via the CLI (test by using the network somehow in another window) :
openfortivpn somewhere.fortiddns.com:10443 -u username \
             --trusted-cert dead1e96dead013cdead5c14dead8f5ddeadd3c5deadf3c9dead008bdead6c07
# This will prompt for your password
{% endhighlight %}

Where the value for ```--trusted-cert``` is given to you in the debug message, 
if ```openfortivpn``` fails to have a certificate that matches the VPN destination.

When it works, the connection messages for ```openfortivpn``` will look like :

{% highlight bash %}
VPN account password: (ENTERED HERE)
INFO:   Connected to gateway.
INFO:   Authenticated.
INFO:   Remote gateway has allocated a VPN.
INFO:   Got addresses: [10.312.334.67], ns [192.168.2.335, 8.8.8.8]
INFO:   Interface ppp0 is UP.
INFO:   Setting new routes...
INFO:   Adding VPN nameservers...
INFO:   Tunnel is up and running.

# Now the VPN connection is running, and ready for use... Until we press ^C in this window.

^CINFO:   Cancelling threads...
INFO:   Setting ppp interface down.
INFO:   Restoring routes...
INFO:   Removing VPN nameservers...
INFO:   Terminated pppd.
INFO:   Closed connection to gateway.
INFO:   Logged out.
{% endhighlight %}


### Making it simpler

Having made sure the connection works on the command line,  
put the known-good parameters into ```/etc/openfortivpn/config``` (edit as ```root```):

{% highlight bash %}
# config file for openfortivpn, see man openfortivpn(1)
host = somewhere.fortiddns.com
port = 10443 
username = username
#password =
trusted-cert = dead1e96dead013cdead5c14dead8f5ddeadd3c5deadf3c9dead008bdead6c07
{% endhighlight %}

And now the VPN connection can be opened with a simple (run as ```root```) :

{% highlight bash %}
openfortivpn
# Will prompt for password, unless you add it to /etc/openfortivpn/config
{% endhighlight %}



All done.


