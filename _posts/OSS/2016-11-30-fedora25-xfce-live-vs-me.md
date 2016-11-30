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


### Essential first step

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
dnf remove pragha parole abiword claws-mail* leafpad orage ristretto pidgin transmission gnumeric asunder

# Better alternatives (and disk analysis tool)
dnf install libreoffice deluge 

# Specific desirable extras
dnf install baobab geany-plugins-geanypy
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

