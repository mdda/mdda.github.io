---
comments: false
date: 2007-01-04 18:47:00+00:00
title: Switch Desktop Code
category: OSS
wordpress_id: 111
wp_parent: '0'
wp_slug: switch-desktop-code
tags:
- fedora
layout: post
from_mdda_blog: true
---
{% include JB/setup %}



{% highlight bash %}
# yum install wmctrl  
# perl -MCPAN -e shell; install X11::WMCtrl  

{% endhighlight %}
Then use my 'LoadWS.pm' script to dynamically load and position sets of windows based upon the programming environment required...  
  

{% highlight bash %}
foreach my $id (keys %upd) {  
               my $win=$upd{$id};  
               print "$id -> $$win{title}\n";  
               if(exists $$ref{ws}) {  
                       system("wmctrl -i -r $id -t $$ref{ws}");  
               }  
       }  

{% endhighlight %}
