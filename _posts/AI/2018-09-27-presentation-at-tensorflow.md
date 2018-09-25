---
date: 2018-09-27
title:  "Did the Model Understand the Question?"
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
and [the nineteenth MeetUp, aka TensorFlow and Deep Learning: What's new](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/254809924/),
was again hosted by Google Singapore.


We were honoured to have our favourite Singaporean Google Brain team member that works with TPUs 
speak at the event.  Frank Chen's talk was "TensorFlow 2.0 is coming".



For my part, 
I gave a talk titled "Did the Model Understand the Question?", which explained some of the 
thinking in the paper by the same title by [Mudrakarta <i>et al</i> (2018)](https://arxiv.org/abs/1805.05492).


<!--

"Raw Audio to Piano Transcription" - Martin Andrews

Google's Magenta team has created a network to convert raw audio files to 
a midi piano roll, and has now released the python backend, a Colab notebook and
an in-browser (local Javascript) version.  Martin will describe how their Deep Learning
network is built, the special 'losses' required to make it perform so well, and 
demonstrate it in action on music sourced 'in the wild'.


Outline:
  Magenta project : "Raw Audio to Piano Transcription in the web browser (TensorFlow.js)"
    Discussion:
      https://www.reddit.com/r/MachineLearning/comments/9hkwcp/p_raw_audio_to_piano_transcription_in_the_web/
    Original Blog :
      https://magenta.tensorflow.org/onsets-frames  
    Original Code :
      Copy Colab notebook into drive
        Installs a whole bunch of .deb files, as well as some python packages
        Need to upload audio file readable by librosa
          eg : 04 - 12 Etudes, op. 10 No. 4 in C sharp minor.mp3
          eg : 401 - Someone To Watch Over Me.ogg
        Both work *Pretty well*
          Upload cell may need a couple of attempts on same file (check for 'uploading text')
        Transcribe cell spends most time converting midi->audio for Play button
    Javascript:
      https://piano-scribe.glitch.me/

    Questions : 
      Are the dynamics captured = YES, apparently
        frame_predictions.shape # (8099, 88)  Booleans 
        onset_predictions.shape # (8099, 88)  Booleans
        velocity_values.shape   # (8099, 88)  # values range :-0.51426625 ...  1.3687868





Advertise 
  Deep Learning Developer Module 1 : JumpStart
  Deep Learning Developer Module 2+ 
  TF&DL next == ?
  Interns
  
!-->


The slides for my talk are here :

<a href="http://redcatlabs.com/2018-09-04_TFandDL_Explainability/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2018-09-04_TFandDL_Explainability_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2018-09-04_TFandDL_Explainability/#/6" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2018-09-04_TFandDL_Explainability_6_600x390.png)
</a>




PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

