---
layout: post
category: AI
title: Review of TensorFlow sugar coatings
tagline: Compare and Contrast
date: 2016-12-10
tags: [NeuralNetworks,TensorFlow]
published: true
---
{% include JB/setup %}


## Review of TensorFlow Sugar Coatings

>  NB:  This is an opinionated review, which I put together to help me make a decision.

As someone who has worked most extensively with ```Theano```/```Lasagne``` (with a bit of ```Blocks``` thrown in),
looking at raw ```TensorFlow``` makes me want to reach out for some additional helper 
layers.  There are lots of contenders, several of which are backed by Googlers, each 
with a different emphasis and style.

To help make the choice, I assembled a ('Rosetta Stone' of TensorFlow implementations of CNN MNIST](ai/2016/11/26/layers-on-top-of-tensorflow) 
using each of the libraries.


If there's anything wrong / inaccurate / highly-slanted in the following, please let me know in the comments - 
I'm just interested in making a decent choice to speed up my ```TensorFlow``` experimentation.


### Basic considerations

[Plain ```TensorFlow```](https://www.tensorflow.org/) itself is too raw : Something that would help smooth out the defaults, and 
figure out the sizing, etc would be useful.  Even better if there were several of the more
sophisticated modules prebuilt (Bi-LSTM, attention, dropout, sane initialisation, batch normalisation, etc).

[```Keras```](https://github.com/fchollet/keras), with ~10,000 stars and ~3,000 forks, is an obvious contender, however : 

*  Because it has switchable backends, Keras must effectively 'take over' the computational graph
*  While it is possible to add custom layers, that will require getting familiar with Keras' API, rather than
   using TensorFlow directly - particularly since the backend interfaces to layers are implemented 
   differently for ```Theano``` and ```TensorFlow```
*  However, I feel that getting access to the 'raw layers' may be helpful in some circumstances,
   which means that ```Keras``` is basically ruled out as a contender.
   

### Google-related offerings

*  [```TF-Slim```](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/contrib/slim) 
*  [```tf.contrib.learn``` aka ```skflow```](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/contrib/learn/python/learn)
*  [```PrettyTensor```](https://github.com/google/prettytensor) - ~800 stars, 80 forks

```TF-Slim``` is part of the main ```TensorFlow``` repo, and initially looked promising.  However,
it appears that the main [focus is on CNN applications](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/contrib/slim#layers) - 
and the breadth of other modules isn't really there.  For instance, 
there has been a [GitHub Issue](https://github.com/tensorflow/tensorflow/issues/5830) 
requesting an RNN implementation copied over from an [identical request opened over 6 months ago](https://github.com/tensorflow/models/issues/70) without
any positive response other than 'we (i.e. Google) will get to it soon' - which is pretty unhelpful for a nominally Open Source package.
Also, it looks like many function arguments are positional, which doesn't help readability.

```tf.contrib.learn``` goes to great lengths to make itself accessible to people familiar with ```scikit-learn```,
and presents a mich higher level for training.  But perhaps that makes it less interesting to me, 
since I'm more interested in a 'hands-on' experience, rather
than using the trained model as part of a bigger data pipeline (however attractive that proposition sounds).

```PrettyTensor``` is apparently produced by Googlers, but not in the official ```TensorFlow``` mainline.  One
very attractive feature is its chainable syntax, which makes it feel very *functional* in design.  On the other hand,
its documentation is very disheartening (which is such a pity, since if I went down this road,
I would certainly help in improving the documentation).  So, it's kind of a tipping point question,
and (at the moment) I'm just not close enough to the tipping point to make me think that this is 
going to be mainstream enough to want to be an early adopter.  Such a nice syntax, 
though...  Also noteworthy : Last commit was 6 months ago.



### Third-Party 

It seems that these candidates are external to Google, and may be more open to actual outside contributions:

*  [```TensorLayer```](http://tensorlayer.readthedocs.io/en/latest/)  - ~800 stars, 200 forks
*  [```TFlearn```](http://tflearn.org) (not ```tf.contrib.learn```)  - ~4,300 stars, 600 forks
*  [```sugartensor```](https://github.com/buriburisuri/sugartensor) - ~120 stars, 12 forks


```TensorLayer``` named arguments are good.  And there are recent commits (and has documentation both in English and Chinese, 
which is interesting).  Their own blurb :     

>   A frequent question regarding TensorLayer is that why do we develop this library instead of 
>   leveraging existing ones like Keras and Tflearn.  TensorLayer differentiates with those with its pursuits for 
>   flexibility and performance. A DL user may find it comfortable to bootstrap with Keras and Tflearn. These 
>   libraries provide high-level abstractions that completely mask the underlying engine 
>   from users.  Though good for using, it becomes hard to tune and modify from the bottom, 
>   which is necessary when addressing domain-specific problems (i.e., one model does not fit all).
>
>   In contrast, TensorLayer advocates a flexible programming paradigm where third-party neural network libraries can be used 
>   interchangeably with the native TensorFlow functions.  This allows users to enjoy the ease of using powerful 
>   pre-built modules without sacrificing the control of the underlying training process.  TensorLayer's noninvasive 
>   nature also makes it easy to consolidate with other wrapper libraries such as TF-Slim.  However, flexibility does not 
>   come with the loss of performance and heterogeneity support.  TensorLayer allows seamless distributed and heterogeneous 
>   deployment with its first-class support for the TensorFlow roadmap. 
>
>   TensorLayer is a major ongoing research project in Data Science Institute, Imperial College London.  TensorLayer contributors 
>   are from Imperial College, Tsinghua University, Carnegie Mellon University, Google, Microsoft, Bloomberg and etc. 

Looking at the code : ```TensorLayer``` consists of a number of rather long class-specific files.  Similarly to 
```Lasagne```, it operates on its own classes (such as ```Layer```) that can carry around sets of information
in addition to what ```TensorFlow``` itself uses.


```TFlearn``` has a very similar style to ```lasagne```, which (to me) rates as a good feature.  And the 
documentation site is a positive too.  Another positive claim : ```TFLearn``` is also intended to stay up-to-date 
with latest deep learning techniques.   And the GitHub repo has more traction than ```TensorLayer```.
However, it looks like many function arguments are positional, which doesn't help readability - and that may 
be a big deal.  

Looking at the code : ```TFlearn``` seems to be split into a decent hierarchy of modules.  More interestingly, many functions 
are structured as functions on ```tf.Tensor``` objects directly - not interposing its own object representations.  As such, 
it's purely a (large) set of helper functions for regular ```TensorFlow```.  This is captured in their statement : 

>   Full transparency over Tensorflow.  All functions are built over tensors and can be used independently of TFLearn.



```SugarTensor``` looks like a one-person project.  And it makes the 'interesting' choice of creating the 
sugaring functions directly on the ```TensorFlow``` Tensor objects.  The benefit of this is that regular
```TensorFlow``` code can be mixed-and-matched easily.  But the syntax also allows for chaining of 
methods (which is nice).  The examples directory consists of MNIST experiments done in lots of different architectures.
Documentation is basically 'read the code' (which is itself pretty terse because the sugaring magic is available 
on every tensor object...)



## Summary

Fairly quickly (for my use-case) I can discard ```tf.contrib.learn``` as being too high-level.  ```Keras``` is 
different from ```Lasagne``` in the same ways on ```Theano``` as it is vs my 'ideal' framework on ```TensorFlow``` 
(though I have to admit that a lot of good people are involved, so it certainly has momentum).

```prettytensor``` seems to have very few commits recently.  

Looking at 'raw' ```TensorFlow```, a lot of people are using ```TF-slim``` as just an extra toolkit on top, 
plus there are other contributions in ```tf.contrib.XXX``` which can sugar raw ```TensorFlow``` alongside ```TF-slim``` so 
probably the holes will be filled in soon enough.  But apparently that's not so soon that all the recent papers
are able to be implemented in it (at least in the public tree).  

Interestingly, according to a recent speaker at a [Google TensorFlow](https://www.meetup.com/GCPUGSG/events/235662088/) event, 
the TensorFlow GitHub mainline lags 1.5 days behind Google's internal repo.  Which is both (a) good, that it is so short, and (b) worrying,
given it indicates that Google is maintaining a separate code-base (rather than having their modifications in a 
sibling repo, overlaid on top).


That leaves ```TFlearn```, ```TensorLayer``` and ```SugarTensor```.  

Both ```TFlearn``` and ```TensorLayer``` occupy the same kind of level in a hierarachy of helper libraries as ```Lasagne``` does 
for ```Theano```.  However, since they seem to be basically neck-and-neck feature-wise, it's difficult to 
make a decision between them.  

Perhaps, to simplify the decision, I'll pick the wild-card and code a few things using ```SugarTensor```, since the 
chainability is attractive, and the person running development seems to be implementing the same selection of 
papers that I'd like to explore (and is ready to accept contributions).  Keeping close to base ```TensorFlow```, 
without committing to one of the other more imposing layer mechanisms, may be a decent interim step while 
getting familiar with ```TensorFlow``` mechanics.


#### Also found along the way...

*   [Autoencoders in TensorFlow](http://engineering.artifacia.com/opensourcing-libsdae-a-simple-tensorflow-based-library-for-deep-autoencoders/)
