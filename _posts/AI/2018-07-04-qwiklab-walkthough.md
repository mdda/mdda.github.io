---
date: 2018-07-04
title: Google Qwiklab Walkthrough
tagline: Quick note
category: OSS
tags:
- fedora
- linux
- GoogleCloud
- Machine Learning
layout: post
published: false
---
{% include JB/setup %}

### Quick route for linux command line 

#### (A somewhat critical look at Google's materials)

I was asked to do a workshop for a Google event in Thailand.  Normally,
my choice would be to prepare something new and interesting for an audience,
and have had some success in the past...

However, the Google team was keen that instead I should do a run-through
of their pre-made BabyWeights Qwiklab - despite the fact that I expressed 
reservations :

*  I had previously done the lab before, and hardly remember anything about it.  This is a negative

*  What I did remember was more about the frustrations, than the *cool factor*

This quick write-up is just an aide-memoire for me, so that I can plod through
on Saturday without messing up too much.  We'll see how critical it turns out.  Cross-fingers.




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

