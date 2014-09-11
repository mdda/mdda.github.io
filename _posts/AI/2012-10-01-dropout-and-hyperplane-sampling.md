---
date: 2012-10-21
category: AI
tags: [Fundamentals, NeuralNetworks, Dropouts]
title: "Dropouts : 2^N networks for 2xN work?"
subtitle: How 'dropouts' relate to an idea from Genetic Algorithms
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


As noted previously,
Hinton has recently shown interesting results concerning the benefits of adding 
'dropouts' in neural networks during learning
(see : `Improving neural networks by preventing co-adaptation of feature detectors <http://arxiv.org/pdf/1207.0580.pdf>`_).

Again, one of the claimed benefits of using an explicit dropout rate of 50% is that 
for a doubling of required processing (since only approximately half the neurons are
available for training for any given training iteration, the number of training
cycles should approximately double) the training is actually occuring across 
the power set of possible neuron networks (with a huge amount of weight sharing).

This argument is similar to the 'hyperplane sampling' argument from
Genetic Algorithms (GAs) in the early 1990s.


Hyper-Planes
-----------------

In GAs, one argument that was developed to show why genetic crossover seemed so much more
effective than the linear sampling rate would suggest is that each 
fitness measurement for an individual could be thought of as implicitly sampling 
estimates of fitness from all of the 'hyperplanes' that had the particular individual
in common.  i.e. 1 measurement of an N-bit individual would provide 
data relevant to the fitness of all 2^N hyperplanes.

As a concrete example, computing the fitness of a single point - ``fitness('010101')`` - 
implictly gives data for estimates of the fitness of many other hyperplanes : 
``E{fitness('*10101')}``, ``E{fitness('0*0101')}``, ``E{fitness('010***')}``, etc.
(where '*' stands for a wild-card set along any particular axis).


But...
-----------------

On its face, the hyper-planes argument always sounded a little too-good-to-be-true.
And the fact that GA people are not beating the drum even more loudly now than two 
decades ago suggests that there may be less mileage in this line of 
reasoning than it first appeared.

It's possible the "2^N networks for 2xN work" idea has merit - but be wary...
