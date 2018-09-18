---
date: 2018-08-22
title: Google Cloud Deep Learning VM images
tagline: CLI set-up
category: OSS
tags:
- linux
- GoogleCloud
- tensorflow
- pytorch
- fedora
layout: post
published: true
---
{% include JB/setup %}

### Using the GCP VMs effectively (and cheaply)

#### Linux CLI quick guide - every line written down

All the instructions you should need are given below - unlike the 
regular Google documentation that seems to have a huge branching factor.
I wrote this because I normally find that other blog posts also don't really address how I usually set up a machine (and I don't think I'm that strange...)

That being said, the following were useful resources for putting this together: 

*  https://cloudplatform.googleblog.com/2018/06/Introducing-improved-pricing-for-Preemptible-GPUs.html
*  https://cloud.google.com/compute/docs/instances/create-start-preemptible-instance

*  https://blog.kovalevskyi.com/deep-learning-images-for-google-cloud-engine-the-definitive-guide-bc74f5fb02bc
*  https://blog.kovalevskyi.com/gce-deeplearning-images-m4-new-pytorch-with-cuda-9-2-1913dd37a7c2

*  https://medium.com/@jamsawamsa/running-a-google-cloud-gpu-for-fast-ai-for-free-5f89c707bae6

*  https://lobster1234.github.io/2017/05/14/get-started-on-google-cloud-with-cli/

