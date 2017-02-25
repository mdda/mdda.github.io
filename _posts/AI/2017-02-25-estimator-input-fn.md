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

print('eval_labels[7]', eval_labels[7])
{% endhighlight %}

## OLD STYLE Model (uses features and integer_labels PLAIN)

{% highlight python %}
def cnn_model_fn(features, integer_labels, mode):
  """Model function for CNN."""
  print("Run cnn_model_fn, mode=%s" % (mode,))

  # Input Layer
  # Reshape X to 4-D tensor: [batch_size, width, height, channels]
  input_layer = tf.reshape(features, [-1, 28, 28, 1], name='input_layer')

  # Convolutional Layer #1
  # Pooling Layer #1
  # Convolutional Layer #2
  # Pooling Layer #2
  # Flatten tensor into a batch of vectors
  # Dense Layer
  # Add dropout operation; 0.6 probability that element will be kept
  # Logits layer

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

# Set up logging for predictions
# Log the values in the "Softmax" tensor with label "probabilities"
tensors_to_log = {"probabilities": "softmax_tensor"}
logging_hook = tf.train.LoggingTensorHook( tensors=tensors_to_log, every_n_iter=50 )

# Train the model using OLD-STYLE x,y and batch_size
mnist_classifier.fit(
  x=train_data,
  y=train_labels,
  batch_size=100,
  steps=50000/100 * 5,
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



## NEW STYLE Model (uses features and integer_labels PLAIN)

The model is the same apart the features passed in should be a dictionary of ```Tensors```.

{% highlight python %}
def cnn_model_fn(features_dict, integer_labels, mode):
  """Model function for CNN - parses out features and labels from dicts provided."""
  print("Run cnn_model_fn, mode=%s" % (mode,))

  # Input Layer
  # Reshape X to 4-D tensor: [batch_size, width, height, channels]
  input_layer = tf.reshape(features_dict['image'], [-1, 28, 28, 1], name='input_layer')

  # Convolutional Layer #1
  # Pooling Layer #1
  # Convolutional Layer #2
  # Pooling Layer #2
  # Flatten tensor into a batch of vectors
  # Dense Layer
  # Add dropout operation; 0.6 probability that element will be kept
  # Logits layer

  loss = None
  train_op = None

  # Calculate Loss (for both TRAIN and EVAL modes)
  if mode != learn.ModeKeys.INFER:
    onehot_labels = tf.one_hot(indices=tf.cast( integer_labels, tf.int32), depth=10 )
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

# Build batch-wise data feeder
#   see : https://www.tensorflow.org/get_started/input_fn#passing_input_fn_data_to_your_model

def mnist_batch_input_fn(dataset, batch_size=100):
    if False:  # This is the idea (but numpy, rather than Tensors)
        feature_dict = dict( image = dataset.images )
        labels = np.asarray( dataset.labels, dtype=np.int32)
        return feature_dict, labels # but batch_size==EVERYTHING_AT_ONCE, unless we batch it up...
        
    # Instead, build a Tensor dict
    dataset_dict = dict( 
        image  = tf.constant( dataset.images ),
        labels = tf.constant( np.asarray( dataset.labels, dtype=np.int32) ),
    )

    # And create a 'feeder' to batch up the data appropriately...
    
    # see : http://datascience.stackexchange.com/questions/15313/train-on-batches-in-tensorflow
    # see : https://medium.com/@ilblackdragon/tensorflow-tutorial-part-4-958c29c717a0
    
    #batch_dict = tf.train.shuffle_batch(
    #                dataset_dict, batch_size, capacity=batch_size, min_after_dequeue=0,
    batch_dict = tf.train.batch(
                    dataset_dict, batch_size,
                    num_threads=1,
                    enqueue_many=False, shapes=None, 
                    allow_smaller_final_batch=False, shared_name=None, 
                    name=None
                 )    
    
    batch_labels = batch_dict.pop('labels')
    
    # Return : 
    # 1) a mapping of feature columns to Tensors with the corresponding feature data, and 
    # 2) a Tensor containing labels
    return batch_dict, batch_labels

{% endhighlight %}

