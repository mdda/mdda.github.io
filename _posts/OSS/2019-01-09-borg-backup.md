---
date: 2019-01-09
title: Borg Backup (replacing rdiff-backup)
category: OSS
tags:
- fedora
- linux
- borg
- backup
layout: post
published: true
---
{% include JB/setup %}

Over the past *n* years, I've used ```rdiff-backup``` as my backup solution.  However,
this has grown increasingly irritating because : 

*   If a backup gets terminated early, 'reverting' the incomplete backup takes a long time
*   Backups would always complain about bad access modes (MSDOS backup disk vs Linux host system?)
*   My backup scripts were written in ```Perl```, which is feeling/looking like a weakness now
*   My backup scripts were due for an overhaul anyway, since new disks/repos have appeared, and old machines have been retired.

Checking online shows that a number of new solutions have appeared, and so I decided 
to test one out (and actually switch if successful).  

The key requirements were :

*   Backups should be incremental
*   Backup media should be encrypted (so that I can rotate two sets of media, and store one 'insecurely' off-site without worrying)
*   Decent include/exclude mechanism for files/folders
*   Ability to back up accross network
*   Simple tools to get access to my data in the future (or a disaster scenario)
*   Support in main-line Fedora

Fortunately, ```borgbackup``` met all these criteria.


### Single package required

NB:  All the below needs to be done as ```root```, so that all paths are traversible, and all permissions are preserved

{% highlight bash %}
dnf install borgbackup
{% endhighlight %}


### Mount the media

It makes sense to create a consistent mount-point for the media, since that simplifies all the subsequent scripts :

{% highlight bash %}
mkdir -p /media/disk
mount /dev/sdd1 /media/disk
{% endhighlight %}

### Initialise the repo

First time only (and this will require inventing a decently strong password, with which a keyfile stored with the repo will be secured) :

{% highlight bash %}
touch /media/disk/.mounted # enables media presence to be checked easily

borg init --encryption=repokey /media/disk/borg-home
{% endhighlight %}


### Basic approach using Python

Check that the media is there :

{% highlight python %}
import os

# Need to make sure backup drive is mounted...
disk = '/media/disk'

if not os.path.isfile( os.path.join( disk, '.mounted')):
  print("Error : Need to mount %s" % (disk,))
  exit(1)

{% endhighlight %}


### ```export``` the password locally

This gets printed out, so it can be executed on the command line easily:

{% highlight bash %}
repo = os.path.join( disk, 'borg-home')

print('')
print("""export BORG_PASSPHRASE=`zenity --title 'Borg Password' --entry --hide-text --text 'Please enter Borg password'`""")
print('')

{% endhighlight %}


### And produce the command-line text

Creating the necessary command-line entries is easier, and more maintainable, in Python :

{% highlight bash %}
def beautify(comment, cmd):
  cmd= ' '.join([ l.strip() for l in cmd.split('\n') if not l.strip().startswith('#') ]).strip()
  cmd = cmd.replace('{repo}', repo)
  return "echo \"%s\" && \\\n  %s" % (comment, cmd)

if True:
  cmd="""
  borg create 
    --progress
#   --list --dry-run
    --exclude '*/.Trash*/'    
    --exclude '*/checkpoint*/'    
    {repo}::'rdai-{now}'
    /mnt/rdai
  """
  print(beautify("RedDragonAI", cmd))

{% endhighlight %}


### Include some utility commands too

{% highlight bash %}
print(beautify("See the archives", "borg list {repo}"))
print(beautify("See the compression", "borg info {repo}"))
{% endhighlight %}


### Check that the backup can be restored

THIS IS A VERY IMPORTANT STEP FOR ANY BACKUP SOLUTION!

Quick example with a file that I knew should be in a specific backup batch :

{% highlight bash %}
mkdir -p ~/tmp/
cd ~/tmp/
borg extract  /media/disk/borg-home::personal-2019-01-09T01:03:27 mnt/data/Personal/Property/StreetEasy.txt
{% endhighlight %}


All done.


