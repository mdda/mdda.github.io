---
date: 2014-10-13
title: IPython and Theano in Fedora with virtualenv
category: OSS
tags: [linux, fedora, theano, python, ipython]
layout: post
published: true
---
{% include JB/setup %}

IPython notebook makes for a very productive print-ready advanced ```REPL```.  When combined with Theano, and other python datascience tools, it's almost unbeatable.

However, the installation instructions for each component are a little scattered, and this is an end-to-end explanation of what worked for me.

### First steps (RPMs)

First, update the system so that the basics are there :

{% highlight bash %}
sudo yum update bash
sudo yum install python-virtualenv 
{% endhighlight %}

### Install interop and numerical RPMs

For 'pylearn2' and 'ipython notebook' :

{% highlight bash %}
sudo yum install libyaml-devel zeromq-devel
{% endhighlight %}

For SciPy :

{% highlight bash %}
sudo yum install openblas-devel atlas-devel gcc-gfortran
{% endhighlight %}

Later, I'll be experimenting with ```OpenCL``` - and hope that Theano will be able to make use of ```CLBLAS```, etc.  (Fingers-crossed).

### VirtualEnv setup

{% highlight bash %}
virtualenv env
. env/bin/activate
{% endhighlight %}

Python environment installation within the ```virtualenv```, with bleeding-edge Theano and PyLearn2 :

{% highlight bash %}
pip install cython numpy

# This directory chosen as 'neutral'
cd env

  git clone git://github.com/Theano/Theano.git
  cd Theano
    # By setting up 'develop', this directory becomes live in-place
    python setup.py develop
  cd ..

  git clone git://github.com/lisa-lab/pylearn2.git
  cd pylearn2
    # By setting up 'develop', this directory becomes live in-place
    python setup.py develop
  cd ..

cd ..
{% endhighlight %}


### IPython notebook installation

Python environment installation within the ```virtualenv``` (apparently ```ipython``` installation on its own doesn't pull in the dependencies) :

{% highlight bash %}
pip install ipython pyzmq jinja2 tornado matplotlib
{% endhighlight %}

### IPython notebook running

{% highlight bash %}
ipython notebook
# and open a browser to http://localhost:8888/
{% endhighlight %}

The 'magic' required to enable inline plotting by ```matplotlib``` with the IPython notebook is : 
{% highlight bash %}
%matplotlib inline
{% endhighlight %}

Have fun!
