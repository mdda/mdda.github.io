---
layout: post
category: AI
title: Layers on top of TensorFlow - Summary
tagline: Compare and Contrast
date: 2016-11-27
tags: [NeuralNetworks,TensorFlow]
published: false
---
{% include JB/setup %}


## Review of TensorFlow Sugar Coatings

>  NB:  This is an opinionated review, which I put together to help me make a decision.


As someone who has worked most extensively with ```Theano```/```Lasagne``` (with a bit of ```Blocks``` thrown in),
looking at raw ```TensorFlow``` makes me want to reach out for some additional helper 
layers.  There are lots of contenders, several of which are backed by Googlers, each 
with a different emphasis and style.


### Basic considerations

```TensorFlow``` itself is too raw : Something that would help smooth out the defaults, and 
figure out the sizing, etc would be useful.  Even better if there were several of the more
sophisticated modules prebuilt (Bi-LSTM, attention, dropout, sane initialisation, batch normalisation, etc).

```Keras``` is an obvious contender, however : 

*  Because it has switchable backends, Keras much effectively 'take over' the computational graph.
*  However, I feel that getting access to the 'raw layers' may be helpful in some circumstances,
   which means that ```Keras``` is basically ruled out as a contender.
   

### Google-related offerings

*  ```TF-Slim```
*  ```PrettyTensor```
*  ```tf.contrib.learn```  aka ```skflow```

```TF-Slim``` is part of the main ```TensorFlow``` repo, and initially looked promising.  However,
it appears that the main focus is on CNN applications - and the breadth of other modules isn't really there.
For instance, there has been an Issue requesting an RNN implementation open for the last 6 months without
any positive response other than 'we (i.e. Google) will get to it soon' - which is pretty unhelpful for a nominally Open Source package.
Also, it looks like many function arguments are positional, which doesn't help readability.

```PrettyTensor``` is apparently produced by Googlers, but not in the official ```TensorFlow``` mainline.  One
very attractive feature is it's chainable syntax, which makes it feel very *functional* in design.  On the other hand,
its documentation is very disheartening (which is such a pity, since if I went down this road,
I would certainly help in improving the documentation).  So, it's kind of a tipping point question,
and (at the moment) I'm just not close enough to the tipping point to make me think that this is 
going to be mainstream enough to want to be an early adopter.  Such a nice syntax, 
though...  Also noteworthy : Last commit was 6 months ago.

```tf.contrib.learn``` goes to great lengths to make itself accessible to people familiar with ```scikit-learn```.  But
perhaps that makes it less interesting to me, since I'm more interested in a 'hands-on' experience, rather
than using the trained model as part of a bigger data pipeline (however attractive that proposition sounds).



### Third-Party 

*  ```TFlearn```
*  ```TensorLayer```


```TFlearn``` has a very similar style to ```lasagne```, which rates as a positive feature.  And the 
documentation site is a positive too.  Another positive claim : TFLearn is also intended to stay up-to-date 
with latest deep learning techniques.   However, it looks like many function arguments are positional, which doesn't help readability.
On the plus side, the GitHub repo has more traction than ```TensorLayer```.

```TensorLayer``` named arguments are good.  And there are recent commits (and documentation in Chinese, 
which is interesting).  Their own blurb :     

>   A frequent question regarding TensorLayer is that why do we develop this library instead of leveraging existing ones like Keras and Tflearn. TensorLayer differentiates with those with its pursuits for flexibility and performance. A DL user may find it comfortable to bootstrap with Keras and Tflearn. These libraries provide high-level abstractions that completely mask the underlying engine from users. Though good for using, it becomes hard to tune and modify from the bottom, which is necessary when addressing domain-specific problems (i.e., one model does not fit all).
>
>  In contrast, TensorLayer advocates a flexible programming paradigm where third-party neural network libraries can be used interchangeably with the native TensorFlow functions. This allows users to enjoy the ease of using powerful pre-built modules without sacrificing the control of the underlying training process. TensorLayer's noninvasive nature also makes it easy to consolidate with other wrapper libraries such as TF-Slim. However, flexibility does not come with the loss of performance and heterogeneity support. TensorLayer allows seamless distributed and heterogeneous deployment with its first-class support for the TensorFlow roadmap. 
>
>  TensorLayer is a major ongoing research project in Data Science Institute, Imperial College London. TensorLayer contributors are from Imperial College, Tsinghua University, Carnegie Mellon University, Google, Microsoft, Bloomberg and etc. 


