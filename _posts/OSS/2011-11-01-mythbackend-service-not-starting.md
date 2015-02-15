---
comments: true
date: 2011-11-25 05:04:41+00:00
title: MythBackend service not starting
category: OSS
wordpress_id: 506
wp_parent: '0'
wp_slug: mythbackend-service-not-starting
tags:
- fc16
- fedora
- linux
- mythtv
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


/var/log/messages complains :


{% highlight bash %}
bash
Nov 24 23:52:54 myth systemd[1]: mythbackend.service: control process exited, code=exited status=235
Nov 24 23:52:54 myth systemd[1]: Unit mythbackend.service entered failed state.
{% endhighlight %}
Simple solution (not tested whether this survives reboot) :


{% highlight bash %}
bash
# touch /var/run/mythbackend.pid; chown mythtv:mythtv /var/run/mythbackend.pid
# systemctl start mythbackend.service
# grep mythbackend
{% endhighlight %}
