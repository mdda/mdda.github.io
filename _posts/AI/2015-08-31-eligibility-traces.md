---
layout: post
category: AI
title: Eligibility Traces and Neural Networks
tagline: Performance-based rewards
date: 2015-08-31
tags: [NeuralNetworks,ReinforcementLearning]
published: false
---
{% include JB/setup %}

Musings
------------

Several things that bubbled to the surface during the Reinforcement Learning course:

*  Eligibility traces, which are a way of keeping track of how rewards for TD(\lambda) should be attributed
to the states/actions that lead to them seem very reminiscent of activation potentials.

*  Also, aiming for minimum fit error is the same as optimising for least surprise, which is the same as
making predictions that are as un-surprising as possible.  

*  Refactoring a complex model into a simpler/sparser one seems likely to have generalization benefits,
since Occam's razor can be cleanly applied.  Can the information content be used to impute the factorization?

*  Wouldn't it be nice to impute a descriptive sparse (e.g. 2-3% of ~10k of activations) version of the 
(say) 500 reals embedding vectors, in such a way that sense-dependencies could lead to improvements
among mutually-related concepts?  (so embed -> factorize -> re-embed (with factorised structure to
boost senses of all words) -> factorize, etc)


