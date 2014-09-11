---
date: 2012-12-30
category: AI
tags: [Fundamentals,NeuralNetworks]
title: "Neurons : Pyramids vs Sheets"
subtitle: Is there really a pyramidal funnel from input to output?
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


The traditional way of building a neural network to learn a specific mapping
from input vectors to output lables is to build a pyramid comprising layers of neurons.  
Each successive layer is notionally distilling the outputs of the previous one, 
funnelling the learnings towards the end answer - each layer being smaller than its inputs.

The new intuition is that it may be more effective to throw
uniform sized learning layers on top of the inputs, like blankets piled on a bed, 
and giving a the assembled heap a significant learning period to digest 
the input in an undirected (labeless) manner.  
The final stage (to produce a 'correct' labeling) then consists 
of connecting up a single layer of 'observer' neurons 
that can pluck out the desired results from the mass of neurons that 
have smartened themselves up organically.

Feed-back / Feed-forward Symmetry 
---------------------------------------

In a world where the information 'understood' by a network is captured 
by self-referential feed-forward and feed-backward iterations, the idea
of imposing a top-down pyramid on the learning as a first step does not 
make as much sense as when designing for 'traditional' back-propagation.  

The fact that we're only interested in certain labels doesn't mean that we
can prune off all the other possibilities - doing this may be implicitly 
limiting the resolving power of our network.

