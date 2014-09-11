---
comments: true
date: 2012-02-21 18:00:17+00:00
title: Moving folder and history between git repos
category: OSS
wordpress_id: 515
wp_parent: '0'
wp_slug: moving-between-git-repos
tags:
- git
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


**Problem** : One part of a git-tracked repo has become an independent project in its own right.  Moreover, there's no need for participants in that project to have access to the rest of the repo.  

**Idea** : Move the independent project out into a separate git repo, preserving all the commit history.

Huge props to the following :



	
  * http://gbayer.com/development/moving-files-from-one-git-repository-to-another-preserving-history/ 

	
  * http://st-on-it.blogspot.com/2010/01/how-to-move-folders-between-git.html 



Initially : Create a fresh clone of the source repo (this will be removed later : don't do this on a working copy, just in case everything goes awry): 


{% highlight bash %}
bash
git clone git@git.EXAMPLE.com:sketchpad.git
cd sketchpad/
{% endhighlight %}
Now, let's filter everything in the directory 'android-edutiger' out of this local copy - all the changes from here are what will be moved across (disconnect from the main repo) :


{% highlight bash %}
bash
git filter-branch --subdirectory-filter android-edutiger -- -- all
git remote rm origin
{% endhighlight %}
Now, create a new directory, and move all the relevant files into it :


{% highlight bash %}
bash
mkdir android-native
git mv AndroidManifest.xml android-native/
git mv Notes.txt android-native/
git mv pro* android-native/
git mv res android-native/
git mv src android-native/
git commit -a -m "Moved into directory prior to moving repo"
{% endhighlight %}
Now go into the new repo 'separated-out' and pull the stuff over from the local remote (which we'll temporarily name "SKETCHPAD") :


{% highlight bash %}
bash
cd ..
cd separated-out/
git remote add SKETCHPAD ../sketchpad/
git fetch SKETCHPAD
git branch SKETCHPAD remotes/SKETCHPAD/master
git merge SKETCHPAD
{% endhighlight %}
Now the new files should have arrived - disconnect from the local remote "SKETCHPAD", and clean up: 


{% highlight bash %}
bash
ls -l android-native/
git remote rm SKETCHPAD
git branch -d  SKETCHPAD
git push origin master
git push
git pull
{% endhighlight %}
Get rid of the hacked around 'sketchpad' (and a real working version will now need to have the same stuff cleaned out too, first-off by issuing a _git pull_) :


{% highlight bash %}
bash
cd ../
rm -rf sketchpad
{% endhighlight %}
