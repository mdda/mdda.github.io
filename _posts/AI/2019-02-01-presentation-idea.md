---
date: 2019-02-01
title:  "Deep Learning Ears"
tagline: Presentation
category: AI
tags:
- Presentation
- SpeechRecognition
- ASR
layout: post
published: false
---
{% include JB/setup %}



### Presentation Link

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

Tensor2Tensor library
  Notebook :
    https://github.com/tensorflow/tensor2tensor/blob/master/tensor2tensor/notebooks/asr_transformer.ipynb
  TPU instructions :
    https://cloud.google.com/tpu/docs/tutorials/automated-speech-recognition
  Comment by dev:
    There are many difference between v1 and v2 (actually transformer_librispeech_v2 is exactly transformer_librispeech)
    https://github.com/tensorflow/tensor2tensor/issues/896#issuecomment-400975458
  Issue : ASR Transformer performance vs. Google Speech-to-Text
    https://github.com/tensorflow/tensor2tensor/issues/1121
  Papers
    https://arxiv.org/abs/1712.01769  == https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/46687.pdf
      = State-of-the-art Speech Recognition With Sequence-to-Sequence Models

Baidu DeepSpeech
  https://github.com/Mozilla/DeepSpeech  # TF
    # Has pre-trained English language model
    # TFlite export available


Other libraries
  wav2letter++
    https://arxiv.org/abs/1812.07625v1
      = wav2letter++: The Fastest Open-source Speech Recognition System
  Kaldi

  Data
    https://github.com/juliagusak/dataloaders

  Datasets
    RM : DARPA 1000-words English language Resource Management = 3hrs training, 1hrs test, bigram word-pair LM
       WER is ~2.1% with 2.5hr training
    WSJ : 78 hours of speech which are the results of spontaneous dictation.  20k word trigram LM
       WER (dev93)  ~8% with 7 days training
       WER (eval92) ~4% with 7 days training
    Librispeech : 100hrs clean speech
       WER ~3.5% 
    AMI : 70 hours of meeting speech transcription corpus
       

LMs for ASR
  Papers
    Smoothed Bloom filter language models: Tera-Scale LMs on the Cheap
      = http://homepages.inf.ed.ac.uk/miles/papers/emnlp07.pdf
    Improving End-to-end Speech Recognition with Pronunciation-assisted Sub-word Modeling
      = https://arxiv.org/abs/1811.04284
    Deep context: end-to-end contextual speech recognition (refers to 1712.01769 as [13])
      = https://arxiv.org/abs/1808.02480
    Two Efficient Lattice Rescoring Methods Using Recurrent Neural Network Language Models
      = http://mi.eng.cam.ac.uk/~xc257/papers/TASLP2016_RNNLM_Latrescore.pdf
      
Related       
    https://arxiv.org/abs/1806.04558
      = Transfer Learning from Speaker Verification to Multispeaker Text-To-Speech Synthesis
      
      
https://github.com/zzw922cn/awesome-speech-recognition-speech-synthesis-papers      
http://www.arxiv-sanity.com/search?q=speech+recognition

https://arxiv.org/abs/1712.01769
https://arxiv.org/pdf/1808.02480.pdf
https://arxiv.org/pdf/1807.10857.pdf

Transfer Learning from Speaker Verification to Multispeaker Text-To-Speech Synthesis - Google
  https://arxiv.org/pdf/1806.04558.pdf
    v. interesting : Same embedding from speaker verification useful for TTS tasks

Latent Sequence Decompositions
  https://arxiv.org/abs/1610.03035 = 1_Google_LatentSequenceDecompositions_1610.03035.pdf
    Seems to have discovered phonemes...

Acoustic-to-Word Recognition with Sequence-to-Sequence Models
  https://arxiv.org/abs/1807.09597
    Goes from mels to a word vocabulary (not characters nor BPE)
    Interesting, but results are not 'stand-out' better

Fully Convolutional Speech Recognition - Collobert, Facebook
  https://arxiv.org/abs/1812.06864v1
  https://github.com/facebookresearch/wav2letter
    https://github.com/facebookresearch/fairseq
    Uses ArrayFire tensor library (= not for TPUs)
    Reads network config :
      https://github.com/facebookresearch/wav2letter/blob/master/recipes/librispeech/config/conv_glu/network.arch
    Includes tutorials :
      https://github.com/facebookresearch/wav2letter/tree/master/tutorials/1-librispeech_clean
  Implements the audio processing via convolutions directly (output : chars)
  Claims SOTA-match on WSJ, and SOTA on Librispeech
  prev?: 
    End-to-End Speech Recognition From the Raw Waveform  - Collobert, Facebook
      https://arxiv.org/abs/1806.07098v2

The PyTorch-Kaldi Speech Recognition Toolkit - Bengio, MILA
  https://arxiv.org/abs/1811.07453v1
    github.com/mravanelli/PyTorch-kaldi/

A Comparison of Techniques for Language Model Integration in Encoder-Decoder Speech Recognition
  https://arxiv.org/abs/1807.10857v2

Attention-Based Models for Speech Recognition
  https://arxiv.org/pdf/1506.07503.pdf

An Online Attention-based Model for Speech Recognition
  https://arxiv.org/abs/1811.05247v1

Mixed-Precision Training for NLP and Speech Recognition with OpenSeq2Seq  : Nvidia
  https://arxiv.org/abs/1805.10387v2
  https://github.com/NVIDIA/OpenSeq2Seq
    https://nvidia.github.io/OpenSeq2Seq/  # Docs



https://arxiv.org/abs/1811.06621v1
https://arxiv.org/abs/1811.04531v1

  
Cycle-consistency training for end-to-end speech recognition
  https://arxiv.org/abs/1811.01690v1
  
Cascaded CNN-resBiLSTM-CTC: An End-to-End Acoustic Model For Speech Recognition
  https://arxiv.org/abs/1810.12001v2

Densely Connected Convolutional Networks for Speech Recognition  == DenseNets
  https://arxiv.org/abs/1808.03570v1
    For instance, Google uses 18,000 hours of training data for speech recognition for Google Home
      Kim et al : "Generation of large-scale simulated utterances in virtual rooms to train deep-neural networks for far-field speech recognition in google home," in INTERSPEECH, 2017.
      Li et al : "Acoustic modeling for google home," in INTERSPEECH, 2017.



Smaller models:
  Low-Dimensional Bottleneck Features for On-Device Continuous Speech Recognition (Google+MIT)
    https://arxiv.org/abs/1811.00006v1
      Impact of larger training set is substantial :
        Chiu, Sainath, Wu, et al. [2] report a WER of 4.1 % with over 12,500 hours of training data; 
        the *same model* trained on 100 hours of Librispeech data gives a WER of 21.8 %
      Delta- and double delta- feature stacking do not have a large effect relative to their 3 x increase in size;
      A 40 ms compressed step size seems to be the limit for high accuracy models
      We designed a model that successfully compresses the original DSP QM-features to 1/10 the size without any loss in accuracy

  Small-footprint Deep Neural Networks with Highway Connections for Speech Recognition
    https://arxiv.org/abs/1512.04280
      
    
    
!-->


PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

