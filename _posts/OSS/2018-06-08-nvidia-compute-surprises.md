---
date: 2018-06-08
title: 'Nvidia Compute Capability'
category: OSS
tags:
- Nvidia
- TensorFlow
- PyTorch
layout: post
published: false
---
{% include JB/setup %}


## Watch for the Compute Capability

Up until now, my graphics cards have all worked fine with TensorFlow and PyTorch.  And clearly they 
are still supported by Nvidia's ```cuda``` drivers.

However, much to my surprise, suddenly ```TensorFlow``` and ```PyTorch``` have effectively EOL-ed
one of my cards : Which caused me to look at [https://developer.nvidia.com/cuda-gpus](Nvidia's Compute Capability) listings.

This post highlights cards that are now 'out', those on the verge of 'falling out', and 
those that should be Ok for a bit...

### The Current Cut-Off

Now (and it seems to have been recently changed, since the card worked before), the Compute Capability
required by TensorFlow at PyTorch stands at **3.5**.

### Run-down of cards

#### Pretty safe (5.2 and up)

*  Nvidia Titan V/Xp/X
*  GTX 10-series
*  GTX 9-series (except the M-series below 965M)
*  910M


#### Strangely middling (5.0)

*  960M/950M/940M/930M
*  850M/840M/830M
*  750/750Ti


#### Now border-line (3.5)

*  Nvidia Titan -/Z/Black (REALLY?)
*  GTX 920M
*  780/780Ti
*  730/720


#### Now obsolete (below 3.5)

*  880M/870M
*  820M/800M
*  770/760
*  740
*  6-series, 5-series, 4-series, ...


### Bottom Line

Compute Capability 'Expiry' is a problem.  Specifically for my GTX 760.

Huge shout-out to the salesperson at Sim Lim Square (a large electronics 
mall in Singapore) who upgraded me from a 750Ti to a 760 : And inadvertantly 
doomed my GPU-for-ML ideas to premature obsolescence.  

Cross-fingers that 5.2 says valid for a while...

