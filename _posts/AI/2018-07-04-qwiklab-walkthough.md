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

#### Start from scratch


*  """Thanks for volunteering to teach the ['Baby-weight prediction'](https://google.piqwiklabs.com/focuses/607) tutorial in Qwiklabs on Sat, July 8th. """

*  For you to prepare, please use the following access code : bd35-dead-beef-2015

   * New browser window : "Sorry, access denied to this resource."
   * Sign into Qwiklabs : Wants an email or a Google Login  (chose Google)
   * Must accept the 4000+ word "Qwiklabs Terms of Service" (I Accept)
   
   * "You don't have any history yet! Enroll in an instructor-led course, get started on a self-paced course, or take a short lab to get started."
   * My Account - Credits & Subscriptions - "Buy Credits or Subscriptions" button
   * Tiny link near bottom : "Have Promo Code?" (enter 'access' code given - hopefully it's a 'promo' code)
   * FAILURE

   * Look at [See how to apply a Qwiklab access code](https://docs.google.com/presentation/d/1pDE_LOj2-0HWWxWzLD_fY_TcF1DOQ0is49ocXYJFojQ/edit?usp=sharing) : 1 Page Presentation
   * "go to the Course or the codelab you wish to use" : (Search for "baby" in the Search Bar)
   * Pick third link shown (only one with "baby" in the title)
   * "Start Lab"-button -> "Enter Lab Access Code" (Cannot copy-paste code)
   * Type in code from email : Press button
   * Button didn't seem to work, press it again
   * QwikLab counter seems to start to go down, but there's a big red box at the top of the page :
     *  "Sorry, this token was already used by Martin on Wed, 04 Jul 2018 11:05:33 -0400" = Sigh, pressing on..?
  
   *  Presentation now says : "Qwiklabs generates a new temporary Google Account for you"
   *  Is this the stuff on the Left Hand side?
   *  As instructed open a new Incognito Window, and goto the [Google Cloud Console](http://console.cloud.google.com/) there
   *  Agree to the terms of Service
   *  But it already chose one of my existing accounts, not the new, temporary. one
      *  Sign Out (?)
   *  Account = Pull-down to "Use another account"
      *  Use (randomised) username and password : "Welcome to your new account"
      *  Accept large T&amp;Cs paragraph
      *  "Protect your account" : nope, don't need.  "Done"
   *  Agree to the terms of Service (for temporary account) : "Agree and Continue"
   *  New account creation process took 10mins of the QwikLabs time
   
   *  Use the Hamburger in Top Left to shrink 'Catalog' sidebar
   *  Use little arrow on Bottom Left to shrink 'Connection Details' sidebar
   *  AHAH!  Now the QwikLabs thing fits on my laptop screen at regular 100% size
   
   *  Finally, on to the Lab itself...
   

### Launch Cloud Datalab



### Carry out local training

### Carry out distributed training

### Deploy the ML model as a web service

### Make predictions with the model





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

