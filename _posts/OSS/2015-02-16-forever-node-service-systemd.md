---
date: 2015-02-16
title: Running a node (or other) service under systemd
category: OSS
tags:
- fedora
- linux
- nodejs
- systemd
layout: post
published: false
---
{% include JB/setup %}

https://www.digitalocean.com/community/tutorials/how-to-deploy-node-js-applications-using-systemd-and-nginx

No need for ```forever``` since ```systemd``` will do the restarting automatically.

Put into (for example) ```/etc/systemd/system/node-webserver.service``` :

{% highlight bash %}
[Service]
ExecStart=[node binary] [main file.js]
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=node-webserver
User=srv-node-sample
Group=srv-node-sample
Environment=NODE_ENV=production
WorkingDirectory=<FULL-PATH-TO-WORKING-DIRECTORY>/

[Install]
WantedBy=multi-user.target
{% endhighlight %}

Then control this new service with  :

{% highlight bash %}
systemctl start node-webserver
systemctl stop node-webserver
# and, for across-reboot operations :
systemctl enable node-webserver
systemctl disable node-webserver
{% endhighlight %}

If you make changes to the .service file, you may have to execute : 

{% highlight bash %}
systemctl daemon-reload
{% endhighlight %}

Also, remember to set permissions for the configured User/Group to access the 
WorkingDirectory.

Also, note that to make a webserver (```nginx```, say) talk to your  
backend server (```node```, say), SELINUX needs :

{% highlight bash %}
/usr/sbin/setsebool -P httpd_can_network_connect true 
{% endhighlight %}

where the '-P' option makes this work across reboots.

