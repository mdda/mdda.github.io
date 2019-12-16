---
date: 2019-12-19
title:  "PyTorch + TensorFlow"
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
and [the twenty-nineth MeetUp](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/267156109/) 
was again hosted by Google Singapore.

<!--
!-->

Sam's talk was a quick round-up of several interesting TensorFlow-related projects at Google  : "Jax, Trax and stax of new stuff".

We were glad to have Rachel Lim visiting us from Google Brain and talking about "TF2.0 performance".

My talk was originally intended to be "Porting PyTorch Models to the TensorFlow ecosystem".  However,
in doing background research into the subject, I came accross blog posts written by Singaporean Yu Xuan Lee, and
he generously agreed to give a talk about his work with ONNX at the MeetUp.

So, I "pivoted' : I had spent the previous weekend working on a TensorFlow Lite module, which 
would allow flexible and programmable graphing of metrics from TensorFlow (and PyTorch) modules within notebooks.
This became my new topic, with an extra twist of ...

...


In the talk, I
briefly discussed the kinds of problems that NSL can tackle, and quickly showed the blog/code 
for a supervised learning example.  For a simpler-to-read example, I then went through 
my updated version of Google adversarial learning example notebook for robustifying MNIST digit recognition.

The slides for my talk are here :

<a href="http://redcatlabs.com/2019-10-10_TFandDL_TF.probability/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2019-11-12_TFandDL_NSL_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2019-10-10_TFandDL_TF.probability/#/3/2" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2019-11-12_TFandDL_NSL_3-2_600x390.png)
</a>


PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

