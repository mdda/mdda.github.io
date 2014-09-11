---
comments: false
date: 2009-10-11 23:15:00+00:00
title: Setting up git server on a 'central repository' - gitosis
category: OSS
wordpress_id: 173
wp_parent: '0'
wp_slug: setting-up-git-server-on-remote-machine-gitosis
tags:
- fedora
- git
- gitosis
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


NB : There's even more information in the following excellent guide : http://scie.nti.st/2007/11/14/hosting-git-repositories-the-easy-and-secure-way

But there are some differences for Fedora that are worth spelling out.


### Central Repository setup


First install gitosis :

{% highlight bash %}
central# yum install gitosis

{% endhighlight %}
Then create a dumb git user - noone will be logging in as this user: it's just so that everything can be centralized :

{% highlight bash %}
central# /usr/sbin/adduser --system --shell /bin/bash --user-group --home-dir /home/git --create-home git

{% endhighlight %}
Now create (if necessary) a local SSH key pair, and upload the public key to the 'git' user, so that it trusts you :

{% highlight bash %}
central# su git  # Just to test it worked
central$ cd ~; pwd; ls -l; exit
central#

{% endhighlight %}
Now create (if necessary) a local SSH key pair, and upload the public key to the 'git' user, so that it trusts you :

{% highlight bash %}
local$ # (look in .ssh for an 'id_dsa.pub' - if it doesn't exist then :
local$ ssh-keygen -t rsa
local$ # Copy this file to your server (the one running gitosis)
local$ cat .ssh/id_dsa.pub  # Then copy the response ...
ssh-dss AAAAB3NzaC1kc3MAAACBALIRnQszeSP6zrKdfN10YgrLKLZjZv476YJki6h
bfYqlQAAAIAoCsa4NKMC22p7rhthZ+J1v2fTE5NOXi7Rhl1rEm5xa1RhaSKIeGaVAyj1
qPaKXuoHanxh8jX5ki2sFIqyTZHFbqd3Y1cqMaZIxZ2UGXC3gf1r1ph6l3lHR4txoasFI
3VNKU4YeZPeOdLZAWDij4D3nE0SyiMkTg5jN+c4T52kgw== andrewsm@square

{% endhighlight %}


{% highlight bash %}
central# joe /tmp/id_dsa.pub.deleteme # paste the lines : join-up the line-breaks...
central# wc  /tmp/id_dsa.pub.deleteme # check the joining-up worked
0   3 604 /tmp/id_sda.pub.deleteme

{% endhighlight %}

Now initialize the repositories for gitosis itself:

{% highlight bash %}
central# sudo -H -u git gitosis-init < /tmp/id_sda.pub.deleteme
Initialized empty Git repository in /home/git/repositories/gitosis-admin.git/
Reinitialized existing Git repository in /home/git/repositories/gitosis-admin.git/

{% endhighlight %}

Check the post-update hook is executable :

{% highlight bash %}
central# ls -l /home/git/repositories/gitosis-admin.git/hooks/post-update
-rwxr-xr-x 1 git git 69 2009-10-11 19:33 /home/git/repositories/gitosis-admin.git/hooks/post-update

{% endhighlight %}

Now, choose a suitable place on the local machine for administering the gitosis server (the magic here is that the local machine will be able to configure the central server using git itself) :

{% highlight bash %}
local:~/linux/$ git clone git@centralmachine.com:gitosis-admin.git
Initialized empty Git repository in /home/localusername/linux/gitosis-admin/.git/
The authenticity of host 'centralmachine.com ()' can't be established.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'centralmachine.com' (RSA) to the list of known hosts.
remote: Counting objects: 5, done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 5 (delta 0), reused 5 (delta 0)
Receiving objects: 100% (5/5), done.
local:~/linux/$ cd gitosis-admin
local:~/linux/gitosis-admin$

{% endhighlight %}



### Create a new repository (part I) : Configuration of the Central machine


This can be done via gitosis on the local machine and pushing the changes up to the central server.

Update the gitosis.conf file.  For a new repo 'dice' add :

{% highlight bash %}
[group anything-dice-or-whatever ]
members = username-in-id_sda.pub-file
writable = dice

{% endhighlight %}

Then commit that change in the local repo, and push all changes up to the central repo :

{% highlight bash %}
local:~/linux/gitosis-admin$ git commit -a -m "added myself to the new repo 'dice'"
local:~/linux/gitosis-admin$ git push
Counting objects: 5, done.
Delta compression using 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 386 bytes, done.
Total 3 (delta 0), reused 0 (delta 0)
To git@centralmachine.com:gitosis-admin.git
44929c7..2adce64  master -> master

{% endhighlight %}



### Create a new repository (part II) : Local machine syncing (first time, source is the local machine)



If you haven't already initialized the 'dice' repo on your local machine :

{% highlight bash %}
local$ mkdir dice
local$ cd dice
local$ git init

{% endhighlight %}

Now tell your local machine that its 'daddy' is your central machine :

{% highlight bash %}
local$ git remote add origin git@centralmachine.com:dice.git

{% endhighlight %}

To do the first push to the central machine requires that there are some files being monitored by git.  So do a '_git add XYZ_' for some file, and a commit to your local repository : 


{% highlight bash %}
git commit -a -m "First Commit, for instance"

{% endhighlight %}

Then push it up (for the first time) to the new (blank) central master :

{% highlight bash %}
local$ git push origin master:refs/heads/master
Counting objects: 5, done.
Delta compression using 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 386 bytes, done.
Total 3 (delta 0), reused 0 (delta 0)
To git@centralmachine.com:gitosis-admin.git
44929c7..2adce64  master -> master

{% endhighlight %}

and finally, specify the branch that you're tracking on the local machine (which is 'giving up' it unique-as-creator status, and becoming a 'regular player') - so add the following to your _.git/config_ file :

{% highlight bash %}
[branch "master"]
	remote = origin
	merge = refs/heads/master

{% endhighlight %}


### Syncing the Local machine to the central repository (regular push/pull updates)


After you've made changes to local files, just do a commit with them to record the changelog in your local repository :

{% highlight bash %}
local$ git commit -m "Made some change here"

{% endhighlight %}
Once the whole changeset can be pushed up to the central repository :

{% highlight bash %}
local$ git push
Counting objects: 5, done.
Delta compression using 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 375 bytes, done.
Total 3 (delta 1), reused 0 (delta 0)
To git@centralmachine.com:dice.git
4cb6db6..39d5fb3  master -> master

{% endhighlight %}



### Adding a new user (with commit rights) to a project on the central repository


Again, this involves updating the configuration on the local gitosis project, and pushing the changes up to the central server.

First, get the .pub key from the new committer, and save it in the _keydir/_ of the gitosis-admin folder on the local machine.  Then do a _git add_ on the file to get it into the gitosis repository.  In addition, add the user's name (as found in the .pub file they've given you) and add them to the members list in the gitosis.conf.  Finally, do a 'git commit' and a 'git push' to upload the configuration changes to the central machine.



### Joining an existing project from the central repository


A suitable user can :

{% highlight bash %}
local$ git clone git@centralmachine.com:dice.git

{% endhighlight %}
and a local repository will be created (as a subdir of the current location), so that they can go to work on the code.  

In this case, a new subdir 'dice' will be created (with all the .git information, and the files in it, of course).



* * *

All done...

