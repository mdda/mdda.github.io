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
published: true
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

The reason for this weirdness (according to [this](http://serverfault.com/questions/565107/when-does-postfix-use-ipv6-and-when-ipv4)) is
that if ```postfix``` is configured for IPV4 and IPV6, then it will attempt to contact the next server using a 'protocol at random'.
However, gmail accepts a mail from an IPV6 connection BEFORE verifying that the PTR records, etc match up.  Google then proceeds to 
bounce the email - even though if it had been contacted over IPV4 the mail would have been accepted.

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

postconf mynetworks
#mynetworks = 127.0.0.0/8 127.0.0.1/32 xx.yyy.zzz.xxx/32 [::1]/128 
#             [xxxx:yyy:1::aaaa:iiii]/128 [xxxx:yyy:1::bbbb:jjjj]/128 [xxxx:yyy:1::cccc:kkkk]/128

postconf smtp_address_preference
#smtp_address_preference = any
## NB:  This only differentiates between IPV4 and IPV6 
##      if inet_protocols allows it - which we disable above
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

postconf mynetworks
#mynetworks = 127.0.0.0/8 127.0.0.1/32 xx.yyy.zzz.xxx/32

{% endhighlight %}

