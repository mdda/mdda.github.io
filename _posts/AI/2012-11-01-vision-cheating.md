---
date: 2012-11-25
category: AI
tags: [NeuralNetworks]
title: How Much Domain Knowledge is Built-In?
subtitle: Not cheating at vision tasks
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


It's reassuring to see that there are 
`authors of papers <http://www.cs.toronto.edu/~hinton/absps/fastnc.pdf>`_ 
that are careful to avoid biases that they might
introduce into their models :

  For the “basic” version of the MNIST learning task, 
  no knowledge of geometry is provided and there is 
  no special pre-processing or enhancement
  of the training set, so an unknown but ﬁxed random permutation 
  of the pixels would not affect the learning algorithm.
 
  ...

  Substantial reductions in the error-rate can be achieved by 
  supplementing the data set with slightly transformed versions 
  of the training data.

So when is it 'permissible' to add in a little domain knowledge 
to help a neural network?


### No transformation of data

This is the purest restriction : The network can't know about the real world
except from what is can glean by looking at the given training examples.  Although a laudible goal 
(particularly when it comes to learning tasks away from the visual cortex),
this really ignores the biological realities of the brain's visual subsystems.

The brain's neurons involved in vision are not in a 'blank sheet' state when
training begins : Simply by virtue of them being in two-dimensional sheets, 
an inherant knowledge of their relative spatial positions is available.  Brain-like learning 
naturally occurs in this space-aware medium.

The brain itself wouldn't be immune to being distrupted by having its
neurons randomly permuted.  So why is this a good base-line for a learning method?

  
### Training on transformed data

One argument for training a network on data that is supplemented (with the
same training data transformed with translations and rotations) 
is that this increases the number of training examples very 'cheaply' 
- no additional labeled data is required.

Another argument is that the brain itself learns from data that is continuously
being translated and rotated by small amounts - caused by saccadic eye movements
(the eye itelf causes jittered data to be the source of learning).


### Getting results from transformed data

But if the training is done on transformed data, doesn't it make sense to 
look for results during the 'real life' phase of a network's use using input 
images that are undergoing continuous changes?

One could train the network 'straight' (without transforms), and then run in real-life 
against a spread of input transformations, and look for the strongest response
(or have some kind of voting applied across the range of inputs).


### Aren't transformations innate?

While the purist stance is very defensible from 
the point of view of being scrupulously fair,
if we know we're doing a vision task, 
then it seems reasonable to allow some kinds of pre-conceptions 
to be built into the network.  Moreover, we should not be embarrassed by 
adding translational and rotational invariences to feature learners - as long 
as the same kinds of 'fuzziness' is used when it comes to usage in 'real life' situations.


.. note:: An Aside...
  The same researchers that were given the thumbs up for honesty at the start of 
  this piece were also enthusiastic about 'dropouts' during training in later papers. 
  But somehow they were less committed to the 'dropouts' idea during 'real life' testing - 
  preferring the trained network to operate in some kind of voting mode.
  
  I guess it's difficult to maintain a purist stance all the time...
