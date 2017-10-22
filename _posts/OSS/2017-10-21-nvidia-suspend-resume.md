---
date: 2017-10-21
title: Nvidia suspend/resume
tagline: Quick fix
category: OSS
tags:
- fedora
- linux
- Nvidia
layout: post
published: true
---
{% include JB/setup %}

## Problem : Nvidia card doesn't wake up properly

Recently, I moved my GPU to my home office, where the machine is suspended overnight, rather
than being left on continuously.  But that also caused the Nvidia card to present a 
problem where it sometimes became unusable after the machine was suspended.

### Solution : Kill running GPU processes

Finally, I noticed that the problem didn't occur if there was nothing *at all* running
on the card during the suspend/resume cycle.

Look at the output of ```nvidia-smi``` :

{% highlight bash %}
Sat Oct 21 23:56:22 2017       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 384.90                 Driver Version: 384.90                    |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  GeForce GTX TIT...  Off  | 00000000:01:00.0 Off |                  N/A |
| 22%   37C    P8    15W / 250W |    442MiB / 12207MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID   Type   Process name                             Usage      |
|=============================================================================|
|    0     18307      C   /home/andrewsm/env3/bin/python3              431MiB |
+-----------------------------------------------------------------------------+
{% endhighlight %}

The card *isn't* doing any active computation.  However, simply running 
a ```Jupyter notebook``` that imports ```tensorflow``` or ```PyTorch``` is enough 
to create a process on the card, which causes the GPU to 'lose connection' after a 
resume.

So : Before suspending, stop not only the active GPU machine learning things, but
also things (like ```Jupyter```) that may be keeping the card occupied.
