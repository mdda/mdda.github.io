---
date: 2019-07-07
title: Google Cloud Signals on Termination
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

### Set up a preemption alert message

Useful information found at [this website](https://haggainuchi.com/shutdown.html), and also
[Google's Docs](https://cloud.google.com/compute/docs/shutdownscript).  *However* : I didn't 
experience the problems outlined in the blog post.   Google's
'hook' method seems to work pretty well in both the preemption and CLI `instance stop` cases - 
let me know if you have problems, since then I'll dig into the direct ACPI route (which 
wasn't necessary with the implementation below).

<!--
Slight renaming required, since the VM is running Debian (not Ubuntu) - the 
relevant shutdown chain is triggered via `/etc/acpi/events/powerbtn-acpi-support`  :

{% highlight bash %}
event=button[ /]power
action=/etc/acpi/powerbtn-acpi-support.sh
{% endhighlight %}
!-->

#### Create a Slack API endpoint

Set up a Slack Webhook using the [instructions provided](https://api.slack.com/incoming-webhooks) : 
*  Create app associated with your preferred Slack workspace
*  'Add Features and Functionality'-'Incoming Webhooks' : Switch to 'On'
*  'Add New Webhook to Workspace' : Click button
*  Fill in the channel to which the webhook should post
*  Copy the 'Webhook URL', which looks like : 
   + `https://hooks.slack.com/services/T3RFOOF2Y/BL3NOPEDGD/kUxxT8HAHAXhyz1SHwCk7S`


#### Create a script to call the Slack endpoint

Create this script as a local file `shutdown.bash`, 
making sure to update the `SLACK_URL` within `post_to_slack()` :

{% highlight bash %}
#!/bin/bash

function post_to_slack () {
  # format message as a code block ```${msg}```
  SLACK_MESSAGE="\`\`\`$1\`\`\`"
  SLACK_URL="https://hooks.slack.com/services/T3RFOOF2Y/BL3NOPEDGD/kUxxT8HAHAXhyz1SHwCk7S"
 
  case "$2" in
    INFO)
      SLACK_ICON=':slack:'
      ;;
    WARNING)
      SLACK_ICON=':warning:'
      ;;
    ERROR)
      SLACK_ICON=':bangbang:'
      ;;
    *)
      SLACK_ICON=':slack:'
      ;;
  esac
 
  curl -X POST --data "payload={\"text\": \"${SLACK_ICON} ${SLACK_MESSAGE}\"}" ${SLACK_URL}
}

post_to_slack "Server '`hostname`' going down..." "WARNING"
exit 0
{% endhighlight %}


#### Create a 'shutdown hook' for the GCP machine

Post that script to the VM using the `gcloud add-metadata` command from your local machine :

{% highlight bash %}
gcloud compute instances add-metadata $INSTANCE_NAME \
    --metadata-from-file shutdown-script=shutdown.bash
{% endhighlight %}

---

Alternative : Use [Pushed](https://pushed.co/) which has an app with a free tier.  However,
reviews of the app indicate that it may not be super-reliable, which kind
of defeats the purpose of having it as a critical messaging system.
