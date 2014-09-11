---
comments: false
date: 2011-07-13 16:32:18+00:00
title: nginx and WSGI using Paste
category: OSS
wordpress_id: 389
wp_parent: '0'
wp_slug: nginx-and-wsgi-using-paste
tags:
- nginx
- paste
- pylons
- Pyramid
- python
- wsgi
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Paster contains the WSGI server originally incorporated within CherryPy (see http://pythonpaste.org/script/module-paste.script.wsgiserver.html).  Funnily enough, this is a pretty hot contender amongst other Python WSGI webservers (see http://nichol.as/benchmark-of-python-web-servers) : Maybe not the best, but because of its ease of set-up (working out-of-the-box for Pyramid and Pylons) it is extremely compelling.

Combining it with NGINX makes for a very easy-to-configure, fast and scalable set-up.  Here goes...

Paste reads its configuration from the .INI file : 

{% highlight bash %}
ini
[server:main]
host = /tmp/SITENAME-python.sock
use = egg:PasteScript#cherrypy
numthreads = 10
timeout = 180
request_queue_size = 200
{% endhighlight %}
And the following for nginx configuration (in /etc/nginx/conf.d/SITENAME.conf) :

{% highlight bash %}
lua
server {
 server_name SITENAME;
 root /static;
 
 location / {
  proxy_set_header        Host $host;
  proxy_set_header        X-Real-IP $remote_addr;
  proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header        X-Forwarded-Proto $scheme;

  client_max_body_size    10m;
  client_body_buffer_size 128k;
  
  proxy_connect_timeout   60s;
  proxy_send_timeout      90s;
  proxy_read_timeout      90s;
  proxy_buffering         off;
  proxy_temp_file_write_size 64k;
  proxy_redirect          off;
  
  proxy_pass http://unix:/tmp/SITENAME-python.sock;
 } 
 
 location ~ ^/(img|js|css|ext|theme)/ {
  root                    /home/USERNAME/static;
  add_header              Cache-Control public;
  #expires                 30d;
  #access_log              off;
 }
}
{% endhighlight %}
In order for the cherrypy server to serve WSGI over a UNIX socket file (rather than a UNIX port) the code needs a small modification (so that socket options aren't set on the ): 

{% highlight bash %}
python
#  ADD THE FOLLOWING TO PasteScript-1.7.3-py2.7.egg/paste/script/cherrypy_server.py
    # Under the line that reads : "bind_addr = (host, int(port))"
    if '/' in host:
        bind_addr = host

    # Under the block (including the lines within it) that reads : "if protocol_version:"
    if '/' in host:
        server.nodelay=False
{% endhighlight %}
As an alternative to the file socket thing, just use the following syntax in the .INI file : 

{% highlight bash %}
ini
host = 127.0.0.1
port = 6501
{% endhighlight %}
and the following in the nginx conf : 

{% highlight bash %}
lua
    proxy_pass 127.0.0.1:6501;
{% endhighlight %}
