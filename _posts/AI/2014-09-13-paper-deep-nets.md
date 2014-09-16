---
layout: post
category: AI
title: Do Deep Nets Really Need to be Deep?
tagline: Paper Takeaway
date: 2014-09-13
tags: [NeuralNetworks,PaperTakeaway]
published: false
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains first impressions of the paper :
[Do Deep Nets Really Need to be Deep?](http://arxiv.org/pdf/1312.6184.pdf)

> ### Abstract
> Currently, deep neural networks are the state of the art on problems such as speech
> recognition and computer vision.  In this extended abstract, we show that shallow 
> feed-forward networks can learn the complex functions previously learned by
> deep nets and achieve accuracies previously only achievable with deep models.  Moreover, 
> in some cases the shallow neural nets can learn these deep functions
> using a total number of parameters similar to the original deep model.  We evaluate our
> method on the TIMIT phoneme recognition task and are able to train
> shallow fully-connected nets that perform similarly to complex, well-engineered,
> deep convolutional architectures.  Our success in training shallow neural nets to
> mimic deeper models suggests that there probably exist better algorithms for training shallow 
> feed-forward nets than those currently available.

### Question Marks 

The intuitions given in the <del>paper</del> extended abstract are tempting : 

  *  deep networks better for learning than shallow networks
  *  shallow networks don't actually need more parameters than deep ones
  *  shallow networks may be more compressible (?)
  
Part of the reasoning is :

  *  deep networks are better at discovering useful features
  *  shallow networks can be helped to learn from the pre-trained deep ones by training them on a processed pre-output layer of a trained deep network (rather than training them on the original labels, which they are known to have difficulty with)
  
There is talk of a 1000:1 reduction in parameters required to define the 
network, however it is not demonstrated.


### Simple model : Includes Factorization

No doubt, the authors of the 
paper tried hard to optimise the number of weights that the single layer 
model used, and are reporting the best outcome they found.

One of the key wins was showing that the 'O(H*D)' model could be 'O(k*(H+D))' factorizable, 
with a 'bottleneck linear layer' of size 'k'.  This factorization had little cost in 
terms of fit (maybe a benefit in terms of generalization) 
and a definite win in terms of fit per parameter.

_Isn't a bottleneck linear layer a bit like a convolution?_


### Simple model : Learning from pre-output stage

The intermediate layer that the shallow network is trained on is pre-processed : 
log(p) is used rather than just 'p'.  This is another interesting optimisation 
that is probably the result of experimentation (with an attractive post-hoc explanation).


### Idea : Deep Nets embed an implicit human model of data

Deep-convolutional networks implicitly embed a human-crafted regularisation on the 
form of the model that is difficult to capture with the same # of parameters 
in a single layer - but, when enhanced with more data, the model becomes well-specified 
enough to be learnable, for the given 'parameter budget'.

Can't the larger model (which learns from the training set well) simply be 
used to generate more learning cases for the simple model?


### Also interesting

Drop-out was 'critical' for deep net learning.  Not used for shallow net.

