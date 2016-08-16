---
date: 2016-07-30
title: "Fifth Elephant : Deep Learning Workshop"
tagline: Preview
category: AI
tags:
- Presentation
- Workshop
- NeuralNetworks
- theano
- lasagne
- VirtualBox
layout: post
published: true
---
{% include JB/setup %}


### Fifth Elephant Workshop : Going International

Apparently, my [PyCon SG 2016](/ai/2016/06/23/workshop-at-pycon-sg-2016) talk attracted international interest!

So, I've been invited to give a day-long (6-hour) workshop as part of the [Fifth Elephant DataScience conference](https://fifthelephant.in/2016/) in 
Bangalore, India.  The conference itself is Thursday/Friday 28/29 July 2016, and the workshop will be on the
weekend immediately afterwards (i.e. Saturday, 30 July 2016).

Although I normally just put up links to presentation materials here after an event, it has been *suggested* by the 
organisers that I write a little about the Workshop contents, target audience, etc. so that people can 
also decide whether to attend : 


### The Workshop 'Pitch'

Deep Learning is a hot topic, but has a steep initial learning curve.  This workshop is aimed at giving participants 'hands-on' 
experience of a range of deep learning techniques.

While no prior deep learning knowledge is assumed, the content will not be watered down : Even people already deploying 
models should find material that is new and interesting.

There will be code.  Lots of code.  To ease the pain, a pre-configured virtual machine will be handed out, 
so that participants can run it on their own laptops using cross-platform open-source VirtualBox, 
and avoid a lot of configuration hassles. 


### The Workshop Content

This workshop is going to be hands-on : 

*  After a brief background on deep learning, participants will dive right in, interacting with offline experiments 
with a <a href="http://convnetjs.com/" target="_blank">ConvNet.js model</a>, and
also the <a href="http://playground.tensorflow.org/" target="_blank">TensorFlow Playground</a>.

*  But this on-line portion is partly to allow everyone enough time to get the ~1.3Gb VirtualBox "appliance" 
created for the event installed on their laptops ( having a laptop with VirtualBox pre-installed is a requirement for 
this workshop - but the plus-side is that when the VirtualBox image is running, no further fiddling with Python, etc is required ).

*  Once everyone is up-to-speed tools-wise, the workshop progresses through a series of 
```Jupyter``` (fka ```iPython```) notebooks, ranging from Theano basics, through MNIST, to ImageNet networks 
(pretrained models such as ```GoogLeNet``` and ```Inception-v3``` are included in the VM).

We'll then go on to some specific applications, which will take 30-60 mins each : 

*  Each application will start with an explanation of the general 'problem'

*  ... and then the workshop will dive into pre-built deep learning solutions (with additional exercises) 

*  There should be ample time for people to have questions answered (or be shown how to figure things out for themselves).

   
Currently, the application list is planned to be : 

*  Anomaly detection

*  Applying a pre-trained model to classify images into previously unseen classes

*  Art ‘Style-Transfer’

*  Reinforcement Learning (inspired by AlphaGo)

I'd also like to have something concrete to play with on the RNN front (this is currently a work-in-progress)...


### Who should come?

The Workshop is aimed at people who are interested in being hands-on with deep learning techniques.  It should 
be noted, though, that the Fifth Elephant organisers have given it the 'Advanced' designation...

Rather than explaining what 'Advanced Deep Learning' is, though, perhaps it's better to contrast it with another
workshop series at Fifth Elephant : "Math for Data Science", which is being held at the same time.  
This sounds like an excellent course for people getting 'warmed up' in data science, 
and I'm sure it has great content.  If you want to do that one, then please do : This Deep Learning Workshop
is not the Workshop you're looking for.  

If you'd like to discuss the Workshop ahead of the weekend, I believe that the organisers are 
planning some kind of 'meet the presenters' table - and I'd be glad to discuss it there.
( And I'll probably be able to help people pre-load the Virtual machine there too - which 
could save time at the actual Workshop ).



### What do participants need?

Participants need a laptop with VirtualBox installed (this is cross-platform, 
and open source). At minimum, the laptop should have 2Gb of RAM and 8Gb of HD available, 
with the ability to read/install files from a USB key(!).  No platform preference.


#### Programming Knowledge Assumed

While parts of this are very technical, the models (inside the Virtual Machine) are all in Jupyter (fka iPython) notebooks, 
making interaction straightforward : 

*    The code is all Python-based, using Numpy, Theano (and Lasagne)
*    However, understanding every line in the code is not required, since the essence of the material is ‘laid out’ in the pre-built notebooks

Please install following software before coming to workshop :

*    VirtualBox (https://www.virtualbox.org/wiki/Downloads) is essential;
*    Chrome (or Firefox) would be good-to-have too.

In addition, some of the modules make use of images - so having a few of your own images (and some kind of image editing tool for resizing/cropping) could make those sections more ‘personal’ (in the nice-to-have category).


#### Math and ML Requirements

*    some matrix mathematics (Google : "matrix and vector multiplication");
*    the idea of using derivatives to minimise functions (Google : "differentiate to find minimum");
*    images being composed of pixels - and what a Photoshop filter does (Google : "Photoshop custom filter maths"); and
*    training data vs test data (Google : "training set test set difference");

Those who want to 'get ahead' could Google : "Neural network backpropagation", and beyond that 
come terms (all of which will be explained in the workshop) 
such as "imagenet competition", "convolutional neural network", "recurrent neural network", 
"deepmind alphago", "reinforcement learning" and "q-learning".  And (potentially, cross-fingers) : 
"generative adversarial network" and "deep residual learning".


### Who is the Presenter?

Martin got his PhD in Machine Learning from Cambridge, UK in the mid-1990s.  After a 
career in finance (based in London and New York), he decided to follow his original passion, 
and now works on Machine Learning / Artificial Intelligence full-time in Singapore. 

The application area that Martin is currently working on involves the Natural Language Processing
of company 'Annual Reports' to extract the web of people, companies and other entities and the 
way in which their are related.  The extracted data is in the form of a complete relationship
graph, with specificity down to (for instance) company registration numbers, and over 100 different
relationship types.  The system includes many different components, some of which are 'deep networks'.


### Open Source Cred

The source for the Deep Learning Workshop's VirtualMachine 'construction toolkit' is available 
on <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">GitHub</a> - 
if you have questions on the software, please leave an 'issue' there.

PS:  And if you like the Workshop, please 'star' the <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>


### Presentation Link

The [sign-ups](https://fifthelephant.talkfunnel.com/2016/72-advanced-deep-learning-workshop-hands-on) were 
apparently quickly over-subscribed, which was a pity, given that there were so many people that would have 
been interested to sign up too.  Perhaps it would make sense to do roughly the same again next year - 
potentially as part of the Deep Learning conference...

<a href="http://redcatlabs.com/2016-07-30_FifthElephant-DeepLearning-Workshop/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2016-07-30_FifthElephant-DeepLearning-Workshop_600x390.png)
</a>

If there are any questions about the workshop please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/2016-07-30_FifthElephant-DeepLearning-Workshop/#/1/1" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2016-07-30_FifthElephant-DeepLearning-Workshop_1-1_600x390.png)
</a>

