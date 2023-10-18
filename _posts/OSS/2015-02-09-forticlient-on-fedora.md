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

Trying to look at `openswan`, `libreswan`, `strongswan`.  None have hit the jackpot yet...


* http://kb.arubacloud.com/en/computing/recovery-console/installing-and-connecting-forticlient-ssl-vpn-in-linux.aspx
* http://portal.modeldriven.org/sites/default/files/SSL_VPN_Client_User_Guide.pdf
* http://www.homecomputerlab.com/fortinet-fortigate-linux-ssl-vpn-client

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
### As root - accept the license :
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



{% highlight bash %}
Dec 16 23:04:37 square NetworkManager: ERROR:  Gateway certificate validation failed, and the certificate digest in not in the local whitelist. If you trust it, rerun with:
Dec 16 23:04:37 square NetworkManager: ERROR:      --trusted-cert 7cd8b92123f09282442bb9c6bc3fbe9e0b0c04678e6e2c0d5a37XXXXXXXXXXXX
Dec 16 23:04:37 square NetworkManager: ERROR:  or add this line to your config file:
Dec 16 23:04:37 square NetworkManager: ERROR:      trusted-cert = 7cd8b92123f09282442bb9c6bc3fbe9e0b0c04678e6e2c0d5a37XXXXXXXXXXXX


/sbin/restorecon -v /etc/resolv.conf


12/17/2016 00:29:47 [10445] connecting to SERVERNAME.fortiddns.com:10443
12/17/2016 00:29:48 [10445] [xml config]: GET /remote/fortisslvpn_xml ... (received 789 bytes): 
{% endhighlight %}

{% highlight bash %}
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
{% endhighlight %}


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
*  https://wiki.gnome.org/Projects/NetworkManager/VPN
*  https://git.gnome.org/browse/network-manager-fortisslvpn/tree/
*  https://github.com/GNOME/network-manager-fortisslvpn

Backend:
*  https://github.com/adrienverge/openfortivpn
  This contains the http stuff in /src/http.c

```
# This works when run as root
  openfortivpn SERVERNAME.fortiddns.com:10443 --username USERNAME --trusted-cert 7cd8b92123f09282442bb9c6bc3fbe9e0b0c04678e6e2c0d5XXXXXXXXXXXXXXX
```

Apparently network-manager-fortisslvpn is adding '--no-routes' to the command line, which stops this working
'--no-dns' is ok
  
* https://github.com/GNOME/network-manager-fortisslvpn/blob/913aaf66250b2b1ced9af15093b33ff4a561f1aa/src/nm-fortisslvpn-service.c#L442

* https://developer.gnome.org/libnm-util/stable/NMSettingIP4Config.html#NMSettingIP4Config--ignore-auto-routes
* https://github.com/lcp/NetworkManager/blob/master/libnm-util/nm-setting-ip4-config.c#L566


14693 ?        Sl     0:00 /usr/libexec/nm-fortisslvpn-service --bus-name org.freedesktop.NetworkManager.fortisslvpn.Connection_22
14708 ?        Sl     0:00  \_ /bin/openfortivpn -c /var/lib/NetworkManager-fortisslvpn/ab4381b3-95eb-473a-866b-e1dc6b653b84.config --no-routes --no-dns EXAMPLE.fortiddns.com 10443 --trusted-cert 7cd8b92123f09282442bb9c6bc3fbe9e0b0c04678e6e2c0d5XXXXXXXXXXXXXXX --pppd-plugin /usr/lib64/pppd/2.4.7/nm-fortisslvpn-pppd-plugin.so
14709 pts/8    Ssl+   0:00      \_ /usr/sbin/pppd 38400 noipdefault noaccomp noauth default-asyncmap nopcomp receive-all nodefaultroute :1.1.1.1 nodetach lcp-max-configure 40 mru 1354 usepeerdns plugin /usr/lib64/pppd/2.4.7/nm-fortisslvpn-pppd-plugin.so

--------------
Follow up message to maintainer :

So, just to be clear(er), using the optnfortivpn CLI :

-----------------

This fails :
```
# openfortivpn SERVERNAME.fortiddns.com:10443 --username USERNAME
--trusted-cert XXX --no-routes

# ip route
default via 192.168.1.1 dev enp2s0  proto static  metric 100
1.1.1.1 dev ppp0  proto kernel  scope link  src 10.212.134.59
192.168.1.0/24 dev enp2s0  proto kernel  scope link  src 192.168.1.16
metric 100
```

-----------------

