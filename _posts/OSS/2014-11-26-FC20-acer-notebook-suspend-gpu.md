---
comments: true
date: 2014-11-26
title: Getting an Nvidia GT 750M to suspend properly with BumbleBee
category: OSS
tags:
- nvidia
- fedora
- linux
- fc20
- acer
- bumblebee
- GT-750M
layout: post
published: true
---
{% include JB/setup %}

There's a problem getting the Nvidia card to wake up after a suspend, apparently.  I discovered this during development of some ```Theano``` / ```libgpuarray``` stuff (where the programming environment was tiresome to keep rebuilding).  Until I found the fix, the only way to regain the Nvidia card was to reboot the machine.

So : Before suspending, execute the following commands as root :

{% highlight bash %}
# Check whether Nvidia card is 'live' :
cat /proc/acpi/bbswitch 

# If that shows ON, then try :
tee /proc/acpi/bbswitch <<<OFF
cat /proc/acpi/bbswitch 

# If it still shows ON, then :
optirun --no-xorg modprobe -r nvidia
cat /proc/acpi/bbswitch 

# Should definitely show OFF by now...
{% endhighlight %}

Then the laptop can be safely suspended, and ```optirun``` (the regular bumblebee invocation) will resurrect the GPU.

NB: It's a good idea (if you're just using the GPU for 'compute') to use ```optirun --no-xorg``` since that simplifies the number of different processes with their fingers clutching at your GPU.

### Pre-suspend hook 

As ```root```, create a file ```/usr/lib/systemd/system-sleep/turn-off-gpu.sh``` with the following contents (change the ```username``` path to somewhere relevant) :

{% highlight bash %}
#!/bin/bash
[ "$1" = "pre" ] && {
  LOG=/home/username/sleep.log
  
  D=`date`
  echo "${D} :: Pre-'$2'" >> ${LOG}
  
  echo -n "  GPU state before      : " >> ${LOG}
  cat /proc/acpi/bbswitch >> ${LOG}
  
  optirun --no-xorg modprobe -r nvidia >> ${LOG}
  
  echo -n "  GPU state modprobe -r : " >> ${LOG}
  cat /proc/acpi/bbswitch >> ${LOG}
  
  sleep 1
  
  echo -n "  GPU state after wait  : " >> ${LOG}
  cat /proc/acpi/bbswitch >> ${LOG}
}
exit 0
{% endhighlight %}

(Remember to ```chmod 755 /usr/lib/systemd/system-sleep/turn-off-gpu.sh``` after creating it.)

To test (without suspending) try ```/usr/lib/systemd/system-sleep/turn-off-gpu.sh pre suspend-test```, and check for new entries in the file ```/home/username/sleep.log``` : You should get an entry like ::

{% highlight bash %}
Wed Nov 26 16:06:28 SGT 2014 :: Pre-'suspend-test'
  GPU state before      : 0000:01:00.0 ON
  GPU state modprobe -r : 0000:01:00.0 ON
  GPU state after wait  : 0000:01:00.0 OFF
{% endhighlight %}

(with the final 'OFF' being the verification that it's now safe for the suspend to take effect).

