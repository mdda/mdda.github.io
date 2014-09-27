---
layout: post
category: AI
title: Neural Probabilistic Language Model - Bengio 2003
tagline: Paper Takeaway
date: 2014-09-28
tags: [NeuralNetworks,NLP,WordEmbedding,PaperTakeaway]
published: true
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains a few takeaways that I had from the paper :
[A Neural Probabilistic Language Model - Bengio et al 2003 ](http://machinelearning.wustl.edu/mlpapers/paper_files/BengioDVJ03.pdf)

### Paper Background

According to the paper, the state-of-the-art results in 2003 for next-word prediction in sentences involved trigrams and 'tricks'.  

The 'large' dataset used for training was ~14 million words in sentences (150k distinct words).  Training was limited to approximately 5 epochs on 40 CPUs for 3 weeks. 

The focus of the paper was on improving the test scores in the word prediction task.  Examining the latent variable space that is created as a byproduct was left as \#5 of 6 in the _Other Future Work_ section.


### Surprising stuff

'Sloppy' asychronous updates of the model work pretty well (not detrimental).  That is to say, that one needn't be 'ultra conservative' when it comes to locks and mutexes when doing learning in multiple threads on a multi-core machine.  The noise introduced by (rare) conflicts is dwarfed by the increase in learning speed (and research iteration speed) freed up. 


### Ideas to Follow-Up

WordNet is human-curated synonym sets with definitions and usage examples.  BSD license, 12Mb compressed.  Also have semantic linkages between synonym sets : This could be used to enhance or suppliment the trained network in some way.

The paper has the following idea :

> Fight the curse of dimensionality with its own weapons : each training sentence informs the model about a combinatorial number of other sentences.



