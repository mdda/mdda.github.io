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

These instructions are straight off Google's Installation page, but work-for-me : 


Uncompress and copy the cudnn files into the toolkit directory.  Assuming the toolkit is installed in ```/usr/local/cuda```:

{% highlight bash %}
tar xvzf cudnn-6.5-linux-x64-v2.tgz
sudo cp cudnn-6.5-linux-x64-v2/cudnn.h /usr/local/cuda/include
sudo cp cudnn-6.5-linux-x64-v2/libcudnn* /usr/local/cuda/lib64
{% endhighlight %}

