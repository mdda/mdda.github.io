---
comments: true
date: 2011-11-25 04:51:21+00:00
title: PulseAudio default Sink (output)
category: OSS
wordpress_id: 502
wp_parent: '0'
wp_slug: pulseaudio-default-sink-output
tags:
- fc16
- fedora
- MythTV
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


MythTV suddenly stopped audio (yet again : Every upgrade the reason is different).  This time, it appears that the order the audio cards are detected has changed, so the default output has changed...

The following is relevant to the process (haven't tested this through a reboot, yet) :


{% highlight bash %}
bash
$ pacmd help
$ pacmd info  | grep -i default
$ pacmd list-sinks
$ pacmd info  | grep -i alsa_output.usb-Burr-Brown_from_TI_USB_Audio_CODEC-00-CODEC.analog-stereo
$ pacmd set-default-sink alsa_output.usb-Burr-Brown_from_TI_USB_Audio_CODEC-00-CODEC.analog-stereo
$ pacmd info  | grep -i alsa_output.usb-Burr-Brown_from_TI_USB_Audio_CODEC-00-CODEC.analog-stereo
$ speaker-test 
$ aplay /usr/share/sounds/ekiga/ring.wav
{% endhighlight %}
