---
published: false
comments: true
date: 2014-06-17
title: Install OpenCL drivers for nvidia Optimus on Fedora FC20
category: OSS
tags:
- fedora
- linux
- opencl
- nvidia
- optimus
- fc20
layout: post
from_mdda_blog: true
---
{% include JB/setup %}

{% highlight bash %}
## But this is already in /usr/lib64/libOpenCL
## and much more in /usr/lib64/nvidia-bumblebee/

export LIBRARY_PATH=$LIBRARY_PATH:/usr/lib64/nvidia-bumblebee
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib64/nvidia-bumblebee
optirun ./print-devices
./cl-demo 1000000 10

## Says "Good" at the end...
CL_HELPER_PRINT_COMPILER_OUTPUT=1 ./cl-demo 1000000 10

## Maybe no need for cuda repo at all (TBD)
{% endhighlight %}

{% highlight bash %}
rmmod nvidia_uvm
rmmod nvidia
{% endhighlight %}

{% highlight bash %}
yum install http://developer.download.nvidia.com/compute/cuda/repos/fedora19/x86_64/cuda-repo-fedora19-6.0-37.x86_64.rpm
joe /etc/yum.repos.d/cuda.repo 
#disable it for now 
{% endhighlight %}
