---
comments: true
date: 2011-11-14 05:05:33+00:00
title: Updating nginx (with uwsgi) for Fedora 12 from src.rpm
category: OSS
wordpress_id: 480
wp_parent: '0'
wp_slug: nginx-with-uwsgi-src-rpm
tags:
- fedora
- flask
- linux
- nginx
- python
- yum
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


In order to get access to uwsgi (useful for deploying python flask projects, for instance), one needs a version of nginx > 0.8 or so.  But Fedora 12 doesn't have such a modern version :  Here's how to build it from a src.rpm from a more recent Fedora release. 


{% highlight bash %}
bash
# First, make sure we have the rpm-build tools :
yum install rpm-build

# Download a suitable src.rpm (look at the dependencies : 
# nginx doesn't really care about which version of fedora it's for
wget ftp://ftp.muug.mb.ca/mirror/fedora/linux/development/rawhide/source/SRPMS/nginx-1.0.5-1.fc16.src.rpm

# This installs the source into ~/rpmbuild/BUILD/nginx-1.0.5/
rpm -ivh nginx-1.0.5-1.fc16.src.rpm

# Now, do a test build to see what we're missing
rpmbuild -bb  ~/rpmbuild/SPECS/nginx.spec 

# This complains about missing dependencies : Do a copy-paste as necessary
yum install pcre-devel zlib-devel openssl-devel 'perl(ExtUtils::Embed)' libxslt-devel GeoIP-devel gd-devel

# Rebuild again (installing more packages if this fails)
rpmbuild -bb  ~/rpmbuild/SPECS/nginx.spec 

# Now install nginx from the brand new rpm just created:
rpm -Uvh ~/rpmbuild/RPMS/i386/nginx-1.0.5-1.fc12.i386.rpm 

# Attempt a restart :
/etc/init.d/nginx restart

# ... some configuration options may have changed - and a new dummy.conf file was added ...
cd /etc/nginx/conf.d
mv default.conf default.conf.disable

# All good now...
/etc/init.d/nginx restart

{% endhighlight %}
