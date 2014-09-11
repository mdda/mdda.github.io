---
comments: false
date: 2008-09-07 23:03:00+00:00
title: Secure Backup with reverse encfs
category: OSS
wordpress_id: 152
wp_parent: '0'
wp_slug: secure-backup-with-reverse-encfs
tags:
- backup
- encfs
- reverse
- secure
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


### Back-up the server onto an insecure host

  
  

{% highlight bash %}
#! /usr/bin/perl -w  
use strict;  
  
my $home='/home/whatever';  
  
if(1) {  # Mount the server directory on the encfs mount-point  
system(qq(mkdir -p $home/server-enc/));  
  
# The -S option is to read the password from stdin  
# The mount options passed include 'read-only'  
my $encfs_config=qq(ENCFS6_CONFIG=$home/server_dot-encfs6.xml);  
  
# Store the encfs password locally - so it doesn't appear in a command line  
system(qq(cat $home/.encfs_passwd | $encfs_config encfs -S --reverse /mnt/seagate250/server/ $home/server-enc/ -- -o ro));  
}  
  
if(1) { # Run actual rsync  
# This has been added to the ~/.ssh/authorized_keys list on the remote server  
my $key="$home/fs_server-fieldstone-key";   
  
my $ssh_options=qq(--rsh=ssh -e "ssh -i $key");  
my $bandwidth=qq(--bwlimit=50);  # This is in kB/sec  
my $options=qq(--archive --compress --recursive --progress --stats);  
my $remote=qq(whoever\@whereever.com:backup/system_id_dir);  
system(qq(rsync $options $bandwidth $ssh_options $home/server-enc/ $remote/server/));  
}  
  
if(1) { # UnMount the server directory from the encfs mount-point  
system(qq(fusermount -u $home/server-enc/));  
}  

{% endhighlight %}
### Mount the backup to retrieve files (don't overwrite original, yet)

  

{% highlight bash %}
#! /usr/bin/perl -w  
use strict;  
  
my $home='/home/whatever';  
  
if(1) { # Mount the encrypt image on the remote server here  
system(qq(mkdir -p $home/backup-ssh-enc/));  
my $remote=qq(whoever\@whereever.com:backup/system_id_dir);  
  
# This has been added to the ~/.ssh/authorized_keys list on the remote server  
my $key="$home/fs_server-fieldstone-key";  
  
# or : -o password_stdin  
system(qq(sshfs -o IdentityFile=$key $remote/server/ $home/backup-ssh-enc/));  
}  
  
  
if(1) { # - and, from there, mount the plain-text version   
system(qq(mkdir -p $home/backup-plain/));  
  
# The -S option is to read the password from stdin  
# The mount options passed include 'read-only'  
my $encfs_config=qq(ENCFS6_CONFIG=$home/server_dot-encfs6.xml);  
system(qq(cat $home/.encfs_passwd | $encfs_config encfs -S $home/backup-ssh-enc/ $home/backup-plain/));  
}  

{% endhighlight %}
### Un-mount the backup to retrieve files (cleanup)

  
  

{% highlight bash %}
# Afterwards, unmount the directories with the following :  
# fusermount -u $home/backup-plain  
# fusermount -u $home/backup-ssh-enc  
  

{% endhighlight %}
