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
  cuda-cli-tools cuda-devel cuda-docs \
  nvidia-driver-libs nvidia-driver-cuda-libs \
  nvidia-driver-devel nvidia-driver-NVML-devel \
  nvidia-modprobe
{% endhighlight %}

Unfortunately, the directory structure for the ``cuda`` files is not what 
Theano expects, so, as ``root`` do ::

{% highlight bash %}
mkdir /usr/local/cuda
ln -s /usr/include/cuda /usr/local/cuda/include
mkdir /usr/local/cuda/bin/
mv /usr/bin/nvcc /usr/local/cuda/bin/
ln -s /usr/bin/crt /usr/local/cuda/bin/
{% endhighlight %}

which rigs up a more standard *tree* of folders :: ``/usr/cuda/{include,bin}``.

Now, as root, fix up Nvidia disallowing ``gcc`` greater than ``v4.9``...

In file ``/usr/local/cuda/include/host_config.h``, look to make the following replacement : 

{% highlight bash %}
// #if __GNUC__ > 4 || (__GNUC__ == 4 && __GNUC_MINOR__ > 9)  // Old version commented out
// This is the updated line : (Ok, so 14 is much more than 5...)
#if __GNUC__ > 14 || (__GNUC__ == 4 && __GNUC_MINOR__ > 9)
{% endhighlight %}


Now, to set the right path for ``nvcc``, in the user's ``~/.bash_profile`` add ::

{% highlight bash %}
export PATH=$PATH:/usr/local/cuda/bin
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
sudo /usr/local/cuda/bin/nvcc --version

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
  -DCUDA_CUDA_LIBRARY=/usr/lib64/nvidia/libcuda.so \
  -DCUDA_INCLUDE_DIRS=/usr/include/cuda \
  -DOPENCL_LIBRARIES=/usr/lib64/nvidia/libOpenCL.so \
  -DOPENCL_INCLUDE_DIRS=/usr/include/cuda/CL
make
sudo make install
{% endhighlight %}

This will likely complain about not finding ``clBLAS``, which isn't a problem here.
Although, if you know you will require ``clBLAS`` in the future 
(and this is for advanced/experimental users only),
see my [OpenCL post](http://blog.mdda.net/oss/2014/11/02/building-clblas/), 
since you need to install this before running ``cmake`` above).


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
#(A) 'cuda'      :: pygpu.gpuarray.GpuArrayException: API not initialized = WEIRD
#(B) 'cuda0'     :: pygpu.gpuarray.GpuArrayException: No CUDA devices available = GO BACK...
#(C) 'opencl0:0' :: RuntimeError: Unsupported kind: opencl (if OpenCL library not found)
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





{% highlight bash %}
THEANO_FLAGS=floatX=float32,device=gpu  
{% endhighlight %}

{% highlight bash %}
python `python -c "import os, theano; print os.path.dirname(theano.__file__)"`/misc/check_blas.py
{% endhighlight %}


{% highlight bash %}
dnf -y install clinfo ocl-icd opencl-tools 
{% endhighlight %}
