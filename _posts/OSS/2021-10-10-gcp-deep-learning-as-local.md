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
published: false
---
{% include JB/setup %}

### Using a GCP VM like a 'local' Deep Learning machine
####  Everything from CLI

This is a short-but-complete guide to setting up not just Jupyter, 
but a whole Deep Learning environment on a Google Cloud Virtual Machine.

The Jupyter set-up below is scriptable.

### Create a suitable Google Cloud VM

( To see how to do this for a machine that will also auto-launch services and servers, see my
[Building a reusable Deep Learning VM on Google Cloud](/oss/2021/10/05/gcp-deep-learning-machine-everything) post ).

{% highlight bash %}
export PROJECT_NAME="my-special-project"
gcloud config set project ${PROJECT_NAME}
export INSTANCE_NAME="deep-learning-vm1"
{% endhighlight %}


And then run these to actually create the instance:

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

The `N1-standard-8` choice may be a bit of an overkill for a Deep Learning instance, 
though (compared to scaling up the GPU side) it's relatively low incremental cost for 
the additional room / cores provided (particularly, since in production, as much of the 
compute will be moved to CPUs as possible).


### Important Commands

Important command pallete (for quick reference).  
Execute these on your local machine, once the `gcloud config set project ${PROJECT_NAME}` and `INSTANCE_NAME` things are set as above:

{% highlight bash %}
# Start the instance
gcloud compute instances start ${INSTANCE_NAME}

# copy to the instance
gcloud compute scp upload.tar.gz ${INSTANCE_NAME}:~

# ssh into the instance
gcloud compute ssh ${INSTANCE_NAME}

# stop the instance :: REMEMBER TO DO THIS WHEN YOU'RE DONE FOR THE DAY...
gcloud compute instances stop ${INSTANCE_NAME}

{% endhighlight %}


### Install Nvidia drivers and `cuda`

`ssh` into the GCP machine, and run :

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

This is good `python` hygene :

{% highlight bash %}
sudo apt install -y python3.8-venv
python3.8 -m venv env38 

. env38/bin/activate

pip install --upgrade pip

{% endhighlight %}


### Install Deep Learning frameworks

{% highlight bash %}
pip install tensorflow tensorboard

# Agrees with the CUDA version installed above:
pip install torch==1.9.0+cu111 torchvision==0.10.0+cu111 torchaudio==0.9.0 -f https://download.pytorch.org/whl/torch_stable.html

# An example of a pytorch module with specific CUDA code included:
#pip install pytorch3d -f https://dl.fbaipublicfiles.com/pytorch3d/packaging/wheels/py38_cu111_pyt190/download.html
{% endhighlight %}


### Install `jupyter`, etc

Once you have a `venv` installed (assumed to be named as above).

*  See the [Jupyter Docs](https://jupyter-notebook.readthedocs.io/en/stable/public_server.html#running-a-public-notebook-server) for reference:

{% highlight bash %}
. env38/bin/activate

pip install jupyter
jupyter notebook --generate-config
#  `/home/USERNAME/.jupyter/jupyter_notebook_config.py`
{% endhighlight %}


#### Update the `jupyter` defaults

Add default configuration to `~/.jupyter/jupyter_notebook_config.py` :

{% highlight bash %}
USER=`whoami` && echo "
#c.NotebookApp.ip = '*'
c.NotebookApp.open_browser = False
c.NotebookApp.port = 8585
c.NotebookApp.notebook_dir = '.'
   " >> /home/${USER}/.jupyter/jupyter_notebook_config.py
{% endhighlight %}
  

### Launch Jupyter on the server

Since we've set up the default `notebook-dir` and other command-line options in the configuration, 
`jupyter` should work from whereever you launch it:

{% highlight bash %}
. env38/bin/activate

jupyter notebook
{% endhighlight %}

This will (until you _optionally_ add a password using the Jupyter browser GUI) give you
something like : `token=437abd35ddXXXXd9579f5bd6bc16596acYYYYe180b60e3e9` 
that you should 'grab' somehow (to paste into the browser later).


### Set up an `ssh` tunnel on the local machine

On the local machine, use the following to tunnel ports (like the one we're using for `jupyter`) through `ssh`:

* See the [GCP documentation](https://cloud.google.com/community/tutorials/ssh-tunnel-on-gce), 
or [more general ssh posts](https://til.hashrocket.com/posts/xjdjzsrgui-forward-multiple-ports-over-ssh)
and [the ssh documentation](https://linux.die.net/man/1/ssh) for reference:

{% highlight bash %}
#gcloud compute ssh  -- -N -p 8585 -D localhost:8585
gcloud compute ssh  -- -N -L 8585:localhost:8585 -L 8586:localhost:8586 # ... etc
{% endhighlight %}

Included above is the `8585` port for `jupyter`, and an extra `8586` one for `tensorboard` (by way of example).


### Launch Jupyter in the browser

Now you can get to the running instance : 

* Browse to `http://localhost:8585/` 
  + There's no need for a token, or a key, since the `ssh` tunnel makes this entirely private
    - i.e. nothing has been exposed for public internet access

This was a proof-of-concept.  We can deal with `tensorboard` (and any other services you want to run) in the same way.



### Configure `ssh` so we can `sshfs`

In order to get `sshfs` running, we need to get `ssh` running more seamlessly.  On the local machine, 
use the following (this has to be done while the VM is running):

* See the [GCP documentation](https://cloud.google.com/sdk/gcloud/reference/compute/config-ssh) for reference:

{% highlight bash %}
gcloud compute config-ssh
{% endhighlight %}


### Use `sshfs` to remotely access the VM filesystem
#### as if it was a local one

...



### Terminate the GCP VM when done...

{% highlight bash %}
gcloud compute instances stop ${INSTANCE_NAME}
{% endhighlight %}


### End

All done!



