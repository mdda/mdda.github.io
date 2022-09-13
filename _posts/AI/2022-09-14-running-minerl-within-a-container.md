---
date: 2022-09-14
title: Running `minerl` within a Container
category: AI
tags:
- podman
- docker
- containers
- deeplearning
- minerl
layout: post
published: false
---
{% include JB/setup %}

### Running `minerl` within a Container

This blog post outlines the steps required to run the `minerl` environment,
which is used for the [The MineRL Benchmark for Agents that Solve Almost-Lifelike Tasks (MineRL BASALT) competition](https://www.aicrowd.com/challenges/neurips-2022-minerl-basalt-competition).

There are several benefits to running this way:

* The `minerl` environment and OpenAI `VPT` models are tricky to set up
  + The containerised version has all the correct versions and paths set up in 1 command
  + This is particularly helpful for Windows users, who seem to experience most pain
* Submissions to the competition require a container version
  + Developing in the right environment ensures that this is practically seamless
* Getting familiar with containers is a useful side-effect



### Outline

These are the steps that this involves, and leaves the final machine pretty quick to start/stop:

* Create / use a Host machine
  + Ideally this machine will have a GPU
  + I have published a [blog post](/oss/2022/09/02/gcp-host-with-convenience-scripts) about how to do this in the cloud
    - So that your whole GPU-based set-up runs for 22c per hour
  + If you already have a decent desktop machine, this is a NOOP
  
* Enable the host to run `podman` (which is almost identical to `docker`) including the *Nvidia pass-through into containers* that we need
  + I have published a [blog post](/oss/2022/09/13/gcp-host-with-nvidia-podman) about how to do this for an Ubuntu (Linux) machine, 
    so if that's your preference, then the instructions are right there
  + If you're Windows-based, then I'd be glad to point to point to good `docker` / `podman` and Nvidia resources to link too...

* Build the `minerl` containers (these are one-line commands) to set up the environment nicely.
  + This step is the focus of this blog post
  

> Below, I'll refer to `podman` (since it's more Open Source oriented), but it's likely that `docker` would work just as well.


### Ensure `podman` has the right registries

Run the following to check that the `docker.io` registry is enabled 
(since that's where the `aicrowd` docker definition files are stored) :

{% highlight bash %}
podman info
{% endhighlight %}

Other useful commands for `podman`:

{% highlight bash %}
podman images
{% endhighlight %}


### Create the container for `minerl-basalt-base`

Our set-up is going to be based on the 
Dockerfile found [here](https://github.com/minerllabs/basalt-2022-behavioural-cloning-baseline/blob/main/Dockerfile),
which is within the `basalt-2022-behavioural-cloning-baseline` repo 
(i.e. it's an official thing, that's known to work with the rest of the `minerl` / `aicrowd` infrastructure): 

{% highlight bash %}
git clone https://github.com/minerllabs/basalt-2022-behavioural-cloning-baseline.git
# (One could also download the zip of the repo and unzip it here)

cd basalt-2022-behavioural-cloning-baseline

podman build --file Dockerfile --tag minerl-basalt-base --format docker 

""" OUTPUT (your 'hashes' may differ) :
STEP 1/14: FROM aicrowd/base-images:minerl-22-base
STEP 2/14: ARG DEBIAN_FRONTEND=noninteractive
--> 6cbbdce25bc
STEP 3/14: USER root
--> 7adfc2d58d6
STEP 4/14: COPY apt.txt apt.txt
--> a279832ad03
...
"""
# Expect a LOOONG installation phase (eg: 25 minutes)
""" OUTPUT  (your 'hashes' may differ) : 
--> e5be41ec372
STEP 14/14: COPY --chown=1001:1001 . /home/aicrowd
COMMIT minerl-basalt-base
--> 7bef6121ed0

Successfully tagged localhost/minerl-basalt-base:latest
7bef6121ed04b3b69f636e66cb2fc959c9d0d40daf2b47fc15fc982e0e9de19b

"""

{% endhighlight %}

The `podman build` command about includes the tag `minerl-basalt-base` so that we can consistently 
refer to the same basic container, which we can then build on.

Fortunately, once the base container is built, the various steps are cached, 
and if we add on to the end of the file (or run subsequent steps), the unchanged precursor steps
are just retrieved from the local cache, and so it's much quicker.


### Run the container for `minerl-basalt-base`

Run the following to see that the container 'boots' extremely fast, and is ready to run, including 

{% highlight bash %}
podman run -it minerl-basalt-base

aicrowd@549f95a04499:~$ python    
Python 3.7.12 | packaged by conda-forge | (default, Oct 26 2021, 06:08:53) 
[GCC 9.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import minerl 
### NO COMPLAINTS EXPECTED
>>> import torch
>>> torch.cuda.is_available()
True
### THIS ^^ IS THE WINNING LINE FOR GPU CONNECTIVITY
>>> quit()
aicrowd@549f95a04499:~$ exit
{% endhighlight %}

Once we exit, though, the container *evaporates* : There's nothing left - any changes are gone!


### Building a container for development






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

