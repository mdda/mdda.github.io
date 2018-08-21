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

*  https://medium.com/@jamsawamsa/running-a-google-cloud-gpu-for-fast-ai-for-free-5f89c707bae6



#### Installing the Cloud tools in a ```virtualenv```

Sadly, Google's tools appear to be Python 2.x (and discussions indicate that Google considers
updating to Python 3.x as a low priority).  Thus, rather than 'dirty' Fedora's native 2.7 installation.
it makes sense to create a ```virtualenv``` to contain the functionality cleanly.  As ```user``` you just need :

{% highlight bash %}
virtualenv --system-site-packages gcloud-env
. gcloud-env/bin/activate
pip install gsutil
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


#### Look at the buckets available

{% highlight bash %}
gsutil ls
{% endhighlight %}


#### Actually upload to the bucket

Looking at the [gsutil Google documentation](https://cloud.google.com/storage/docs/gsutil/commands/cp) :

{% highlight bash %}
cd XYZ/
gsutil help options
gsutil -m cp -r FOLDER-TO-UPLOAD gs://MY-BUCKET-NAME/
# ...
# [35.0k/35.0k files][ 14.3 GiB/ 14.3 GiB] 100% Done  12.0 MiB/s ETA 00:00:00
# Operation completed over 35.0k objects/14.3 GiB.    
{% endhighlight %}


All done.

