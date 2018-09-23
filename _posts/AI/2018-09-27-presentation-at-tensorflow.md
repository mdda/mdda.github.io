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
Outline:
  "Pathologies of Neural Models Make Interpretation Difficult" (previously "Right Answer for the Wrong Reason")
    Shi Feng <i>et al</i>
    EMNLP 2018 camera ready
    https://arxiv.org/abs/1804.07781
    
    Code : https://github.com/Cyanogenoid/pytorch-vqa
    Downloadable model : https://github.com/Cyanogenoid/pytorch-vqa/releases/tag/v1.0  # 80Mb
           

  Did the Model Understand the Question?
    Pramod Kaushik Mudrakarta <i>et al</i>
    ACL 2018 long paper ~ Google
    https://arxiv.org/abs/1805.05492
    
    Code: https://github.com/pramodkaushik/acl18_results
      https://github.com/pramodkaushik/visual_qa_analysis/tree/5edacd72ec9b1544a3776c325590aee38256d333
        Pre-process images (93 GiB of free disk space required for f16 accuracy) with [ResNet152 weights ported from Caffe] 
        and vocabularies for questions and answers with ...
      Ultimately depends on Cyanogenoid/pytorch-vqa too...
      
  cd deep-learning-workshop/notebooks/work-in-progress/did-the-model-understand-the-question
  git clone https://github.com/Cyanogenoid/pytorch-vqa.git
  wget https://github.com/Cyanogenoid/pytorch-vqa/releases/download/v1.0/2017-08-04_00.55.19.pth
  git clone https://github.com/Cyanogenoid/pytorch-resnet.git

  . ~/env3/bin/activate

  Ok, so the playground.ipynb now works...
    Let's make it produce content that is presentable, ideally :
      Have successive delete-a-word to hone questions to minimal size (hopefully ridiculous)
        Network ignores many question words, relying largely on the image to produce answers
          Model retains  more than 50% of its original accuracy even when every word that is not “color” is deleted from all questions in the validation set.
          Even when empty questions are passed as input to the network, its accuracy remains at about 44.3% of its original accuracy.  
          The top 6 words in the isolated set are {color, many, what, is, there, how}. 
          Model under-relies on important question words (e.g. nouns) 
        Add distractor text to change answers
          in not a lot of words,  | what is the answer to, | in not many words, 
        These are Ok : 
          tell me | answer this | answer this for me
    Did the model... :: "Integrated Gradients (IG)"
    Pathologies of Neural Models... :: "Input Gradient" (simpler description)
  
  

Advertise 
  Deep Learning Developer Module 1 : JumpStart
  TF&DL next == Frank
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

