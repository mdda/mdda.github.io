---
date: 2015-09-16
title: Skype on Fedora 22 with Nvidia GPU
category: OSS
tags:
- fedora
- linux
- fc22
- Skype
- Nvidia
layout: post
published: true
---
{% include JB/setup %}

On a recently purchased machine with Fedora 22 and an Nvidia GPU installed, 
following the [excellent instructions](http://www.if-not-true-then-false.com/2012/install-skype-on-fedora-centos-red-hat-rhel-scientific-linux-sl/comment-page-19/)
didn't result in a working Skype installation (results in a segmentation fault on the command line).

The clues provided [here](http://askubuntu.com/questions/285642/skype-crashes-with-a-segmentation-fault) lead to this solution:

{% highlight bash %}
cd /usr/bin/
mv skype skype-bin
install -b -m 744 <(<<EOF
#!/bin/bash
LD_PRELOAD=/usr/lib/libGL.so.1.2.0 /usr/bin/skype-bin
EOF) /usr/bin/skype
{% endhighlight %}

Should now work...

The reason for the problem are rooted in Nvidia redirecting ```libGL.so``` loading to their own library.
However, the Nvidia card is for GPU usage only - no monitor will ever be connected to it (my
sole monitor is connected to the motherboard-integrated Intel video, wanting to keep the 
GPU free for GPGPU usage).
