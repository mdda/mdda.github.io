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
published: false
---
{% include JB/setup %}

### Extra Fix required for Nvidia NVCC to work under Fedora 23

Fedora 23 changed a default ```gcc``` ABI setting from that in Fedora 22.  The previous value
was chosen to match earlier versions of ```gcc``` as closely as possible, so this 
change actually broke systems that want the earlier behaviour : In our case, Nvidia's tool chain.

This has to be fixed, by adding additional options into the ```NVCC``` invocations.  Doing this
is not so easy...


### Fix the CUDA headers to accept new ```gcc``` (5.3.1 for Fedora 23)

Now, as ```root```, fix up Nvidia's header file that disallows ``gcc`` greater than ``v4.9``...

In file ``/usr/local/cuda-7.0/include/host_config.h``, look to make the following replacement : 

{% highlight c++ %}
// #if __GNUC__ > 4 || (__GNUC__ == 4 && __GNUC_MINOR__ > 9)  // Old version commented out
// This is the updated line, which guards again gcc > 5.4.x instead
#if __GNUC__ > 5 || (__GNUC__ == 5 && __GNUC_MINOR__ > 4)
{% endhighlight %}


### Prove that it's still broken

As a regular user, let's fix up one of the CUDA samples from within a clean directory :

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



## The Theano Part

###  Installation of ``libgpuarray``

To install the bleeding edge ``libgpuarray`` into your ``virtualenv``, first 
compile the ``.so`` and ``.a`` libraries that the module creates, 
and put them in a sensible place :

{% highlight bash %}
. env/bin/activate
cd env
git clone https://github.com/Theano/libgpuarray.git
cd libgpuarray
mkdir Build
cd Build
cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/usr
make
sudo make install
{% endhighlight %}

This will likely complain about not finding ``clBLAS``, which isn't a problem here.
Although, if you know you will require ``clBLAS`` in the future 
(and this is for advanced/experimental users only),
see my [OpenCL post](http://blog.mdda.net/oss/2014/11/02/building-clblas/), 
since you need to install this before running ``cmake`` above).

It may also complain about :

{% highlight bash %}
    runtime library [libOpenCL.so.1] in /usr/lib64 may be hidden by files in:
      /usr/local/cuda/lib64
{% endhighlight %}

This won't affect the CUDA functionality (its impact on OpenCL is still TBD).

Next, install the Python component (after going into the same ``virtualenv``) : 

{% highlight bash %}
cd env/libgpuarray/
python setup.py build
python setup.py install
{% endhighlight %}

And then test it from within a regular user directory (using the same ``virtualenv``) :

{% highlight python %}
python
import pygpu
pygpu.init('cuda0')
{% endhighlight %}

A good result is something along the lines of :

{% highlight python %}
<pygpu.gpuarray.GpuContext object at 0x7f1547e79550>
{% endhighlight %}

{% highlight python %}
## Errors seen :
#(A) 'cuda'      :: 
##  pygpu.gpuarray.GpuArrayException: API not initialized = WEIRD

#(B) 'cuda0'     :: 
##  pygpu.gpuarray.GpuArrayException: No CUDA devices available = GO BACK...

#(C) 'opencl0:0' :: 
##  RuntimeError: Unsupported kind: opencl (if OpenCL library not found)
{% endhighlight %}


### Theano stuff

Store the following to a file ``gpu_check.py`` : 

{% highlight python %}
from theano import function, config, shared, sandbox
import theano.tensor as T
import numpy
import time

vlen = 10 * 30 * 768  # 10 x #cores x # threads per core
iters = 1000

rng = numpy.random.RandomState(22)
x = shared(numpy.asarray(rng.rand(vlen), config.floatX))
f = function([], T.exp(x))
print f.maker.fgraph.toposort()
t0 = time.time()
for i in xrange(iters):
    r = f()
t1 = time.time()
print 'Looping %d times took' % iters, t1 - t0, 'seconds'
print 'Result is', r
if numpy.any([isinstance(x.op, T.Elemwise) for x in f.maker.fgraph.toposort()]):
    print 'Used the cpu'
else:
    print 'Used the gpu'
{% endhighlight %}

And then run, successively :

{% highlight bash %}
THEANO_FLAGS=mode=FAST_RUN,floatX=float32,device=cpu   python gpu_check.py
""" output is ::
[Elemwise{exp,no_inplace}(<TensorType(float32, vector)>)]
Looping 1000 times took 3.35117197037 seconds
Result is [ 1.23178029  1.61879337  1.52278066 ...,  2.20771813  2.29967761 1.62323284]
Used the cpu
"""
{% endhighlight %}

and 

{% highlight bash %}
THEANO_FLAGS=mode=FAST_RUN,floatX=float32,device=gpu   python gpu_check.py
""" output is ::
Using gpu device 0: GeForce GTX 760
[GpuElemwise{exp,no_inplace}(<CudaNdarrayType(float32, vector)>), HostFromGpu(GpuElemwise{exp,no_inplace}.0)]
Looping 1000 times took 0.339042901993 seconds
Result is [ 1.23178029  1.61879349  1.52278066 ...,  2.20771813  2.29967761 1.62323296]
Used the gpu
"""
{% endhighlight %}

but 

{% highlight bash %}
THEANO_FLAGS=mode=FAST_RUN,floatX=float32,device=cuda0   python gpu_check.py
""" output is ::
*FAILURE...*
"""
{% endhighlight %}


### Check on the usage of GPU / BLAS

{% highlight bash %}
TP=`python -c "import os, theano; print os.path.dirname(theano.__file__)"`
THEANO_FLAGS=mode=FAST_RUN,floatX=float32,device=gpu python ${TP}/misc/check_blas.py

## GPU : 0.14s (GeForce GTX 760)
## CPU : 5.72s (i7-4770 CPU @ 3.40GHz)
{% endhighlight %}

