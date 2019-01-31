---
date: 2018-11-12
title:  "Deep Learning Voices"
tagline: Presentation
category: AI
tags:
- Presentation
- WaveNet
- TTS
layout: post
published: true
---
{% include JB/setup %}



### Presentation Link

Sam Witteveen and I were invited over to Google's Mountain View location (in Silicon Valley) for the
Google Developer Expert DevFest at the beginning of November.  As luck would have it, 
our friend Vikram Tiwari organises the San Francisco Google Developer Group Cloud MeetUp, and 
invited us to take part in an event in San Francisco : [Experts Panel - Voice and Machine learning](https://www.meetup.com/GDGCloudSF/events/255584299/).

As part of the discussion, the panelists were each given the opportunity to do a short presentation, 
and for my part, I gave a talk titled "Deep Learning Voices", which discussed the 
history of different approaches for the 'features to audio' stage of the processing pipeline.  Obviously, 
WaveNet (in its various forms) made an appearance, but the talk also extended to WaveRNN 
and the GlowNet / FloWaveNet approaches that recently came out of Nvidia and Korea respectively.

The slides for my talk are here :

<a href="http://redcatlabs.com/2018-11-12_GDG-SF_DeepLearningVoices/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2018-11-12_GDG-SF_DeepLearningVoices_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2018-11-12_GDG-SF_DeepLearningVoices/#/8/1" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2018-11-12_GDG-SF_DeepLearningVoices_8-1_600x390.png)
</a>

<!--
Also now include :
LPCnet


Look at :
  https://arxiv.org/abs/1811.12208
    = UFANS: U-shaped Fully-Parallel Acoustic Neural Structure For Statistical Parametric Speech Synthesis With 20X Faster
  https://arxiv.org/abs/1811.01376
    = Investigating context features hidden in End-to-End TTS
  https://arxiv.org/abs/1901.04276
    = Exploring Transfer Learning for Low Resource Emotional TTS
  https://arxiv.org/abs/1811.07240
    = Representation Mixing for TTS Synthesis

------

and think about practical aspects of text-to-descriptors networks :

Tacotron :
  https://github.com/keithito/tacotron          # TF tf.layers
  https://github.com/r9y9/tacotron_pytorch      # PyTorch
Tacotron2 :
  https://github.com/Rayhane-mamah/Tacotron-2   # TF low-level
  https://github.com/NVIDIA/tacotron2           # PyTorch including fp16

DeepVoice
  https://github.com/DeepSwissVoice/DeepVoice   # TF + "native" bindings in C + JS (full website infra?)
DeepVoice2
DeepVoice3
  https://github.com/Kyubyong/deepvoice3        # TF low-level, fairly spartan
  https://github.com/r9y9/deepvoice3_pytorch    $ PyTorch, mature

DC-TTS : 
  https://github.com/Kyubyong/dc_tts  # low-level-TF
  https://github.com/tugstugi/pytorch-dc-tts # PyTorch
  
------

Adaptation
  https://github.com/Kyubyong/speaker_adapted_tts
  
  
!-->


PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

