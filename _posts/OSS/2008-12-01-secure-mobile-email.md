---
comments: false
date: 2008-12-31 08:28:00+00:00
title: Secure Mobile Email
category: OSS
wordpress_id: 161
wp_parent: '0'
wp_slug: secure-mobile-email
tags:
- encfs
- thunderbird
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Thunderbird email (where IMAP or POP) still downloads the subject lines (at minimum) into a local database.  This is a potential security threat if the laptop falls into unfriendly hands.

Solution :  Move local data store into a directory protected by EncFS

The following assumes that you can find the data store under the server name in the appropriate profile under the .thunderbird directory (and that ~/Fieldstone is the name of a directory mounted by EncFS, and so hidden if the 'unfriendly' doesn't know the password) :


{% highlight bash %}
ls -l .thunderbird/8n9uvc7r.default/ImapMail/imap.mail.fieldstone
cd .thunderbird/8n9uvc7r.default/ImapMail/
mv imap.mail.fieldstone ~/Fieldstone/
ln -s ~/Fieldstone/imap.mail.fieldstone

{% endhighlight %}
