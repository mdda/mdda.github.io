---
comments: true
date: 2014-11-01
title: Building CLBLAS on Fedora
category: OSS
tags:
- fedora
- linux
- opencl
- fc20
- BLAS
layout: post
published: false
---
{% include JB/setup %}

{% highlight bash %}
yum install cmake
{% endhighlight %}

{% highlight bash %}

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

This is the [AMD Core Math library](http://en.wikipedia.org/wiki/AMD_Core_Math_Library), should be downloaded from [the (AMD) ACML download page](http://developer.amd.com/tools-and-sdks/cpu-development/amd-core-math-library-acml/acml-downloads-resources/).

acml.h libacml

{% highlight bash %}
sudo yum install 
{% endhighlight %}
