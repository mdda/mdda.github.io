---
date: 2016-05-16
title: "arXiv : Compressing Word Embeddings"
tagline: Paper
category: AI
tags:
- Paper
- Word Embeddings
- Sparse
- NLP
- theano
layout: post
published: true
---
{% include JB/setup %}


### Link to Paper

*   Title: [Compressing Word Embeddings](http://arxiv.org/abs/1511.06397)

*   Authors: Martin Andrews

*   Categories: cs.CL cs.LG

*   Comments: 10 pages, 0 figures, submitted to ICONIP-2016. 
    *     Previous experimental results were submitted to ICLR-2016, 
          but the paper has been significantly updated, 
          since a new experimental set-up worked much better

*   License: http://arxiv.org/licenses/nonexclusive-distrib/1.0/

#### Abstract

Recent methods for learning vector space representations of words have
succeeded in capturing fine-grained semantic and syntactic regularities using
vector arithmetic.  However, these vector space representations (created through
large-scale text analysis) are typically stored verbatim, since their internal
structure is opaque.  Using word-analogy tests to monitor the level of detail
stored in compressed re-representations of the same vector space, the
trade-offs between the reduction in memory usage and expressiveness are
investigated.  A simple scheme is outlined that can reduce the memory footprint
of a state-of-the-art embedding by a factor of 10, with only minimal impact on
performance.  Then, using the same 'bit budget', a binary (approximate)
factorisation of the same space is also explored, with the aim of creating an
equivalent representation with better interpretability.


### Accepted to ICONIP 2016!

I'll do a separate posting when the presentation is done, the code is up, and I'm allowed to 
host the typo-fixed version of the arXiv paper.

Also, I'll post the paper's ```BiBTeX``` entry as soon as I get it.
