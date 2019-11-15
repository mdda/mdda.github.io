---
date: 2019-11-12
title: 'Nvidia through docker on Fedora 30'
category: OSS
tags:
- fedora
- linux
- Nvidia
- docker
layout: post
published: true
---
{% include JB/setup %}


## Looking through docker containers to Nvidia GPU hardware

As background, I used the following helpful resources : 

*  https://medium.com/@aaronpolhamus/nvidia-powered-ml-station-with-fedora-29-docker-a8e4bd6a80ae
*  http://collabnix.com/introducing-new-docker-cli-api-support-for-nvidia-gpus-under-docker-engine-19-03-0-beta-release/

Key points being : 

*  Even though Nvidia suggests using new docker, you still need their container pass-through to get to the host's drivers
*  Fedora's version of docker is too old : You need to use the official docker repos (for CentOS...)


### Install the docker repo, and test

{% highlight bash %}
dnf -y install dnf-plugins-core

dnf remove docker   # Just to make sure that we're not on the Fedora official one

dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
dnf install docker-ce docker-ce-cli containerd.io

systemctl start docker
docker run hello-world
#
# Hello from Docker!
# This message shows that your installation appears to be working correctly.
#
# ...
{% endhighlight %}


### Set up user permissions for docker

We need to add each `user` that requires access to the docker system to the `docker` group :

{% highlight bash %}
grep dock /etc/group
#docker:x:991:
#dockerroot:x:990:

[root]# usermod -aG docker user
[root]# su - user
[user]$ id -a # Make sure user is in docker group
{% endhighlight %}

If you're already logged in as an individual `user`, you can 'revitalise' your group membership without re-logging in, by :

{% highlight bash %}
sudo -k # reset sudo timeout
exec sudo -i -u $(whoami) # no password necessary
{% endhighlight %}


### Install the nvidia repo, and test

Now on to the crucial Nvidia piece :

{% highlight bash %}
dnf config-manager --add-repo https://nvidia.github.io/nvidia-docker/centos7/nvidia-docker.repo
dnf install nvidia-container-toolkit

systemctl restart docker

docker run -it --rm --gpus all fedora nvidia-smi -L
# GPU 0: GeForce GTX 1060 6GB (UUID: GPU-b69d6083-PIIa-PIIa-PIIf-a33c1fa106c2)
{% endhighlight %}

All done.

