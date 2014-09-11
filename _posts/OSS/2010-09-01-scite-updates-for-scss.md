---
comments: false
date: 2010-09-15 19:10:56+00:00
title: Scite filter changes for SCSS files
category: OSS
wordpress_id: 345
wp_parent: '0'
wp_slug: scite-updates-for-scss
tags:
- fedora
- scite
- scss
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


_Just a quickie..._

To make SciTE work with scss files (which are enhanced css files), just add the following information:

In _/usr/share/scite/SciTEGlobal.properties_ (on a Fedora machine at least, YMMV) :



	
  * _;*.scss_ to the end of _source.files=_


and in _/usr/share/scite/css.properties_ the top of the file should read :


{% highlight bash %}
filter.css=CSS (css scss)|*.css;*.scss|
lexer.*.css=css
lexer.*.scss=css

{% endhighlight %}
