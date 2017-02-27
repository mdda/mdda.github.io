---
date: 2017-02-27
title: TensorFlow Estimator extra outputs
tagline: Smuggling tensors out
category: AI
tags:
- TensorFlow
- Estimator
layout: post
published: false
---
{% include JB/setup %}

## Estimator Output Smuggling

While the ```TensorFlow``` ```Estimator``` framework has a lot of appeal, since it can hide a lot
of the training / evaluation / prediction mechanics, it seems at first sight to remove a lot of 
flexibility in how one can pull apart the models.  In particular, it would be very convenient
to be able to look at the values of tensors created by a model (other than the ones designated 'label', etc).

The ```Estimator``` framework has now bifurcated, base on using either 
the 'OLD style' ```x```, ```y```, ```batch_size``` input parameters, 
or feeding information to the model using the 'NEW style' ```input_fn``` method 
(which is more flexible, and doesn't complain about DEPRECATION). 

This post shows how to 'smuggle' out tensor results from a model that has been integrated into the ```Estimator``` framework.

NB: It seems that once you've run specific ```batch_size``` 'NEW style', the model becomes specialized 
w.r.t. ```batch_size``` and so no longer accepts 'OLD style' batches.  This issue probably warrants further exploration - 
except that 'NEW style' is clearly the better, more modern and more flexible way to go.


### OLD STYLE runs (uses features and integer_labels PLAIN)

{% highlight python %}
def cnn_model_fn(features, integer_labels, mode):
  """Model function for CNN."""
  print("Run cnn_model_fn, mode=%s" % (mode,))

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

  ## SMUGGLE TENSORS OUT HERE vv ##

  # For OLD-STYLE inputs (needs wierd 'evaluate' metric)
  if mode == model_fn_lib.ModeKeys.EVAL:  
    predictions['input_grad'] = tf.gradients(loss, [input_layer])

  ## SMUGGLE TENSORS OUT HERE ^^ ##

  # Return a ModelFnOps object
  return model_fn_lib.ModelFnOps(
      mode=mode, predictions=predictions, loss=loss, train_op=train_op)


# Create the Estimator : https://www.tensorflow.org/extend/estimators
mnist_classifier = learn.Estimator(
      model_fn=cnn_model_fn, 
      model_dir="mnist_convnet_model",   # This is relative to the launch directory
      )
{% endhighlight %}

The following also illustrates the logical process required to find the magic incantation 
```tf.contrib.metrics.streaming_concat``` that pulls all the right stuff together.

The ```predictions['input_grad']``` becomes the value of ```labels``` that gets concatenated into 
the ```mnist_classifier.evaluate()``` results : 

{% highlight python %}
# FIGURING-IT-OUT STEP : WORKS
def metric_accuracy(cls_targets, predictions):
    return tf.metrics.accuracy(cls_targets, predictions)

# FIGURING-IT-OUT STEP : WORKS
def metric_accuracy_here(labels, predictions, weights=None, metrics_collections=None, updates_collections=None, name=None):
  if labels.dtype != predictions.dtype:
    predictions = tf.cast(predictions, labels.dtype)
  is_correct = tf.to_float(tf.equal(predictions, labels))
  return tf.metrics.mean(is_correct, weights, metrics_collections, updates_collections, name or 'accuracy')

# FIGURING-IT-OUT STEP : WORKS
def metric_mean_here(labels, predictions, weights=None, metrics_collections=None, updates_collections=None, name=None):
  return tf.metrics.mean(labels, weights, metrics_collections, updates_collections, name or 'gradient_mean')

# FINALLY! :: WORKS
def metric_concat_here(labels, predictions, weights=None, metrics_collections=None, updates_collections=None, name=None):
  return tf.contrib.metrics.streaming_concat(labels, axis=0, max_size=None, 
                                     metrics_collections=metrics_collections, 
                                     updates_collections=updates_collections, 
                                     name = name or 'gradient_concat')

model_gradient = {
#  "accuracy": learn.MetricSpec(metric_fn=tf.metrics.accuracy,  prediction_key="classes"), # WORKS
#  "accuracy": learn.MetricSpec(metric_fn=metric_accuracy,      prediction_key="classes"), # WORKS
#  "accuracy": learn.MetricSpec(metric_fn=metric_accuracy_here, prediction_key="classes"), # WORKS
#  "accuracy": learn.MetricSpec(metric_fn=metric_mean_here,     prediction_key="classes"), # WORKS
  "gradient": learn.MetricSpec(metric_fn=metric_concat_here,   prediction_key="input_grad"), # WORKS!   
}

# Evaluate the model and print results
cnn_gradient = mnist_classifier.evaluate( 
    x=np.array([ image_orig ], dtype='float32'), y=np.array([7], dtype='int32'), 
    batch_size=1,
    metrics=model_gradient)

cnn_gradient['gradient'].shape
{% endhighlight %}


### NEW STYLE runs (uses features dictionary and integer_labels PLAIN)

This is considerably easier, since the ```features``` dictionary allows one to smuggle more values IN,
and the (non-DEPRECATED) new style also allows one to use the ```outputs``` parameter of 
```Estimator.predict()```, which means that only the tensors specified get calculated...


{% highlight python %}
def cnn_model_fn(features, integer_labels, mode):
  """Model function for CNN."""
  print("Run cnn_model_fn, mode=%s" % (mode,))

  print("New-style feature input")
  features_images=features['images']

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

  ## SMUGGLE TENSORS OUT HERE vv ##

  # For NEW-STYLE inputs (can smuggle in extra parameters)
  if type(features) is dict and 'fake_targets' in features: 
    loss_vs_target = tf.nn.sparse_softmax_cross_entropy_with_logits(
        logits=logits, 
        labels=features['fake_targets']
    )
    predictions['image_gradient_vs_fake_target'] = tf.gradients(loss_vs_target, [input_layer])

  ## SMUGGLE TENSORS OUT HERE ^^ ##

  # Return a ModelFnOps object
  return model_fn_lib.ModelFnOps(
      mode=mode, predictions=predictions, loss=loss, train_op=train_op)


# Create the Estimator : https://www.tensorflow.org/extend/estimators
mnist_classifier = learn.Estimator(
      model_fn=cnn_model_fn, 
      model_dir="mnist_convnet_model",   # This is relative to the launch directory
      )
{% endhighlight %}


And here is the function that does a ```.predict()``` to get the extra tensor value out.  Because
the ```outputs``` is defined, no superfluous computations are done :

{% highlight python %}
def mnist_direct_data_input_fn(features_np_dict, targets_np):
    features_dict = { k:tf.constant(v) for k,v in features_np_dict.items()}
    targets = None if targets_np is None else tf.constant(targets_np)
    return features_dict, targets

tensor_prediction_generator = mnist_classifier.predict( 
    input_fn=lambda: mnist_direct_data_input_fn(
        dict(
            images=np.array([ image_orig ]),
            fake_targets=np.array([ label_target ]),
        ), None), 
    outputs=['image_gradient_vs_fake_target'],
)

for tensor_predictions in tensor_prediction_generator:
    break # Get the first one...

tensor_predictions['image_gradient_vs_fake_target'].shape
{% endhighlight %}

