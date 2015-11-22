---
date: 2015-11-22
title: MatPlotLib for LaTeX
tagline: Paper submission
category: OSS
tags:
- python
- matplotlib
- latex
layout: post
published: true
---
{% include JB/setup %}

This post lays out an end-to-end working version of a script that works on Fedora 22 (at a minimum)
for producing ```matplotlib``` output that can be directly incorporated into ```LaTeX``` documents,
and has the right font sizes, etc. without going through a raster-graphics layer.

The intermediate ```.pgf``` graphics files are also acceptable to arXiv, 
and can be loaded up alongside your original ```.tex``` source file.


### Preparation

On my system that was already set up to produce regular ```LaTeX``` documents, 
the following additional packages 

{% highlight bash %}
dnf install texlive-xetex texlive-collection-xetex
{% endhighlight %}


### Basic Imports and Arguments

For stylistic consistency, I chose to have one central script that produces all the 
graphs required.  Simply call it without arguments to produce all the charts for 
embedding.  

Calling it with ```--latex=0``` will instead display a popup window with the output 
for quicker debugging of the code.  And there is an option ```--figure=XXX``` that 
can be used to focus on one figure type only.  Doing this speeds up the interation 
speed tremendously.

{% highlight python %}
import matplotlib.pyplot as plt
import numpy as np

import matplotlib
import math

import argparse

parser = argparse.ArgumentParser(description='')
parser.add_argument('-f','--figure', help='Figure to generate ("xy", None for all)', type=str, default=None)
parser.add_argument('-l','--latex', help='Produce output for LaTex docs', type=int, default=1)
args = parser.parse_args()

{% endhighlight %}


### ```LaTeX``` defaults for ```matplotlib```

This code was essentially taken from :

*  http://bkanuka.com/articles/native-latex-plots/

*  http://nipunbatra.github.io/2014/08/latexify/

and modified to bring it up-to-date.

{% highlight python %}
SPINE_COLOR = 'gray'

def savefig(filename):
  if args.latex:
    plt.savefig('figure_{}.pgf'.format(filename))
    #plt.savefig('figure_{}.pdf'.format(filename))
  else:
    plt.show()


def latexify(fig_width=None, fig_height=None):
  if args.latex:
    """Set up matplotlib's RC params for LaTeX plotting.
    Call this before plotting a figure.

    Parameters
    ----------
    fig_width : float, optional, inches
    fig_height : float,  optional, inches
    """

    # code adapted from http://www.scipy.org/Cookbook/Matplotlib/LaTeX_Examples

    # Width and max height in inches for IEEE journals taken from
    # computer.org/cms/Computer.org/Journal%20templates/transactions_art_guide.pdf

    fig_width_pt = 397.48499   # Get this from LaTeX using \the\textwidth
    inches_per_pt = 1.0/72.27  # Convert pt to inch

    if fig_width is None:
        fig_width = fig_width_pt*inches_per_pt

    if fig_height is None:
        golden_mean = (math.sqrt(5)-1.0)/2.0    # Aesthetic ratio
        fig_height = fig_width*golden_mean # height in inches

    MAX_HEIGHT_INCHES = 8.0
    if fig_height > MAX_HEIGHT_INCHES:
        print("WARNING: fig_height too large:" + fig_height + 
              "so will reduce to" + MAX_HEIGHT_INCHES + "inches.")
        fig_height = MAX_HEIGHT_INCHES

    params = {
      'backend': 'ps',
      #'text.latex.preamble': ['\usepackage{gensymb}'],
      'axes.labelsize': 8, # fontsize for x and y labels (was 10)
      'axes.titlesize': 8,
      'font.size':       8, # was 10
      'legend.fontsize': 8, # was 10
      'xtick.labelsize': 8,
      'ytick.labelsize': 8,
      'text.usetex': True,
      'figure.figsize': [fig_width,fig_height],
      'font.family': 'serif'
    }

    matplotlib.rcParams.update(params)

def format_axes(ax):
  if args.latex:
    for spine in ['top', 'right']:
        ax.spines[spine].set_visible(False)

    for spine in ['left', 'bottom']:
        ax.spines[spine].set_color(SPINE_COLOR)
        ax.spines[spine].set_linewidth(0.5)

    ax.xaxis.set_ticks_position('bottom')
    ax.yaxis.set_ticks_position('left')

    for axis in [ax.xaxis, ax.yaxis]:
        axis.set_tick_params(direction='out', color=SPINE_COLOR)

  return ax
{% endhighlight %}


### Code for a ```matplotlib``` figure

This is produced (if the command line arguments suggest it should be) by
parsing a log file output by one of my training algorithms, so there's
some sample log parsing in there.

( note that the ```b:      0``` match is done so specifically because I 
wanted to capture each epoch's ```batch=zero```, and was in a bit of a hurry... )

The data is plotted against two independent y-axes, and is finally 
saved (or displayed, depending on ```--latex=X```).

By making use of ```latexify()```, ```format_axes()``` and ```savefig()```
the whole screen vs page debate is deferred until you can get the graph looking right
interactively.

Note that mathmatical notation can be included in any of the text - 
just introduce within the ```$``` context - and make sure that ```\``` is 
doubled up - Python will 'use up' the first level of escaping.

{% highlight python %}
if args.figure is None or args.figure == 'frog':
  epoch=[]
  l2=[]
  var=[]
  mix=[]
  
  filename = '../src/4-sparse/screenlog.0-v13'
  print("Reading from  ", filename)
  with open(filename) as f:
    for l in f.readlines():
      #  epoch:   0, b:      0, l2:    168.6449, sparsity_mean_:0.1805, sigma: 0.00, mix: 0.00, 
      m = re.match("\s*epoch: +(\d+), b:      0, l2: +(\d+\.\d+), sparsity_mean_: *(\d+\.\d+), sigma: *(\d+\.\d+), mix: *(\d+\.\d+),", l)
      if m:
        epoch.append( int(m.group(1)) )
        l2.append( float(m.group(2))/1000 )
        var.append( float(m.group(3))/4 )
        mix.append( float(m.group(5))/100*2.5 )
        
  latexify()

  fig = plt.figure()
  ax = fig.add_subplot(111)
  ax.set_xlabel("Epoch number")
  
  ax.plot(epoch,l2, color='b',   label = '$L2$ error')
  ax.set_ylim([0,50.0/1000])
  ax.legend(loc=2)
  ax.set_ylabel("mean $L2$ error")

  ax2 = ax.twinx()
  ax2.plot(epoch,var, color='r', label = 'Variance of $\\mathbf{B^*}$')
  ax2.plot(epoch,mix, color='g', linestyle='--', label = '$\\lambda$ parameter')
  ax2.set_ylim([0,0.25])
  ax2.legend(loc=1)
  
  ax = format_axes(ax)
  
  savefig('frog')
{% endhighlight %}

### Code for the ```LaTeX``` document itself

Near the top of your ```.tex``` file you'll need to include the ```pgf``` package :

{% highlight latex %}
\usepackage{pgf}
{% endhighlight %}

And the figure itself can be included (and referred to) as follows :

{% highlight latex %}
\begin{figure}
 \begin{center}
  \input{figure_frog.pgf}
 \end{center}
 \caption{Performance during training of the quasi auto-encoding network}
 \label{figure:frog}
\end{figure}

Figure \ref{figure:frog} shows the performance during training ...
{% endhighlight %}

