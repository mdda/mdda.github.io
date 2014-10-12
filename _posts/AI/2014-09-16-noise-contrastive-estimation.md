---
layout: post
category: AI
title: Learning word embeddings efficiently with noise-contrastive estimation - Mnih 2013
tagline: Paper Takeaway
date: 2014-10-12
tags: [NeuralNetworks,NLP,WordEmbedding,PaperTakeaway]
published: true
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains my first impressions of the paper : 
[Learning word embeddings efficiently with noise-contrastive estimation - (Mnih 2013)](https://www.cs.toronto.edu/~amnih/papers/wordreps.pdf)

### Paper Background

Calculating word embeddings can be very computationally expensive, since 'true distributions' over the vocabulary take ```O(V))``` time, unless a tree embedding is used, in which case ```O(log(V))``` is possible.

Instead of going for the full distribution, however, a number of simplifying steps can be made :

*  Only ratios are required, so the (expensive) normalizing constants can be discarded

*  Full distributions can be approximated by taking samples : And this works really well.


### Surprising stuff

*  The major surprise here is that the method works so well

*  The NCE idea had already been explored in a slightly different context in : [Quick training of probabilistic neural nets by importance sampling - (Bengio and Sen&eacute;cal 2003)](http://www.iro.umontreal.ca/~lisa/pointeurs/senecal_aistats2003.pdf).

*  Although the NCE is claimed to be constant time, there is a twist.  The simple act of picking ```k``` weighted noise samples (each from a vocabulary of size ```V```) could easily be an ```O(log(V))``` operation.  One way around this is to pick words sequentially (or with a stride, etc), from the corpus itself (since that would have the right statistics, by construction).

*  Experimental detail : Thinned out words by rejecting any with <10 occurrences


### Ideas to Follow-Up

Multiple representations for different senses of words.

The basis of this work is analysed and recostructed within a more general setting in the [GloVe paper](/ai/2014/10/13/GloVe/) : Essentially the same thing can computed more generally, faster, and with OSS code


> Word embedding task         <br />
> Simplified stochastically   <br />
> Reveals true essence.     
