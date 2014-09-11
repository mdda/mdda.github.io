---
comments: false
date: 2009-07-12 00:47:00+00:00
title: Scite user Properties
category: OSS
wordpress_id: 168
wp_parent: '0'
wp_slug: scite-user-properties
tags:
- scite
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Just my preferences for _ ~/.SciTEUser.properties _...  And (of course) I use ScitePM where possible :


{% highlight bash %}
find.files=*.p?|*.js|*.[ch]*
if PLAT_GTK
find.command=grep -R  --include '$(find.files)' --exclude '*.svn*' -i --line-number '$(find.what)' .

tabsize=1
indent.size=1
use.tabs=0

save.session=0

font.base=$(font.monospace)
font.small=$(font.monospace)
font.comment=$(font.monospace)
font.text=$(font.monospace)
font.text.comment=$(font.monospace)
font.embedded.base=$(font.monospace)
font.embedded.comment=$(font.monospace)
font.vbs=$(font.monospace)

position.tile=1
split.vertical=0

buffers=20

# Remap some keys -
# Ctrl-e = to end of line
#NO Ctrl-a = to startof line

# Ctrl-` = Next bookmark
# Alt-`  = Toggle bookmark

# See : http://scintilla.sourceforge.net/CommandValues.html
user.shortcuts=\
Ctrl+e|2314|\
Ctrl+`|IDM_BOOKMARK_NEXT|\
Alt+`|IDM_BOOKMARK_TOGGLE|


{% endhighlight %}
