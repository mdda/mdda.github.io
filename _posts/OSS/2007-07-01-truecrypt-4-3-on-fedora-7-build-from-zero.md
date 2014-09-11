---
comments: false
date: 2007-07-01 23:42:00+00:00
title: 'TrueCrypt 4.3 on Fedora 7 : Build from Zero'
category: OSS
wordpress_id: 128
wp_parent: '0'
wp_slug: truecrypt-4-3-on-fedora-7-build-from-zero
tags:
- f7
- fedora
- truecrypt
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


NB: Ripped (and modified) from : http://tredosoft.com/comment/reply/37  


##  How to install TrueCrypt 4.3a on Fedora 7

  


  
We are going to compile TrueCrypt from source so first grab [TrueCrypt's source code](http://www.truecrypt.org/downloads.php).  When it's downloaded, extract the source code and navigate to the Linux folder :  


  

{% highlight bash %}
tar xfz truecrypt-4.3a-source-code.tar.gz  
cd truecrypt-4.3a-source-code  
cd Linux  

{% endhighlight %}
Truecrypt needs to compile a kernel module during the build process.  Unfortunately the kernel headers included with Fedora 7 (in the kernel-devel package) are missing the dm.h header file which is needed for compiling the kernel module.  


  


  
We need to download the source RPM for the kernel (it's roughly a 45MB download) and install it so we can get to the dm.h file.  Since this is for the release version of Fedora 7 (which has the 2.6 kernel)  the commands to get at the source would be...  


  

{% highlight bash %}
su  
yumdownloader --source kernel  
; mkdir /usr/src/redhat # May have to do this due to packaging problems  
rpm -ivh kernel-$(uname -r).src.rpm  
; yum install sparse # May need this if rpmbuild complains  
``rpmbuild -bp --target=noarch /usr/src/redhat/SPECS/kernel-2.6.spec  
; there's a lot of activity at this point...`

`; Now copy over the dm.h file into the right place... (make sure the kernel major-minor matches the current) :  
cp /usr/src/redhat/BUILD/kernel-2.6.22/linux-2.6.22.noarch/drivers/md/dm.h /usr/src/kernels/$(uname -r)-$(uname -m)/drivers/md/  

{% endhighlight %}
Once we are done installing the source RPM we edit the `build.sh` file located in TrueCrypt's Linux folder. To do this, change the line :  


  

{% highlight bash %}
KERNEL_SRC=/lib/modules/$KERNEL_VER/source`  


to

  

{% endhighlight %}
KERNEL_SRC=/usr/src/redhat/BUILD/$KERNEL_VER/vanilla  

{% highlight bash %}
save and run `build.sh` as root to start the build process  


  
`su  
./build.sh  

{% endhighlight %}
still logged in as root run the install script and modprobe the kernel module, using an 'su -' login to set the root paths properly :  


  

{% highlight bash %}
./install.sh  
/sbin/modprobe truecrypt  

{% endhighlight %}
We successfully installed truecrypt!

  


  
To load this as a normal user, we need to create a mount point, and then use the truecrypt command with the --user-mount option :  


  

{% highlight bash %}
mkdir /media/Fieldstone  
truecrypt --user-mount /media/1GB/Fieldstone.truecrypt /media/Fieldstone  

{% endhighlight %}
Previously, to make this work, one needed to chown u+s /usr/bin/truecrypt (which was convenient, if a little insecure according to the truecrypt website).  Now, with version 4.3a, this method of allowing a regular user to 'escalate' privileges to mount the volume doesn't work.  So the user has to be made 'sudo' capable.  As root, do '/usr/sbin/visudo' (ugg - I hate vi, try `export EDITOR=joe` first to avoid using this).  Navigate to the bottom of the file, (and, if in `vi` hit 'i' for insert mode) and add :  


  

{% highlight bash %}
_username_        ALL=/usr/bin/truecrypt  

{% endhighlight %}
where _username_ is the user that will be using truecrypt.  That should do the trick, and then the two commands :  


  

{% highlight bash %}
truecrypt --user-mount /media/1GB/Fieldstone.truecrypt /media/Fieldstone  
truecrypt --dismount  

{% endhighlight %}
should work.  Phew!  

