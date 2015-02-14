---
date: 2015-02-13
title: Gotcha - the .local domain is special
category: OSS
tags:
- fedora
- linux
- dns
layout: post
published: false
---
{% include JB/setup %}

Noticed some very strange behaviour when looking at webpages within a
new domain set up internally for a company project.

At first, it looked like the DNS was failing, ```ping``` came back with 
```ping : unknown host web.internal.local```.

However, ```dig host web.internal.local``` returned the correct result.  
Very strange.  

More strange was that the "Fedora Server" also on the same network 
was returning the correct results for both, and both had the same entries 
in ```/etc/resolv.conf```.

### Diagnosis

Have a look in the ```/etc/nsswitch.conf``` file, in order to 
see what the DNS resolution order is.

Failing desktop machine : 
{% highlight bash %}
grep hosts /etc/nsswitch.conf
#-> hosts:      files mdns4_minimal [NOTFOUND=return] dns myhostname
{% endhighlight %}

Working server machine : 
{% highlight bash %}
grep hosts /etc/nsswitch.conf
#-> hosts:      files dns myhostname
{% endhighlight %}

### Solution

Leads to the solution (helped by [this helpful post](http://askubuntu.com/questions/81797/nslookup-finds-ip-but-ping-doesnt)) :

{% highlight bash %}
yum remove nss-mdns
{% endhighlight %}

