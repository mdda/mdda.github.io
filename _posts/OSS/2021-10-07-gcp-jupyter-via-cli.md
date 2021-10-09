---
date: 2021-10-07
title: Adding Firewalled Jupyter to a GCP VM 
category: OSS
tags:
- tensorflow
- pytorch
- cloud
- jupyter
- gcp
- deeplearning
layout: post
published: true
---
{% include JB/setup %}

### Adding Firewalled Jupyter to a GCP VM
####  Everything from CLI

This is a short-but-complete guide to setting up a Jupyter instance on GCP.  

Clearly this has been done before, but I wanted to have my own notes on the process, and
also didn't want to have to mess with the Console UI.

The Jupyter set-up below is scriptable.

>   If you don't need the `jupyter` instance to be available to anyone else (i.e. access from your local
>   machine is all you need), please see my follow-up post about doing this _behind the firewall_.  This
>   method will also allow you to run `tensorboard` safely, and mount your VM drives locally too (useful
>   for editing files directly in a local IDE).


### Use an existing GCP VM

( To see how to do this - even if only for the `gcloud instance create ...` command - please see my
[Building a reusable Deep Learning VM on Google Cloud](/oss/2021/10/05/gcp-deep-learning-machine-everything) post ).

{% highlight bash %}
export PROJECT_NAME="my-special-project"
gcloud config set project ${PROJECT_NAME}
export INSTANCE_NAME="deep-learning-vm1"
{% endhighlight %}

Then start the machine and `ssh` into it:

{% highlight bash %}
gcloud compute instances start ${INSTANCE_NAME}
gcloud compute ssh ${INSTANCE_NAME}
{% endhighlight %}


### Create a local `venv` for python

The following is copied from [Building a reusable Deep Learning VM on Google Cloud](/oss/2021/10/05/gcp-deep-learning-machine-everything) post :

{% highlight bash %}
sudo apt install -y python3.8-venv
python3.8 -m venv env38 

. env38/bin/activate

pip install --upgrade pip

{% endhighlight %}



### One-time install of jupyter

Once you have a `venv` installed (assumed to be named as above).

*  See the [Jupyter Docs](https://jupyter-notebook.readthedocs.io/en/stable/public_server.html#running-a-public-notebook-server) for reference:

{% highlight bash %}
. env38/bin/activate

pip install jupyter
jupyter notebook --generate-config
#  `/home/USERNAME/.jupyter/jupyter_notebook_config.py`
{% endhighlight %}


### Set up SSL certificates for extra security

This may be security theatre, though, since the certificates are untrusted, though
I guess it prevents over-the-wire snooping of the Jupyter code...

   
{% highlight bash %}
USER=`whoami` && openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
   -keyout /home/${USER}/.jupyter/mykey.key -out /home/${USER}/.jupyter/mycert.pem \
   -subj "/C=SG/ST=Singapore/L=Singapore/O=RedDragonAI /OU=AI Department/CN=reddragon.ai"
{% endhighlight %}


### Set up SSL certificates for extra security

Add default configuration to `~/.jupyter/jupyter_notebook_config.py` :

{% highlight bash %}
USER=`whoami` && echo "
c.NotebookApp.certfile = u'/home/${USER}/.jupyter/mycert.pem'
c.NotebookApp.keyfile  = u'/home/${USER}/.jupyter/mykey.key'
c.NotebookApp.ip = '*'
c.NotebookApp.open_browser = False
c.NotebookApp.port = 8585
c.NotebookApp.notebook_dir = '.'
   " >> /home/${USER}/.jupyter/jupyter_notebook_config.py
{% endhighlight %}
  

### Add a firewall rule to allow access from the internet

On the local machine, set up a firewall rule so you have access to the Jupyter port on the VM.

* See the [GCP documentation](https://cloud.google.com/sdk/gcloud/reference/compute/firewall-rules/create) for reference:

{% highlight bash %}
gcloud compute firewall-rules list

# Applies rule to all instances in project :
gcloud compute firewall-rules create jupyter-service --allow=tcp:8585 --direction=INGRESS --description="Jupyter access"

# Check that it's there:
gcloud compute firewall-rules list
{% endhighlight %}


### Launch Jupyter on the server

Since we've set up the default `notebook-dir` and other command-line options in the configuration, 
`jupyter` should work from whereever you launch it:

{% highlight bash %}
. env38/bin/activate

jupyter notebook
{% endhighlight %}

This will (until you _optionally_ add a password using the Jupyter browser GUI) give you
something like : `token=437abd35ddXXXXd9579f5bd6bc16596acYYYYe180b60e3e9` that you should 'grab' somehow (to paste into the browser later).


### Get the Server IP address

Find the IP address of the server, either:

* From the GCP control panel (as 'external IP'); or
* By running the following on the local machine :

{% highlight bash %}
gcloud compute instances describe ${INSTANCE_NAME} --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
{% endhighlight %}


### Launch Jupyter in the browser

Now you can get to the running instance : 

* Browse to `http://SERVER_IP:8585/` 
  + When you get a 'Your connection is not private' warning, 
    allow for _unsafe browsing_ (since the SSL certificate we made above was not signed by
    one of the chains that browers are configured with)
    by pressing the 'Advanced' button and then clicking 'Proceed to `SERVER_IP` (unsafe)'
  + Use the 'key' that your Jupyter server suggests, so that your Jupyter session cannot be stumbled upon by 
    others on the internet (unless you also tell them the token which has ~48 hex-digits)
  + _Optionally_ : Create a simpler password so that you can access `jupyter` sessions key-less next time


### Terminate the GCP VM when done...

{% highlight bash %}
gcloud compute instances stop ${INSTANCE_NAME}
{% endhighlight %}


Once completely finished with messing around with the VM/project, kill off the firewall rule too:

{% highlight bash %}
gcloud compute firewall-rules delete jupyter-service
{% endhighlight %}


### End

All done!



