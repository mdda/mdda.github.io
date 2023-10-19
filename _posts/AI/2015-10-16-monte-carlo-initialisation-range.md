---
date: 2015-10-16
title: MonteCarlo for NN Initialisation Parameters
category: OSS
tags:
- NeuralNetworks
layout: post
published: true
---
{% include JB/setup %}

### Choosing the Distribution &amp; Parameters for Neural Network Initialisations

When initialising random weights in a neural network, the $$ n.Var(W) = 1 $$ 'rule-of-thumb' 
is [fairly easy to find online](http://deepdish.io/2015/02/24/network-initialization/).  

However, these often start to get handwavy after the initial results are proved.

The code below just weights an input distribution of $$n$$ features (in this case `Uniform(0,1)`),
by a weight vector with distribution `Uniform(-0.5*size, +0.5*size)`, and applies
an activation function to the result.

By running this process over a matrix of samples, one can effectively measure
the value of `size` required to equalise the input variance with the output variance.
And this approach should give good training stability - since each layer of the network
will have an 'amplification factor' of approximately 1.  

Doing this in code (essentially by Monte Carlo), makes it easy fiddle with the various
input and weight distribution functions, as well as the activation function, without
having to make approximations for the sake of algebraic tractability.


### Quick code

{% highlight python %}
import numpy as np

samples = 10000

def factor(features, init_size=1.0, logistic_answer=False):
  feat = np.random.random( (samples, features) )

  # np.mean(feat, axis=1).shape = 10000

  print("Features : Mean=%+.4f, stdev=%.4f" % (np.mean(feat), np.std(feat),))
  print("   Ideal : Mean=%+.4f, stdev=%.4f\n" % (0.5, 1.0/np.sqrt(12.0),))

  # Set as Uniform(1.0) (centered on zero)
  weights = (np.random.random( (samples, features) ) - 0.5) * init_size
  print("Weights  : Mean=%+.4f, stdev=%.4f" % (np.mean(weights), np.std(weights),))
  print("   Ideal : Mean=%+.4f, stdev=%.4f\n" % (0.0, init_size/np.sqrt(12.0),))

  sumprod = np.sum(feat * weights, axis=1)
  print("PreAct.shape", sumprod.shape)
  print("PreAct   : Mean=%+.4f, stdev=%.4f\n" % (np.mean(sumprod), np.std(sumprod),))

  relu = np.maximum( sumprod, np.zeros( sumprod.shape ) )
  print("ReLU     : Mean=%+.4f, stdev=%.4f" % (np.mean(relu), np.std(relu),))

  logistic = 1. / (1. + np.exp( -sumprod ) )
  print("Logistic : Mean=%+.4f, stdev=%.4f" % (np.mean(logistic), np.std(logistic),))

  if logistic_answer:
    return np.std(logistic) / np.std(feat)
    
  return np.std(relu) / np.std(feat)

if True:
  #arr = [ (n, factor(n*n)) for n in range(1,100)]
  ##  This shows a line from (0,0) to (100,30)  (n, relu.std / feat.std)
  
  #arr = [ (n, factor(n*n, 3./n)) for n in range(1,100,10)]
  ##  This shows a constant line from (0,1.0) to (100,1.0)  (n, relu.std / feat.std)

  arr = [ (n, factor(n*n, 11./n, logistic_answer=True)) for n in range(1,100,10)]
  ##  This shows a constant line from (0,1.03) to (100,1.03)  (n, logistic.std / logistic.std)

  for i,v in arr: 
    print("%d,%6.4f" % (i, v))
    
{% endhighlight %}

