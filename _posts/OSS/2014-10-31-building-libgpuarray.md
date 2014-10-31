---
comments: true
date: 2014-10-29
title: Install Official Radeon Catalyst drivers on Fedora FC20 (updated)
category: OSS
tags:
- AMD
- radeon
- HD5570
- fedora
- linux
- drivers
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

??
https://github.com/clMathLibraries/clBLAS
No RPM available...



git clone https://github.com/clMathLibraries/clBLAS.git
mkdir Build
cmake ../src


boost
boost_program_options

sudo yum install boost boost-devel boost-static
:-)


acml.h libacml

