---
date: 2019-07-22
title: Google Cloud move instance 
tagline: CLI set-up
category: OSS
tags:
- linux
- GoogleCloud
- zones
layout: post
published: true
---
{% include JB/setup %}


### Move an instance between zones

The [Google docs](https://cloud.google.com/compute/docs/instances/moving-instance-across-zones) for this
are really pretty good (for once), so the below is mainly for my future reference, and to 
illustrate the steps that actually worked first time...


#### Why move zones?

I was getting repeated (i.e. for more than 12hrs) denials for starting a 2 core VM with a P100 attached in
`us-central1-c` (which I kind of assumed would have decent availability when I semi-randomly chose it in the first place).

{% highlight bash %}
export INSTANCE_NAME="rdai-tts-p100-vm" 
gcloud compute instances start $INSTANCE_NAME
# FAILS : 'lack of compute'
{% endhighlight %}


#### Choose the new zone

Looking at the [Google GPU zones](https://cloud.google.com/compute/docs/gpus/) to see where GPUs might be available,
I selected something closer to Singapore ... Taiwan.  Note that the quotas page had already
encouraged me to obtain quota in a whole bunch of places that I *now* see don't even have GPUs available : Honestly, 
it seems like GCP should be more mature than to try this kind of MVP/Lean Startup stuff.

{% highlight bash %}
ZONE_SRC='us-central1-c'
ZONE_DST='asia-east1-a'

gcloud compute instances move ${INSTANCE_NAME} \
    --zone ${ZONE_SRC} --destination-zone ${ZONE_DST}
# NO DICE
{% endhighlight %}

Crazily, the auto-move tool that GCP supplies can only move instances that are currently running.  Which 
is a bit of an eye-roller, since the reason that I want to move zones is because GCP won't allow me
to start the instance...


#### Follow the manual instructions

Make sure the machine and disks can be shut down safely :

{% highlight bash %}
DISK_BOOT='rdai-tts-p100-vm'
DISK_DATA='tts'

gcloud compute instances set-disk-auto-delete ${INSTANCE_NAME} --zone ${ZONE_SRC} \
    --disk ${DISK_BOOT} --no-auto-delete
# This got 'updated' since it was previously on auto-delete!

gcloud compute instances set-disk-auto-delete ${INSTANCE_NAME} --zone ${ZONE_SRC} \
    --disk ${DISK_DATA} --no-auto-delete
# Unchanged, since this was not set for auto-delete when it was created
{% endhighlight %}


Check the metadata for the instance (before we delete it) ...  It may well be worth 
saving this to a file :

{% highlight bash %}
gcloud compute instances describe ${INSTANCE_NAME} --zone ${ZONE_SRC}
# NB: Will need to re-instate startup and shutdown scripts

gcloud compute instances delete ${INSTANCE_NAME} --zone ${ZONE_SRC}
{% endhighlight %}


Snapshot the disks (assuming you've got one `BOOT` disk and one `DATA` disk, which seems like
a reasonable set-up to me) :

{% highlight bash %}
gcloud compute disks snapshot ${DISK_BOOT} \
    --snapshot-names ${DISK_BOOT}_snapshot \
    --zone ${ZONE_SRC}

gcloud compute disks snapshot ${DISK_DATA} \
    --snapshot-names ${DISK_DATA}_snapshot \
    --zone ${ZONE_SRC}
{% endhighlight %}


Having snapshotted (make sure they complete without errors!), apparently the original disks have to be deleted
to avoid name-clashes across the zones :

{% highlight bash %}
gcloud compute disks delete ${DISK_BOOT} --zone ${ZONE_SRC}
gcloud compute disks delete ${DISK_DATA} --zone ${ZONE_SRC}
{% endhighlight %}

Then, recreate the disks from the snapshots in the destination zone :

{% highlight bash %}
gcloud compute disks create ${DISK_BOOT} \
    --source-snapshot ${DISK_BOOT}_snapshot \
    --zone ${ZONE_DST}
    
gcloud compute disks create ${DISK_DATA} \
    --source-snapshot ${DISK_DATA}_snapshot \
    --zone ${ZONE_DST}
{% endhighlight %}


Finally, create the instance from scratch with the disks attached (NB: after doing this, you will need 
to reinstall the `metadata`, such as the `startup` and `shutdown` scripts described elsewhere in this blog) :

{% highlight bash %}
export INSTANCE_TYPE="n1-highmem-2"

gcloud compute instances create $INSTANCE_NAME \
        --machine-type=$INSTANCE_TYPE \
        --maintenance-policy=TERMINATE \
        --accelerator='type=nvidia-tesla-p100,count=1' \
        --preemptible \
        --disk name=${DISK_BOOT},boot=yes,mode=rw \
        --disk name=${DISK_DATA},mode=rw \
        --zone=$ZONE_DST
{% endhighlight %}


Finally, once the instance confirmed to be working in the new zone ...

{% highlight bash %}
gcloud compute snapshots delete ${DISK_BOOT}_snapshot
gcloud compute snapshots delete ${DISK_DATA}_snapshot
{% endhighlight %}


-----------

## Leave helpful comments in the GCP survey

Not sure that anyone reads these, but :

>   Starting of an instance was repeatedly refused in `us-central1-c` (no idea what the actual reason was), 
>   so I decided to move to an asian zone with P100s.  Since I couldn't start the instance in `us-central1-c`, 
>   the automatic tooling for moving the instance could not be used.  So I went through all the steps 
>   (bringing down carefully, snapshotting, recreating) only to find that quota needed to be assigned 
>   (a '2 day' process).  Rather disappointed at that point that it was Google's own systems that were
>   (a) preventing me from launching an instance; 
>   (b) made it time-consuming to transfer; and then 
>   (c) refused to allow me to start the instance.
>   
>   Perhaps it would make sense to have some kind of 'availability' test ahead of time?
>   
>   I also see that I've got 'quota' in lots of other zones in the asia region - but there are 
>   no actual GPUs to be had there (so the quota mechanism was merely to check for demand : 
>   Very clever for Google, but rather anti-customer in the UI).
>   
>   Things are working now (in Asia), but this was not a smooth experience.


{% highlight bash %}
{% endhighlight %}

