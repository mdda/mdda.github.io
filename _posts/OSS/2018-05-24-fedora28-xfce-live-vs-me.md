---
date: 2018-05-24
title: Fedora 28 XFCE Live modifications
category: OSS
tags:
- fedora
- linux
- xfce
layout: post
published: false
---
{% include JB/setup %}


This is just an 'internal memo' to myself, to keep track of the package installations
I do to make my basic machine install out of the standard Fedora (28) XFCE Live install-to-disk
base image.


### Essential first steps

{% highlight bash %}
systemctl enable sshd
systemctl start sshd

dnf install joe scite git unzip ack 
{% endhighlight %}

After that, get any other pre-existing data disks mounted against newly created 
mount-points in ```/mnt/``` (into ```/etc/fstab```).  And re-add assorted entries into ```/etc/hosts```.


### Base Packages

{% highlight bash %}
# Dead-weight
dnf remove pragha parole abiword claws-mail* leafpad orage ristretto pidgin transmission gnumeric asunder tumbler
dnf remove dnfdragora dnfdragora-gui

# Better alternatives
dnf install libreoffice deluge 

# Specific possibly desirable extras
dnf install baobab keepassx gstreamer1-plugin-mpg123 unison240 

# Specific python extras (noteably for numpy/jupyter use)
dnf install python-devel python2-virtualenv \
            gcc gcc-c++ \
            scipy numpy python-scikit-learn python-pandas Cython \
            blas-devel lapack-devel atlas-devel  \
            python-pillow geany-plugins-geanypy  \
            graphviz libyaml hdf5-devel

#? redhat-rpm-config

# Graphics
dnf install gthumb gimp inkscape
{% endhighlight %}


### Disable ```SELINUX``` (for sanity, mainly)

Sorry - but ```SELINUX``` is still to arcane to just use...

{% highlight bash %}
scite /etc/selinux/config
# Change "SELINUX=enforcing" to "SELINUX=permissive"
{% endhighlight %}


### Google Chrome

New instructions for Fedora 27/28 :

{% highlight bash %}
dnf install fedora-workstation-repositories
dnf config-manager --set-enabled google-chrome

dnf install google-chrome-stable
{% endhighlight %}



### Install ```vlc```

{% highlight bash %}
rpm -ivh http://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-25.noarch.rpm
dnf install vlc
{% endhighlight %}


### Other 'multimedia'

{% highlight bash %}
dnf install youtube-dl      # Archiving of videos
dnf install simple-scan     # Scan to PDF
dnf install recoll          # Manage research PDF collection
dnf install gvfs-mtp        # Talk to Android MTP storage 
{% endhighlight %}


### Other 'security'

{% highlight bash %}
dnf install fuse-encfs keepassx

joe /etc/fuse.conf  ## Add (/uncomment):  "user_allow_other"
{% endhighlight %}


### Printer installation (depending on location)

For Brother Multifunction printers, mostly follow the instructions 
in [my previous blog entry](/oss/2015/06/08/brother-multifunction-printer), except for the ```rpm``` packages now have slightly different names.

Also, because Brother hasn't got the dependencies right, the following 32-bit library needs to be installed:

{% highlight bash %}
dnf install glibc.i686
{% endhighlight %}

Also, these should be installed *before* installing the scanner driver:

{% highlight bash %}
dnf install sane-backends sane-backends-drivers-scanners
{% endhighlight %}

Note that the printer/CUPS controls can also be accessed at [http://localhost:631/](http://localhost:631/).

