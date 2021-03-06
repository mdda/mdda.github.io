---
layout: post
category: OSS
title: Keep CUDA version under control
tagline: For TensorFlow 1.5RC 
date: 2018-01-10
tags:
- fedora
- linux
- Nvidia
- TensorFlow
published: true
---
{% include JB/setup %}


## ```TensorFlow``` 1.5 RC supports ```CUDA``` 9.0 (not 9.1)

If you've just done a ```dnf update``` to get the kernel version that
has the fixes for Meltdown and Spectre, you may have inadvertently pulled
in CUDA 9.1 as well.  This isn't supported yet in ```TF-nightly-gpu``` unless you
install from source (which is *difficult* if using the Negativo CUDA repos).

This quick note explains how to downgrade to a supported CUDA version

### Check the ```CUDA``` version installed  

{% highlight bash %}
rpm -qa | grep cuda-devel
#cuda-devel-9.1.xxxx
{% endhighlight %}


### Find the ```CUDA``` versions installable

As ```root``` :
{% highlight bash %}
dnf repoquery cuda-devel
#cuda-devel-1:9.0.176-2.fc27.x86_64
#cuda-devel-1:9.1.85-1.fc27.x86_64
#cuda-devel-1:9.1.85-2.fc27.x86_64
{% endhighlight %}


### Downgrade to a 9.0 ```CUDA``` version

Using one of the versions listed above that is ```9.0.xxx```, as ```root``` :
{% highlight bash %}
dnf downgrade cuda-1:9.0.176-2.fc27.x86_64
{% endhighlight %}

This should downgrade all the dependencies too - making the system whole again.

All Done!
