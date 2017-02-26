---
date: 2017-02-25
title: TensorFlow Estimator input_fn
tagline: Old and New
category: AI
tags:
- TensorFlow
layout: post
published: false
---
{% include JB/setup %}


## Preamble


{% highlight python %}
#  FROM : https://www.tensorflow.org/tutorials/layers#building_the_cnn_mnist_classifier
#  CODE : https://www.tensorflow.org/code/tensorflow/examples/tutorials/layers/cnn_mnist.py

"""Convolutional Neural Network Estimator for MNIST, built with tf.layers."""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import numpy as np
import tensorflow as tf

from tensorflow.contrib import learn
from tensorflow.contrib.learn.python.learn.estimators import model_fn as model_fn_lib

#tf.logging.set_verbosity(tf.logging.INFO)  # Quite a lot...
tf.logging.set_verbosity(tf.logging.WARN)  

print('Tensorflow:',tf.__version__)
import sys
print(sys.version)

# Load training and eval data
mnist = learn.datasets.load_dataset("mnist")

train_data   = mnist.train.images  # Returns np.array
train_labels = np.asarray(mnist.train.labels, dtype=np.int32)

eval_data    = mnist.test.images  # Returns np.array
eval_labels  = np.asarray(mnist.test.labels, dtype=np.int32)

#print('eval_labels[7]', eval_labels[7])
print("Data Loaded")

batch_size=20
{% endhighlight %}



## Flexible Model (either format can be passed in)

{% highlight python %}
def cnn_model_fn(features, integer_labels, mode):
  """Model function for CNN."""
  print("Run cnn_model_fn, mode=%s" % (mode,))

  if type(features) is dict:
    features_images=features['images']
  else:
    features_images=features

  # Input Layer
  # Reshape X to 4-D tensor: [batch_size, width, height, channels]
  # MNIST images are 28x28 pixels, and have one color channel
  input_layer = tf.reshape(features_images, [-1, 28, 28, 1], name='input_layer')

  # Convolutional Layer #1
  # ...
  # Pooling Layer #1
  # ...
  # Convolutional Layer #2
  # ...
  # Pooling Layer #2
  # ...
  # Flatten tensor into a batch of vectors
  # ...
  # Dense Layer
  # ...
  # Add dropout operation; 0.6 probability that element will be kept
  # ...
  # Logits layer
  # ...

  loss = None
  train_op = None

  # Calculate Loss (for both TRAIN and EVAL modes)
  if mode != learn.ModeKeys.INFER:
    onehot_labels = tf.one_hot(indices=tf.cast(integer_labels, tf.int32), depth=10)
    loss = tf.losses.softmax_cross_entropy(onehot_labels=onehot_labels, logits=logits)

  # Configure the Training Op (for TRAIN mode)
  if mode == learn.ModeKeys.TRAIN:
    train_op = tf.contrib.layers.optimize_loss(
      loss=loss,
      global_step=tf.contrib.framework.get_global_step(),
      learning_rate=0.001,
      optimizer="Adam")  #optimizer="SGD")

  # Generate Predictions
  predictions = {
    "classes":       tf.argmax(input=logits, axis=1),
    "probabilities": tf.nn.softmax(logits, name="softmax_tensor"), 
    "logits":        logits,
  }

  # Return a ModelFnOps object
  return model_fn_lib.ModelFnOps(
      mode=mode, predictions=predictions, loss=loss, train_op=train_op)


# Create the Estimator : https://www.tensorflow.org/extend/estimators
mnist_classifier = learn.Estimator(
      model_fn=cnn_model_fn, 
      model_dir="mnist_convnet_model",   # This is relative to the launch directory
      )
{% endhighlight %}





## OLD STYLE runs (uses features and integer_labels PLAIN)

{% highlight python %}

# Set up logging for predictions
# Log the values in the "Softmax" tensor with label "probabilities"
tensors_to_log = {"probabilities": "softmax_tensor"}
logging_hook = tf.train.LoggingTensorHook( tensors=tensors_to_log, every_n_iter=50 )

# Train the model using OLD-STYLE x,y and batch_size
epochs=5

mnist_classifier.fit(
  x=train_data,
  y=train_labels,
  batch_size=batch_size,
  steps=train_labels.shape[0]/batch_size * epochs,
  monitors=[logging_hook],
)

