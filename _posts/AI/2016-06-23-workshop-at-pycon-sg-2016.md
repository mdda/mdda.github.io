---
date: 2016-06-23
title: "PyConSG 2016 : Deep Learning Workshop"
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
published: true
---
{% include JB/setup %}


### Presentation Link

I recently lead a <strong><a href="http://redcatlabs.com/2016-06-23_PyConSG-Workshop/" target="_blank">92 minute workshop</a></strong> 
at [PyCon SG 2016](https://pycon.sg/schedule/presentation/94/) in Singapore.

This workshop was hands-on : After a brief background on deep learning, 
participants started quickly, interacting with offline experiments with a <a href="http://convnetjs.com/" target="_blank">ConvNet.js model</a>, and
also the <a href="http://playground.tensorflow.org/" target="_blank">TensorFlow Playground</a>.

But this on-line portion was partly to allow everyone enough time to get a ~1Gb VirtualBox "appliance" created for the event 
installed on their laptops.  Fortunately, over 90% of the people who came already had VirtualBox installed, which 
was a huge relief.

Once everyone was up-to-speed tools-wise, the workshop then progressed through a series of 
```Jupyter``` (fka ```iPython```) notebooks, ranging from Theano basics, through MNIST, to ImageNet networks 
(pretrained models of both ```GoogLeNet``` and ```Inception-v3``` were included in the VM).

Then, for the last half-hour, we went over an interesting application : Reinforcement Learning 
applied to the game "Bubble Breaker".  This application, built from the ground up for PyCon, illustrates
how simple it is to get Deep-Q-Learning working - with a 'small board' version being trainable in ~2-3 minutes on
participants' laptops.  A pretrained full-size model was also included in the VM, which now outperforms its creator...

Naturally, this being a FOSS event, all the source is available 
on <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">GitHub</a> - 
if you have questions on the software, please leave an 'issue' there.

PS:  And if you liked the Workshop, please 'star' the <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

<a href="http://redcatlabs.com/2016-06-23_PyConSG-Workshop/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2016-06-23_PyConSG-Workshop_600x390.png)
</a>

If there are any questions about the workshop please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2016-06-23_PyConSG-Workshop/#/17/9" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2016-06-23_PyConSG-Workshop_17-9_600x390.png)
</a>
