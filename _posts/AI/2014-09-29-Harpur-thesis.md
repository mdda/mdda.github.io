---
layout: post
category: AI
title: Low Entropy Coding with Unsupervised Neural Networks - Harpur 1997
tagline: Thesis Takeaway
date: 2014-09-29
tags: [NeuralNetworks,PaperTakeaway]
published: false
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains a few takeaways that I had from the thesis :
[Low Entropy Coding with Unsupervised Neural Networks - (Harpur 1997)](http://mi.eng.cam.ac.uk/reports/svr-ftp/auto-pdf/harpur_thesis.pdf).

### 3.2.5 Do PCA neural networks have a role?

> While interesting from a biological perspective, neural PCA models in their simplest form have little practical use since they will almost always be outperformed by the method of singular value decomposition.

But it should be pointed out that showing that biological networks can be made to perform PCA using only local interactions validates the idea that using SVD in a more typical computer setting should not be dismissed as being biologically implausible.

* Could backpropagation be justified simply by putting the training target as an extension of the training data, and letting it self-reinforce?

* Isn't that 'just' a Restricted Boltzman Machine (modulo binary vs reals)?

* To show that backpropagation in deeper networks with nonlinearities could be taught using only local data, one would need to build up, showing, for instance, what class of non-linear single-layers would give rise to an near-equivalent Hebbian learning update rule.  For a start, check out references in "3.8.3 Nonlinear PCA"


### 4.8 Novelty Detection

* Kohonen apparently had an interesting approach (and also mentioned earlier for his work on localisation and inhibition)

