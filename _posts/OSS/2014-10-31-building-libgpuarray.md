---
date: 2014-11-02
title: Building libgpuarray on Fedora 20
category: OSS
tags:
- fedora
- linux
- opencl
- fc20
layout: post
published: false
---
{% include JB/setup %}

{% highlight bash %}
yum install cmake
{% endhighlight %}

## Regular instructions

http://deeplearning.net/software/libgpuarray/installation.html

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

## DIFFERENT RESULTS ::
optirun cmake .. -DCMAKE_BUILD_TYPE=Release

Dependency : CLBLAS :: See ()

https://github.com/clMathLibraries/clBLAS/releases/download/v2.2/clBLAS-2.2.0-Linux-x64.tar.gz

## Good idea, but not necessary once clBLAS installed correctly
cmake .. -DCMAKE_BUILD_TYPE=Release -DCLBLAS_LIBRARIES=../../clBLAS/Binaries/clBLAS-2.2.0-Linux-x64/lib64/ -DCLBLAS_INCLUDE_DIRS=../../clBLAS/Binaries/clBLAS-2.2.0-Linux-x64/include/

"-- Found clBLAS: "

Except get library directory messages...
""" Targets may link only to libraries.  CMake is dropping the item. """


rm CMakeCache.txt

## Better : Install the clBLAS in a system-wide location
NB: ```cmake``` requires ```optirun``` to find OpenCL libraries.

{% highlight bash %}
cd /home/andrewsm/sketchpad/kaggle/AES-SPC/env/clBLAS/Binaries/clBLAS-2.2.0-Linux-x64
cd lib64
cp -R * /usr/lib64/nvidia-bumblebee/
ls -l /usr/lib64/nvidia-bumblebee/
cd ../include
cp -R * /usr/include/
{% endhighlight %}


{% highlight bash %}
# make install 
[ 50%] Built target gpuarray
[100%] Built target gpuarray-static
Linking C shared library CMakeFiles/CMakeRelink.dir/libgpuarray.so
Install the project...
-- Install configuration: "Release"
-- Installing: /usr/local/include/gpuarray/array.h
-- Installing: /usr/local/include/gpuarray/blas.h
-- Installing: /usr/local/include/gpuarray/buffer.h
-- Installing: /usr/local/include/gpuarray/buffer_blas.h
-- Installing: /usr/local/include/gpuarray/config.h
-- Installing: /usr/local/include/gpuarray/error.h
-- Installing: /usr/local/include/gpuarray/extension.h
-- Installing: /usr/local/include/gpuarray/ext_cuda.h
-- Installing: /usr/local/include/gpuarray/kernel.h
-- Installing: /usr/local/include/gpuarray/types.h
-- Installing: /usr/local/include/gpuarray/util.h
-- Installing: /usr/local/lib/libgpuarray.so
-- Installing: /usr/local/lib/libgpuarray-static.a
{% endhighlight %}

Hmm - but this /usr/local thing isn't great...

 optirun cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/usr

{% highlight bash %}
[root@changi Build]# make install
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



NB: Set 'env' !

For pygpu:

{% highlight bash %}
# This must be done after libgpuarray is installed as per instructions above.
python setup.py build
python setup.py install

# Test it works : 
optirun python -c "import pygpu;pygpu.test()"
{% endhighlight %}


GpuArrayException: Out of resources
```opencl0:0```

{% highlight python %}
>>> import pygpu
>>> help(pygpu)
>>> pygpu.init('asdasd')
>>> pygpu.init('opencl0:0')
{% endhighlight %}

