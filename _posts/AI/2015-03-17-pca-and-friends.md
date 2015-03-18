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
------------


CorEx
  Discovering Structure in High-Dimensional Data Through Correlation Explanation
    Greg Ver Steeg
    Aram Galstyan
    Code: https://github.com/gregversteeg/CorEx
      Seems that update process is intrinsically rather simple 
        So the magic is in the formulation
        All variables in same layer generated at once (?)
        Initialization of weights is (as usual) random
  and CorEx 2 paper
  
  Extension to continuous variables?
    Whiteness of the inputs is typically assumed for statistical work
  

Provable Non-convex Robust PCA *
  Microsoft
  NIPS 2014
  Robust PCA, matrix decomposition, non-convex methods, alternating projections

Sparse PCA via Covariance Thresholding
  NIPS 2014

