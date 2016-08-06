---
date: 2016-08-06
title: Opencv on Fedora 24
category: OSS
tags:
- fedora
- linux
- fc24
- opencv
layout: post
published: false
---
{% include JB/setup %}


http://docs.opencv.org/3.1.0/dd/dd5/tutorial_py_setup_in_fedora.html#gsc.tab=0


{% highlight bash %}
git clone https://github.com/Itseez/opencv.git
cd opencv/
mkdir build
cd build
{% endhighlight %}


{% highlight bash %}
cmake -D WITH_TBB=ON -D WITH_EIGEN=ON -D WITH_JAVA=OFF ..
cmake -D BUILD_DOCS=OFF -D BUILD_TESTS=OFF -D BUILD_PERF_TESTS=OFF -D BUILD_EXAMPLES=OFF ..
cmake -D WITH_OPENCL=OFF -D WITH_CUDA=OFF -D BUILD_opencv_gpu=OFF -D BUILD_opencv_gpuarithm=OFF -D BUILD_opencv_gpubgsegm=OFF -D BUILD_opencv_gpucodec=OFF -D BUILD_opencv_gpufeatures2d=OFF -D BUILD_opencv_gpufilters=OFF -D BUILD_opencv_gpuimgproc=OFF -D BUILD_opencv_gpulegacy=OFF -D BUILD_opencv_gpuoptflow=OFF -D BUILD_opencv_gpustereo=OFF -D BUILD_opencv_gpuwarping=OFF ..
cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr ..
make
{% endhighlight %}



{% highlight bash %}
dnf install ffmpeg-devel tbb-devel eigen3-devel
make install
{% endhighlight %}




{% highlight bash %}
python
Python 2.7.11 (default, Jun 21 2016, 09:15:12) 
[GCC 6.1.1 20160510 (Red Hat 6.1.1-2)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import cv2
>>> cv2.__version__
'3.1.0-dev'
## http://docs.opencv.org/3.1.0/
{% endhighlight %}
