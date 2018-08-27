---
date: 2018-08-22
title: Google Cloud Deep Learning images
tagline: CLI set-up
category: OSS
tags:
- linux
- GoogleCloud
- tensorflow
- pytorch
- fedora
layout: post
published: false
---
{% include JB/setup %}

### Quick route for linux command line 

#### (An alternative to Google's documentation)

The following were useful resources for putting this together: 

*  https://cloudplatform.googleblog.com/2018/06/Introducing-improved-pricing-for-Preemptible-GPUs.html
*  https://cloud.google.com/compute/docs/instances/create-start-preemptible-instance

*  https://blog.kovalevskyi.com/deep-learning-images-for-google-cloud-engine-the-definitive-guide-bc74f5fb02bc
*  https://blog.kovalevskyi.com/gce-deeplearning-images-m4-new-pytorch-with-cuda-9-2-1913dd37a7c2

*  https://medium.com/@jamsawamsa/running-a-google-cloud-gpu-for-fast-ai-for-free-5f89c707bae6

*  https://lobster1234.github.io/2017/05/14/get-started-on-google-cloud-with-cli/


### Installing the Google Cloud tools

#### Installing the python-based tools in a ```virtualenv```

Sadly, Google's tools appear to be Python 2.x (and discussions indicate that Google considers
updating to Python 3.x as a low priority).  Thus, rather than 'dirty' Fedora's native 2.7 installation.
it makes sense to create a ```virtualenv``` to contain the functionality cleanly.  As ```user``` you just need :

{% highlight bash %}
#virtualenv --system-site-packages gcloud-env
#. gcloud-env/bin/activate
#pip install --upgrade pip
#pip install gsutil 
#pip install --upgrade google-auth-oauthlib
{% endhighlight %}

Check that the installation has worked :

{% highlight bash %}
#gsutil version -l
{% endhighlight %}


#### Installing the GCloud tool itself 'globally'

