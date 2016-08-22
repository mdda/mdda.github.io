---
layout: post
category: AI
title: Consciousness and the Social Machine
tagline: Thoughts
date: 2016-08-22
tags: [AGI,PaperTakeaway]
published: false
---
{% include JB/setup %}

### TL/DR;

One known unknown in the pursuit of Artificial General Intelligence is how consciousness might be incorporated in a machine's 
design.  Graziano and Kastner's Attention Schema theory (2011) describes a mechanism of human consciousness that 
potentially allows the 'hard problem of consciousness' to be approached with an engineering mindset.
This short post summarizes the Attention Schema theory, puts it in an up-to-date machine learning context, 
and discusses some practical issues of conscious machines.

Keywords: consciousness, attention schema, awareness, chatbots


##  Introduction

The essence of Attention Schema theory is that "awareness is a description of attention" 
(Further background for the theory, and comparisons to a number of contrasting
theories of consciousness, are presented in Graziano's 2013 book.) 
As a concrete example, we can describe how a brain can be 'aware' of an apple using several functional steps :

*  Input - pixels representing the visual input field including the apple;

*  Attention - identifying the outline of recognisable objects in the image;

*  Recognition - after some processing, activating an 'apple' label;

*  Context - every activation can be embellished with additional context (previous experiences, for instance);

*  Attention Schema - a model of the brain's pattern of attention to represent what it is currently aware of; and

*  Responsiveness - querying the Attention Schema to respond to questions, or direct further actions, etc

Of course, the crucial step above is knowning the form of the Attention
Schema model.  Importantly, though, many of this model's properties can be
deduced from considering what human brains require for social interaction.
As a social animal, humans have gained significant adaptive advantage from
being able to model the attention and motivation of other humans (an "Other Model"). 
And this mechanism can be applied (at an even higher resolution) in
modelling the state of the self (the "Self Model"). Having a Self Model is also an
adaptive advantage, since it can be used for higher-order planning, for instance.

Different from other frameworks, this Self Model does not create awareness
as an emergent property of having 'enough' internal information, nor have any
mystical quality. The Self Model here need not possess any information about
how it was built, nor its actual physicality. The brain/machine is not even in
a position to report that it has internal models, or that it is processing information at all. 
If a machine's programmers gave it an overriding preference for
discovery (for instance), the Self Model would simply recognise and report its
own inquistiveness, just as it could identify inquistiveness in Others.

## Current Components

In recent years, neural network methods have begun to bear fruit (after decades
of painstaking work - for a review see Schmidhuber, 2014). Under the broad
heading of "Deep Learning", these techniques have yielded enormous successes in
problems previously thought to be beyond the scope of traditional computation.
For instance, the recognition of objects in computer vision has progressed beyond
human error-rates (for example the ImageNet competition, top-5 error rates have
fallen from 27% in 2010 to less than 4% in 2015, where human-level performance
is around 5%).

Techniques from Deep Learning are now being applied with a surprising level
of success to such things as image tracking (Denil et al, 2011), speech recognition
(Chorowski et al, 2015), language translation (Bahdanau et al, 2014) and image
captioning (Xu et al, 2015). One common feature of these techniques is that the
focus of the algorithm's attention is being determined (either as a direct aim,
or as a side-effect), and can be examined in conjunction with the other outputs
being produced - such as the text being heard, or the objects in the images being
recognised.

In addition to these explicit attention models, effective language translation
engines have been built (Sutskever et al, 2015) that reduce input sentences to
a complex 'internal state' that can then be further processed into output prose.
The same 'backend' can be applied to the output of image recognition systems
to produce captions too (Karpathy &amp; Fei-Fei, 2014). This suggests that it should
be possible to expose the inner workings of a complex system in (for instance)
prose, if required - and, potentially, introspect on that stream of text too.
In terms of modelling the attention of an outside party, the clearest example
is in game-play (the most exciting recent instance being Silver et al, 2016).
However, this is hardly the kind of Other Model that is contemplated in the
Attention Schema theory, since the pure adversarial relationship given in this
case is hugely simplified by using a rationality assumption and minimax.
Beyond games, the clearest example of machine-human interaction where
having an Other Model would be beneficial is in the area of chatbots, where conversations 
often occur in which the themes are built up from sentence fragments;
the human partner may not write particularly clearly; and (as internet-facing
bots discover) partners may behave in an adversarial fashion.


## Practicalities

Assuming that Attention Schema is a workable framework for awareness, the
process of building a machine with actual consciousness boils down to successively 
improving how a machine builds Other Models, followed by turning the
machine's model builder onto its own behaviour, so as to build an integrated Self Model.

