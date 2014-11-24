---
published: false
comments: true
date: 2014-11-24
title: Install CUDA SDK for nvidia Optimus on Fedora FC20
category: OSS
tags:
- fedora
- linux
- cuda
- nvidia
- optimus
- fc20
layout: post
from_mdda_blog: true
---
{% include JB/setup %}

Surprisingly, the proprietary Nvidia driver doesn't bring in the compiling SDK (unlike the OpenCL stuff, which is apparently something Nvidia does, but doesn't like to speak about).



[Linux install document from Nvidia](http://developer.download.nvidia.com/compute/cuda/6_5/rel/docs/CUDA_Getting_Started_Linux.pdf)


# uninstall previous cuda-repo-fedoraXX rpms - Nvidia hasn't figured out Fedora numbering yet
yum localinstall <download-directory>/cuda-repo-fedora20-6.5-14.x86_64.rpm

BUT : Doesn't respect installed bumblebee, so need to install manually (without new nvidia card drivers from rpm directly) :

Download the ['Run' version rather than the 'RPM' one](https://developer.nvidia.com/cuda-downloads?sid=655255) :

# NB: It's large! ::  972,320,904 Nov 24 16:48 cuda_6.5.14_linux_64.run
cd <download-directory>
./cuda_6.5.14_linux_64.run



{% highlight bash %}
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
