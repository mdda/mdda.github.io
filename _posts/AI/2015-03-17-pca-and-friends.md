---
layout: post
category: AI
title: PCA and Friends
tagline: Quasi-PCA may be interesting
date: 2015-03-17
tags: [NeuralNetworks,PCA]
published: false
---
{% include JB/setup %}

{% include custom/paper_review %}

PCA and Friends
------------


According to 'lore', dropout:
  Forces the network to search over multiple ensembles
  Stops neurons becoming reliant on the answer that another is giving

  Is like 'altitude training' : Wager et al, Altitude Training: Strong Bounds for Single-Layer Dropout, NIPS 2014
    "Training logistic regression with dropout rates from the range 2 (0, 1) thus gives a family of classifiers between unregularized logistic regression and naive Bayes, allowing us to tune the bias-variance tradeoff."
    "It is also possible to analyze dropout as an adaptive regularizer [6, 9, 13]: in comparison with L 2 regularization, dropout favors the use of rare features and encourages confident predictions."

ReLU vs alternatives 
  ReLU have one-sided function, meaning that gradients cannot propagate if unit not overall 'on'
  ABS units would accomplish manifold folding
  Two ReLUs can make an ABS, but two ABS can only make a ReLU if one centre offset a lot

"Two neurons that fire together join together" is compatible with error propagation, but only indirectly
  Check out Bengio Target thing - is it related?


But redundency in expression isn't really a benefit (silicon processors are actually robust)
Doesn't appear to allow for inhibition 

If a neuron doesn't fire in any interesting way, its weight should drop to zero
  And then be taken out of the pool, and replaced with something different (/complimentary?) to what remains
  



Whitening is a solution to a problem that shouldn't occur

