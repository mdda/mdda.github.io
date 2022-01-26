---
date: 2021-10-10
title: Using a GCP VM like a 'local' Deep Learning machine
category: OSS
tags:
- tensorflow
- pytorch
- cloud
- jupyter
- gcp
- deeplearning
layout: post
published: true
---
{% include JB/setup %}

### Using a GCP VM like a 'local' Deep Learning machine
####  Everything from CLI

This is a short-but-complete guide to setting up not just Jupyter, 
but a whole Deep Learning environment on a Google Cloud Virtual Machine.

### Outline

These are the steps that this involves, and leaves the final machine pretty quick to start/stop:

* Create a preemptible GPU-enabled GCP machine
* Set up `ssh` so that it can be used easily
  + Include 'tunnels' that enable `jupyter` or `tensorboard` to be accessed securely _through `ssh`_
* Install software on the GCP machine:
  + the Nvidia drivers with `cuda`
  + frameworks like `tensorflow` and `pytorch` that match the `cuda` version
  + other 'essentials' like `jupyter`
* Run things like `jupyter` 
  + As a test
  + In a `screen` for longer-lived sessions
* Mount the GCP machine's files as if they were local
  + This allows us to use an IDE seamlessly

All-in-all, the below enables us to use GCP as a replacement for a local Deep Learning machine - 
and this may be:

* a better economic choice (given current GPU pricing, plus the cost of electricity where you live)
* more convenient/reliable than Colab 

... for more serious Deep Learning development.


### Create a suitable Google Cloud VM

( To see how to do this for a machine that will also auto-launch services and servers, see my
[Building a reusable Deep Learning VM on Google Cloud](/oss/2021/10/05/gcp-deep-learning-machine-everything) post.
The two posts are 'compatible', and can be combined into one production + experimentation machine. ).

{% highlight bash %}
export PROJECT_NAME="my-special-project"
gcloud config set project ${PROJECT_NAME}
export INSTANCE_NAME="deep-learning-vm1"
{% endhighlight %}


And then run this to actually create the instance:

{% highlight bash %}
export ZONE="asia-southeast1-b"  # This is good for where I am located (Singapore)
export GCP_USER=`whoami`

gcloud beta compute --project=${PROJECT_NAME} instances create ${INSTANCE_NAME} \
  --zone=${ZONE} \
  --machine-type=n1-standard-8 \
  --subnet=default --network-tier=PREMIUM \
  --no-restart-on-failure --maintenance-policy=TERMINATE \
  --preemptible \
  --accelerator=type=nvidia-tesla-t4,count=1 \
  --image=ubuntu-2004-focal-v20210623 --image-project=ubuntu-os-cloud \
  --boot-disk-size=50GB --boot-disk-type=pd-balanced --boot-disk-device-name=${INSTANCE_NAME} \
  --no-shielded-secure-boot --shielded-vtpm --shielded-integrity-monitoring --reservation-affinity=any \
  --metadata=startup-script="#! /bin/bash
      su --login --command=/home/${GCP_USER}/3-on-start.bash ${GCP_USER}"
{% endhighlight %}

NB: The `./3-on-start.bash` bit adds some extensibility for auto-running processes later. 
There's no need to have a script actually at that location if it's not required.


