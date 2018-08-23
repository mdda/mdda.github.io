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
virtualenv --system-site-packages gcloud-env
. gcloud-env/bin/activate
pip install --upgrade pip
pip install gsutil 
pip install --upgrade google-auth-oauthlib
{% endhighlight %}

Cbeck that the installation has worked :

{% highlight bash %}
gsutil version -l
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
{% highlight bash %}


Cbeck that the installation has worked :

{% highlight bash %}
gcloud --version
{% endhighlight %}


#### Authenticate/configure Google Cloud account

This will ask you to authenticate against your Google Cloud account (and
save the token, and othr settings, in ```~/.boto```):

{% highlight bash %}
gsutil config
{% endhighlight %}

After going to the web authentication page to get the 
required code (which needs you to identify which Google account is linked to your
cloud stuff), go to [the project link suggested](https://cloud.google.com/console#/project)
to get the list of project ids, and select the one required.


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

gcloud auth login


#### Choose the project id

export PROJECT="rdai-tts"
gcloud config set project $PROJECT


#### Actually build the VM

{% highlight bash %}
export IMAGE_FAMILY="tf-latest-cu92" 
export ZONE="us-central1-c"
export INSTANCE_NAME="rdai-tts-base-vm"
export INSTANCE_TYPE="n1-highmem-2"
gcloud compute instances create $INSTANCE_NAME \
        --zone=$ZONE \
        --image-family=$IMAGE_FAMILY \
        --image-project=deeplearning-platform-release \
        --maintenance-policy=TERMINATE \
        --machine-type=$INSTANCE_TYPE \
        --accelerator='type=nvidia-tesla-k80,count=1' \
        --boot-disk-size=10GB \
        --metadata='install-nvidia-driver=True'
{% endhighlight %}

