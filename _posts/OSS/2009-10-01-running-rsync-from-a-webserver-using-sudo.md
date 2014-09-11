---
comments: false
date: 2009-10-21 14:51:00+00:00
title: Running rsync from a webserver (using sudo)
category: OSS
wordpress_id: 174
wp_parent: '0'
wp_slug: running-rsync-from-a-webserver-using-sudo
tags:
- fedora
- lighttpd
- linux
- rsync
- ssh
- sudo
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


### Situation


I want to have 'rsync' run when a user presses a button on the webserver.  The software stack is as follows (though this was largely a red-herring, see below) :



	
  * Fedora - server

	
  * lighttpd - webserver

	
  * Twiki - intranet setup

	
  * perl - plugin language for Twiki

	
  * bash - perl launches a script to run the rsync

	
  * sudo - to 'change user' to the one with the correct permissions for the source folder

	
  * rsync - the actual backup utility

	
  * ssh - file transfer mechanism, and auto-login (via its private key) to the remote server




### Solution


It turns out that it wasn't perl 'Taint' that was stopping the rsync from running...  Nor lighttpd, nor the 'user' for the 'ssh' embedded in the rsync command...

To cut a long story short, the final solution revolved around understanding the additional 'requiretty' constraints that Fedora (and maybe other distributions) has for sudo.


#### The perl command to run



{% highlight bash %}
push @res, map { "\n   * $_" } split("\n", `/home/webserver/.../rsync_R_drive.bash 2>&1`);

{% endhighlight %}


#### The bash script to run



{% highlight bash %}
#! /bin/bash

sudo -u admin \
  /usr/bin/rsync -av \
  -e "/usr/bin/ssh -i /home/admin/.ssh/id_dsa" \
  /home/somewhere/only/admin/can/access/* \
  remoteuser@remotemachine.com:~/target-directory/

{% endhighlight %}



#### Set up for the 'sudoers' file


Edit 'sudoers' file using this command :

{% highlight bash %}
EDITOR=joe; visudo

{% endhighlight %}
and add (to the /etc/sudoers file):

{% highlight bash %}
Defaults:lighttpd   !requiretty
lighttpd        ALL=(admin) NOPASSWD: /usr/bin/rsync

{% endhighlight %}


#### And enable password-less login by 'admin' on the remote server


On the local machine :


{% highlight bash %}
local$ ssh-keygen -t rsa
local$ ssh-copy-id remoteuser@remotemachine.com

{% endhighlight %}

