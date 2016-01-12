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


GPU Implementation
---------------------
For the base GloVe computation, which is mostly vector products, this appears to be memory-bandwidth bound.
Perhaps more compute-heavy versions could allow better uses of 'closer' memory buffers.

    Memory Bandwith (Dual) :  21 GB/s
    Memory Bandwith (Quad) :  37 GB/s
    PCI v3.0 x16           :  15.754 GB/s
    Titan X Bandwidth      : 336 GB/s   (GigaBytes/sec)


But if we're memory-bandwidth bound, then how practical is it to store the whole of the training data on the GPU?

Sizing of the vocabulary sparse matrix entries :

*  For vocab size of less than 1,000,000 words, then 20bits is sufficient to store the index

*  So two indices can fit in 5 bytes
 
*  Is 3 bytes sufficient resolution to store the Xij (in some suitable format) ?
   - because, if so, the data can be compressed into a 64-bit word
   - half the size of int32+int32+float64, as is currently the format
   
*  What actual type / range does the Xij element have / need?
   + Xij is the sum of the inverse distances between the words
      - up to a distance of (default) 15 words  (a/2 + b/3 + c/4 + ... + n/15) for large a,b,c, ..., n
      - reciprocal-distance is pretty arbitrary (rather than having a theoretical foundation)
   + Interested in ln(Xij) and Xij itself when &lt;x_max (default = 100.0)
      - modify glove.c to spit out max(Xij) over whole cooccurrence file...

   + On sample ```text8``` file : 
     - lines read :  60,666,466, word_max :  71,290 71,290
     - val.min, val.max, val.max2 : 0.0667, 409,566.0413, 339,164.6820

   + On ```kaggle_words``` file : 
     - 100w : lines read : 481,276,158, word_max :  99,561  99,561, val.min, val.max : 0.0667, 9,133,361.6994, 8,707,079.0381
     -  25w : lines read : 568,037,902, word_max : 208,350 208,350, val.min, val.max : 0.0667, 9,069,331.6206, 8,674,834.5595
     -   5w : lines read : 645,639,963, word_max : 552,402 552,402, val.min, val.max : 0.0667, 9,028,503.0483, 8,655,790.3236

   + So, full dynamic range = 9,133,361.6994 / 0.0667 = ~1,370,003,570 which (as integer) needs 31 bits
     - but : ln(9,133,361.) = 16.027444388459088, ln(8707079.) = 15.979646935304869, and ln(0.0667) = -2.70805020105221
     - this looks a lot more tractable...  1st place - 2nd place = 0.04, (1/14-1/15) = 0.0047619
     - So, what dynamic range is required in ln() terms? : (16.0274+2.7080)/0.0047619 = 3934.4379
     - Therefore, can give headroom up to 65k, and with 8 bits fixed binary places in 3 bytes
    
   + Test using ```stats.c```:
     - Using ln(Xij)+3.0 and ```16.8``` representation : Largest decompression error ~ 0.39%
     - Using ln(Xij)+3.0 and ```14.10``` representation : Largest decompression error ~ 0.098%
     - Using ln(Xij)+3.0 and ```12.12``` representation : Largest decompression error ~ 0.024%
  
   + *Conclusion : can safely encode the Xij values in 3 bytes, and therefore each 16-byte CREC in 8-bytes*



Also, sizing the number of co-occurrence entries :

*  Dependency on size of vocabulary (equivalently, the minimum number of occurrences of each word)

*  Dependency on the number of cooccurrences to be considered worth learning