This works :
```
# openfortivpn SERVERNAME.fortiddns.com:10443 --username USERNAME
--trusted-cert XXX

# ip route
default via 192.168.1.1 dev enp2s0  proto static  metric 100
1.1.1.1 dev ppp0  proto kernel  scope link  src 10.212.134.59
192.168.1.0/24 dev enp2s0  proto kernel  scope link  src 192.168.1.16
metric 100
192.168.2.0/24 via 10.212.134.59 dev ppp0  scope link
```


-----------------

In both cases, /var/log/messages has :
```
Dec 20 00:06:32 square pppd[18926]: pppd 2.4.7 started by andrewsm, uid 0
Dec 20 00:06:32 square pppd[18926]: Using interface ppp0
Dec 20 00:06:32 square pppd[18926]: Connect: ppp0 <--> /dev/pts/8
Dec 20 00:06:32 square NetworkManager[885]: <info>  [1482163592.5548]
manager: (ppp0): new Generic device
(/org/freedesktop/NetworkManager/Devices/20)
Dec 20 00:06:33 square pppd[18926]: local  IP address 10.212.134.59
Dec 20 00:06:33 square pppd[18926]: remote IP address 1.1.1.1
Dec 20 00:06:39 square pppd[18926]: Hangup (SIGHUP)
Dec 20 00:06:39 square pppd[18926]: Modem hangup
Dec 20 00:06:39 square pppd[18926]: Connect time 0.1 minutes.
Dec 20 00:06:39 square pppd[18926]: Sent 1368 bytes, received 84 bytes.
Dec 20 00:06:39 square pppd[18926]: Connection terminated.
Dec 20 00:06:39 square pppd[18926]: Exit.
```

In both cases ::
```
# nmcli c show
NAME              UUID                                  TYPE
DEVICE
enp2s0            4becfeec-dcaf-3612-9d85-9d6dbfae362c  802-3-ethernet
enp2s0
VPN connection 1  ab4381b3-95eb-473a-866b-e1dc6b653b84  vpn
```

---------------

As for the 'magic', I see in the logs of the 'official' fortigate software
(when it connects) :

```
12/17/2016 00:29:47 [10445] connecting to SERVERNAME.fortiddns.com:10443
12/17/2016 00:29:48 [10445] [xml config]: GET /remote/fortisslvpn_xml ...
(received 789 bytes):
HTTP/1.1 200 OK
Date: Fri, 16 Dec 2016 16:29:47 GMT
Set-Cookie:
SVPNCOOKIE=v60ue3IVurYmO7MeWCCn6inmpq7GE6U3z5Ojx2UfxY4WOXKqFhF/57t41fBpVQ4k%0aRKJ/IUi5INdOBMO4P9PTawhfgRpEUvgrncZwQQjy8Rf/T79+KlWpfl0zTInGJiHE%0aXePbEs52zLXaoP9GAOVw3bV/il1MLqm6wEUx9BZUqz0=%0a;
path=/; secure; httponly
Transfer-Encoding: chunked
Content-Type: text/xml
X-Frame-Options: SAMEORIGIN

<?xml version='1.0' encoding='utf-8'?><sslvpn-tunnel ver='1'><fos
platform='FG100D' major='5' minor='02' patch='4' build='0688' branch='688'
/><client-config save-password='off' keep-alive='off' auto-connect='off'
/><ipv4><assigned-addr ipv4='10.212.134.59' /><split-tunnel-info><addr
ip='192.168.2.0' mask='255.255.255.0'
/></split-tunnel-info></ipv4><idle-timeout val='0' /><auth-timeout
val='28800' /></sslvpn-tunnel>
```

---------------

And I also see a Fortigate-specific query to " GET /remote/fortisslvpn_xml
" in the openfortivpn source too at :

https://github.com/adrienverge/openfortivpn/blob/master/src/http.c#L526

* which is called by ' run_tunnel(struct vpn_config *config) '
* which is called to set up the tunnel configuration at the end of main()

* But the tunnels themselves seem to be created during " on_ppp_if_up() "  - 
which is switched via --no-routes at :

https://github.com/adrienverge/openfortivpn/blob/master/src/tunnel.c#L46


---------------

Please let me know if there's anything else you'd like to see...
Martin


PS:  And thanks for being so responsive : My first email was less
informative partly because I didn't know whether this was an appropriate
email address.

===============

Ah, okay, it's the 192.168.2.0 missing.

I think you've identified the problem correctly.

It's that various versions of Fortigate are somewhat schizophrenic
about the L3 configuration -- they use PPP's IPCP as well as custom XML
 code.

