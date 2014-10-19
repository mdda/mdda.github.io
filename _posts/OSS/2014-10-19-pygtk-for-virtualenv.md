---
date: 2014-10-20
title: PyGtk in Fedora virtualenv (for matplotlib)
category: OSS
tags: [linux, fedora, matplotlib, python]
layout: post
published: false
---
{% include JB/setup %}

A previous post explained how to set up a Python virtualenv with a great tool suite : IPython, NumPy, SciPy, Theano, PyLearn2 and matplotlib.  However, when 'systematising' an application out of IPython research it's helpful to have a working matplotlib outside of IPython.

The following assumes you've set up a virtualenv for Python already, and are 'in' it.

It's a little bit of a hack, since it relies on the system-wide installation of ```PyGtk``` : Doing it truely within a virtualmin proved extremely tricky (ditto for ```Tkinter```).

### First steps - undo the current matplotlib

If you haven't installed matplotlib yet, then skip this step.

First, update the system so that the basics are there :

{% highlight bash %}
sudo yum install python-virtualenv 
{% endhighlight %}

### First steps (RPMs)

First, update the system so that the basics are there :

{% highlight bash %}
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
