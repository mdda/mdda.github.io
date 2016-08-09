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


The standard install of ```opencv``` appears to be broken on Fedora 24 - because (when loading an image) it
requires ```libavcodec.so.53``` whereas up-to-date ```ffmpeg-devel``` has an apparently useless ```libavcodec.so.57```.

So, building from source appears to be the way to go (particularly since Fedora 24 has ```opencv ~2.4.12```, rather than
```opencv ~3.0.0```.

### Building OpenCV from source 

This makes use of [these instructions](http://docs.opencv.org/3.1.0/dd/dd5/tutorial_py_setup_in_fedora.html#gsc.tab=0).  

#### Clone OpenCV from GitHub

{% highlight bash %}
git clone https://github.com/Itseez/opencv.git
cd opencv/
mkdir build
{% endhighlight %}


#### Install required packages

{% highlight bash %}
dnf install tbb-devel eigen3-devel
## If you need video (for png, jpeg only this isn't required)
#dnf install ffmpeg-devel 
{% endhighlight %}


#### Prepare ```cmake```

One thing that I didn't realise before, is that ```cmake``` options are cumulative across commandline invocations :

{% highlight bash %}
cd ../opencv/build # ensure we're in the right place
cmake -D WITH_TBB=ON -D WITH_EIGEN=ON -D WITH_JAVA=OFF ..
cmake -D BUILD_DOCS=OFF -D BUILD_TESTS=OFF -D BUILD_PERF_TESTS=OFF -D BUILD_EXAMPLES=OFF ..
cmake -D WITH_OPENCL=OFF -D WITH_CUDA=OFF -D BUILD_opencv_gpu=OFF -D BUILD_opencv_gpuarithm=OFF -D BUILD_opencv_gpubgsegm=OFF -D BUILD_opencv_gpucodec=OFF -D BUILD_opencv_gpufeatures2d=OFF -D BUILD_opencv_gpufilters=OFF -D BUILD_opencv_gpuimgproc=OFF -D BUILD_opencv_gpulegacy=OFF -D BUILD_opencv_gpuoptflow=OFF -D BUILD_opencv_gpustereo=OFF -D BUILD_opencv_gpuwarping=OFF ..
cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr ..
{% endhighlight %}


#### Build

{% highlight bash %}
cd ../build  # ensure we're in the right place
make
sudo make install
{% endhighlight %}


#### Test that Python integration works

[Documentation is available](http://docs.opencv.org/3.1.0/)

{% highlight bash %}
python
Python 2.7.11 (default, Jun 21 2016, 09:15:12) 
[GCC 6.1.1 20160510 (Red Hat 6.1.1-2)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import cv2
>>> cv2.__version__
'3.1.0-dev'
{% endhighlight %}