# Configure the accuracy metric for evaluation
cnn_metrics = {
  "accuracy":
      learn.MetricSpec(
          metric_fn=tf.metrics.accuracy, prediction_key="classes"),
}

# Evaluate the model and print results  using OLD-STYLE x,y and batch_size
cnn_eval_results = mnist_classifier.evaluate( 
  x=eval_data, 
  y=eval_labels, 
  metrics=cnn_metrics,
)

print(cnn_eval_results)
{% endhighlight %}



## NEW STYLE runs (uses features dictionary and integer_labels PLAIN)

The model is the same, but the features are passed in as a dictionary of ```Tensors```.  The 
trick here is to make the batching work via ```TensorFlow``` itself - which means we have to use
```TensorFlow``` utility calls to create a ```splice_input_producer``` and a ```batch()```.  Shuffling is 
done in the former, since we have all the data in memory anyway.

This explains when the ```mnist_batch_input_fn``` is more involved than just passing 
the features and labels via the DEPRECATED ```x```, ```y```, ```batch_size``` format.

{% highlight python %}

# Build batch-wise data feeder
#   see : https://www.tensorflow.org/get_started/input_fn#passing_input_fn_data_to_your_model

def mnist_batch_input_fn(dataset, batch_size=100, seed=None):  # If seed is defined, this will shuffle data into batches
    if False:  # This is the idea (but numpy, rather than Tensors)
        feature_dict = dict( images = dataset.images )
        labels       = np.asarray( dataset.labels, dtype=np.int32)
        return feature_dict, labels # but batch_size==EVERYTHING_AT_ONCE, unless we batch it up...
        
    np_labels = np.asarray( dataset.labels, dtype=np.int32)
    
    # Instead, build a Tensor dict from parts
    all_images = tf.constant( dataset.images, shape=dataset.images.shape, verify_shape=True )
    all_labels = tf.constant( np_labels,      shape=np_labels.shape, verify_shape=True )

    if False:
      print(dataset.images.shape, 
            np.asarray( dataset.labels, dtype=np.int32).shape, 
            np.asarray( [dataset.labels], dtype=np.int32).T.shape,
           )
    
    # And create a 'feeder' to batch up the data appropriately...
    
    # see : http://datascience.stackexchange.com/questions/15313/train-on-batches-in-tensorflow
    # see : https://medium.com/@ilblackdragon/tensorflow-tutorial-part-4-958c29c717a0
    
    # useful : http://stackoverflow.com/questions/39283605/regarding-the-use-of-tf-train-shuffle-batch-to-create-batches

    # https://github.com/tensorflow/tensorflow/blob/master/
    #    tensorflow/examples/how_tos/reading_data/fully_connected_preloaded_var.py
    
    # Interesting for later ImageNet work :
    #   https://indico.io/blog/tensorflow-data-inputs-part1-placeholders-protobufs-queues/
    
    image, label = tf.train.slice_input_producer([ all_images, all_labels], shuffle=(seed is not None), seed=seed)
    
    dataset_dict = dict( images=image, labels=label ) # This becomes pluralized into batches by .batch()
    
    batch_dict = tf.train.batch( dataset_dict, batch_size,
                                num_threads=1, capacity=batch_size*2, 
                                enqueue_many=False, shapes=None, dynamic_pad=False, 
                                allow_smaller_final_batch=False, 
                                shared_name=None, name=None)
    
    batch_labels = batch_dict.pop('labels')


# Set up logging for predictions
# Log the values in the "Softmax" tensor with label "probabilities"
tensors_to_log = {"probabilities": "softmax_tensor"}
logging_hook = tf.train.LoggingTensorHook( tensors=tensors_to_log, every_n_secs=20 ) #every_n_iter=1000 )

# Train the model
if False:
    mnist_classifier.fit(
      x=train_data,
      y=train_labels,
      batch_size=100,
      steps=50000/100 * 5,
      monitors=[logging_hook]
    )

epochs=5
    
mnist_classifier.fit(
  input_fn=lambda: mnist_batch_input_fn(mnist.train, batch_size=batch_size, seed=42), 
  steps=train_labels.shape[0] / batch_size * epochs,
  #monitors=[logging_hook],
)
{% endhighlight %}

