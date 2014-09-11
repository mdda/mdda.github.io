---
comments: false
date: 2010-11-05 23:31:22+00:00
title: SciTE setup for Pylons (reminder)
category: OSS
wordpress_id: 373
wp_parent: '0'
wp_slug: scite-pylons
tags:
- pylons
- python
- scite
- scss
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Another 'quickie'.  

Rather than update the central _/usr/share/scite/SciTEGlobal.properties_, just pull in the user's properties from SciTE's _Options-OpenUserOptionsFile_.

There, add the following : 

{% highlight bash %}
find.files=*.p*|*.js|*.[ch]*
if PLAT_GTK
 find.command=grep -R  --include '$(find.files)' --exclude '*.svn*' -i --line-number '$(find.what)' .

tabsize=1
indent.size=1
use.tabs=0

indent.size.*.py=4
# NB : tabsize becomes tab.size for filepatterns...
tab.size.*.py=4

lexer.html.mako=1

source.files=$(source.files);*.css;*.scss
filter.css=CSS (css scss)|*.css;*.scss|
lexer.*.css=css
lexer.*.scss=css

# Depending on how much you like monospace...
font.base=$(font.monospace)
font.small=$(font.monospace)
font.comment=$(font.monospace)

font.text=$(font.monospace)
font.text.comment=$(font.monospace)

font.embedded.base=$(font.monospace)
font.embedded.comment=$(font.monospace)

font.vbs=$(font.monospace)

# Turn word-wrap on (definitely a matter of taste...)
wrap=1
output.wrap=1
wrap.style=1

# Remap some keys - 
#
# Ctrl-e = to end of line
# Ctrl-` = Next bookmark
# Alt-`  = Toggle bookmark
#
# See : http://scintilla.sourceforge.net/CommandValues.html
user.shortcuts=\
Ctrl+e|2314|\
Ctrl+`|IDM_BOOKMARK_NEXT|\
Alt+`|IDM_BOOKMARK_TOGGLE|

{% endhighlight %}

