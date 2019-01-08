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
published: false
---
{% include JB/setup %}



### Single package required

{% highlight bash %}
dnf install borgbackup
{% endhighlight %}


### Single package required

{% highlight bash %}
mount /dev/sdd1 /media/disk
borg init --encryption=repokey /media/disk/borg-home
{% endhighlight %}


### Single package required

{% highlight bash %}
import os

# Need to make sure backup drive is mounted...
disk = '/media/disk'

if not os.path.isfile( os.path.join( disk, '.mounted')):
  print("Error : Need to mount %s" % (disk,))
  exit(1)

{% endhighlight %}


### Single package required

{% highlight bash %}
repo = os.path.join( disk, 'borg-home')

print('')
print("""export BORG_PASSPHRASE=`zenity --title 'Borg Password' --entry --hide-text --text 'Please enter Borg password'`""")
print('')

{% endhighlight %}


### Single package required

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


### Single package required

{% highlight bash %}
print(beautify("See the archives", "borg list {repo}"))
print(beautify("See the compression", "borg info {repo}"))
{% endhighlight %}


All done.





