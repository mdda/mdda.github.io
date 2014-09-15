---
layout: post
category: AI
title: Combatting overfitting in Trading
tagline: Hyperparameters
date: 2014-09-14
tags: [AlgorithmicTrading,MachineLearning]
published: false
---
{% include JB/setup %}


Went to a meetup last week...

Algorthimic trading
Learning hyperparameters by back-testing is very common.
Problem is with knowing how well they will generalize, particularly if test data is limited (which it always is).
Very tempting to repeatedly fit new models and test : Effectively you're performing human-in-the-loop learning over the test data.

One approach that I haven't heard discussed is to train the same models on random data.  By random data, I mean
time-series data that has the same statistical properties as the given 'real' data, but is fundamentally 
derived from a sequence of random numbers.

*For instance, it is easy to create a fake S&P timeseries that has the same overall volatility and drift as any given
S&P period.*

However (and this is the trick), one knows that any algorithm one develops can have no predictive power on the 
future of the fake time-series - simply because it's unpredictable by construction.  

So : If you're hyperparameter fitting algorithm (or the whole human-in-the-loop regime that you have) can 
just as confidently predict the future of the 'fake S&P', then you can be sure that you've been doing the fitting for too long...





