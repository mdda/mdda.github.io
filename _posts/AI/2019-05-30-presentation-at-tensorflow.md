---
date: 2019-05-30
title:  "Single-Path NAS and the Lottery Ticket Hypothesis"
tagline: Presentation
category: AI
tags:
- Presentation
- TensorFlow
- AutoML
- NAS
- Neural Architecture Search
- Lottery Ticket Hypothesis
layout: post
published: false
---
{% include JB/setup %}



### Presentation Link

Sam Witteveen and I started the TensorFlow and Deep Learning Singapore group on MeetUp in February 2017,
and [the twenty-fifth MeetUp, aka TensorFlow and Deep Learning : AutoML](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/261638882/),
was again hosted by Google Singapore.  

My talk was titled "Single Path NAS and the Lottery Ticket Hypothesis", 
and was intended to introduce a few pieces of research - starting with the 
Single Path NAS paper, and touching on the Lottery Ticket Hypothesis work
(winner of best paper at ICLR 2019, and follow-on work by Uber).

Timothy Liu talked about the Keras AutoML module; 
Sam talked about hyperparameter search algorithms; 
and Olzhas described the RL methods behind OpenAI's recente DOTA success.

<!--
2019-04-16_TFandDL_TF2-CNNs-for-Images

"Single-Path Neural Architecture Search 
(and the Lottery Ticket Hypothesis) 
with TensorFlow 2.0 " - Martin Andrews

Martin will dive into two interesting recent papers, 
one with a more efficient way to do AutoML, 
and the other with insights into 
Neural Network training, pruning and initialisation (in that order).

------

Single-Path NAS: Designing Hardware-Efficient ConvNets in less than 4 Hours 
https://arxiv.org/abs/1904.02877
https://github.com/dstamoulis/single-path-nas
CMU / Microsoft


Understanding Neural Architecture Search Techniques
https://arxiv.org/abs/1904.00438


Basics of Architecture Search
  Pure NAS
  ENAS
  NAS cells - to reduce search space
  
Alternative approach : 
  Single-path NAS

Key idea:
  Collapse each layers' decision paths into 1 mega-kernel
  Parameterize mega-kernel sub-paths as sigmoid 
    (with Gumbel?=No, apparently)
  ... The script uses TF's EventAccumulator to parse the NAS-decision variables (indicator values); it prints the MBConv types of the ConvNet (following the MNasNet encoding)  
  
```
indicator_values = parse_netarch.parse_indicators_single_path_nas(parse_lambda_dir, tf_size_guidance)
network = parse_netarch.encode_single_path_nas_arch(indicator_values)
```

Results

Interesting resonance with Lottery Ticket Hypothesis
  No direct relationship other than both :
    being interesting papers
    relying on 90% of network being prunable
    including the masking out of irrelevant layers
    
  
The Lottery Ticket Hypothesis : Work from MIT
  https://arxiv.org/abs/1803.03635
  https://github.com/google-research/lottery-ticket-hypothesis
  MNIST & CIFAR10

Idea  
  Train a network from scratch (random init=R)
  Find the important weights in finished network
  Create a mask of the layers to set other stuff to zero
  Performance of network ~ same
  Now start a new pre-pruned network from scratch
    Start the weights from R/mask 
    (i.e. same random values for just the ones that mattered *in the end*)
    Network still trains to be good
      Even without the rest of the network to 'smooth the gradients'
      
Key Quote:
  The winning tickets we find have won the initialization lottery: 
  their connections have initial weights that make training particularly effective.

Code : 
  https://github.com/google-research/lottery-ticket-hypothesis/blob/master/foundations/pruning.py#L24

Follow-up work : 
  Deconstructing Lottery Tickets: Zeros, Signs, and the Supermask (Uber)
    https://arxiv.org/abs/1905.01067
    https://eng.uber.com/deconstructing-lottery-tickets/

    What's important about the final weights?
      Magnitude?
      Those that have changed most?
    What's important to 'carry back' as the original mask?
      Magnitude?
      Sign?

  The Lottery Ticket Hypothesis at Scale : 
    https://arxiv.org/abs/1903.01611
    ImageNet
    late resettings (not as strong a result)



!-->



The slides for my talk are here :

<a href="http://redcatlabs.com/2019-05-30_TFandDL_SinglePathNAS/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2019-05-30_TFandDL_SinglePathNAS_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2019-05-30_TFandDL_SinglePathNAS/" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2019-05-30_TFandDL_SinglePathNAS_8_600x390.png)
</a>


PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

