---
date: 2017-05-25
title: 'Text and RNNs'
tagline: Presentation
category: AI
tags:
- Presentation
- TensorFlow
- Keras
- RNNs
- NER
- NLP
layout: post
published: true
---
{% include JB/setup %}


Sam Witteveen and I recently started the TensorFlow and Deep Learning Singapore group on MeetUp,
and [the forth MeetUp](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/238584480/) 
was again hosted by Google.

This talk included a 
<a href="https://github.com/mdda/deep-learning-workshop/blob/master/notebooks/5-RNN/6-RNN-Tagger-keras.ipynb" target="_blank">
TensorFlow version of the Upper Case NER notebook</a> that was already in the 
deep-learning-workshop repo - and I have to admit, the overall example is again better in the TF version,
because I teased out some details along the way, including adding a 
<a href="https://github.com/mdda/deep-learning-workshop/blob/master/notebooks/5-RNN/5-Text-Corpus-and-Embeddings.ipynb" target="_blank">
full data downloader notebook</a> that enables the models to be used stand-alone.

The presentation also includes links to the relevant code at suitable points.

<a href="http://redcatlabs.com/2017-05-25_TFandDL_TextAndRNNs/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2017-05-25_TFandDL_TextAndRNNs_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2017-05-25_TFandDL_TextAndRNNs/#/5/1" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2017-05-25_TFandDL_TextAndRNNs_5-1_600x390.png)
</a>


### Video Link

The presentation was kindly <a href="https://engineers.sg/video/rnn-and-text-tensorflow-and-deep-learning-singapore--1743" target="_blank">recorded by Engineers.sg</a>.


### Refactoring

By the way, the deep-learning-workshop repo is undergoing some major refactoring.  The aim is to 
make the individual examples work in a stand-alone fashion (downloading the necessary dependencies) while
the assembled-into-a-VM still works with everything pre-loaded. 

That means that downloading an individual notebook and stepping through it should *just work*.  If it doesn't 
please let me know, and I'll prioritorize fixing it.

PS:  And if you liked the Workshop, please 'star' the <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>


