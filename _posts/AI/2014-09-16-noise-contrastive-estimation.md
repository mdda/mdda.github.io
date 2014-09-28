---
layout: post
category: AI
title: Learning word embeddings efficiently with noise-contrastive estimation - Mnih 2013
tagline: Paper Takeaway
date: 2014-09-30
tags: [NeuralNetworks,NLP,WordEmbedding,PaperTakeaway]
published: false
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains my first impressions of the paper :
[Learning word embeddings efficiently with noise-contrastive estimation - (Mhih 2013)](https://www.cs.toronto.edu/~amnih/papers/wordreps.pdf)

Thinned out words, by rejecting any with <10 occurrences

For an earlier exposition of speeding up the embedded via contrastive estimation, see : [Quick training of probabilistic neural nets by importance sampling - (Bengio and Sen&eacute;cal 2003)](http://www.iro.umontreal.ca/~lisa/pointeurs/senecal_aistats2003.pdf)

Also of interest :
[A Scalable Hierarchical Distributed Language Model - (Mnih and Hinton 2009)](https://www.cs.toronto.edu/~amnih/papers/hlbl_final.pdf)
This used a two-stage tree construction method : stage 1 involved a random tree, so that some vector embedding could be performed, then stage 2 produced a tree based on the word vectors found in stage 1, and then produced the final word embeddings from there.  To note :

  * If words were allowed to appear multiple times in the tree, the training didn't seem to pick up multiple senses : The duplicate entries favoured rare words, in similar settings, rather than common, multi-sense words
  
  * The issues addressed in building trees (eg: how to reasonably divide up the samples at the node between left and right children) were those common in the tree recursive methods community - and it seemed like a less-than-in-depth treatment of an area that is actively researched
  
  
  
  
   

### Ideas to Follow-Up

Multiple representations for different senses of words.


> Previous models                <br/>
> deconstructed step-by-step     <br />
> leave kernels of truth          


