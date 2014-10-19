---
date: 2014-10-20
title: PyGtk in Fedora virtualenv (for matplotlib)
category: OSS
tags: [linux, fedora, matplotlib, ipython, python]
layout: post
published: false
---
{% include JB/setup %}

IPython notebook is a very nice experimentation platform, however it seems to be a little unintuitive to use when using as part of a larger non-experimental codebase.  The following shows how a couple of directory tweaks can be made without altering any configuration files.

### Subdirectory model desired

When coding up a larger project, it's helpful to have everything in the familiar directory structure :

{% highlight bash %}
{BASE}
--- src/*.py
--- src/Module1/__init__.py ...(etc)
--- src/Module2/__init__.py ...(etc)
--- data/*.csv
--- notebooks/*.ipynb
{% endhighlight %}

And standard scripts (in src/xyz.py) can be run in ```{BASE}``` by simply :
{% highlight bash %}
python src/xyz.py
{% endhighlight %}

These scripts can ```import``` the internal modules straightforwardly, and the base directory for accessing the data will be 'data/'.

At the same time, the IPython notebooks are kept in a separate 'notebooks/' directory, which messes up all the paths.


### IPython notebook entries

Open up an IPython notebook in 'notebooks/', and have the following preamble :

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
{% endhighlight %}

