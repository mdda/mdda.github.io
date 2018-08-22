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

*  https://medium.com/@jamsawamsa/running-a-google-cloud-gpu-for-fast-ai-for-free-5f89c707bae6

*  https://lobster1234.github.io/2017/05/14/get-started-on-google-cloud-with-cli/




#### Installing the Cloud tools in a ```virtualenv```

Sadly, Google's tools appear to be Python 2.x (and discussions indicate that Google considers
updating to Python 3.x as a low priority).  Thus, rather than 'dirty' Fedora's native 2.7 installation.
it makes sense to create a ```virtualenv``` to contain the functionality cleanly.  As ```user``` you just need :

{% highlight bash %}
virtualenv --system-site-packages gcloud-env
. gcloud-env/bin/activate
pip install --upgrade pip
pip install gsutil gcloud
pip install --upgrade google-auth-oauthlib
{% endhighlight %}


Cbeck that the installation has worked :

{% highlight bash %}
gsutil version -l
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

Do this based on ```tensorflow-gpu``` since that has been specially compiled, etc.  

Properties desired, and reasoning : 

*  Actual image name : ```tf-latest-cu92```  (We'll add ```PyTorch``` later)
*  Choose a 13Gb RAM, 2-core machine (doesn't need to be powerful, but prefer RAM to cores) :
   * Regular is : ```n1-standard-8 	8 	30GB 	$0.3800 	$0.0800```
   * 2-core  is : ```n1-standard-2 	2 	7.5GB 	$0.0950 	$0.0200```
   * This choice is ```n1-highmem-2 	2 	13GB 	$0.1184 	$0.0250```
*  Initially, just use a ```K80``` : 
   * Possible : ```--accelerator='type=nvidia-tesla-v100,count=8'```
   * Realistic : ```--accelerator='type=nvidia-tesla-p100,count=1'```
   * Starter : ```--accelerator='type=nvidia-tesla-k80,count=1'```


*  Regions with K80s : 
   *  asia-east1 ; asia-northeast1 ; asia-southeast1 
   *  us-central1 ; us-east1 ; us-west1
   *  europe-west1 ; europe-west3 ; europe-west4

*  Regions with P100s (that have been allocated quota...) : 
   *  us-central1 ; us-east1

*  Regions with V100s (that have been allocated quota...) : 
   *  us-central1 ; us-east1

So, we really have to choose ```us-central1``` (for instance), without loving the decision...  Arbitrary decision : choose zone 'b'.



NB: Included for free in monthly usage : 
*  30 GB of Standard persistent disk storage per month.


Looking at the [Google documentation](https://cloud.google.com/storage/docs/gsutil/commands/cp) :

{% highlight bash %}
export IMAGE_FAMILY="tf-latest-cu92" 
export ZONE="us-central1-b"
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

