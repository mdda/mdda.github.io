---
layout: post
category: AI
title: Unsupervised Learning
tagline: Google Reddit AMA (2017)
date: 2017-09-27
tags: [NeuralNetworks,Research]
published: false
---
{% include JB/setup %}

The Google Brain team recently did a [Reddit AMA](https://www.reddit.com/r/MachineLearning/comments/6z51xb/we_are_the_google_brain_team_wed_love_to_answer/), 
and I thought some comments were particularly interesting / crunchy.

## Google AMA : Research topics

####  Failures in DL :
(Question asked by ```dexter89_kp```)

*   Everyone talks about successes in the field of ML/AI/DL. 
*   Could you talk about some of the failures, or pain points you have encountered 
    in trying to solve problems (research or real-world) using DL?
*   Bonus if they are in the large scale supervised learning space, 
    where existing DL methods are expected to work.

Answer by Google Brain's [```vincentvanhoucke```](https://research.google.com/pubs/VincentVanhoucke.html) : 

>A few of us tried to train a neural caption generator on New Yorker cartoons in collaboration with Bob Mankoff, 
the cartoon editor of the New Yorker (who I just saw has a NIPS paper this year). 
It didn’t work well. It wasn’t even accidentally funny. 
We didn’t have much data by DL standards, though we could pre-train the visual representation on other types of cartoons. 
I still hope to win the contest one day, but it may have to be the old-fashioned way. 
      
Answer by Google Brain's [```gcorrado```](https://research.google.com/pubs/GregCorrado.html) : 

>I’m always nervous about definitively claiming that DL “doesn’t work” for such-and-such. 
For example, we tried pretty hard to make DL work for machine translation in 2012 and couldn’t get a good lift... 
fast forward four years and it’s a big win. 
We try something one way, and if it doesn’t work we step back, take a breath, 
and maybe try again with another angle. 
>      
>You’re right that shoehorning the problem into a large scale supervised learning problem is half the magic. 
From there its data science, model architecture, and a touch of good luck. 
But some problems can’t really ever be captured as supervised learning over an available data set -- 
in which case, DL probably isn’t the right hammer.


#### Biggest hurdles : 
(Question asked by ```bmacswag```)

*    What are the next biggest hurdles you think face the field?

Answer by Google Brain's [```vincentvanhoucke```](https://research.google.com/pubs/VincentVanhoucke.html) : 

>Making deep networks amenable to (stable!) online updates 
from weakly supervised data is still a huge problem. 
Solving it would enable true lifelong learning and open up many applications. 
>
>Another huge hurdle is that many of the most exciting developments in the field, 
like GANs or Deep RL, have yet to have their ‘batch normalization’ moment: 
the moment when suddenly everything ‘wants to train’ by default 
as opposed to having to fight the model one hyperparameter at a time. 
>
>They still lack the maturity that turns them from an interesting research direction 
into a technology that we can rely on; 
right now we can’t train these models predictably without a ton of precise tuning, 
and it makes it difficult to incorporate them into more elaborate systems.

####  NonStandard ideas : 
(Question asked by ```Dizastr```)

*    Are there any non-standard (or not popular) approaches to A.I / Machine Learning 
    that you are researching or believe are worth exploring further?

Answer by Google Brain's [```vincentvanhoucke```](https://research.google.com/pubs/VincentVanhoucke.html) : 

>Feedback! It's insane to me that we've gotten this far with pure feedforward approaches. 
Dynamical systems are very efficient, adaptive learning machines.
>      
>*Do you have specific examples of what you mean? RNNs are pretty popular, as is reinforcement learning, but I get the impression you aren't talking about those?*
>
>RNNs are not 'loopy', they still propagate information only in one direction: 
if there is any feedback, it comes from outside the learner. 
Contrast e.g. with Markov nets, where information is propagated in both directions within the model.


### Comment

*  The feedback idea is interesting - and potentially links up with Geoff Hinton's recent comment 
about Backpropagation needing a bit of a rethink.




### Meta-Comment




{% include custom/comment_copyright %}