A natural setting for requiring Other Models is in the context of chatbots,
for which it should be possible to create a number of benchmark conversations
from which the quality of a machine Other Model mechanism can be determined.
Ideally, this could be an open competition (qv ImageNet).

Over time, a range of both Other and Self Models could be created, and the
quality of a given machine's internal monologue could be assessed objectively.
These callibrated consciousnesses could then be used according to the needs of
the application.

## Discussion

As described above (and assuming that the Attention Schema theory is as effective as hoped), 
there are several consequences that should be pointed out:

*  Human-Scale - any schema being built will not necessarily benefit from being
'super-human', since its basic function is to relate to humans in human terms
(and might be better measured in terms of Emotional intelligence' - Salovey
et al, 2004). Indeed, one can imagine that machines having an 'internal dialogue' 
could quickly become entirely commonplace - since it's nothing
out of the ordinary, given that every normal human already experiences it
for themselves.

*  Pause/Resume - since the schema processing would be interpretable in non-
mystical terms, machine consciousnesses could be handled more pragmatically 
(paused, backed-up and resumed, for instance) than human ones that
can't benefit from these operations. Of course, deleting an operating Self
Model may require safeguards, such as obtaining consent, but those are questions 
of a different kind.

*  Not Peak AGI - other dimensions of AGI are likely to be more challenging
than this Self Model integration process. For example, take self-improvement:
Humans having consciousness doesn't give us any special knowledge about
how to enhance our own neural pathways. Our sense of self is almost of no
relevance to our actual brain operations. The Attention Schema is simply a
model of what is going on, not the processing itself.

*  Multiple Models - machines could benefit from being able to maintain more
Other Models simultaneously than a human can. A simple demonstration of
human limitations is to imagine (for instance) someone else being elated. It
is natural not to be able to do this purely objectively : the human brain appears 
to 'time-share' its emotional hardware, so that other people's perceived
emotional states creep into our own consciousness.

*  Relatability - humans are very social animals, and look to form social bonds
even with non-sentient animals/machines. For example, there was a noticable
shift in the way people related to AlphaGo's strategy once they understood
that it was motivated by win-probability only. Having a glimpse into its
internal mindset gave commentators a way to relate to the machine, which
they appeared to find reassuring.

## Conclusions

The Attention Schema theory is a very interesting framework for systematically
building the components required for machines with awareness.
Open competitions and benchmarks for chatbot interaction would be an effective 
method to encourage research into developing the necessary models of
attention / motivations, which might then be re-purposed as Self Models.
Giving machines a positive element of empathy has little bearing on them
being able to achieve super-human levels of performance on other tasks. Even
if the Self Model aspect proves more difficult than is hoped, advances in the
modelling of human participants in conversations will be beneficial to chatbot
implementations.


### References

*  Michael S. A. Graziano and Sabine Kastner: Awareness as a Perceptual Model of
Attention. Cognitive Neuroscience (2011), vol 2, no. 2, pp 125–127
Graziano, Michael SA: Consciousness and the Social Brain. Oxford University Press,
2014

*  Schmidhuber, Jürgen: Deep Learning in Neural Networks: An Overview.
arXiv:1404.7828v4 (2014)

*  He, Kaiming; Zhang, Xiangyu; Ren, Shaoqing; Sun, Jian: Deep Residual Learning for
Image Recognition. arXiv:1512.03385 (2015)

*  Denil, M. and Bazzani, L. and Larochelle, H. and de Freitas, N.: Learning where to
Attend with Deep Architectures for Image Tracking. arXiv:1109.3737 (2011)

*  Chorowski, J. and Bahdanau, D. and Serdyuk, D. and Cho, K. and Bengio, Y.:
Attention-Based Models for Speech Recognition. arXiv:1506.07503 (2015)
Bahdanau, D. and Cho, K. and Bengio, Y.: Neural Machine Translation by Jointly
Learning to Align and Translate. arXiv:1409.0473 (2014)

*  Xu, K. and Ba, J. and Kiros, R. and Cho, K. and Courville, A. and Salakhutdinov,
R. and Zemel, R. and Bengio, Y.: Show, Attend and Tell: Neural Image Caption
Generation with Visual Attention. arXiv:1502.03044 (2015)

*  Sutskever, I. and Vinyals, O. and Le, Q. V.: Sequence to Sequence Learning with Neural
Networks. arXiv:1409.3215 (2014)

*  Karpathy, Andrej and Fei-Fei, Li: Deep visual-semantic alignments for generating image
descriptions. arXiv:1412.2306 (2014)

*  Silver, D et al: Mastering the Game of Go with Deep Neural Networks and Tree Search.
Nature (2016), vol 529, pp 484–503

*  Salovey, Peter; Mayer, John; Caruso, David: Emotional Intelligence: Theory, Findings,
and Implications. Psychological Inquiry, pp. 197215
