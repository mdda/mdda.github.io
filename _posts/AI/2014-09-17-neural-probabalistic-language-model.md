---
layout: post
category: AI
title: Neural Probabilistic Language Model - Bengio 2003
tagline: Paper Takeaway
date: 2014-09-19
tags: [NeuralNetworks,NLP,WordEmbedding,PaperTakeaway]
published: false
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains a few takeaways that I had from the paper :
[A Neural Probabilistic Language Model](http://machinelearning.wustl.edu/mlpapers/paper_files/BengioDVJ03.pdf)

State-of-the-art results in 2003 involved trigrams and 'tricks'.

Paccanaro and Hinton 2000 had a less 'statistical' and more symbolically meaningful approach

Apparently, sloppy asychronous updates of the model work pretty well (not detrimental).

WordNet is human-curated synonym sets with definitions and usage examples.  BSD license, 12Mb compressed.  Also have semantic linkages between synonym sets.

Fight the curse of dimensionality with its own weapons : each training sentence informs the model about a combinatorial number of other sentences.

