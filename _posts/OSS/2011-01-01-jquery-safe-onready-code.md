---
comments: false
date: 2011-01-07 16:19:21+00:00
title: jQuery - Safe 'onReady' code
category: OSS
wordpress_id: 377
wp_parent: '0'
wp_slug: jquery-safe-onready-code
tags:
- javascript
- jquery
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Just a quickie that combines the `$(fn)` method of calling a function when the DOM is ready, with an anonymous function that ensures that `$` refers to jQuery :


{% highlight javascript %}
(function($) {
  $(function () {
    // your code to fire when the DOM is ready
  });
})(jQuery);
{% endhighlight %}

