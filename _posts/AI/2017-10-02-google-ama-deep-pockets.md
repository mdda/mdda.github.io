---
layout: post
category: AI
title: Deep Pockets
tagline: Google Reddit AMA (2017)
date: 2017-10-02
tags: [NeuralNetworks,Research]
published: true
---
{% include JB/setup %}

The Google Brain team recently did a [Reddit AMA](https://www.reddit.com/r/MachineLearning/comments/6z51xb/we_are_the_google_brain_team_wed_love_to_answer/), 
and I thought some comments were particularly interesting / crunchy.


## Google AMA : Deep Pockets

####  Google's deep pockets :
(Question asked by ```EdwardRaff```)
  
*   With companies like Google putting billions into AI/ML research, 
    some of it comes out using resources that others have no hope of matching -- 
    AlphaGo being one of the highest profile examples. 
*   The \[AlphaGo\] paper noted nearly 300 GPUs being used to train the model. 
*   Considering that the first model likely wasn't the one that worked, 
    and parameter searches when it takes 300 GPUs to train a single model, 
    we are talking about experiments with 1000s of GPUs for a single item of research. 
*   ... ?

Answer by Google Brain's [```vincentvanhoucke```](https://research.google.com/pubs/VincentVanhoucke.html) : 

>I published something a bit rant-y on the topic here : 
>      
>        I often hear researchers complaining how Google tends to publish a lot about large-scale, 
>        comparatively dumb approaches to solving problems. 
>        
>        Guilty as charged: think about ProdLM and 'stupid backoff', or the 'billion neuron' cat paper, 
>        AlphaGo, the more recent work on obscenely large mixture of experts or the large-scale 
>        learning-to-learn papers.
>        
>        The charges levied against this line of work is that they're inefficiently using large 
>        amounts of resources,  not being 'clever', and that nobody else can reproduce them as a result. 
>        
>        But that's exactly the point!! 
>        
>        The marginal benefit of us exploring the computational regimes that every other academic lab 
>        can do just as well is inherently limited. 
>
>        Better explore the frontier that few others have the resources to explore: 
>
>        *  what happens when we go all out; 
>        *  try the simple stuff first, and then if it looks promising we can work backwards 
>           and make it more efficient. 
>        
>        ProdLM gave us the focus on data for machine translation that made production-grade 
>        neural MT possible. The 'cat paper' gave us DistBelief and eventually TensorFlow. 
>        
>        That's not waste, that's progress.
>
>Many great developments started as crazy expensive research, 
and became within everyone’s reach once people knew what was possible and started optimizing them. 
The first deep net to ever go into production at Google (for speech recognition) took months to train, 
and was 100x too slow to run. 
>
>Then we found tricks to speed it up, improved (and open-sourced) our deep learning infrastructure, 
and now everybody in the field uses them. SmartReply was crazy expensive, until it wasn’t. 
>
>The list goes on. 
>
>It’s important for us to explore the envelope of what’s possible, 
because the ultimate goal isn’t to win at benchmarks, it’s to make science progress.


#### Importance of Data : 
(Question asked by ```MithrandirGr```)

*   Arguably, Deep Learning owes its success to the abundance of data and computing power 
    most companies such as Google, Facebook, Twitter, etc. have access to. 
*   Does this fact discourage the democratization of Deep Learning research? 
*   And, if yes, would you consider bridging this gap in the future by investing 
    more in the few-shot learning part of research?

     
Answer by Google Brain's [```gcorrado```](https://research.google.com/pubs/GregCorrado.html) : 

>More data rarely hurts, but it’s a game of diminishing returns. 
Depending on the problem you are trying to solve (and how you’re solving it) 
there’s some critical volume of data to get to pretty good performance...  from 
there redoubling your data only asymptotically bumps prediction accuracy. 
>
>For example, in our paper on detecting diabetic retinopathy we published 
this curve which shows that for our technique, 
prediction accuracy maxed out at a data set that was 50k images -- 
big for sure, but not massive. 
>
>The take home should be that data alone isn’t an effective barrier to entry on most ML problems. 
And the good news is that data efficiency and transfer learning are only moving these curves to the right -- 
fewer examples to get to the same quality. 
>
>New model architectures, new problem framings, 
and new application ideas are where the real action is going to be, IMHO.


### Comment

*  I'd also noticed the pattern of using excessive computation to prove that something was possible, 
   followed by interation and innovation to make the model reasonably tractable.
   
*  In this light, it isn't the spectacle of huge resources being applied to a problem that is the 
   main result - it's the proof-of-concept : Essentially the initial paper gives the green light to 
   further experimentation, safe in the knowledge that the battle can be won using more resources.
   
*  With respect to the availability of data : In many applications, the 0-to-1 breakthrough doesn't
   need a huge dataset.  After a certain point, the benefits of increasing training data size quickly
   diminish (for instance, Jeff Dean mentioned that Google Translate currently uses only 1/6th of the
   training data available).

{% include custom/comment_copyright %}

