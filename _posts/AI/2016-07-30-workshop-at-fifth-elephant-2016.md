---
date: 2016-07-11
title: "Fifth Elephant : Deep Learning Workshop"
tagline: Presentation
category: AI
tags:
- Presentation
- Workshop
- NeuralNetworks
- theano
- lasagne
- VirtualBox
layout: post
published: false
---
{% include JB/setup %}


### Fifth Elephant Workshop : Going International

Apparently, my [PyCon SG 2016](/ai/2016/06/23/workshop-at-pycon-sg-2016) talk attracted international interest!

So, I've been invited to give a day-long (6-hour) workshop as part of the [Fifth Elephant DataScience conference](https://fifthelephant.in/2016/) in 
Bangalore, India.  The conference itself is Thursday/Friday 28/29 July 2016, and the workshop will be on the
weekend immediately afterwards (i.e. Saturday, 30 July 2016).

Although I normally just put up links to presentation materials here, it has been 'suggested' by the 
organisers that I write a little about the Workshop contents, target audience etc.  


### The Workshop 'Pitch'




### The Workshop Content

This workshop is going to be hands-on : 

*  After a brief background on deep learning, participants will dive right in, interacting with offline experiments 
with a <a href="http://convnetjs.com/" target="_blank">ConvNet.js model</a>, and
also the <a href="http://playground.tensorflow.org/" target="_blank">TensorFlow Playground</a>.

*  But this on-line portion is partly to allow everyone enough time to get the ~1.3Gb VirtualBox "appliance" 
created for the event installed on their laptops.  Having a laptop with VirtualBox pre-installed is a requirement for 
this workshop.  But the plus-side is that when the VirtualBox image is running, no further fiddling with Python, etc is required.

*  Once everyone is up-to-speed tools-wise, the workshop progresses through a series of 
```Jupyter``` (fka ```iPython```) notebooks, ranging from Theano basics, through MNIST, to ImageNet networks 
(pretrained models such as ```GoogLeNet``` and ```Inception-v3``` are included in the VM).

*  But then we'll go on to some specific applications, which will take 30 mins-1 hour each.

   *   Each application will start with an explanation of the general 'problem'
   
   *   and then the workshop will dive into pre-built deep learning (partial?) solutions
   
   *   There will be ample time for people to have questions answered (or figure things out for themselves) 
   
Currently, the application list is planned to be : 

*  Anomaly detection

*  Applying a pre-trained model to classify images into previously unseen classes

*  Art ‘Style-Transfer’

*  Reinforcement Learning (inspired by AlphaGo)

I'd also like to have something concrete to plan with on the RNN front (this is currently a work-in-progress)...


### Who should come




### Open Source Cred

The source is available on <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">GitHub</a> - 
if you have questions on the software, please leave an 'issue' there.

PS:  And if you liked the Workshop, please 'star' the <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>
