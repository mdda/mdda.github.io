---
layout: post
category: AI
title: Trailblazing
tagline: Mavericks Required
date: 2014-11-17
tags: [NLP,NeuralNetworks,PCA]
published: true
---
{% include JB/setup %}


Recently, I've noticed a pattern emerging of papers being published that show that 'simplistic methods' actually work - and are competitive with the ground-breakingly good results from the NN deep learning community.  For example : 

  *  PCAnet vs cA, etc  [PCANet: A Simple Deep Learning Baseline for Image Classification?](http://arxiv.org/abs/1404.3606)

<!--
  Definitely need to contact authors in SG!  
    http://mx.nthu.edu.tw/~tsunghan/index.html
      SENT MAIL TO :: Tsung-Han Chan <thchan@ieee.org>
      http://scholar.google.com/citations?user=WDJ7tY0AAAAJ
      (now at SunPlus.com)
    SENT MAIL TO :: Jiwen.Lu@adsc.com.sg  << Only one on ADSC page...  (Referred back to orig author)24
!-->

  *  Single layer nets (trained from deeper nets)  [Do Deep Nets Really Need to be Deep?](http://arxiv.org/pdf/1312.6184.pdf)


  *  GloVE vs Hinton tree training [GloVe - Global Vectors for Word Representation - (Pennington, Socher, Manning 2014)](http://nlp.stanford.edu/pubs/glove.pdf)

  *  Incidence-based 'PCA' embedding vs GloVE  [Neural Word Embedding
as Implicit Matrix Factorization - Levy &amp; Goldberg (2014)](https://levyomer.files.wordpress.com/2014/09/neural-word-embeddings-as-implicit-matrix-factorization.pdf) and [Word Emdeddings through Hellinger PCA - Chan et al (2014)](http://arxiv.org/abs/1312.5542)


### The Need for Trailblazers

To stereotype the implementers of the 'new simple' methods : They are practicing 'white magic', using tried and true methods, that almost self-evidently work (except that no-one had thought to try them before).

Conversely, the methods now shown to have over-complicated the problem, are 'black magic'.  And the wizards who create these methods are (essentially) willing to try anything that will give interesting results.  Typically, the people performing 'black magic' are Neural Network researchers, who are accustomed to searching in the wilderness, trying to defend a field that seemed a little hopeless.  

Recently, though, people who had previously been out on the bold frontier of research have recently been emboldened by the sudden computational tractability of their work (before the early-2000s, stochastic gradient descent was an almost thankless optimisation method).  But now, suddenly, having any kind of differentiable system (even Neural Turing Machines...) means that a problem can be tackled by a sufficient number of CPUs (or, more likely) GPUs.  It almost seems like a reasonable approach...

Back to the "Trailblazers" : These are the 'have-a-go' black magic wizards.  Once the problems have been shown to be tractable *at all*, then the white magic wizards can come along and demonstrate that it was 'simple' all along.  But one needs the Trailblazers, the 'dreamers' - for otherwise others will fear to venture into the unknown.
