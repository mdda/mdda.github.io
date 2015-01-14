---
date: 2014-12-17
title: Fedora 21 machine setup
category: OSS
tags:
- fedora
- linux
- fc21
layout: post
published: true
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

### Install essential tools

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
yum install gimp inkscape gthumb
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

### Install numpy / theano / ipython Prerequisites

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

### Install ```geany-project-tree``` plugin

{% highlight bash %}
yum install geany-plugins-geanypy

# launch geany and enable the GeanyPy plug (Tools Plugin Manager)
geany -i

# Download the geany-project-tree plugin, and install
mkdir tools
cd tools/
git clone https://github.com/mdda/geany-project-tree.git
cd geany-project-tree/
ln -s `pwd`/project-tree ~/.config/geany/plugins/geanypy/plugins/
# Load the plugin via Tools Python Plugin Manager
geany -i

# Test the installation (on the plugin's own setup, sample config provided)
cd geany-project-tree/
geany -i

# Just for convenience, enable git password caching (15 mins is default timeout)
git config --global credential.helper cache
# Set the cache to timeout after 1 hour (setting is in seconds)
git config --global credential.helper 'cache --timeout=3600'
{% endhighlight %}

### Remove superfluous RPMs

{% highlight bash %}
yum remove transmission* claws-mail* midori* 
yum remove pidgin* remmina* liferea* abiword* orage* parole* ristretto*
{% endhighlight %}

### RPMs required for 'ruby bundler' (for Jekyll - i.e. this blog)

{% highlight bash %}
yum install ruby-devel rubygem-bundler
yum install nodejs
{% endhighlight %}

Now, going into the project folder, do a ```bundle install``` to bring in the Ruby dependencies,
and this should allow local serving/testing of the content as follows :

{% highlight bash %}
bundle install 
bundle exec jekyll serve --watch --unpublished
{% endhighlight %}

### Install ```vlc```

(First checking which repositories worked best on previous machine) :

{% highlight bash %}
ls -l /mnt/hd/etc/yum.repos.d/
yum install http://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-21.noarch.rpm
yum install http://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-21.noarch.rpm
yum install vlc
{% endhighlight %}

### Install Google Chrome

First, get the download from the [the Google Download site](https://www.google.com/chrome/browser/desktop/index.html), then :

{% highlight bash %}
yum install Downloads/google-chrome-stable_current_x86_64.rpm 
{% endhighlight %}

### Mount an SMB drive to copy some media files

{% highlight bash %}
# As a local user, create a suitable SMB credentials file : 
mkdir -i ~/.cifs
echo "user=username" >> ~/.cifs/viewqwest 
echo "password=password" >> ~/.cifs/viewqwest 

# and as root :
mkdir -p /mnt/media
mount -t cifs //viewqwest.herald/2tb /mnt/media -o rw,user,noauto,credentials=/home/andrewsm/.cifs/viewqwest,uid=andrewsm,gid=nobody
{% endhighlight %}

### Install EncFS (for sync-able encrypted folders)

This is for regular (sync-able) file-system files that can be 
encrypted/decrypted on the fly.  Very usefull in conjunction with ```unison``` :

{% highlight bash %}
yum install fuse-encfs

# remove '#' before user_allow_other
joe /etc/fuse.conf
{% endhighlight %}

The following script mounts an encrypted folder simply :
{% highlight bash %}
#!/bin/bash

#Capture the full path (required for mounting)
p=`pwd`
fusermount -u ${p}/Finance

DIALOGTEXT="Enter the Personal-Finance EncFS Password"
encfs \
 -o allow_other \
 --extpass="zenity --title 'EncFS Password' --entry --hide-text --text '$DIALOGTEXT'" \
 ${p}/.Finance-encfs/ ${p}/Finance/
{% endhighlight %}

And the following script un-mounts it :
{% highlight bash %}
#!/bin/bash
fusermount -u Finance
{% endhighlight %}


### Install Skype

First, install Skype from [http://www.skype.com/en/download-skype/skype-for-linux/](the Skype Linux download page) (the 32-bit Fedora one works).

Then, check that there are no pre-64-bit RPMs installed on the machine.  
That will (likely) prove that the Linux install is pure 64-bit native, meaning 
that (helpfully) Skype is the only reason that 32-bit packages are installed.
This in turn means that when it comes time to replace Skype with something
more Linux-friendly, it will be easier to remove it cleanly.

{% highlight bash %}
rpm -qa | grep i586
rpm -qa | grep i686
rpm -qa | grep i486
# NO 32-bit RPMs before Skype

yum install Downloads/skype-4.3.0.37-fedora.i586.rpm 
{% endhighlight %}

