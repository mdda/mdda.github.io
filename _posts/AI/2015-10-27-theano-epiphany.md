---
date: 2015-10-27
title: A Small Theano Epiphany
tagline: (may help someone)
category: AI
tags:
- theano
- python
layout: post
published: false
---
{% include JB/setup %}

After having done quite a few successful projects with ```Theano``` (and 
layers on top like ```Lasagne``` and ```blocks```), I just had a minor
epiphany, which I thought I'd share.

Don't expect much : This is really Theano 101, except that I hadn't thought it
through before...


### Suppose I make a Theano function, what kind of variables do I pass in?

```Theano``` allows one to define a problem in ```numpy``` -like symbolic terms,
and then (when you call the function) execute the backend either in raw C/C++, 
or on the GPU (CUDA or, with luck, OpenCL).

Here's a quick example : 

{% highlight bash %}
a = tensor.dmatrix('a')
b = tensor.dmatrix('b')

# We first define the input of the function as :
X = [a, b]

# then the output :
Y = a + b

# Then we ask theano to compile the function f: X -> Y
f = function(X, Y)
{% endhighlight %}


{% highlight bash %}
{% endhighlight %}

