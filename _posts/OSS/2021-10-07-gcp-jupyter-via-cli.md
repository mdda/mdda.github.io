---
date: 2021-10-07
title: Adding Jupyter to a GCP VM 
category: OSS
tags:
- tensorflow
- pytorch
- cloud
- gcp
- deeplearning
layout: post
published: false
---
{% include JB/setup %}

### Adding Jupyter to a GCP VM 
####  Everything from CLI

This is a short-but-complete guide to setting up a Jupyter instance on GCP.  

Clearly this has been done before, but I wanted to have my own notes on the process, and
also didn't want to have to mess with the Console UI.

The Jupyter set-up below is scriptable.


### Use an existing GCP VM

{% highlight bash %}
export PROJECT_NAME="my-special-project"
gcloud config set project ${PROJECT_NAME}
export INSTANCE_NAME="deep-learning-vm1"
{% endhighlight %}


### One-time install of jupyter

*  (https://jupyter-notebook.readthedocs.io/en/stable/public_server.html#running-a-public-notebook-server)

{% highlight bash %}
pip install jupyter
jupyter notebook --generate-config
#  `/home/USERNAME/.jupyter/jupyter_notebook_config.py`
{% endhighlight %}


### Set up SSL certificates for extra security

(This may be security theatre, though, since the certificates are untrusted, though
I guess it prevents over-the-wire snooping of the Jupyter code?)

   
{% highlight bash %}
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./.jupyter/mykey.key -out ./.jupyter/mycert.pem \
   -subj "/C=SG/ST=Singapore/L=Singapore/O=RedDragonAI /OU=AI Department/CN=reddragon.ai"

USER=`whoami` && echo "
c.NotebookApp.certfile = u'/home/${USER}/.jupyter/mycert.pem'
c.NotebookApp.keyfile  = u'/home/${USER}/.jupyter/mykey.key'
c.NotebookApp.ip = '*'
c.NotebookApp.open_browser = False
c.NotebookApp.port = 8888
   " >> /home/${USER}/.jupyter/jupyter_notebook_config.py
{% endhighlight %}
  

### Add a firewall rule to allow access from the internet
 
* (https://cloud.google.com/sdk/gcloud/reference/compute/firewall-rules/create)

{% highlight bash %}
gcloud compute firewall-rules list

# Applies rule to all instances in project :
gcloud compute firewall-rules create jupyter-service --allow=tcp:8888 --direction=INGRESS --description="Jupyter access"
# --source-tags=${INSTANCE_NAME} 

# Once completely finished with messing around, kill off this rule:
#gcloud compute firewall-rules delete jupyter-service
{% endhighlight %}


### End

All done!



