---
date: 2022-09-02
title: GCP VM with Nvidia set-up and Convenience Scripts
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

### GCP VM with Nvidia set-up and Convenience Scripts
####  Everything from CLI

This is a short-but-complete guide to setting up a Google Cloud Virtual Machine
with Nvidia drivers and `cuda` installed.


### Outline

These are the steps that this involves, and leaves the final machine pretty quick to start/stop:

* Create a preemptible GPU-enabled GCP machine
* Set up `ssh` so that it can be used easily
  + Include 'tunnels' that enable ports for `jupyter` or `tensorboard` to be accessed securely through plain `ssh`
  + With scripts to enable fast start/stop and mount/unmount of the VM
* Install software on the GCP machine:
  + the Nvidia drivers with `cuda`
* The Deep Learning tools can be set up in a virtual enviroment as usual
  + Please see [my other post](/oss/2021/10/10/gcp-deep-learning-as-local) to see the details

All-in-all, the below enables us to use GCP as a good test-bed for projects for 
Deep Learning - while keeping expenses under control!


### Create a suitable Google Cloud VM

This setup includes the more recent `2022-04` release of Ubuntu :

{% highlight bash %}
export PROJECT_NAME="my-special-project"
gcloud config set project ${PROJECT_NAME}
export INSTANCE_NAME="minerl-vm-host"
{% endhighlight %}


And then run this to actually create the instance:

{% highlight bash %}
export ZONE="asia-southeast1-b"  # This is good for where I am located (Singapore)
export GCP_USER=`whoami`

gcloud compute --project=${PROJECT_NAME} instances create ${INSTANCE_NAME} \
  --zone=${ZONE} \
  --machine-type=n1-standard-8 \
  --subnet=default --network-tier=PREMIUM \
  --no-restart-on-failure --maintenance-policy=TERMINATE \
  --preemptible \
  --accelerator=type=nvidia-tesla-t4,count=1 \
  --image=ubuntu-2204-jammy-v20220902 --image-project=ubuntu-os-cloud \
  --boot-disk-size=50GB --boot-disk-type=pd-standard --boot-disk-device-name=${INSTANCE_NAME} \
  --no-shielded-secure-boot --shielded-vtpm --shielded-integrity-monitoring --reservation-affinity=any \
  --metadata=startup-script="#! /bin/bash
      su --login --command=/home/${GCP_USER}/3-on-start.bash ${GCP_USER}"
{% endhighlight %}

This complains about Disk <200Gb, but finally declares ...
>   NAME            ZONE               MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP    STATUS
>   minerl-vm-host  asia-southeast1-b  n1-standard-8  true         10.148.0.8   34.XX.XX.XX    RUNNING
  

NB: The `./3-on-start.bash` bit adds some extensibility for auto-running processes later - and we'll use
it to check whether the instance is ready for `ssh`, so we'll put something there just below.


