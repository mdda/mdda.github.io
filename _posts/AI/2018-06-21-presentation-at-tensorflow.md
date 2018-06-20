---
date: 2018-06-21
title: 
tagline: Presentation
category: AI
tags:
- Presentation
- TensorFlow
- GoogleIO
- TensorFlow.js
layout: post
published: false
---
{% include JB/setup %}



### Presentation Link

Sam Witteveen and I started the TensorFlow and Deep Learning Singapore group on MeetUp in February 2017,
and [the sixteenth MeetUp, aka TensorFlow and Deep Learning: Dialogue and NLP](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/251687521/),
was again hosted by Google Singapore.



"The Rise of the Language Model" - Martin Andrews

This talk will explain a major current trend in Natural Language Processing : the 
increasing focus on using pre-built 'pure' language models (such as ELMO or the model 
recently announced by OpenAI), and then fine-tuning the output to suit your 
application. Martin will explain how this works, and you can create better models for your data, 
leveraging the models created on other, huge datasets by Google / OpenAI / Facebook / etc.

<!--
Outline:

2013 Word2Vec = Efficient Estimation of Word Representations in Vector Space
  Tomas Mikolov, Kai Chen, Greg Corrado, Jeffrey Dean
  https://arxiv.org/abs/1301.3781
  https://radimrehurek.com/gensim/models/word2vec.html

2014 GloVe = Global Vectors for Word Representation
  Jeffrey Pennington,   Richard Socher,   Christopher D. Manning
  https://nlp.stanford.edu/projects/glove/
  https://github.com/stanfordnlp/GloVe
  https://nlp.stanford.edu/pubs/glove.pdf
 
2017 CoVe = Learned in Translation: Contextualized Word Vectors
  Bryan McCann, James Bradbury, Caiming Xiong, Richard Socher
  https://arxiv.org/abs/1708.00107
  https://github.com/salesforce/cove  # PyTorch

2018-02 ELMo = Deep contextualized word representations
  Matthew E. Peters, Mark Neumann, Mohit Iyyer, Matt Gardner, Christopher Clark, Kenton Lee, Luke Zettlemoyer
  https://arxiv.org/abs/1802.05365
  https://allennlp.org/elmo
  https://github.com/allenai/bilm-tf  # TensorFlow
  https://www.tensorflow.org/hub/modules/google/elmo/2  # TFHub
  https://github.com/allenai/allennlp/blob/master/tutorials/how_to/elmo.md # PyTorch

2018-01...05 ULMFiT = Universal Language Model Fine-tuning for Text Classification
  Jeremy Howard, Sebastian Ruder
  https://arxiv.org/abs/1801.06146 (flag planting??)
  http://nlp.fast.ai/classification/2018/05/15/introducting-ulmfit.html   
  https://github.com/fastai/fastai
  http://files.fast.ai/models/wt103/   # Pretrained ~440Mb each

2018-06 = OpenAI  Improving Language Understanding with Unsupervised Learning
  Alec Radford, Karthik Narasimhan, Tim Salimans, Ilya Sutskever
  https://blog.openai.com/language-unsupervised/
  https://s3-us-west-2.amazonaws.com/openai-assets/research-covers/language-unsupervised/language_understanding_paper.pdf
  https://github.com/openai/finetune-transformer-lm  # TF
  https://github.com/huggingface/pytorch-openai-transformer-lm  # PyTorch
  
  This work builds on the approach introduced in Semi-supervised Sequence Learning, 
  which showed how to improve document classification performance by using 
  unsupervised pre-training of an LSTM followed by supervised fine-tuning. 
  
  It also extends ULMFiT, research that shows how a single dataset-agnostic LSTM language model 
  can be fine-tuned to get state-of-the-art performance on a variety of document classification datasets; 
  
  our work shows how a Transformer-based model can be used in this approach to succeed at 
  a broader range of tasks beyond document classification, such as 
    commonsense reasoning, 
    semantic similarity, and 
    reading comprehension. 
  
  It is also similar to but more task-agnostic than ELMo, which incorporates pre-training 
  but uses task-customized architectures to get state-of-the-art results on a broad suite of tasks.

  We used a 37-layer (12 block) Transformer architecture, and we train on sequences of up to 512 tokens. 
  
2018-06 = Google  A Simple Method for Commonsense Reasoning  
  Trieu H. Trinh, Quoc V. Le
  https://arxiv.org/abs/1806.02847
  
  
Demo 
  Load model
  Sentiment (simple)
  Winograd (like Google)

Advertise 
  Deep Learning Developer Module 1 : JumpStart
  https://cloudplatform.googleblog.com/2018/06/Introducing-improved-pricing-for-Preemptible-GPUs.html
  https://cloudplatform.googleblog.com/2018/06/Cloud-TPU-now-offers-preemptible-pricing-and-global-availability.html

  Google ML event 
  SmartHome Hackathon (?)
  Interns
  
!-->




In addition to my talk on Natural Language Processing trends, ...


The slides for my talk about NLP are here :

<a href="http://redcatlabs.com/2018-06-21_TFandDL_NLP-trends/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2018-06-21_TFandDL_NLP-trends_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2018-06-21_TFandDL_NLP-trends/#/3/1" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2018-06-21_TFandDL_NLP-trends_3-1_600x390.png)
</a>



PS:  And if you liked the content, please 'star' the <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

