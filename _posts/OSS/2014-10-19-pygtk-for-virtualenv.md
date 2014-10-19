---
date: 2014-10-20
title: PyGtk in Fedora virtualenv (for matplotlib)
category: OSS
tags: [linux, fedora, matplotlib, python]
layout: post
published: true
---
{% include JB/setup %}

A previous post explained how to set up a Python virtualenv with a great tool suite : IPython, NumPy, SciPy, Theano, PyLearn2 and matplotlib.  However, when 'systematising' an application out of IPython research it's helpful to have a working matplotlib outside of IPython.

The following assumes you've set up a virtualenv for Python already.

It's a little bit of a hack, since it relies on the system-wide installation of ```PyGtk``` : Doing it truely within a virtualmin proved extremely tricky (ditto for ```Tkinter```).

### Update the current virtualenv with ```--system-site-packages```

If you're currently 'in' the virtualenv, leave it :

{% highlight bash %}
deactivate
{% endhighlight %}

This update is a bit naughty - but it appears to leave currently installed extra modules alone (and then enters the virtualenv) :

{% highlight bash %}
virtualenv env --system-site-packages
. env/bin/activate
{% endhighlight %}

### Uninstall the current matplotlib

If you haven't installed matplotlib yet, then skip this step.

Remove the current ```matplotlib```, while in the correct ```(env) $``` :

{% highlight bash %}
pip uninstall matplotlib
{% endhighlight %}

### Install system-wide RPMs

{% highlight bash %}
sudo yum install pygtk2 pygtk2-devel
{% endhighlight %}


### Redo the matplotlib setup

Early on in the installation 'configuration debug', there will be a summary of the currently detected modules available - it should now include all the Gtk options.

{% highlight bash %}
pip install matplotlib
{% endhighlight %}


### Check installation in the REPL

Make sure you're in the right virtualenv, and then enter at the Python REPL (without the ```>>>```, of course) :

{% highlight python %}
>>> import matplotlib.pyplot as plt
>>> fig = plt.figure()
>>> ax = fig.add_subplot(111)
>>> ax.plot([5,3,7,6,2,5])
>>> plt.show()
{% endhighlight %}

... and (if everything is working) a fairly ugly GTK window will appear with a simple line chart in it.

Have fun!
