---
date: 2012-10-28
category: AI
tags: [Parallelism, NeuralNetworks]
title: Parallelism through Time
subtitle: Neural Networks converge continuously
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Hinton makes a telling comment when he demonstrates the 
digit recognition dataset : The same image of a '3' can 
trigger very different 'hidden layer' representations
for small non-altering changes 
(translations, rotations, brightness, etc).

Each of these hidden representations can be mapped to 
labels more easily than pure pixel-level data - 
which indicates that the network has managed to 
amplify some recognizable signal from the noise.

So : While the hidden layers also appear pretty noisy 
(since they are apparently sensitively dependent on the pixel data),
training labels on them is easier than on the lower
level representation.

That is to say, the pixel-level data is 
essentially noise plus the idea of the number 
that one wants to extract, and learning labels 
is easier if networks can filter out the noise,
or enhance the strength of the 'idea' signal.

*So let's think about filters.* 


Filters 
--------------------------------------------

The most obvious examples to talk about are audio filters -
but they are looking at samples across time 
(rather than space).  
But they're easy to think about, and that's an advantage.


Passive filters
`````````````````````

Feed-forward networks.  
(Perhaps I didn't mention that this was going to be a rather hand-wavy discussion).


Re-circulation / feedback
``````````````````````````````````````````

To create 're-circulation' within a model, 
we use the output of one layer to feed back to 'previous' layers.
This feedback stage is characteristic of active filters, 
where the internal state (and that from previous timesteps) 
is used to reinforce the 'resonance' of the signal.

Of course, this may not occur in the brain - 
but it could 'easily' be tested for.  
And it might already be observed as a cause 
of epilepsy : Undesired, incapacitating resonances.


Accumulation of certainty
``````````````````````````````````````````

As noted above, an approximately constant input pattern 
may fire different sets of neurons at different times.
But overlaying all of these results causes them 
to interfere with each other in such a way that
the commonalities (i.e. the correct identification of an image)
are continuously reinforced.
Parts of the internal signals that don't get reinforced through time
are discarded - their contribution ebbing away like a discarging capacitor.


Unwinding into multi-stage
``````````````````````````````````````````
The re-circulation of previous time periods could also be 'unwound'
like a computer program loop.

This suggests that a single network, 
plus recycling of the output into the input,
could be implicitly a much deeper network - 
given enough timesteps.


Networks with a time-dimension
--------------------------------------------

The re-circulation of previous time periods adds a whole other 
dimension for a given neuron count - 
leading us to consider ``N(inputs) x N(layers) x N(timesteps)`` as a measure of size.

This is actually a place where computer systems can get a leg up on biological ones :
Assuming we haven't spent all our cycle-time advantage in multiplexing the processing
of neurons, silicon versions of biological parts have an enormous ability 
to process timesteps quickly compared to relatively slow neurons.

