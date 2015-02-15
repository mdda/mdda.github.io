---
comments: false
date: 2008-04-23 02:44:00+00:00
title: MythWeb with lighttpd for Fedora
category: OSS
wordpress_id: 142
wp_parent: '0'
wp_slug: mythweb-with-lighttpd-for-fedora
tags:
- fedora
- lighttpd
- mythtv
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Add a lighttpd configuration file in `/etc/lighttpd/conf.d/lighttpd-myth.conf`  (where my machine hostname is 'americas' on the local network) :  

{% highlight bash %}
#! /bin/bash # Just for SciTE language hint  
  
$HTTP["host"] == "myth.americas" {  
       var.root="/var/www/html/mythweb"  
       server.document-root = var.root  
  
       url.rewrite = (  
               "^(/tv.*|/music.*|/video.*|/weather.*|/settings.*|/status.*|/backend_log.*  
)$" =>   "/mythweb.php/$1",  
               "^/$"=>"/mythweb.php"  
       )  
  
       fastcgi.server         = ( ".php" => (  
               "myth.americas" => (  
                       "socket" => "/tmp/php-fastcgi.socket",  
                       "bin-path" => "/usr/bin/php-cgi",  
                       "broken-scriptfilename" => "enable",  
                       "bin-environment" => (  
                               "db_server" => "localhost",  
                               "db_name" => "mythconverg",  
                               "db_login" => "mythtv",  
                               "db_password" => "mythtv"  
                       )  
               )  
       ))  
}  

{% endhighlight %}
Fix up the permissions lighttpd user (so that the default expectation of being `apache` are met (if MythWeb claims "Cannot write to data directory" ) :  

{% highlight bash %}
# NOT THE BEST WAY : chown apache:lighttpd /var/www/html/mythweb/data/  
# MUCH BETTER  
/usr/sbin/usermod -G -a apache lighttpd  

{% endhighlight %}
And start the `lighttpd` with :  

{% highlight bash %}
/etc/init.d/lighttpd restart  

{% endhighlight %}
or webmin.
