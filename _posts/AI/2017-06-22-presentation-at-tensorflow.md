---
date: 2017-06-22
title: 'Captioning'
tagline: Presentation
category: AI
tags:
- Presentation
- TensorFlow
- Keras
- RNN
- CNN
- NLP
- Transformers
layout: post
published: true
---
{% include JB/setup %}


Sam Witteveen and I started the TensorFlow and Deep Learning Singapore group on MeetUp in February 2017,
and [the fifth MeetUp, aka 'Advanced Text'](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/240386386/),
was again hosted by Google.

This 30 minute talk (which was intended to last between 45 minutes and 1 hour, but was cut short due to others running long) 
included a [Keras version of a number of Captioning models](https://github.com/mdda/deep-learning-workshop/blob/master/notebooks/2-CNN/7-Captioning/4-run-captioning.ipynb")  :

*  Standard LSTM 
*  Dilated CNN (&aacute; la DeepMind)
*  CNN of Gated Linear Units (&aacute; la Facebook)
*  Attention-is-all-you-need (a very recent paper from Google)

The presentation also includes links to the relevant code at suitable points.

<a href="http://redcatlabs.com/2017-06-22_TFandDL_Captioning/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2017-06-22_TFandDL_Captioning_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2017-06-22_TFandDL_Captioning/#/13/4" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2017-06-22_TFandDL_Captioning_13-4_600x390.png)
</a>

### Video Link

The presentation was kindly [recorded by Engineers.sg](https://engineers.sg/video/advanced-text-language-captioning-tensorflow-and-deep-learning-singapore--1861).

### Data set

The notebook(s) in the Captioning section of the CNN folder require you to download the Flickr30k
dataset yourself, because there are license restrictions that prevent it from being shared freely.  Which is a pity.



PS:  And if you liked the Workshop, please 'star' the <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>