FWIW, from the GCP VM pricing estimate 
(though the numbers below are only when it's switched ON, apart from the persistent disk) is : 

{% highlight bash %}
$154.71 monthly estimate - That's about $0.212 hourly (Spot/Preemptible pricing)
  8 vCPUs + 30 GB memory          $68.91/month  ($0.0944/hr)
  1 NVIDIA Tesla T4 GPU           $80.30/month  ($0.11/hr)
  50 GB standard persistent disk   $5.50/month  
{% endhighlight %}

>  So : for US 22 cents an hour, we have an 8 core machine with 30GB of RAM, and a 16Gb GPU.  Pretty Nice!

The `--accelerator=type=nvidia-tesla-t4,count=1` choice is clearly one that depends on your
requirements - at the `T4` level, it just makes the instance like 
a more reliable [colab](https://colab.research.google.com/), 
but with the option for `tensorboard`, persistence and local disk mounting (to give some key advantages).

The `--machine-type=N1-standard-8` choice may be a bit of an overkill for a Deep Learning instance, 
though (compared to scaling up the GPU side) it's relatively low incremental cost for 
the additional room / cores provided.


Now, log into the instance and create an empty `3-on-start.bash` file:

{% highlight bash %}
gcloud compute instances start ${INSTANCE_NAME}  # if it's not already running
gcloud compute instances ssh ${INSTANCE_NAME}

# Now as a regular user on the new GCP machine:
touch 3-on-start.bash
chmod 755 3-on-start.bash 
exit

# And tidy up
gcloud compute instances stop ${INSTANCE_NAME}  # Stop the billing ASAP
{% endhighlight %}



### Scripting the instance

In a [previous blog post](/oss/2021/10/10/gcp-deep-learning-as-local), I've given some important CLI commands to bring up the
instance manually, but this is the version I've added some scripted versions to my `~/.bashrc` which simplifies life.

Once the `~/.bashrc` (the new stuff is given below) executes, you can then start development sessions with :

{% highlight bash %}
gcp_start  # Can also add an optional instance_name to these
gcp_mount_and_edit
{% endhighlight %}

Note that I have a standard location from where I launch the instance, which includes a folder called `./gcp_base`
so that the main user directory of the GCP machine gets mounted there, and I can then edit files on the VM
as if they were just local files (i.e. any local editor will work directly).

And then do the following when finished :

{% highlight bash %}
gcp_umount
gcp_stop
{% endhighlight %}


Code to put in your `~/.bashrc`:

{% highlight bash %}
# Yikes : Python 3.10 is too advanced for Google Cloud SDK
export CLOUDSDK_PYTHON=python2
export GCP_SERVER_DEFAULT='mdda-jupyter'

# https://linuxize.com/post/how-to-create-bash-aliases/
function gcp_start {
  export INSTANCE_NAME="${1:-$GCP_SERVER_DEFAULT}"
  echo "Starting : ${INSTANCE_NAME}"
  gcloud compute instances start ${INSTANCE_NAME}
  gcloud compute config-ssh
  export GCP_ADDR=`grep "Host ${INSTANCE_NAME}" ~/.ssh/config | tail --bytes=+6`
  # See : https://medium.com/google-cloud/few-tips-and-tricks-with-gce-startup-script-323433e2b5ee
  status=""
  while [[ -z "$status" ]];
  do
    sleep 3;
    echo -n "."
    status=$(ssh ${GCP_ADDR} 'grep -m 1 "startup-script exit status" /var/log/syslog' 2>&-)
  done
  echo ""
  ssh ${GCP_ADDR} -L 8585:localhost:8585 -L 8586:localhost:8586 -L 5005:localhost:5005 # ... etc
}

function gcp_stop {
  export INSTANCE_NAME="${1:-$GCP_SERVER_DEFAULT}"
  echo "Stopping : ${INSTANCE_NAME}"
  gcloud compute instances stop ${INSTANCE_NAME}
}

function gcp_mount_and_edit {
  export INSTANCE_NAME="${1:-$GCP_SERVER_DEFAULT}"
  echo "Mounting : ${INSTANCE_NAME}"
  export GCP_ADDR=`grep "Host ${INSTANCE_NAME}" ~/.ssh/config | tail --bytes=+6`
  sshfs ${GCP_ADDR}:. ./gcp_base -o reconnect -o follow_symlinks
  pushd ./gcp_base/reddragon/faces && geany -i && popd &
}

function gcp_umount {
  echo "UnMounting all"
  fusermount -u ./gcp_base
}
{% endhighlight %}

Looking through the code above, hopefully you can see :

* There's a `GCP_SERVER_DEFAULT` setting for the `INSTANCE_NAME`
  + This can be overridden on the command line
* The start script : 
  + Waits for the VM to be fully ready (printing a dot each time - normally 5 dots get printed);
  + Sets up `GCP_ADDR` as a convenience variable;
  + Performs an `ssh` into the machine that includes port-forwarding for `8585`, `8586` and `5005` 
    - just some useful ports (for instance for `jupyter`, `tensorboard`, `FastAPI` to be present on)
* The mount script :
  + Mounts the user directory onto `./gcp_base` locally (as mentioned above)
    - so that you can edit, or view/copy files, using purely local development tools
* The stop and umount scripts are self-explanatory




### Install Nvidia drivers

Use `ssh ${GCP_ADDR}` to get into the GCP machine, and run (these instructions basically follow [those from Nvidia](https://cloud.google.com/compute/docs/gpus/install-drivers-gpu)).

The following installs the `nvidia` driver:

{% highlight bash %}
sudo apt-get update

NVIDIA_DRIVER_VERSION=$(sudo apt-cache search 'linux-modules-nvidia-[0-9]+-gcp$' | awk '{print $1}' | sort | tail -n 1 | head -n 1 | awk -F"-" '{print $4}')
echo ${NVIDIA_DRIVER_VERSION}
#515

sudo apt install linux-modules-nvidia-${NVIDIA_DRIVER_VERSION}-gcp nvidia-driver-${NVIDIA_DRIVER_VERSION}
# ~450Mb of new stuff to install...
"""
Scanning processes...                                                                                                                      
Scanning linux images...                                                                                                                   
Running kernel seems to be up-to-date.
No services need to be restarted.
No containers need to be restarted.
No user sessions are running outdated binaries.
No VM guests are running outdated hypervisor (qemu) binaries on this host.
"""

sudo modprobe nvidia  # load the driver... (or you can reboot the server)
nvidia-smi 
""" OUTPUT :
Sun Sep  4 18:49:09 2022       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 515.65.01    Driver Version: 515.65.01    CUDA Version: 11.7     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  Tesla T4            Off  | 00000000:00:04.0 Off |                    0 |
| N/A   72C    P8    19W /  70W |      2MiB / 15360MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
"""
{% endhighlight %}


### Install Nvidia `cuda`

The following installs the `cuda` drivers:

{% highlight bash %}
# This section is one command to copy-paste:
sudo tee /etc/apt/preferences.d/cuda-repository-pin-600 > /dev/null <<EOL
Package: nsight-compute
Pin: origin *ubuntu.com*
Pin-Priority: -1

Package: nsight-systems
Pin: origin *ubuntu.com*
Pin-Priority: -1

Package: nvidia-modprobe
Pin: release l=NVIDIA CUDA
Pin-Priority: 600

Package: nvidia-settings
Pin: release l=NVIDIA CUDA
Pin-Priority: 600

Package: *
Pin: release l=NVIDIA CUDA
Pin-Priority: 100
EOL

# And then...
sudo apt install software-properties-common

# See : https://developer.download.nvidia.com/compute/cuda/repos/
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/3bf863cc.pub
sudo add-apt-repository "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/ /"

# Somehow, the Google suggested multiline script didn't deliver the goods...
apt-cache madison cuda-drivers
#cuda-drivers | 515.65.01-1 | https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64  Packages
#cuda-drivers | 515.48.07-1 | https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64  Packages
#cuda-drivers | 515.43.04-1 | https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64  Packages

# Force in the required version...
CUDA_DRIVER_VERSION='515.65.01-1'

sudo apt install cuda-drivers-${NVIDIA_DRIVER_VERSION}=${CUDA_DRIVER_VERSION} cuda-drivers=${CUDA_DRIVER_VERSION}

CUDA_VERSION=$(apt-cache showpkg cuda-drivers | grep -o 'cuda-runtime-[0-9][0-9]-[0-9],cuda-drivers [0-9\.]*' | while read line; do
   if dpkg --compare-versions ${CUDA_DRIVER_VERSION} ge $(echo $line | grep -Eo '[[:digit:]]+\.[[:digit:]]+') ; then
       echo $(echo $line | grep -Eo '[[:digit:]]+-[[:digit:]]')
       break
   fi
done)
echo $CUDA_VERSION
# 11-7
sudo apt install cuda-${CUDA_VERSION}
# LOTS (5Gb+) more software gets installed...

sudo nvidia-smi
# See the updated cuda version at the top..

/usr/local/cuda/bin/nvcc --version
#nvcc: NVIDIA (R) Cuda compiler driver
#Copyright (c) 2005-2022 NVIDIA Corporation
#Built on Wed_Jun__8_16:49:14_PDT_2022
#Cuda compilation tools, release 11.7, V11.7.99
#Build cuda_11.7.r11.7/compiler.31442593_0
{% endhighlight %}

NB: Since the hard disk we've chosen is Persistent, all of this installation only needs to be done once.



### Install Deep Learning frameworks

See [my previous blog post](/oss/2021/10/10/gcp-deep-learning-as-local) for details.

NB: If you actually want to run the Deep Learning environment within a container, skip this 
step and head over to [my next blog post](/oss/2022/09/13/gcp-host-with-nvidia-podman).



### Terminate the GCP VM when done...

Using the scripted commands from above

{% highlight bash %}
gcp_umount
gcp_stop
# And double-check on the GCP browser UI that the machine really is stopped - just to be extra sure
{% endhighlight %}



### End

All done!


### Footnote

The above process for 'GCP machine as local GPU' works so well 
that I sold my local GPU (Nvidia Titan X 12Gb, Maxwell) at the beginning of 2022, 
and migrated onto GCP for 'real-time' development.  One benefit 
(apart from all-in cost) has also been the ability 
to seamlessly upgrade to a larger GPU set-up once the code works, 
without having to make an infrastructure changes 
(i.e. disk can be brought up on a larger machine near instantly).  


>  Shout-out to Google for helping this process by generously providing Cloud Credits to help get this all implemented!

