---
comments: false
date: 2008-10-05 20:21:00+00:00
title: Enabling IMAPS (with ssl) for dovecot
category: OSS
wordpress_id: 156
wp_parent: '0'
wp_slug: enabling-imaps-with-ssl-for-dovecot
tags:
- certificates
- dovecot
- IMAPS
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


### Inspect Current Configuration

  
cd /etc/pki/dovecot/  
more certs/dovecot.pem   # This is the one that people will need  
more private/dovecot.pem # This is the private half : Don't reveal  
  
However, the certificate (as it stands) is set up for 'example.com', so installing it doesn't help you access email securely on your server.  
  
The certificate is defined via :   
more dovecot-openssl.cnf   
  


### Create New Configuration

  
This needs to be updated with your information, in particular the server entry :  

{% highlight bash %}
cp dovecot-openssl.cnf dovecot-openssl.cnf-orig # Create a back-up, just in case  
joe dovecot-openssl.cnf   

{% endhighlight %}
Get rid of the old certificate pair :  

{% highlight bash %}
rm /etc/pki/dovecot/certs/dovecot.pem   
rm /etc/pki/dovecot/private/dovecot.pem  

{% endhighlight %}
Create the certificate pair :   

{% highlight bash %}
/usr/libexec/dovecot/mkcert.sh  

{% endhighlight %}
Make sure that dovecot is expecting secure logins by ensuring `/etc/dovecot.conf` has the line :  

{% highlight bash %}
protocols=imaps pop3s  

{% endhighlight %}
Now restart dovecot (just in case - you may not need this) :  

{% highlight bash %}
/etc/init.d/dovecot restart  

{% endhighlight %}
### Last Step - use the (public) certificate you created

  
Copy the contents of `/etc/pki/dovecot/certs/dovecot.pem` into a file on the local (email client) machine, and import the certificate.    
  
In Thunderbird, this is done via : Tools-Options-Advanced-Certificates-ViewCertificates-Authorities-Import and then pick out the file with the dovecot.pem contents in it.  Then, the account server options should be set to 'ssl' (without secure authentication, though).
