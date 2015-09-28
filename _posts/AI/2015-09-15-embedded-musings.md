---
layout: post
category: AI
title: Musings about Word Embeddings
tagline: Can they be factorised?
date: 2015-09-15
tags: [NeuralNetworks,WordEmbedding]
published: false
---
{% include JB/setup %}



Musings : ICLR
------------------------


*  Refactoring a complex model into a simpler/sparser one seems likely to have generalization benefits,
since Occam's razor can be cleanly applied.  Can the information content be used to impute the factorization?

*  Wouldn't it be nice to impute a descriptive sparse (e.g. 2-3% of ~10k of activations) version of the 
(say) 500 reals embedding vectors, in such a way that sense-dependencies could lead to improvements
among mutually-related concepts?  
   +  (so embed &rarr; factorize &rarr; re-embed (with factorised structure to boost senses of all words) &rarr; factorize, etc)

But :

*  What would a factorization scheme look like?

*  How could the effectiveness of the factorization be measured?

Looking at the cosine similarity of the (English Wikipedia-derived) embeddings was 
a bit of a let-down : 

*  the ranking wasn't too bad within a cluster near a particular word
*  but the absolute value of the first result didn't bear much relationship 
   to the 'actual similarity' of the cluster.

Perhaps the \\( l_0 \\) ideas in the recent paper [Learning Deep \\(l_0\\) Encoders](http://arxiv.org/pdf/1509.00153v1.pdf) could be helpful - 
except that it is really talking about finding the best encoding against a learned dictionary.  
It seems like there is an iterative scheme by which encoders (and their respective weights) can be trained
to converge to the 'ideal' input-to-output dictionary scheme.  

On the one hand, this is not really the 'direction' of learning that I'm thinking about.
On the other, it's encouraging that the dictionary encoding scheme can be discovered automatically.  

Could this scheme be implemented in a more general way - in particular one that could be "Deep" 
(i.e. learns representations at multiple levels)?  Since the 'depth' of the learning is difficult to 
forsee, perhaps some RNN action is in order, so that arbitrary depth structures could be 
imputed by the learning itself (getting deeper as more structure is identified)?

There's also a Google paper on efficiently learning large target output spaces, 
but that seems to involve hashing functions, which don't seem to be adaptive to the space being learned.

[Complete Dictionary Recovery over the Sphere - Sun, Qu &amp; Wright2015](http://arxiv.org/abs/1504.06785) seems like it has relevant results,
as does [Sparse Matrix Factorization - 2014](http://arxiv.org/pdf/1311.3315v3.pdf), where they 
state that, when factorizing \\( Y = X_1 X_2 X_3 X_4 \dotsb \\) with \\( Y \\) dense and \\( X_{i} \\) sparse : 

> Our main observation is that one can compute \\( X_1 X_1^⊤ \\) by looking at \\( Y Y^⊤ \\) and
> rounding it to an integer. From \\( X_1 X_1^⊤ \\) one can recover \\( X_1 \\). 
> If \\( X_1 \\) has a bounded condition number, it can be inverted and one can solve for 
> \\( X_2 X_3 \dotsb \\) and continue like this iteratively to find the rest.


Measurement of the quality of word vectors : The "Google Analogy Task" (```./demo-word-accuracy.sh```).

Pretrained vector models available via [Google's project page]( https://code.google.com/p/word2vec/ ).

Lots of work has examined the ```Queen ~ King - Man + Woman``` style of analogies (notably : 
[Linguistic Regularities in Sparse and Explicit Word Representations](https://levyomer.files.wordpress.com/2014/04/linguistic-regularities-in-sparse-and-explicit-word-representations-conll-2014.pdf)).

Multiple senses covered in [Efficient Non-parametric Estimation of Multiple Embeddings per Word in Vector Space](http://arxiv.org/abs/1504.06654).  
Microsoft's Multi-sense paper was trained on [April 2010 snap-shot of the Wikipedia corpus (Shaoul and Westbury, 2010)](http://www.psych.ualberta.ca/~westburylab/downloads/westburylab.wikicorp.download.html)
(containing approximately 2 million articles and 990 million tokens).


Dig into :

*   https://levyomer.wordpress.com/2015/03/30/improving-distributional-similarity-with-lessons-learned-from-word-embeddings/

*   https://bitbucket.org/omerlevy/hyperwords


Practicalities
===========================

*  To 'factorize' the raw matrices, need some measure of how well the factorization is doing
   +  [This Montreal paper](http://arxiv.org/pdf/1412.6448v4.pdf) mentions some word similarity rating methods
   +  [Embedding blog post](http://www.marekrei.com/blog/linguistic-regularities-word-representations/) has links to 3 methods : 
      - The [MSR dataset](http://research.microsoft.com/en-us/projects/rnn/) containing 8,000 analogy questions (this is tough for pure counting methods)
      - The [GOOGLE dataset](https://code.google.com/p/word2vec/source/browse/trunk/questions-words.txt) with 19,544 analogy questions.
      - The [SEMEVAL dataset](https://sites.google.com/site/semeval2012task2/download), covering 79 distinct relation types.

>  The word vectors were trained on 1.5 billion words of English Wikipedia. 
>  The vocabulary was restricted to contain only words that occurred at least 100 times in the corpus, resulting in 189,533 words.    
   


*  Thinking about 'variance reduction' as an approach to isolating word-factors, probably need a way to retrain a given set of vectors, to see whether new factors improve some quantitative measure of fit or predictive power.

*  If it's going to be GPU-learned, then need a GPU implementation of word2vec or similar
   +  [Overview](http://files.meetup.com/12426342/5_An_overview_of_word2vec.pdf)
   +  [GPU, GloVE, but not words](https://github.com/allentran/graph2vec)
   +  [GloVE, but Non-GPU](https://github.com/hans/glove.py/blob/master/glove.py)
      - but with [an excellent write-up](http://www.foldl.me/2014/glove-python/)

   +  Relevant Theano snippet on how to [update a subset of weights](http://deeplearning.net/software/theano/tutorial/faq_tutorial.html)
   
   +  Pouring some cold water on [newer embedding techniques](https://levyomer.wordpress.com/2015/03/30/improving-distributional-similarity-with-lessons-learned-from-word-embeddings/)


Minor note:

Building Google's 1-billion-word language modelling benchmark is much more involved than expected, 
and also contains a large number of duplicate sentences 
(which, when removed, reduce the number of words in the corpus from 2.9Gb to 0.8Gb).

OTOH, the checksums proved that the process was going Ok, even though the line-by-line aggregate produced
mid-way seemed to have extra double-quotation marks at the beginning of each line.

That being said, the version produced ends up IDENTICAL to the version issued by Kaggle.



NB :
=========

*   ICLR 2016 will take place May 2-4 in the Hilton-Caribe Hotel in San Juan, Puerto Rico. 
*   The abstract and title submission deadline is November 12th 2015 at 5:00 pm US Eastern Time. 
*   The deadline for submitting arXiv ID to of the papers to ICLR is November 19th 2012 at 5:00 pm US Eastern Time.

+   
