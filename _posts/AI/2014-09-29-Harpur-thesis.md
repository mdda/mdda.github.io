---
layout: post
category: AI
title: Low Entropy Coding with Unsupervised Neural Networks - Harpur 1997
tagline: Thesis Takeaway
date: 2014-10-14
tags: [NeuralNetworks,PaperTakeaway]
published: true
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains a few takeaways that I had from the thesis :
[Low Entropy Coding with Unsupervised Neural Networks - (Harpur 1997)](http://mi.eng.cam.ac.uk/reports/svr-ftp/auto-pdf/harpur_thesis.pdf).


### Chapters 1-3 : Background

* Very nice, coherent overview of different approaches to unsupervised learning

* Worth reading for this alone, IMHO

<br />

#### 3.2.5 Do PCA neural networks have a role?

The author says:

> While interesting from a biological perspective, neural PCA models in their simplest form have little practical use since they will almost always be outperformed by the method of singular value decomposition.

Coming at the same statement from a different direction :

* Showing that biological networks can be made to perform PCA using only local interactions validates the idea that using SVD in a more typical computer setting should not be dismissed as being biologically implausible.

* Could backpropagation be justified simply by putting the training target as an extension of the training data, and letting it self-reinforce?

  * Isn't that 'just' a Restricted Boltzman Machine (modulo binary vs reals)?

  * To show that backpropagation in deeper networks with nonlinearities could be taught using only local data, one would need to build up, showing, for instance, what class of non-linear single-layers would give rise to an near-equivalent Hebbian learning update rule.  For a start, check out references in "3.8.3 Nonlinear PCA"


### Chapter 4 : Introduction of Recurrent Error Correction (REC) networks

* Maybe it's because we're now (2014) spoilt by riches, but the toy problems the linear REC are demonstrated on (in 1997) are *really* small...

* In 4.8 Novelty Detection, Kohonen apparently had an interesting approach (and also mentioned earlier for his work on localisation and inhibition)

* 4.10 "Minimum reconstruction error as maximum likelihood" : It feels like a mathematical _fast one_ has been pulled here, since the one page doesn't appear to actually prove the correspondence (for instance, what if 2 'x's are close enough for 'v' to blur over the two of them?  Not clear that the argument justifies the MLE claim as it stands).  While it seems like a plausible result, the lack of mathematical detail seems to be in contrast to the previous thorough analyses.


### Chapter 5 : Constraints

* Rectified Linear Units are the first constraint considered in this chapter (which is refreshing, given that sigmoids would be much more conventional, but much *nastier*).  

  * BUT : the basic REC networks don't have a bias term (left for "future work"), however this could just be implemented as a constant ```ONE``` input.  According to emails from the author, this was intentionally done, because a bias term would be more difficult to impose (weight) sparseness constraints on (since it would probably be desirable to have the bias term non-zero on most paths)

* Local penalties per output unit maintain the biologically plausible theme

* In 5.4, the assumption that the ```a```s are independent is mentioned only briefly - but leads to a fruitful correspondence of terms

* The (loose) correspondence with the steps of the EM algorithm are an interesting aside.  On the other hand, it could form the start of considering the tradeoff of the (local) REC training steps, with the (global) EM optimisation.  If the REC does well, perhaps then EM could be justified as 'biologically plausible', in the same way that SVD is just a more efficient way of computing PCA by local networks.  Whether or not the EM correspondence holds, it's interesting to think what 'global and efficient' methods can be supported by 'local but inefficient' implementations on biological networks.

* The 'kurtosis measure' section seems like a side-track

* 5.6 : Entropy of Sparse Codes 

  > This gives us a feel for why finding minimum entropy codes is a combinatorially hard problem: for each element in isolation we do not know whether we should be attempting to increase or decrease the entropy in order to work towards the global minimum. It also suggests that algorithms that claim to perform general-purpose ICA by gradient descent are likely to be making strong hidden assumptions, or be beset by problems of local minima.

* In the case of the crosses and squares toy problem, the author suggests that "The linear model of the REC network has no means of generating such a code, however, so we have to be content with a solution that has higher entropy, and greater sparseness, than the optimum, and perhaps argue that the extraction of position is a job for a higher-level process. "  In modern terms, one would think of this in terms of a deep-learning style hierarchy.  However, the sparse coding in the REC's first layer would effectively scrub away the potential for learning about the underlying tasks, since the coding reduces the image identification to 'winner takes all' indicators.  

* Some of the examples talk of the 'correct' output construction being a single ```1``` in an array of ```0```s.  What wasn't clear to me initially is that multiple rows switched on (or columns switched on) are valid, so that these output bits are independent (and make the most desirable basis for the coding of the input array).  That being said, the output-vector sparseness 'encouragement' may also be a heavy hint as to what form the solution should take, rather than being a simply neutral way to choose between the different basis sets 


### Chapter 6 : Mixture Models

* Other non-linearity functions are introduced, still allowing for local-based updating

* A form of linearized-OR is shown to be efficiently computable within the confines of Hebbian learning 

* Some example applications : 

  * The 'Modelling Occlusion' problem seems like a 'flavour of the day' kind of thing, and not particularly well suited to the elegant framework built so far

  * Saturated-OR seems like a winner for the lines problem set, but it's probably more a function of saturated or being prior-friendly

* While it's inevitable that application examples would be required, the ones used in this chapter seem to be less significant than those of chapter 7


### Chapter 7 : Applications

* Many of the ad-hoc fixes to make examples work don't appear to have much motivation - for instance, couldn't the whitening problem for the images (for the wavelets examples) be achieved with bias terms, etc, rather than additional factors?

* Each of the image examples seems to discover reasonable 'convolutional network' first layer kernels in an unsupervised manner.  Which is impressive, and prescient, given the state-of-the-art at the time.  No indication (in the thesis) that there's a concrete plan to stack these detectors, nor use them 'convolution style' (which is probably me just projecting, anyhow)

* Overall, this chapter contained a more impressive (from a 2014 perspective) selection of applications


### Conclusions (and Further Work)

* Very interesting biological comparison, connecting the feedback idea embedded in the REC network with the early visual system in mammals (apparently there are 10-100 times more feedback connections than forward directed ones in the visual system)

* Wasn't clustering meant to be a topic?  The topographic mapping idea is outlined, but doesn't appear to have been explored


Overall, the REC network described seems to be very 'well founded' on a theoretical (and biological) basis.  The applications of Chapter 7 are surprisingly prescient of the applications that would become practicable (with deeper networks, built on convolutional input layers) a decade later.

But I get the feeling that there's another step or two of 'principled development' that the author was on the verge of explaining - and that (IMHO) would have been a bigger win than the space/time taken up by ad-hoc application to toy problems in Chapter 6.

