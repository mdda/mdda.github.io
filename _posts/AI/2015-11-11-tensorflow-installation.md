---
date: 2015-11-11
title: TensorFlow Installation
tagline: Pretty Smooth...
category: AI
tags:
- tensorflow
- python
- Nvidia
layout: post
published: true
---
{% include JB/setup %}

Google just released a fantastic-looking deep learning library called [```TensorFlow```](http://www.tensorflow.org/), 
complete with tutorials, and model-zoo-like examples.

Fortunately, the framework is very reminiscent of ```Theano```, and has a Python front-end over
a computation graph construction machine in C++ / CUDA (no OpenCL as far as I can tell).

These instructions are straight off Google's Installation page, but work-for-me : 

### Create a VirtualEnv

{% highlight bash %}
virtualenv  --system-site-packages ~/tensorflow
. ~/tensorflow/bin/activate
{% endhighlight %}


### CPU Version (11Mb download)

{% highlight bash %}
pip install --upgrade https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-0.5.0-cp27-none-linux_x86_64.whl
{% endhighlight %}


### GPU Version  (50Mb download)

(a 1 character difference...)

{% highlight bash %}
pip install --upgrade https://storage.googleapis.com/tensorflow/linux/gpu/tensorflow-0.5.0-cp27-none-linux_x86_64.whl
{% endhighlight %}


### Test it on MNIST

NB : This downloads about 13Mb of MNIST data files, if they're missing (likely on first run) :

{% highlight bash %}
python ~/tensorflow/lib/python2.7/site-packages/tensorflow/models/image/mnist/convolutional.py
{% endhighlight %}


#### GPU Issues : TensorFlow really wants ```cuDNN``` v6.5 (not v7.0)

If you get something like : 

{% highlight bash %}
...
I tensorflow/stream_executor/cuda/cuda_dnn.cc:1062] Unable to load cuDNN DSO.
...
{% endhighlight %}

... you haven't got ```cuDNN``` installed like ```TensorFlow``` expects.


*  Go to the [Nvidia cuDNN legacy library download site](https://developer.nvidia.com/rdp/cudnn-archive) and download the v6.5 library

Uncompress and copy the cudnn files into the toolkit directory.  Assuming the toolkit is installed in ```/usr/local/cuda```:

{% highlight bash %}
tar xvzf cudnn-6.5-linux-x64-v2.tgz
sudo cp cudnn-6.5-linux-x64-v2/cudnn.h /usr/local/cuda/include
sudo cp cudnn-6.5-linux-x64-v2/libcudnn* /usr/local/cuda/lib64
{% endhighlight %}

