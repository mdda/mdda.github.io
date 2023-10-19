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
published: true
---
{% include JB/setup %}

### Quick route for linux command line 

#### (A somewhat critical look at Google's materials)

I was asked to do a workshop for a Google event in Thailand.  Normally,
my choice would be to prepare something new and interesting for an audience,
and [have had some success in the past...](http://redcatlabs.com/presentations)

However, the Google team was keen that instead I should do a run-through
of their pre-made BabyWeights Qwiklab - despite the fact that I expressed 
reservations :

*  I had previously done the lab before, and hardly remember anything about it.  This is a negative

*  What I did remember was more about the frustrations, than the *cool factor*

This quick write-up is just an aide-memoire for me, so that I can go through
on Saturday without messing up too much.  We'll see how critical it turns out.  Cross-fingers.

#### Start from scratch

*  From the email : 

>    "Thanks for volunteering to teach the ['Baby-weight prediction'](https://google.piqwiklabs.com/focuses/607) 
>    tutorial in Qwiklabs on Sat, July 8th. 
>    For you to prepare, please use the following access code : ```bd35-dead-beef-2015```"


*  Following the email link :
  *  New browser window : "Sorry, access denied to this resource."
  *  Sign into Qwiklabs : Wants an email or a Google Login  (chose Google)
  *  Must accept the 4000+ word "Qwiklabs Terms of Service" (I Accept)

   
  *  "You don't have any history yet! Enroll in an instructor-led course, get started on a self-paced course, or take a short lab to get started."
  *  My Account - Credits & Subscriptions - "Buy Credits or Subscriptions" button
  *  Tiny link near bottom : "Have Promo Code?" (enter 'access' code given - hopefully it's a 'promo' code)
  *  FAILURE


  *  Look at [See how to apply a Qwiklab access code](https://docs.google.com/presentation/d/1pDE_LOj2-0HWWxWzLD_fY_TcF1DOQ0is49ocXYJFojQ/edit?usp=sharing) : 1 Page Presentation
  *  "go to the Course or the codelab you wish to use" : (Search for "baby" in the Search Bar)
  *  Pick third link shown (only one with "baby" in the title)
  *  "Start Lab"-button -> "Enter Lab Access Code" (Cannot copy-paste code)
    *  Type in code from email : Press button
    *  Button didn't seem to work, press it again
  *  QwikLab counter seems to start to go down, but there's a big red box at the top of the page :
    *  "Sorry, this token was already used by Martin on Wed, 04 Jul 2018 11:05:33 -0400" = Sigh, pressing on..?


*  Presentation now says : "Qwiklabs generates a new temporary Google Account for you"
  *  Is this the stuff on the Left Hand side?
  *  As instructed, open a new Incognito Window, and go to the [Google Cloud Console](http://console.cloud.google.com/) there
  *  Agree to the terms of Service
  *  But it already chose one of my existing accounts, not the new, temporary. one
    *  Sign Out (?)


  *  Account = Pull-down to "Use another account"
    *  Use (randomised) username and password : "Welcome to your new account"
    *  Accept large T&amp;Cs paragraph
    *  "Protect your account" : nope, don't need.  "Done"
  *  Agree to the terms of Service (for temporary account) : "Agree and Continue"
  *  New account creation process took 10mins of the QwikLabs time


*  Now seem to be signed in :    
  *  Use the Hamburger in Top Left to shrink 'Catalog' sidebar
  *  Use little arrow on Bottom Left to shrink 'Connection Details' sidebar
  *  AHAH!  Now the QwikLabs thing fits on my laptop screen at regular 100% size


  *  Finally, on to the Lab itself...
    *  Why does the Lab timer keep jumping down?  My machine is not under any load


  *  Instructions now state : 
    *  "If you already have your own GCP account, make sure you do not use it for this lab."
  *  Ohhh : Now I see that the instructions are actually on *this page*, just several page-downs away


### Launch Cloud Datalab

*  In the Incognito (new user) window, use the leftmost tiny icon on the top right to:
   *  Open a dialog box with an animation, which seems to be typing stuff into a shell for me
   *  Decide that it's "fake", and press "Start Cloud Shell" highlighted text at the bottom
  
*  Apparently, I should type in the text in the black boxes : 
   *  ```gcloud auth list``` : Seems to produce output

{% highlight bash %}
$ gcloud auth list
          Credentialed Accounts
ACTIVE  ACCOUNT
*       google646468_student@qwiklabs.net
To set the active account, run:
    $ gcloud config set account `ACCOUNT`
{% endhighlight %}

The account does seem to be active, but looks different from the instructions.  Puzzling.

{% highlight bash %}
$ gcloud config list project
ERROR: (gcloud.config.list) The project property is set to the empty string, which is invalid.
To set your project, run:
  $ gcloud config set project PROJECT_ID
or to unset it, run:
  $ gcloud config unset project
{% endhighlight %}


Hmmm : so this seems to be untrue : 

>    "Once connected to the cloud shell, you'll see that you are already authenticated 
>    and the project is set to your PROJECT_ID:"


Attempt to fix it (using the project id in the sidepane that the instructions told me to hide)

{% highlight bash %}
$ gcloud config set project qwiklabs-gcp-84f8f1c4f27f96a8
Updated property [core/project].

$ gcloud config list project
[core]
project = qwiklabs-gcp-84f8f1c4f27f96a8
Your active configuration is: [cloudshell-15818]
{% endhighlight %}


This looks better.


#### Enable Dataflow API

>    "On the Console, enable the Dataflow API by selecting APIs &amp; Services > Library from the left menu"

So this does not refer to the Console terminal.  But apparently the whole cloud webpage is the Console.

>    "On the dashboard search  for 'dataflow'."

Means type 'dataflow' into the search box.  One panel called "DataFlow API - Google" comes up, 
mostly hidden by the Terminal Console.

Click on the overall panel : Something seems to happen (i.e. waiting signs).
A "ENABLE" button appears.  And a "Try this API" button too.

Click "ENABLE" per the instructions (though "trying" sounds appealing)

Now at "Library" page which says : 

* APIs &amp; Services
* Library
* To view this page, select a project.
    
* CREATE-button

This isn't mentioned in the instructions, and doing "CREATE" seems to suggest 
the wrong project id.  So don't follow that route.


### Launch Cloud Datalab (for real this time?)

{% highlight bash %}
$ gcloud compute zones list
NAME                       REGION                   STATUS  NEXT_MAINTENANCE  TURNDOWN_DATE
us-east1-b                 us-east1                 UP
us-east1-c                 us-east1                 UP
us-east1-d                 us-east1                 UP
us-east4-c                 us-east4                 UP
us-east4-b                 us-east4                 UP
us-east4-a                 us-east4                 UP
us-central1-c              us-central1              UP
us-central1-a              us-central1              UP
us-central1-f              us-central1              UP
us-central1-b              us-central1              UP
us-west1-b                 us-west1                 UP
us-west1-c                 us-west1                 UP
us-west1-a                 us-west1                 UP
europe-west4-a             europe-west4             UP
europe-west4-b             europe-west4             UP
europe-west4-c             europe-west4             UP
europe-west1-b             europe-west1             UP
europe-west1-d             europe-west1             UP
europe-west1-c             europe-west1             UP
europe-west3-b             europe-west3             UP
europe-west3-c             europe-west3             UP
europe-west3-a             europe-west3             UP
europe-west2-c             europe-west2             UP
europe-west2-b             europe-west2             UP
europe-west2-a             europe-west2             UP
asia-east1-b               asia-east1               UP
asia-east1-a               asia-east1               UP
asia-east1-c               asia-east1               UP
asia-southeast1-b          asia-southeast1          UP
asia-southeast1-a          asia-southeast1          UP
asia-southeast1-c          asia-southeast1          UP
asia-northeast1-b          asia-northeast1          UP
asia-northeast1-c          asia-northeast1          UP
asia-northeast1-a          asia-northeast1          UP
asia-south1-c              asia-south1              UP
asia-south1-b              asia-south1              UP
asia-south1-a              asia-south1              UP
australia-southeast1-b     australia-southeast1     UP
australia-southeast1-c     australia-southeast1     UP
australia-southeast1-a     australia-southeast1     UP
southamerica-east1-b       southamerica-east1       UP
southamerica-east1-c       southamerica-east1       UP
southamerica-east1-a       southamerica-east1       UP
europe-north1-a            europe-north1            UP
europe-north1-b            europe-north1            UP
europe-north1-c            europe-north1            UP
northamerica-northeast1-a  northamerica-northeast1  UP
northamerica-northeast1-b  northamerica-northeast1  UP
northamerica-northeast1-c  northamerica-northeast1  UP
{% endhighlight %}


Wowza, that's a long list that scrolls off the page quickly.

How do I pick a zone?  I need to open a [zone/capabilities list](https://cloud.google.com/ml-engine/docs/tensorflow/regions) to cross-reference,
let's pick the Asia Pacific Region to have a look.

But I need to know whether I'm going to be doing :
*  Training (DEFINITELY)
*  Training with GPUs (SOUNDS NICE)
*  Online Prediction (HMMM - aren't we going to be predicting Baby Weights Online?)
*  Batch Prediction

Nothing say "ML Engine" - but nor do the other regions, 
so it's not just me.

Let's try the first one that looks good "asia-east1" (for 'Training', 
but it's not ticked for 'Online Prediction', which is worrying).

{% highlight bash %}
$ datalab create babyweight --zone asia-east1
Creating the network datalab-network
#  Awkward pause 
Creating the firewall rule datalab-network-allow-ssh
#  Awkward pause 
Creating the disk babyweight-pd
ERROR: (gcloud.compute.disks.create) Could not fetch resource:
 - Invalid value for field 'zone': 'asia-east1'. Unknown zone.
A nested call to gcloud failed, use --verbosity=debug for more info.
{% endhighlight %}


Ahhh - perhaps I should look up something in the first column that matches the Region 
given as a column heading in the Available Regions table: 'asia-east1-b' fits the bill.

{% highlight bash %}
$ datalab create babyweight --zone asia-east1
Creating the disk babyweight-pd
Creating the repository datalab-notebooks
Creating the instance babyweight
Created [https://www.googleapis.com/compute/v1/projects/qwiklabs-gcp-84f8f1c4f27f96a8/zones/asia-east1-b/instances/babyweight].
Connecting to babyweight.
This will create an SSH tunnel and may prompt you to create an rsa key pair. To manage these keys, see https://cloud.google.com/compute/docs/instances/adding
-removing-ssh-keys
Waiting for Datalab to be reachable at http://localhost:8081/
This tool needs to create the directory
[/home/google646468_student/.ssh] before being able to generate SSH keys.
Do you want to continue (Y/n)?
{% endhighlight %}


This looks a lot more promising.  

  "You will get a SSH warning. Click Y to continue, and Enter through the passphrase questions. Datalab is ready when you see a message prompting you to use Web Preview to start using Datalab."

{% highlight bash %}
Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/google646468_student/.ssh/google_compute_engine.
Your public key has been saved in /home/google646468_student/.ssh/google_compute_engine.pub.
The key fingerprint is:
SHA256:d10RTDpGREALLY?JHma1QEdMi2QFRCJj1rQ google646468_student@cs-6000-devshell-vm-5c0nfeffe-b2bd-43b4-a8cc-83d3fa4fc485
The key's randomart image is:
+---[RSA 2048]----+
|       =ooo*==++.|
|      o o.o +oo+.|
|         E o.*+ .|
|          .0O0.. |
|        S .+++.  |
|         . oo .  |
|          .+B.   |
|          o%o+   |
|          =+*o.  |
+----[SHA256]-----+
Updating project ssh metadata.../Updated [https://www.googleapis.com/compute/v1/projects/qwiklabs-gcp-84f8f1c4f27f96a8].
Updating project ssh metadata...done.
Waiting for SSH key to propagate.
#  Awkward pause 

#  Eventually this appears (while trying to do the next steps):
The connection to Datalab is now open and will remain until this command is killed.
Click on the *Web Preview* (square button at top-right), select *Change port > Port 8081*, and start using Datalab.
{% endhighlight %}


   "Datalab will take about 5 minutes to start."

Ok. so let's keep going

   "In the Console, go to Products & services > Storage. Create a bucket that is regional, and match the Location to region as the VM you just made. "
   
   
Hmmm.  Doesn't seem to be anything called that in the Left Hand Side panel.

How about "Select a Project" from the top bar?  There are two projects available :
   *  QwikLab resources
   *  A project id that could be mine  (Clicked this one)

Not sure that did anything.  Nothing has changed on the Left Sidebar.

Next attempt : "Storage-Browser"
*  Leads me to "Buckets" with a "Create Bucket" button.  Looks promising
*  "Create a bucket" : "Name Must be unique across Cloud Storage. If you’re serving website content, enter the website domain as the name."
*  Flying blind now - pick a bucket name at random "random-bucket-name-please"
*  Regional (Checked) and "asia-east1" picked from long selection box
*  "Create"-button (Clicked) : Some activity
*  Now at a kind of upload/file list page

"Use the + button to open another tab of Cloud Shell" : Ahh - why didn't you tell me about this before?

Code template to enter the bucket name wraps...

{% highlight bash %}
# gsutil cp gs://cloud-training-demos/babyweight/preproc/* gs://<BUCKET>/babyweight/preproc/
$ gsutil cp gs://cloud-training-demos/babyweight/preproc/* gs://random-bucket-name-please/babyweight/preproc/

Copying gs://cloud-training-demos/babyweight/preproc/eval.csv-00000-of-00012 [Content-Type=text/plain]...
Copying gs://cloud-training-demos/babyweight/preproc/eval.csv-00001-of-00012 [Content-Type=text/plain]...
Copying gs://cloud-training-demos/babyweight/preproc/eval.csv-00002-of-00012 [Content-Type=text/plain]...
Copying gs://cloud-training-demos/babyweight/preproc/eval.csv-00003-of-00012 [Content-Type=text/plain]...
/ [4 files][154.1 MiB/154.1 MiB]    1.0 MiB/s
==> NOTE: You are performing a sequence of gsutil operations that may
run significantly faster if you instead use gsutil -m -o ... Please
see the -m section under "gsutil help options" for further information
about when gsutil -m can be advantageous.
Copying gs://cloud-training-demos/babyweight/preproc/eval.csv-00004-of-00012 [Content-Type=text/plain]...
/ [4 files][154.1 MiB/321.6 MiB]    1.0 MiB/s

# VERY LONG WAIT

\ [55 files][  5.7 GiB/  5.7 GiB]    5.5 MiB/s
==> NOTE: You are performing a sequence of gsutil operations that may
run significantly faster if you instead use gsutil -m -o ... Please
see the -m section under "gsutil help options" for further information
about when gsutil -m can be advantageous.
Operation completed over 55 objects/5.7 GiB.
{% endhighlight %}


That looks like a warning that I'm doing something wrong - but the instructions don't mention
anything about this step.  So I'll just let it continue

*Just a mo : There are only 23 minutes left to complete this thing...*

Copying these files is like several Gb of data.  And the speed *sucks*.  Is it normally this slow?

Why are there 43 files of babyweight data?  *I just want to play around with a DataLab.*  
And this QwikLab is so slow &amp; confusing that I'll run out of time before even getting to the notebook.


#### Checkout notebook into Cloud Datalab

Will something happen now?  Only ... minutes left : Except the counter has reset to 1:30:00 
(though there should be about 15mins left) - probably because I backbuttoned, and the state was lost.

"Web Preview > Change port." - to 8081 : (DONE)

Ahah!  The DataLab thing is working!

"In Datalab, click on the icon for Open ungit in the top-right."  :  UnGit???  (DONE)

"remove "/notebooks" from the title of the page," (DONE)

'Clone From' (https://github.com/GoogleCloudPlatform/training-data-analyst) (DONE)

Blimey : Stuff has been going on in this repo.  (Best not to touch)

Back in the DataLab file page : "Jump to File" : "training-data-analyst/blogs/babyweight/train_deploy.ipynb" (DONE)


#### Execute training and prediction jobs

Set up the Bucket, Project and Region ids.

{% highlight bash %}
BUCKET = 'random-bucket-name-please'
PROJECT = 'qwiklabs-gcp-84f8f1c4f27f96a8'
REGION = 'asia-east1'
{% endhighlight %}


But doesn't the cell "gsutil -m cp -R gs://cloud-training-demos/babyweight gs://${BUCKET}" 
essentially re-do what I did on the command line (which took *ages*)?

{% highlight bash %}
# ... long wait ...
Copying gs://cloud-training-demos/babyweight/trained_model_tuned/model.ckpt-571432.index...
Copying gs://cloud-training-demos/babyweight/trained_model_tuned/model.ckpt-571432.meta...
- [609/609 files][  6.1 GiB/  6.1 GiB] 100% Done  12.6 MiB/s ETA 00:00:00       
Operation completed over 609 objects/6.1 GiB.    
{% endhighlight %}


How am I meant to get through this notebook in 15 minutes?

### Carry out local training

Just pressing Ctrl-Enter repeatedly now, since there's no time to read the cells...


```import tensorflow``` cell : 

{% highlight bash %}
/usr/local/envs/py2env/lib/python2.7/site-packages/h5py/__init__.py:36: RuntimeWarning: numpy.dtype size changed, may indicate binary incompatibility. Expected 96, got 88
  from ._conv import register_converters as _register_converters
/usr/local/envs/py2env/lib/python2.7/site-packages/h5py/__init__.py:36: FutureWarning: Conversion of the second argument of issubdtype from `float` to `np.floating` is deprecated. In future, it will be treated as `np.float64 == np.dtype(float).type`.
  from ._conv import register_converters as _register_converters
/usr/local/envs/py2env/lib/python2.7/site-packages/h5py/_hl/group.py:22: RuntimeWarning: numpy.dtype size changed, may indicate binary incompatibility. Expected 96, got 88
  from .. import h5g, h5i, h5o, h5r, h5t, h5l, h5p
/usr/local/envs/py2env/lib/python2.7/site-packages/scipy/ndimage/measurements.py:36: RuntimeWarning: numpy.dtype size changed, may indicate binary incompatibility. Expected 96, got 88
  from . import _ni_label
/usr/local/envs/py2env/lib/python2.7/site-packages/simplejson/encoder.py:286: DeprecationWarning: Interpreting naive datetime as local 2018-07-04 16:30:35.570388. Please add timezone info to timestamps.
  chunks = self.iterencode(o, _one_shot=True)
{% endhighlight %}


At the training step : 

{% highlight bash %}
/usr/local/envs/py2env/lib/python2.7/site-packages/sklearn/utils/__init__.py:10: RuntimeWarning: numpy.dtype size changed, may indicate binary incompatibility. Expected 96, got 88
  from .murmurhash import murmurhash3_32
/usr/local/envs/py2env/lib/python2.7/site-packages/sklearn/utils/extmath.py:24: RuntimeWarning: numpy.dtype size changed, may indicate binary incompatibility. Expected 96, got 88
  from ._logistic_sigmoid import _log_logistic_sigmoid
/usr/local/envs/py2env/lib/python2.7/site-packages/sklearn/metrics/cluster/supervised.py:23: RuntimeWarning: numpy.dtype size changed, may indicate binary incompatibility. Expected 96, got 88
  from .expected_mutual_info_fast import expected_mutual_information
/usr/local/envs/py2env/lib/python2.7/site-packages/sklearn/metrics/pairwise.py:30: RuntimeWarning: numpy.dtype size changed, may indicate binary incompatibility. Expected 96, got 88
  from .pairwise_fast import _chi2_kernel_fast, _sparse_manhattan
{% endhighlight %}


Looks like something happened :

{% highlight bash %}
!ls babyweight_trained
checkpoint				     model.ckpt-1000.index
eval					     model.ckpt-1000.meta
events.out.tfevents.1530721891.7286677d5bcc  model.ckpt-1.data-00000-of-00001
export					     model.ckpt-1.index
graph.pbtxt				     model.ckpt-1.meta
model.ckpt-1000.data-00000-of-00001
{% endhighlight %}



### Carry out distributed training

Is that's what's happening here?  :

{% highlight bash %}
Removing gs://random-bucket-name-please/babyweight/trained_model/model.ckpt-390628.meta#1530721709406785...
/ [58/58 objects] 100% Done                                                     
Operation completed over 58 objects.                                             
Job [babyweight_180704_163436] submitted successfully.
Your job is still active. You may view the status of your job with the command

  $ gcloud ml-engine jobs describe babyweight_180704_163436

or continue streaming the logs with the command

  $ gcloud ml-engine jobs stream-logs babyweight_180704_163436
/usr/local/envs/py2env/lib/python2.7/site-packages/simplejson/encoder.py:286: DeprecationWarning: Interpreting naive datetime as local 2018-07-04 16:34:36.878487. Please add timezone info to timestamps.
  chunks = self.iterencode(o, _one_shot=True)
{% endhighlight %}


... No idea, the connection just timed out.

   *"The connection to your Google Cloud Shell was lost. "*



### <strike>Deploy the ML model as a web service</strike>  (OUT OF TIME)

### <strike>Make predictions with the model</strike>  (OUT OF TIME)

----

# LEARNING FAILURE