|   NB: There are now [new image(s)](https://blog.kovalevskyi.com/deeplearning-images-revision-m7-chainer-4-4-0-jupyter-no-longer-using-root-39e85e6cbd12) 
|   out that may solve the Jupyter issues, but the underlying TF version, etc, don't make it compelling for me to upgrade (yet).


### Installing the Google Cloud tools

#### Installing the python-based tools in a ```virtualenv```

Actually, this doesn't work for ```gcloud```, which appears to install ```gsutils``` itself, so
the previous instructions (which worked if you just need to manage Google's Storage Buckets) don't really apply here.  

So : **Ignore the virtualenv idea for 'containing' the Google polution on your local machine** : 
You have to install packages globally (If not, please let me know in the comments below : I don't like polluting my machine with company-specific nonsense).


#### Installing the GCloud tool itself 'globally'

We need to install ```gcloud``` (which wasn't needed for just the bucket operations, but it's required for "compute engine" creation).

As ```root```, update the ```yum/dnf``` repos (my local machine is Fedora, so your process may vary on this one part) 
to include the Google Cloud SDK repo (NB: The indentation for the 2nd line of gpgkey is important) :

{% highlight bash %}
tee -a /etc/yum.repos.d/google-cloud-sdk.repo << EOM
[google-cloud-sdk]
name=Google Cloud SDK
baseurl=https://packages.cloud.google.com/yum/repos/cloud-sdk-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg
       https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOM

# Install the Cloud SDK (need to agree to 3 separate Signing Keys)
dnf install google-cloud-sdk  # Installed size 127Mb
{% endhighlight %}


Check that the installation has worked (the commands should show some status-like information) :

{% highlight bash %}
gsutil version -l
gcloud --version
{% endhighlight %}


#### Authenticate/configure Google Cloud account

This will ask you to authenticate against your Google Cloud account (and
save the token, and other settings, in ```~/.boto```):

{% highlight bash %}
gcloud auth login
{% endhighlight %}

This will have you going to a web authentication page to get the required code 
(which needs you to identify which Google account is linked to your
cloud stuff).

Then to find the project you want to associate the VMs with, either execute : 

{% highlight bash %}
gcloud projects list
{% endhighlight %}

Or go to [the project link suggested](https://cloud.google.com/console#/project)
to get the list of project ids, and select the one required :

{% highlight bash %}
gcloud config set project myprojectid
{% endhighlight %}


### Choose parameters for a base GPU-enabled VM image

We do this first with a low-cost GPU so that we have a VM image with the Nvidia drivers installed (as 
well as other software that we want in all our subsequent VMs) as cheaply as possible.  This disk can then be 
cloned, and started with a better GPU (and ~30 second creation delay).


#### Choose VM base image

Since my ideal machine has both current TensorFlow and PyTorch installed, it's best to start with 
the  ```tensorflow-gpu``` Google image since the TensorFlow has been specially compiled, etc (in a way that is
super-difficult to do yourself), whereas the PyTorch install is easier to DIY later.  

*  Actual image name : ```tf-latest-cu92```  (We'll add ```PyTorch``` to this VM later)


#### Choose VM cores and memory size

*  Choose a 13Gb RAM, 2-core machine (doesn't need to be powerful, but prefer RAM to cores) :
   * Regular is : ```n1-standard-8 	8 	30GB 	$0.3800 	$0.0800```
   * 2-core  is : ```n1-standard-2 	2 	7.5GB 	$0.0950 	$0.0200```
   * This choice is ```n1-highmem-2 	2 	13GB 	$0.1184 	$0.0250```


#### Choose GPU (initial, and final) - implies region/zone too

*  Initially, just use a ```K80``` : 
   * Starter   : ```--accelerator='type=nvidia-tesla-k80,count=1'```
   * Realistic : ```--accelerator='type=nvidia-tesla-p100,count=1'```
   * Possible  : ```--accelerator='type=nvidia-tesla-v100,count=8'```


*  Regions with K80s : 
   *  That have been allocated quota... : 
      *  asia-east1 ; asia-northeast1 ; asia-southeast1 
      *  us-central1 ; us-east1 ; us-west1
      *  europe-west1 ; europe-west3 ; europe-west4

   *  But actually existing ["GPUs for compute workloads"](https://cloud.google.com/compute/docs/gpus/) : 
      *  us-central1-{a,c} ; us-east1-{c,d} ; us-west1-{b}
      *  europe-west1-{b,d}
      *  asia-east1-{a,b}


*  Regions with P100s :
   *  That have been allocated quota... : 
      *  us-central1 ; us-east1

   *  But actually existing ["GPUs for compute workloads"](https://cloud.google.com/compute/docs/gpus/) : 
      *  us-central1-{c,f} ; us-west1-{a,b} ; us-east1-{b,c}
      *  europe-west1-{b,d} ; europe-west4-{a}
      *  asia-east1-{a,c}


*  Regions with V100s : 
   *  That have been allocated quota... : 
      *  us-central1 ; us-east1
   
   *  But actually existing ["GPUs for compute workloads"](https://cloud.google.com/compute/docs/gpus/) : 
      *  us-central1-{a,f} ; us-west1-{a,b}
      *  europe-west4-{a}
      *  asia-east1-{c}


So, despite me having got quota in a variety of places, it really comes down to having to choose ```us-central1``` (say), 
without really loving the decision...  And since we care about P100s (and K80s) : choose zone 'c'.


#### Choose VM persistent disk size

NB: Included for free in monthly usage : 
*  30 GB of Standard persistent disk storage per month.

But disk size must be as big as the image (sigh) :

``` - Invalid value for field 'resource.disks[0].initializeParams.diskSizeGb': '10'. 
   Requested disk size cannot be smaller than the image size (30 GB)```

This means that the initial base VM persistent disk has to be 30GB in size, and we can't have it *and* a ready-for-use one
just sitting around idle for free.


### Actually set up the base VM

This includes all the necessary steps (now the choices have been justified).


#### Authenticate against Google Cloud

This will (probably) request that you approve ```gcloud``` access from the current machine to your Google Cloud account : 

{% highlight bash %}
gcloud auth login
{% endhighlight %}


#### Choose the project id

(Assuming you've already set up a project via the Google Cloud 'Console' GUI) :

{% highlight bash %}
export PROJECT="rdai-tts"
gcloud config set project $PROJECT
{% endhighlight %}


#### Actually build the VM

This takes &lt; 1 minute : The main Nvidia install happens during the reboot(s) : 

{% highlight bash %}
export IMAGE_FAMILY="tf-latest-cu92" 
export ZONE="us-central1-c"
export BASE_INSTANCE_NAME="rdai-tts-base-vm"  # My choice of name
export BASE_INSTANCE_TYPE="n1-highmem-2"      # 13Gb memory, but only 2 CPU cores
gcloud compute instances create $BASE_INSTANCE_NAME \
        --zone=$ZONE \
        --image-family=$IMAGE_FAMILY \
        --image-project=deeplearning-platform-release \
        --maintenance-policy=TERMINATE \
        --machine-type=$BASE_INSTANCE_TYPE \
        --accelerator='type=nvidia-tesla-k80,count=1' \
        --boot-disk-size=30GB \
        --metadata='install-nvidia-driver=True'
{% endhighlight %}


Once that works, you'll get a status report message : 

{% highlight bash %}
Created [https://www.googleapis.com/compute/v1/projects/rdai-tts/zones/us-central1-c/instances/rdai-tts-base-vm].
NAME              ZONE           MACHINE_TYPE  PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP  STATUS
rdai-tts-base-vm  us-central1-c  n1-highmem-2               10.128.0.2   WW.XX.YY.ZZ  RUNNING
{% endhighlight %}

And the machine should be running in your Google Cloud 'Console' (actually the web-based GUI).


#### Look around inside the VM

{% highlight bash %}
gcloud compute ssh $BASE_INSTANCE_NAME
# *NOW* IT ASKS ABOUT THE NVIDIA DRIVER!
{% endhighlight %}

"""  This VM requires Nvidia drivers to function correctly.   Installation takes 3 to 5 minutes and will automatically reboot the machine. """

*  Actually took ~110secs (&lt; 2 mins) : 
*  Reboots machine
*  Re-SSH in
*  Installation process continues...

Finally, run ```nvidia-smi``` to get the following GPU card 'validation' : 

{% highlight bash %}
Thu Aug 23 16:06:48 2018       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 396.44                 Driver Version: 396.44                    |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  Tesla K80           Off  | 00000000:00:04.0 Off |                    0 |
| N/A   56C    P0    76W / 149W |      0MiB / 11441MiB |    100%      Default |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID   Type   Process name                             Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+
{% endhighlight %}


#### Install additional useful stuff for the base image

#####  First steps

Of course, you're free to make other choices, but my instinct is to set up a Python3 user ```virtualenv``` in ```~/env3/``` : 

{% highlight bash %}
# These are, apparently already installed
sudo apt-get install python3-pip python3-dev python-virtualenv

cd ~
virtualenv --system-site-packages -p python3 env3
. ~/env3/bin/activate
# Check ... (want python 3.5.3)
python --version
{% endhighlight %}


#####  Install PyTorch

Here we install ```PyTorch``` (0.4.1) into the VM (TensorFlow is already baked in) :

{% highlight bash %}
pip3 install http://download.pytorch.org/whl/cu92/torch-0.4.1-cp35-cp35m-linux_x86_64.whl 
pip3 install tensorboardX torchvision # includes Pillow==5.2.0
{% endhighlight %}


#####  Install ```gcsfuse```

The following (taken from the [gcsfuse repository](https://github.com/GoogleCloudPlatform/gcsfuse/blob/master/docs/installing.md)) are 
required to install the 'gcsfuse' utility, which is needed to mount storage buckets as file systems :

{% highlight bash %}
export GCSFUSE_REPO=gcsfuse-`lsb_release -c -s`
echo "deb http://packages.cloud.google.com/apt $GCSFUSE_REPO main" | sudo tee /etc/apt/sources.list.d/gcsfuse.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo apt-get update
sudo apt-get install gcsfuse
{% endhighlight %}


#####  Set up JupyterLab with the user ```virtualenv```

We can see that ```jupyter``` is running on the machine already, using ```python3``` : 

{% highlight bash %}
ps fax | grep jupyter
# /usr/bin/python3 /usr/local/bin/jupyter-lab --config=/root/.jupyter/jupyter_notebook_config.py --allow-root
{% endhighlight %}

So that we can use JupyterLab from within our own (user) ```virtualenv```, we need to set it 
up (assuming ```~/env3/``` is the ```virtualenv``` as above).  Once logged into the cloud machine as the cloud user, 
enable the ```virtualenv``` to find its python, to copy into the 'root' jupyterlab :

{% highlight bash %}
. ~/env3/bin/activate
(env3) ~$ envpy=`which python`
(env3) ~$ sudo ${envpy} -m ipykernel install --prefix=/usr/local --name 'custom-env3'
# Installed kernelspec custom-env3 in /usr/local/share/jupyter/kernels/custom-env3
{% endhighlight %}

For ease-of-use of the JupyterLab system, it's helpful to be able to navigate to your user code quickly.
So, as your cloud user, go to where you want your workspace to live, and create a link to it that will be visible within the
main JupyterLab opening directory :

{% highlight bash %}
localworkspace=`pwd`
sudo ln -s ${localworkspace} /opt/deeplearning/workspace/
{% endhighlight %}

(This only has to be done once - it persists).


##### Installation Summary 

About half of the 30Gb is now used : 

{% highlight bash %}
df -h | grep sda
# /dev/sda1        30G   14G   15G  50% /
{% endhighlight %}


#### Check that TensorFlow and PyTorch are operational

{% highlight bash %}
. ~/env3/bin/activate
python --version
python
{% endhighlight %}


##### TensorFlow 

Here's a ~minimal ```tensorflow-gpu``` check :

{% highlight python %}
import tensorflow as tf

a = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[2, 3], name='a')
b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[3, 2], name='b')
c = tf.matmul(a, b)

sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))

print(sess.run(c))
# MatMul: (MatMul): /job:localhost/replica:0/task:0/device:GPU:0
{% endhighlight %}


##### PyTorch

Here's a ~minimal ```pytorch-gpu``` check :

{% highlight python %}
import torch

#dtype = torch.FloatTensor  # Use this to run on CPU
dtype = torch.cuda.FloatTensor # Use this to run on GPU

a = torch.Tensor( [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]]).type(dtype)
b = torch.Tensor( [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]]).type(dtype)

print(a.mm(b).device)  # matrix-multiply (should state : on GPU)
#cuda:0
{% endhighlight %}


#### Wrap-up : Ensure the VM is not running

{% highlight bash %}
gcloud compute instances stop $BASE_INSTANCE_NAME
{% endhighlight %}



### Now clone the base image

We're currently in a no-charge state (assuming this is your only persistent disk on GCP, 
since you have a free 30Gb quota as a base). But, since we'd like to create 
new 'vanilla' machines from this one, we have to go into the (low) charge-zone.


#### Clone persistent disk from the current boot image

This makes a new 'family' so that you can specify the VM+Drivers+Extras easily.

{% highlight bash %}
export MY_IMAGE_NAME="rdai-awesome-image"
export MY_IMAGE_FAMILY="rdai-gpu-family"

gcloud compute images create $MY_IMAGE_NAME \
        --source-disk $BASE_INSTANCE_NAME \
        --source-disk-zone $ZONE \
        --family $MY_IMAGE_FAMILY
{% endhighlight %}

{% highlight bash %}
Created [https://www.googleapis.com/compute/v1/projects/rdai-tts/global/images/rdai-awesome-image].
NAME                PROJECT   FAMILY           DEPRECATED  STATUS
rdai-awesome-image  rdai-tts  rdai-gpu-family              READY
{% endhighlight %}


#### (Finally) create a 'better GPU' machine using that boot image

{% highlight bash %}
export INSTANCE_NAME="rdai-tts-p100-vm"
export INSTANCE_TYPE="n1-highmem-2"
export ZONE="us-central1-c"                # As above
export MY_IMAGE_NAME="rdai-awesome-image"  # As above

gcloud compute instances create $INSTANCE_NAME \
        --machine-type=$INSTANCE_TYPE \
        --zone=$ZONE \
        --image=$MY_IMAGE_NAME \
        --maintenance-policy=TERMINATE \
        --accelerator='type=nvidia-tesla-p100,count=1' \
        --preemptible
        
# Could also use (instead of --image):
#        --image-family=$MY_IMAGE_FAMILY 
{% endhighlight %}

{% highlight bash %}
Created [https://www.googleapis.com/compute/v1/projects/rdai-tts/zones/us-central1-c/instances/rdai-tts-p100-vm].
NAME              ZONE           MACHINE_TYPE  PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP    STATUS
rdai-tts-p100-vm  us-central1-c  n1-highmem-2  true         10.128.0.3   WW.XX.YY.ZZ   RUNNING
{% endhighlight %}

This machine is running (and costing, for the ```preemtible P100``` version ~ $0.50 an hour).  So
you can ```ssh``` into it : 

{% highlight bash %}
gcloud compute ssh $INSTANCE_NAME
{% endhighlight %}

{% highlight bash %}
andrewsm@rdai-tts-p100-vm:~$ nvidia-smi 
Thu Aug 23 16:58:27 2018       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 396.44                 Driver Version: 396.44                    |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  Tesla P100-PCIE...  Off  | 00000000:00:04.0 Off |                    0 |
| N/A   36C    P0    28W / 250W |      0MiB / 16280MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID   Type   Process name                             Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+
{% endhighlight %}


#### Finally : Ensure the VM is not running

Now, we've accomplished a few things : 

*  We have a clean VM with NVidia installed, ready to be cloned
*  A cloned persistent disk that can be used 'live' - but that we're also not too attached to

Thus, we can stop where we are, and think about actually using the machine(s) : 

{% highlight bash %}
gcloud compute instances stop $INSTANCE_NAME
{% endhighlight %}

This gets us out of the 'running a P100 for no reason' state.


#### Summary

So : Now have two TERMINATED VMs with persistent disks :

*  one with the BASE image (can be updated)
*  the other as a preemptible nice-GPU one

Let's wait a while, and see to what extent the preemptible machine disappears by 1:10am tomorrow...

*... waited for 24hrs ...*

... And indeed, the persistent disk does not die, even though a machine based on it would TERMINATE
after 24hrs.  That means we can safely store data on the remaining ~14Gb of persistent disk available to us.


### Using your shiny new cloud Machine(s)

#### Boot a Terminated image

{% highlight bash %}
export INSTANCE_NAME="rdai-tts-p100-vm"  # As above
gcloud compute instances start $INSTANCE_NAME
# This already has the preemptible flags, etc set
{% endhighlight %}


#### SSH into an image

{% highlight bash %}
gcloud compute ssh $INSTANCE_NAME
{% endhighlight %}

It's probably a good idea to run training (etc) within a ```screen``` or a ```tmux```, so that
if your network disconnects, the machine will keep going.


#### Run Jupyter locally

You can get access to is via a ```http://localhost:8880/``` browser connection by setting up a proxy 
to the cloud machine's ```8080``` (```localhost:8880``` was chosen to avoid conflict with 'true local' jupyter sessions) :

{% highlight bash %}
# This uses the existing 'root' jupyterlab install
gcloud compute ssh $INSTANCE_NAME -- -L 8880:localhost:8080
{% endhighlight %}



#### Run Tensorboard locally

You can get access to is via a ```http://localhost:6606/``` browser connection by setting up a proxy 
to the cloud machine's ```6006``` (```localhost:6606``` was chosen to avoid conflict with 'true local' tensorboard sessions) :

{% highlight bash %}
gcloud compute ssh $INSTANCE_NAME -- -L 6606:localhost:6006
# And in the cloud machine's terminal session that opens :
tensorboard  --port 6006 --logdir ./log
{% endhighlight %}

(make sure you're pointing to a ```log``` directory that has files in it...)


#### Download files from the image

See [the official documentation](https://cloud.google.com/compute/docs/instances/transfer-files#transfergcloud).  Also 
note that it's definitely easier to get this right if you also have an open ```ssh``` session :

{% highlight bash %}
#gcloud compute scp [LOCAL_FILE_PATH] $INSTANCE_NAME:[REMOTE_FILE_PATH]
#gcloud compute scp $INSTANCE_NAME:[REMOTE_FILE_PATH] [LOCAL_FILE_PATH]
## Also copy recursively :
#gcloud compute scp --recurse $INSTANCE_NAME:[REMOTE_FILE_PATH] [LOCAL_FILE_PATH]
{% endhighlight %}


#### Mount Bucket Storage as a Drive

See [the official documentation](https://cloud.google.com/storage/docs/gcs-fuse#using_feat_name).  :

{% highlight bash %}
# Mounts a bucket at a particular location
BUCKET_MOUNT_POINT=~/rdai-mount-point
BUCKET_TO_MOUNT=sample-bucket-name
mkdir -p $BUCKET_MOUNT_POINT
# Mount the bucket onto the mount point
gcsfuse $BUCKET_TO_MOUNT $BUCKET_MOUNT_POINT

# Can also add a debug flag
gcsfuse --debug_gcs $BUCKET_TO_MOUNT $BUCKET_MOUNT_POINT

# If you want a more browseable directory structure, use :
gcsfuse --debug_gcs --implicit-dirs  $BUCKET_TO_MOUNT $BUCKET_MOUNT_POINT
{% endhighlight %}

Expected output : 

{% highlight bash %}
Using mount point: /home/andrewsm/rdai-mount-point
Opening GCS connection...
Opening bucket...
Mounting file system...
File system has been successfully mounted.
{% endhighlight %}

Unmount the bucket : 

{% highlight bash %}
fusermount -u $BUCKET_MOUNT_POINT
{% endhighlight %}


#### Stop the VM

I've included this one twice, since it's important not to let these things sit idle...

{% highlight bash %}
gcloud compute instances stop $INSTANCE_NAME
{% endhighlight %}

---

All Done!



<!--
## TODO :

#### Sort out the ```jupyter``` installation

But may want to specify the virtualenv ...

*   Not very helpful : https://help.pythonanywhere.com/pages/IPythonNotebookVirtualenvs/

{% highlight bash %}
workon my-virtualenv-name  # activate your virtualenv, if you haven't already
pip install tornado==4.5.3
pip install ipykernel==4.8.2
{% endhighlight %}

May need to put the virtualenv above into :: ```/home/andrewsm/.virtualenvs/env3-custom/bin/python``` :

Hmmm, but after enabling our 'env', (see [this issue](https://github.com/jupyterlab/jupyterlab/issues/4064)) we get : 

{% highlight bash %}
(env3) :~$ jupyter lab paths
#Application directory:   /usr/local/share/jupyter/lab
#User Settings directory: /home/andrewsm/.jupyter/lab/user-settings
#Workspaces directory /home/andrewsm/.jupyter/lab/workspaces
{% endhighlight %}

and : 

{% highlight bash %}
(env3) :~$ jupyter --paths
config:
    /home/andrewsm/.jupyter
    /usr/etc/jupyter
    /usr/local/etc/jupyter
    /etc/jupyter
data:
    /home/andrewsm/.local/share/jupyter
    /usr/local/share/jupyter
    /usr/share/jupyter
runtime:
    /run/user/1000/jupyter
{% endhighlight %}

{% highlight bash %}
(env3) :~$ jupyter notebook --port=8081 --no-browser --notebook-dir . 
{% endhighlight %}

Next things ....

. env3/bin/activate
python -m ipykernel install --user --name env3 --display-name "Python (~/env3)"
Installed kernelspec env3 in /home/andrewsm/.local/share/jupyter/kernels/env3
#                            /home/andrewsm/.local/share/jupyter

## https://ipython.readthedocs.io/en/stable/install/kernel_install.html
python -m ipykernel install --prefix=/usr/local/share/jupyter --name 'rdai-env3'


### Breakthrough ! 

(env3) ~$ envpy=`which python`
(env3) ~$ sudo ${envpy} -m ipykernel install --prefix=/usr/local --name 'rdai-env3'
# Installed kernelspec rdai-env3 in /usr/local/share/jupyter/kernels/rdai-env3

envhome=`pwd`
sudo ln -s ${envhome} /opt/deeplearning/workspace/

# Hmm
sys.path.insert(0, ('./pytorch-vqa'))

!-->
