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
published: true
---
{% include JB/setup %}

### Download the ```cuDNN``` archive

You'll need to have an Nvidia Developer account.


### Nvidia's missing instructions 

Assuming your CUDA installation is in ```/usr/local/cuda``` (which points to ```/usr/local/cuda-7.x```, 
which is the default way that Nvidia installs on Fedora, at least) :

{% highlight bash %}
# Wherever you downloaded the .tgz to :
tar --no-same-owner --owner=root --group=root -xzf cudnn-7.0-linux-x64-v3.0-prod.tgz --directory=/usr/local

# Check the new files arrived in the right place
ls -l /usr/local/cuda-7.0/lib64/libcudnn*

# Make sure your compilers find them
ldconfig -vvvv
{% endhighlight %}
