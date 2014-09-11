---
comments: false
date: 2008-08-22 22:04:00+00:00
title: Reset MythTV music database
category: OSS
wordpress_id: 149
wp_parent: '0'
wp_slug: reset-mythtv-music-database
tags:
- music
- mysql
- MythTV
layout: post
from_mdda_blog: true
---
{% include JB/setup %}



{% highlight bash %}
mysql -u mythtv -p mythconverg  
  
delete from music_directories;  
delete from music_genres;  
delete from music_artists;  
delete from music_albums;  
delete from music_albumart;  
delete from music_songs;  
```  
  
and then reload all the music files by :  

```  
Utilities/Setup - Music Tools (which then rescans the files)  
{% endhighlight %}
