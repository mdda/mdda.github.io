---
layout: post
category: AI
title: Reinforcement Learning Course
tagline: Performance-based Rewards (Musings)
date: 2015-08-31
tags: [NeuralNetworks,ReinforcementLearning]
published: true
---
{% include JB/setup %}

This is a quick advert for the excellent online course ["Reinforcement Learning" by David Silver](http://www.computervisiontalks.com/tag/reinforcement-learning/).

David Silver's ['teaching' home page](http://www0.cs.ucl.ac.uk/staff/d.silver/web/Teaching.html) includes links to the slides 
(which are particularly helpful for Lecture 7, where there's no video available - just sound).

These notes are mainly for my own consumption...


Musings : Eligibility Traces
------------------------------------------------

Several things that bubbled to the surface during the Reinforcement Learning course:

*  Eligibility traces, which are a way of keeping track of how rewards for \\(TD(\lambda)\\) should be attributed
to the states/actions that lead to them, seem very reminiscent of activation potentials

*  Aiming for minimum fit error is the same as optimising for least surprise, which is the same as
making predictions that are as un-surprising as possible

*  Distributing the amount of 'surprise' (positive or negative) to exponentially decaying eligibility
nodes with a _neural network_ seems like a very natural reinterpretation of the \\(TD(\lambda)\\) framework

*  But current neural networks are densified, with multi-dimensional spaces embedding knowledge
in a way that is entangled far more thoroughly than the sparse representations (apparently) found in the brain

*  Perhaps the 'attribution problem' that sparse &amp; eligibility solves is equivalent to dense &amp; backprop  

*  But there appears to be a definite disconnect between the rationales 
behind each of the two methods that requires more justification




Musings : Exploration vs Exploitation
------------------------------------------------

*  Interesting that \\( (\mu + n\sigma) \\) is an effective action-chooser, since that is what I was doing in the 1990s,
   but using as a placeholder heuristic until I found something that was 'more correct'
   
*  But \\(\[0,1\]\\) bounded i.i.d variables having a decent confidence bound (Hoeffding's inequality) was a new thing for me

*  Also, liked the Thompson sampling (from 1930s) that implicitly created samples according to a distribution, 
   merely by using samples from the underlying factors is very elegant
   + and makes me think about the heuristic in Genetic Algorithms for 'just sampling' 
   as potentially solving a (very complex) probablity problem, without actually doing any computation
   


Musings : Games and State-of-the-Art
------------------------------------------------

*  The tree optimisations seem 'obvious' in retrospect - but clearly each was a major 'aha!' when it 
   was first proposed.  Very interesting.

*  Almost all of the State-of-the-Art methods use binary features, linear approximations to \\( v_*() \\), search and self-play.

*  Perhaps deeper models will work instead of the linear ones - but it's interesting that binary (~sparse?)
   features are basically powerful enough (when there's some tree-search for trickier strategy planning)



Musings : Gimbal Learning
------------------------------------------------

[Lecture 8 of the Reinforcement Learning Course by David Silver](http://www.computervisiontalks.com/rl-course-by-david-silver-lecture-8-integrating-learning-and-planning-2/)
is super-relevant to the Gimbal control problem that I've been considering.  

It's also interesting that the things I had already assumed would have been obvious 
are currently considered state-of-the-art (but isn't that always the way?  Hindsight, etc).

In summary : 

*  Learn model from real world by observing state transitions, and then learning {state, action}-to-state mapping
   +  Also learn {State, Action}-to-Reward mapping (almost a separate model)

*  Apply model-free methods to model-simulated world

*  Once 'correct' action has been selected, actually perform it

*  Now we have new real-world learning with which to fine-tune the world model

To apply this to gimbal, seems like one could present 'target trajectories' to 
controller in turn, letting it learn a common world-model, 
with different reward-models for each goal.  And let it self-play...


