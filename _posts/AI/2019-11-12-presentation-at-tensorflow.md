---
date: 2019-11-12
title:  "TensorFlow World Highlights"
tagline: Presentation
category: AI
tags:
- Presentation
- TensorFlow
- Probability
- Hyperparameters
layout: post
published: false
---
{% include JB/setup %}



### Presentation Link

Sam Witteveen and I started the TensorFlow and Deep Learning Singapore group on MeetUp in February 2017,
and [the twenty-eighth MeetUp - which was a TensorFlow World Extended event - ](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/266224621/),
was hosted by Google Singapore, and recapped the TensorFlow World event we attended in Silicon Valley at the end of October.  

<!--

Need to read : 
  Text to text transfer transformer from Google  (potential for Sam at next TF&DL)
    https://github.com/google-research/text-to-text-transfer-transformer
Potential topic :
  MelGAN 
    http://swpark.me/melgan/
  Neural Structured Learning (NSL): Training with Structured Signals
    https://www.tensorflow.org/neural_structured_learning
    Looks v. promising

NSL : 
  Main Site : https://www.tensorflow.org/neural_structured_learning
  Medium Post : https://medium.com/tensorflow/introducing-neural-structured-learning-in-tensorflow-5a802efd7afd
  Framework decription :
    https://www.tensorflow.org/neural_structured_learning/framework
  NSL generalizes to :
    Neural Graph Learning 
    Adversarial Learning
  Examples : 
    ??3 : Graph regularization for sentiment classification using synthesized graphs
      https://www.tensorflow.org/neural_structured_learning/tutorials/graph_keras_lstm_imdb
      Easy to motivate 
      But set-up include lots of TFRecords details 
        Like the Cora one below, but done explicitly here, which is better
          - but not much, given the amount of code
      Gains in performance not awesome
        Except in cherry-picked 10% labelled data example
      May be better to explain how the code flows, rather than show it in its entirity
      
    YES4 : Adversarial regularization for image classification
      https://www.tensorflow.org/neural_structured_learning/tutorials/adversarial_keras_cnn_mnist
      This is essentially the same as the main site one, but with CNN layers.
      Example should be in a different order : 
        Interesting to see adversarial examples of digits early on...
          Also provides motivation for being interested in library in the first place (generation of adversarial examples)
      ==1 : MNIST with Adversarial Regularization
      Main Site
        nsl.keras.AdversarialRegularization
        Not motivated at all about why/what it's doing

    NO2 : Graph regularization for document classification using natural graphs (Cora citations dataset)
      https://www.tensorflow.org/neural_structured_learning/tutorials/graph_keras_mlp_cora
      Using external graphs difficult to demo effectively
        Lots of preprocessing (magical preprocess_cora_dataset.py)
        TFRecord format
        justification / etc
          After a ton of work : The graph-regularized model's accuracy is about 2-3% higher than that of the base model (base_model).

    
Aurelien to talk "Intro to Apache Beam" and 
  might give a couple TensorFlow examples including TF Datasets and TF Transform
  == "Preprocessing large datasets with Apache Beam and TF Transform"
  => "Processing Large Datasets with Apache Beam, Cloud Dataflow and TF Transform"  v2
    -  If it's too long I can either chop off the DataFlow part, or the TFT part, or shorten the Beam tutorial. 



Sam talk on T5 + BART (maybe) or "Hey GPT2"



!-->

Sam's talk gave an overview of the latest research into TensorFlow models  : "T5 and ... ".

Aurelien Geron ... "Preprocessing large datasets with Apache Beam and TF Transform"

My talk was "Neural Structured Learning (NSL): Training with Structured Signals"

The slides for my talk are here :

<a href="http://redcatlabs.com/2019-10-10_TFandDL_TF.probability/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2019-10-10_TFandDL_TF.probability_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2019-10-10_TFandDL_TF.probability/#/5/1" target="_blank">
<img src="/assets/img/2019-10-10_TFandDL_TF.probability_NB2_600x390.png" alt="Presentation Content Example" style="border:1px solid #000000" />
</a>


PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

