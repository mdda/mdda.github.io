---
date: 2015-02-09
title: FortiClient SSL VPN on Fedora
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

Trying to look at ```openswan```, ```libreswan```, ```strongswan```.  None have hit the jackpot yet...




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
https://aur.archlinux.org/packages/forticlientsslvpn/
http://support.safe-t.com/forticlients/

tar -xzf forticlientsslvpn_linux_4.4.2307.tar.gz
cd forticlientsslvpn/64bit/
##As root - accept the license :
./helper/setup.sh
{% endhighlight %}

{% highlight bash %}
cd 64-bit
./forticlientsslvpn_cli --server SERVERNAME.fortiddns.com:10443 --vpnuser USERNAME
{% endhighlight %}




{% highlight bash %}
[root@square andrewsm]# restorecon -R -v /etc/resolv.conf
{% endhighlight %}







{% highlight bash %}
more /root/.fctsslvpnhistory 
version=2
proxyserver=
proxyport=
proxyuser=
proxypasswdenc=Enc 420d2ee65abded897a69c50f4995397969fXXXXXXXXXXXXXXX
current=SERVER
keepalive=0
autostart=0
profile=SERVER
nocertwarnning=1
p12passwdenc=Enc 420d2ee65abded897a69c50f4995397969fXXXXXXXXXXXXXXX
path=
passwordenc=Enc 420d2ee65abded897a69c50f4995397969fXXXXXXXXXXXXXXX
user=USERNAME
port=10443
server=SERVERNAME.fortiddns.com
profile=default
p12passwdenc=Enc 420d2ee65abded897a69c50f4995397969fXXXXXXXXXXXXXXX
path=
passwordenc=Enc 420d2ee65abded897a69c50f4995397969fXXXXXXXXXXXXXXX
user=
port=10443
server=
{% endhighlight %}



Dec 16 23:04:37 square NetworkManager: ERROR:  Gateway certificate validation failed, and the certificate digest in not in the local whitelist. If you trust it, rerun with:
Dec 16 23:04:37 square NetworkManager: ERROR:      --trusted-cert 7cd8b92123f09282442bb9c6bc3fbe9e0b0c04678e6e2c0d5a37XXXXXXXXXXXX
Dec 16 23:04:37 square NetworkManager: ERROR:  or add this line to your config file:
Dec 16 23:04:37 square NetworkManager: ERROR:      trusted-cert = 7cd8b92123f09282442bb9c6bc3fbe9e0b0c04678e6e2c0d5a37XXXXXXXXXXXX


/sbin/restorecon -v /etc/resolv.conf


12/17/2016 00:29:47 [10445] connecting to SERVERNAME.fortiddns.com:10443
12/17/2016 00:29:48 [10445] [xml config]: GET /remote/fortisslvpn_xml ... (received 789 bytes): 
HTTP/1.1 200 OK
Date: Fri, 16 Dec 2016 16:29:47 GMT
Set-Cookie: SVPNCOOKIE=CCCCCCCCCCCCCCCCCCCCCCn6inmpq7GE6U3z5Ojx2UfxY4WOXKqFhF/57t41fBpVQ4k%0aRKJ/IUi5INdOBMO4P9PTawhfgRpEUvgrncZwQQjy8Rf/T79+KlWpfl0zTInGJiHE%0aXePbEs52zLXaoP9GAOVw3bV/il1MLqm6wEUx9BZUqz0=%0a; path=/; secure; httponly
Transfer-Encoding: chunked
Content-Type: text/xml
X-Frame-Options: SAMEORIGIN

<?xml version='1.0' encoding='utf-8'?>
<sslvpn-tunnel ver='1'>
  <fos platform='FG100D' major='5' minor='02' patch='4' build='0688' branch='688' />
  <client-config save-password='off' keep-alive='off' auto-connect='off' />
  <ipv4>
    <assigned-addr ipv4='10.212.134.XXX' />
    <split-tunnel-info><addr ip='192.168.2.0' mask='255.255.255.0' /></split-tunnel-info>
  </ipv4>
  <idle-timeout val='0' />
  <auth-timeout val='28800' />
