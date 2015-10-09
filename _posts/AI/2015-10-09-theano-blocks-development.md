---
date: 2015-10-09
title: Skype on Fedora 22 with Nvidia GPU
category: AI
tags:
- theano
- blocks
- git
layout: post
published: false
---
{% include JB/setup %}



{% highlight bash %}
virtualenv --system-site-package env
. env/bin/activate
pip install --upgrade pip
pip install -r Env-theano.requirements.txt 
{% endhighlight %}


pushd env/

# See : http://deeplearning.net/software/theano/dev_start_guide.html

git clone https://github.com/mdda/Theano.git
pushd Theano

# Set up my github id, so that I get 'credit' in activity map
git config user.name "Martin Andrews"
git config user.email GitHub@mdda.net

# using 'upstream' rather than 'central' for self-consistency
git remote add upstream git://github.com/Theano/Theano.git

# Create local copy of latest upstream revision (first time)
git fetch upstream
git branch trunk upstream/master

python setup.py develop
theano-cache clear

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


## Now for Blocks

# First time 
pip install -e git+https://github.com/mdda/blocks.git#egg=blocks[test,docs] --src=$HOME/env \
  -r https://raw.githubusercontent.com/mila-udem/blocks/master/requirements.txt
  
pushd blocks

# Set up my github id, so that I get 'credit' in activity map
git config user.name "Martin Andrews"
git config user.email GitHub@mdda.net

# Adding the upstream
git remote add upstream git://github.com/mila-udem/blocks.git

# Create local copy of latest upstream revision (first time)
git fetch upstream
git branch trunk upstream/master

python setup.py develop

## See above for DEVELOP START...LOOP

popd


## Now for Blocks-extras

git clone https://github.com/mdda/blocks-extras.git

pushd blocks-extras

pip install -e .

# Set up my github id, so that I get 'credit' in activity map
git config user.name "Martin Andrews"
git config user.email GitHub@mdda.net

# Adding the upstream
git remote add upstream git://github.com/mila-udem/blocks-extras.git

# Create local copy of latest upstream revision (first time)
git fetch upstream
git branch trunk upstream/master

##python setup.py develop

## See above for DEVELOP START...LOOP

popd

#git clone https://github.com/mdda/blocks-examples.git
#git remote add upstream git://github.com/mila-udem/blocks-examples.git