We also need to install ```gcloud``` (which wasn't needed for just the bucket operations, but the compute engine creation requires it).

As ```root```, update YUM with Cloud SDK repo information (NB: The indentation for the 2nd line of gpgkey is important) :

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


Cbeck that the installation has worked :

{% highlight bash %}
gsutil version -l
gcloud --version
{% endhighlight %}


#### Authenticate/configure Google Cloud account

This will ask you to authenticate against your Google Cloud account (and
save the token, and othr settings, in ```~/.boto```):

{% highlight bash %}
gcloud auth login
gcloud projects list
gcloud config set project rdai-tts

#? gsutil config
{% endhighlight %}

After going to the web authentication page to get the 
required code (which needs you to identify which Google account is linked to your
cloud stuff), go to [the project link suggested](https://cloud.google.com/console#/project)
to get the list of project ids, and select the one required (or use ```gcloud projects list```, as above).


#### Look at the buckets available (for instance)

{% highlight bash %}
gsutil ls
{% endhighlight %}


### Create a GPU-enabled VM

#### Choose VM base image

Do this based on ```tensorflow-gpu``` since that has been specially compiled, etc.  

*  Actual image name : ```tf-latest-cu92```  (We'll add ```PyTorch``` later)



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

   *  But actually existing (https://cloud.google.com/compute/docs/gpus/ "GPUs for compute workloads") : 
      *  us-central1-{a,c} ; us-east1-{c,d} ; us-west1-{b}
      *  europe-west1-{b,d}
      *  asia-east1-{a,b}


*  Regions with P100s :
   *  That have been allocated quota... : 
      *  us-central1 ; us-east1

   *  But actually existing (https://cloud.google.com/compute/docs/gpus/ "GPUs for compute workloads") : 
      *  us-central1-{c,f} ; us-west1-{a,b} ; us-east1-{b,c}
      *  europe-west1-{b,d} ; europe-west4-{a}
      *  asia-east1-{a,c}


*  Regions with V100s : 
   *  That have been allocated quota... : 
      *  us-central1 ; us-east1
   
   *  But actually existing (https://cloud.google.com/compute/docs/gpus/ "GPUs for compute workloads") : 
      *  us-central1-{a,f} ; us-west1-{a,b}
      *  europe-west4-{a}
      *  asia-east1-{c}


So, we really have to choose ```us-central1``` (for instance), without loving the decision...  And since we care about P100s (and K80s) : choose zone 'c'.


#### Choose VM persistent disk size

NB: Included for free in monthly usage : 
*  30 GB of Standard persistent disk storage per month.

But disk size must be as big as the image....

``` - Invalid value for field 'resource.disks[0].initializeParams.diskSizeGb': '10'. Requested disk size cannot be smaller than the image size (30 GB)```


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

This takes &lt; 1 minute - despite the warnings about Nvidia install times in 'that one blog post' : 

{% highlight bash %}
export IMAGE_FAMILY="tf-latest-cu92" 
export ZONE="us-central1-c"
export BASE_INSTANCE_NAME="rdai-tts-base-vm"
export BASE_INSTANCE_TYPE="n1-highmem-2"
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

So perhaps there's no need to do the whole cloning thing after all...

{% highlight bash %}
Created [https://www.googleapis.com/compute/v1/projects/rdai-tts/zones/us-central1-c/instances/rdai-tts-base-vm].
NAME              ZONE           MACHINE_TYPE  PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP  STATUS
rdai-tts-base-vm  us-central1-c  n1-highmem-2               10.128.0.2   WW.XX.YY.ZZ  RUNNING
{% endhighlight %}


#### Look around inside the VM

gcloud compute ssh $BASE_INSTANCE_NAME
# *NOW* IT ASKS ABOUT THE NVIDIA DRIVER!

"""  This VM requires Nvidia drivers to function correctly.   Installation takes 3 to 5 minutes and will automatically reboot the machine. """
Actually took ~110secs (&lt; 2 mins)
Reboots machine
Re SSH in
Installation process continues...


{% highlight bash %}
nvidia-smi


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

For instance see : https://www.zybuluo.com/BIGBALLON/note/685122#step-4-1-install-pytorch-via-virtualenv : 

{% highlight bash %}
# These are, apparently already installed
sudo apt-get install python3-pip python3-dev python-virtualenv

cd ~
virtualenv --system-site-packages -p python3 env3
. ~/env3/bin/activate
# Check ... (want python 3.5.3)
python --version
# Now PyTorch install : 
pip3 install http://download.pytorch.org/whl/cu92/torch-0.4.1-cp35-cp35m-linux_x86_64.whl 
pip3 install torchvision # includes pillow
# More...?

{% endhighlight %}


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


{% highlight python %}
import tensorflow as tf

a = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[2, 3], name='a')
b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[3, 2], name='b')
c = tf.matmul(a, b)

sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))
print(sess.run(c))

# MatMul: (MatMul): /job:localhost/replica:0/task:0/device:GPU:0
{% endhighlight %}


{% highlight python %}
import torch

#dtype = torch.FloatTensor  # Use this to run on CPU
dtype = torch.cuda.FloatTensor # Use this to run on GPU

a = torch.Tensor( [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]]).type(dtype)
b = torch.Tensor( [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]]).type(dtype)

print(a.mm(b).device)  # matrix-multiply (should state : on GPU)
#cuda:0
{% endhighlight %}




#### Ensure the VM is not running

{% highlight bash %}
gcloud compute instances stop $BASE_INSTANCE_NAME
{% endhighlight %}


#### Create image from the current boot image

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



#### So now create a 'better GPU' image using that boot image

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


#### Ensure the VM is not running

{% highlight bash %}
gcloud compute instances stop $INSTANCE_NAME
{% endhighlight %}



So : Now have two TERMINATED VMs with persistent disks :

*  one with the BASE image (can be updated)
*  the other as a preemptible nice-GPU one

Let's wait a while, and see to what extent the preemptible machine disappears by 1:10am tomorrow...



#### Boot a Terminated image

{% highlight bash %}
export INSTANCE_NAME="rdai-tts-p100-vm"  # As above
gcloud compute instances start $INSTANCE_NAME
# This already has the preemptible flags, etc set
{% endhighlight %}

{% highlight bash %}
gcloud compute ssh $INSTANCE_NAME
{% endhighlight %}


### Sort out the ```jupyter``` installation


Interestingly, ```jupyter``` (which is running already) is using ```python3``` : 

{% highlight bash %}
ps fax | grep jupyter
# ...  /usr/bin/python3 /usr/local/bin/jupyter-lab --config=/root/.jupyter/jupyter_notebook_config.py --allow-root
{% endhighlight %}

But may want to specify the virtualenv ...

*   See : https://help.pythonanywhere.com/pages/IPythonNotebookVirtualenvs/

{% highlight bash %}
workon my-virtualenv-name  # activate your virtualenv, if you haven't already
pip install tornado==4.5.3
pip install ipykernel==4.8.2
{% endhighlight %}

But we have : 
{% highlight bash %}
tornado==5.1
ipykernel==4.8.2
{% endhighlight %}

May need to put the virtualenv above into :: ```/home/andrewsm/.virtualenvs/env3/bin/python```
