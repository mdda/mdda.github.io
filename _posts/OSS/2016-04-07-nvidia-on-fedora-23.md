---
date: 2016-04-07
title: Nvidia (7.0) installation for Theano on Fedora 23
category: OSS
tags:
- fedora
- linux
- Nvidia
- theano
layout: post
published: true
---
{% include JB/setup %}

### Extra Fix required for Nvidia NVCC to work under Fedora 23

Fedora 23 changed a default ```gcc``` ABI setting from that in Fedora 22.  The previous value
was chosen to match earlier versions of ```gcc``` as closely as possible, so this 
change actually broke systems that want the earlier behaviour : In our case, Nvidia's tool chain.

This has to be fixed, by adding additional options into the ```NVCC``` invocations.  Doing this
is not so easy...

These instructions build on the <a href="/oss/2015/07/07/nvidia-on-fedora-22" target="_blank">previous Fedora 22 version</a>.


### Fix the CUDA headers to accept new ```gcc``` (5.3.1 for Fedora 23)

Now, as ```root```, fix up Nvidia's header file that disallows ``gcc`` greater than ``v4.9``...

In file ``/usr/local/cuda-7.0/include/host_config.h``, look to make the following replacement : 

{% highlight c++ %}
// #if __GNUC__ > 4 || (__GNUC__ == 4 && __GNUC_MINOR__ > 9)  // Old version commented out
// This is the updated line, which guards again gcc > 5.4.x instead
#if __GNUC__ > 5 || (__GNUC__ == 5 && __GNUC_MINOR__ > 4)
{% endhighlight %}


### Prove that it's still broken

As a regular user, let's try out one of the CUDA samples from within a clean directory (and then fix it):

{% highlight bash %}
cd ~        # for instance
mkdir cuda  # for instance
cd cuda
rsync -av /usr/local/cuda/samples .
cd samples/
cd 0_Simple/asyncAPI/
make
{% endhighlight %}

... this will FAIL, with a nasty looking message like these ::
{% highlight bash %}
/usr/include/c++/5.3.1/bits/locale_classes.tcc:283:23: error: template argument required for ‘class collate_byname’
/usr/include/c++/5.3.1/bits/locale_classes.tcc:285:23: error: ‘collate’ is not a template function
/usr/include/c++/5.3.1/bits/locale_classes.tcc:285:30: error: expected ‘;’ before ‘<’ token
/usr/include/c++/5.3.1/bits/locale_classes.tcc:289:22: error: parse error in template argument list
/usr/include/c++/5.3.1/bits/locale_classes.tcc:289:22: error: template-id ‘has_facet<<expression error> >’ for ‘bool std::has_facet(const std::locale&)’ does not match any template declaration
{% endhighlight %}


### Fix the CUDA functionality

Edit the ```Makefile``` within that directory, adding the ```-D_GLIBCXX_USE_CXX11_ABI=0``` line : 

{% highlight bash %}
ALL_CCFLAGS :=
ALL_CCFLAGS += $(NVCCFLAGS)

## Add the following ::
ALL_CCFLAGS += -D_GLIBCXX_USE_CXX11_ABI=0 

ALL_CCFLAGS += $(EXTRA_NVCCFLAGS)
ALL_CCFLAGS += $(addprefix -Xcompiler ,$(CCFLAGS))
ALL_CCFLAGS += $(addprefix -Xcompiler ,$(EXTRA_CCFLAGS))
{% endhighlight %}

then, running ```make``` again should work without complaint, and running ```./asyncAPI``` should produce results like ::
{% highlight bash %}
[./asyncAPI] - Starting...
GPU Device 0: "GeForce GTX TITAN X" with compute capability 5.2

CUDA device [GeForce GTX TITAN X]
time spent executing by the GPU: 11.26
time spent by CPU in CUDA calls: 0.02
CPU executed 48864 iterations while waiting for GPU to finish
{% endhighlight %}

If that works, then we can move on to fixing the issue within Theano...



### Theano stuff - command line

Using the same ```gpu_check.py``` as for the Fedora 22 instructions, the following command-line should FAIL :

{% highlight python %}
THEANO_FLAGS=mode=FAST_RUN,floatX=float32,device=gpu   python gpu_check.py
""" output is ::
*FAILURE...*
"""
{% endhighlight %}


This should work, though, if we supply an additional flag to ```NVCC```, when it is invoked deep inside ```Theano``` (which means the following should WORK) :

{% highlight bash %}
THEANO_FLAGS=mode=FAST_RUN,floatX=float32,device=gpu,nvcc.flags='-D_GLIBCXX_USE_CXX11_ABI=0'   python gpu_check.py
""" output is ::
Using gpu device 0: GeForce GTX 760
[GpuElemwise{exp,no_inplace}(<CudaNdarrayType(float32, vector)>), HostFromGpu(GpuElemwise{exp,no_inplace}.0)]
Looping 1000 times took 0.339042901993 seconds
Result is [ 1.23178029  1.61879349  1.52278066 ...,  2.20771813  2.29967761 1.62323296]
Used the gpu
"""
{% endhighlight %}


### Theano stuff - within a program

To achieve the same effect programmatically, an extra line after the standard 'preamble' : 

{% highlight python %}
import theano
from theano import tensor

floatX = theano.config.floatX = 'float32'

## Required for fedora 23 compilation of NVCC code...
theano.config.nvcc.flags = '-D_GLIBCXX_USE_CXX11_ABI=0'
{% endhighlight %}

