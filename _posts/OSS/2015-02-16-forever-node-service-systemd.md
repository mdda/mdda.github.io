---
date: 2015-02-16
title: Running node.js (or other) services under systemd
category: OSS
tags:
- fedora
- linux
- nodejs
- systemd
layout: post
published: true
---
{% include JB/setup %}

This is largely drawn from the [excellent Digital Ocean guide](https://www.digitalocean.com/community/tutorials/how-to-deploy-node-js-applications-using-systemd-and-nginx),
but with a little more detail around the ```systemd``` specifics.

Using this method, there's no longer any need for ```forever``` since ```systemd``` 
will do the restarting automatically.

### ```systemd``` setup

Put into (for example) ```/etc/systemd/system/node-webserver.service``` :

{% highlight bash %}
[Service]
ExecStart=[node binary] [main file.js]
## Example
#ExecStart=/usr/bin/node app.js
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=node-webserver
User=srv-node-sample
Group=srv-node-sample
## Could also be :
#User=nginx
#Group=nginx
Environment=NODE_ENV=production
WorkingDirectory=<FULL-PATH-TO-WORKING-DIRECTORY>

[Install]
WantedBy=multi-user.target
{% endhighlight %}


If you make changes to the .service file, you should to execute : 

{% highlight bash %}
systemctl daemon-reload
{% endhighlight %}


### ```systemd``` control

If everything is set up properly, the service can be controlled with  :

{% highlight bash %}
# Do these for simple testing
systemctl start node-webserver
systemctl status node-webserver
systemctl stop node-webserver

# and, for across-reboot operations :
systemctl enable node-webserver
systemctl disable node-webserver
{% endhighlight %}


### Other things to watch out for...

Also, remember to set permissions for the configured User/Group to access the 
```WorkingDirectory```.

Also, note that to make a webserver (```nginx```, say) talk to your  
backend server (```node```, say), SELINUX needs :

{% highlight bash %}
/usr/sbin/setsebool -P httpd_can_network_connect true 
{% endhighlight %}

where the '-P' option makes this work across reboots.
