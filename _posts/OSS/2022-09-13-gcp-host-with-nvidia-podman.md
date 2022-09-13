---
date: 2022-09-13
title: Containers within a GCP host server, with Nvidia pass-through
category: OSS
tags:
- tensorflow
- pytorch
- nvidia
- podman
- docker
- containers
- cloud
- gcp
- deeplearning
- minerl
layout: post
published: true
---
{% include JB/setup %}

### Using Containers within a GCP host server, with Nvidia GPU pass-through
####  Everything from CLI

This is a short-but-complete guide to setting up a container environment 
with deep learning enables using a Google Cloud Virtual Machine host.


### Outline

These are the steps that this involves, and leaves the final machine pretty quick to start/stop:

* Create a preemptible GPU-enabled GCP machine
  + With `podman` (which is a container framework, drop-in compatible with `docker`)
* Set up `ssh` so that it can be used easily
  + Include 'tunnels' that enable ports for `jupyter` or `tensorboard` to be accessed securely through plain `ssh`
  + With scripts to enable fast start/stop and mount/unmount of the VM
* Install software on the GCP machine:
  + the Nvidia drivers with `cuda`
  + and the Nvidia container extras to enable container pass-through of the GPU
* Build and run a podman container
  + And prove that the `nvidia` GPU is available

All-in-all, the below enables us to use GCP as a good test-bed for projects that 
are containerised already, for example [the `MineRL` competition setup](https://www.aicrowd.com/challenges/neurips-2022-minerl-basalt-competition).


### Create a suitable Host Google Cloud VM

Please have a look at my [previous blog post](/oss/2022/09/02/gcp-host-with-convenience-scripts) for this.

>  Result : For US 22 cents an hour, we have an 8 core machine with 30GB of RAM, and a 16Gb GPU.  Pretty Nice!


### Scripting the Host instance

Please have a look at my [previous blog post](/oss/2022/09/02/gcp-host-with-convenience-scripts) for this.

>  Result : We now have convenience commands `gcp_start` / `gcp_mount_and_edit` / `gcp_umount` / `gcp_stop` to get the host working nicely


### Install Nvidia drivers and `cuda` in the Host 

Please have a look at my [previous blog post](/oss/2022/09/02/gcp-host-with-convenience-scripts) for this.

>  Result : The host Nvidia GPU is ready for work...



### Install `podman` to run containers

**Now we're ready for the container stuff!**

Install `podman` (which is available in Ubuntu 2022.04 directly) from within the host:

{% highlight bash %}
sudo apt-get -y install podman
{% endhighlight %}

Since it's cleanest (to my normal Fedora eyes) to run `podman` without using the root user, 
we need to set up the registries available, etc, on our non-priviledged user:

{% highlight bash %}
mkdir -p ~/.config/containers
tee ~/.config/containers/registries.conf > /dev/null <<EOL
# This is a system-wide configuration file used to
# keep track of registries for various container backends.
# It adheres to TOML format and does not support recursive
# lists of registries.

# The default location for this configuration file is
# /etc/containers/registries.conf.

# The only valid categories are: 'registries.search', 'registries.insecure', 
# and 'registries.block'.

[registries.search]
#registries = ['docker.io', 'quay.io', 'registry.access.redhat.com']
registries = ['docker.io']

# If you need to access insecure registries, add the registry's fully-qualified name.
# An insecure registry is one that does not have a valid SSL certificate or only does HTTP.
[registries.insecure]
registries = []

# If you need to block pull access from a registry, uncomment the section below
# and add the registries fully-qualified name.
#
# Docker only
[registries.block]
registries = []

EOL

{% endhighlight %}

Useful commands for `podman`:

{% highlight bash %}
podman info | grep conf
podman images
{% endhighlight %}




### Install Nvidia container extras in the Host

We're using `podman` as the container runner, and we need to enable the _real Nvidia hardware_ to be 
available within the container.  We need to set up that connection ourselves.

The following installs the Nvidia container extras, based on the [Nvidia documentation](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#podman):

{% highlight bash %}
distribution=$(. /etc/os-release;echo $ID$VERSION_ID) \
    && curl -s -L https://nvidia.github.io/libnvidia-container/gpgkey | sudo apt-key add - \
    && curl -s -L https://nvidia.github.io/libnvidia-container/$distribution/libnvidia-container.list | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

# Seems to use 18.04 sources for apt, even though $distribution=ubuntu20.04

sudo apt-get update \
    && sudo apt-get install -y nvidia-container-toolkit
    
# ...    
#Setting up libnvidia-container1:amd64 (1.10.0-1) ...
#Setting up libnvidia-container-tools (1.10.0-1) ...
#Setting up nvidia-container-toolkit (1.10.0-1) ...
#Processing triggers for libc-bin (2.35-0ubuntu3.1) ...

# nvidia-container-toolkit is already the newest version (1.10.0-1).

  
# This is required to get nvidia into containers...
sudo mkdir -p /usr/share/containers/oci/hooks.d/
sudo joe /usr/share/containers/oci/hooks.d/oci-nvidia-hook.json 
#... with content from nvidia install instructions
#... add content ... 


# To enable rootless containers : 
sudo sed -i 's/^#no-cgroups = false/no-cgroups = true/;' /etc/nvidia-container-runtime/config.toml

{% endhighlight %}


### Check that everything is working

To see that this is working, we need a container that is CUDA-ready.  For me (and this is the motivation for the whole push towards containerisation here)
I've been working with a `minerl-basalt-base` setup 
which is created by running the Dockerfile found [here](https://github.com/minerllabs/basalt-2022-behavioural-cloning-baseline/blob/main/Dockerfile) :

{% highlight bash %}
git clone https://github.com/minerllabs/basalt-2022-behavioural-cloning-baseline.git
cd basalt-2022-behavioural-cloning-baseline

podman build --file Dockerfile --tag minerl-basalt-base --format docker 

podman run -it minerl-basalt-base

aicrowd@549f95a04499:~$ python    
Python 3.7.12 | packaged by conda-forge | (default, Oct 26 2021, 06:08:53) 
[GCC 9.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import torch
>>> torch.cuda.is_available()
True
### THIS ^^ IS THE WINNING LINE
>>> quit()
{% endhighlight %}


### Running `podman` with port pass-through

The following container run command also makes (say) `jupyter-lab` available on the local machine (via two passthroughs : container-podman-host and host-ssh-localhost):

{% highlight bash %}
podman run -p 8585:8585 -it minerl-basalt-base

# Assuming that jupyter-lab is run inside the container as:
# jupyter-lab --ip=0.0.0.0 --port=8585 --no-browser
{% endhighlight %}



### Terminate the GCP VM when done...

Using the scripted commands that we have (if you followed the previous blog post) in our `~/.bashrc` :

{% highlight bash %}
gcp_umount
gcp_stop
# And double-check on the GCP browser UI that the machine really is stopped - just to be extra sure
{% endhighlight %}



### End

All done!

>  Shout-out to Google for helping this process by generously providing Cloud Credits to help get this all implemented!

