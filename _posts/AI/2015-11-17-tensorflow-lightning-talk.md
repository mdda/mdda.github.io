---
date: 2015-11-17
title: TensorFlow Lightning Talk
tagline: PyData SG
category: AI
tags:
- tensorflow
- python
layout: post
published: false
---
{% include JB/setup %}

Google just released a fantastic-looking deep learning library called [```TensorFlow```](http://www.tensorflow.org/), 
complete with tutorials, and model-zoo-like examples.

Fortunately, the framework is very reminiscent of ```Theano```, and has a Python front-end over
a computation graph construction machine in C++ / CUDA (no OpenCL as far as I can tell).

Positives:

*  TensorBoard (images?)

*  Cross-platform

*  Hiring tool

*  Open Source (Apache 2)
   +   and Google actively reviews and responds to PRs


There are several points worth highlighting:

*  No OpenCL

*  Nvidia devices supported much have 'Compute Capability' >= 3.5
   +   This includes 900-series cards, and Titan, and the 'K cards'
   +   But not 700-series (apart from 750), nor Amazon EC GPUs
  
*  Memory hungry - far prefers a 16Gb machine to an 8Gb one

*  Inefficient operations
   +   No in-place ReLU, for instance

*  Not many ops available in GPU
   +   Vector embedding example can't be run on GPU, for instance
       -   Theano can do this

*  C++ build environment requires ```bazel``` which is a Java-based horror story

*  Legacy Nvidia drivers : 
   +  7.0 (rather than 7.5) for the main driver
   +  6.5 (rather than 7.0+) for ```cuDNN```, which is now 'archive', so not even supported




{% highlight bash %}
{% endhighlight %}

