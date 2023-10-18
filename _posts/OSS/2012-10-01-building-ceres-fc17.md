---
comments: true
date: 2012-10-11 05:18:55+00:00
title: Building ceres-solver on Fedora 17
category: OSS
wordpress_id: 550
wp_parent: '0'
wp_slug: building-ceres-fc17
tags:
- fedora
- yum
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Simple first step :

{% highlight bash %}
yum install gflags-devel

{% endhighlight %}

The Fedora rpm package for 'glog' is older than required (i.e. it is &lt;3.1), so it has to be built manually.  So, as a precursor to the main build, one requires :


{% highlight bash %}
wget http://google-glog.googlecode.com/files/glog-0.3.2.tar.gz
tar -xzf glog-0.3.2.tar.gz
cd glog-0.3.2
./configure --with-gflags=/usr/
make
sudo make install
# This puts it in /usr/local/ by default
{% endhighlight %}

Now pull in all the other required packages :

{% highlight bash %}
yum install eigen3-devel suitesparse-devel blas-devel lapack-devel protobuf-devel
{% endhighlight %}

and then follow the instructions in the PDF (or the steps below...) :

{% highlight bash %}
git clone https://ceres-solver.googlesource.com/ceres-solver
cd ceres-solver
mkdir release
cd release
cmake -DGLOG_LIB=/usr/local/lib/libglog.so ..
make
make test
{% endhighlight %}

FWIW, all the tests pass quickly (&lt;0.1sec) apart from "schur_eliminator_test" (60sec) and "system_test" (300sec).

