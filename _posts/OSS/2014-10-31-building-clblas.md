---
comments: true
date: 2014-11-01
title: Installing clBLAS on Fedora (including Bumblebee)
category: OSS
tags:
- fedora
- linux
- opencl
- fc20
- BLAS
- bumblebee
layout: post
published: false
---
{% include JB/setup %}

Initially, this was to be a post about building clBLAS.  However, that proved to be a bit of a trial-by-fire, particularly since it has the [AMD Core Math library](http://en.wikipedia.org/wiki/AMD_Core_Math_Library) as a requirement, and there are multiple different versions available on [the (AMD) ACML download page](http://developer.amd.com/tools-and-sdks/cpu-development/amd-core-math-library-acml/acml-downloads-resources/).  A big pity, since I like to 'do things by hand' in order to understand them...

Anyhow, even the binaries for clBLAS have some ins-and-outs, when installing - particularly since Bumblebee is envolved (since the GPU being used is an Nvidia mobile 750m).

## Getting the binary release

Go to the [clBLAS GitHub page](https://github.com/clMathLibraries/clBLAS), and hunt for the appropriate release - which in my case was the [64-bit Linux one](https://github.com/clMathLibraries/clBLAS/releases/download/v2.2/clBLAS-2.2.0-Linux-x64.tar.gz).

Download this into a suitable directory, and expand :

{% highlight bash %}
cd <dir>
wget https://github.com/clMathLibraries/clBLAS/releases/download/v2.2/clBLAS-2.2.0-Linux-x64.tar.gz
tar -xzf clBLAS-2.2.0-Linux-x64.tar.gz
cd clBLAS-2.2.0-Linux-x64
{% endhighlight %}



## Good idea, but not necessary once clBLAS installed correctly
cmake .. -DCMAKE_BUILD_TYPE=Release -DCLBLAS_LIBRARIES=../../clBLAS/Binaries/clBLAS-2.2.0-Linux-x64/lib64/ -DCLBLAS_INCLUDE_DIRS=../../clBLAS/Binaries/clBLAS-2.2.0-Linux-x64/include/

"-- Found clBLAS: "

Except get library directory messages...
""" Targets may link only to libraries.  CMake is dropping the item. """



## Better : Install the clBLAS in a system-wide location
NB: ```cmake``` requires ```optirun``` to find OpenCL libraries.

{% highlight bash %}
cd /home/andrewsm/sketchpad/kaggle/AES-SPC/env/clBLAS/Binaries/clBLAS-2.2.0-Linux-x64
cd lib64
cp -R * /usr/lib64/nvidia-bumblebee/
ls -l /usr/lib64/nvidia-bumblebee/
cd ../include
cp -R * /usr/include/
{% endhighlight %}

