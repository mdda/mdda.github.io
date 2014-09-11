---
comments: false
date: 2008-08-05 03:49:00+00:00
title: Fedora 9 and encfs Encryption
category: OSS
wordpress_id: 148
wp_parent: '0'
wp_slug: fedora-9-and-encfs-encryption
tags:
- encfs
- fc9
- fedora
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


To get this installed with 'useraccount' having the rights to use the `fuse` system, as root do :  

{% highlight bash %}
# yum install encfs  
# /usr/sbin/groupadd -r fuse  
# /usr/sbin/usermod -a -G fuse useraccount  
  
# Restart X11 - to get the groups right  

{% endhighlight %}
Now, as your regular user account ('useraccount' from above) :  

{% highlight bash %}
$ encfs ~/.Fieldstone-Secure.encfs ~/Fieldstone-Secure  
  
#   If file doesn't exist initially, this prompts for directory  
#   creation, encryption settings and password  
#   (hit enter for defaults, and chose a pw)  

{% endhighlight %}
### Regular use

  
Mount the encrypted files as a virtual directory system on the mount point :  

{% highlight bash %}
$ encfs ~/.Fieldstone-Secure.encfs ~/Fieldstone-Secure  
#   just prompts for pw  
  
# ... do stuff with 'data' appearing in ~/Fieldstone-Secure  

{% endhighlight %}
Once you're done altering the 'files' in the virtual directory :  

{% highlight bash %}
$ fusermount -u Fieldstone-Secure  

{% endhighlight %}
### Efficient backup idea ...

  
`encfs` has a `--reverse` option that creates a virtual directory of encrypted files (from a plain-text directory).  One can then `rsync` these (virtual) encrypted files over the internet.  The replicated backup will be fully encrypted (no need for SSH, and no need to worry who owns the server).
