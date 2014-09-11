---
date: 2012-12-02
category: AI
tags: [NeuralNetworks]
title: Real Neurons are Very Complex
subtitle: How realistic do we need our neural models to be?
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Several research groups have recently announced successes in
modeling 'real neurons' in impressive-sized quantities - 
each with the aim of seeing
whether their model has explanatory power
for actual biological brains.

A secondary aim of 
all of these models is to explore which features 
are important, and which can be safely left out.


Modeling rainfall
-----------------------

Suppose one wanted to determine the shape of puddles of water after a shower of rain.

One could choose to model : 

  * the dynamics of the drops of water forming in the cloud
  
  * the wind pattern's effect on collections of droplets

  * the precise location on which each drop falls

  * the dynamics of water-flow as it drains downhill
  
  * etc...

However, the only important factors are the quantity of water, 
and the profile of the land on which the puddle is forming.
The puddle's shape is determined not by the behaviour of the water, 
but by shape of the ground for a given depth of puddle.


Building the most detailed model possible - and subtracting
---------------------------------------------------------------------

Biological neurons are complex to model. It may be that : 

  * some of the types of hysteresis found in neural output 
    is significant to their operations

  * be that the '3D' substrate between neurons plays a role in learning 
    (by defining chemical gradients between correlated signals, for instance)
  
  * etc...
  
There are innumerable features and subtle distinctions that could 
separate a workable simulation (i.e. one that could, at scale, lead
to brain-like behaviour) from one that does not have the right 'spark'.

Right now, it is extremely difficult to know 
at which point a model move into 'complete overkill' territory.
But, once a comprehensive simulation is available, 
it's possible that it could be stripped back to its core - revealing 
the 'essence' of what makes neurons work effectively in the brain.


Building a simplistic model - and adding
---------------------------------------------------------------------

Another (more mathematically appealing) approach is 
to try and guess at the important features now -
and simplify everything else away.

In some respects, this approach is more research-friendly.  Each different research 
team can pick a different set of features to incorporate into a model, do lots of experiments, and make 
recommendations about next steps.  A selection of papers can be generated 
from each iteration of the process.  However, if there are twenty embeddable features, 
and each researcher chooses ten, it's a method that comes with a lifetime employment guarantee...


The right abstractions will be obvious (in hind-sight)
---------------------------------------------------------------------

Whichever way is used to acheive the goal of a workable brain-scale network,
once the correct palette of parameters and abstractions is identified, 
later research will look back in amusement at the range of dead-ends
and blind-alleys were explored.

But it's a hard slog to get to that point.
