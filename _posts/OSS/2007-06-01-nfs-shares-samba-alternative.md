---
comments: false
date: 2007-06-27 19:11:00+00:00
title: NFS shares (Samba alternative)
category: OSS
wordpress_id: 127
wp_parent: '0'
wp_slug: nfs-shares-samba-alternative
tags:
- fedora
- nfs
- samba
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


## Situation

  
  


## Basics

  
yum install portmap nfslock nfs  
  
  


## Setup of the Server Machine

  
Create a mount point for the directory to be mounted somewhere convenient :  
mkdir /s_drive  
  
and into /etc/fstab :  
/mnt/seagate250/server  /s_drive                none    bind            0 0  
  
Mount everything (ready for exporting) using :  
# mount -a  
  
Check everything is where it's meant to be with :  
# mount  
  
Add the network export to /etc/exports :  
# more /etc/exports  
/s_drive        192.168.1.0/255.255.255.0(ro)  
  
/etc/hosts.allow file for NFS:  
portmap: (hosts)  
lockd: (hosts)  
mountd: (hosts)  
rquotad: (hosts)  
statd: (hosts)  
  
where (hosts) is like 192.168.1.0/255.255.255.0  
  
/etc/hosts.deny file for NFS:  
portmap: ALL  
lockd: ALL  
mountd: ALL  
rquotad: ALL  
statd: ALL  
  
Start the daemons : nfsd, lockd, statd, mountd, and rquotad  
/etc/init.d/nfs restart  
  
Pick up any changes to /etc/exports :  
# /usr/sbin/exportfs -rv  
  
# /usr/sbin/showmount -e  
  
Helpful :  
http://fconfig.wordpress.com/2006/08/17/setting-up-a-fedora-nfs-server/  
  
Best :  
http://craiccomputing.blogspot.com/2007/06/setting-up-nfs-mounts-in-linux-fedora-6.html  
  
Includes WinXP Home Hack :  
http://gentoo-wiki.com/HOWTO_Access_NFS_via_SFU  
  
Note: Windows XP Home Users: If you use Windows XP Home you'll have to do a little hex editing to make everything work right for you. Make a backup of SfuSetup.msi then open it in your favorite hex editor. Search for the string "NOT (VersionNT = 501 AND MsiNTSuitePersonal)" and change 501 to 510.  
  
Also :  
http://doc.gwos.org/index.php/MountNFS
