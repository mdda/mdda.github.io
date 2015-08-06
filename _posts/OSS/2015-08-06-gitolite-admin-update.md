---
date: 2015-08-06
title: Add a new admin for gitolite
category: OSS
tags:
- linux
- git
- gitolite
layout: post
published: false
---
{% include JB/setup %}

### How to add an additional Admin user to gitolite





Add the following to ```~/.bashrc```:

{% highlight bash %}
function jcurl () {
  curl $@ --silent |  python -m json.tool
}
{% endhighlight %}

so that you get better-looking output for ```curl``` queries that return JSON :

{% highlight bash %}
curl https://api.github.com/users/mdda/repos
# vs.
jcurl https://api.github.com/users/mdda/repos
## which can be  *much* nicer 
## (depending on whether the source already sends pretty JSON, of course)
{% endhighlight %}
