---
date: 2014-10-20
title: IPython with 'project-style' directories
category: OSS
tags: [linux, ipython, python, matplotlib]
layout: post
published: false
---
{% include JB/setup %}

IPython notebook is a very nice experimentation platform, however it seems to be a little unintuitive to use when using as part of a larger 'non-experimental' codebase.  The following shows how a couple of directory tweaks can be made without altering any IPython configuration files.

If there's a better way to do this, please let me know.  This feels like a hack.


### Subdirectory model desired

When coding up a larger project, it's helpful to have everything in the familiar directory structure :

{% highlight bash %}
./                         # {BASE DIRECTORY}
./src/*.py
./src/Module1/__init__.py  # ...(etc)
./src/Module2/__init__.py  # ...(etc)
./data/*.csv
./notebooks/*.ipynb
{% endhighlight %}

And standard scripts (for instance ```src/xyz.py```) can be run in ```{BASE}``` by simply :
{% highlight bash %}
python src/xyz.py
{% endhighlight %}

These scripts can ```import``` the internal modules straightforwardly, and the base directory for accessing the data will be 'data/'.

At the same time, the IPython notebooks are kept in a separate 'notebooks/' directory, which messes up all the paths.


### IPython notebook preamble

Open up an IPython notebook in 'notebooks/', and have the following cell at the start to pull in the modules, and data with the correct relative paths :

{% highlight python %}
%pushd
%cd ../src
import EEG
%cd ..
p = EEG.EEG('Dog_2', 'interictal', 17)
p.normalize_channels()
%popd
{% endhighlight %}

Running matplotlib thereafter :

{% highlight python %}
%matplotlib inline
import matplotlib.pyplot as plt
plt.rcParams['figure.figsize'] = (16.0, 8.0)
import numpy as np
{% endhighlight %}

