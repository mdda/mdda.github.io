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
published: false
---
{% include JB/setup %}


## Looking through docker containers to Nvidia GPU hardware

As background, I used the following helpful resources : 

*  https://medium.com/@aaronpolhamus/nvidia-powered-ml-station-with-fedora-29-docker-a8e4bd6a80ae
*  http://collabnix.com/introducing-new-docker-cli-api-support-for-nvidia-gpus-under-docker-engine-19-03-0-beta-release/

Key points being : 

*  Even though Nvidia suggests using new docker, you still need their container pass-through to get to the host's drivers
*  Fedora's version of docker is too old : You need to use the official docker repos (for CentOS...)



### Clean out previous installations

{% highlight bash %}
dnf -y install dnf-plugins-core
  533  dnf config-manager     --add-repo     https://download.docker.com/linux/fedora/docker-ce.repo
dnf remove docker
  534  dnf install docker-ce docker-ce-cli containerd.io
  535  systemctl start docker
  536  docker run hello-world
  538  su ethan
grep dock /etc/group
docker:x:991:
dockerroot:x:990:
[root@sandbox-nikkei pdftodoc]# usermod -aG docker ethan
id -a # Make sure user is in docker group

sudo -k # reset sudo timeout
exec sudo -i -u $(whoami) # no password necessary

  543  dnf config-manager --add-repo https://nvidia.github.io/nvidia-docker/centos7/nvidia-docker.repo
  545  dnf install nvidia-container-toolkit
  546  systemctl restart docker
  548  docker run -it --rm --gpus all fedora nvidia-smi -L
{% endhighlight %}


### Check that you've got a GPU

Running :

{% highlight bash %}
sudo lspci | grep -i NVIDIA
{% endhighlight %}

should result in a line that mentions your VGA adapter.






All done.

