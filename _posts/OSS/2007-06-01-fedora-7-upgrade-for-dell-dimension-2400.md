---
comments: false
date: 2007-06-10 21:00:00+00:00
title: Fedora 7 Upgrade for Dell Dimension 2400
category: OSS
wordpress_id: 122
wp_parent: '0'
wp_slug: fedora-7-upgrade-for-dell-dimension-2400
tags:
- Dell-Dimension2400
- fc7
- fedora
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


### Situation

  
This machine previously had FC6 (upgraded FC1 -> FC2 -> FC3 -> FC4 -> FC5 -> FC6).  
However, the machine can't boot from USB.  
  
Solution suggested elsewhere :  


  * Download ISO (F-7-i386-DVD.iso) via bittorrent
  * Copy ISO into /root/Fedora7/
  * mount the ISO via loopback :
    * cp the isolinux/vmlinuz and isolinux/initrd.img file from the iso to the /boot partition
    * update the grub.conf so that vmlinuz is seen on a reboot
    * reboot and select the new entry.
  
  


### Problem 1 : ISO location

  
Fedora Upgrade doesn't want to work if the ISO is on the drive to be upgraded  


  * Solution : Use the vmlinuz to use the install image on the USB DVD drive (works on back USB sockets, not front sockets)
  
  


### Problem 2 : Drive renaming

  
Renaming of /dev/hdaX to /dev/sdaX means that swap partition is unrecognizable.  
  


  * Solution :  Need to re-initialize swap partition, and add a LABEL (a new feature since FC4 or so)
  
  

{% highlight bash %}
swapoff /dev/hda3  
mkswap -L SWAP /dev/hda3  
swapon /dev/hda3  
joe /etc/fstab  
# Change /dev/hda3 line to refer to label=/SWAP  

{% endhighlight %}
### Problem 3 : /etc/fstab requires all disks to have labels

  
/etc/fstab requires all disks to have labels.  List the existing labels with :  

{% highlight bash %}
# /sbin/blkid  # Also look at tune2fs and mlabel  

{% endhighlight %}
### Problem 4 : libexif not signed on the DVD

  
Solution : Pending...  None found.  Someone needs to be shot.  
  


### Step ５ : Throwing in towel on DVD - let's do it via web

  


#### Cleanup

  
On a system which has been upgraded from releases prior to FC6 you may need to remove up2date and rhnlib :  

{% highlight bash %}
yum remove rhnlib up2date  
yum install yum-utils; package-cleanup --orphans  

{% endhighlight %}
#### Do the web upgrade

  

{% highlight bash %}
wget ftp://download.fedora.redhat.com/pub/fedora/linux/releases/7/Fedora/i386/os/Fedora/fedora-release-7-3.noarch.rpm  
wget ftp://download.fedora.redhat.com/pub/fedora/linux/releases/7/Fedora/i386/os/Fedora/fedora-release-notes-7.0.0-1.noarch.rpm  
rpm -U fedora-release-7-3.noarch.rpm fedora-release-notes-7.0.0-1.noarch.rpm  
yum update  
  

{% endhighlight %}
In theory that’s the only thing you need to do, in practice it may not be that easy.   
  
Appending **combined_mode=libata** to the kernel line in GRUB solved the problem of ATA timeouts.  
  


#### Useful stuff about bootparams

  
`man bootparam`  
  

    
    linux text (Text mode installation. Useful for low memory systems. Installed system will boot in text mode (run level 3) by default)<br></br>askmethod (Enables a network installation)<br></br>acpi=off<br></br>maxcpus=1 (Some Dell dual core systems require this workaround. See common bugs page for more details.)<br></br>noapic<br></br>nolapic<br></br>dodmraid<br></br>nodmraid<br></br>ide=nodma<br></br>fb=no<br></br>vga=769       # 256 color 640x480<br></br>   =771       #               800x600<br></br>   =773       #               1024x768<br></br>   =775       #               1280x1024<br></br>   =796       #               1600x1200<br></br>   = etc. <br></br>
