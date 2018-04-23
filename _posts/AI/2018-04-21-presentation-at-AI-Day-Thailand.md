---
date: 2018-04-21
title: Learn to Learn to Learn
tagline: Presentation
category: AI
tags:
- Presentation
- ImageNet
- TransferLearning
- MetaLearning
- OneShotLearning
- Reptile
- AIDay
layout: post
published: false
---
{% include JB/setup %}



### Presentation Link

I recently lead a <strong><a href="http://redcatlabs.com/2018-04-21_AI-Day-Thailand/" target="_blank">
1 hour workshop</a></strong> at [the 2018 AI Day](http://redcatlabs.com/2018-04-21_AI-Day-Thailand/#/) in Thailand.



we had a quick look at a working NASNet model.  And then went
on showing how transfer learning can work.  That essentially covered the
first two sections of the talk : Learning with lots of data; and Learning with some data.

For the second half of the talk, I introduced meta-learning, with the 
emphasis on one-shot learning, to show how models can be learned from very little data.  This
topic was prompted by the publication (3 weeks earlier) of the OpenAI "Reptile" paper,
and the VM included an updated version of the reptile-sines code.

I also (re-)created a <a href="http://redcatlabs.com/2018-04-21_AI-Day-Thailand/MetaLearning-demo.html" target="_blank">
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


<!--
### Video Link

The presentation was kindly <a href="https://engineers.sg/video/deep-learning-d-i-y-workshop-fossasia-2018--2455" target="_blank">recorded by Engineers.sg</a>.
!-->

PS:  And if you liked the Workshop, please 'star' the <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>




