---
layout: post
category: AI
title: Learning word embeddings efficiently with noise-contrastive estimation - Mnih 2013
tagline: Paper Takeaway
date: 2014-10-08
tags: [NeuralNetworks,NLP,WordEmbedding,PaperTakeaway]
published: false
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains my first impressions of the paper :
[Learning word embeddings efficiently with noise-contrastive estimation - (Mnih 2013)](https://www.cs.toronto.edu/~amnih/papers/wordreps.pdf)

Thinned out words, by rejecting any with <10 occurrences

For an earlier exposition of speeding up the embedded via contrastive estimation, see : [Quick training of probabilistic neural nets by importance sampling - (Bengio and Sen&eacute;cal 2003)](http://www.iro.umontreal.ca/~lisa/pointeurs/senecal_aistats2003.pdf)


Just a moment : Picking ```k``` weighted noise samples (each from a vocabulary of size ```V```) is an ```O(log(V))``` operation, isn't it?


### Ideas to Follow-Up

Multiple representations for different senses of words.


> Word embedding task        <br />
> Simplified beyond belief   <br />
> Reveals true essence.     
