---
date: 2017-10-29
title: Zeal Machine Learning Docsets
tagline: Offline is quicker
category: OSS
tags:
- fedora
- linux
- PyTorch
- TensorFlow
layout: post
published: true
---
{% include JB/setup %}

## Search Framework APIs online is Tedious

Solution is to download an offline reader : Not only can it be used without an internet connection,
but the searching / redrawing is also much quicker.

As ```root``` you just need :

{% highlight bash %}
dnf install zeal
{% endhighlight %}

And then as a user on the command line:

{% highlight bash %}
zeal
{% endhighlight %}

(or use StartMenu-Develoment-Zeal in the window manager).

### ```TensorFlow 1.4.0rc0``` documentation

I found the helpful TensorFlow DocSet via (https://github.com/ppwwyyxx/dash-docset-tensorflow) :

{% highlight bash %}
# Download (with redirects enabled)
cd ~/.local/share/Zeal/Zeal/docsets/
curl -L -O https://github.com/ppwwyyxx/dash-docset-tensorflow/releases/download/1.4.0rc0/TensorFlow-1.4.0.tgz
tar -xzf TensorFlow-1.4.0.tgz
{% endhighlight %}

This DocSet works as expected, and is a huge help when dabbling with ```TensorFlow``` code.


### ```PyTorch``` documentation

The ```PyTorch``` documentation is good, except that the search functionality online is very frustrating, 
since the individual function search index points to a link that requires the page to redraw several times,
causing the display to leap around.

I found a somewhat helpful PyTorch DocSet via (https://github.com/iamaziz/PyTorch-docset) :

{% highlight bash %}
# Download (with redirects enabled)
cd ~/.local/share/Zeal/Zeal/docsets/
curl -L -O https://github.com/iamaziz/PyTorch-docset/raw/master/PyTorch.tgz
tar -xzf PyTorch.tgz
{% endhighlight %}

One problem is that the DocSet creator doesn't index the individual functions properly.  However, 
if you pull up the main PyTorch page, the original search functions are there within the pane - and 
render much quicker than using the website online.  But still... it's not optimal.


#### Better ```PyTorch``` documentation 

Since the original documentation for ```PyTorch``` is built via ```Sphinx```, there's a much cleaner 
way of creating the documentation : use ```doc2dash``` within the sphinx build of the ```PyTorch``` documentation itself:

{% highlight bash %}
git clone https://github.com/pytorch/pytorch.git  # Get the full repo down
cd pytorch/docs/

# Move to the branch of the code that matches your installed version of PyTorch
# this ensures that the docs you get are relevant (PyTorch moves very quickly...)
git checkout v0.2.0

. ~/env3/bin/activate # Or whatever you are using for a VirtualEnv

pip install -r requirements.txt
pip install doc2dash

make docset

cp -r PyTorch.docset ~/.local/share/Zeal/Zeal/docsets/
{% endhighlight %}

Once this is confirmed to create decent documents (worked 2nd time for me : once the branch version matched the installed version),
you can safely remove the repo.

All done.

