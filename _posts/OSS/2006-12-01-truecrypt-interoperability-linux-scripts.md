---
comments: false
date: 2006-12-31 20:56:00+00:00
title: 'TrueCrypt interoperability : Linux scripts'
category: OSS
wordpress_id: 109
wp_parent: '0'
wp_slug: truecrypt-interoperability-linux-scripts
tags:
- truecrypt
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Added scripts for Linux so that the CLI options were automatically correctly chosen.  The GUI on WinXP is nice, but become repetitive after a while.  
  
mount-fieldstone  :  

{% highlight bash %}
#! /bin/bash  
truecrypt --user-mount /media/1GB/Fieldstone.truecrypt /media/Fieldstone  

{% endhighlight %}
umount-all  :  

{% highlight bash %}
#! /bin/bash  
truecrypt --dismount  

{% endhighlight %}
Also, so that normal users can mount and dismount truecrypt drives :  

{% highlight bash %}
# chmod u+s /usr/bin/truecrypt  

{% endhighlight %}
