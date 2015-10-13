---
date: 2015-10-13
title: Nvidia cudnn installation on Fedora 22
category: OSS
tags:
- fedora
- linux
- Nvidia
- cudnn
layout: post
published: false
---
{% include JB/setup %}

### Download the ```cuDNN`` archive




### Nvidia's missing instructions 

{% highlight bash %}
  707  tar --no-same-owner --owner=root --group=root -xzf cudnn-7.0-linux-x64-v3.0-prod.tgz --directory=/usr/local
  708  ls -l /usr/local/cuda-7.0/lib64/cud*
  709  ls -l /usr/local/cuda-7.0/lib64/libcu*
  710  ls -l /usr/local/cuda-7.0/lib64/libcud*
  711  ls -l /usr/local/cuda-7.0/lib64/
  712  ldconfig -vvvv
  713  ldconfig -vvvv | grep cud
{% endhighlight %}

