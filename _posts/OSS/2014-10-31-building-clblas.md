---
comments: true
date: 2014-11-02
title: Installing clBLAS on Fedora (including Bumblebee)
category: OSS
tags:
- fedora
- linux
- opencl
- fc20
- BLAS
- clBLAS
- bumblebee
layout: post
published: true
---
{% include JB/setup %}

Initially, this was to be a post about building clBLAS.  However, that proved to be a bit of a trial-by-fire, particularly since it has the [AMD Core Math library](http://en.wikipedia.org/wiki/AMD_Core_Math_Library) as a requirement, and there are multiple different versions available on [the (AMD) ACML download page](http://developer.amd.com/tools-and-sdks/cpu-development/amd-core-math-library-acml/acml-downloads-resources/).  A big pity, since I like to 'do things by hand' in order to understand them...

Anyhow, even the binaries for clBLAS have some ins-and-outs, when installing - particularly since Bumblebee is envolved (since the GPU being used is an Nvidia mobile 750m).

### Getting the binary release

Go to the [clBLAS GitHub page](https://github.com/clMathLibraries/clBLAS), and hunt for the appropriate release - which in my case was the [64-bit Linux one](https://github.com/clMathLibraries/clBLAS/releases/download/v2.2/clBLAS-2.2.0-Linux-x64.tar.gz).

Download this into a suitable directory, and expand :

{% highlight bash %}
cd <dir>
wget https://github.com/clMathLibraries/clBLAS/releases/download/v2.2/clBLAS-2.2.0-Linux-x64.tar.gz
tar -xzf clBLAS-2.2.0-Linux-x64.tar.gz
cd clBLAS-2.2.0-Linux-x64
{% endhighlight %}

Now, there are two paths to take : Either install for the local user (which means you'll have to do something like the following for a build of (for instance) ```gpuarray``` :

{% highlight bash %}
cmake .. -DCMAKE_BUILD_TYPE=Release -DCLBLAS_LIBRARIES=../../clBLAS/Binaries/clBLAS-2.2.0-Linux-x64/lib64/ -DCLBLAS_INCLUDE_DIRS=../../clBLAS/Binaries/clBLAS-2.2.0-Linux-x64/include/
{% endhighlight %}

This will produce (good) messages such as : ```-- Found clBLAS:```.  However, things get a little trickier when it's trying to do a full link of libraries into libraries...

{% highlight bash %}
Targets may link only to libraries.  CMake is dropping the item.
{% endhighlight %}

This is an indication that further difficulties lie ahead going the local-install route...


### Install the clBLAS in a system-wide location

One quirk of the ```bumblebee``` system (used to switch on and off Nvidia GPUs on a laptop dynamically), is that GPU-specific paths are enabled/disabled as required.  Therefore, if the clBLAS libraries are installed in the ```/usr/lib64/nvidia-bumblebee``` as below, you will need to run ```cmake``` under ```optirun cmake ..``` when building other modules (like ```gpuarray```) that depend on them.  This may be tiresome, however it allows one to keep a consistent 'separation' between the GPU states...

Copying over the ```clBLAS``` binaries (do this as root) : 

{% highlight bash %}
cd <dir>/clBLAS-2.2.0-Linux-x64
cd lib64
cp -R * /usr/lib64/nvidia-bumblebee/
ls -l /usr/lib64/nvidia-bumblebee/
cd ../include
cp -R * /usr/include/
{% endhighlight %}

If you don't need ```bumblebee```-like functionality, then copying the libraryies into ```/usr/lib64/``` should work just fine.
