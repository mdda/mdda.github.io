---
layout: post
category: AI
title: Batch Normalization - Accelerating Deep Network Training by Reducing Internal Covariate Shift
tagline: Paper Takeaway
date: 2015-02-14
tags: [NeuralNetworks,PaperTakeaway]
published: true
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains a few takeaways that I had from the recent paper :
[Batch Normalization : Accelerating Deep Network Training by Reducing Internal Covariate Shift (Ioffe & Szegedy 2015)](http://arxiv.org/abs/1502.03167v1).

### Whitening and Factorization

The whitening (per batch) & rescaling (overall) is a neat new idea.  
But (as referred to in their p5 comment about the bias term being subsumed) 
this also points to the idea that the (Wu+b) transformation probably has 
a better-for-learning 'factorization', since their un-scale/re-scale operation 
on (Wu+b) is mainly taking out such a factor (while also putting in the 
minibatch accumulation change).

### Replacing Dropout ?

The idea that this could replace Dropout as the go-to trick for 
speeding up learning is pretty worrying (IMHO), 
since the gains from Dropout seem to be in a 'meta network' direction, 
rather than a data-dependency direction.  

Both approaches seem well worth understanding more thoroughly, 
even though the 'do what works' ML approach might favour leaving Dropout behind.

### Publication timing

The publication of this paper, so closely behind the new ReLu+ results 
from Microsoft, seems too coincidental.  
One has to wonder what other results each of the companies has in their 
back-pockets so that they can repeatedly steal the crown from each other.


### Results for Large Models

For me, the application to MNIST is attention-grabbing enough.  

While I appreciate that playing with Inception (etc) sexes-up the paper a lot, 
it raises the hurdle for others who may not have that quantity of hardware 
to contribute to the (more interesting) project of improving the 
learning rates of all projects (which is quite possible to do on the MNIST dataset, 
except that it's pretty much 'solved' with the error cases 
being pretty questionable for humans too).
