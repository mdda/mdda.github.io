---
comments: false
date: 2011-10-18 04:56:11+00:00
title: Compiling nginx (with uwsgi) for Fedora 12
category: OSS
wordpress_id: 472
wp_parent: '0'
wp_slug: nginx-uwsgi-for-fedora-12
tags:
- fedora
- flask
- linux
- nginx
- python
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


In order to get access to uwsgi (useful for deploying python flask projects, for instance), one needs a version of nginx > 0.8 or so.  But Fedora 12 doesn't have such a modern version :  Here's how to compile it from source : 

**Actually, a less hacky approach is to simply back-port (trivially) a src.rpm from Fedora 16 : That's in a newer post/**

Have a look at : http://library.linode.com/web-servers/nginx/python-uwsgi/fedora-13


{% highlight bash %}
bash
yum groupinstall "Development Tools"
yum install zlib-devel wget openssl-devel pcre pcre-devel sudo
cd /opt/
wget http://nginx.org/download/nginx-1.0.0.tar.gz
tar -zxvf nginx-1.0.0.tar.gz
cd /opt/nginx-1.0.0/
./configure --prefix=/opt/nginx --user=nginx --group=nginx --with-http_ssl_module
make
make install

useradd -M -r --shell /bin/sh --home-dir /opt/nginx nginx
usermod -a -G lean nginx
{% endhighlight %}

But the ./configure reveals the following variables, that need to be fixed up in the initial call :


{% highlight bash %}
bash
  nginx path prefix: "/opt/nginx"
  nginx binary file: "/opt/nginx/sbin/nginx"
  nginx configuration prefix: "/etc/nginx"
  nginx configuration file: "/etc/nginx/nginx.conf"
  nginx pid file: "/opt/nginx/logs/nginx.pid"
  nginx error log file: "/var/log/nginx/error.log"
  nginx http access log file: "/var/log/nginx/access.log"
  nginx http client request body temporary files: "client_body_temp"
  nginx http proxy temporary files: "proxy_temp"
  nginx http fastcgi temporary files: "fastcgi_temp"
  nginx http uwsgi temporary files: "uwsgi_temp"
  nginx http scgi temporary files: "scgi_temp"
{% endhighlight %}


{% highlight bash %}
bash
./configure --prefix=/opt/nginx --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log  --user=nginx --group=nginx --with-http_ssl_module
{% endhighlight %}
Then, need to fix nginx and pidfile definitions in /etc/init.d/nginx (take it from packaged version)


{% highlight bash %}
bash
#nginx="/usr/sbin/nginx"
nginx="/opt/nginx/sbin/nginx"
prog=$(basename $nginx)

sysconfig="/etc/sysconfig/$prog"
lockfile="/var/lock/subsys/nginx"
#pidfile="/var/run/${prog}.pid"
pidfile="/opt/nginx/logs/${prog}.pid" 
{% endhighlight %}
