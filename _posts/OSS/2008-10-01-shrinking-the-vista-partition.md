---
comments: false
date: 2008-10-04 00:32:00+00:00
title: Shrinking the Vista Partition
category: OSS
wordpress_id: 154
wp_parent: '0'
wp_slug: shrinking-the-vista-partition
tags:
- partition
- Vista
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


For a new machine (which is meant to be dual-boot), it may be better to install Linux first, since the partitioning information can be got right-first-time...  
  


### If Vista is Installed First

  
However, once Vista is installed, space must be made for Linux (and the shared partition).  
  
Shrinking the Vista partition is fairly easy using the Vista tool included ...  But it can only shrink a partition by 50% or so, because of immovable files stored at the mid-point of the drive.  
  
There's also a good tool available on a free-trial basis from ..., but that still doesn't get everything.  
  
Better to use the GNU tool : `jkdefrag -a 5 C:` from [www.kessels.com/Jkdefrag/](http://www.kessels.com/Jkdefrag/).  
  
I had to do **many** round-trips to decrease the drive from 330Gb to 60Gb.  But it worked eventually.
