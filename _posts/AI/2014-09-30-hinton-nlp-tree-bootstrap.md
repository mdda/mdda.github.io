---
layout: post
category: AI
title: Scalable Hierarchical Distributed Language Model - Mnih and Hinton 2009
tagline: Paper Takeaway
date: 2014-09-30
tags: [NeuralNetworks,NLP,WordEmbedding,PaperTakeaway]
published: false
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains my first impressions of the paper :
[A Scalable Hierarchical Distributed Language Model - (Mnih and Hinton 2009)](https://www.cs.toronto.edu/~amnih/papers/hlbl_final.pdf).

This used a two-stage tree construction method : stage 1 involved a random tree, so that some vector embedding could be performed, then stage 2 produced a tree based on the word vectors found in stage 1, and then produced the final word embeddings from there.  To note :

  * If words were allowed to appear multiple times in the tree, the training didn't seem to pick up multiple senses : The duplicate entries favoured rare words, in similar settings, rather than common, multi-sense words
  
  * The issues addressed in building trees (eg: how to reasonably divide up the samples at the node between left and right children) were those common in the tree recursive methods community - and it seemed like a less-than-in-depth treatment of an area that is actively researched
  
  * Generous attribution of other people's ideas, and a clear exposition of the reasoning behind each choice at each decision point
  
  * Hierarchical methods were plainly a computational win over the 'full-V' LBL model.  However, it seemed like the authors had to 'pull out all the stops' to get perplexity performance to beat the complexity-competitive KN5 model.
  
  * Also interesting, for using Restricted Boltzman Machines (though not explained here why they've "moved on", nor even mentioned, but to refer to previous benchmark results) : [Three new graphical models for statistical language modelling - (Mnih and Hinton 2007)](https://www.cs.toronto.edu/~amnih/papers/threenew.pdf)
  
  
### Ideas to Follow-Up

