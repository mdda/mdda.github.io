---
date: 2019-07-14
title: Google Cloud Start up with Sessions Running
tagline: CLI set-up
category: OSS
tags:
- linux
- GoogleCloud
- screen
layout: post
published: false
---
{% include JB/setup %}

### Initialisation script to set up VM from cold start

Just having a nicely configured VM doesn't anwer the whole question in a machine learning scenario.  In particular,
using preemptible machines means that the VM is hard-stopped at minimum every 24hrs, and a
typical way to do training, etc, involves setting up `screen` to allow for clear disconnects.

So, in addition to mounting an extra drive, wouldn't it be nice to get some screen sessions going with the correct paths, 
`virtualenv` already running, and ready-to-roll?


#### Create a startup script locally

Create this script as a local file `startup.bash` (clearly, your details will be very different, 
but some essential elements are included here) :

{% highlight bash %}
#!/bin/bash

username='notauser'   # Clearly this needs to be changed

# This shows that the script is run as root on startup...
echo "root=$(whoami)"

mkdir -p /mnt/rdai
mount -o discard,defaults /dev/sdb /mnt/rdai

cd /mnt/rdai
chown ${username}:${username} .

# Become the user ... 
su - ${username} <<'EOF'
echo "username=$(whoami)"

cd /useful/path/

NL="$(printf \\r)"
ACTIVATE_ENV=". ~/env36/bin/activate"

# First, ensure the screen session exists, and then 'stuff' entries into it
screen -dmS model 
screen -S model       -p 0 -X stuff "${ACTIVATE_ENV}${NL}"
screen -S model       -p 0 -X stuff "python train.py${NL}"

screen -dmS tensorboard
screen -S tensorboard -p 0 -X stuff "${ACTIVATE_ENV}${NL}"
screen -S tensorboard -p 0 -X stuff "tensorboard --logdir=runs/${NL}"

EOF
{% endhighlight %}


#### Create a 'startup hook' for the GCP machine

Post that script to the VM using the `gcloud add-metadata` command from your local machine :

{% highlight bash %}
gcloud compute instances add-metadata $INSTANCE_NAME \
    --metadata-from-file startup-script=startup.bash
{% endhighlight %}

#### Test that is works

