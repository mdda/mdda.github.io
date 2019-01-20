---
date: 2019-01-15
title: Sound for video
category: OSS
tags:
- fedora
- linux
- ffmpeg
- video
- audio
layout: post
published: false
---
{% include JB/setup %}


Often sound for 'voice over slides' videos gets recorded badly (or at least needs some fixing up), so
here are two approaches to enhancing the sound quality (and some reasonable settings for video)

###  Method 1 : In-place volume normalisation

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
ffmpeg -i ${stub}.mp4 -af "volume=16dB" -c:v copy -c:a aac -b:a 64k ${stub}_volfix.mp4 

# This resamples to 192kHz, which seems extreme
#ffmpeg -i ${stub} -af "loudnorm" -c:v copy -c:a aac -b:a 64k ${stub}_volfix-loudnorm.mp4 
{% endhighlight %}


###  Method 2 : Treating the audio separately

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
# This is the default, apparently:
ffmpeg -i SEER-01_2019-01-09.mp4 -vn -acodec copy SEER-01_audio_raw.aac

# Get a list of all supported formats
ffmpeg -codecs

# Best choice for 'regular WAV'
ffmpeg -i SEER-01_2019-01-09.mp4 -vn -acodec pcm_s16be SEER-01_audio_raw.wav
{% endhighlight %}


#### Process the audio (keep length the same)

Load `SEER-01_audio_raw.wav` manually into Audacity to do the following processing : 

*   `Effect - Fade-in / out` to smooth out the recording
*   `Effect - Noise Reduction` (need to find a section of 'silence' for it to fingerprint first)
*   `Effect - Amplify` (so that maxiumum amplitude is 0dB)
*   `File - Export as` OGG (Quality=5 seems fine) &r_arr; `SEER-01_audio_clean.ogg`


#### Recombine the audio into the video file

Two versions of the same command (illustrating combinations tried) :

{% highlight bash %}
ffmpeg -i SEER-01_2019-01-09_high-xvid_HD720p.25.mp4 -i SEER-01_audio_clean.ogg \
  -c:v copy -map 0:v:0 -map 1:a:0 SEER-01_2019-01-09_clean.mp4

ffmpeg -i SEER-01_2019-01-09_Med-VimeoWide_1Mb.mp4 -i SEER-01_audio_clean.ogg \
  -c:v copy -map 0:v:0 -map 1:a:0 SEER-01_2019-01-09_small-clean.mp4
{% endhighlight %}


###  Next steps...

It would be nice if there was a 'Noise Reduction' option for ```ffmpeg``` - though perhaps there's 
[good news](https://superuser.com/a/1393535) : 

>  FFmpeg now have 2 native filters to deal with noise background: [afftdn](afftdn) 
>  and [anlmdn](https://ffmpeg.org/ffmpeg-filters.html#anlmdn). Also, for some 
>  time one has been able to use ladspa (look for noise-supressor) and/or lv2 (look for speech denoiser) filters with FFmpeg.

Ideas :

{% highlight bash %}
# Fix volume
volume=volume=16dB

# Dynamic volume normalization
#   https://ffmpeg.org/ffmpeg-filters.html#dynaudnorm
dynaudnorm

# Half-a-second fade-in
afade=t=in:ss=0:d=0.5

# FFT-wise eliminate white noise (needs ffmpeg >= 4.1, not in Fedora 29...)
afftdn=nt=w
{% endhighlight %}

so (without the denoising, for now) : 

{% highlight bash %}
ffmpeg -i ${stub}.mp4 -c:v copy -c:a aac -b:a 64k -af "dynaudnorm, afade=t=in:ss=0:d=0.5" ${stub}_fixed.mp4 
{% endhighlight %}

