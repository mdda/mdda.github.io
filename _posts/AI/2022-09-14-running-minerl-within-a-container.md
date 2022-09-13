---
date: 2022-09-14
title: "Running MineRL within a Container"
tagline: MineRL
category: AI
tags:
- podman
- docker
- containers
- deeplearning
- minerl
layout: post
published: true
---
{% include JB/setup %}

### Running `minerl` within a Container

This blog post outlines the steps required to run the `minerl` environment,
which is used for the [The MineRL Benchmark for Agents that Solve Almost-Lifelike Tasks (MineRL BASALT) competition](https://www.aicrowd.com/challenges/neurips-2022-minerl-basalt-competition).

There are several benefits to running this way:

* The `minerl` environment and OpenAI `VPT` models are tricky to set up
  + The containerised version has all the correct versions and paths set up in 1 command
  + This is particularly helpful for Windows users, who seem to experience most pain
* Submission to the competition requires a container version
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
podman info  # look under the 'registries:' entry
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


### Building a container for development : `minerl-basalt-dev`

These are just suggestions, that illustrate how we can now build on to of `minerl-basalt-base`...

We're going to add 3 new files into the `basalt-2022-behavioural-cloning-baseline` directory: 
{% highlight bash %}
# Make sure we're in the right directory:
cd ../basalt-2022-behavioural-cloning-baseline

# Here are the files we're adding : 
ls -l | grep dev | grep -v '~'
#-rw-rw-r-- 1 andrewsm andrewsm   706 Sep 10 08:04 Dockerfile-dev
#-rw-rw-r-- 1 andrewsm andrewsm     0 Sep 10 08:04 apt-dev.txt
#-rw-rw-r-- 1 andrewsm andrewsm   334 Sep 10 08:05 environment-dev.yml
{% endhighlight %}


Contents of `Dockerfile-dev` (this is very similar in style to the original Dockerfile, 
except that it builds on `minerl-basalt-base` - so is quick to iterate with): 

{% highlight bash %}
FROM minerl-basalt-base

# Install needed apt packages
ARG DEBIAN_FRONTEND=noninteractive
USER root
COPY apt-dev.txt apt-dev.txt
RUN apt -qq update && xargs -a apt-dev.txt apt -qq install -y --no-install-recommends \
 && rm -rf /var/cache/*

# Set the user and conda environment paths
USER aicrowd
ENV HOME_DIR /home/$USER
ENV CONDA_DEFAULT_ENV="minerl"
ENV PATH /home/aicrowd/.conda/envs/minerl/bin:$PATH
ENV FORCE_CUDA="1"

# Use MineRL environment
SHELL ["conda", "run", "-n", "minerl", "/bin/bash", "-c"]

# Conda environment update
COPY environment-dev.yml environment-dev.yml
RUN conda env update --name minerl -f environment-dev.yml --prune

## Copy the files
#COPY --chown=1001:1001 . /home/aicrowd
{% endhighlight %}


Contents of `apt-dev.txt` (this includes additional packages, over-and-above those already installed) : 

{% highlight bash %}
# Nothing here yet - but if you needed OS packages installed... list them here
{% endhighlight %}


Contents of `environment-dev.txt` (this includes additional dependencies, over-and-above those already installed) : 

{% highlight bash %}
name: minerl
channels:
  - conda-forge
  - defaults
  - pytorch
dependencies:
  - pip:
    - jupyterlab
    - pyvirtualdisplay
{% endhighlight %}


Finally, build the new *development container* with :

{% highlight bash %}
podman build --file Dockerfile-dev --tag minerl-basalt-dev --format docker 
{% endhighlight %}

The simplest way to run it is (though we're going to get more fancy soon) :

{% highlight bash %}
podman run -it minerl-basalt-dev
{% endhighlight %}



### Using port forwarding to the host

The following container run command also makes (say) `jupyter-lab` available in your browser:

{% highlight bash %}
podman run -p 8585:8585 -it minerl-basalt-dev

# Assuming that jupyter-lab is run inside the container as:
# jupyter-lab --ip=0.0.0.0 --port=8585 --no-browser
{% endhighlight %}


Note that if your host is not your desktop machine (i.e. you are doing a `ssh` into your host), then if you 
also portforward your host to your local machine (e.g.: `ssh -L 8585:localhost:8585`) then the whole chain 
from container to your desktop localhost should work.


### Using host folder mounting

In order to have some persistent state stored by the container, 
we'll mount host directories so that they're available inside the container for read/write.
Care has to be taken if we're using [rootless volumes](https://www.tutorialworks.com/podman-rootless-volumes/) : 

{% highlight bash %}
cd ../basalt-dev/..  # Make sure that current folder is parent of 'basalt-dev' on the host

# The '1001' number is the default `uid` (user id) of the `aicrowd` user inside the container
# But we'll leave the `gid` (group id) alone, so that our host user can also access seamlessly from the host side
podman unshare chown 1001 -R ./basalt-dev
podman unshare chmod ug+rw -R ./basalt-dev

# Now run the container, with the shared folder mounted inside
podman run --mount=type=bind,source=`pwd`/basalt-dev,destination=/home/aicrowd/basalt-dev -it minerl-basalt-dev
{% endhighlight %}



### Complete commandline for `minerl-basalt-dev`

These ideas can be combined (i.e. port forwarding and directory sharing) : 

{% highlight bash %}
cd ../basalt-dev/..  # Make sure that current folder is parent of 'basalt-dev' on the host

podman run -p 8585:8585 --mount=type=bind,source=`pwd`/basalt-dev,destination=/home/aicrowd/basalt-dev -it minerl-basalt-dev
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

