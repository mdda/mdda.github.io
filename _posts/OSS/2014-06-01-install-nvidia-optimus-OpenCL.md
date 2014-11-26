---
published: true
comments: true
date: 2014-11-01
title: Install OpenCL drivers for Nvidia Optimus on Fedora FC20
category: OSS
tags:
- fedora
- linux
- opencl
- nvidia
- optimus
- fc20
layout: post
---
{% include JB/setup %}

After installing the proprietary Nvidia driver, we find the OpenCL stuff already mysteriously installed...

{% highlight bash %}
## There are now the required headers in /usr/lib64/libOpenCL
## and much more in /usr/lib64/nvidia-bumblebee/

optirun ./print-devices
./cl-demo 1000000 10

## Says "Good" at the end...
CL_HELPER_PRINT_COMPILER_OUTPUT=1 ./cl-demo 1000000 10

## Maybe no need for cuda repo at all (TBD)
{% endhighlight %}

### Running without optirun magic

Since ```optirun``` automagically pulls ```nvidia-bumblebee``` into the path, this isn't really required :

{% highlight bash %}
export LIBRARY_PATH=$LIBRARY_PATH:/usr/lib64/nvidia-bumblebee
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib64/nvidia-bumblebee
{% endhighlight %}


