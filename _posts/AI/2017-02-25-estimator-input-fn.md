---
date: 2017-02-25
title: TensorFlow Estimator input_fn
tagline: Old and New
category: AI
tags:
- TensorFlow
- Estimator
- CNN
- MNIST
layout: post
published: true
---
{% include JB/setup %}

## Estimator New style vs Old

The ```TensorFlow``` documentation spends a lot of time covering 
the 'OLD style' ```x```, ```y```, ```batch_size``` input parameters, 
but information about the 'NEW style' ```input_fn``` method (which is more flexible, and doesn't complain about DEPRECATION) is
scattered across multiple pages (and blog posts).  

The following shows code for the two different methods.  The code is complete 
(except for the MNIST model inner-workings, which would be the same for both cases).

As you'll see, the NEW style takes (a lot) more set-up, but ultimately we get extra features,
like data shuffling into batches, and the ability to pass in extra ```feature``` data if necessary.


### Preamble

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


# And pick a sample image (for .prediction()) below :
train_offset = 17

image_orig = train_data[train_offset]     # This is a flat numpy array with an image in it
label_orig = train_labels[train_offset]   # This the digit label for that image

print('sample image %d : label_orig %d' % (train_offset, label_orig,))


# Set the batch_size and number of training epochs
batch_size=20
epochs=5

{% endhighlight %}



### Flexible Model 

Either format (OLD or NEW) can be passed in, based on the ```type()``` of ```features``` :

{% highlight python %}
def cnn_model_fn(features, integer_labels, mode):
  """Model function for CNN."""
  print("Run cnn_model_fn, mode=%s" % (mode,))

  if type(features) is dict:
    print("New-style feature input")
    features_images=features['images']
  else:
    print("OLD-style feature input (DEPRECATED)")
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





### OLD STYLE runs (uses features and integer_labels PLAIN)

This shows the OLD-Style Estimator calls to ```.fit()```, ```.evaluate()``` and ```.predict()``` :

{% highlight python %}

# Set up logging for predictions
# Log the values in the "Softmax" tensor with label "probabilities"
tensors_to_log = {"probabilities": "softmax_tensor"}
logging_hook = tf.train.LoggingTensorHook( tensors=tensors_to_log, every_n_iter=50 )

# Train the model using OLD-STYLE x,y and batch_size
mnist_classifier.fit(
  x=train_data,
  y=train_labels,
  batch_size=batch_size,
  steps=train_labels.shape[0]/batch_size * epochs,
  monitors=[logging_hook],
)


# Evaluate the model and print results  using OLD-STYLE x,y and batch_size

# Configure the accuracy metric for evaluation
cnn_metrics = {
  "accuracy":
    learn.MetricSpec(
      metric_fn=tf.metrics.accuracy, prediction_key="classes"),
}

cnn_eval_results = mnist_classifier.evaluate( 
  x=eval_data, 
  y=eval_labels, 
  metrics=cnn_metrics,
)

print(cnn_eval_results)


# Now predict the class of the single image chosen above

class_predictions = mnist_classifier.predict( x=image_orig, as_iterable=False )

print( class_predictions['probabilities'][0] )

{% endhighlight %}



### NEW STYLE runs (uses features dictionary and integer_labels PLAIN)

This shows the NEW-Style Estimator calls to ```.fit()```, ```.evaluate()``` and ```.predict()``` :

The model is the same as before, but the features are passed in as a dictionary of ```Tensors```.  The 
trick here is to make the batching work via ```TensorFlow``` itself - which means we have to use
```TensorFlow``` utility calls to create a ```splice_input_producer``` and a ```batch()```.  Shuffling is 
done in the former, since we have all the data in memory anyway.

This explains when the ```mnist_batch_input_fn``` is more involved than just passing 
the features and labels via the DEPRECATED ```x```, ```y```, ```batch_size``` format.

Note that ```steps``` in ```fit``` is the number of batches processed.  So the number of 
examples processed is ```steps * batch_size```.


{% highlight python %}

# Build batch-wise data feeder
#   see : https://www.tensorflow.org/get_started/input_fn#passing_input_fn_data_to_your_model

def mnist_batch_input_fn(dataset, batch_size=100, seed=None):  
  # If seed is defined, this will shuffle data into batches
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
  
  # useful : http://stackoverflow.com/questions/
  #               39283605/regarding-the-use-of-tf-train-shuffle-batch-to-create-batches

  # https://github.com/tensorflow/tensorflow/blob/master/
  #    tensorflow/examples/how_tos/reading_data/fully_connected_preloaded_var.py
  
  # Interesting for later ImageNet work :
  #   https://indico.io/blog/tensorflow-data-inputs-part1-placeholders-protobufs-queues/
  
  image, label = tf.train.slice_input_producer( [all_images, all_labels], 
                                                shuffle=(seed is not None), seed=seed)
  
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
epochs=5
    
mnist_classifier.fit(
  input_fn=lambda: mnist_batch_input_fn(mnist.train, batch_size=batch_size, seed=42), 
  steps=train_labels.shape[0] / batch_size * epochs,
  #monitors=[logging_hook],
)


# Evaluate the model and print results

# Configure the accuracy metric for evaluation
cnn_metrics = {
  "accuracy":
    learn.MetricSpec(
      metric_fn=tf.metrics.accuracy, prediction_key="classes"),
}

cnn_eval_results = mnist_classifier.evaluate(
  input_fn=lambda: mnist_batch_input_fn(mnist.test, batch_size=batch_size), 
  metrics=cnn_metrics,
  steps=eval_labels.shape[0]/batch_size,
)

print(cnn_eval_results)


# Now predict the class of the single image chosen above

def mnist_direct_data_input_fn(features_np_dict, targets_np):
  features_dict = { k:tf.constant(v) for k,v in features_np_dict.items()}
  targets = None if targets_np is None else tf.constant(targets_np)

  return features_dict, targets

class_predictions_generator = mnist_classifier.predict( 
  input_fn=lambda: mnist_direct_data_input_fn( dict(images=np.array([image_orig])), None), 
  outputs=['probabilities'],
)

for class_predictions in class_predictions_generator:
  break # Get the first one...

print( class_predictions['probabilities'] )

{% endhighlight %}

<!--
### Working example...

deep-learning-workshop /notebooks/work-in-progress/adversarial/MNIST-CNN_learn-layers.ipynb

!-->
