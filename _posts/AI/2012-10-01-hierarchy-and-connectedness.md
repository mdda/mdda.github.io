---
date: 2012-10-07
category: AI
tags: [Philosophy, Fundamentals, NeuralNetworks]
title: Hierarchy and Connectedness
subtitle: Is the brain pre-wired in a top-down hierarchy?
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Given the average signal processing delay of a single neuron, 
and the known response time of the brain to new stimuli, 
one can easily conclude that there are relatively few layers of 
hierarchy between the retina and a so-called grandmother neuron
(I'm not suggesting that a 'grandmother neuron' exists, 
simply that a complex concept like 'grandmother' has a neural equivalent
that can signify the end of the recognition process).

Concious awareness of new stimuli may take a few more steps - 
it's actually possible to measure the timing difference between when the
brain is 'aware' of new input, and when it 'hits' the concious mind.


Hierarchy and Pyramids
---------------------------------

Typically, a computer science approach to visual recognition of objects 
(applied to a neural-type model) 
would involve layers of processing, each one of which would condense the
information on the layer above into more and more specific 'detectors'.

For instance, the final result 'this is a cat' would receive input from 
a layer that could detect various aspects of cat-ness, and also dog-ness.
But the degree to which the hierarchy must be flattened due to timing constraints
means that the previous layer will also have to cope with chicken-ness, road-ness 
and helicopter-ness.  

Presumably, there's also a level at which furry-ness and mechanical-ness are 
also recognized.  

But as the number of different endpoints rises to the full spectrum of identifiable 
visual images, the number of intermediate concepts starts to challenge the idea
that they can exist on discrete levels : There isn't enough time to do this in clean stages.


Hierarchy and Homogeneity 
---------------------------------

So, the idea of a clean funnel, with each stage distilling the essential information
out of the previous one, is likely to be mistaken.  What should look like an 
efficient hierarchical process (from a computer science design point of view) is 
more likely to be rather ad-hoc.  
That is to say, everything may instead be connected to everything else, and 
subtle concept refinements are due to there being 50 neurons that respond to all 
50 shades of grandmother, rather that one really smart neuron.  

So, ad-hoc here means that 
the brunt of the processing coming from 'wasteful' processing across a whole level - 
and that's Ok, because the brain is optimising against constraints that have 
little bearing on what computer science usually focusses on.

The brain has a lot of 'surplus' neurons to pull into 
solving problems - and doesn't have any opportunity to use faster/smarter neurons to 
tackle more difficult problems 
(since they haven't been developed by evolution nearly quickly enough to be harnessed by the 
human cause).



Localization and Bandwidth
---------------------------------

A separate strand of thought concerns the 
way in which the brain can implement 'bandwidth pinch-points' 
via the localization of brain functions within specific areas in the brain.
For instance, the language centers are distinct from the visual cortex - 
and the highway in between them is transmitting data that has been pre-processed.

But brain topology isn't fixed absolutely : Studies with brain-damaged patients has 
demonstrated that one of the brain's hallmark traits is adaptability - right down
to repurposing areas of the brain when necessary to take over damaged areas.


Brain Cost Functions
---------------------------------

Combining these two ideas : 
A lot of the 'top-down' thinking about how the brain operates is wishful thinking.
The brain can afford to process in a way that is wasteful of neural resources - 
one of its primary constraints is reaction time, and AI researchers should think about
efficiency of representations in terms of the brain's actual 'cost function', rather than
in terms of the cost function that determines how computers are constructed.

