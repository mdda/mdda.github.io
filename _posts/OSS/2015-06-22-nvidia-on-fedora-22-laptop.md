---
date: 2015-06-20
title: Nvidia for Theano on Fedora 22 laptop
category: OSS
tags:
- fedora
- linux
- Nvidia
- theano
- bumblebee
layout: post
published: true
---
{% include JB/setup %}

This write-up is for Laptops with 'separate' NVidia graphics cards, 
and makes use of the Bumblebee Nvidia installation.

For more typical desktop instructions, see [the write-up here](/oss/2015/06/20/nvidia-on-fedora-22/).

### Bumblebee RPMs 

The basic RPM installation is as before, in [the previous write-up](/oss/2014/06/15/install-nvidia-optimus-on-FC20-acer-notebook/).


### CUDA 

The CUDA installation should be done from the [Nvidia downloads site](https://developer.nvidia.com/cuda-downloads), as usual.

The end result should be the standard *tree* of folders :: ``/usr/local/cuda/{include,bin}``.


### Source fixes

Now, as root, fix up Nvidia disallowing ``gcc`` greater than ``v4.9``...

In file ``/usr/local/cuda/include/host_config.h``, look to make the following replacement : 

{% highlight c++ %}
// #if __GNUC__ > 4 || (__GNUC__ == 4 && __GNUC_MINOR__ > 9)  // Old version commented out
// This is the updated line, which guards again gcc > 5.1.x instead
#if __GNUC__ > 5 || (__GNUC__ == 5 && __GNUC_MINOR__ > 1)
{% endhighlight %}


Now, to set the right path for ``nvcc``, in the user's ``~/.bash_profile`` add ::

{% highlight bash %}
export PATH=$PATH:/usr/local/cuda/bin
{% endhighlight %}



#### Test the installation

Check that the kernel modules is there :

{% highlight bash %}
sudo optirun lsmod | grep nv
nvidia_uvm             69632  0 
nvidia               8380416  28 nvidia_uvm
drm                   331776  7 i915,drm_kms_helper,nvidia
{% endhighlight %}

{% highlight bash %}
# NB: With no 'optirun'
sudo lsmod | grep nv
## -Nothing-
{% endhighlight %}

Looking good:

{% highlight bash %}
/usr/local/cuda/bin/nvcc --version

nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2014 NVIDIA Corporation
Built on Thu_Jul_17_21:41:27_CDT_2014
Cuda compilation tools, release 6.5, V6.5.12
{% endhighlight %}


This works better than the previous desktop ... 

{% highlight bash %}
optirun nvidia-smi -L
GPU 0: GeForce GT 750M (UUID: GPU-9cabfc96-3f6e-889d-29c5-57057738f794)
{% endhighlight %}

(and without the ``optirun``) :

{% highlight bash %}
nvidia-smi -L
NVIDIA-SMI couldn't find libnvidia-ml.so library in your system. Please make sure that the NVIDIA Display Driver is properly installed and present in your system.
Please also try adding directory that contains libnvidia-ml.so to your system PATH.
{% endhighlight %}


###  Installation of ``libgpuarray``

Install the bleeding edge ``libgpuarray`` into your ``virtualenv`` - first 
compile the ``.so`` and ``.a`` libraries, and put them in a sensible place :

{% highlight bash %}
. env/bin/activate
cd env
git clone https://github.com/Theano/libgpuarray.git
cd libgpuarray
mkdir Build
cd Build
cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/usr \
  -DCUDA_CUDA_LIBRARY=/usr/lib64/nvidia-bumblebee/libcuda.so \
  -DCUDA_INCLUDE_DIRS=/usr/local/cuda/include \
  -DOPENCL_LIBRARIES=/usr/lib64/nvidia-bumblebee/libOpenCL.so \
  -DOPENCL_INCLUDE_DIRS=/usr/local/cuda/include/CL
make
sudo make install
{% endhighlight %}

This will likely complain about not finding ``clBLAS``, which isn't a problem here.
Although, if you know you will require ``clBLAS`` in the future 
(and this is for advanced/experimental users only),
see my [OpenCL post](/oss/2014/11/02/building-clblas/), 
since you need to install this before running ``cmake`` above).


Next, install the Python component (after going into the same ``virtualenv``) : 

{% highlight bash %}
cd env/libgpuarray/
python setup.py build
python setup.py install
{% endhighlight %}

And then test it from within a regular user directory (using the same ``virtualenv``) :

{% highlight python %}
optirun python
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
THEANO_FLAGS=mode=FAST_RUN,floatX=float32,device=cpu  optirun  python gpu_check.py 
""" output is ::
[Elemwise{exp,no_inplace}(<TensorType(float32, vector)>)]
Looping 1000 times took 5.44066691399 seconds
Result is [ 1.23178029  1.61879337  1.52278066 ...,  2.20771813  2.29967761  1.62323284]
Used the cpu
"""
{% endhighlight %}

and 

{% highlight bash %}
THEANO_FLAGS=mode=FAST_RUN,floatX=float32,device=gpu  optirun  python gpu_check.py 
""" output is ::
Using gpu device 0: GeForce GT 750M
[GpuElemwise{exp,no_inplace}(<CudaNdarrayType(float32, vector)>), HostFromGpu(GpuElemwise{exp,no_inplace}.0)]
Looping 1000 times took 1.06558203697 seconds
Result is [ 1.23178029  1.61879349  1.52278066 ...,  2.20771813  2.29967761
  1.62323296]
Used the gpu
"""
{% endhighlight %}

but 

{% highlight bash %}
THEANO_FLAGS=mode=FAST_RUN,floatX=float32,device=cuda0  optirun  python gpu_check.py
""" output is ::
*FAILURE...*
"""
{% endhighlight %}


### Check on the usage of GPU / BLAS

{% highlight bash %}
TP=`python -c "import os, theano; print os.path.dirname(theano.__file__)"`
THEANO_FLAGS=mode=FAST_RUN,floatX=float32,device=gpu optirun python ${TP}/misc/check_blas.py


Total execution time: 9.38s on CPU (with direct Theano binding to blas).
Total execution time: 0.44s on GPU.
## GPU : 0.44s (GeForce GT 750M)
## CPU : 9.38s (i5-4200U CPU @ 1.60GHz)
{% endhighlight %}


