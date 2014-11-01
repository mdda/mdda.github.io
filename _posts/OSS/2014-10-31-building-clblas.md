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

{% highlight bash %}
yum install cmake
{% endhighlight %}

{% highlight bash %}

NO NEED TO DO THIS : There are binaries available



??
https://github.com/clMathLibraries/clBLAS
No RPM available...


git clone https://github.com/clMathLibraries/clBLAS.git
mkdir Build
cmake ../src

## Requirement : Boost (and boost_program_options)

{% highlight bash %}
sudo yum install boost boost-devel boost-static
{% endhighlight %}

## Requirement : ACML

This is the [AMD Core Math library](http://en.wikipedia.org/wiki/AMD_Core_Math_Library), should be downloaded from [the (AMD) ACML download page](http://developer.amd.com/tools-and-sdks/cpu-development/amd-core-math-library-acml/acml-downloads-resources/) - though it's not at all clear which is the appropriate one...


acml.h libacml

{% highlight bash %}
sudo yum install 
{% endhighlight %}


https://github.com/clMathLibraries/clBLAS/releases/download/v2.2/clBLAS-2.2.0-Linux-x64.tar.gz

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

