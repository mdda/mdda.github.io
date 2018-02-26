---
date: 2018-02-25
title: Building Festival TTS on Fedora
tagline: Quick note
category: OSS
tags:
- fedora
- linux
- festival
- TTS
layout: post
published: true
---
{% include JB/setup %}

### The ```Festival``` packages on Fedora are Broken

Some work has taken place in the upstream tar-balls to upgrade to make
the code work with the newer ```gcc```, but this doesn't seem to have 
made it into the RPMs yet.
 

### Building ```Festival``` locally

As ```root``` you just need :

{% highlight bash %}
dnf install ncurses-devel
{% endhighlight %}

And then as a user on the command line:

{% highlight bash %}
mkdir festival-local
cd festival-local  # This is where we'll build festival locally
{% endhighlight %}


#### Download the source(s) and a suitable voice

{% highlight bash %}
# https://bugzilla.redhat.com/show_bug.cgi?id=1457878
# http://festvox.org/packed/festival/2.5/
wget http://festvox.org/packed/festival/2.5/speech_tools-2.5.0-release.tar.gz
wget http://festvox.org/packed/festival/2.5/festival-2.5.0-release.tar.gz
wget http://festvox.org/packed/festival/2.5/festlex_CMU.tar.gz
wget http://www.festvox.org/packed/festival/2.4/festlex_POSLEX.tar.gz
#wget http://festvox.org/packed/festival/2.5/voices/festvox_cmu_us_clb_cg.tar.gz  # Not found by default_voices.sh
wget http://festvox.org/packed/festival/2.5/voices/festvox_cmu_us_slt_cg.tar.gz
{% endhighlight %}

Actually, 'nina' would be a better voice, but download is difficult to find...


#### Unpack everything 

{% highlight bash %}
tar -xzf  speech_tools*.tar.gz
tar -xzf  festival*.tar.gz
tar -xzf  festlex_CMU.tar.gz
tar -xzf  festlex_POSLEX.tar.gz
tar -xzf  festvox_cmu_us_slt_cg.tar.gz
{% endhighlight %}


#### Build ```speech_tools```

{% highlight bash %}
cd speech_tools
./configure
gmake
cd ..
{% endhighlight %}


#### Build ```festival``` itself

{% highlight bash %}
cd festival
./configure
gmake
cd ..
{% endhighlight %}


#### Test ```festival``` on command line

{% highlight bash %}
cd festival/bin

# Try the simplest invocation (to audio output)
echo "This is a test" | ./festival --tts  # Needs /dev/dsp => FAIL

# Send instead to a local WAV file : WORKS!!
echo "This is a test" | ./text2wave -o test.wav
# Output is a mono WAV at 16KHz

{% endhighlight %}


#### Install ```festival``` system-wide (?)

It wasn't necessary to install ```festival``` nor ```speech_tools``` system-wide in 
order to get the TTS functionality required.



All done.

