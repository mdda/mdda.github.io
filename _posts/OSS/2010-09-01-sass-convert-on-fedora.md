---
comments: false
date: 2010-09-15 17:42:13+00:00
title: sass-convert on Fedora
category: OSS
wordpress_id: 338
wp_parent: '0'
wp_slug: sass-convert-on-fedora
tags:
- fedora
- ruby
- scss
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


[sass (and its successor scss)](http://sass-lang.com/)is a really nice CSS meta-language, enabling nicer hierarchies of classes to be built (much more maintainable).  The transformation software is written in `ruby`, and provided by the ruby gem `haml`.

The first step when using SCSS file, is usually to recast existing CSS files into semantically equivalent SCSS files (when you're using someone elses template, for instance).  For this 'magic' there is a tool provided by the `haml` gem called `sass-convert`.

But for some reason, when installing the ruby gem haml (using `yum install ruby-haml`) on Fedora, the `sass-convert` executable isn't installed.

Here are the steps (this is short and sweet), execute as root :

{% highlight bash %}
yum install ruby ruby-devel rubygem-haml
gem install haml rb-inotify
{% endhighlight %}


Then you can 'magically' :

{% highlight bash %}
sass-convert site.css site.scss
{% endhighlight %}

It can help to play around with the order of some of the original css rules, so that the hierarchical aggregation of rules gets more of a clue about what's going on.

Note that above, we also installed `rb-inotify`, which allows `sass` to monitor writes to `.scss` source files and dynamically update the corresponding css (which is a time saver when iteratively developing CSS) :


{% highlight bash %}
sass --watch site.scss:site.css
{% endhighlight %}