*  Looking at GloVe :
   +  Embeddings [don't ignore punctuation](http://stackoverflow.com/questions/31710061/stanford-gloves-lack-of-punctuation)
   +  GloVe obeys newlines (so that window doesn't go from one line to the next)
   +  embedding vector file size == vocab.size * (embedding.size+1) * 8 * 2 (i.e. stored at 2 64-bit numbers)
   +  their ```text8``` sample stats, using the default parameters : 
      -  Text contains 17,005,207 tokens with 253,854 unique words
      -  Truncating vocabulary at min-count 5 gives a vocabulary of size 71,290
      -  Cooccurrence file : 970,663,456 bytes, 60,666,466 elements (i.e. 16 bytes per line)
      -  Using x_max: 10.000000, alpha: 0.750000
      
   +  applying it to ``kaggle words`` dataset :
      -  Text contains 768,648,884 tokens with 2,425,337 unique words (numbers not unified)
   +  Truncating vocabulary at min-count 5 gives a vocabulary of size 552,402
      -  Cooccurrence file : 10,330,239,408 bytes, 645,639,963 elements (i.e. 16 bytes per line)
   +  Truncating vocabulary at min-count 25 gives a vocabulary of size 208,350
      -  Cooccurrence file :  9,088,606,432 bytes, 568,037,902 elements (i.e. 16 bytes per line)
   +  Truncating vocabulary at min-count 100 gives a vocabulary of size 99,561
      -  Cooccurrence file :  7,700,418,528 bytes, 481,276,158 elements (i.e. 16 bytes per line)
 

Interesting Compression Papers
--------------------------------

The following recent (Sep &amp; Oct 2015) papers are also relevant, even though they
are directed at compression for power-saving, rather than the idea that minimum length descriptions
imply knowledge discovery :

*   [Neural Networks with Few Multiplications](http://arxiv.org/abs/1510.03009)
*   [A Deep Neural Network Compression Pipeline: Pruning, Quantization, Huffman Encoding](http://arxiv.org/abs/1510.00149)


Early Results
--------------------------------

*  Exactly agree with paper for Syntactic &amp; Semantic Word Analogy tests (Table 2)
   +  Simple numpy version
   +  15x faster Theano version
   
*  Intentional damage on 300D embedding (generated from the 6bn word corpus):
   +  ```abs()``` all entries   : -40.61%
   +  ```zero (33% binomial)``` : -28.29%
   +  ```zero (50% binomial)``` : -54.50%
   +  ```zero (last 33%)```     :  -2.47%
   +  ```zero (last 50%)```     :  -4.99%
   +  ```zero (last 67%)```     : -11.36%

*  Comparison to 100D embedding (generated from same 6bn word corpus):
   + ```raw 100d (no zeros)```  :  -8.63%  (instead of -11.36% above)

The 100D version is better than the 300D version with 200 dimensions zeroed out, which 
suggests that the information content is distributed 'fairly' through all the dimensions 
available.  Probably not surprising.


Near-Linear Quantisation 
------------------------------------------------------------------

Quantising the elements of the vectors is an easy win, though.

1-bit sign + 7-bits of data (ranging from 0 to highest-in-vocab for this column) is practically no loss of precision.

All the way down to 1+3 (for an 8x space saving), particularly with a non-linearity applied before/after.

Also tried near-linear scale, with \( x^\alpha \) factor, settling on \( \alpha = 0.30 \).



Quantisation with Trainable Levels
------------------------------------------------------------------

Try with 16 levels, chosen from a 'trainable palette' of levels, and use Theano to fix it all up...

This works surprisingly well, quantising the embedding with : 
*  4-bits per element at only 0.20% loss of overall score
*  3-bits per element at only 0.73% loss of overall score
*  2-bits per element at only 3.67% loss of overall score




Space-Folding
------------------------------------------------------------------

Theano version of max(2x.a-a.a,0) optimisation :
  square CPU (batchsize 4)  : 274ms
  square CPU (batchsize 64) : 258ms
  simlim CPU (batchsize 4)  :  76ms
  simlim GPU (batchsize 4)  :  24ms
  simlim GPU (batchsize 64) :   4ms


Sparse Coding
------------------------------------------------------------------

http://www.scholarpedia.org/article/Sparse_coding
https://en.wikipedia.org/wiki/Neural_coding#Sparse_coding

G.F. Harpur, R.W. Prager. Development of low entropy coding in a recurrent network, Network: Computation in Neural Systems, vol. 7, pp.277-284, 1996. (pdf)

https://scholar.google.com.sg/scholar?q=george+harpur+&btnG=&hl=en&as_sdt=0%2C5

http://fias.uni-frankfurt.de/~shelton/papers/binary_sparse_coding.pdf


Has excellent bibliography (with PDFs) and code :
  https://github.com/piotrmirowski/Tutorial_AutoEncoders



http://stats.stackexchange.com/questions/118199/what-are-the-differences-between-sparse-coding-and-autoencoder

What are the difference between sparse coding and autoencoder?

An autoencoder is a model which tries to reconstruct its input, usually using some sort of 
constraint. Accordingly to Wikipedia it "is an artificial neural network used for learning efficient 
codings". There's nothing in autoencoder's definition requiring sparsity.  Sparse coding based 
contraints is one of the available techniques, but there are others, for example 
Denoising Autoencoders, Contractive Autoencoders and RBMs.  All makes the network learn 
good representations of the input (that are also commonly "sparse").


https://web.stanford.edu/class/cs294a/sparseAutoencoder.pdf
https://chrisjmccormick.wordpress.com/2014/05/30/deep-learning-tutorial-sparse-autoencoder/


Additional:

```n```-level coding doesn't require any multiplications to look up : This can be computed on-the-fly using
```n``` vectors that can easily fit in the cache.




Close in intent : Sparse Encoding for Embedding (not 'of Embedding', though) :
  http://www.cs.cmu.edu/~bmurphy/NNSE/
  http://www.cs.cmu.edu/~bmurphy/NNSE/nnse_coling12.pdf


ClueWeb Corpus (large) :
  http://www.lemurproject.org/clueweb09.php/

Tangential :
  https://github.com/piotrmirowski/DependencyTreeRnn
  https://github.com/piotrmirowski/LBL
  https://piotrmirowski.wordpress.com/about/
  https://piotrmirowski.files.wordpress.com/2015/10/piotrmirowski_2015_learningrepresentationsoftextfornlp_online.pdf
  

NB :
=========

*   ICLR 2016 will take place May 2-4 in the Hilton-Caribe Hotel in San Juan, Puerto Rico. 
*   The abstract and title submission deadline is November 12th 2015 at 5:00 pm US Eastern Time. 
*   The deadline for submitting arXiv ID to of the papers to ICLR is November 19th 2012 at 5:00 pm US Eastern Time.



Add to version 2 : 
  Neural Networks with Few Multiplications    http://arxiv.org/pdf/1510.03009v1.pdf 
  Reference to quantised networks in ICLR paper discussions
    = ...
  Pure binary representation reduces cos() to :
    'and', then 
    count bytewise lookup/accumulate, then 
    sqrt - (unless simply trying to find a maximum, in which case it's irrelevant)
    
  One issue with a 'sparse embedding' is that it necessarily gives up minimum-description-length in favour of an encoding that is mostly-zero
    50/50 one/zero is higher information density

  Ideas:
    random vector representations (like Locality-sensitive hashing, LSH)
      - don't aim to 'encode', just to represent
      - add as a 'mangle' variant into test.py (rather than a whole new processing method)
        + operation can actually be coded as a big matrix multiply, followed by np.sign()
        + and performance with ~1k binary places is ~ -8.5%, beating the autoencoder approach
        + at 0.5k ~14.87%
        + at 1.5k ~ 7.31%  (2k too large for GPU)
      
    Two layers on output stage (more expressive...)
      - but throw out the weights to test representation stand-alone
    Winner-Take-All Autoencoders
      - seems like a decent idea to impose sparseness
    Check whether I'm currently doing 'BinaryConnect' in hard-choosing (stochastically?) the activations during training
      - can't remember...  https://papers.nips.cc/paper/5647-binaryconnect-training-deep-neural-networks-with-binary-weights-during-propagations.pdf
        +  "Whereas DropConnect’s noise is added Gaussian noise, BinaryConnect’s noise is a binary sampling process.
           In both cases the corrupted value has as expected value the clean original value" 
        +  "we have chosen to clip the real-valued weights within the [-1.1] interval right after the weight updates"
        +  https://github.com/MatthieuCourbariaux/BinaryConnect
    Rectified Factor Networks (?)
      - https://papers.nips.cc/paper/5963-rectified-factor-networks.pdf
        +  http://www.bioinf.jku.at/software/rfn

      
  Add flow chart/psuedo-code for quantisation approach (read ICLR paper reference to see whether it's the same)
  
Reviewer comments : 

----------

This paper proposes to compress word embeddings. This topic is certainly of interest. 

The paper starts by describing very naive methods for quantisation, apparently not being aware of the vast literature on quantisation. For instance, after introducing trivial suboptimal variant for "linear quantisation" (the right terminology is scalar quantisation), it proposes a method to minimize the square error (page 3) based on gradient descent, while this very same objective function is what is solved by the scalar Lloyd-Max algorithm or its discrete k-means counterpart:
https://en.wikipedia.org/wiki/Lloyd's_algorithm 

Then, again without citing the relevant body of literature on the subject, the paper tackles the problem of binary embedding. The equation E=BW is something very common. Many papers optimize such an objective function, see for instance the literature review by the recent Arxiv paper, which cites more than 100 references on the on the subject on embedding for compression+search (and still only cover partly the literature):
http://arxiv.org/pdf/1509.05472.pdf

Even the seminal paper 2002's by Charikar at POCS, who first introduced binary codes as a way to estimate the inner product in the original space, and in particular popularized the project+binarize approach used in many papers, is not cited:
http://dl.acm.org/citation.cfm?id=509965

Finally, the paper introduces a few greedy approaches. There is no way to determine their interest, given that there is no comparison with the methods introduced in the relevant literature on compression for distance estimation in a context of learning.

Recently, there was a lot of research done on the topic of compressing in a context of learning algorithms such as neural networks. See the following post that report several very interesting works:
https://www.reddit.com/r/MachineLearning/comments/3oiefh/quantization_then_reduces_the_number_of_bits_that/cvxjd8z

Overall, the paper tackles an important problem, and it is true that compression for word embeddings is something that the community should investigate more. This is the main merit of the paper. However, I must recommend a rejection, since the paper does not meet what I consider as important requirements for acceptance: a minimum of literature review and an evaluation carried out against decent approaches addressing similar problems.

Quantitative Evaluation	3: Clear rejection
Confidence Score	5: The reviewer is absolutely certain that the evaluation is correct and very familiar with the relevant literature.

----------

This paper explores ways of compressing pretrained word embeddings to reduce the memory footprint and hopefully result in more interpretable embeddings. They are able to achieve the former, but not the latter.

Overall the paper is fairly well-written, however there are several places where statements are made without clear motivation or references. Together these made it hard for me to follow sometimes, and hard to appreciate the goals and the actual contributions. Some thoughts in more detail:

* It should be made clear in the introduction that the goal is to learn a more compact *and* more interpretable representation (only mentioned in abstract and then for first time in Sec 4).
* Likewise, the conclusion should make it clear in par 2 that the latter goal was unsuccessful.
* Sec 2.2: "'true' binary representations of the same embedding were sought, following the intuition that a good encoding should have minimal pre-ordained structure". I'm not sure I understand this statement, or if I do, why a 'true' binary encoding corresponds to minimal pre-ordained structure.
* Sec 2.2.1: "the structure or complexity of the network transformation [...] is not an important factor". Why not?
* Table 1 could perhaps be visualized as a network instead?
* Sec 2.2.1 item 2: "that imposed an 'exclusion zone' around zero". How?
* Sec 2.2.1 Item 3: why choose standard sigmoid during training and hard "step function" during testing?
* Sec 2.2.1 Item 4: 'Dynamic frog-boiling': highly creative naming! What you're describing here as a "balancing factor" is typically called a "regularization weight". What you're describing is a "binary-ness regularizer". Last paragraph: "before the slightly-harder-to-solve objective function is triggered". No motivation or discussion is referred to to help the reader understand which one of the objectives is "harder-to-solve" and why.
Sec 2.2.2 "if the choices available are either to subtract it from a particular embedding row, or not". What does this mean and why? What is the "total remaining energy" (again, I can guess, but it should be made more explicit)? I do not understand the paragraph starting "Each iteration of this produces...", and I'm not sure where B_n enters the picture (it's the first mention in this section). Overall, this section left me confused.
Sec 3: "cosine similarity [...] i.e. where the dot-product is a maximum". If it is cosine similarity, then it must be "normalized dot-product"
Fig 2: What are "SVD-S" and "SVD-L"? Consider adding a legend to figures. Add a period at the end of captions.
Sec 3.2 talks about "ada.8" method but does not say what this is or how it should be interpreted (I can guess, but...). "0.58% less than GloVe" absolute/relative?
Fig 3: Add a legend, clarify somewhat arbitrary naming convention.
Sec 4.1 mentions for the first time (after abstract) that the goal is to learn about the underlying embedding through an efficient compression algorithm. This should be made much clearer and emphasized earlier.
Sec 4.2 "The original motivation for searching for optimal 'space-folding' directions.." this is the first time you're talking about space-folding directions. Do you just mean "compressed representation"? If you do mean space-folding, can you elaborate? "Disappointingly, the process was found to be simply slicing and dicing the embedding into an ever-smaller noise sphere around the origin" I do not know where this was shown. Did I miss something?
Sec 4.2 What is a proof-point?
Sec 4.3 "Even if the raw binary representation isn't as useful as hoped [...] [such an encoding] enables matrix multiplication to be simply a process of conditional additions". This argues for computational efficiency using the sparse representations. However, my interpretation of Fig 5 is that the sparsity is at around 30%. I may be wrong, but I do not think that is enough to offer much computational speedup over efficient dense BLAS matrix-matrix multiplies. If this is the argument, please include some quantitative evidence to that effect.

One last question: if the main outcome is a method for compressing the word embeddings, did the authors try to just use a standard lossy compression algorithm on e.g. a binary dump of the embeddings?

Quantitative Evaluation	4: Ok but not good enough - rejection
Confidence Score	5: The reviewer is absolutely certain that the evaluation is correct and very familiar with the relevant literature.

----------

The authors proposes and compares various methods for compressing word embeddings. For each compression method they measure the loss of performance with respect to the ability of the resulting embeddings to correctly predict word analogies.

The strongest result is a quantization method, called Adaptive Level Encoding, that reduces the number of bits required per word embedding by a factor of about 10 (from 32 bits per dimension, to 3 bit per dimension) at the cost of only a marginal performance loss in word analogy tasks.

The reduction is quite impressive and is more than what is possible with, e.g. convolutional neural networks (there the performance degrades significantly when using less than ~12 bits per weight). However, the evaluation of the performance is somewhat problematic: word analogy tasks are not exactly the main purpose of word embeddings. A more thorough evaluation on more direct tasks that involve word embeddings, such as language modelling or machine translation, would yield more confidence in the proposed compression method.


Quantitative Evaluation	5: Marginally below acceptance threshold
Confidence Score	4: The reviewer is confident but not absolutely certain that the evaluation is correct.


-------------------------


Now need to formulate a plan of attack (and/or decide to what extent it is worth fighting) :

Simple fixes :
  Bibliography additions
    But reading those papers may suggest tweaks that go 'above and beyond'
  GloVE construction is for cos(), not purely a bi-product
  Attempt simple zip compression on embedding
  
  reviewer 1 is most critical, 
    but suggests (essentially) that a better literature review, and tests would be a fix
  
  reviewer 2 is ultra-detailed, and helpful
  
  reviewer 3 is somewhat positive (though still fails) - wants tests other than word-analogy
  

-------------------------
"Rebuttal" : Limit=6000 characters - no HTML
-------------------------

First off, let me say that putting these comments in a 'Rebuttal' textfield seems rather antagonistic, given that I feel that the reviewers provided very helpful feedback, and I tend to agree with their overall conclusions (my 'review' is below).

I don't know whether the reviewers can see each others' reviews, so I'll summarize the main points.


Assigned_Reviewer_1 rightly pointed out that the paper lacks much in the way of literature review, and proved that there were a large number of citations that should be properly included.  Here, I must apologise, and explain that my main focus in 'iteration 1' was to describe the 'hot off the press results' for the paper, and provide the background texture when the rush to get new and improved results was over.

The square-error minimising quantisation (which ended up being the most successful compression) was built as a more general framework than that which gave the reported results.  And, as noted by this reviewer, the Lloyd-Max algorithm is equivalent (subsequently checked by specifically re-implementing this case).

Other techniques from the literature (such as random projection hashing) were also tried, but these (a) were less successful than the Lloyd algorithm, and (b) didn't appear to offer much progress towards the ultimate goal of achieving a 'better representation'.

The literature review paper suggested (http://arxiv.org/pdf/1509.05472.pdf) was very helpful - and one of its dependencies (http://www.cv-foundation.org/openaccess/content_cvpr_2015/papers/Liong_Deep_Hashing_for_2015_CVPR_paper.pdf) may have provided an 'aha' moment (more below).


Assigned_Reviewer_2 provided an extremely detailed and helpful critique of the text of the paper, by subsection, which will certainly improve the clarity of the paper.  Thank you.

To answer one question directly : a simple 'gzip' of the raw embedding data yields a data size of 26 bits per vector element, illustrating that the paper's numerical approaches do include some representational power that is task-specific.


Assigned_Reviewer_3 addressed such questions as whether the paper should be relying so heavily on the word analogy task to measure performance.  This is a valid point, and (given time) results for some word similarity tasks should be included (to mirror the original GloVe paper, http://www-nlp.stanford.edu/pubs/glove.pdf, for instance).  

Although only one metric (the word-analogy problem) was used, it should be noted that this is a somewhat 'savage measure', since each question has only 1 correct answer (and 399,999 incorrect ones), which would appear to make it rather sensitive to small perturbations.

It would also be interesting to see whether the (final) results could be applied to other embeddings - since there may be some GloVe-specific nuances introduced.  Such differences could arise because GloVe is specifically formulated to perform tasks where cosine-similarity is important, rather than the embedding arising as a 'biproduct' of another task (such as reconstructing linguistic contexts of words).


Author Review:

The original grand aim of the paper was to 'factorize the English language' by decomposing a known-good embedding into parts that could explain the relationships between concepts.

Since a good explanation should be shorter than the evidence (~mimimum description length, etc), it made sense to gauge the complexity of the embedding overall, which is why trivial compressions were outlined, as well as the surprisingly effective quantisation approach.

Given the 3-bit estimate of 'best compression' as a benchmark, more sophisticated/tailored approached were tried.  A smart hashing approach was devised - which over time revealed itself to be a PCA varient.  And many GPU cycles were burned in an attempt to persuade an auto-encoding approach to work.  

But, at the end of the day, neither of these approaches yielded a representation that was :

(a) 'almost lossless'
(b) with independent binary bits
(c) sparse (which contradicts MDL)
(d) full of explanatory power (i.e. with a 'gender' bit and a 'royalty' bit, for instance)

So, while the paper has an interesting goal and approach, it falls short of its initial aim, despite finding a 10x compression (which seems a useful secondary result, but not enough on its own).

Quantitative Evaluation	4: Ok but not good enough - rejection


Next Steps:

Clearly, it would be better to be able to report definite progress on the 'deep learned' embedding.

The approach in Liong et al (Deep Hashing, CVPR-2015) looks promising, when contrasted with the auto-encoding approach (which seemed like the most natural solution), where much effort was expended in trying to get the path from binary embedding back to the original embedding to be linear/simple.  However, in the clear light of day, that doesn't really achieve any of the goals (a-d) above.

Liong et al's Deep Hashing approach now looks more relevant - since in their framework (or a variant) the (a-d) goals can be expressed explicitly, while creating a binarised embedding that is implicitly a representation of the original vectors.

However, that experimentation will take time, and is not guaranteed to work (though during the auto-encoding experiments, some evidence was found that the GloVe embedding necessarily includes difficult non-linearities).

Therefore, rather than spend time optimising the text of a paper that (in my own mind too) doesn't "hit the nail on the head", it makes more sense to continue working towards getting to a clearly satisfactory final result.  If/when that is done, the text of the (full) paper can be fleshed out with the (essential) literature and clarifications suggested by the reviewers - and a shorter ICLR Workshop submission made that reports on the progress made 'hot-off-the-press'.


-------------------------

Dear Martin Andrews,

     I've just looked at your rebuttal. Based on the score you are giving to your own paper (4: Ok but not good enough - rejection), this would almost suggest that you'd like to retract your paper. Is that what you want?

BTW, I don't know how familiar you are with the author response process at conferences, but it doesn't actually require you to do a self-review of your own paper, as you've done. I think it's very big of you to have done that, but the expectations were only that you identify mistakes made by the reviewers in their evaluation, if any.

Look forward to your answer!

Cheers!

Hugo Larochelle
ICLR Senior Program Chair

-------------------------

Dear Hugo Larochelle : 

Thanks for reaching out to me about my unconventional 'self-review'!  I guess I should explain my rationale a little...

After I completed my PhD in the 90s, I consciously decided that the academic rat-race was not something that appealed to me - and headed off into "Quant Finance".  Now that adventure is done, I can finally get back into the "AI thing".  In the meantime, Moore's Law has provided the compute resources, and the heroes who 'kept the faith' broke through the exploding gradient logjam (for example).

If I were now full-on participating as an academic, I would definitely take a combative stance in reading/critiquing the reviewers' comments and fixing up the paper as required.   However, as things stand, I'm more interested in producing a paper that's actually 'worthwhile', which is why I thought I should highlight my own dissatisfaction with not solidly achieving the paper's main goal.

My understanding is that there is now a period during which I could/should be arguing with the reviewers.  IMHO, there are better uses of their time - because we'd only be iterating on a paper with a so-so main result.  I'm thinking that there's still a 10% chance, though, that my final 'response' (due 19-Jan) could be a paper that (in addition to addressing their concerns) contains the solid home-run result that I'm (still) looking for  - so 'retraction' seems premature.

Given more time (and here I'm thinking about the Workshop track), I'm a lot more confident of getting meaningful results.  And the real value to me of the ICLR conference is in the ideas/participation, rather than the citation points anyway (modulo having to take a 33 hour flight to get there...)

Anyway - sorry for the lengthy explanation, but I hope it clarifies my thinking.

Looking forwards to participating in May, if possible

Best Regards
Martin Andrews

-------------------------







https://en.wikipedia.org/wiki/Lloyd's_algorithm 
  Move sites of quantisation to centroids of areas (speed-up vs gradient descent?)
  -- DO?   This alternative algorithm could be implemented fairly easily...
    But not so simple to figure out a 'parallel method'
    Also, seems to concentrate on Euclidean measures (not minimising sum-of-squares error, for instance)
      Not well-matched to task, unfortunately : numpy.digitize, numpy.searchsorted, numpy.histogram
    Practically identical results to original theano method
    Try running on lower # of levels on all but 10 'difficult' distributions
      - Didn't really have as much impact as hoped...
  

http://dl.acm.org/citation.cfm?id=509965
  This seems to be a LSH method 
  READ : ICLR-2016/README/Charikar-2004_Estim.pdf 
    (from http://www.cs.princeton.edu/courses/archive/spr04/cos598B/bib/CharikarEstim.pdf)
  This looks like an early example : Compare to the LSH method already used (not reported)
    Heavy going for Christmas Day reading...
  

http://arxiv.org/pdf/1509.05472.pdf
  READ : ICLR-2016/README/Wang-et-al-2015_1509.05472.pdf
    Seems like a LSH overview :: LOTS OF STUFF IN HERE - focusses on binary encodings
    Existing LSH method is as in C.1(8) without a random shift
    Are random-permutation ideas relevant?
    And is hashing really the right comparison tool, 
      given that our objective function is to do with differences (rather than just closest match)?
    Information-theoretic metric learning
      information-theoretic learning of Mahalanobis distance function
    p14 starts deep learning variant descriptions
      Deep hashing for compact binary codes learning
        http://www.cv-foundation.org/openaccess/content_cvpr_2015/papers/Liong_Deep_Hashing_for_2015_CVPR_paper.pdf
        Important idea : Learn the hashing with implicit features (no need to map back to original embedding)
          Includes ugly lambda_i factors to control relative weight of each factor
            Perhaps there's some auto-scaling idea to make this 'pure'
          Features such as : 
          - 0/1-ness (squared distance between binarised, and last real layer values)
          - Maximize variance of the last layer real output (ensures hashing distributes evenly over each bit (?))
          - Quasi-Independence in weight vectors (summed across all layers)
          - Weight-L2 (this is partly to counteract summations in above factors)
          Other potential factors :
          - Sparseness
          Factors requiring strict input-output dependency :
          - Linear reconstruction of the input embedding = tried and failed
          - Angular Quantization similarity (Based Hashing)


Also: Did I test the central representation as {0,1} or {-1,1} vectors?
  binary_to_embedding is a plain casting : So {0,1} is used, rather than {-1,1}

Also: Some idiot (i.e. me) coded the 0/1-ness as (linear-01) rather than (logistic-01)
  v16 : Rerun with hard01 applied in middle (and compare to sigmoid version)



https://www.reddit.com/r/MachineLearning/comments/3oiefh/quantization_then_reduces_the_number_of_bits_that/cvxjd8z
  Lots of references in a comment here...  Specifically by 'kjearns'
  Maybe pick a few more - these are about compressing NNs
  
  Tensorising Neural Networks
    http://arxiv.org/abs/1509.06569
    RE-READ
    
