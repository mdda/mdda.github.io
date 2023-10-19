---
layout: post
category: AI
title: PCA and Friends
tagline: Quasi-PCA may be interesting
date: 2015-03-17
tags: [NeuralNetworks,PCA]
published: false
---
{% include JB/setup %}

{% include custom/paper_review %}

PCA and Friends
------------------------


### CorEx

* Discovering Structure in High-Dimensional Data Through Correlation Explanation
  + Greg Ver Steeg
  + Aram Galstyan
  + Code: https://github.com/gregversteeg/CorEx
    - Seems that update process is intrinsically rather simple 
      + So the magic is in the formulation
      + All variables in same layer generated at once (?)
      + Initialization of weights is (as usual) random
  + and CorEx 2 paper
  
  + Extension to continuous variables?
    - Whiteness of the inputs is typically assumed for statistical work

* Provable Non-convex Robust PCA *
  + Microsoft
  + NIPS 2014
  + Robust PCA, matrix decomposition, non-convex methods, alternating projections

* Sparse PCA via Covariance Thresholding
  + NIPS 2014

* Sparse PCA seems to be optimising for sparse 'outputs' in one step
  + However, going for maximum sparsity in one step doesn't promote the (useful?) Sparse Distributed Representation properties
    - http://numenta.com/learn/properties-of-sparse-distributed-representations.html
  + Perhaps lateral inhibition is a natural way of promoting this?
  
* Just read Numenta/Hawkins Sparse Distributed 'Combinatorics' paper
  + Interesting how this proves algebraically that sparse representations get better 
    :: very non-linearly in n (binary vector length) and w (# of 1s ~ 2% of n)
  + Questions : 
    - Could word embedding be done this way?
    - What numerical resolution is required on matrix operations - see HTM white paper:: 
      + hierarchical-temporal-memory-cortical-learning-algorithm-0.2.1-en.pdf
      + Apparently, weight matrix is essentially binary, but there is a scalar association variable (0..1) that keeps track of correlations
    - Can binary representation be efficiently GPU'd (just conditional adds of weights)
    

Also : Random stuff
* RandomProjections-WordEmbedding_1412.6616v1-reprint.pdf
* NTU-2006_ExtremeLearningMachines_I-ELM.pdf
* ? Mallat-2013_RandomScattering_CIMPA13.pdf
  
* Applications of Random Matrices in Spectral Computations and Machine Learning
  
* Lillicrap-2014_RandomWeight-Backprop_1411.0247v1.pdf
  + ? 5355-stochastic-gradient-descent-weighted-sampling-and-the-randomized-kaczmarz-algorithm.pdf

