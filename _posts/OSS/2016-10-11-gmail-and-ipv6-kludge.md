---
date: 2016-10-11
title: gmail and IPV6 kludge
category: OSS
tags:
- ipv6
- fedora
- webmin
- postfix
layout: post
published: false
---
{% include JB/setup %}

For *far too long* I've been hearing about random bounces on my email addresses (all of which are routed by postfix to my gmail account).
The bounce messages contain something like :

{% highlight txt %}
Our system has detected that this message does
not meet IPv6 sending guidelines regarding PTR records and
authentication. Please review
    https://support.google.com/mail/?p=ipv6_authentication_error 
for more information
{% endhighlight %}

Rather than fiddle around with IPV6 PTR records (which relies on every element on the chain behaving flawlessly, some of which are not controlled by me),
the simplest thing to do is to change my (targetted) relay ```postfix``` server to claim to be only IPV4-enabled.

### Update via Webmin

I could not find the setting that adjusts ```inet_protocols``` in the interface directly, so had to 
edit the configuration file ```/etc/postfix/main.cf``` via the ```Edit Config Files``` icon on the Postfix main Webmin page.

Inside the file, find the line :

{% highlight txt %}
inet_protocols = all
{% endhighlight %}

and change it to :

{% highlight txt %}
inet_protocols = ipv4
{% endhighlight %}

### Restart Postfix

Even though Webmin has updated the config file, the server doesn't restart automatically to accept the new setting.

To see this in action, first have a look at the protocols that ```postfix``` is claiming (where ```::``` is standing for IPV6 addresses):

{% highlight bash %}
ss -lp | grep smtp
#tcp    LISTEN     0      0                    *:smtp                  *:*        users:(("master",pid=986,fd=13))
#tcp    LISTEN     0      0                   :::smtp                 :::*        users:(("master",pid=986,fd=14))
#tcp    LISTEN     0      0                    *:smtp                  *:*        users:(("master",pid=986,fd=13))
#tcp    LISTEN     0      0                   :::smtp                 :::*        users:(("master",pid=986,fd=14))
{% endhighlight %}

Then restart ```postfix``` :

{% highlight bash %}
service postfix restart
# or : systemctl restart postfix
{% endhighlight %}

Afterwards, only the IPV4 addresses are claimed :

{% highlight bash %}
ss -lp | grep smtp
#tcp    LISTEN     0      0                    *:smtp                  *:*        users:(("master",pid=21689,fd=13))
#tcp    LISTEN     0      0                    *:smtp                  *:*        users:(("master",pid=21689,fd=13))
{% endhighlight %}

