---
comments: false
date: 2008-12-31 07:23:00+00:00
title: Secure Development Laptop
category: OSS
wordpress_id: 160
wp_parent: '0'
wp_slug: secure-development-laptop
tags:
- encfs
- fedora
- lighttpd
- sqlite
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


So that I could continue developing the 'Trading Account Management' system while on the road, the installation of lighttpd/database had to be secured.  In particular, sqlite had to be used rather than mysql, since the data in the database itself was critical to the business (and there was no time to conjure up 'fake data').

Using encfs to secure the ~/Fieldstone directory (as in the last post), I just want to point out how to make the Fieldstone directory accessible by the lighttpd server (without changing the user running lighttpd).

Into _/etc/fuse.conf_ put the following :

{% highlight bash %}
# Set the maximum number of FUSE mounts allowed to non-root users.
# The default is 1000.
#
#mount_max = 1000

# Allow non-root users to specify the 'allow_other' or 'allow_root'
# mount options.
#
user_allow_other
#user_allow_root

{% endhighlight %}

Then, start the encfs as follows :

{% highlight bash %}
#!/bin/bash
DIALOGTEXT="Enter the Fieldstone EncFS Password"`

encfs \
-o allow_other \
--extpass="zenity --title 'EncFS Password' --entry --hide-text --text '$DIALOGTEXT'" \
~/.Fieldstone.encfs/ ~/Fieldstone/

{% endhighlight %}

(this is the same code as in the previous post).

Importantly, above, is the line '-o allow_other'.

Then, finally, make sure the lighttpd user is a member of the user that mount the encfs directory (my user in 'eeedora') :

{% highlight bash %}
/usr/sbin/usermod -a -G eeedora lighttpd

{% endhighlight %}

And make sure that the full path to the required files/directories is accessible to the 'eeedora' group (and hence the lighttpd user).

