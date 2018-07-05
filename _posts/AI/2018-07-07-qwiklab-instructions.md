---
date: 2018-07-07
title: Google Qwiklab Instructions
tagline: More Helpful Version
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


### Redoing Google's materials 

I was asked to do a workshop for a Google event in Thailand.  Normally,
my choice would be to prepare something new and interesting for an audience,
and [have had some success in the past...](http://redcatlabs.com/presentations)

However, the Google team was keen that instead I should do a run-through
of their pre-made BabyWeights Qwiklab - despite the fact that I expressed 
reservations :

*  I had previously done the lab before, and hardly remember anything about it.  This is a negative

*  What I did remember was more about the frustrations, than the *cool factor*

Since the first run through went so badly, here's a version that makes much more sense to me.


#### Load up QwikLabs to get the temporary Cloud Account
   *  Go to 'https://google.qwiklabs.com/focuses/607?parent=catalog'
   *  "Join to Start this Lab".button.click()
   *  Using your own Google account
   *  Accept the Ts&amp;Cs
   *  "Start Lab".button.click()
   *  Enter the special code in the popup (cannot copy-paste, though)
   *  "Launch with Access Code".button.click()  (wait for it...)
   *  Timer starts to count down
   *  New temporary Cloud account credentials on Left hand side
   *  Can minimise the 'Catalog' sidebar using the 'hamburger'
  
   *  Bad instructions are on this page too...


#### Set up the Cloud Account (in incognito mode)
   *  With a new incognito mode browser, load [Google Cloud Console](http://console.cloud.google.com/) with the new credentials
      *   May need to sign out of your existing account
   *  'Use another Account' in account list drop-down
      * New account as email, "Next".button.click()
      * New account password, "Next".button.click()
      * Accept Ts&amp;Cs
      * No need to protect this account (will vanish in 1h25m)
      * No email, Yes to more conditions, "Next".button.click()
   *  Open a terminal (=Cloud Shell, the leftmost icon in top right group)
  
{% highlight bash %}
$ gcloud auth list
          Credentialed Accounts
ACTIVE  ACCOUNT
*       google646468_student@qwiklabs.net
To set the active account, run:
    $ gcloud config set account `ACCOUNT`
{% endhighlight %}
    is correct
    
And set the project : 

{% highlight bash %}
$ gcloud config set project qwiklabs-gcp-84f8f1c4f27f96a8
Updated property [core/project].

$ gcloud config list project
[core]
project = qwiklabs-gcp-84f8f1c4f27f96a8
Your active configuration is: [cloudshell-15818]
{% endhighlight %}

...    is correct
  
#### Enable Dataflow API
   *  Select your project in the top dropdown
   *  Hamburger side-bar : API and Services - Dashboard : Open
   *  Enable APIs and Services
   *  Search for Dataflow
      * Click on panel
      * Say Yes (not test)

Means type 'dataflow' into the search box.  One panel called "DataFlow API - Google" comes up, 
mostly hidden by the Terminal Console.

Click on the overall panel : Something seems to happen (i.e. waiting signs).
A "ENABLE" button appears.  And a "Try this API" button too.

Click "ENABLE" per the instructions (though "trying" sounds appealing)

Now at "Library" page which says : 

    APIs &amp; Services
    Library
    To view this page, select a project.
    
    CREATE-button

This isn't mentioned in the instructions, and doing "CREATE" seems to suggest 
the wrong project id.  So don't follow that route.



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

    Open a [zone/capabilities list](https://cloud.google.com/ml-engine/docs/tensorflow/regions) to cross-reference, 
    let's pick the Asia Pacific Region to have a look.
      Actually, we can't do Cloud Serving from 'asia-east1', so the Region should be 'asia-northeast1'
      We need a "Training" Region - and one that also allows "Online prediction"
      
      Pick a Zone from the previous list : 'asia-northeast1-b'

  Timer : 1h15m


{% highlight bash %}
$ datalab create babyweight --zone asia-northeast1-b
Creating the network datalab-network
Creating the firewall rule datalab-network-allow-ssh
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


  
  While waiting for that...
    
  In the main window, create a new Bucket for data
    Hamburger : Storage - Browser - 'Create Bucket'.button.click()
    'mdda-unique-bucket-20180705'  Regional.  'asia-east1'  'Create'.button.click()
    
    
  Use the + button to open another tab of Cloud Shell
  Copy data into the bucket using the terminal
  
{% highlight bash %}
## Template :
# gsutil cp gs://cloud-training-demos/babyweight/preproc/* gs://<BUCKET>/babyweight/preproc/

$ gsutil cp gs://cloud-training-demos/babyweight/preproc/* gs://mdda-unique-bucket-20180705/babyweight/preproc/

## This is much, much faster :
$ gsutil -m cp gs://cloud-training-demos/babyweight/preproc/* gs://mdda-unique-bucket-20180705/babyweight/preproc/

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


This looks like a warning that you're doing something wrong - but the instructions don't mention
anything about this step.  

  The datarate implies that this takes :
    *  17m27s (for the non-parallel version) 
    *  Unknown/unmetered length of time for the ```-m``` version
  
  
  Start the browser-based DataLab
    Meanwhile, you can look at the previous Cloud Shell, and it should be saying...


Tiny button in top right "Web Preview > Change port." - to 8081 : 'Change and Preview'.button.click()




Ahah!  The DataLab thing is working!

Timer = 1h02m

    
  
Preparing the DataLab
  Clone in code via UnGit
  

"In Datalab, click on the icon for Open ungit in the top-right."  :  =Little Fork Icon

"remove "/notebooks" from the title of the page," (DONE)

'Clone From' (https://github.com/GoogleCloudPlatform/training-data-analyst) -
destination directory is set automatically

Yes : Stuff has been going on in this repo.  (Best not to touch)

Back in the DataLab file page : "Jump to File" : "training-data-analyst/blogs/babyweight/train_deploy.ipynb"
  Needs two clicks
  
  
  
  Go into the notebook, and start executing cells
  
#### Execute training and prediction jobs

Set up the Bucket, Project and Region ids.

{% highlight bash %}
BUCKET = 'mdda-unique-bucket-20180705'
PROJECT = 'qwiklabs-gcp-e98cc244afb926e0'
REGION = 'asia-east1'
{% endhighlight %}

  
  Probably still need to wait for the bucket copy process in the CloudShell to finish (now at 23/43 files) - progress is super-slow
  
  0h57m remaining on clock
  
  Run the '%%bash' copying cell (and wait...) : 
  
{% highlight bash %}
# ... long wait ...
Copying gs://cloud-training-demos/babyweight/trained_model_tuned/model.ckpt-571432.index...
Copying gs://cloud-training-demos/babyweight/trained_model_tuned/model.ckpt-571432.meta...
- [609/609 files][  6.1 GiB/  6.1 GiB] 100% Done  12.6 MiB/s ETA 00:00:00       
Operation completed over 609 objects/6.1 GiB.    
{% endhighlight %}

  i.e. That took 484secs = 8 minutes
  
  0h49m remaining on clock
  
  # Now the actual Machine Learning can start...
  
  Seems like "estimator = tf.estimator.DNNLinearCombinedRegressor"
  
  
  Cloud ML Engine : 
    Hamburger - Big Data - ML Engine - Jobs
      View Logs is interesting (takes a while for training &amp; evaluation phases to start)
      "Task completed successfully."
      Not sure whether pressing Stop is a good idea
    
    Click to open TensorBoard : WooHoo!
    
    .. says wait to finish, but we see in logs : 
      "SavedModel written to: gs://mdda-unique-bucket-20180705/babyweight/trained_model/export/exporter/temp-1530782684/saved_model.pb"
      "..."
      "Task completed successfully."
  
    Deploying to serve a REST API ::
    """
      ERROR: (gcloud.ml-engine.models.create) INVALID_ARGUMENT: Field: model.regions 
      Error: The provided GCE region 'asia-east1' is not available. Options are [asia-northeast1, europe-west1, us-central1, us-east1].
    """
    
    Clearly, we made a bad choice 1 hour ago...


  0h33m remaining on clock - but giving up since the Region was wrong at the very start.
  


### <strike>Deploy the ML model as a web service</strike>  (WRONG REGION)

### <strike>Make predictions with the model</strike>  (WRONG REGION)

----

# Better, but still *SAD*

