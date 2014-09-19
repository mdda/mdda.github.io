---
layout: post
category: AI
title: Neural Probabilistic Language Model - Bengio 2003
tagline: Paper Takeaway
date: 2014-09-19
tags: [NeuralNetworks,PaperTakeaway]
published: false
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains my first impressions of the paper :
[A Neural Probabilistic Language Model](http://machinelearning.wustl.edu/mlpapers/paper_files/BengioDVJ03.pdf)

Convolution works with images, because we know that JPEG is an encoding that degrades with minimum impact for images when the encoding length is restricted.  i.e.  That kind of down-sampling results in low information loss.  (The same cannot be said for Run Length Encoding, for instance).

Amazingly, simple vector embedding works for natural language.  This flies in the face of linguistic evidence.  For instance, translations take account of the hierarchy of concepts, etc, in the text to create effective mappings between languages (which are likely to attempt to minimise description length, without losing information).  Surely there must be better embeddings available?  

It seems like the vector embedding is only a small, first step towards something more 'meaningful'.



