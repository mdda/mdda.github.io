---
date: 2012-10-14
category: AI
tags: [Fundamentals, NeuralNetworks, Dropouts]
title: Unreliability & Robustness
subtitle: What "dropouts" mean for learning
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Hinton has recently shown interesting results concerning the benefits of adding 
'dropouts' in neural networks during learning
(see : [Improving neural networks by preventing co-adaptation of feature detectors](http://arxiv.org/pdf/1207.0580.pdf)).

One of the claimed benefits when using an explicit dropout rate of 50% is that 
although the processing requirement approximately doubles, the robustness of the 
resulting trained network (which actually employs all of the neurons when 
giving 'real results') is far higher than simply using a given network and 
training it for twice as long.

*This page started out as a justification of 'dropouts' on the basis of it 
being a method that would be naturally beneficial (and selected for by evolution).  It ended up rather differently...*

Neuron-centric point-of-view
------------------------------------

Hinton outlines a 'neuron-centric' point of view to explain this, 
whereby having its neighbours randomly disappear gives each neuron an
incentive to learn the most robust model it can, since it cannot rely on
co-adapting with other neurons (because it cannot assume that any other neuron
will be present for any other training examples).

This is an appealing explanation, since it neatly side-steps the comparison
with random tree learning - and the ignores the fact that he advocates
using all the neurons simultaneously when running in 'production mode'
(to obtain the benefit of 'all the learning', despite the network having 
learned only in random subsets during the training phase).


Robustness-centric point-of-view
------------------------------------

An alternative way of looking at why the 'dropout' method works so well is
to consider it in a biological context.

Overall, biological systems are extremely reliable.  However, at the cellular level,
the components are subject to large variations in 
cell parameters (e.g. what you ate the day the cell was created), 
random fluctuations (e.g. brain bouncing around) and 
other disruptions (e.g. 'bad/unlucky' learning examples) 
that make them less-than-ideal components.  Nature has already figured out a solution for this.

If individual components cannot be relied upon, in order to be robust, 
the overall system must be 'designed' so that dropout rates
match the additional investment in duplication of effort.  There's a natural balancing act 
between the reliability of individual neurons, and the extent to which the brain 
would be larger to account for the mistakes.  
Very reliable neurons would imply rather small redundancy, 
and conversely for very 'flaky' neurons.


But why 50% ?
----------------

This is a puzzling question.  

The range of effective dropout rates (0.3 - 0.7) discovered in Hinton's *in silico* 
experiments rules out 90% reliabilities for individual neurons, for instance.  But 
(per the robustness-centric paragraphs above) the evolution 
of the brain would have been able to cope with any particular reliability figure.

So, '50%' could well be a mathematical artifact - telling us that 
there's something artificial about the idealized training process that balances two 
countervailing forces that don't correspond to a biological reality.

Using some version of an anthropic principle argument : 
If 50% were a truely ideal figure, then natural would have already chosen
its components to match.  And if there were neural components that truely had a reliability of 50%, 
we would have already heard about it.

So, coming up with a '50%' figure as being the correct 'magic number' 
could identify a problem all on its own...


### ---Added Later---

Maybe nature is a lot less reliable than I thought (from [Brain-Like Chip May Solve Computers' Big Problem: Energy](http://discovermagazine.com/2009/oct/06-brain-like-chip-may-solve-computers-big-problem-energy) ) : 

>  It sounds cockamamy, but it is true. Scientists have found that the brain’s 100 billion neurons are surprisingly unreliable. Their synapses fail to fire 30 percent to 90 percent of the time. Yet somehow the brain works. Some scientists even see neural noise as the key to human creativity. Boahen and a small group of scientists around the world hope to copy the brain’s noisy calculations and spawn a new era of energy-efficient, intelligent computing. Neurogrid is the test to see if this approach can succeed.

Expect a future post to explore whether there are two strands of ideas here,
or they're two aspects of the same thing.
