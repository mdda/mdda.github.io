---
comments: false
date: 2006-12-31 01:10:00+00:00
title: 'Internal LAN and External ppp0 : webmin Firewall Routing'
category: OSS
wordpress_id: 101
wp_parent: '0'
wp_slug: internal-lan-and-external-ppp0-webmin-firewall-routing
tags:
- firewall
- router
- webmin
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


On "Networking - Linux Firewall" tab of webmin add the following :  
  
`Packet Filtering (filter) table` (drop-down box at top of page) :  
  
`Forwarded packets (FORWARD)` section :   
  
Rule #1:  
Comment : #Forward stuff from eth0  
Action: Accept  
if: incoming interface = eth0  
  
Rule #2:  
Comment : #default  
Action: Run Chain RH-Firewall-1-INPUT  
if: (always)  
  
  
`Network Address Translation (nat) table` (drop-down box at top of page) :  
  
`Packets after routing (POSTROUTING)` section :   
Rule #1 :  
Comment : #Masquerade to ppp0  
Action : Masquerade  
if: Outgoing interface = ppp0  
  


#### Setting up LAN machines

  
  
From then, the LAN can be set up with hard IP addresses in the 192.168.1.x range.  Default Gateway = address of SpeedHouse machine (192.168.1.254), netmask of 255.255.255.0  
  
Set the DNS address in /etc/resolv.conf on the LAN machines (connected to eth0) to the address(es) used by ppp0 (look for these in the /etc/resolv.conf on routing machine).  
  
  


#### Switch on Forwarding

  
Temporary switch-on of forwarding (for testing) :  

{% highlight bash %}
# echo 1 > /proc/sys/net/ipv4/ip_forward  

{% endhighlight %}
Permanent switch-on of forwarding, into the file `/etc/sysconfig/network` add the line :  

{% highlight bash %}
FORWARD_IPV4=true  

{% endhighlight %}
Another method is to alter the Linux kernel config file: `/etc/sysctl.conf`.  Set the following value:  

{% highlight bash %}
net.ipv4.ip_forward = 1  

{% endhighlight %}
