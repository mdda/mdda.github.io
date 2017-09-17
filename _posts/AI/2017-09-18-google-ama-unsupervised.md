---
layout: post
category: AI
title: Unsupervised Learning
tagline: Google Reddit AMA (2017)
date: 2017-09-18
tags: [NeuralNetworks,Unsupervised]
published: false
---
{% include JB/setup %}


The Google Brain team recently did a [Reddit AMA](https://www.reddit.com/r/MachineLearning/comments/6z51xb/we_are_the_google_brain_team_wed_love_to_answer/), 
and I thought some comments were particularly interesting / crunchy.

If you are someone who I've quoted, and object to me doing so (at pain of copyright infringement, for instance), 
please let me know and I'll replace the quote with a link directly to the reddit post itself.


## Google AMA : Unsupervised Learning

Question asked by ```dexter89_kp``` : 

*    What is the brain team's take on state of unsupervised methods today? 
*    Do you anticipate major conceptual strides in the next few years?

Answer by Google Brain's ```vincentvanhoucke``` : 

>I think people are finally getting that autoencoding is a Bad Idea, 
and that the difference between unsupervised learning that works (e.g. language models) 
and unsupervised learning that doesn’t is generally about predicting 
the causal future (next word, next frame) instead of the present (autoencoding). 
>
>I'm very happy to see how many people have started benchmarking their 'future prediction' work 
on the push dataset we open-sourced last year, that was quite unexpected.
>
>*Could you elaborate? Bad idea in some specific context or just in general?*
>      
>In general. 
>      
>Take NLP for example: the most basic form of autoencoding in that space 
is linear bottleneck representations like LSA and LDA, 
and those are being completely displaced by Word2Vec and the like, 
which are still linear but which use context as the supervisory signal. 
>      
>In acoustic modeling, we spent a lot of time trying to weigh the benefits of 
autoencoding audio representations to model signals, 
and all of that is being destroyed by LSTMs, which, again, 
use causal prediction as the supervisory signal. 
>      
>Even Yann LeCun has amended his 'cherry vs cake' statement to no longer be 
about unsupervised learning, but about predictive learning. 
>
>That's essentially the same message :
>
>*  Autoencoders bad. 
*  Future-self predictors good.

Answer by Google Brain's ```gcorrado``` : 

>I don’t think we’ve really broken through on unsupervised learning. 
There’s a huge amount of information and structure in the unconditioned data distribution, 
and it seems like there should be some way for a learning algorithm to benefit from that. 
>
>I’m betting some bright mind will crack it, but I’m not sure when. 
Personally, I wonder if the right algorithmic approach might depend on the availability 
of one or two orders of magnitude more compute. 
>
>Time will tell.


### Meta-Comment?


