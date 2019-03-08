---
date: 2019-03-14
title:  "TF.summit highlights"
tagline: Presentation
category: AI
tags:
- Presentation
- TensorFlow
- NeurIPS
- NIPS
layout: post
published: false
---
{% include JB/setup %}



### Presentation Link

Sam Witteveen and I started the TensorFlow and Deep Learning Singapore group on MeetUp in February 2017,
and [the twenty-second MeetUp, aka TensorFlow and Deep Learning : NeurIPS and the Cutting Edge](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/259055570/),
was again hosted by Google Singapore.

At the Meetup, Sam talked about "Advances in Unsupervised and Self Supervised Learning", which
we felt was a particularly interesting trend at the conference.

We were also lucky enough to get Sumit Bam Shrestha, a researcher from NUS, to present on his NeurIPS paper : "SLAYER for Deep Spiking Neural Network".
Surprisingly, this was the first time we've discussed spiking neural networks (or really any truly biologically-inspired network) at our MeetUp.

For my part, I gave a talk titled "NeurIPS Lightning Talks", which discussed three topics (two from NeurIPS) in a "Lightning Talk" style.  


<!--

TF.summit notes ::


Nice stuff at  :

*  TensorFlow 2.0 now alpha.  RC in "spring"
*  TensorFlow Lite (soon : Keras functions for sparsification and quantisation)
*  Swift (though no SavedModel yet)
*  TensorFlow Probability
*  UniRoma in Codice Ratio



---------

 9:50 : 5-minute talks
        -  Ultrasound
        -  tf.jl  Julia
        -  NetEase.cn (AR translation, inc. offline, in TF.lite)
        -  Uber (tf.js debugging tool : "Manifold")
        -  Alibaba.cn (AI Cloud, inc TAO optimizer & FPGA)
        -  tf.lattice (monotonicity guarantee for models)  https://arxiv.org/pdf/1709.06680.pdf
        -  Unicode and ragged tensors (tf.ragged)
        -  Education (teachable machine, move mirror, PoseNet) : AI experiments
        
10:45 : 
    Hacker Room
 
11:15 :    TF2.0 and porting models

12:00 : Lunch with Community contributions panel

 1:15 : Research and the Future
        -  Exascale (FP16) weather prediction
        -  Federated learning (tf/federated)
        -  Mesh TF (TPU pods)   (for 1.13, TODO=2.0)
           -  Noam built 5Bn Transformer model (512 TPUv2 pod) 
              -  1bn perp 23.5  
              -  WMT14 en-fr 14.2?
        -  Sonnet : pip install dm-sonnet
           -  DeepMind was torch7-based
           -  TF better for distributed processing
           -  All done for research usage (ignore production)
           -  Setups (modules shared between all)
              -  2 for (un)supervised learning
              -  4 for reinforcement learning
              -  N for custom (eg: AlphaStar)
           -  "Sonnet2" : tf.Module (stateful container)
              -  multiple forward methods
              -  name scoping
           -  Replication of data (~ DistributionStrategy )
           -  Beta release "in the summer"
              -  BigGAN is in Sonnet (TPU pod)
              -  AlphaStar (v. custom training cycles)
              

---------

tf.data : 
  -  Is on-the-fly BPE realistic
  -  Is on-the-fly word replacement realistic
  
TensorBoard
  -  TPU performance monitor?

TF.jl :  
  -  vs. Swift?

tf.ragged : 
  -  TPUs?
  -  tf.data on-the-fly

Estimators can do multi-node async (regular tf.keras cannot)
  and are effectively a way of getting ParameterServerStrategy *now*

Example : How is this efficiently using a dataset?
    for inputs, labels in train_data:
        train_step(inputs, labels)


---------

NetEase: Course

!-->


The slides for my talk are here :

<a href="http://redcatlabs.com/2019-02-26_TFandDL_NeurIPS/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2019-02-26_TFandDL_NeurIPS_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2019-02-26_TFandDL_NeurIPS/#/3/1" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2019-02-26_TFandDL_NeurIPS_3-1_600x390.png)
</a>


PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

