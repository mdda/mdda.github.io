---
date: 2019-10-10
title:  "TensorFlow . Probability"
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
and [the twenty-seventh MeetUp, aka TensorFlow 4K](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/265374455/),
was hosted by Google Singapore, and celebrated the TensorFlow Group acheiving over 4000 members!  

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
![Presentation Content Example]({{ site.url }}/assets/img/2019-10-10_TFandDL_TF.probability_NB2_600x390.png)
</a>


PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

