---
layout: post
category: AI
title: TensorFlow Eager Mode
tagline: Just fiddling around
date: 2017-08-31
tags: [TensorFlow,Eager,PyTorch]
published: false
---
{% include JB/setup %}


## ```TensorFlow``` has an Eager mode in 'master'


### Run jupyter

{% highlight python %}
. env3/bin/activate  # env3 with TensorFlow master wheel installed
jupyter notebook --notebook-dir=.


import tensorflow.contrib.eager as tf

{% endhighlight %}

