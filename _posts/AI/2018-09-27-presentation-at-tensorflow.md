---
date: 2018-09-27
title:  "Raw Audio to Piano Transcription"
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
and [the nineteenth MeetUp, aka TensorFlow and Deep Learning: TensorFlow 2.0 - the New Stuff](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/254809924/),
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
      Updates:
        Create separate directory for uploaded audio 
        Read all files in directory
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

