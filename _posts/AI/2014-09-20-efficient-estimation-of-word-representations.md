---
layout: post
category: AI
title: Word Representations in Vector Space - Mikolov 2013
tagline: Paper Takeaway
date: 2014-09-29
tags: [NeuralNetworks,NLP,WordEmbedding,PaperTakeaway]
published: true
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains a few takeaways that I had from the papers :
[Linguistic Regularities in Continuous Space Word Representations - (Mikolov et al, 2013)](http://research.microsoft.com/apps/pubs/default.aspx?id=189726) and 
[Efficient Estimation of Word Representations in Vector Space - (Mikolov et al, 2013)](http://arxiv.org/abs/1301.3781).

### Paper Backgrounds

The key initial idea of embedding words into a vector space was discussed back in [Bengio 2003](/ai/2014/09/28/neural-probabalistic-language-model/), however the focus there was on the 'primary task', which was next-word prediction.  Here, additional interest is taken in the biproduct of the 'primary task' training, i.e. the vector space representation of the words that results from the training.

The papers contains good links to other word representation data sets (which probably took others a lot longer to train).

The largest dataset used here was the Google News corpus (6B words, though only looking at 1 million most common words), with the initial model sizing/checking done with just 30k most common words.

Only 3 training epochs were used, with learning rate tending to zero on notional 4th one.  In terms of a trade-off the authors found that using even 1 epoch would be better, if 3x as much data were available.  The models took 1-3 CPU days to train.  This is in comparison to the 8 CPU weeks reported to train one competitor's model.

The Microsoft Research Sentence Completion Challenge is similar to [May-2015 Billion Word Imputation competition on Kaggle](http://www.kaggle.com/c/billion-word-imputation), but with multiple-choice answers, and external datasets being allowed.


### Surprising stuff

The linear representations (and regularities) are one of the key focus points of these papers, and (very surprisingly) vector algebra works is found to work semantically :

```
 Man:King == Woman:Queen```, because ```v(King)-v(Man)=v(Queen)-v(Woman)
```
 
It is _almost_ unbelievable that this technique can pick up the following relationships (from the paper, which are 
representative of the actual test set used - on a task where the training data
is purely oriented to word-prediction, not the learning of the vector-embedded task at all) : 

| Relationship |  | | Example 1 | | | Example 2 |  | | Example 3 | | |
| --------------:|---|:-------------- |  --------------:|---|:-------------- | --------------:|---|:-------------- | --------------:|---|:-------------- | 
| France | : | Paris | Italy | : | Rome | Japan | : | Tokyo | Florida | : | Tallahassee |
| big | : | bigger | small | : | larger | cold | : | colder | quick | : | quicker |
| Miami | : | Florida | Baltimore | : | Maryland | Dallas | : | Texas | Kona | : | Hawaii |
| Einstein | : | scientist | Messi | : | midfielder | Mozart | : | violinist | Picasso | : | painter |
| Sarkozy | : | France | Berlusconi | : | Italy | Merkel | : | Germany | Koizumi | : | Japan |
| copper | : | Cu | zinc | : | Zn | gold | : | Au | uranium | : | plutonium |
| Berlusconi | : | Silvio | Sarkozy | : | Nicolas | Putin | : | Medvedev | Obama | : | Barack |
| Microsoft | : | Windows | Google | : | Android | IBM | : | Linux | Apple | : | iPhone |
| Microsoft | : | Ballmer | Google | : | Yahoo | IBM | : | McNealy | Apple | : | Jobs |
| Japan | : | sushi | Germany | : | bratwurst | France | : | tapas | USA | : | pizza |

<br />


### Huffman tree based hierarchical softmax

The Huffman tree coding used in the paper appears to be a direct (Unigram perplexity)-based tree mapping, rather than using knowledge about the structure of English derived elsewhere.

The method used in [Hierarchical Probabilistic Neural Network Language Model - (Frederic Morin & Yoshua Bengio 2005)](http://www.iro.umontreal.ca/~lisa/pointeurs/hierarchical-nnlm-aistats05.pdf) seems to be 'cheating', in that a 'binary hierachialized' WordNet is used as the basis for the NN target representation - which implicitly embedding knowledge of the English language into the net (On the other hand, it's not clear how/whether this information is leaking back to the vector space representation for the original word embedding, since Morin & Bengio are primarily treating it as a speed-up, and get worse results for generalisation than the direct 'vocab-sized' output vector they originally used).

Why doesn't this paper make more than a passing reference to [A Scalable Hierarchical Distributed Language Model - (Mnih and Hinton 2009)](https://www.cs.toronto.edu/~amnih/papers/hlbl_final.pdf)?

### Ideas to Follow-Up

Amazingly, simple vector embedding works for natural language.  This flies in the face of the beautiful, thorough work that linguists do.  For instance, translations take account of the hierarchy of concepts, etc, in the text to create effective mappings between languages (which are likely to attempt to minimise description length, without losing information).  Surely there must be better embeddings available?  

Convolution works with images, because we know that JPEG is an encoding that degrades with minimum impact for images when the encoding length is restricted.  i.e.  A JPEG inspired down-sampling of 'normal' images results in low information loss.  (The same cannot be said for Run Length Encoding, for instance).

The Huffman encoding seems to be just one (arbitrary) method of clustering together words.  Elsewhere, the hierarchy was derived from WordNet, for instance.  It's interesting to think about having multi-rooted 'patches' that cluster up words, and map (somehow) onto the sparse representations (qv: Jeff Hawkins) that seem so appealing.

