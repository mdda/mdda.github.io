---
comments: true
date: 2014-07-14
title: Fixing up Author and Committer emails in a Repo
category: OSS
tags:
- linux
- git
- github
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


GitHub doesn't add emails that it doesn't recognize into your 'contributor score' (and activity calendar, etc).

This can be a particular gotcha if one develops on a local machine and commits as 'username@localhost' for instance.


Steps to Fix the emails
--------------------------------

First, get fully in-sync with the current GitHub state : 

{% highlight bash %}
git pull
git push
{% endhighlight %}

For certainty, update your ```.git/config``` to reflect the user you actually want to be :

{% highlight bash %}
bash
#more .git/config
...
[user]
	name = Martin Andrews
	email = GitHub@example.com
...
{% endhighlight %}

Now, examine which emails need updating :

{% highlight bash %}
bash
git log --all --format='Author=%aN <%aE>; Committer=%cN <%cE>' | sort -u
{% endhighlight %}

Let's assume that each of these should actually be ```GitHub@example.com```.  For each of the 'wrong' user emails : 

{% highlight bash %}
bash
git filter-branch -f --env-filter '
  m="$GIT_AUTHOR_EMAIL"
  if [ "$GIT_AUTHOR_EMAIL" = "username@localhost" ]
  then
    m="GitHub@example.com"
  fi
  export GIT_COMMITTER_EMAIL="$m"
  export GIT_AUTHOR_EMAIL="$m"
' -- --all
{% endhighlight %}

Finally, because this has been a history-slamming change, GitHub requires : 

{% highlight bash %}
bash
git push -f
{% endhighlight %}

All done.
