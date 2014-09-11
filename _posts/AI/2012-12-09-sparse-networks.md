---
layout: post
category: AI
title: Sparse Networks
tagline: Are Neural Networks over-connected?
tags: [NeuralNetworks]
published : true

#layout: post
#category : lessons
#tagline : "Supporting tagline"
#tags : [intro, beginner, jekyll, tutorial]
#published : true

#public: yes
#date: 2012-12-09
#type: ai-blog
#ai-blog: [index]
#topics: [NeuralNetworks]
#title: Sparse Networks
#subtitle: Are Neural Networks over-connected?
---
{% include JB/setup %}

Generally, neural networks are specified as being fully connected from one
layer to the next.  All 'NxM' weights being considered in calculations.  But 
this isn't replicated in nature - it may be the product of analytic convenience, 
which, in turn, may cause experimenters to skip over key principles 
involved in how the brain works.

Real brains seem to make use of their capacity to replicate fundamental units 
'effortlessly' : Neurons can be used relatively wastefully.  The ability 
to 'cheaply' throw enormous simple computational resources 
at a problem differs fundamentally from computer-science approaches 
to building machines.


Cheap Processors, Simple Wires
---------------------------------

Not only are the neurons 'cheap', but so are their connections.
Instead of using 'finely-balanced' weights (which seem likely to add brittleness),
biological neural connections seem to be either 'connected' or 'not-connected' - 
and make up for this lack of subtlety through having multiple connections 
to nearby related neurons.

Overlaying many of these on top of each other could give the effect of
linear weights, while using only binary processes.  However, 
that reasoning is rarely made explicit - and it bundles 
together several aspects of what is actually going on rather too neatly.


Enormous Random Networks
--------------------------------

A different approach to implementation in software could include 
some kind of 'sufficiently dense, regular' connectedness without (much) loss of generality.

Or even just a random scattering of connections with appropriate geometric densities.

Each net of inputs to a neuron could be mutated randomly through time - 
killing connections that encouraged firing when no firing resulted, and 
adding connections when a positive correlation was noticed.

But how to spot the opportunity for new connections - 
where creating a new connection would encourage a positive correlation 
that would contribute to the performance / robustness of the network?  

In the brain, there is a whole 3 dimensional substrate though 
which dendrites explore to find new 'mates'.  Through time, 
localised chemical gradients may be being built up,
guiding dendrites this way and that (by hinting where the random walk of a 
dendritic process should meander).  This substrate-based 
'workless' computation is difficult to create a parallel to 
in matrix-based neural models.


Tentative Connections
--------------------------------

A practical approach to building connectivity in computer-based models would be 
to add links at random (on a large scale) and monitor them through time as to 
whether they are contributing in a positive or negative way to the overall 
result of the neuron.  This 'confidence' parameter would determine the speed at 
which this link would wither away (or become more permanent).  

In effect, a linear value would get associated with the linkage.  But it wouldn't 
represent a weight, it would represent a confidence level 
(weights would all be +1 or -1, for argument's sake).