For NetworkManager, we let the PPP plugin call back into
NetworkManager, and thus conveniently ignore anything outside IPCP. We
need to find a way to pass that information to a PPP plugin. Probably
an environment variable (that's what most other VPN daemons do) or
something.

I don't really have much time to hack on this Today, but I'd like to
look into this. If you don't hear from me until the end of this week,
please ping me again.

Thanks
Lubo

---------------

Spoke too soon. The route passing via environment is already there.
Seems like it was me who added it. Oh the previous memory...
Nevertheless, it seems to work well for me.

Please attach the "nmcli c show 'VPN connection 1'" output when
connected and also also the log from NetworkManager (capture
"journalctl -fl" while activating the connection).

Also, please make sure you're running the latest versions of
NetworkManager, NetworkManager-fortisslvpn and openfortivpn.

===============


Ok : After " dnf update -y "
(and admittedly a slight sigh of relief that it still doesn't work...)


# rpm -qa | grep NetworkM | sort
NetworkManager-1.4.2-2.fc25.x86_64
...
NetworkManager-fortisslvpn-1.2.4-1.fc25.x86_64
NetworkManager-fortisslvpn-gnome-1.2.4-1.fc25.x86_64
...

# rpm -qa | grep openforti | sort
openfortivpn-1.2.0-1.fc25.x86_64

----------------------------
The following is captured during an unsuccessful connection via the NetworkManager GUI (and I get different output without the trusted cert information, which I redacted - probably unnecessarily): 


```
# journalctl -fl

Dec 20 01:09:59 square.herald NetworkManager[878]: <info>  [1482167399.3079] audit: op="connection-activate" uuid="ab4381b3-95eb-473a-866b-e1dc6b653b84" name="VPN connection 1" pid=1462 uid=1000 result="success"
Dec 20 01:09:59 square.herald NetworkManager[878]: <info>  [1482167399.3181] vpn-connection[0x563c79680140,ab4381b3-95eb-473a-866b-e1dc6b653b84,"VPN connection 1",0]: Started the VPN service, PID 2298
Dec 20 01:09:59 square.herald NetworkManager[878]: <info>  [1482167399.3309] vpn-connection[0x563c79680140,ab4381b3-95eb-473a-866b-e1dc6b653b84,"VPN connection 1",0]: Saw the service appear; activating connection
Dec 20 01:10:04 square.herald NetworkManager[878]: <info>  [1482167404.9021] keyfile: update /etc/NetworkManager/system-connections/VPN connection 1 (ab4381b3-95eb-473a-866b-e1dc6b653b84,"VPN connection 1")
Dec 20 01:10:04 square.herald NetworkManager[878]: <info>  [1482167404.9162] vpn-connection[0x563c79680140,ab4381b3-95eb-473a-866b-e1dc6b653b84,"VPN connection 1",0]: VPN connection: (ConnectInteractive) reply received
Dec 20 01:10:04 square.herald NetworkManager[878]: <info>  [1482167404.9207] vpn-connection[0x563c79680140,ab4381b3-95eb-473a-866b-e1dc6b653b84,"VPN connection 1",0]: VPN plugin: state changed: starting (3)
Dec 20 01:10:05 square.herald NetworkManager[878]: INFO:   Connected to gateway.
Dec 20 01:10:05 square.herald NetworkManager[878]: INFO:   Authenticated.
Dec 20 01:10:05 square.herald NetworkManager[878]: INFO:   Remote gateway has allocated a VPN.
Dec 20 01:10:05 square.herald pppd[2316]: Plugin /usr/lib64/pppd/2.4.7/nm-fortisslvpn-pppd-plugin.so loaded.
Dec 20 01:10:05 square.herald kernel: PPP generic driver version 2.4.2
Dec 20 01:10:05 square.herald pppd[2316]: pppd 2.4.7 started by root, uid 0
Dec 20 01:10:05 square.herald pppd[2316]: Using interface ppp0
Dec 20 01:10:05 square.herald pppd[2316]: Connect: ppp0 <--> /dev/pts/1
Dec 20 01:10:05 square.herald NetworkManager[878]: <info>  [1482167405.5100] manager: (ppp0): new Generic device (/org/freedesktop/NetworkManager/Devices/2)
Dec 20 01:11:05 square.herald NetworkManager[878]: <warn>  [1482167465.6010] vpn-connection[0x563c79680140,ab4381b3-95eb-473a-866b-e1dc6b653b84,"VPN connection 1",0]: VPN connection: connect timeout exceeded.
Dec 20 01:11:05 square.herald nm-fortisslvpn-[2298]: Connect timer expired, disconnecting.
Dec 20 01:11:05 square.herald pppd[2316]: Hangup (SIGHUP)
Dec 20 01:11:05 square.herald pppd[2316]: Modem hangup
Dec 20 01:11:05 square.herald pppd[2316]: Connection terminated.
Dec 20 01:11:05 square.herald pppd[2316]: Exit.
Dec 20 01:11:05 square.herald NetworkManager[878]: <warn>  [1482167465.6165] vpn-connection[0x563c79680140,ab4381b3-95eb-473a-866b-e1dc6b653b84,"VPN connection 1",0]: VPN plugin: failed: connect-failed (1)
Dec 20 01:11:05 square.herald NetworkManager[878]: <info>  [1482167465.6166] vpn-connection[0x563c79680140,ab4381b3-95eb-473a-866b-e1dc6b653b84,"VPN connection 1",0]: VPN plugin: state changed: stopping (5)
Dec 20 01:11:05 square.herald NetworkManager[878]: <info>  [1482167465.6166] vpn-connection[0x563c79680140,ab4381b3-95eb-473a-866b-e1dc6b653b84,"VPN connection 1",0]: VPN plugin: state changed: stopped (6)
```

----------------------------

```
# nmcli c show 'VPN connection 1'

connection.id:                          VPN connection 1
connection.uuid:                        ab4381b3-95eb-473a-866b-e1dc6b653b84
connection.stable-id:                   --
connection.interface-name:              --
connection.type:                        vpn
connection.autoconnect:                 no
connection.autoconnect-priority:        0
connection.timestamp:                   0
connection.read-only:                   no
connection.permissions:                 
connection.zone:                        --
connection.master:                      --
connection.slave-type:                  --
connection.autoconnect-slaves:          -1 (default)
connection.secondaries:                 
connection.gateway-ping-timeout:        0
connection.metered:                     unknown
connection.lldp:                        -1 (default)
ipv4.method:                            auto
ipv4.dns:                               
ipv4.dns-search:                        
ipv4.dns-options:                       (default)
ipv4.dns-priority:                      0
ipv4.addresses:                         
ipv4.gateway:                           --
ipv4.routes:                            
ipv4.route-metric:                      -1
ipv4.ignore-auto-routes:                no
ipv4.ignore-auto-dns:                   no
ipv4.dhcp-client-id:                    --
ipv4.dhcp-timeout:                      0
ipv4.dhcp-send-hostname:                yes
ipv4.dhcp-hostname:                     --
ipv4.dhcp-fqdn:                         --
ipv4.never-default:                     no
ipv4.may-fail:                          yes
ipv4.dad-timeout:                       -1 (default)
ipv6.method:                            auto
ipv6.dns:                               
ipv6.dns-search:                        
ipv6.dns-options:                       (default)
ipv6.dns-priority:                      0
ipv6.addresses:                         
ipv6.gateway:                           --
ipv6.routes:                            
ipv6.route-metric:                      -1
ipv6.ignore-auto-routes:                no
ipv6.ignore-auto-dns:                   no
ipv6.never-default:                     no
ipv6.may-fail:                          yes
ipv6.ip6-privacy:                       0 (disabled)
ipv6.addr-gen-mode:                     stable-privacy
ipv6.dhcp-send-hostname:                yes
ipv6.dhcp-hostname:                     --
ipv6.token:                             --
vpn.service-type:                       org.freedesktop.NetworkManager.fortisslvpn
vpn.user-name:                          --
vpn.data:                               password-flags = 2, trusted-cert = XXXXX user = martin, gateway = SERVERNAME.fortiddns.com:10443
vpn.secrets:                            <hidden>
vpn.persistent:                         no
vpn.timeout:                            0
GENERAL.NAME:                           VPN connection 1
GENERAL.UUID:                           ab4381b3-95eb-473a-866b-e1dc6b653b84
GENERAL.DEVICES:                        enp2s0
GENERAL.STATE:                          activating
GENERAL.DEFAULT:                        no
GENERAL.DEFAULT6:                       no
GENERAL.VPN:                            yes
GENERAL.ZONE:                           --
GENERAL.DBUS-PATH:                      /org/freedesktop/NetworkManager/ActiveConnection/1
GENERAL.CON-PATH:                       /org/freedesktop/NetworkManager/Settings/1
GENERAL.SPEC-OBJECT:                    /org/freedesktop/NetworkManager/ActiveConnection/0
GENERAL.MASTER-PATH:                    /org/freedesktop/NetworkManager/Devices/1
VPN.TYPE:                               fortisslvpn
VPN.USERNAME:                           --
VPN.GATEWAY:                            --
VPN.BANNER:                             --
VPN.VPN-STATE:                          3 - VPN connecting
VPN.CFG[1]:                             password-flags = 2
VPN.CFG[2]:                             trusted-cert = XXXXX
VPN.CFG[3]:                             user = martin
VPN.CFG[4]:                             gateway = SERVERNAME.fortiddns.com:10443
```
