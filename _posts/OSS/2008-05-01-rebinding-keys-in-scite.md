---
comments: false
date: 2008-05-26 22:01:00+00:00
title: Rebinding Keys in SCiTE
category: OSS
wordpress_id: 143
wp_parent: '0'
wp_slug: rebinding-keys-in-scite
tags:
- key bindings
- scite
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


On XCFE, some of the default (windowing system) bindings override those of SciTE (notably the Bookmarking commands).  
  
Consult [http://scintilla.sourceforge.net/CommandValues.html] and add the following to `.SciTEUser.properties` :  
  

{% highlight bash %}
# Remap some keys -   
# Ctrl-e = to end of line  
#NOT-YET Ctrl-a = to start of line  
  
# Ctrl-2 = Next bookmark  
# Alt-2  = Toggle bookmark  
  
user.shortcuts=\  
Ctrl+e|2314|\  
Ctrl+2|IDM_BOOKMARK_NEXT|\  
Alt+2|IDM_BOOKMARK_TOGGLE|  
  
# Ctrl+a|2312|  
# Ctrl+a|Home|  

{% endhighlight %}
