---
comments: false
date: 2008-12-31 06:39:00+00:00
title: encfs password popup
category: OSS
wordpress_id: 159
wp_parent: '0'
wp_slug: encfs-password-popup
tags:
- encfs
- fedora
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Quick script for a laptop - to protect data (somehow this has never occurred to anyone the UK government employs...) :

{% highlight bash %}
#!/bin/bash
DIALOGTEXT="Enter the Fieldstone EncFS Password"

encfs \
-o allow_other \
--extpass="zenity --title 'EncFS Password' --entry --hide-text --text '$DIALOGTEXT'" \
~/.Fieldstone.encfs/ ~/Fieldstone/

{% endhighlight %}

This can be paired with an un-mounter :

{% highlight bash %}
#!/bin/bash
fusermount -u Fieldstone

{% endhighlight %}

