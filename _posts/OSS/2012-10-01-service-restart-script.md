---
comments: true
date: 2012-10-26 04:24:04+00:00
title: Service restart script
category: OSS
wordpress_id: 559
wp_parent: '0'
wp_slug: service-restart-script
tags:
- fedora
- mysql
- nginx
- php
- uwsgi
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


For when just restarting everything is more expedient than figuring out what's really going on (i.e. don't do this) :


{% highlight bash %}
bash
# more services.web.restart
## This is an alternative to :
# run_count=`ps eax | grep ${process} | grep -v grep | wc -l`

if [ ! "$(pidof mysqld)" ]; then 
	service mysqld restart
fi

if [ ! "$(pidof php-cgi)" ]; then 
	service php-cgi restart
fi

if [ ! "$(pidof uwsgi)" ]; then 
	/etc/init.d/uwsgi stop
	/etc/init.d/uwsgi start
fi

if [ ! "$(pidof nginx)" ]; then 
	service nginx restart
fi
{% endhighlight %}
