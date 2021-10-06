---
date: 2021-10-05
title: Building a reusable Deep Learning VM on Google Cloud
category: OSS
tags:
- tensorflow
- pytorch
- nvidia
- cloud
- gcp
- deeplearning
layout: post
published: true
---
{% include JB/setup %}

### Building a Deep Learning instance on GCP
####  Everything from CLI

This is a complete guide to setting up a usable/practical Deep Learning virtual machine on GCP.  

I started out by attempting to use the (very attractive-looking) [Deep Learning VM images](https://cloud.google.com/deep-learning-vm) from Google.
However, these had several problems:

*  Older version of Python
*  Rather bloated install
*  ... and the whole experience seemed to be spiraling away from what I was actually looking for.

The following details my approach for satisfying the following goals:

*  Command-line creation/building of the VM (specifically a preemptible one with GPU)
*  Reproducible scripting, so that subsequent restarts would reboot nicely
*  Ability to make changes on a local machine that would get incorporated into the build
   + But avoiding uploading unnecessary code, assets or credentials 
   
Here goes... (if you want to see what the overall build/boot process looks like, skip forward to the "The Overall Scheme" section below)



### Create a local working directory

This is so that images of software, etc, can be transported up 'whole' : I 
didn't want to give credentials to in-house repos explicitly to the GCP machine (paranoia, I know).

{% highlight bash %}
mkdir ./gcp
cd gcp  # This is our base for all the following
{% endhighlight %}

We'll create a folder in here (called `../gcp/repobase` in the scripts) that gets 
built out locally, and then zipped up into `../gcp/upload.tar.gz` so that it can be 
sent up to the server in one copy operation.


### Create the start-up script

Here's the kind of script that's needed to be run by the GCP machine when it's started.
Because it stores an "`~/INSTALLATION_DONE`" flag, this will avoid doing extra work when you
come to restart the server (after, for instance, it gets preempted or you stop the machine).

After doing the `sudo apt install` stuff (needed just once), the installation script
also builds a `venv` python virtual environment, rather than pollute the whole VM.
This also needs only to be done once, and as more packages are needed, 
you can add them to this script (so that when building another machine they get run on first start-up).

I've avoided including references to any `requirements.txt` files, since these 
tend to be less well maintained / too restrictive for active development (which is usually using
current package versions).

Call this script `../gcp/3-on-start.bash` :

{% highlight bash %}
#! /bin/bash  
# ^ works on ubuntu & Fedora

INSTALLATION_DONE=~/INSTALLATION_DONE
if [ ! -f ${INSTALLATION_DONE} ]; then

# ON FIRST STARTUP
echo "Doing FIRST start-up"
date

# Ref: https://cloud.google.com/compute/docs/gpus/install-drivers-gpu#ubuntu-driver-steps
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

date

sudo apt install -y python3.8-venv
python3.8 -m venv env38 

. env38/bin/activate

pip install --upgrade pip
pip install torch==1.9.0 torchvision==0.10.0 torchaudio==0.9.0

date

#python
#Python 3.8.10 (default, Jun  2 2021, 10:49:15) 
#[GCC 9.4.0] on linux
#Type "help", "copyright", "credits" or "license" for more information.
#>>> import torch
#>>> torch.cuda.is_available()
#True
#>>> quit()

# To understand configuration overall
pip install 'OmegaConf>=2.1.0'

date

# Other one-time installation stuff
#  Add here vvv

pip install spacy==3.0.6
pip install --upgrade google-cloud-speech


# Helpful for debugging `screen`
echo "defscrollback 10240" >> ~/.screenrc

touch ${INSTALLATION_DONE}

fi # This is the last line of the initial machine build


echo "Doing REGULAR start-up"
# ON EACH STARTUP (i.e. this is what will run every time VM is launched, after creation run)

date

# eg: Copy stuff to a RAMdisk for access speed...

date

# ON EACH UPDATE OF THE upload.tar.gz

# Unpack the upload
# gcloud compute scp upload.tar.gz ${INSTANCE_NAME}:~
tar -xzf upload.tar.gz
cp repobase/some-longish-path/gcp/* .


# Run even more stuff
./4-next-steps.bash 
{% endhighlight %}


You will be able to check the results of running this start-up script by doing (within the running instance, when we've got it ready) :

{% highlight bash %}
# Check results of startup script :
sudo journalctl -u google-startup-scripts.service
{% endhighlight %}


### Create an 'asset gatherer'

The purpose of this is to gather up the assets from your project 
that are required for the VM to serve whatever it's going to serve.

Let's call this `../gcp/2-gather-assets.bash` 
(there is also a `../gcp/1-gather-bulk-assets.bash`, but it follows a very similar pattern, but is only used once, 
since those assets are static, compared to the code+model assets that are added below).

{% highlight bash %}
#! /usr/bin/bash
set -e
# Any subsequent(*) commands which fail will cause the shell script to exit immediately

# This is the base directory of my local company...
SRC_BASE=`pwd`/../../../repobase

if [ ! -d "$SRC_BASE" ]; then
  echo "Need to run this from within the ./gcp directory itself"
  exit 0
fi

# This is the base directory of the gathered assets
DST_BASE=./repobase
mkdir -p ${DST_BASE}

# Normal base paths (set relative to the 'total base' paths above)
#   For instance, suppose 'XYZ' is a repo belonging to my company
SRC=${SRC_BASE}/XYZ
DST=${DST_BASE}/XYZ

function rsync_file {
  local FIL=$1
  mkdir -p ${DST}/${PTH}
  echo -e "\ncopy : ${FIL}"
  rsync -az --itemize-changes ${SRC}/${PTH}/${FIL} ${DST}/${PTH}/
}

function rsync_path {
  local PTH_LOCAL=$1
  local PTH_DIR=`dirname ${PTH_LOCAL}`
  mkdir -p ${DST}/${PTH_DIR}
  echo -en "\nsync : ${PTH_DIR}\t\t"
  rsync -avz --exclude '__pycache__' --exclude '.git' ${SRC}/${PTH_LOCAL} ${DST}/${PTH_DIR}/
}

# This copies over the whole configurations directory 'XYZ/config'
rsync_path config

# This copies over individual files (specifically the on-start one from above)
PTH=some-longish-path/gcp
rsync_file 3-on-start.bash

# ... lots more paths and files in here ...

# Gather everything up into a single upload
tar -czf upload.tar.gz ${DST_BASE}  # Takes 10secs or so

{% endhighlight %}

So this will leave us with an `upload.tar.gz` in our `./gcp` directory, which 
we can upload whenever the GCP machine is ON, 
and simply `tar -xzf upload.tar.gz` on the GCP machine to get new code updates, etc, installed :

{% highlight bash %}
# On the local machine:
gcloud compute scp upload.tar.gz ${INSTANCE_NAME}:~
{% endhighlight %}

And in a separate tab on the local machine (for convenience):

{% highlight bash %}
gcloud compute ssh ${INSTANCE_NAME}
# On the cloud machine:
tar -xzf upload.tar.gz
# Update the home-directory files too
cp repobase/some-longish-path/gcp/* .
{% endhighlight %}



### Now Create a Compute Instance

The following (long) command creates a new VM.  You'll need to choose the zone appropriately (make sure you have GPU 
quota available!).  Of course, your project name will be different (as may be some of the choices of GPU, etc).

The key points to note below are:

*  Includes a preemptible Tesla T4
*  Chooses a recent Ubuntu VM image which has Python `3.8.10`
*  Includes a decent-sized boot disk (50Gb) 
*  Points to an 'on-start' script that we can update easily

NB: It would be a good idea to create the startup-script, and the assets `.tar.gz` ahead of time, 
at least in prototype form (as above).  
OTOH, doing these steps out-of-order shouldn't be a deal-breaker, 
since the process is designed to be run/re-run as required.

These commands are run locally to fix the project/instance we're focussed on:

{% highlight bash %}
export PROJECT_NAME="my-special-project"
gcloud config set project ${PROJECT_NAME}
export INSTANCE_NAME="deep-learning-vm1"
{% endhighlight %}

And then run these to actually create the instance

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


### The Overall Scheme

NB: The first time this is run, there won't be a startup-script present.  So the sequence is:

* Run the `gcloud compute instances create` command (above)
  + The new machine starts up (can check this on the GCP 'console' panel)
  + Do `gcloud compute scp upload.tar.gz ${INSTANCE_NAME}:~`, which puts the `upload.tar.gz` file onto the host
  + `gcloud compute ssh` into the running instance to check it's really there
  + And expand out the files from the upload (on the GCP machine):
    - `tar -xzf upload.tar.gz`
    - `cp ./repobase/some-longish-path/gcp/* .`
* Restart the GCP machine
  + This should now run the `~/3-on-start.bash` file for the first time
    - installs the Nvidia drivers (takes 15-20mins)
    - sets up `~/env38` etc
  + You can monitor this start-up process using `sudo journalctl -uf google-startup-scripts.service` on the GCP machine
  + Once it's complete, a `~/INSTALLATION_DONE` file will appear in your home directory
* Now the GCP machine can be started/stopped relatively easily
  + You can chain additional start-up scripts at the end of this file
    - For instance in `./4-next-steps.bash` ...



### End

All done!



<!--

Next posts :

`get_config.py` for BASH to get access to `omegaconf`

Enabling multiple people to start/stop instances

Using `screen` as a poor-persons `systemctl` processes

!-->
