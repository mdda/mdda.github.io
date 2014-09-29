---
layout: post
category: AI
title: Learning word embeddings efficiently with noise-contrastive estimation - Mnih 2013
tagline: Paper Takeaway
date: 2014-10-02
tags: [NeuralNetworks,NLP,WordEmbedding,PaperTakeaway]
published: false
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains my first impressions of the paper :
[Learning word embeddings efficiently with noise-contrastive estimation - (Mhih 2013)](https://www.cs.toronto.edu/~amnih/papers/wordreps.pdf)

Thinned out words, by rejecting any with <10 occurrences

For an earlier exposition of speeding up the embedded via contrastive estimation, see : [Quick training of probabilistic neural nets by importance sampling - (Bengio and Sen&eacute;cal 2003)](http://www.iro.umontreal.ca/~lisa/pointeurs/senecal_aistats2003.pdf)


### Ideas to Follow-Up

Multiple representations for different senses of words.


> Previous models                <br/>
> deconstructed step-by-step     <br />
> leave kernels of truth          


