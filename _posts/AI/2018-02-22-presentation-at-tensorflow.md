---
date: 2018-02-22
title: NIPS 
tagline: Presentation
category: AI
tags:
- Presentation
- TensorFlow
- NIPS
layout: post
published: true
---
{% include JB/setup %}

### Presentation Link

Sam Witteveen and I started the TensorFlow and Deep Learning Singapore group on MeetUp in February 2017,
and [the eleventh MeetUp, aka TensorFlow and Deep Learning: NIPS](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/247733545/),
was again hosted by Google Singapore.

The line-up of talks included : 

*  My talk on 'Practice and Trends' (which was a condensed version of the first Tutorial session by Oriol Vinyals and Scott Reed);
*  Olzhas describing Capsule Networks using an extensive deck; 
*  Chaitanya (a researcher from EPFL, now at SAP via NTU) presenting "Personalization in Goal-Oriented Dialog", a paper which he co-wrote and was featured in the NIPS Conversational Agents Workshop; and 
*  Sam looking at the developments in the space of ML that creates other ML models (eg: AutoML).

I didn't present [the paper](/ai/2017/10/19/presentation-at-pytorch) that Sam and I had at the NIPS ViGiL workshop, 
since the code there was rather too PyTorch-y to show at Google offices...

<a href=" http://redcatlabs.com/2018-02-22_TFandDL_NIPS-review/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2018-02-22_TFandDL_NIPS-review_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href=" http://redcatlabs.com/2018-02-22_TFandDL_NIPS-review/#/12/1" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2018-02-22_TFandDL_NIPS-review_12-1_600x390.png)
</a>

If you're looking for a more in-depth map of the original talk (timings of slides, and topics), 
there's a bunch of rough notes commented out below...  (visible if you do a RightClick-View-Source)

<!--
Let's make presentation notes (including slide # and video timing) for the NIPS talk here : 
*  https://www.reddit.com/r/MachineLearning/comments/7jhdiq/d_deep_learning_practice_and_trends_a_nips_2017/
*  Talk : https://www.youtube.com/watch?v=YJnddoa8sHk
*  Slides : 
* Presenters : 
   *  Oriol Vinyals (Berkley, Google, then DeepMind);
   *  Scott Reed (U. Michigan, DeepMind)

slide03 : 01:45 : Trends : 
  Autoregressive models
  Domain Alignment
  Learning to Learn
  Graph Networks
  Program Induction
  
  (Deep RL tutorial will deal with that topic)

2m30 : slide03 : 
 Deep Learning Building Blocks

6m00 : Inputs and Outputs

  slide09 : Structured = Not really
  slide10 : Images (including bread-muscle man)
  slide11 : Sequences (including decision-making)
  slide12 : Build model locally, train for hyperparameters in cloud

11m50 : Architectures

  slide17 : Convolutions "Inductive Biases" = locality and translation invariance
    Idea of convolutions derived from locality and weight sharing
    AlexNet & ImageNet & Revolution of depth
    18:20 : Training challenges (slide26) : computational complexity, optimisation problems
      Use stacks of small 3x3 convolutions (larger receptive fields, fewer parameters)
      BatchNorm, Weight Initialisation, Residual Connections
      slide29 : Inception v2 : introduced BatchNorm
      slide30 : Residual connections (20m20) + ResNet results, 
        New results this year : DenseNet, U-Net
        
  slide38 : 23:00 : Sequences
    slide39 : Neural embeddings + Recurrent Language Models
    slide40 : 25:00 : Vectorising context
    slide41 : 26:45 : Recurrent NN introduced
    slide46 : 27:30 : seq2seq + simplification of code
    slide49 : 29:20 : Neural Machine Translation
    slide50 : 30:00 : seq2seq limitations (8000 hidden) = bottleneck at transition
    slide52 : 31:20 : Attention = correct inductive bias for passing information 
                        (Bahdanai ICLR2015 was 'best paper' of year, no question)
    slide60 : 34:30 : Example of attention computation
    slide62 : 36:05 : Sequences : tricks of the trade, eg:
                        seq2seq init is ~U(-0.05,+0.05))
                        clipping : If norm(grad)>5, grad=grad_direction * 5
    slide63 : 36:39 : Attention and Memory Toolbox + Additional Resources


  
slide65 : 37:20 : Trends (source: ICLR 2018 abstracts)  NICE SLIDE
  

