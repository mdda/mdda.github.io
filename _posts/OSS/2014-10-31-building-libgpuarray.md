---
date: 2014-11-02
title: Building libgpuarray on Fedora 20
category: OSS
tags:
- fedora
- linux
- opencl
- fc20
layout: post
published: false
---
{% include JB/setup %}

{% highlight bash %}
yum install cmake
{% endhighlight %}

{% highlight bash %}
git clone https://github.com/Theano/libgpuarray.git
cd libgpuarray
mkdir Build
cd Build
# you can pass -DCMAKE_INSTALL_PREFIX=/path/to/somewhere to install to an alternate location
cmake .. -DCMAKE_BUILD_TYPE=Release # or Debug if you are investigating a crash
make
sudo make install
cd ..
{% endhighlight %}

## DIFFERENT RESULTS ::
optirun cmake .. -DCMAKE_BUILD_TYPE=Release

Dependency : CLBLAS :: See ()
