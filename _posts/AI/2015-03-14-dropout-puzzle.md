---
layout: post
category: AI
title: The Dropout Puzzle
tagline: What does dropout really do?
date: 2015-03-13
tags: [NeuralNetworks,Dropout]
published: false
---
{% include JB/setup %}

{% include custom/paper_review %}

Dropout
------------


According to 'lore', dropout:
  Forces the network to search over multiple ensembles
  Stops neurons becoming reliant on the answer that another is giving

  Is like 'altitude training' : Wager et al, Altitude Training: Strong Bounds for Single-Layer Dropout, NIPS 2014

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

