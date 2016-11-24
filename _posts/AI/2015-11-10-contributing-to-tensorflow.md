---
date: 2015-11-10
title: Contributing to TensorFlow
tagline: (we're not in <s>Kansas</s> GitHub any more)
category: AI
tags:
- TensorFlow
- theano
- python
layout: post
published: true
---
{% include JB/setup %}

Google just released a fantastic-looking deep learning library called [```TensorFlow```](http://www.tensorflow.org/), 
complete with tutorials, and model-zoo-like examples.

Fortunately, the framework is very reminiscent of ```Theano```, and has a Python front-end over
a computation graph construction machine in C++ / CUDA (no OpenCL as far as I can tell).

>   **UPDATE**
> 
>   Google has listened to reason, and updated the [TensorFlow contribution policy](https://github.com/tensorflow/tensorflow/blob/master/CONTRIBUTING.md).   
>   There's still the Google CLA to fill out, but otherwise it's now through GitHub PRs (phew!).


One thing, though, is that contributions to the project have to go over
googlesource, rather than GitHub, and I put together a quick self-reminder post:

### Contributing to TensorFlow 

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

*   Since we're going to be using the ```http``` version for pushing ```git``` commits, set up 'git cookies' for ```git``` to use
    when connecting with the Gerrit server when pushing :  
    +   In the top-right corner of the [Gerrit site](https://tensorflow-review.googlesource.com/#/dashboard/self), clicking on your username will bring
        up a dropdown with 'Settings'.  
    +   Go into the Settings, and then choose 'HTTP Password' from the menu on the left hand side.
    +   This should take you to [this page](https://tensorflow-review.googlesource.com/#/settings/http-password), which contains a 
        single link titled 'Obtain HTTP'.
    +   Clicking on this link will give you some code (specific to your username) to copy-paste into a (Linux) terminal window.  For me this looked like :

{% highlight bash %}
touch ~/.gitcookies
chmod 0600 ~/.gitcookies

git config --global http.cookiefile ~/.gitcookies

tr , \\t <<\__END__ >>~/.gitcookies
.googlesource.com,TRUE,/,TRUE,2147483647,o,git-username.example.com=1/xHxg-NICE-TRY-zAyI-MHzN-SORRY-TO-DISAPPOINT-xHN4E
__END__
{% endhighlight %}

*   Now for one last piece of house-keeping on your local machine : Update your ```user.name```, and ```user.email``` for this git repo to match your CLA / googlecode user login: 

{% highlight bash %}
cd tensorflow
git config user.name "User Name"
git config user.email "username@example.com"
{% endhighlight %}

*  (FINALLY!) Make edits (it looks like you can even do this in the ```master``` branch on your local machine, 
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

And apparently it works!
