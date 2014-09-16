---
layout: post
category: AI
title: Combatting overfitting in Trading
tagline: Hyperparameters
date: 2014-09-16
tags: [AlgorithmicTrading,MachineLearning]
published: false
---
{% include JB/setup %}

{% include custom/not_investment_advice %}

In Singapore, it is common to find algorithmic trading strategies being advocated at MeetUp events.

Typically, a particular model of deciding on entry/exit points has already been
formulated.  Usually something along the lines of "Enter the ABC equity trade LONG when
the FX rate goes about level L, and exit the position when the ABC equity X-day and Y-day
moving average graph lines next cross".  The values of L, X and Y are then fitted to 
historical data, and then the 'finished model' tested against hold-out data.  Below,
the parameters L, X and Y are called hyperparameters (since they determine the 
shape of the model, rather than elements within the model).

However, it is unusual to hear much information about how to decide whether the model has been overfitted.

### Learning Hyperparameters

The problem with the usual procedure is deciding knowing how well the final model will generalize, 
particularly if test data is limited (which it always is).  

Moreover, it is very tempting to repeatedly fit new models and test them, 
discarding those that don't work over the test data.  Effectively you're performing 
human-in-the-loop learning over the test data.

### Learning to Predict Noise

One approach that I haven't heard discussed is to train the same models on random data.  By random data, I mean
time-series data that has the same statistical properties as the given 'real' data, but is fundamentally 
derived from a sequence of random numbers.

*For instance, it is easy to create a fake S&P timeseries that has the same overall volatility and drift as any given
S&P period.*

However (and this is the trick), one knows that any algorithm one develops can have no predictive power on the 
future of the fake time-series - simply because it's unpredictable by construction.  

### Summary

So : If your hyperparameter fitting algorithm (or the whole human-in-the-loop regime that you have) can 
just as confidently predict the future of the 'fake S&P', 
then you can be sure that you've been doing the fitting for too long...

#### Follow-up

And there's probably a lot more mileage to be had in the idea of 
creating artificial known-bad data on which to test learning methods : 
Since it can give us an indication of just how much wishful-thinking is going
on in the minds of the algorithm creators.
