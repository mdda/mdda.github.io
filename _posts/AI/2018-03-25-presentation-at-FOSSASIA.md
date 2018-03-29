---
date: 2018-03-25
title: Deep Learning DIY
tagline: Presentation
category: AI
tags:
- Presentation
- ImageNet
- TransferLearning
- MetaLearning
- OneShotLearning
- Reptile
- FOSSASIA
layout: post
published: true
---
{% include JB/setup %}



### Presentation Link

I recently lead a <strong><a href="http://redcatlabs.com/2018-03-25_FOSSASIA-Workshop/" target="_blank">
1 hour workshop</a></strong> at [FOSSASIA 2018](http://2018.fossasia.org/) in Singapore.

Similar to the previous year, this workshop was hands-on : It included a couple of 
examples in Javascript (rebuilt to run locally, to avoid network problems), followed
by the use of a VirtualBox pre-configured linux image (somthing that has proven
to be a good way of getting everyone in a workshop up-and-running with the minumum
of hassle, and the maximum amount of preinstalled notebooks, models and data - with zero
interaction with the WiFi / internet).

Using the updated VirtualBox VM-on-a-stick, we had a quick look at a working NASNet model.  And then went
on showing how transfer learning can work.  That essentially covered the
first two sections of the talk : Learning with lots of data; and Learning with some data.

For the second half of this FOSSASIA workshop, I introduced meta-learning, with the 
emphasis on one-shot learning, to show how models can be learned from very little data.  This
topic was prompted by the publication (3 weeks earlier) of the OpenAI "Reptile" paper,
and the VM included an updated version of the reptile-sines code.

I also (re-)created a <a href="http://redcatlabs.com/2018-03-25_FOSSASIA-Workshop/MetaLearning-demo.html" target="_blank">
stand-alone Reptile one-shot learning demo</a>, so that people could get an intuitive understanding of what
a test example for the meta-learning task look like, without being connected to the internet (and without
needing the VirtualBox VM running).

Naturally, this being a FOSS event, all the source is available 
on <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">GitHub</a> - 
if you have questions on the software, please leave an 'issue' there.

<a href="http://redcatlabs.com/2018-03-25_FOSSASIA-Workshop/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2018-03-25_FOSSASIA-Workshop_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2018-03-25_FOSSASIA-Workshop/MetaLearning-demo.html" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2018-03-25_FOSSASIA-Workshop_3boxes_600x390.png)
</a>


### Video Link

The presentation was kindly <a href="https://engineers.sg/video/deep-learning-d-i-y-workshop-fossasia-2018--2455" target="_blank">recorded by Engineers.sg</a>.


PS:  And if you liked the Workshop, please 'star' the <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>




