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
import theano

a = theano.tensor.scalar('a')
b = theano.tensor.scalar('b')

# Here's the symbolic bit
c = a + b

# Then we ask theano to compile the function f: (a,b) -> c
f = theano.function([a,b], c)
{% endhighlight %}

Now, this can be called with actual numbers :

{% highlight bash %}
result = f(1, 2)
{% endhighlight %}

And (assuming everything goes according to plan) ```result``` will get the value ```3``` (actually
```array(3.0)``` which is kind of a hint about what's to come).

But the key thing is that the symbolic bit is doing more magic than I realised...

The ```theano.function()``` line is creating and returning a new python function that 
takes in *numerical* parameters, and then puts them inside the symbolic containers 
(which have actually been manipulated into a calculation tree, 
but that much I understood).  And this new function (named ```f()``` here) also unwraps the answer
```result``` from the symbolic bit and returns it to the user.

The *epiphany* bit is that the user never interacts with the symbols themselves (so, for instance, 
you can't take a ```shape``` of a symbolic value and print it out directly).  The ```theano.function()```
line is like a curtain that separates the 'plain numbers' side with theano's backend 
symbolic manipulation.  Regular users can't look behind the window : The code that defines the 
calculation symbolically is for theano's consumption.  Your only access to it is through the 
function ```f()``` (which was delivered by Theano itself through the ```theano.function()``` call) 
that operates in the real world (i.e. on actual numbers, or ```numpy``` entities).

It took far too long for me to understand why the symbolic stuff was so un-debuggable...
