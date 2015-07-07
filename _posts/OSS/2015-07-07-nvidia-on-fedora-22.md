---
date: 2015-07-07
title: Nvidia installation for Theano on Fedora 22 (7.0)
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

### Doing it Nvidia's way

Even though Nvidia still hasn't provided RPMs for Fedora 22 (which was launched 
a couple of months ago as-of this post date, having been in Alpha for 3 months prior),
we can fix up their code as it installs.

This write-up is simply a condensed version of 
[Dr Donald Kinghorn's excellent write-up](https://www.pugetsystems.com/labs/articles/Install-NVIDIA-CUDA-on-Fedora-22-with-gcc-5-1-654/)
(which it's probably best to follow along with in a separate tab) with
additional instructions concerning the building of Theano.

### Set up a scratch directory 

As ```root``` : 

{% highlight bash %}
cd ~   # pwd = /root/
mkdir fedora22-cuda
cd fedora22-cuda/
{% endhighlight %}


### Nvidia Driver download (for later)

Go to the [Nvidia Driver download page](http://www.nvidia.com/content/DriverDownload-March2009/confirmation.php?url=/XFree86/Linux-x86_64/352.21/NVIDIA-Linux-x86_64-352.21.run&lang=us&type=GeForce), and grab the 
76Mb driver package, for installation later...

### CUDA Driver download (installed first)

Download the 1Gb CUDA local installer for RHEL7 (1Gb):

{% highlight bash %}
CUDA7=http://developer.download.nvidia.com/compute/cuda/7_0
RPMDEB=${CUDA7}/Prod/local_installers/rpmdeb
wget ${RPMDEB}/cuda-repo-rhel7-7-0-local-7.0-28.x86_64.rpm
{% endhighlight %}

### Install CUDA using Nvidia's repo

{% highlight bash %}
cd ~/fedora22-cuda # pwd=/root/fedora-cuda/
dnf install cuda-repo-rhel7-7-0-local-7.0-28.x86_64.rpm 
dnf install cuda
{% endhighlight %}


### Fix the path &amp; library directories globally

{% highlight bash %}
echo 'export PATH=$PATH:/usr/local/cuda/bin' >> /etc/profile.d/cuda.sh
ls -l /usr/local/cuda/lib64
echo '/usr/local/cuda/lib64' >> /etc/ld.so.conf.d/cuda.conf
ldconfig
{% endhighlight %}


### Now install the graphics drivers

Run the Nvidia installer (look at the notes in this section for answer-hints):

{% highlight bash %}
chmod 755 NVIDIA-Linux-x86_64-352.21.run 
./NVIDIA-Linux-x86_64-352.21.run 
{% endhighlight %}

*  Say "Yes" to the question about registering with DKMS

*  Say "Yes" to the question about 32-bit libs

It should now compile the NVIDIA kernel modules...

*  Say "No" to the question about running nvidia-xconfig!

Now reboot.


#### Test the installation

To see that your driver is installed and working properly, check that the kernel modules are there :

{% highlight bash %}
sudo lsmod | grep nv
# Output::
nvidia_uvm             77824  0
nvidia               8564736  1 nvidia_uvm
drm                   331776  4 i915,drm_kms_helper,nvidia
{% endhighlight %}

Check on the CUDA compiler:

{% highlight bash %}
/usr/local/cuda/bin/nvcc --version
# Output::
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2015 NVIDIA Corporation
Built on Mon_Feb_16_22:59:02_CST_2015
Cuda compilation tools, release 7.0, V7.0.27
{% endhighlight %}

And an actual check on the card itself :

{% highlight bash %}
sudo nvidia-smi -L
# Output::
GPU 0: GeForce GTX 760 (UUID: GPU-b8075eeb-56ff-4595-7901-eef770de8296)
{% endhighlight %}


### Fix the CUDA headers to accept new ```gcc```

Now, as ```root```, fix up Nvidia's header file that disallows ``gcc`` greater than ``v4.9``...

In file ``/usr/local/cuda-7.0/include/host_config.h``, look to make the following replacement : 

{% highlight c++ %}
// #if __GNUC__ > 4 || (__GNUC__ == 4 && __GNUC_MINOR__ > 9)  // Old version commented out
// This is the updated line, which guards again gcc > 5.1.x instead
#if __GNUC__ > 5 || (__GNUC__ == 5 && __GNUC_MINOR__ > 1)
{% endhighlight %}


### Test the CUDA functionality

As a regular user, compile the CUDA samples from within a clean directory :

{% highlight bash %}
cd ~        # for instance
mkdir cuda  # for instance
cd cuda
rsync -av /usr/local/cuda/samples .
cd samples/
make -j4
cd bin/x86_64/linux/release/
./deviceQuery
{% endhighlight %}


## The Theano Part

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

This won't affect the CUDA functionality (OpenCL impact TBD).

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


### OpenCL stuff (for another day)

{% highlight bash %}
dnf -y install clinfo ocl-icd opencl-tools 
{% endhighlight %}