Trend : Generative and Autoregressive Models (new speaker 39:00, slide68) 
  Latent variable models (VAE, DRAW)
  Implicit (GAN, GMME, Progressive GAN)
  Transform (NIDE, IAF, Real NVP)
  Autoregressive (NADE, MADE, RIDE, PixelCNN, WaveNet)
  
  First 3 covered in excellent UAI-2017 Tutorial
  GANs also covered in NIPS-2016 Tutorial

  slide70 : 40:25 : Autoregressive models : Main idea
  
  slide73 : 42:30 : Causal Convolution + Dilation + Stacks
  slide75 : 44:10 : Cross-entropy loss (using logits)
  slide77 : 44:40 : Mixture of logistics loss (from PixelCNN)
  slide78 : 45:25 : Actual mixture of logistics loss defined
  slide80 : 46:35 : WaveNet distillation O(N)->O(1) sampling
  
  slide83 : 47:52 : Modeling Text
  slide90 : 48:58 : NMR with dilated causal convolutions
  slide91 : 49:00 : Convolutional MT with attention (Facebook)
  slide95 : 51:15 : Non-autoregressive transformer for NMT "Fertility values" (Gu et al)
                      Similar to training a teacher network (parallel) for fertilities
                      Then a student doesn't need to do attention
                       
  slide96 : 52:20 : Modeling Images
  slide98 : 53:40 : Causal convolutions for images
  slide101 : 55:12 : Group-by-group modeling
  slide104 : 56:52 : Parallel autoregressive models in 3D (and scan-completion)
  
  slide108 : 57:31 : Scoring and sampling
                      Fully sequential : PixelCNN, WaveNet : O(1) scoring, O(N ) sampling
                      Conditional independence : O(1) scoring, better sampling
                      Distilled models : Parallel WaveNet, Parallel NMT : O(N) scoring, O(1) sampling
  
Trend : Domain Alignment (58:51, slide 111) un- or weakly- supervised
    This is a wiring game, rather than clever architectures
    i.e. Losses : Latent space (domain confusion), 
                  Pixel space (cycle consistency)
                  Adversarial and Liklihood losses work
  slide112 : 1:00:00 : Visual Domain alignment (photos and sketches)
  slide113 : 1:01:50 : Shared cross-modal representations
  slide114 : 1:02:40 : Cross-domain retrieval (weakly aligned data)
  slide115 : 1:03:10 : Unsupervised domain transfer for classification
  slide116 : 1:03:30 : Gradient reversal layer explained (nice SLIDE)
  slide117 : 1:04:15 : Unsupervised cross-domain image generation (create sketches) nice SLIDEs
  slide119 : 1:06:00 : Cycle-considency loss (nice SLIDEs) == CycleGAN
  slide121 : 1:07:15 : Unsupervised image-to-image translation (shared latent space) nice SLIDEs
  slide123 : 1:08:50 : DiscoGAN (Car2Face) nice SLIDEs
  slide125 : 1:09:55 : GraspGAN (robotics) nice SLIDEs
  slide127 : 1:44:20 : Text corpora (machine translation) 2 different papers
  
Trend : Learning to Learn / MetaLearning (back to OV : 1:13:05, slide130)
  Loss game (again) : Loss that models another loss
     One-shot learning is in this category
  
  slide133 : 1:13:45 : Learning to Learn - sample new task => adapt quickly
  slide134 : 1:15:25 : Building the equation (SLIDE?)
  slide136 : 1:18:00 : Model-based; Metric-based; Optimisation-based
  slide137 : 1:21:00 : One-shot imitation learning
  
Trend : Graphs (1:22:00, slide 141)
  Natural trend :: Fixed->Tensor->Sequential->Graphs
    Building blocks : architecture game
    
  slide144 : 1:23:40 : Inductive bias for graphs : Want order-invariant model  (DeepSets = recommended)
  slide145 : 1:24:50 : Message Passing Neural Networks with worked example
  slide154 : 1:27:50 : Predicting chemical experiment with MPNNs
  slide156 : 1:28:25 : Interaction Networks (glossed over)
  slide158 : 1:28:34 : Gated Graph Neural Networks. etc, etc 
  slide163 : 1:28:54 : Technical challenges : Batching is a problem for graph-building frameworks
  slide164 : 1:29:53 : Summary and Further Reading
  
  
Trend : Program induction (back to Scott : 1:30:00, slide165)
  Research landscape
    Neural network is the program
    Neural network generates the program source code (if it works : perfect generalisation)
    Probabalistic programming with neural networks (not now)
    
  slide168 : 1:32:20 : Learning to Execute "Bold" - apply seq2seq to everything
  slide170 : 1:33:20 : Neural Turing Machine / Differentiable Neural Computer (with memory)
  slide173 : 1:35:40 : Hierarchical Programs : Neural task programming
  slide175 : 1:36:25 : DeepCoder (generates code in a DSL) - use attribute prediction to prune search space
  slide176 : 1:38:15 : RobustFill (robust to data errors in I/O pairs)
  
Conclusions and Expectations (Scott : 1:41:07, slide181)
  Autoregressive models and ConvNets are already in use in consumer applications
  
  Inductive biases are useful
    - Spacial invariance : CNNs
    - Time recurrence : RNNs
    - Permutation invariance : Graphs
    
  More ResNet tricks to be discovered?
  
  GANs may have interesting market applications (phone apps)
  
  Meta-Learning : Learn more of model lifecycle end-to-end
  
!-->

