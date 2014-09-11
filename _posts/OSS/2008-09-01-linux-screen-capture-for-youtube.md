---
comments: false
date: 2008-09-07 06:21:00+00:00
title: Linux Screen Capture for YouTube
category: OSS
wordpress_id: 150
wp_parent: '0'
wp_slug: linux-screen-capture-for-youtube
tags:
- bioloid
- ffmpeg
- linux
- robot
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


ffmpeg is the command line utility I chose - does enough, but not too much (like mplayer, for instance).  
  


### YouTube and Google ideal input video

  


  

  * 640x480 @ 30 fps MPEG4
  
  
  


### Preparation

  
  
Grab the ffmpeg package from ATrpms.  

{% highlight bash %}
# rpm --import http://ATrpms.net/RPM-GPG-KEY.atrpms   
# scite /etc/yum.repos.d/atrpms.repo  
# yum install ffmpeg  

{% endhighlight %}
For speed of capture :  

{% highlight bash %}
# Mount a RAM disk (as su) :  
mkdir /media/ffmpeg  
mount -t tmpfs tmpfs /media/ffmpeg  
exit  

{% endhighlight %}
### Capture

  
  
Grabbing the screen (the data rate of 1Mb/sec set with '-b' option)  

{% highlight bash %}
# Grab a standard 640x480 screen from top-left of screen (choose frame rate with '-r')  
ffmpeg -f x11grab -r 15 -s 640x480 -i :0.0+5,20 -b 1M /media/ffmpeg/grab.flv  

{% endhighlight %}
Test the grab - to make sure it's what's needed :  

{% highlight bash %}
ffplay /media/ffmpeg/grab.flv  

{% endhighlight %}
In order to play around with different scenes, or intro and lead-out title frames :  
  

{% highlight bash %}
# Convert frames to mpeg (can be concatenated easily, output framerate set with '-r')  
ffmpeg -i /media/ffmpeg/grab.flv -r 30 /media/ffmpeg/grab.mpg  

{% endhighlight %}
### Making a Title Sequence

  
  

{% highlight bash %}
# Create title.png from title.svg (inkscape - number of frames=100, at 30fps)  
ffmpeg -loop_input -vframes 100 -i title.png -r 30 title.mpg  

{% endhighlight %}
### Join the Scenes together...

  
  

{% highlight bash %}
# mpg files can be simply 'cat'd together  
cat title.mpg frames.mpg > joined.mpg  

{% endhighlight %}
Test the movie (and/or upload to youtube) :  

{% highlight bash %}
ffplay joined.mpg   

{% endhighlight %}
### Alternative - build the movie out of frames...

  
  
Create frames for movie via drawstuff...  Cntrl-W : this is a feature of the drawstuff GUI front-end for ODE - it creates a sequence of .ppm files from the frames of the simulation.  
  
Join the grabbed frames together into a movie :  
  

{% highlight bash %}
cd frames  
ffmpeg -r 5 -i frame%04d.ppm -r 30 frames.mpg  

{% endhighlight %}
and then proceed with the cobbling together as before.
