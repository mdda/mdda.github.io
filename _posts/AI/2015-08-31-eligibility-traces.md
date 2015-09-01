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
making predictions that are as un-surprising as possible

*  
