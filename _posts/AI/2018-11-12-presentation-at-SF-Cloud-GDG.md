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
  https://github.com/mozilla/LPCNet/issues/4


Look at :
  UFANS: U-shaped Fully-Parallel Acoustic Neural Structure For Statistical Parametric Speech Synthesis With 20X Faster
    = https://arxiv.org/abs/1811.12208
  Investigating context features hidden in End-to-End TTS
    = https://arxiv.org/abs/1811.01376
  Exploring Transfer Learning for Low Resource Emotional TTS
    = https://arxiv.org/abs/1901.04276
  Representation Mixing for TTS Synthesis
    = https://arxiv.org/abs/1811.07240
  Attention-Based Models for Speech Recognition  (Has TTS-relevant content, apparently)
    = https://arxiv.org/pdf/1506.07503.pdf

May be good as a base TTS (using WORLD vocoder) for teaching purposes (PyTorch):
  https://r9y9.github.io/nnmnkwii/latest/nnmnkwii_gallery/notebooks/tts/02-Bidirectional-LSTM%20based%20RNNs%20for%20speech%20synthesis%20(en).html


------
https://cloud.google.com/tpu/docs/tensorflow-ops#available_python_apis
https://www.tensorflow.org/api_docs/python/tf/spectral/rfft
https://stackoverflow.com/questions/49616081/use-tensorflow-operation-in-tf-keras-model
https://stackoverflow.com/questions/47860237/how-to-use-tf-operations-in-keras-models
MNIST TPU (public).ipynb
  https://colab.research.google.com/drive/1myF-aXi33KCz8Ff6BY6hWolSxNVagIz5
keras-bert.ipynb  
  https://colab.research.google.com/github/HighCWu/keras-bert-tpu/blob/master/demo/load_model/load_and_predict.ipynb#scrollTo=uA4moo4dpLBr
Signal Processing (contrib)
  https://www.tensorflow.org/api_guides/python/contrib.signal#Computing_spectrograms
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
  https://github.com/r9y9/deepvoice3_pytorch    # PyTorch, mature

DC-TTS : 
  https://github.com/Kyubyong/dc_tts  # low-level-TF
  https://github.com/tugstugi/pytorch-dc-tts # PyTorch

Mozilla :   
  https://github.com/mozilla/TTS                # Torch-based model inspired by Tacotron 2
  https://github.com/mozilla/TTS#what-is-new-with-tts
  """ What I observe, encoding with f0 tunning by harvest is the best. """
  
Microsoft : 
  1_TTS_Microsoft_TTSwithTransformer_1809.08895.pdf    # 3-6 layer Transformer-based TTS (WaveNet head)
  In our experiment, time consume in a single training step for our model is ∼0.4s, which is 4.25 times faster than that of Tacotron2 (∼1.7s)
     with equal batch size (16 samples per batch). 
  However, since the parameter quantity of our model is almost twice than Tacotron2, 
     it still takes ∼3 days to converge comparing to ∼4.5 days of that for Tacotron2.

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

