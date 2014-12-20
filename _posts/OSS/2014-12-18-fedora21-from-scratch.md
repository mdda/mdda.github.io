---
date: 2014-12-18
title: Fedora 21 machine setup
category: OSS
tags:
- fedora
- linux
- fc21
layout: post
published: false
---
{% include JB/setup %}

This is the (almost) complete list of actions performed at the command line to 
bring up an Acer Laptop to 'operational standard' from its original
installation via 'Fedora 21 XFCE Live Spin (64-bit)' from a USB drive onto
the laptop's brand new SSD drive.

### Update machine after initial USB install

{% highlight bash %}
yum install yum-plugin-fastestmirror
yum update
reboot
{% endhighlight %}

### Install tool essentials

{% highlight bash %}
yum install firefox geany joe scite git libreoffice unison keepassx 
{% endhighlight %}

### Copy lots of stuff from previous HD

This was stored on the HD using full-disk encryption - which I expected to 
make mounting/reading it painfull.  However, Fedora appears to detect
what's going on when the HD is plugged in (now using a USB-to-SATA interface)
and the mounting goes through flawlessly (after the password is entered).
the ```ln -s``` is done for command-line convenience.

{% highlight bash %}
ls -l /mnt/
ln -s /run/media/andrewsm/8f8d7243-4319-4e55-897e-76e53e16b43b /mnt/hd
ls -l /mnt/hd/home/andrewsm/

mkdir install-old-hd
cp  /mnt/hd/home/andrewsm/install.* install-old-hd/

# All OSS projects (but includes some data directories)
rsync -avz --progress  /mnt/hd/home/andrewsm/OpenSource .    

# Internal 'sketchpad' for miscellaneous works-in-progree
rsync -avz --progress  /mnt/hd/home/andrewsm/sketchpad .

# Bring over settings so that logins work elsewhere (clone old HD's settings)
rsync -avz --progress  /mnt/hd/home/andrewsm/.ssh .

# Bring over old unison file-sync settings to make it seamless
rsync -avz --progress  /mnt/hd/home/andrewsm/.unison .

# Bring over a file-sync directory directly to avoid needless network sync
rsync -avz --progress  /mnt/hd/home/andrewsm/Personal .
{% endhighlight %}

### More tools

Now that machine is looking more like home (and proven itself somewhat stable), 
pull in more heavy-weight packages :

{% highlight bash %}
yum install gcc python cmake make 
yum install gimp inkscape
{% endhighlight %}

### Bumblebee install (for Nvidia card)

As per <a href="/oss/2014/06/15/install-nvidia-optimus-on-FC20-acer-notebook/" target="_blank">instructions on this blog</a> :

{% highlight bash %}
yum install -y libbsd-devel libbsd glibc-devel libX11-devel help2man autoconf git tar glib2 glib2-devel kernel-devel kernel-headers automake gcc gtk2-devel
yum install VirtualGL 

yum -y --nogpgcheck install http://install.linux.ncsu.edu/pub/yum/itecs/public/bumblebee/fedora20/noarch/bumblebee-release-1.1-1.noarch.rpm
yum -y install bbswitch bumblebee

yum -y --nogpgcheck install http://install.linux.ncsu.edu/pub/yum/itecs/public/bumblebee-nonfree/fedora21/noarch/bumblebee-nonfree-release-1.1-1.noarch.rpm
yum -y install bumblebee-nvidia

touch /etc/sysconfig/nvidia/compile-nvidia-driver
reboot
{% endhighlight %}

### Make the Suspend of the NVidia GPU work

As per <a href="/oss/2014/11/26/FC20-acer-notebook-suspend-gpu/" target="_blank">instructions on this blog</a> :

{% highlight bash %}
# Check whether noveau or nvidia are currently running 
# (Should be '' for both)
lsmod | grep no
lsmod | grep nv

# This should give back results
optirun lsmod | grep nv
optirun --no-xorg modprobe -r nvidia
more /proc/acpi/bbswitch 

# Get the script from the blog post...
scite /usr/lib/systemd/system-sleep/turn-off-gpu.sh &
chmod 755 /usr/lib/systemd/system-sleep/turn-off-gpu.sh
/usr/lib/systemd/system-sleep/turn-off-gpu.sh pre suspend-test
more sleep.log 
{% endhighlight %}

### Install numpy / theano / ipython Prerequisits

{% highlight bash %}
yum install libyaml-devel zeromq-devel
yum install openblas-devel atlas-devel gcc-gfortran
yum install python-virtualenv
yum install libpng-devel freetype-devel
yum install hdf5-devel
{% endhighlight %}

### Install the CUDA toolkit

As per <a href="/oss/2014/11/21/install-nvidia-optimus-CUDA/" target="_blank">instructions on this blog</a> :

{% highlight bash %}
chmod 744 /home/andrewsm/Downloads/cuda_6.5.14_linux_64.run 
/home/andrewsm/Downloads/cuda_6.5.14_linux_64.run --override
echo "/usr/local/cuda-6.5/lib64" > /etc/ld.so.conf.d/cuda.conf && ldconfig
joe /home/andrewsm/.bash_profile 
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}

###

{% highlight bash %}
{% endhighlight %}