FWIW, from the GCP VM pricing estimate 
(though the numbers below are only when it's switched ON, apart from the persistent disk) is : 

{% highlight bash %}
$154.71 monthly estimate - That's about $0.212 hourly
  8 vCPUs + 30 GB memory          $68.91/month
  1 NVIDIA Tesla T4 GPU           $80.30/month
  50 GB balanced persistent disk   $5.50/month
{% endhighlight %}

The `--accelerator=type=nvidia-tesla-t4,count=1` choice is clearly one that depends on your
requirements - at the `T4` level, it just makes the instance like 
a more reliable [colab](https://colab.research.google.com/), 
but with the option for `tensorboard`, persistence and local disk mounting (to give some key advantages).

The `--machine-type=N1-standard-8` choice may be a bit of an overkill for a Deep Learning instance, 
though (compared to scaling up the GPU side) it's relatively low incremental cost for 
the additional room / cores provided.




### Important Commands

Important command pallete (for quick reference).  
Execute these on your local machine, once the `gcloud config set project ${PROJECT_NAME}` and `INSTANCE_NAME` things are set as above:

{% highlight bash %}
# Start the instance
gcloud compute instances start ${INSTANCE_NAME}

# stop the instance :: REMEMBER TO DO THIS WHEN YOU'RE DONE FOR THE DAY...
gcloud compute instances stop ${INSTANCE_NAME}

{% endhighlight %}


### Configure `ssh` so we can make some tunnels...

In order to get `sshfs` running, we need to get `ssh` running more seamlessly.  On the local machine, 
use the following (this has to be done while the VM is running):

* See the [GCP documentation](https://cloud.google.com/sdk/gcloud/reference/compute/config-ssh) for reference:

{% highlight bash %}
gcloud compute config-ssh

# You should now be able to use ssh/scp with your instances.
# For example, try running:
# $ ssh deep-learning-vm1.asia-southeast1-b.my-special-project
{% endhighlight %}

This adds a `Host deep-learning-vm1.asia-southeast1-b.my-special-project` section to `~/.ssh/config`.

Let's store the required address into a variable:

{% highlight bash %}
# Sadly, these don't provide suitably formatted data...
#gcloud compute instances list --filter="name=${INSTANCE_NAME}"
#gcloud compute instances describe ${INSTANCE_NAME}

GCP_ADDR=`grep "Host ${INSTANCE_NAME}" ~/.ssh/config | tail --bytes=+6`
echo ${GCP_ADDR}
# deep-learning-vm1.asia-southeast1-b.my-special-project
{% endhighlight %}

Not only does this allow 'real' `ssh` access (rather than `gcloud compute ssh ${INSTANCE_NAME}` which is a wrapper), but
by enabling direct system usage, we get `rsync` and `sshfs` compatibility for free.


### Set up an `ssh` tunnel on the local machine

Having captured the right GCP hostname, we can now set up an `ssh` session, 
including a number of 'tunnels' that allow us to use the machine _as if it were local to us_.

On the local machine, use the following to tunnel ports (like the one we're using for `jupyter`) through `ssh`:

* See the [GCP documentation](https://cloud.google.com/community/tutorials/ssh-tunnel-on-gce), 
or [more general ssh posts](https://til.hashrocket.com/posts/xjdjzsrgui-forward-multiple-ports-over-ssh)
and [the ssh documentation](https://linux.die.net/man/1/ssh) for reference:

{% highlight bash %}
## No need for these : We've got ssh set up properly...
#gcloud compute ssh  -- -N -p 8585 -D localhost:8585
#gcloud compute ssh  -- -N -L 8585:localhost:8585 -L 8586:localhost:8586 # ... etc

ssh ${GCP_ADDR} -L 8585:localhost:8585 -L 8586:localhost:8586 # ... etc
{% endhighlight %}

Included above is the `8585` port for `jupyter`, and an extra `8586` one for `tensorboard` (by way of example).


### Install Nvidia drivers and `cuda`

Use `ssh ${GCP_ADDR}` to get into the GCP machine, and run :

{% highlight bash %}
sudo apt install linux-headers-$(uname -r)
#linux-headers-5.8.0-1035-gcp is already the newest version (5.8.0-1035.37~20.04.1).

curl -O https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-ubuntu2004.pin
sudo mv cuda-ubuntu2004.pin /etc/apt/preferences.d/cuda-repository-pin-600
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/7fa2af80.pub
# gpg: key F60F4B3D7FA2AF80: public key "cudatools <cudatools@nvidia.com>" imported
sudo add-apt-repository "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/ /"
sudo apt update
sudo apt -y install cuda
# This step takes ~16mins
#   and installs a whole heap of wierd stuff...  (fonts, etc)

# The output states that machine needs a reboot... (though it seems to be properly installed already)

sudo nvidia-smi
# | NVIDIA-SMI 470.42.01    Driver Version: 470.42.01    CUDA Version: 11.4     |
# |   0  Tesla T4            Off  | 00000000:00:04.0 Off |                    0 |
# | N/A   76C    P0    34W /  70W |      0MiB / 15109MiB |      0%      Default |
{% endhighlight %}

NB: Since the hard disk we've chosen is Persistent, all of this installation only needs to be done once.


### Create a local `venv` for python

This is good `python` hygiene :

{% highlight bash %}
sudo apt install -y python3.8-venv
python3.8 -m venv env38 

. env38/bin/activate

pip install --upgrade pip

{% endhighlight %}


### Install Deep Learning frameworks

Once you have a `venv` installed (assumed to be named as above):

{% highlight bash %}
. env38/bin/activate

pip install tensorflow tensorboard

# Agrees with the CUDA version installed above:
pip install torch==1.9.0+cu111 torchvision==0.10.0+cu111 torchaudio==0.9.0 -f https://download.pytorch.org/whl/torch_stable.html

# An example of a pytorch module with specific CUDA code included:
#pip install pytorch3d -f https://dl.fbaipublicfiles.com/pytorch3d/packaging/wheels/py38_cu111_pyt190/download.html
{% endhighlight %}


### Install `jupyter`, etc

Once you have a `venv` installed (assumed to be named as above):

*  See the [Jupyter Docs](https://jupyter-notebook.readthedocs.io/en/stable/public_server.html#running-a-public-notebook-server) for reference:

{% highlight bash %}
. env38/bin/activate

pip install jupyter
jupyter notebook --generate-config
#  `/home/USERNAME/.jupyter/jupyter_notebook_config.py`
{% endhighlight %}


#### Update the `jupyter` defaults

Add default configuration to `~/.jupyter/jupyter_notebook_config.py`:

{% highlight bash %}
USER=`whoami` && echo "
c.NotebookApp.ip = 'localhost'
c.NotebookApp.open_browser = False
c.NotebookApp.port = 8585
c.NotebookApp.notebook_dir = '.'
c.NotebookApp.token=''
c.NotebookApp.password=''
   " >> /home/${USER}/.jupyter/jupyter_notebook_config.py
{% endhighlight %}

>    NB: This is _very unsafe_ *if* you open port 8585 to the internet 
>    (here it is set to bind to `localhost`, rather than '*', as a precaution)! .
>    But we're not going to do that: 
>    We're only going to access it via an ssh tunnel to the server's port 8585.  And 
>    that's all secure within what is essentially our own little VPN.


#### Launch Jupyter on the server

Since we've set up the default `notebook-dir` and other command-line options in the configuration, 
`jupyter` should work from whereever you launch it:

{% highlight bash %}
. env38/bin/activate

jupyter notebook
{% endhighlight %}


#### Launch Jupyter in the browser

Now you can get to the running instance : 

* Browse to `http://localhost:8585/` 
  + There's no need for a token, or a key, since the `ssh` tunnel makes this entirely private
    - i.e. nothing has been exposed for public internet access

This was a proof-of-concept.  We can deal with `tensorboard` (and any other services you want to run) in the same way.


### Launch Multiple services in the backend

We can use `screen` to run several different services on the server via this one `ssh` session 
(you will probably want to update the paths).  

The following can be run on the GCP server using the `ssh` session created above :

{% highlight bash %}
NL="$(printf \\r)"
ACTIVATE_ENV=". ~/env38/bin/activate"

# this changes the the right base directory
pushd ./

SCREEN=jupyter
screen -dmS $SCREEN
screen -S $SCREEN -p 0 -X stuff "${ACTIVATE_ENV}${NL}"
#screen -S $SCREEN -p 0 -X stuff "cd ../whereever${NL}"
screen -S $SCREEN -p 0 -X stuff "jupyter notebook${NL}"

SCREEN=tensorboard
screen -dmS $SCREEN
screen -S $SCREEN -p 0 -X stuff "${ACTIVATE_ENV}${NL}"
#screen -S $SCREEN -p 0 -X stuff "cd ../whereever${NL}"
screen -S $SCREEN -p 0 -X stuff "tensorboard serve --port=8586 --logdir=./lightning_logs${NL}"

popd 
{% endhighlight %}

You can also make the above into a script so that it's easy to run...

This should enable:
*   `http://localhost:8585` for `jupyter`
*   `http://localhost:8586` for `tensorboard`


### Use `sshfs` to remotely access the VM filesystem
#### ... so that it appears to be local storage

<!--

* [Digital Ocean's notes](https://www.digitalocean.com/community/tutorials/how-to-use-sshfs-to-mount-remote-file-systems-over-ssh)
* [A helpful gist for root sshfs](https://gist.github.com/mollymerp/26ef43f8f72577e7133c95f9c9f893c8)
  + [And fixing some warnings](https://stackabuse.com/how-to-fix-warning-remote-host-identification-has-changed-on-mac-and-linux/)

* [`sshfs` as a non-root user](https://askubuntu.com/questions/1046816/how-to-umount-non-sudo-sshfs-created-directory)
!-->

First, ensure that you have the `fuse` filesystem `sshfs` installed on your local machine:

* [Fedora details](https://www.redhat.com/sysadmin/sshfs)
  +  Fedora local installation requires `dnf install fuse-sshfs`


The following mounts the GCP home directory on `gcp_base` locally - of course
the remote path (and name of the local mount point) are totally up to you:
  
{% highlight bash %}
mkdir -p gcp_base

sshfs ${GCP_ADDR}:. gcp_base -o reconnect
{% endhighlight %}


Once finished :

{% highlight bash %}
fusermount -u ./gcp_base
{% endhighlight %}

Note that if you have files open within the mount point, `fusermount` will refuse to unmount 
the directory.  This can also be caused by anything that might `watch` within the directory too (e.g.
a source control manager looking for changed files, or a web server auto-refresh).  Just stop these
things running locally,
and `fusermount` will then dismount properly 
(you may have to find out which process has open files within the mountpoint using `lsof ./gcp`).


### Normal Operation!

Open two tabs locally, and in each, run :

{% highlight bash %}
export PROJECT_NAME="my-special-project"
gcloud config set project ${PROJECT_NAME}
export INSTANCE_NAME="deep-learning-vm1"
export GCP_ADDR=`grep "Host ${INSTANCE_NAME}" ~/.ssh/config | tail --bytes=+6`
echo ${GCP_ADDR}  # Just to check that it's found
{% endhighlight %}


#### Tab 1

This tab will run the server side of the interface:

{% highlight bash %}
gcloud compute instances start ${INSTANCE_NAME}
gcloud compute config-ssh
ssh ${GCP_ADDR} -L 8585:localhost:8585 -L 8586:localhost:8586 # ... etc

# Inside the `ssh` session, run the 'screen script' above
#   And leave the ssh session running ...
#     (even if you don't need the terminal, you may want the tunnels open)
{% endhighlight %}


#### Tab 2

This tab will run the local side of the interface:

{% highlight bash %}
sshfs ${GCP_ADDR}:. gcp_base -o reconnect
{% endhighlight %}

Load editors, etc, to operate on these files 'locally'.



### Terminate the GCP VM when done...

{% highlight bash %}
# if needed:
fusermount -u ./gcp_base

gcloud compute instances stop ${INSTANCE_NAME}
{% endhighlight %}


### End

All done!


### Footnote

The above process for 'GCP machine as local GPU' works so well 
that I recently sold my local GPU (Nvidia Titan X 12Gb, Maxwell), 
and migrated onto GCP for 'real-time' development.  One benefit 
(apart from all-in cost) has also been the ability 
to seamlessly upgrade to a larger GPU set-up once the code works, 
without having to make an infrastructure changes 
(i.e. disk can be brought up on a larger machine near instantly).  

I should also give a shout-out to Google for helping this process 
by generously providing Cloud Credits to help get this all implemented.




