---
date: 2018-05-07
title: Uploading to Google Cloud Buckets
tagline: Quick note
category: OSS
tags:
- fedora
- linux
- GoogleCloud
layout: post
published: false
---
{% include JB/setup %}

### Quick route for linux command line 

#### (An alternative to Google Documentation)

https://stackoverflow.com/questions/48860586/how-to-upload-and-save-large-data-to-google-colaboratory-from-local-drive

*  https://cloud.google.com/storage/docs/gsutil_install
*  https://stackoverflow.com/questions/47527868/importerror-cannot-import-name-opentype-on-new-installation

https://console.cloud.google.com/cloud-resource-manager


#### Installing the Cloud tools in a ```virtualenv```

As ```user``` you just need :

{% highlight bash %}
virtualenv --system-site-packages gcloud-env
. gcloud-env/bin/activate
pip install gsutil
pip install --upgrade google-auth-oauthlib

gsutil info
gsutil version -l
{% endhighlight %}


#### Authenticate/configure Google Cloud account

{% highlight bash %}
gsutil config
{% endhighlight %}


#### Look at the buckets available

{% highlight bash %}
gsutil ls
{% endhighlight %}


#### Actually upload to the bucket

Looking at the [Google Docs](https://cloud.google.com/storage/docs/gsutil/commands/cp) :

{% highlight bash %}
cd XYZ/
gsutil help options
gsutil -m cp -r FOLDER-TO-UPLOAD gs://MY-BUCKET-NAME/
{% endhighlight %}

{% highlight bash %}
/ [35.0k/35.0k files][ 14.3 GiB/ 14.3 GiB] 100% Done  12.0 MiB/s ETA 00:00:00
Operation completed over 35.0k objects/14.3 GiB.    
(gcloud-env) [PROMPT]$ 
{% endhighlight %}


All done.

