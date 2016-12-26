---
layout: post
category: AI
title: Deep Learning Frameworks
tagline: MNIST CNN - Rosetta Stone
date: 2016-12-27
tags: [NeuralNetworks,MNIST]
published: false
---
{% include JB/setup %}


As someone who has previous used ```Theano``` / ```Lasagne```, I noticed immediately
when a Bengio-lab paper offered its accompanying code in ```TensorFlow```.  It's possible 
that the tides are changing for ```Theano``` - and I want to make sure that my
current Deep Learning Workshop repo remains relevant to what people believe they should
learn...


## CNN MNIST using various frameworks

The following is just a collection of code samples for solving CNN MNIST 
(all using roughly the same network structure)
using different deep learning frameworks (without additional sugar layers) : 

*  [```Caffe```](http://caffe.berkeleyvision.org/) - Berkeley research
*  [```Torch```](https://github.com/torch/torch7) - Facebook
*  [```CNTK```](https://github.com/Microsoft/CNTK) - Microsoft
*  [```PaddlePaddle```](https://github.com/PaddlePaddle/Paddle) - Baidu
*  [```MXNet```](https://github.com/dmlc/mxnet) - Amazon (and DSSTNE?)
*  [```TensorFlow```](https://github.com/tensorflow/tensorflow) - Google
*  [```Theano```](https://github.com/Theano/Theano) - MILA (Montreal research)

If you have any suggestions about other frameworks I should consider, please leave a comment.


### [Plain ```TensorFlow```](https://www.tensorflow.org/)

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

A more interesting example that uses pure ```TensorFlow``` is [Fast Style Transfer](https://github.com/lengstrom/fast-style-transfer/),
or this [thorough LSTM-based tutorial](https://github.com/guillaume-chevalier/LSTM-Human-Activity-Recognition/).

<!--
Machinarium
dnf install libXt.i686 nss.i686 adwaita-gtk2-theme.i686 libcurl.i686


LIBGL_DEBUG=verbose ./Machinarium 
libGL: Can't open configuration file /home/andrewsm/.drirc: No such file or directory.

libGL: pci id for fd 5: 8086:0a16, driver i965
libGL: OpenDriver: trying /usr/lib/dri/tls/i965_dri.so
libGL: OpenDriver: trying /usr/lib/dri/i965_dri.so
libGL: dlopen /usr/lib/dri/i965_dri.so failed (/usr/lib/dri/i965_dri.so: cannot open shared object file: No such file or directory)
libGL error: unable to load driver: i965_dri.so
libGL error: driver pointer missing
libGL error: failed to load driver: i965

libGL: pci id for fd 5: 8086:0a16, driver i965
libGL: OpenDriver: trying /usr/lib/dri/tls/i965_dri.so
libGL: OpenDriver: trying /usr/lib/dri/i965_dri.so
libGL: dlopen /usr/lib/dri/i965_dri.so failed (/usr/lib/dri/i965_dri.so: cannot open shared object file: No such file or directory)
libGL error: unable to load driver: i965_dri.so
libGL error: driver pointer missing
libGL error: failed to load driver: i965

libGL: OpenDriver: trying /usr/lib/dri/tls/swrast_dri.so
libGL: OpenDriver: trying /usr/lib/dri/swrast_dri.so
libGL: dlopen /usr/lib/dri/swrast_dri.so failed (/usr/lib/dri/swrast_dri.so: cannot open shared object file: No such file or directory)
libGL error: unable to load driver: swrast_dri.so
libGL error: failed to load driver: swrast

## Did not fix any error messages
#dnf install xorg-x11-drv-intel.i686


CrayonPhysicsDeluxe
https://www.rpmfind.net/linux/RPM/fedora/devel/rawhide/i386/s/SDL-1.2.15-22.fc26.i686.html

https://apps.fedoraproject.org/packages/SDL
dnf install https://kojipkgs.fedoraproject.org//packages/SDL/1.2.15/21.fc24/i686/SDL-1.2.15-21.fc24.i686.rpm
dnf install mesa-libGLU.i686

!-->
