---
comments: false
date: 2007-01-27 05:11:00+00:00
title: Hydrogen on FC6
category: OSS
wordpress_id: 116
wp_parent: '0'
wp_slug: hydrogen-on-fc6
tags:
- fc6
- laptop
- music
layout: post
from_mdda_blog: true
---
{% include JB/setup %}



{% highlight bash %}
# yum install qt-devel  
# QTDIR=/usr/lib/qt-3.3; export QTDIR  
  
# yum install libsndfile-devel  
# yum install flac-devel  
# ./configure   
  
# make  

{% endhighlight %}
src/lib/xml/tinyxml.h:828: error: extra qualification ‘TiXmlDeclaration::’ on member ‘TiXmlDeclaration’  
  
Problem : GCC 4 is giving us problems with hydrogen-0.9.3   
  
  
Patch :  

{% highlight bash %}
# scite src/lib/xml/tinyxml.h &  
  
@@ -823,7 +823,7 @@  
 /// Construct.  
- TiXmlDeclaration::TiXmlDeclaration( const char * _version,  
+ TiXmlDeclaration( const char * _version,  

{% endhighlight %}
`make` now completes, but : `./hydrogen` gives a "stack smashing detected" error (during the splash screen)  
  
So : First fix ALSA (see other note) :  


#### ALSA Fix

  
.. a quick search of the atrpms mailing list gave a solution.  
  

{% highlight bash %}
cd /etc/alsa/pcm  
mv dsnoop.conf.rpmnew dsnoop.conf  
mv dmix.conf.rpmnew dmix.conf  

{% endhighlight %}
Now, `atsd` doesn't error immediately.  
Not sure about the system tests, though  
  


#### Back to hydrogen install

  
The do a `make install` as root - the user-land version has trouble dealing with the ALSA server, apparently.
