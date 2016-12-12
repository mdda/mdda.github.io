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


### HN Reaction

*  LEARNING A NATURAL LANGUAGE INTERFACE WITH NEURAL PROGRAMMER - yeah, that's something.   The neural programmer 
   and related stuff seems like something out of sci-fi, even more so than normal neural networks.

   *  The neural programmer is indeed interesting. The current research into have neural networks learn 
      algorithms and procedures for data retrieval and computation is really exciting 
      (to me at least).  It almost makes the image classification work of a few years ago 
      seem quaint.  For those who don't want to read the paper, it's a way to (try to) have a computer 
      learn to answer questions on datasets, like those contained [here](http://nlp.stanford.edu/software/sempre/wikitable/viewer/#203-810).




### Freebase Data

This dataset contains every fact currently in Freebase :
*   [Freebase Data Dumps - DEPRECATED](https://developers.google.com/freebase/)
*   Total triples: 1.9 billion
*   Data Format: N-Triples RDF
*   License: CC-BY
*   Size : 
    *   22 GB gzip
    *   250 GB uncompressed

Data cleansing suite, which includes lots of helpful information about the format, etc :
*   https://github.com/nchah/freebase-triples

Prebuilt AMI available via this [helpful Blog Post](https://www.linkedin.com/pulse/freebase-going-away-now-what-paul-houle?forceNoSplash=true) :
*  [Prebuilt AMI](https://aws.amazon.com/marketplace/pp/B010RA39G4/ref=srh_res_product_title?ie=UTF8&sr=0-2&qid=1441317655935)


### Simple Questions Dataset 

http://uaf46365.ddns.uark.edu/data/facebook/SimpleQuestions_v2/README.txt

Download via [Facebook bAbI](https://research.facebook.com/research/babi/) :
*  [SimpleQuestions_v2.tgz](https://www.dropbox.com/s/tohrsllcfy7rch4/SimpleQuestions_v2.tgz  ) · 403.82 MB



## Other Papers

[Semantic Parsing on Freebase from Question-Answer Pairs](https://cs.stanford.edu/~pliang/papers/freebase-emnlp2013.pdf)



## Other Databases

https://concept.research.microsoft.com/Home/Introduction
This [downloadable data](https://concept.research.microsoft.com/Home/Download) contains :
*   5,376,526 unique concepts
*  12,501,527 unique instances, and 
*  85,101,174 IsA relations.

Disclaimer: The data, service, and algorithm provided by this website are based on the automatically computing and training of 
public available data. They are only for academic use. The user of such data, service, and algorithm shall be responsible 
for contents created by the algorithm by complying with compliance with applicable laws and regulations.

There's also interesting content with repect to [Understanding Short Texts](http://www.wangzhongyuan.com/tutorial/ACL2016/Understanding-Short-Texts/), 
for which a Knowledge Base comes in handy...


*  [SQuAD - the Stanford Question Answering Dataset](https://rajpurkar.github.io/SQuAD-explorer/)

*  [DeepMind Q&amp;A Dataset ](http://cs.nyu.edu/~kcho/DMQA/)

*  [NewsQA](http://datasets.maluuba.com/NewsQA)

