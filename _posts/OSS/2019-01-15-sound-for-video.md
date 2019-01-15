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


### Treating the audio separately

*  Take the audio from the combined file
   -  https://www.bugcodemaster.com/article/extract-audio-video-using-ffmpeg
   
*  Process the audio (keep length the same)

*  Recombine the audio into the video file
   -  https://superuser.com/a/1137613


#### Check the formats in the file


{% highlight bash %}
ffmpeg -i vokoscreen-2019-01-10_15-00-45.mkv 

Input #0, matroska,webm, from 'vokoscreen-2019-01-10_15-00-45.mkv':
  Metadata:
    ENCODER         : Lavf58.12.100
  Duration: 01:08:23.50, start: 0.000000, bitrate: 265 kb/s
    Stream #0:0: Video: h264 (High), yuv420p(progressive), 1366x768, 25 fps, 25 tbr, 1k tbn, 50 tbc (default)
    Metadata:
      ENCODER         : Lavc58.18.100 libx264
      DURATION        : 01:08:23.503000000
    Stream #0:1: Audio: mp3, 48000 Hz, stereo, fltp, 128 kb/s (default)
    Metadata:
      ENCODER         : Lavc58.18.100 libmp3lame
      DURATION        : 01:08:22.709000000
{% endhighlight %}

HD 720p 25fps?



{% highlight bash %}
ffmpeg -i Seer\ 01\ 2019\ 01\ 09.mp4 

Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'Seer 01 2019 01 09.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf58.12.100
  Duration: 00:51:21.65, start: 0.041016, bitrate: 3575 kb/s
    Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuv420p, 1280x720, 3379 kb/s, 24 fps, 24 tbr, 12288 tbn, 48 tbc (default)
    Metadata:
      handler_name    : VideoHandler
    Stream #0:1(und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 192 kb/s (default)
    Metadata:
      handler_name    : SoundHandler
{% endhighlight %}



#### Take the audio from the combined file

{% highlight bash %}
ffmpeg -i SEER-01_2019-01-09.mp4 -vn -acodec copy SEER-01_audio_raw.aac
ffmpeg -codecs

ffmpeg -i SEER-01_2019-01-09.mp4 -vn -acodec pcm_s16be SEER-01_audio_raw.wav
{% endhighlight %}


#### Process the audio (keep length the same)

Load `SEER-01_audio_raw.wav` into Audacity to do the following processing : 

*   `Effect - Fade-in / out` to smooth out the recording
*   `Effect - Noise Reduction` (need to find a section of 'silence' for it to fingerprint first)
*   `Effect - Amplify` (so that maxiumum amplitude is 0dB)
*   `File - Export as` OGG (quality=5 seems fine) = SEER-01_audio_clean.ogg


#### Recombine the audio into the video file

{% highlight bash %}
ffmpeg -i SEER-01_2019-01-09_high-xvid_HD720p.25.mp4 -i SEER-01_audio_clean.ogg \
  -c:v copy -map 0:v:0 -map 1:a:0 SEER-01_2019-01-09_clean.mp4

ffmpeg -i SEER-01_2019-01-09_Med-VimeoWide_1Mb.mp4 -i SEER-01_audio_clean.ogg \
  -c:v copy -map 0:v:0 -map 1:a:0 SEER-01_2019-01-09_small-clean.mp4
{% endhighlight %}


All done.


