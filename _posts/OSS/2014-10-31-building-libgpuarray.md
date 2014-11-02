---
date: 2014-11-03
title: Building libgpuarray (and PyGPU) on Fedora 20
category: OSS
tags:
- fedora
- linux
- opencl
- fc20
- libgpuarray
- pygpu
layout: post
published: true
---
{% include JB/setup %}

Just as a preliminary, make sure you've got ```cmake``` installed (as root) :

{% highlight bash %}
yum install cmake
{% endhighlight %}

### Regular instructions from [the Deep Learning site](http://deeplearning.net/software/libgpuarray/installation.html)

The standard instructions are :

{% highlight bash %}
git clone https://github.com/Theano/libgpuarray.git
cd libgpuarray
mkdir Build
cd Build
# you can pass -DCMAKE_INSTALL_PREFIX=/path/to/somewhere to install to an alternate location
cmake .. -DCMAKE_BUILD_TYPE=Release # or Debug if you are investigating a crash
make
sudo make install
cd ..
{% endhighlight %}

### Helpful build tips

What isn't obvious is that (a) the default location (```/usr/local/{include,lib}```) isn't much use for Theano without adding a bunch of command-line options, and (b) ```cmake``` will require running under ```optirun``` in order for it to see the required ```OpenCL``` libraries.

If you have mis-steps doing the initial ```cmake```, it helps to clear out the cmake caches using ```rm CMakeCache.txt```.

The key ```cmake``` line for building under a ```bumblebee``` set-up was : 

{% highlight bash %}
optirun cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/usr
{% endhighlight %}

And finally, install system-wide :

{% highlight bash %}
make
sudo make install
[ 50%] Built target gpuarray
[100%] Built target gpuarray-static
Install the project...
-- Install configuration: "Release"
-- Installing: /usr/include/gpuarray/array.h
-- Installing: /usr/include/gpuarray/blas.h
-- Installing: /usr/include/gpuarray/buffer.h
-- Installing: /usr/include/gpuarray/buffer_blas.h
-- Installing: /usr/include/gpuarray/config.h
-- Installing: /usr/include/gpuarray/error.h
-- Installing: /usr/include/gpuarray/extension.h
-- Installing: /usr/include/gpuarray/ext_cuda.h
-- Installing: /usr/include/gpuarray/kernel.h
-- Installing: /usr/include/gpuarray/types.h
-- Installing: /usr/include/gpuarray/util.h
-- Installing: /usr/lib/libgpuarray.so
-- Installing: /usr/lib/libgpuarray-static.a
[root@changi Build]# 
{% endhighlight %}

### Building PyGPU 

NB: If you're running in a ```virtualenv```, remember to set 'env' before the following!

{% highlight bash %}
# This must be done after libgpuarray is installed as per instructions above.
cd <main-libgpuarray-directory>
python setup.py build
python setup.py install

# Test it works : 
optirun python -c "import pygpu;pygpu.test()"
{% endhighlight %}

### Building PyGPU - but tests fail (after a while)

Apparently, this is to-be-expected behaviour at the moment...

{% highlight bash %}
GpuArrayException: Out of resources
```opencl0:0```
{% endhighlight %}

But at least it highlights the correct name for the GPU device.

### Quick manual test of PyGPU 

{% highlight python %}
>>> import pygpu
>>> help(pygpu)
>>> pygpu.init('asdasd')
# FAIL...
>>> pygpu.init('opencl0:0')
# Quiet SUCCESS...
{% endhighlight %}

