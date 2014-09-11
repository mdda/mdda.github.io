---
comments: false
date: 2009-06-12 13:20:00+00:00
title: 'lighttpd and twiki : Managing htpasswd file'
category: OSS
wordpress_id: 165
wp_parent: '0'
wp_slug: lighttpd-and-twiki-managing-htpasswd-file
tags:
- lighttpd
- twiki
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Using twiki with lighttpd is not yet as simple as it should be.  One particular problem is that twiki writes out htpasswd files that lighttpd doesn't parse correctly (twiki includes an unnecessary ':$email' entry).

To fix the problem (so that users can manage their own passwords) here's a quick fix for `{twiki}/lib/TWiki/Users/HtPasswdUser.pm` :


{% highlight bash %}
sub _dumpPasswd {
 my $db = shift;
 my $s = '';
 foreach ( sort keys %$db ) {
  if ( $TWiki::cfg{Htpasswd}{Encoding} eq 'md5' ) { # htdigest format
   $s .= $_.':'.$TWiki::cfg{AuthRealm}.':'.$db->{$_}->{pass}.':'.$db->{$_}->{emails}."\n";
  } else { # htpasswd format

   ### Change the following line:
   #   $s .= $_.':'.$db->{$_}->{pass}.':'.$db->{$_}->{emails}."\n";
   $s .= $_.':'.$db->{$_}->{pass}."\n";

  }
 }
 return $s;
}

{% endhighlight %}

Of course, in the configuration, `HtPasswdUser` needs to be set as the password manager.  And `crypt` chosen as the encryption method.
