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

*  A single output ```is_A_rather_than_B```, which simply measures the probability of 
   being in class A

*  As two different outputs {```is_A```, ```is_B```}, each of which represents
   the membership probability (so ```is_A``` = 1-```is_B```)
   
   
The first of these seems like the simplest, most direct solution, and 
can be approached as a regression problem, and fitted directly.

The second seems like twice the work, with unneccessary ```SoftMax```, ```ArgMax```
and a complex ```CategoricalCrossEntropy``` thrown in for good measure.

However (and we're still trying to weigh up why) :

*  The first has a tendency to be much more sensitive to learning rates, and 
   initialisation - and easily 'blows up' without warning

*  Overall, the second method (i.e. two actual outputs for two distinct classes) works much better


Possible Reasons
---------------------------

*  Two outputs implies twice the number of weights in a dense network leading up to it - 
   so larger learning capacity, but this doesn't explain :
   
*  One output networks seemed to suffer from problems with stability during training.  It may be 
   analogous  to think of differential pair signalling, as opposed to 'absolute' 
   signal values.  Propagating 'matched pairs' of training signals may reduce a network's
   tendency to overshoot with high learning rates.  But this doesn't explain :
   
*  Two matched signals, with a dropout layer, beat single signals without...


   
