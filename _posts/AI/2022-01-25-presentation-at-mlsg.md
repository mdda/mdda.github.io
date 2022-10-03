---
date: 2022-01-25
title:  "RETRO vs LaMDA - Clash of the Transformers"
tagline: Presentation
category: AI
tags:
- Presentation
- Machine Learning
- Transformers
- RETRO
- LaMDA
layout: post
published: true
---
{% include JB/setup %}


### Presentation Link

Sam Witteveen and I started the Machine Learning Singapore Group (or MLSG for short) 
on MeetUp in February 2017 (it was previously named "TensorFlow and Deep Learning Singapore"),
and [the thirty-sixth MeetUp](https://www.meetup.com/Machine-Learning-Singapore/events/283196929) 
was our first in 2022, and was inspired by our attendence at the NeurIPS conference in December.

The meetup was titled "NeurIPS and the State of Deep Learning", and was in two parts:

*  "State of Generative Modeling" - Sam :
   +  Current state of Generative Modeling, including :
      -  New GAN techniques
      -  Diffusion approaches
      -  MultiModal models 
      -  .. and other interesting forms of generative modeling

*  "RETRO vs LaMDA : Clash of the Transformers" - Martin :
   +  Google released a paper about the LaMDA dialog model last night...
      -  So this talk supercedes the "Sparsity and Transformers" talk that was previously on the line-up
   +  The talk covered previous iterations of 'large LMs'
      -  And then explored DeepMind's new RETRO model
      -  And Google's (very) new LaMDA model - including
         + The overall model structure, datasets and training
         + The focus on safety and groundedness
         + The 'tricks' used to enable fine-tuning data to significantly improve its performance

There's a [video of me doing the talk on YouTube](https://youtu.be/gwlI7J54Ng0).  Please Like and Subscribe! 


The slides for my talk are here :

<a href="https://redcatlabs.com/2022-01-25_MLSG_RETRO-vs-LaMDA/#/lamda-talk" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2022-01-25_MLSG_RETRO-vs-LaMDA_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="https://redcatlabs.com/2022-01-25_MLSG_RETRO-vs-LaMDA/#/16/1" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2022-01-25_MLSG_RETRO-vs-LaMDA_16-1_600x390.png)
</a>



#### GCP Discussion

In the discussion / Q&amp;A session after the two talks, one topic that arose was how to 
migrate from the somewhat quirky Colab plaform, to something based on GCP - 
so I pointed to [my blog post to do exactly that]({{ site.url }}/oss/2021/10/10/gcp-deep-learning-as-local), 
and explained that this 'GCP machine as local GPU' worked so well that I had recently sold my
local GPU (Nvidia Titan X 12Gb, Maxwell), and migrated onto GCP.  One benefit 
(apart from all-in cost) has also been the ability to seamlessly upgrade to a larger GPU set-up
once the code works, without having to make an infrastructure changes (i.e. disk can be brought up on a larger
machine near instantly).  

I should also give a shout-out to Google for helping this process 
by generously providing Cloud Credits to help get this all implemented.



PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

