---
date: 2018-11-21
title:  "Learning Language with BERT"
tagline: Presentation
category: AI
tags:
- Presentation
- TensorFlow
- Magenta
layout: post
published: false
---
{% include JB/setup %}



### Presentation Link

Sam Witteveen and I started the TensorFlow and Deep Learning Singapore group on MeetUp in February 2017,
and [the twentieth MeetUp, aka TensorFlow and Deep Learning: Happy Birthday TensorFlow](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/254809924/),
was again hosted by Google Singapore.

We were honoured to have our favourite Singaporean Google Brain team member that works with TPUs 
speak at the event.  Frank Chen's talk was "TensorFlow 2.0 is coming" - and comprised 4 parts :

*  TensorFlow 2.0
*  TensorFlow.js
*  TensorFlow Lite
*  TensorFlow Distribution Strategies

And, at the last minute, we also discovered that Wolf Dobson from the TensorFlow team could give a talk before
he passed out from Jet Lag : "Eager Mode and @autograph".

Following that, Sam Witteveen (now returned from New York) gave a talk about the (very) new feature that appeared in 
Google Research's Colab : Free access to TPUs!  In a talk that apparently took the Google team a little off-guard 
(because they thought that noone would be able to figure out how to do it, given the lack of documentation),
Sam showed how to "Use Keras and TPUs in the Cloud for Free".

For my part, I gave a talk titled "Piano Transcriptions", which discussed the Google Magenta team's model 
to convert raw audio files to midi piano rolls.  Even though the talk was super-brief 
(because the additional talk had caused everything to run late), I described how the Deep Learning transcription 
network is built, the special 'losses' required to make it perform so well, and 
demonstrated it in action on music sourced 'in the wild' (the code for the enhanced Colab file is also available - see the slides for details).

<!--

"Learning Language with BERT" - Martin Andrews

Google's Magenta team has created a network to convert raw audio files to 
a midi piano roll, and has now released the python backend, a Colab notebook and
an in-browser (local Javascript) version.  Martin will describe how their Deep Learning
network is built, the special 'losses' required to make it perform so well, and 
demonstrate it in action on music sourced 'in the wild'.


Outline:

  TensorFlow :
    
  PyTorch (install via pip):
    https://github.com/huggingface/pytorch-pretrained-BERT


Advertise 
  Deep Learning Developer Module 1 : JumpStart
  Deep Learning Developer Module 2+ 
  TF&DL next == ?
  Interns
  
!-->


The slides for my talk are here :

<a href="http://redcatlabs.com/2018-09-27_TFandDL_PianoTranscription/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2018-09-27_TFandDL_PianoTranscription_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2018-09-27_TFandDL_PianoTranscription/#/5/1" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2018-09-27_TFandDL_PianoTranscription_5-1_600x390.png)
</a>




PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

