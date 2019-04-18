---
date: 2019-04-16
title:  "TensorFlow 2.0 : CNNs for Images"
tagline: Presentation
category: AI
tags:
- Presentation
- TensorFlow
- CNNs
layout: post
published: true
---
{% include JB/setup %}



### Presentation Link

Sam Witteveen and I started the TensorFlow and Deep Learning Singapore group on MeetUp in February 2017,
and [the twenty-fourth MeetUp, aka TensorFlow and Deep Learning : Images and CNNs](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/260469451/),
was again hosted by Google Singapore.  

My talk was titled "First steps in Deep Learning with TensorFlow 2.0 : CNNs", 
and was intended to introduce the elements of a CNN model *before* explaining 
the intricacies of back-propagtion (i.e. in some ways it was a different approach 
from the typical "build from the ground up" NN introductory pitch).

Timothy Liu talked about how to use pretrained models (including from `tf.keras.applications`), 
and Sam explored how Progressively growing training works for ResNet-50 (from scratch).

<!--
2019-04-16_TFandDL_TF2-CNNs
2019-04-16_TFandDL_TF2-CNNs-for-Images

"First steps in Deep Learning with TensorFlow 2.0 : CNNs" - Martin Andrews
This talk aims to cover the "something for beginners" part of our tagline - 
  motivating the building blocks of CNNs, 
  how they are trained, and 
  how the resulting model can be applied to different datasets. 
Code examples will be provided in Colab notebooks.


If we're going straight to CNNs, then perhaps :

show a CNN model in TF2
  explain the CNN kernel
    explain pooling (or sneak in via striding the convolutions?)
    explain the MLP over flat (or sneak past by narrowing to 1x1 via convolutions?)
  explain the softmax
  explain the categorical cross-entropy loss fn

explain the hierarchy of blame
  explain blame requires derivatives over generic parameterised models

fit a Convolutional(only) model to Regular MNIST
and then to alternative MNIST
  eg: NotMNIST :
    http://enakai00.hatenablog.com/entry/2016/08/02/102917
    =  http://yaroslavvb.blogspot.com/2011/09/notmnist-dataset.html
    =  Alphabet A...J

Other Possibilities : 
  eg: Cancer MNIST (?)
    https://www.kaggle.com/kmader/skin-cancer-mnist-ham10000
    =  https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/DBW86T
    (but these are larger images, looking at the file sizes) 
  eg: Kuzushiji-MNIST (KanjiMNIST...)
    https://github.com/rois-codh/kmnist
      "KMNIST Dataset" (created by CODH), adapted from "Kuzushiji Dataset" (created by NIJL and others), doi:10.20676/00000341


Next steps : Upload pdf...  :: 2019-04-16_TFandDL_TF2-CNNs-for-Images.pdf

------

Timothy L :


I can base my talk around the keras.applications module to show how to use pre-trained networks.
1. For starters, introduction on the keras.applications module (and a overview of common networks included like ResNet, Inception etc.)
2. Code sample on using those networks for inference on ImageNet classes (no training)
(small side-thing: introduce how keras loads and saves models into h5 files)
3. Introduce briefly the idea of transfer learning, and show a simple demo (replacing the softmax layer)

For this, I'll do up the examples in Colab with TF2.0 Alpha (assuming it all works, if not I'll fall back to whatever TF is on Colab) .

---

1 + 2 sound good to me (though 'overview of ResNet and Inception' seems like a whole talk...)

3 is the TL for which we'll probably have a whole evening.  Touching on this next Tuesday could be Ok, but I'm wondering about time constraints...

---

By overview, I actually meant something like:

hey there are some models included in Keras.applications, called Inception/ResNet, 
  here are a few interesting ideas introduced by them (Inception cell, residual connections). 
  Probably two slides on Inception, another two slides on ResNet, following by a link to the papers. 

Then I’ll move on to explain that these are powerful models trained on ImageNet (small overview of that, one slide or two), which have 1000 classes. 

Regarding #3, I’ll leave out the transfer learning part then. No issues there. Just thought it’d complete the story a bit better. 

------

Sam W :

Progressive CNNs?

https://towardsdatascience.com/boost-your-cnn-image-classifier-performance-with-progressive-resizing-in-keras-a7d96da06e20

!-->



The slides for my talk (as a 400Kb PDF) are here :

<a href="http://redcatlabs.com/downloads/2019-04-16_TFandDL_TF2-CNNs-for-Images.pdf" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2019-04-16_TFandDL_TF2-CNNs-for-Images_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/downloads/2019-04-16_TFandDL_TF2-CNNs-for-Images.pdf" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2019-04-16_TFandDL_TF2-CNNs-for-Images_8_600x390.png)
</a>


PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

