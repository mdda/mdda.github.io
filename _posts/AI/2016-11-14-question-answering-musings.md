---
layout: post
category: AI
title: Musings about Question Answering
tagline: What kind of magic is this?
date: 2016-11-14
tags: [NeuralNetworks,KB,QandA]
published: false
---
{% include JB/setup %}



## Musings : Question Answering

An interesting (v. recent) paper from Google 
[Neural Symbolic Machines: Learning Semantic Parsers on Freebase with Weak Supervision](https://arxiv.org/abs/1611.00020)...

The idea is to build a question&rarr;program translator that responds with 
the text of a program (which executes over the triples in Freebase).  

I figure that (compared to, say, translation) this is something that 
doesn't require data that only Google-sized people can get their hands on.  

And I figure that some Genetic Programming could feature in there too...


### Freebase Data

This dataset contains every fact currently in Freebase :
*   [Freebase Data Dumps - DEPRECATED](https://developers.google.com/freebase/)
*   Total triples: 1.9 billion
*   Data Format: N-Triples RDF
*   License: CC-BY
*   Size : 
    *   22 GB gzip
    *   250 GB uncompressed


### Simple Questions Dataset 

http://uaf46365.ddns.uark.edu/data/facebook/SimpleQuestions_v2/README.txt

Download via [Facebook bAbI](https://research.facebook.com/research/babi/) :
*  [SimpleQuestions_v2.tgz](https://www.dropbox.com/s/tohrsllcfy7rch4/SimpleQuestions_v2.tgz  ) · 403.82 MB



## Other Papers

[Semantic Parsing on Freebase from Question-Answer Pairs](https://cs.stanford.edu/~pliang/papers/freebase-emnlp2013.pdf)

