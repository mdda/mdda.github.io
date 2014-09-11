---
comments: false
date: 2010-11-05 17:18:14+00:00
title: Laptop Data Security
category: OSS
wordpress_id: 360
wp_parent: '0'
wp_slug: laptop-data-security
tags:
- encfs
- fedora
- linux
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


This should be a no-brainer for anyone carrying anything important around on a laptop.  

IMHO, relying on a user password (like a login password) is not a great idea, since anyone with physical access to the disk can get to your data easily.  OTOH, using disk encryption seems like overkill - since if you want to hand your laptop to someone for a little web browsing, you shouldn't have to reveal all the 'secrets' to do so.

EncFS (available on Linux) is a great way to secure files - and has the advantage (over using a  Truecrypt volume, for instance) that the files are stored as files on a regular - meaning : 



	
  * 
that the secure files can be backed up using rsync (i.e. the whole volume image doesn't need to be backed up - although I recognize that Truecrypt backs up fairly cleanly)

	
  * 
the diskspace allocated to the secure files doesn't have to be guessed ahead of time : the secure files simply take the disk space necessary 



Packages required (and a fix-up):

{% highlight bash %}
yum install fuse-encfs
echo "user_allow_other" > /etc/fuse.conf

{% endhighlight %}

The fix-up above is required so that other users are able to read the 'plain' files (useful if you're running a webserver serving files within the plain files, where the webserver is running as a non-user).

To set up encrypted folders, simply create two directories (under _~_, for simplicity) the hidden one being the secret files encrypted, the plain one being created on-demand when the password is Ok.  Use the following command (standard usage is a 'blank line' for the options, and a fairly non-intuitive password) :

{% highlight bash %}
encfs ~/.Secure ~/Secure

{% endhighlight %}

To make it easy to use, the following 'mount' script can be saved to ~/Desktop/S-mount :

{% highlight bash %}
#!/bin/bash
DIALOGTEXT="Enter the Secure EncFS Password"

if [ -e ~/Secure/.exists ]; then
 zenity --error --text='EncFS directory is already mounted'
 exit
fi

encfs \
 -o allow_other \
 --extpass="zenity --title 'EncFS Password' --entry --hide-text --text '$DIALOGTEXT'" \
 ~/.Secure/ ~/Secure/

if [ -e ~/Secure/.exists ]; then
 A='A' # Do nothing
 zenity --info --text='Directory Mounted'
else
 zenity --error --text='Incorrect password'
fi

{% endhighlight %}

And the following 'un-mount' script can be saved to ~/Desktop/S-umount :

{% highlight bash %}
#!/bin/bash

if [ -e ~/Secure/.exists ]; then
 fusermount -u ~/Secure
 zenity --info --text='EncFS directory un-mounted successfully'
else
 zenity --error --text='EncFS directory not mounted'
fi

{% endhighlight %}

PS:  There's an attractive alternative to this 'cryptkeeper', which is a tray-icon system that can manage encfs volumes.  I tried it, and preferred to do it 'long hand'.  But then I'm also trying to get things consistent across several different machines...  YMMV. 

