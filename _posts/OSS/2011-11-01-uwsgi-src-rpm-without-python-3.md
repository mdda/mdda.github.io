---
comments: true
date: 2011-11-16 06:39:27+00:00
title: Building uwsgi from src.rpm without Python 3
category: OSS
wordpress_id: 494
wp_parent: '0'
wp_slug: uwsgi-src-rpm-without-python-3
tags:
- fedora
- linux
- nginx
- python
- uwsgi
- yum
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


To build uwsgi on Fedora 12 (which has no easy-to-find python3 rpm), run through the rpmbuild process (shown in a previous post in more detail for nginx) and make the following changes :


{% highlight bash %}
bash
wget http://kad.fedorapeople.org/packages/uwsgi/uwsgi-0.9.9.2-2.fc15.src.rpm
rpm -ivh uwsgi-0.9.9.2-2.fc15.src.rpm 
rpmbuild -bb  ~/rpmbuild/SPECS/uwsgi.spec 
yum install python-devel libuuid-devel jansson-devel libyaml-devel ruby-devel python3-devel python-greenlet-devel  lua-devel  ruby 
# NB: python3-devel doesn't exist...

# Need to fix up the fedora configuration file :
joe ~/rpmbuild/SOURCES/fedora.ini 
# Take out the reference to python32
[uwsgi]
inherit = default
embedded_plugins = echo, ping, http
#plugins = rack, psgi, python, nagios, fastrouter, admin, python32, ruby19, cache, cgi, rpc, ugreen, greenlet, lua
plugins = rack, psgi, python, nagios, fastrouter, admin, ruby19, cache, cgi, rpc, ugreen, greenlet, lua

# Similarly, edit the spec file (), to take out the installation of the python3 files :
joe ~/rpmbuild/SPECS/uwsgi.spec 
# Take out the reference to python32
# %files -n %{name}-plugin-python3
# %{_libdir}/%{name}/python32_plugin.so

# Then, building should work...
rpmbuild -bb  ~/rpmbuild/SPECS/uwsgi.spec 

# Now install the relevant uwsgi rpms...
yum --nogpgcheck localinstall /root/rpmbuild/RPMS/i386/uwsgi-plugin-python-0.9.9.2-2.fc12.i386.rpm  /root/rpmbuild/RPMS/i386/uwsgi-plugin-common-0.9.9.2-2.fc12.i386.rpm  /root/rpmbuild/RPMS/i386/uwsgi-0.9.9.2-2.fc12.i386.rpm /root/rpmbuild/RPMS/i386/uwsgi-plugin-admin-0.9.9.2-2.fc12.i386.rpm

# You'll still need a /etc/init.d/uwsgi file.
# See the configuration file under the ngix / uwsgi / flask post for a sample
{% endhighlight %}
