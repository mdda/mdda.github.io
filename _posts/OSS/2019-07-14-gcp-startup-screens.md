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

Create this script as a local file `startup.bash` (clearly, your details will be very different) :

{% highlight bash %}
#!/bin/bash

# https://stackoverflow.com/questions/6534386/how-can-i-script-gnu-screen-to-start-with-a-program-running-inside-of-it-so-that/6655931#6655931
## 'stuff' is a screen-internal command here
screen -S sdf -p 0 -X stuff ". ~/env36/bin/activate$(printf \\r)"

NL="$(printf \\r)"
screen -S sdf -p 0 -X stuff "echo 'hello'${NL}echo 'world'${NL}"

exit 0
{% endhighlight %}


#### Create a 'startup hook' for the GCP machine

Post that script to the VM using the `gcloud add-metadata` command from your local machine :

{% highlight bash %}
gcloud compute instances add-metadata $INSTANCE_NAME \
    --metadata-from-file startup-script=startup.bash
{% endhighlight %}



#### Test that is works

