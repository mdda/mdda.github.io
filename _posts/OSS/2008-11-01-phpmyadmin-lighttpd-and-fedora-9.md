---
comments: false
date: 2008-11-09 23:01:00+00:00
title: phpMyAdmin, lighttpd and Fedora 9
category: OSS
wordpress_id: 158
wp_parent: '0'
wp_slug: phpmyadmin-lighttpd-and-fedora-9
tags:
- fc9
- fedora
- lighttpd
- phpMyAdmin
layout: post
from_mdda_blog: true
---
{% include JB/setup %}



{% highlight bash %}
yum install mysql-server   lighttpd   php php-mysql   phpMyAdmin  

{% endhighlight %}
This puts the phpMyAdmin install in `/usr/share/phpMyAdmin`.  
  
Add a new configuration file called `/etc/lighttpd/lighttpd-phpMyAdmin.conf` :  

{% highlight bash %}
# server.bind = "phpmyadmin.example.com" # If there isn't a server.bind already  
  
# Ensure the modules we need are loaded in  
server.modules += ( "mod_cgi" )  
# server.modules += ( "mod_alias", "mod_cgi" )  
  
$HTTP["host"] == "phpmyadmin.example.com" {  
var.root    = "/usr/share/phpMyAdmin"  
server.document-root = var.root + "/"  
  
# This is regular (slow) straight CGI  
$HTTP["url"] =~ "^/" {  
#  alias.url += ( "/" => server.document-root )  
 cgi.assign = ( ".php" => "/usr/bin/php-cgi" )  
}  
}  

{% endhighlight %}
and include it into the standard  `/etc/lighttpd/lighttpd.conf` by appended :  

{% highlight bash %}
include "lighttpd-phpMyAdmin.conf"  

{% endhighlight %}
Finally, since the phpMyAdmin install expects Apache to be used as the web server, all of the session folders are permissioned for Apache.  If one 'chown's them, then 'yum update's will potentially break things in the future.  A more sensible solution is to add lighttpd to the apache group :  

{% highlight bash %}
/usr/sbin/usermod -a -G apache lighttpd  

{% endhighlight %}
Now, `/etc/init.d/lighttpd restart`, and then the phpMyAdmin webpage (with two frames) should be at : `http://phpmyadmin.example.com/`.  
  
Obviously, update 'example.com' for your own hostname.
