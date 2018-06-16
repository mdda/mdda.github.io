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

OpenAI
  https://blog.openai.com/language-unsupervised/
  https://s3-us-west-2.amazonaws.com/openai-assets/research-covers/language-unsupervised/language_understanding_paper.pdf
  https://github.com/openai/finetune-transformer-lm
  
Demo 
  Load model
  Sentiment (simple)
  Winograd (like Google)
  
  
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

