---
comments: false
date: 2009-03-02 00:10:00+00:00
title: Paetec to Asterisk to Nortel
category: OSS
wordpress_id: 163
wp_parent: '0'
wp_slug: paetec-to-asterisk-to-nortel
tags:
- asterisk
- e-and-m
- fedora
- loopstart
- Paetec
- T1
- TecPath
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


My company has a Nortel PBX, with a full panel of extensions.  However, we need to add more handsets.  In addition, our traders have asked for 'Turrets' (more of this in a later post).  The obvious route is to go VoIP - with the precondition that the Nortel PBX should be unaffected (and repluggable if things don't go according to plan).

Solution : Add an Asterisk PBX in between our telecoms provider (Paetec) and the Nortel PBX, which is currently delivered by some sort of T1.  Requirements : Rhino 2 T1 card (installation in another post).

Problem #1 : No access to Nortel programming interface.
Solution : Talk to Paetec, armed with the /etc/dahdi/system.conf man page (and the asset tag from the T1 where it arrives in the room : importantly, this is marked ESF/B8ZS)

Unfortunately our telephone provider (while helpful) doesn't speak 'Asterisk' - but they were prepared to acknowledge that the T1 coming in was not PRI : it carried two types of 'analog' circuit :



	
  * A Paetec TecPath (which, after a lot of experimentation with dahdi_tool) proves to speak 'E&M;_Wink).  They described it as a "TecPath Trunk Group with Wink Dial Tone".

	
  * A number of Loopstart lines.  They described this as "Business Lines, i.e. Terminal Lines, Incoming only, Loopstart, with Clocking from Paetec.


Interfacing Asterisk to Paetec was pretty straight-forward, using the (straight-through) cable that the Nortel was already using.  Plus the following /etc/dahdi/system.conf :


{% highlight bash %}
span=1,1,0,esf,b8zs
span=2,0,0,esf,b8zs,yellow
#span=2,0,0,esf,b8zs`


{% endhighlight %}
# Loopback testing :
#clear=1-24
#clear=25-48

### Connection to Paetec

# Works for all other numbers (group)
e&m;=1-14

# Works for 212-xxx-yyyy incoming group
fxsls=15-24

### Connection to Nortel

# Simulation of all other numbers (group - included CallingID)
e&m;=25-38

# Simulation of 212-xxx-yyyy incoming (outgoing) group
fxols=39-48

{% highlight bash %}
Interfacing Asterisk to the Nortel was more tricky, since it seems to require a T1 Crossover (not a 568A/568B patch panel crossover).  Somehow, I guess, Paetec must detect what the recipient requires, since a straight cable (but not a patch panel crossover) worked to Asterisk...  Very strange (I didn't test the T1 crossover between Paetec and Asterisk).

For Asterisk, the _/etc/asterisk/chan_dahdi.conf_ looked like this :


{% endhighlight %}
rxgain=0.0
txgain=0.0
busydetect=yes

usecallerid=yes
hidecallerid=no
usecallingpres=yes

context=from-paetec-tecpath

group=1
immediate=no
signalling=em_w
channel=>1-14

context=from-paetec-main

group=2
immediate=no
signalling=fxs_ls
channel=>15-24

context=from-nortel-tecpath

group=3
signalling=em_w
channel=>25-38

context=from-nortel-main

group=4
signalling=fxo_ls
channel=>39-48

{% highlight bash %}
FYI, the E&M; signalling seems to be able to provide the last 4 digits of the number called in to, whereas the Loopstart doesn't.  This explains why my test dial plan (in /etc/asterisk/extensions.conf) from Paetec looks like this  :


{% endhighlight %}
[from-paetec-tecpath]

exten => _X.,1,Verbose("NEW CALL FROM:[${CALLERID(number)}] FOR:[${EXTEN}]")
exten => _X.,n,Dial(SIP/2101,60,r)
exten => _X.,n,Hangup

[from-paetec-main]
exten => s,1,Verbose("Business Line Group CALL FROM:[${CALLERID(number)}] FOR:[${EXTEN}]")
exten => s,n,Dial(SIP/2101,60,r)
exten => s,n,Hangup

```

where in the Business Line Group, no CALLERID or EXTEN information is available.

Now, on to cross-linking everything...

