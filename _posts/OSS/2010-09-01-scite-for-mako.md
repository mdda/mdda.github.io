---
comments: false
date: 2010-09-05 19:15:11+00:00
title: Scite filter changes for mako files
category: OSS
wordpress_id: 351
wp_parent: '0'
wp_slug: scite-for-mako
tags:
- mako
- pylons
- python
- scite
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


_Just a quickie..._

To make SciTE work with mako files (which are template files used by the mako templating system included with Pylons), just add the following :

In _/usr/share/scite/SciTEGlobal.properties_ (on a Fedora machine at least, YMMV) :

{% highlight bash %}
lexer.html.mako=1

{% endhighlight %}

