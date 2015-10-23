---
layout: post
category: AI
title: Binary Classification vs Probability Regression
tagline: {0,1} works better than (0,1)
date: 2015-10-23
tags: [NeuralNetworks]
published: false
---
{% include JB/setup %}

The output stage of a simple two-class identification model can be 
encoded in a couple of apparently identical ways : 

*  As two different outputs {```is_A```, ```is_B```}, each of which represents
   the membership probability (so ```is_A``` = 1-```is_B```)
   
*  A single output ```is_A_rather_than_B```, which simply measures the probability of 
   being in class A
   
