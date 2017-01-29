---
date: 2016-11-30
title: Fedora 25 XFCE Live modifications
category: OSS
tags:
- fedora
- linux
- xfce
layout: post
published: true
---
{% include JB/setup %}


This is just an 'internal memo' to myself, to keep track of the package installations
I do to make my basic machine install out of the standard Fedora (25) XFCE Live install-to-disk
base image.


### Essential first steps

{% highlight bash %}
systemctl enable sshd
systemctl start sshd

dnf install joe scite git unison240 
{% endhighlight %}

Now get the other disks mounted against newly created mount-points in ```/mnt/``` (into ```/etc/fstab```).
And re-add assorted entries into ```/etc/hosts```.

### Base Packages

{% highlight bash %}
# Dead-weight
dnf remove pragha parole abiword claws-mail* leafpad orage ristretto pidgin transmission gnumeric asunder tumbler

# Better alternatives
dnf install libreoffice deluge 

# Specific desirable extras
dnf install baobab keepassx gstreamer1-plugin-mpg123 unzip ack

# Specific python extras (noteably for numpy/jupyter use)
dnf install python-devel python2-virtualenv \
            gcc gcc-c++ \
            scipy numpy python-scikit-learn python-pandas Cython  \
            blas-devel lapack-devel atlas-devel  \
            python-pillow geany-plugins-geanypy  \
            graphviz libyaml hdf5-devel

#? redhat-rpm-config

# Graphics
dnf install gthumb gimp inkscape
{% endhighlight %}


### Disable ```SELINUX``` (for sanity, mainly)

{% highlight bash %}
scite /etc/selinux/config
# Change "SELINUX=enforcing" to "SELINUX=permissive"
{% endhighlight %}


### Google Chrome

{% highlight bash %}
cat << EOF > /etc/yum.repos.d/google-chrome.repo
[google-chrome]
name=google-chrome - \$basearch
baseurl=http://dl.google.com/linux/chrome/rpm/stable/\$basearch
enabled=1
gpgcheck=1
gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub
EOF

dnf install google-chrome-stable
{% endhighlight %}


### Google Talk Plugin (for Firefox - not required for Chrome)

Download the [current version of Google Talk Plugin](https://www.google.com/tools/dlpage/hangoutplugin/download.html?platform=linux_fedora_x86_64), and then :

{% highlight bash %}
# after download using browser ...
dnf install Downloads/google-talkplugin_current_x86_64.rpm 
dnf update firefox
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

