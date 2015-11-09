---
date: 2015-11-10
title: Contributing to TensorFlow
tagline: (we're not in <s>Kansas</s> GitHub any more)
category: AI
tags:
- tensorflow
- theano
- python
layout: post
published: true
---
{% include JB/setup %}

Google just released a fantastic-looking deep learning library called ```TensorFlow```.

Fortunately, it's very reminiscent of ```Theano```, and has a Python front-end over
a computation graph construction machine in C++ / CUDA (no OpenCL as far as I can tell).

One thing, though, is that contributions to the project have to go over
googlesource, rather than GitHub, and I put together a quick self-reminder post:

### Contributing to Tensorflow 

Preparatory steps:
 
*   Sign the Google CLA (and remember the email that you used to do so)

*   Go to Googlecode's [Gerrit site](https://tensorflow-review.googlesource.com/#/dashboard/self)

*   ```git clone``` the repository from there (not GitHub version, which is may be a mirror, but probably will have the wrong ```origin```), 
    clicking the ```Clone with commit-msg hook``` and ```http``` labels to create the 
    right command line to copy-paste into a (Linux) terminal window.  For me this looked like :

{% highlight bash %}
git clone https://tensorflow.googlesource.com/tensorflow && 
   (cd tensorflow && \
    curl -Lo `git rev-parse --git-dir`/hooks/commit-msg https://gerrit-review.googlesource.com/tools/hooks/commit-msg ; \
    chmod +x `git rev-parse --git-dir`/hooks/commit-msg)

{% endhighlight %}

*   Update your ```user.name```, and ```user.email``` for this git repo to match your CLA / googlecode user login: 

{% highlight bash %}
cd tensorflow
git config user.name "User Name"
git config user.email "username@example.com"
{% endhighlight %}

*  Make edits (it looks like you can even do this in the ```master``` branch on your local machine, 
   since Gerrit will auto-magically create an upstream phantom branch during code review)

*  Then ```commit``` in the usual way : 

{% highlight bash %}
git commit -am "Message header less than 65 chars long" 
  # plus more commit details, as required
{% endhighlight %}


*  And the final push up to a branch that Gerrit creates by 'magic' :

{% highlight bash %}
git push origin refs/heads/master:refs/for/master
{% endhighlight %}


#### Waiting on Google code-review...

And apparently it worked!
