---
layout: post
category: AI
title: Layers on top of TensorFlow #1
tagline: MNIST CNN - Rosetta Stone
date: 2016-11-26
tags: [NeuralNetworks,TensorFlow,MNIST]
published: true
---
{% include JB/setup %}



## CNN MNIST with sugar-coated ```TensorFlow```

The following is just a collection of code samples for colving CNN MNIST 
(all using roughly the same network structure)
using different layer-helpers on top of regular ```TensorFlow```.  In a review post (coming soon), 
I'll figure out which one makes the most sense to me (as someone who has previous used ```Theano```/```Lasagne```).

Currently the list is :

*  Plain ```TensorFlow```
*  ```Keras```
*  ```TF-Slim```
*  ```tf.contrib.learn``` aka ```skflow```
*  ```PrettyTensor```
*  ```TFlearn```
*  ```TensorLayer```
*  ```SugarTensor```

If you have any suggestions about other sugar-coatings I should consider, please leave a comment.


### Plain ```TensorFlow```

When building a simple CNN for MNIST, raw ```TensorFlow``` will typically build some helper functions
to make the process easier.  

The following is from [ddigiorg's repo](https://github.com/ddigiorg/AI-TensorFlow/blob/master/CNN-MNIST/CNN-MNIST.py) :

{% highlight python %}
sess = tf.InteractiveSession()

x  = tf.placeholder(tf.float32, shape=[None, 784])
y_ = tf.placeholder(tf.float32, shape=[None, 10])

# Helper functions
def weight_variable(shape):
  initial = tf.truncated_normal(shape, stddev=0.1)
  return tf.Variable(initial)

def bias_variable(shape):
  initial = tf.constant(0.1, shape=shape)
  return tf.Variable(initial)
  
def conv2d(x, W):
  return tf.nn.conv2d(x, W, strides=[1, 1, 1, 1], padding='SAME')

def max_pool_2x2(x):
  return tf.nn.max_pool(x, ksize=[1, 2, 2, 1],
                        strides=[1, 2, 2, 1], padding='SAME')


# Reshape input
x_image = tf.reshape(x, [-1,28,28,1])

#First Convolutional and Max Pool Layers
W_conv1 = weight_variable([5, 5, 1, 32])
b_conv1 = bias_variable([32])

h_conv1 = tf.nn.relu(conv2d(x, W_conv1) + b_conv1)
h_pool1 = max_pool_2x2(h_conv1)

#Second Convolutional and Max Pool Layers
W_conv2 = weight_variable([5, 5, 32, 64])
b_conv2 = bias_variable([64])

h_conv2 = tf.nn.relu(conv2d(h_pool1, W_conv2) + b_conv2)
h_pool2 = max_pool_2x2(h_conv2)

#Densely Connected Layer
W_fcl = weight_variable([7 * 7 * 64, 1024])
b_fcl = bias_variable([1024])

h_pool2_flat = tf.reshape(h_pool2, [-1, 7 * 7 * 64])
h_fcl = tf.nn.relu(tf.matmul(h_pool2_flat, W_fcl) + b_fcl)

#Dropout
keep_prob = tf.placeholder("float")
h_fc1_drop = tf.nn.dropout(h_fcl, keep_prob)

#Output Layer (Softmax)
W_fc2 = weight_variable([1024, 10])
b_fc2 = bias_variable([10])

y_conv = tf.nn.softmax(tf.matmul(h_fc1_drop, W_fc2) + b_fc2)

#Train and Evaluate the Model
cross_entropy = -tf.reduce_sum(y_*tf.log(y_conv))
train_step = tf.train.AdamOptimizer(1e-4).minimize(cross_entropy)
correct_prediction = tf.equal(tf.argmax(y_conv, 1), tf.argmax(y_, 1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, "float"))

sess.run(tf.initialize_all_variables())
for i in range(20000):
    batch = mnist.train.next_batch(50)
    if i % 100 == 0:
        train_accuracy = accuracy.eval(feed_dict = {x:batch[0], y_: batch[1], keep_prob: 1.0})
        print("step %d, training accuracy %g" % (i, train_accuracy))
    train_step.run(feed_dict = {x: batch[0], y_: batch[1], keep_prob: 0.5})

print("test accuracy %g" % accuracy.eval(feed_dict = {x: mnist.test.images, y_: mnist.test.labels, keep_prob: 1.0}))
{% endhighlight %}

A more interesting example that uses pure ```TensorFlow``` is [Fast Style Transfer](https://github.com/lengstrom/fast-style-transfer/).


### [```Keras```](https://github.com/fchollet/keras)

This is a popular frontend - particularly since it can use both ```Theano``` and ```TensorFlow``` as a backend.

The flip-side of this flexibility is that one loses the ability to 
dig into the backend's explicit representation : So adding custom layers is (roughly speaking) no longer possible.

One can see from the ```model=Sequential(); model.add( fn )``` code that ```Keras``` has 
its own environment for formulating the computational graph, before handing it off to whichever
backend is chosen.

{% highlight python %}

from keras.datasets import mnist
from keras.models import Sequential
from keras.layers import Dense, Dropout, Activation, Flatten
from keras.layers import Convolution2D, MaxPooling2D
from keras.utils import np_utils
#from keras import backend as K  # Can detect 'theano' vs 'tensorflow'

X_train = X_train.reshape(X_train.shape[0], img_rows, img_cols, 1)
X_test = X_test.reshape(X_test.shape[0], img_rows, img_cols, 1)
input_shape = (img_rows, img_cols, 1)

# convert class vectors to binary class matrices
Y_train = np_utils.to_categorical(y_train, nb_classes)
Y_test  = np_utils.to_categorical(y_test, nb_classes)

model = Sequential()

model.add(Convolution2D(nb_filters, kernel_size[0], kernel_size[1],
                        border_mode='valid',
                        input_shape=input_shape))
model.add(Activation('relu'))
model.add(Convolution2D(nb_filters, kernel_size[0], kernel_size[1]))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=pool_size))
model.add(Dropout(0.25))

