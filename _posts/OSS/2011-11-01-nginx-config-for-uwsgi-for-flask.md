---
comments: true
date: 2011-11-18 06:23:03+00:00
title: nginx configuration for uwsgi for Flask
category: OSS
wordpress_id: 485
wp_parent: '0'
wp_slug: nginx-config-for-uwsgi-for-flask
tags:
- fedora
- flask
- linux
- nginx
- uwsgi
- yum
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


/etc/nginx/conf.d/site.conf :


{% highlight bash %}
lua
server {
 server_name example.com www.example.com;
 root home/example/flask/static;
 
 location ~ ^/(img|js|css)/ {  # |pi||ext|theme
  root                    /home/example/flask/static;
  add_header              Cache-Control public;
  #expires                 30d;
  #access_log              off;
 }

 location / { try_files $uri @yourapplication; }

 location @yourapplication {
    include uwsgi_params;
    uwsgi_pass unix:/tmp/uwsgi_example.sock;
 }
}
{% endhighlight %}
This must be married with a uwsgi service started by a script in /etc/init.d/ :

{% highlight bash %}
bash
#!/bin/bash

# uwsgi - Use uwsgi to run python and wsgi web apps.
#
# chkconfig: - 85 15
# description: Use uwsgi to run python and wsgi web apps.
# processname: uwsgi

PATH=/opt/uwsgi:/sbin:/bin:/usr/sbin:/usr/bin
DAEMON=/usr/sbin/uwsgi

PYTHONENV=/usr

OWNER=uwsgi

NAME=uwsgi
DESC=uwsgi

test -x $DAEMON || exit 0

# Include uwsgi defaults if available
if [ -f /etc/sysconfig/uwsgi ] ; then
	. /etc/sysconfig/uwsgi
fi

set -e

get_pid() {
    if [ -f /var/run/$NAME.pid ]; then
        echo `cat /var/run/$NAME.pid`
    fi
}   

#DAEMON_OPTS="-s 127.0.0.1:9001 -M 4 -t 30 -A 4 -p 4 -d /var/log/uwsgi.log --pidfile /var/run/$NAME.pid --plugins python --pythonpath $PYTHONPATH --module $MODULE"

DAEMON_OPTS="-s /tmp/uwsgi_cohortion.sock -M 4 -t 30 -A 4 -p 4 -d /var/log/uwsgi.log --pidfile /var/run/$NAME.pid --plugins python --pythonpath $PYTHONPATH --module $MODULE --callable $CALLABLE -H $PYTHONENV"

case "$1" in
  start)
	echo -n "Starting $DESC: "
        PID=$(get_pid)
        if [ -z "$PID" ]; then
            [ -f /var/run/$NAME.pid ] && rm -f /var/run/$NAME.pid

            touch /var/run/$NAME.pid                                         
            chown $OWNER /var/run/$NAME.pid
	    su - $OWNER -pc "$DAEMON $DAEMON_OPTS"
	    echo "$NAME."
        fi

	;;
  stop)
	echo -n "Stopping $DESC: "
        PID=$(get_pid)
        [ ! -z "$PID" ] && kill -s 3 $PID &> /dev/null
        if [ $? -gt 0 ]; then
            echo "was not running" 
            exit 1
        else 
	    echo "$NAME."
            rm -f /var/run/$NAME.pid &> /dev/null
        fi
	;;
  reload)
        echo "Reloading $NAME" 
        PID=$(get_pid)
        [ ! -z "$PID" ] && kill -s 1 $PID &> /dev/null
        if [ $? -gt 0 ]; then
            echo "was not running" 
            exit 1
        else 
	    echo "$NAME."
            rm -f /var/run/$NAME.pid &> /dev/null
        fi
	;;
  force-reload)
        echo "Reloading $NAME" 
        PID=$(get_pid)
        [ ! -z "$PID" ] && kill -s 15 $PID &> /dev/null
        if [ $? -gt 0 ]; then
            echo "was not running" 
            exit 1
        else 
	    echo "$NAME."
            rm -f /var/run/$NAME.pid &> /dev/null
        fi
        ;;
  restart)
        $0 stop
        sleep 2
        $0 start
	;;
  status)  
	killall -10 $DAEMON
	;;
      *)  
	    N=/etc/init.d/$NAME
	    echo "Usage: $N {start|stop|restart|reload|force-reload|status}" >&2
	    exit 1
	    ;;
esac
exit 0
{% endhighlight %}
And this has configuration information in /etc/sysconfig/uwsgi .  The following works for (i) a core flask file at /home/example/flask/example.py, and (ii) for a flask module (rather than a single file executable), /etc/sysconfig/uwsgi (for a flask module starting at /home/example/flask/example/__init__.py) :

{% highlight bash %}
ini
PYTHONPATH=/home/example/flask
MODULE=example
CALLABLE=app
PYTHONENV=/home/example/env
{% endhighlight %}
Note that (under /home/example/env) there's a python virtualenv created with :

{% highlight bash %}
bash
# As root :
yum install python-virtualenv

# As user :
cd ~
virtualenv env
{% endhighlight %}
Also note that there needs to be a python stub to actually declare the flask 'app' : 

CASE1 : there's a python file 'example.py' in /home/example/flask/example.py that defines the flask application 'app'.  This file can also define a __main__, so that it can be used as a dev-machine launcher too.  The standard flask minimal intro file will work fine : The body of the file defines 'app' which will be picked up by uwsgi (for production), or run via the " if __name__ == '__main__': " pattern for development.

CASE2 : there's a python file '__init__.py' in /home/example/flask/example/ that defines the flask application 'app'.  To make this setup function as a dev machine, you'll also need to create something that runs this setup locally.  The simplest seems to be to create 'run.py' (in the same directory from which the example module branches off) : 


{% highlight bash %}
python
from example import app

HOST = 'localhost'   # This restricts incoming calls to the local machine
HOST = '0.0.0.0'     # This allows incoming calls from outside the machine (Windows will ask for Firewall permission)
PORT = 7891          # Arbitrary port

app.run(host=HOST, port=PORT, debug=True, )
{% endhighlight %}
