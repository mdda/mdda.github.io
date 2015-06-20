---
date: 2015-06-20
title: Nvidia installation for Theano on Fedora 22
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

This is very much in-progress, since it doesn't yet work to my satisfaction...

### Better RPMs 

Since Nvidia still hasn't provided RPMs for Fedora 22 (which was launched 
4 weeks ago as-of this post date, having been in Alpha for 3 months prior),
we need to use the ``Repo`` created by the most excellent 'negativo' (which
Nvidia would probably characterise as some *amateur hobbiest*, rather than
the actual hero that he is) :

{% highlight bash %}
dnf install 'dnf-command(config-manager)'
dnf config-manager --add-repo=http://negativo17.org/repos/fedora-nvidia.repo
dnf remove \*nvidia\*
dnf -y install nvidia-driver akmod-nvidia kernel-devel
dnf -y install \
  cuda cuda-libs cuda-extra-libs \
  cuda-cli-tools cuda-devel \
  nvidia-driver-libs nvidia-driver-cuda-libs \
  nvidia-driver-devel nvidia-driver-NVML-devel 
{% endhighlight %}

#### Test the installation

Check that the kernel modules is there :

{% highlight bash %}
sudo lsmod | grep nv

nvidia               8556544  0 
drm                   331776  4 i915,drm_kms_helper,nvidia
{% endhighlight %}


Looking good:

{% highlight bash %}
sudo nvcc --version

nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2014 NVIDIA Corporation
Built on Wed_Aug_27_10:36:36_CDT_2014
Cuda compilation tools, release 6.5, V6.5.16
{% endhighlight %}


Hmpf...

{% highlight bash %}
sudo nvidia-smi -L

-bash: nvidia-smi: command not found
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
THEANO_FLAGS=mode=FAST_RUN,floatX=float32,device=cpu  python gpu_check.py
{% endhighlight %}

and 

{% highlight bash %}
THEANO_FLAGS=mode=FAST_RUN,floatX=float32,device=gpu python gpu_check.py
{% endhighlight %}



{% highlight bash %}
THEANO_FLAGS=floatX=float32,device=gpu  
{% endhighlight %}

{% highlight bash %}
python `python -c "import os, theano; print os.path.dirname(theano.__file__)"`/misc/check_blas.py
{% endhighlight %}
