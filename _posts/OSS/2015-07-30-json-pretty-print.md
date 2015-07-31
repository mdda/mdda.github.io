---
date: 2015-07-30
title: curl for JSON
category: OSS
tags:
- linux
- curl
- json
layout: post
published: false
---
{% include JB/setup %}

### Tiny Tip

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
