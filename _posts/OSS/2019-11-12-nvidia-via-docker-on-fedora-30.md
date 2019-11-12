---
date: 2019-11-12
title: 'Nvidia through docker on Fedora 30'
category: OSS
tags:
- fedora
- linux
- Nvidia
- docker
layout: post
published: false
---
{% include JB/setup %}


## Now 


### Clean out previous installations

{% highlight bash %}
dnf remove xorg-x11-drv-nvidia  # 1Gb of stuff disappears
dnf remove cuda-repo-*

rm -rf /usr/local/cuda*
# And remove the reminants of any other blind-alleys you've previously gone down...
{% endhighlight %}


### Check that you've got a GPU

Running :

{% highlight bash %}
sudo lspci | grep -i NVIDIA
{% endhighlight %}

should result in a line that mentions your VGA adapter.






All done.

