---
layout: post
category: AI
title: Efficient Estimation of Word Representations in Vector Space - Mikolov 2013
tagline: Paper Takeaway
date: 2014-09-20
tags: [NeuralNetworks,PaperTakeaway]
published: false
---
{% include JB/setup %}

{% include custom/paper_review %}

This write-up contains my first impressions of the paper :
[Efficient Estimation of Word Representations in Vector Space - (Mikolov et al, 2013)](http://arxiv.org/pdf/1301.3781.pdf)

Key initial work was Bengio 2003.
Good links to other word representation data sets (which probably took a lot longer to train).

Linear representations (and regularities) emphasised, so that vector algebra works semantically ( Man:King == Woman:Queen, because v(King)-v(Man)=v(Queen)-v(Woman) )
Almost unbelievable that this can pick up the relationships shown : 

Relationship
France - Paris
big - bigger
Miami - Florida
Einstein - scientist
Sarkozy - France
copper - Cu
Berlusconi - Silvio
Microsoft - Windows
Microsoft - Ballmer
Japan - sushi

Example 1
Italy: Rome
small: larger
Baltimore: Maryland
Messi: midfielder
Berlusconi: Italy
zinc: Zn
Sarkozy: Nicolas
Google: Android
Google: Yahoo
Germany: bratwurst

Example 2
Japan: Tokyo
cold: colder
Dallas: Texas
Mozart: violinist
Merkel: Germany
gold: Au
Putin: Medvedev
IBM: Linux
IBM: McNealy
France: tapas

Example 3
Florida: Tallahassee
quick: quicker
Kona: Hawaii
Picasso: painter
Koizumi: Japan
uranium: plutonium
Obama: Barack
Apple: iPhone
Apple: Jobs
USA: pizza

Convolution works with images, because we know that JPEG is an encoding that degrades with minimum impact for images when the encoding length is restricted.  i.e.  That kind of down-sampling results in low information loss.  (The same cannot be said for Run Length Encoding, for instance).

Amazingly, simple vector embedding works for natural language.  This flies in the face of the beautiful, thorough work that linguists do.  For instance, translations take account of the hierarchy of concepts, etc, in the text to create effective mappings between languages (which are likely to attempt to minimise description length, without losing information).  Surely there must be better embeddings available?  

It seems like the vector embedding is only a small, first step towards something more 'meaningful'.

 -  Is this what the Huffman-style coding idea mentioned in Mikolov is getting at?



Used Google News corpus (6B words, only look at 1 million most common words)
Initial model sizing/checking done with just 30k most common words

3 training epochs, with learning rate tending to zero on notional 4th one
Found that using 1 epoch even better (assuming 3x as much data...)
Models took 1-3 CPU days to train

8 CPU weeks to train one competitor model

Microsoft Research Sentence Completion Challenge is similar to May-2015 Kaggle, but with multiple-choice answers, and external datasets allowed.



### Interesting


