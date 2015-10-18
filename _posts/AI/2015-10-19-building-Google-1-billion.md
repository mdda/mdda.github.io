---
layout: post
category: AI
title: Building Google's 1 Billion word corpus
tagline: Kaggle's version is identical
date: 2015-10-19
tags: [NeuralNetworks,Corpus]
published: true
---
{% include JB/setup %}



### Google Corpuses

*   n-grams : (http://storage.googleapis.com/books/ngrams/books/datasetsv2.html)

*   1 billion words
    +   (http://www.statmt.org/lm-benchmark/)
    +   (https://github.com/ciprian-chelba/1-billion-word-language-modeling-benchmark)
  


Building the 1 billion word corpus from source
---------------------------------------------------------------

Building Google's 1-billion-word language modelling benchmark is much more involved than expected, 
and also contains a large number of duplicate sentences.  When removed, the number of words in the corpus is reduced from 2.9G to 0.8G.

OTOH, the checksums proved that the process was going Ok, even though the line-by-line aggregate produced
mid-way seemed to have extra double-quotation marks at the beginning of each line.

{% highlight bash %}
pushd data/0-orig-1-billion  

git clone https://github.com/ciprian-chelba/1-billion-word-language-modeling-benchmark.git
cd 1-billion-word-language-modeling-benchmark/tar_archives

wget http://statmt.org/wmt11/training-monolingual.tgz

cd ..
ls -l tar_archives/
#-rw-rw-r--. 1 andrewsm andrewsm 10582262657 Feb 24  2011 training-monolingual.tgz
md5sum tar_archives/training-monolingual.tgz 

tar --extract -v --file tar_archives/training-monolingual.tgz --wildcards training-monolingual/news.20??.en.shuffled
md5sum training-monolingual/*

mkdir tmp.tmp

## Now build the corpus files :
TMPDIR=tmp.tmp ./scripts/get-data.sh 

#real	37m33.908s
#user	63m49.485s
#sys	0m17.388s

rmdir tmp.tmp

more training-monolingual.tokenized.shuffled/news.en-00001-of-00100
#more heldout-monolingual.tokenized.shuffled/news.en-00000-of-00100  ## ignore
head heldout-monolingual.tokenized.shuffled/news.en.heldout-00000-of-00050 

cat training-monolingual.tokenized.shuffled/news.en-* > training-monolingual.tokenized.shuffled.all
wc training-monolingual.tokenized.shuffled.all
#  30,301,028  768,646,526 4,147,291,308 training-monolingual.tokenized.shuffled.all

cat heldout-monolingual.tokenized.shuffled/news.en.* > heldout-monolingual.tokenized.shuffled.all
wc heldout-monolingual.tokenized.shuffled.all 
#  306,688  7,789,987 42,021,857 heldout-monolingual.tokenized.shuffled.all

rm -r training-monolingual
rm -r training-monolingual.tokenized
rm -r training-monolingual.tokenized.shuffled

rm -r heldout-monolingual.tokenized.shuffled

popd
{% endhighlight %}

All that being done, the version produced ends up *IDENTICAL* (eg: same ```md5sum```) to the version issued by Kaggle 
for their [1 Billion Word Imputation competition](https://www.kaggle.com/c/billion-word-imputation/data).
I should really submit a PR that points that out to the corpus' GitHub README...


