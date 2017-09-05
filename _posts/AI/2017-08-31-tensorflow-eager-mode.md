---
layout: post
category: AI
title: TensorFlow Eager Mode
tagline: Just fiddling around
date: 2017-08-31
tags: [TensorFlow,Eager,PyTorch]
published: false
---
{% include JB/setup %}


## ```TensorFlow``` has an Eager mode in 'master'


### Run jupyter

{% highlight python %}
. env3/bin/activate  # env3 with TensorFlow master wheel installed
jupyter notebook --notebook-dir=.

{% endhighlight %}
{% highlight python %}

# Hmm : this seems to be qualitatively right :
import tensorflow.contrib.eager.python.tfe as tfe

{% endhighlight %}
{% highlight python %}
# Snippet from tensorflow.python.eager.context :

  with tfe.device('gpu:0'):
    with tfe.device('cpu:0'):
      shape = tfe.Tensor([], dtype=tf.int32)
    x = ops.truncated_normal(shape, tf.float32)

{% endhighlight %}
{% highlight python %}

{% endhighlight %}
{% highlight python %}

{% endhighlight %}



#### Curious

{% highlight python %}

# in tensorflow.python.eager.context (at end) :

# TODO(apassos): This should not be a part of the public API.

{% endhighlight %}
{% highlight python %}

Deleting :  tensorflow.contrib.stateless.remove_undocumented
Deleting :  tensorflow.contrib.stat_summarizer.remove_undocumented
Deleting :  tensorflow.contrib.decision_trees.remove_undocumented
Deleting :  tensorflow.contrib.timeseries.remove_undocumented
Deleting :  tensorflow.contrib.seq2seq.remove_undocumented
Deleting :  tensorflow.contrib.sparsemax.remove_undocumented
Deleting :  tensorflow.contrib.tpu.remove_undocumented
Deleting :  tensorflow.contrib.tfprof.remove_undocumented

{% endhighlight %}
