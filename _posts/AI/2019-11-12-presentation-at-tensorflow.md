---
date: 2019-11-12
title:  "TensorFlow World Highlights"
tagline: Presentation
category: AI
tags:
- Presentation
- TensorFlow
- Probability
- Hyperparameters
layout: post
published: false
---
{% include JB/setup %}



### Presentation Link

Sam Witteveen and I started the TensorFlow and Deep Learning Singapore group on MeetUp in February 2017,
and [the twenty-eighth MeetUp, aka TensorFlow 4K](),
was hosted by Google Singapore, and recapped the TensorFlow World event we attended in Silicon Valley at the end of October.  

<!--

Need to read : 
  Text to text transfer transformer from Google  (potential for Sam at next TF&DL)
    https://github.com/google-research/text-to-text-transfer-transformer
Potential topic :
  MelGAN 
    http://swpark.me/melgan/
  Neural Structured Learning (NSL): Training with Structured Signals
    https://www.tensorflow.org/neural_structured_learning
    Looks v. promising
    
    
Aurelien to talk "Intro to Apache Beam" and 
  might give a couple TensorFlow examples including TF Datasets and TF Transform
  == "Preprocessing large datasets with Apache Beam and TF Transform"

Sam talk on T5 + BART (maybe) or "Hey GPT2"



!-->

We were also delighted to welcome Yew Ken Chia as a new speaker at the TF&amp;DL MeetUp : He
gave a presentation describing the research that he did on the TextGraphs-19 Shared Task, 
successfully submitted to the upcoming EMNLP-2019 Textgraphs workshop in HongKong : "Explanations for School Science Questions".

Sam's talk was a preview of the talk that he'll be giving at the 2019 TensorFlow World summit in 
California at the end of October : "Training Models at Scale with TPUs: Donuts, Pods and Slices".

My talk was touted as being about Hyperparameter Optimisation (using TF.probability), but
it seemed natural to me to introduce the ideas of TF.probability by way of regression in stages : 

*  Regular L2 linear regression
*  N(mx+c, sigma=1) regression on max-loglikelihood
*  N(mx+c, sigma=ax+d) regression on max-loglikelihood
*  Gaussian Processes for regression

That was then followed up by using Gaussian Processes to determine where to sample good Learning Rates 
for SGD trainings of a CIFAR10 model.  Hopefully, it made sense to the audience...

The slides for my talk are here :

<a href="http://redcatlabs.com/2019-10-10_TFandDL_TF.probability/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2019-10-10_TFandDL_TF.probability_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2019-10-10_TFandDL_TF.probability/#/5/1" target="_blank">
<img src="/assets/img/2019-10-10_TFandDL_TF.probability_NB2_600x390.png" alt="Presentation Content Example" style="border:1px solid #000000" />
</a>


PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