</sslvpn-tunnel>
----

12/17/2016 00:29:48 [10445] Got local address from ppp, interface will be  up
12/17/2016 00:29:49 [10445] ppp interface is up
12/17/2016 00:29:49 [10445] run_scutil YYY.223.119.162 192.168.2.0/255.255.255.0 0...
begin sysconfig linux
Generating pppd.resolv.conf...Done
server route 
interface ppp0
address 10.212.134.XXX
delete route 1.1.1.1
Add route for YYY.223.119.162(192.168.1.1)
route -n add -net 192.168.2.0 netmask 255.255.255.0 gw 10.212.134.XXX
12/17/2016 00:32:21 [10417] rcv cmd:1 at state[1]


----------------------

https://blogs.gnome.org/lkundrak/2015/09/24/fortigate-ssl-vpn-support-added-to-networkmanager/

http://rolandtapken.de/blog/2016-11/connect-fortigatevpn-openfortivpn

Error : (No cookie given) #49 
  https://github.com/adrienverge/openfortivpn/issues/49

Works when VPN is up:
https://SERVERNAME.fortiddns.com:10443/remote/login?lang=en

??
http://vladvasiliu.com/post/20140619-1735-linux_to_fortigate_ipsec_tunnel.html

??
http://firewallguru.blogspot.sg/2009/08/site-to-site-vpn-openswan-to-fortinet.html

??
http://wildengineer.ilcavolfiore.it/configure-an-ipsec-connection-to-a-fortigate-110c-with-openswan/

Frontend:
  https://wiki.gnome.org/Projects/NetworkManager/VPN
  https://git.gnome.org/browse/network-manager-fortisslvpn/tree/
  https://github.com/GNOME/network-manager-fortisslvpn

Backend:
  https://github.com/adrienverge/openfortivpn
  This contains the http stuff in /src/http.c
  
  # This works when run as root
  openfortivpn SERVERNAME.fortiddns.com:10443 --username USERNAME --trusted-cert 7cd8b92123f09282442bb9c6bc3fbe9e0b0c04678e6e2c0d5XXXXXXXXXXXXXXX
  
Apparently network-manager-fortisslvpn is adding '--no-routes' to the command line, which stops this working
'--no-dns' is ok
  
https://github.com/GNOME/network-manager-fortisslvpn/blob/913aaf66250b2b1ced9af15093b33ff4a561f1aa/src/nm-fortisslvpn-service.c#L442

https://developer.gnome.org/libnm-util/stable/NMSettingIP4Config.html#NMSettingIP4Config--ignore-auto-routes
https://github.com/lcp/NetworkManager/blob/master/libnm-util/nm-setting-ip4-config.c#L566


14693 ?        Sl     0:00 /usr/libexec/nm-fortisslvpn-service --bus-name org.freedesktop.NetworkManager.fortisslvpn.Connection_22
14708 ?        Sl     0:00  \_ /bin/openfortivpn -c /var/lib/NetworkManager-fortisslvpn/ab4381b3-95eb-473a-866b-e1dc6b653b84.config --no-routes --no-dns EXAMPLE.fortiddns.com 10443 --trusted-cert 7cd8b92123f09282442bb9c6bc3fbe9e0b0c04678e6e2c0d5XXXXXXXXXXXXXXX --pppd-plugin /usr/lib64/pppd/2.4.7/nm-fortisslvpn-pppd-plugin.so
14709 pts/8    Ssl+   0:00      \_ /usr/sbin/pppd 38400 noipdefault noaccomp noauth default-asyncmap nopcomp receive-all nodefaultroute :1.1.1.1 nodetach lcp-max-configure 40 mru 1354 usepeerdns plugin /usr/lib64/pppd/2.4.7/nm-fortisslvpn-pppd-plugin.so