model.add(Flatten())
model.add(Dense(128))
model.add(Activation('relu'))
model.add(Dropout(0.5))
model.add(Dense(nb_classes))
model.add(Activation('softmax'))

model.compile(loss='categorical_crossentropy',
              optimizer='adadelta',
              metrics=['accuracy'])

model.fit(X_train, Y_train, batch_size=batch_size, nb_epoch=nb_epoch,
          verbose=1, validation_data=(X_test, Y_test))
score = model.evaluate(X_test, Y_test, verbose=0)
{% endhighlight %}


### [```TF-Slim```](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/contrib/slim)

This looks like 'just what the Doctor ordered', until you look into the [seq2seq code](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/contrib/seq2seq/python/ops/layers.py),
and find that the promising looking library has quite a few stubbed functions, which solely execute ```pass```.

From a [subdirectory of the  main TensorFlow repo](https://github.com/tensorflow/models/blob/master/slim/nets/lenet.py) :

{% highlight python %}
import tensorflow as tf

slim = tf.contrib.slim

def lenet(images, num_classes=10, is_training=False,
          dropout_keep_prob=0.5, prediction_fn=slim.softmax,
          scope='LeNet'):
  """Creates a variant of the LeNet model.
  Args:
    images: A batch of `Tensors` of size [batch_size, height, width, channels].
    scope: Optional variable_scope.
  Returns:
    logits: the pre-softmax activations, a tensor of size [batch_size, `num_classes`]
    end_points: a dictionary from components of the network to the corresponding activation.
  """
  end_points = {}

  with tf.variable_scope(scope, 'LeNet', [images, num_classes]):
    net = slim.conv2d(images, 32, [5, 5], scope='conv1')
    net = slim.max_pool2d(net, [2, 2], 2, scope='pool1')
    net = slim.conv2d(net, 64, [5, 5], scope='conv2')
    net = slim.max_pool2d(net, [2, 2], 2, scope='pool2')
    net = slim.flatten(net)
    end_points['Flatten'] = net

    net = slim.fully_connected(net, 1024, scope='fc3')
    net = slim.dropout(net, dropout_keep_prob, is_training=is_training,
                       scope='dropout3')
    logits = slim.fully_connected(net, num_classes, activation_fn=None,
                                  scope='fc4')

  end_points['Logits'] = logits
  end_points['Predictions'] = prediction_fn(logits, scope='Predictions')

  return logits, end_points

lenet.default_image_size = 28

def lenet_arg_scope(weight_decay=0.0):
  """Defines the default lenet argument scope.
  Args:
    weight_decay: The weight decay to use for regularizing the model.
  Returns:
    An `arg_scope` to use for the inception v3 model.
  """
  with slim.arg_scope( [slim.conv2d, slim.fully_connected],
      weights_regularizer=slim.l2_regularizer(weight_decay),
      weights_initializer=tf.truncated_normal_initializer(stddev=0.1),
      activation_fn=tf.nn.relu) as sc:
    return sc

# ...

labels = slim.one_hot_encoding(
    labels, dataset.num_classes - FLAGS.labels_offset)
batch_queue = slim.prefetch_queue.prefetch_queue(
    [images, labels], capacity=2 * deploy_config.num_clones)    
    
# ...

# slim.learning.train( ... )
{% endhighlight %}


### [```PrettyTensor```](https://github.com/google/prettytensor)

The [main code](https://github.com/google/prettytensor) demonstrates the 'Fluent' style of function chaining,
though there are some complaints about [documentation](https://github.com/google/prettytensor/blob/master/docs/pretty_tensor_top_level.md).

Nice [tutorial walk-through](https://www.youtube.com/watch?v=GCUfJQ_dec8), with 
[code in GitHub](https://github.com/Hvass-Labs/TensorFlow-Tutorials/blob/master/03_PrettyTensor.ipynb)  :


{% highlight python %}
%matplotlib inline
import tensorflow as tf
import numpy as np

import prettytensor as pt

from tensorflow.examples.tutorials.mnist import input_data
data = input_data.read_data_sets('data/MNIST/', one_hot=True)

# initialisation is standard Tensorflow
x = tf.placeholder(tf.float32, shape=[None, img_size_flat], name='x')
x_image = tf.reshape(x, [-1, img_size, img_size, num_channels])
y_true = tf.placeholder(tf.float32, shape=[None, 10], name='y_true')
y_true_cls = tf.argmax(y_true, dimension=1)


# Now the PrettyTensor magic
x_pretty = pt.wrap(x_image)

with pt.defaults_scope(activation_fn=tf.nn.relu):
    y_pred, loss = x_pretty.\
        conv2d(kernel=5, depth=16, name='layer_conv1').\
        max_pool(kernel=2, stride=2).\
        conv2d(kernel=5, depth=36, name='layer_conv2').\
        max_pool(kernel=2, stride=2).\
        flatten().\
        fully_connected(size=128, name='layer_fc1').\
        softmax_classifier(class_count=10, labels=y_true)

# This is a helper function to extract mid-flow variables for inspection
def get_weights_variable(layer_name):
    # Retrieve an existing variable named 'weights' in the scope
    # with the given layer_name.
    # This is awkward because the TensorFlow function was
    # really intended for another purpose.

    with tf.variable_scope(layer_name, reuse=True):
        variable = tf.get_variable('weights')
    return variable
    
weights_conv1 = get_weights_variable(layer_name='layer_conv1')
weights_conv2 = get_weights_variable(layer_name='layer_conv2')

# rest of code as before...
optimizer = tf.train.AdamOptimizer(learning_rate=1e-4).minimize(loss)

{% endhighlight %}


### [```TFlearn```](http://tflearn.org) (not ```tf.contrib.learn```)

Documentation [all online](http://tflearn.org) in regular Python Sphinx format.

Complete example from main [TFlearn GitHub repo](https://github.com/tflearn/tflearn/blob/master/examples/images/convnet_mnist.py) :

{% highlight python %}
from __future__ import division, print_function, absolute_import

import tflearn
from tflearn.layers.core import input_data, dropout, fully_connected
from tflearn.layers.conv import conv_2d, max_pool_2d
from tflearn.layers.normalization import local_response_normalization
from tflearn.layers.estimator import regression

# Data loading and preprocessing
import tflearn.datasets.mnist as mnist
X, Y, testX, testY = mnist.load_data(one_hot=True)
X = X.reshape([-1, 28, 28, 1])
testX = testX.reshape([-1, 28, 28, 1])

# Building convolutional network
network = input_data(shape=[None, 28, 28, 1], name='input')
network = conv_2d(network, 32, 3, activation='relu', regularizer="L2")
network = max_pool_2d(network, 2)
network = local_response_normalization(network)
network = conv_2d(network, 64, 3, activation='relu', regularizer="L2")
network = max_pool_2d(network, 2)
network = local_response_normalization(network)
network = fully_connected(network, 128, activation='tanh')
network = dropout(network, 0.8)
network = fully_connected(network, 256, activation='tanh')
network = dropout(network, 0.8)
network = fully_connected(network, 10, activation='softmax')
network = regression(network, optimizer='adam', learning_rate=0.01,
                     loss='categorical_crossentropy', name='target')

# Training
model = tflearn.DNN(network, tensorboard_verbose=0)
model.fit({'input': X}, {'target': Y}, n_epoch=20,
           validation_set=({'input': testX}, {'target': testY}),
           snapshot_step=100, show_metric=True, run_id='convnet_mnist')
{% endhighlight %}


### [```TensorLayer```](http://tensorlayer.readthedocs.io/en/latest/)

Documentation [all online](http://tensorlayer.readthedocs.io/en/latest/) in regular Python Sphinx format.

Partial example from the [documentation itself](http://tensorlayer.readthedocs.io/en/latest/user/tutorial.html#convolutional-neural-network-cnn) :

{% highlight python %}
network = tl.layers.InputLayer(x, name='input_layer')
network = tl.layers.Conv2dLayer(network,
                        act = tf.nn.relu,
                        shape = [5, 5, 1, 32],  # 32 features for each 5x5 patch
                        strides=[1, 1, 1, 1],
                        padding='SAME',
                        name ='cnn_layer1')     # output: (?, 28, 28, 32)
network = tl.layers.PoolLayer(network,
                        ksize=[1, 2, 2, 1],
                        strides=[1, 2, 2, 1],
                        padding='SAME',
                        pool = tf.nn.max_pool,
                        name ='pool_layer1',)   # output: (?, 14, 14, 32)
network = tl.layers.Conv2dLayer(network,
                        act = tf.nn.relu,
                        shape = [5, 5, 32, 64], # 64 features for each 5x5 patch
                        strides=[1, 1, 1, 1],
                        padding='SAME',
                        name ='cnn_layer2')     # output: (?, 14, 14, 64)
network = tl.layers.PoolLayer(network,
                        ksize=[1, 2, 2, 1],
                        strides=[1, 2, 2, 1],
                        padding='SAME',
                        pool = tf.nn.max_pool,
                        name ='pool_layer2',)   # output: (?, 7, 7, 64)
network = tl.layers.FlattenLayer(network, name='flatten_layer')
                                                # output: (?, 3136)
network = tl.layers.DropoutLayer(network, keep=0.5, name='drop1')
                                                # output: (?, 3136)
network = tl.layers.DenseLayer(network, n_units=256, act = tf.nn.relu, name='relu1')
                                                # output: (?, 256)
network = tl.layers.DropoutLayer(network, keep=0.5, name='drop2')
                                                # output: (?, 256)
network = tl.layers.DenseLayer(network, n_units=10,
                act = tf.identity, name='output_layer')
                                                # output: (?, 10)

y = network.outputs
y_op = tf.argmax(tf.nn.softmax(y), 1)
cost = tf.reduce_mean(tf.nn.sparse_softmax_cross_entropy_with_logits(y, y_))

cost = cost + tl.cost.maxnorm_regularizer(1.0)(network.all_params[0]) +
              tl.cost.maxnorm_regularizer(1.0)(network.all_params[2])

train_params = network.all_params
train_op = tf.train.AdamOptimizer(learning_rate, beta1=0.9, beta2=0.999,
    epsilon=1e-08, use_locking=False).minimize(cost, var_list=train_params)

# ...

feed_dict = {x: X_train_a, y_: y_train_a}
feed_dict.update( network.all_drop )
sess.run(train_op, feed_dict=feed_dict)

# ...

for batch in tl.iterate.minibatches(inputs, targets, batchsize, shuffle=False):
  print(batch)   # ... creates batches for Training
# ...

dp_dict = tl.utils.dict_to_one( network.all_drop )
feed_dict = {x: X_test_a, y_: y_test_a}
feed_dict.update(dp_dict)
err, ac = sess.run([cost, acc], feed_dict=feed_dict)

# ...

correct_prediction = tf.equal(tf.argmax(y, 1), y_)
acc = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

{% endhighlight %}


### [```tf.contrib.learn``` aka ```skflow```](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/contrib/learn/python/learn)

Not to be confused with ```tflearn```...

Head of [their part of the TensorFlow repo](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/contrib/learn/python/learn).

Documentation at [the main TensorFlow site](https://www.tensorflow.org/versions/r0.11/tutorials/tflearn/index.html).

Code from [the skflow examples directory](https://github.com/tensorflow/tensorflow/blob/r0.11/tensorflow/examples/skflow/mnist.py) :

{% highlight python %}
"""This showcases how simple it is to build image classification networks.
It follows description from this TensorFlow tutorial:
    https://www.tensorflow.org/versions/master/tutorials/mnist/pros/index.html#deep-mnist-for-experts
"""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from sklearn import metrics
import tensorflow as tf
from tensorflow.contrib import learn

### Download and load MNIST data.
mnist = learn.datasets.load_dataset('mnist')


### Linear classifier.
feature_columns = learn.infer_real_valued_columns_from_input(mnist.train.images)
classifier = learn.LinearClassifier(
    feature_columns=feature_columns, n_classes=10)
classifier.fit(mnist.train.images, mnist.train.labels, batch_size=100,
               steps=1000)
score = metrics.accuracy_score(
    mnist.test.labels, classifier.predict(mnist.test.images))
print('Accuracy: {0:f}'.format(score))


### Convolutional network
def max_pool_2x2(tensor_in):
  return tf.nn.max_pool(
      tensor_in, ksize=[1, 2, 2, 1], strides=[1, 2, 2, 1], padding='SAME')

def conv_model(X, y):
  # pylint: disable=invalid-name,missing-docstring
  # reshape X to 4d tensor with 2nd and 3rd dimensions being image width and
  # height final dimension being the number of color channels.
  X = tf.reshape(X, [-1, 28, 28, 1])
  
  # first conv layer will compute 32 features for each 5x5 patch
  with tf.variable_scope('conv_layer1'):
    h_conv1 = learn.ops.conv2d(X, n_filters=32, filter_shape=[5, 5],
                               bias=True, activation=tf.nn.relu)
    h_pool1 = max_pool_2x2(h_conv1)
    
  # second conv layer will compute 64 features for each 5x5 patch.
  with tf.variable_scope('conv_layer2'):
    h_conv2 = learn.ops.conv2d(h_pool1, n_filters=64, filter_shape=[5, 5],
                               bias=True, activation=tf.nn.relu)
    h_pool2 = max_pool_2x2(h_conv2)
    # reshape tensor into a batch of vectors
    h_pool2_flat = tf.reshape(h_pool2, [-1, 7 * 7 * 64])
    
  # densely connected layer with 1024 neurons.
  h_fc1 = learn.ops.dnn(
      h_pool2_flat, [1024], activation=tf.nn.relu, dropout=0.5)
  return learn.models.logistic_regression(h_fc1, y)

# Training and predicting.
classifier = learn.TensorFlowEstimator(
    model_fn=conv_model, n_classes=10, batch_size=100, steps=20000,
    learning_rate=0.001)
classifier.fit(mnist.train.images, mnist.train.labels)
score = metrics.accuracy_score(
    mnist.test.labels, classifier.predict(mnist.test.images))
print('Accuracy: {0:f}'.format(score))
{% endhighlight %}



### [```sugartensor```](https://github.com/buriburisuri/sugartensor)

This jumped out because of the same author used it to reimplement [Speech-to-Text-WaveNet](https://github.com/buriburisuri/speech-to-text-wavenet).

Documentation is very limited (mainly read-the-code), but the [code is in GitHub](https://github.com/buriburisuri/sugartensor), 
and makes the interesting choice of putting itself on the TensorFlow tensor variable structure itself, with the prefix ```sg_```
to avoid polluting the namespace.  This is somewhere in between {clever, ingenious, convenient} and nasty (TBD).  And it 
also means that these sugar methods can be chained (like ```prettytensor```, without requiring special wrapping).

Code from [main repository README](https://github.com/buriburisuri/sugartensor) :

{% highlight python %}
import sugartensor as tf

# set log level to debug
tf.sg_verbosity(10)

# MNIST input tensor ( with QueueRunner )
data = tf.sg_data.Mnist()

# inputs
x = data.train.image
y = data.train.label

# create training graph
with tf.sg_context(act='relu', bn=True):
    logit = (x.sg_conv(dim=16).sg_pool()
             .sg_conv(dim=32).sg_pool()
             .sg_conv(dim=32).sg_pool()
             .sg_flatten()
             .sg_dense(dim=256)
             .sg_dense(dim=10, act='linear', bn=False))

# cross entropy loss with logit ( for training set )
loss = logit.sg_ce(target=y)

# accuracy evaluation ( for validation set )
acc = (logit.sg_reuse(input=data.valid.image).sg_softmax()
       .sg_accuracy(target=data.valid.label, name='val'))

# train
tf.sg_train(loss=loss, eval_metric=[acc], ep_size=data.train.num_batch, save_dir='asset/train/conv')
{% endhighlight %}
