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
  

ReLU have one-sided function, meaning that gradients cannot propagate if unit not overall 'on'

ABS units would accomplish manifold folding

Two ReLUs can make an ABS, but two ABS can only make a ReLU if one centre offset a lot

