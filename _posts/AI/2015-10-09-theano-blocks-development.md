---
date: 2015-10-09
title: Theano and Blocks* in development mode
category: AI
tags:
- theano
- blocks
- git
layout: post
published: true
---
{% include JB/setup %}

Setting up a ```virtualenv``` with Theano and the various Blocks packages 
installed is somewhat involved / repetative.  Here are the steps.

Requirements file
----------------------

Contents of ```requirements.txt``` (this includes commented-out sections that 
could be either (a) useful, or (b) an alternative to the development versions) :

{% highlight bash %}
#pip>7.1.0

#--allow-external theano
#--allow-unverified theano
#git+https://github.com/Theano/Theano.git#egg=theano

##blocks>=0.0.1
#--allow-external blocks
#--allow-unverified blocks
#git+git://github.com/mila-udem/blocks.git

##blocks-extras>=0.0.1
#--allow-external blocks-extras
#--allow-unverified blocks-extras
#git+git://github.com/mila-udem/blocks-extras.git

--allow-external fuel
--allow-unverified fuel
git+https://github.com/mila-udem/fuel#egg=fuel

bokeh>=0.10.0
ipython>=3.1.0
#jsonschema

#gensim

hickle
#attrdict
{% endhighlight %}



Install the base ```virtualenv```
--------------------------------------------

{% highlight bash %}
virtualenv --system-site-package env
. env/bin/activate
pip install --upgrade pip  
pip install -r requirements.txt 
{% endhighlight %}


Add Theano in development mode
=============================================

This assumes that you (as a GitHub user) have forked the main repo into your github account :

{% highlight bash %}
# Set a GITHUB_USER variable appropriately:
#GITHUB_USER=mdda
GITHUB_USER=FILL_IN_YOUR_GITHUB_USERNAME_HERE

pushd env/

# See : http://deeplearning.net/software/theano/dev_start_guide.html

git clone https://github.com/${GITHUB_USER}/Theano.git
pushd Theano

# Set up my github id, so that you get 'credit' in activity map
# ( Obviously, insert your own details here )
git config user.name "Firstname Lastname"
git config user.email USER@example.com


# using 'upstream' rather than 'central' for self-consistency
git remote add upstream git://github.com/Theano/Theano.git

# Create local copy of latest upstream revision (first time)
git fetch upstream
git branch trunk upstream/master

python setup.py develop
theano-cache clear

popd
{% endhighlight %}



Doing some Theano development
--------------------------------------------

{% highlight bash %}
pushd env/Theano

## START DEVELOP (repeat this)
# Update local to latest 
git checkout trunk
git pull

#Update my github to be in sync (not essential), but looks better 
git checkout master
git merge upstream/master
git push

# Work on new feature
git fetch upstream
git checkout -b my_shiny_feature upstream/master

git push -u origin my_shiny_feature
## DONE DEVELOPING

# When PR accepted:
git push origin :my_shiny_feature
git branch -d my_shiny_feature

## LOOP DEVELOP (repeat from above)

popd
{% endhighlight %}



Add Blocks in development mode
=============================================

{% highlight bash %}
# First time 
pip install -e git+https://github.com/${GITHUB_USER}/blocks.git#egg=blocks[test,docs] --src=$HOME/env \
  -r https://raw.githubusercontent.com/mila-udem/blocks/master/requirements.txt
  
pushd env/blocks

# Set up my github id, so that you get 'credit' in activity map
# ( Obviously, insert your own details here )
git config user.name "Firstname Lastname"
git config user.email USER@example.com

# Adding the upstream
git remote add upstream git://github.com/mila-udem/blocks.git

# Create local copy of latest upstream revision (first time)
git fetch upstream
git branch trunk upstream/master

python setup.py develop

popd
{% endhighlight %}

{% highlight bash %}
## See above for DEVELOP START...LOOP
{% endhighlight %}


Add Blocks-extras in development mode
=============================================

{% highlight bash %}
pushd env/

git clone https://github.com/${GITHUB_USER}/blocks-extras.git

pushd blocks-extras

pip install -e .

# Set up my github id, so that you get 'credit' in activity map
# ( Obviously, insert your own details here )
git config user.name "Firstname Lastname"
git config user.email USER@example.com

# Adding the upstream
git remote add upstream git://github.com/mila-udem/blocks-extras.git

# Create local copy of latest upstream revision (first time)
git fetch upstream
git branch trunk upstream/master

## To be investigated (not tried yet) ::
##python setup.py develop

popd
{% endhighlight %}

{% highlight bash %}
## See above for DEVELOP START...LOOP
{% endhighlight %}


Working on Blocks-examples
=============================================

Since this is an 'end-user' package, it doesn't need to be installed : Just work on it!

{% highlight bash %}
git clone https://github.com/${GITHUB_USER}/blocks-examples.git
cd blocks-examples

# Set up my github id, so that you get 'credit' in activity map
# ( Obviously, insert your own details here )
git config user.name "Firstname Lastname"
git config user.email USER@example.com

# Adding the upstream
git remote add upstream git://github.com/mila-udem/blocks-examples.git

# Create local copy of latest upstream revision (first time)
git fetch upstream
git branch trunk upstream/master

{% endhighlight %}

{% highlight bash %}
## See above for DEVELOP START...LOOP
{% endhighlight %}
