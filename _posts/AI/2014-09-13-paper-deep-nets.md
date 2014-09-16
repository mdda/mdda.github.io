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

This write-up contains my first impressions of the paper :
[Do Deep Nets Really Need to be Deep?](http://arxiv.org/pdf/1312.6184.pdf)

> ### Abstract
> Currently, deep neural networks are the state of the art on problems such as speech
> recognition and computer vision. In this extended abstract, we show that shallow 
> feed-forward networks can learn the complex functions previously learned by
> deep nets and achieve accuracies previously only achievable with deep models.  Moreover, 
> in some cases the shallow neural nets can learn these deep functions
> using a total number of parameters similar to the original deep model. We evaluate our
> method on the TIMIT phoneme recognition task and are able to train
> shallow fully-connected nets that perform similarly to complex, well-engineered,
> deep convolutional architectures. Our success in training shallow neural nets to
> mimic deeper models suggests that there probably exist better algorithms for training shallow 
> feed-forward nets than those currently available.

### Question Marks 

The intuition is tempting : 
*  deep networks better for learning than shallow networks
*  deep networks are better at discovering useful features
*  (particularly since the shallow nets are taught to behave as intermediary layers, rather than just mimic the end result)
*  shallow networks may be more compressible?
*  1000->1 reduction (talked about, though not demonstrated)
*  what is advantage here of the shallow network?


### Simple model - Factorization

No doubt, the authors of the 
paper tried hard to optimise the number of weights that the single layer model used,
and are reporting the best outcome they found.

The benefit of the model being H*K factorizable at little cost in terms of fit (maybe a benefit in
terms of generalization) and a definite win in terms of fit per parameter.

### Training on the Test Data
Problem with training on test data : Not really valid (test data is still 'valid input')

### Deep Nets embed an implicit human model of data

Perhaps deep-convolutional network embeds a human-created regularisation on the 
form of the model that is difficult to capture with the same # of parameters 
in a single layer - but, when enhanced with more data (as is done in the paper,
where test data is allowed to be trained on), the model becomes well-specified 
enough to be learnable, and the given 'parameter budget'.

Isn't the larger model (which learns from the training set well) simply being 
used to generate more learning cases for the simple model?

