---
comments: false
date: 2011-05-03 02:07:44+00:00
title: Update Ruby on Fedora 12
category: OSS
wordpress_id: 382
wp_parent: '0'
wp_slug: update-ruby-on-fedora-12
tags:
- compass
- fc12
- fedora
- ruby
- sass
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Fedora 12 maxes out it's Ruby version at 1.8.6.  Unfortunately, compass / sass requires 1.8.7.  The following steps creates a suitable RPM, and installs it :


{% highlight bash %}
bash
# cd ~
# wget http://mo.morsi.org/blog/files/ruby-1.8.7.249-1.fc11.src_.rpm
# yum install rpm-build
# yum install ncurses-devel gdbm-devel tcl-devel tk-devel libX11-devel  autoconf db4-devel byacc bison emacs compat-readline5-devel
# rpmbuild --rebuild ruby-1.8.7.249-1.fc11.src_.rpm 
# cd /root/rpmbuild/RPMS/i386/
# rpm -Uvh *

$ export RUBYLIB="/usr/lib/ruby/site_ruby/1.8/:/usr/lib/ruby/1.8/"
$ compass create XYZ

{% endhighlight %}
