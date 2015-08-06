---
date: 2015-08-06
title: Add a new admin for gitolite
category: OSS
tags:
- linux
- git
- gitolite
layout: post
published: true
---
{% include JB/setup %}

### How to add an additional Admin user to ```gitolite```

This assumes you don't have access to the existing admin account
(which, if you did, would make things very easy).

On the server running ```gitolite```, logged in with the  ```gitolite``` user
(or whichever user is the one with the gitolite repositories in it) :

{% highlight bash %}
mkdir -p ~/tmp-delete-me-soon/
cd ~/tmp-delete-me-soon/
git clone ~/repositories/gitolite-admin.git
cd gitolite-admin/
cd conf/
# edit gitolite.conf, adding the user required to the gitolite-admin repo
git commit -am "Added new admin"
gitolite push
{% endhighlight %}

Then, on the machine where the new admin user works :

{% highlight bash %}
git clone gitolite@example.com:gitolite-admin
Cloning into 'gitolite-admin'...
{% endhighlight %}

Now, ```gitolite``` is at the new user's command...

