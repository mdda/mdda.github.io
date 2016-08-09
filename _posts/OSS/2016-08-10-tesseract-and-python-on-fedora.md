---
date: 2016-08-10
title: Tesseract and Python on Fedora
category: OSS
tags:
- fedora
- linux
- tesseract
- python
layout: post
published: false
---
{% include JB/setup %}

Fedora, while including a comprehensive ```tesseract``` set of ```rpm```s, doesn't have the equivalent of 
```tesseract-python```, so I needed something to build/import easily.

However, quick Google searches offer [several solutions](https://www.quora.com/How-do-I-use-PyTesser-and-Tesseract-OCR-in-Ubuntu-with-Python) that now look inappropriate : 

*  [pip install tesseract](https://code.google.com/archive/p/python-tesseract/) appears to contain a complete, old
  ```tesseract``` build - it's 40Mb

*  [pip install pytesseract](https://pypi.python.org/pypi/pytesseract) is GPL3, which is inappropriate for my use-case

*  Using ```tesseract``` directly via commandline embedding

However, reading the ```tesseract``` project's wiki pages on github indicate that there are several
other choices available, and I (somewhat arbitrarily) chose [```tesserocr```](https://github.com/sirfz/tesserocr), which is MIT licensed, and 
has a fairly comprehensive API into the 'raw' ```tesseract``` C/C++ code.


### Installation of ```tesserocr```

{% highlight bash %}
sudo dnf install tesseract-devel
pip install tesserocr
{% endhighlight %}


### Usage

{% highlight python %}

{% endhighlight %}
