---
date: 2021-12-16
title:  "Back to Basics 03"
tagline: Presentation
category: AI
tags:
- Presentation
- Machine Learning
- Back to Basics
- Transformers
- BERT
- NLP
- GDSC
layout: post
published: true
---
{% include JB/setup %}


### Presentation Link

In universities and colleges around the world, Google has encouraged the 
creation of "Google Developer Student Clubs".  To round out the year, 
Sam Witteveen and I decided to offer our three-part "Back-to-Basic" series 
to clubs in the South-East Asia region, to introduce them to TensorFlow and Deep Learning.

This session was the third in the three-part series, and focused 
on Deep Learning for Natural Language Processing using Transformers 
(which is unusual for an introductory course, 
but is more 'current' than choosing the standard 'WordEmbeddings+RNNs' approach).  

Our presentation was in two parts:

*  My initial talk, that :
   +  Gave a brief outline of the use-cases for Transformers for NLP tasks
   +  Introduced two new Layers : Tokenisation and Transformer
   +  Outlined the BERT task, and how we could then apply Transfer Learning
   
*  Sam did a Code-Along using Google Colab, where he lead the audience through :
   +  Loading and preparing an App review dataset
   +  Building a TensorFlow (Hugging Face) BERT Classifier
   +  Fine-tuning the model on our dataset, and looking at the outputs


The slides for my talk are here :

<a href="https://redcatlabs.com/2021-12-16_GDSC_Basics-BERT/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2021-12-16_GDSC_Basics-BERT_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="https://redcatlabs.com/2021-12-16_GDSC_Basics-BERT/#/9/3" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2021-12-16_GDSC_Basics-BERT_9-3_600x390.png)
</a>


PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

