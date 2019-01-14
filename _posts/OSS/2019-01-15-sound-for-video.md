---
date: 2019-01-15
title: Sound for video
category: OSS
tags:
- fedora
- linux
layout: post
published: false
---
{% include JB/setup %}





Quick example with a file that I knew should be in a specific backup batch :

{% highlight bash %}

# https://superuser.com/questions/323119/how-can-i-normalize-audio-using-ffmpeg

ffmpeg -i video.avi -af "volumedetect" -vn -sn -dn -f null /dev/null

stub=01_front-page
ffmpeg -i ${stub}.mp4 -af "volumedetect" -vn -sn -dn -f null /dev/null

[Parsed_volumedetect_0 @ 0x5642c8652c40] n_samples: 3407232
[Parsed_volumedetect_0 @ 0x5642c8652c40] mean_volume: -34.2 dB
[Parsed_volumedetect_0 @ 0x5642c8652c40] max_volume: -16.1 dB
[Parsed_volumedetect_0 @ 0x5642c8652c40] histogram_16db: 168
[Parsed_volumedetect_0 @ 0x5642c8652c40] histogram_17db: 1039
[Parsed_volumedetect_0 @ 0x5642c8652c40] histogram_18db: 3538

# Seems best
ffmpeg -i ${stub}.mp4 -af "volume=1dB" -c:v copy -c:a aac -b:a 64k ${stub}_volfix.mp4 

# This resamples to 192kHz, which seems extreme
#ffmpeg -i ${stub} -af "loudnorm" -c:v copy -c:a aac -b:a 64k ${stub}_volfix-loudnorm.mp4 
{% endhighlight %}


All done.


