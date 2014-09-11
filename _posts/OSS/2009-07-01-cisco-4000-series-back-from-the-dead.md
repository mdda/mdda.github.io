---
comments: false
date: 2009-07-31 14:24:00+00:00
title: Cisco 4000 series back from the dead
category: OSS
wordpress_id: 170
wp_parent: '0'
wp_slug: cisco-4000-series-back-from-the-dead
tags:
- '4000'
- catalyst
- cisco
- promupgrade
- rommon
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


After doing some shopping on ebay, I have acquired a nice-looking Cisco cabinet.  It's pretty old, and started off pretty-much functionless :



	
  * Cisco 4003 - 3 slot cabinet (1 supervisor, 2 sets of ports, dual power supplies)

	
  * Cisco 4012 - Supervisor module

	
  * 2 x Cisco 4148 - 48 port PoE unit


There are several steps to setting this up.


### Connect the Console


This connects via serial port to the DB-25 connector (into the 9-pin serial on my ageing laptop).  Use _minicom_ set to : 9600,n,8,1 (9600 baud, 8 bits, no-parity, 1 stop-bit, no flow-control).

The console responded with :

{% highlight bash %}
ROMMON (\d+) >

{% endhighlight %}

which indicates that it's basically been wiped clean.  Moreover _show version_ tells us the ROMMON version - basically 4.8.2 is very early, and not even capable of loading later versions of the Cisco IOS.  So upgrading takes several steps.


### Software Required


Don't ask me where to find this, but after some searching the following became available :



	
  * cat4000.4-5-2.bin

	
  * cat4000-promupgrade.6-1-5.bin

	
  * cat4000.6-4-15.bin


Upgrading is a multistep process, since ROMMON doesn't have the necessary functionality to execute the _promupgrade_ directly (AFAIK), and version 6-4-15 of the IOS can't be loaded by ROMMONs before 6-x-x anyhow.


### Put software images on local TFTP server


I put these in a folder 'CAT4000' on a server with IP 198.168.11.55.  YMMV, of course.


### Connect to the network


At the ROMMON prompt :

{% highlight bash %}
rommon 5 > set ip route default 192.168.11.55
rommon 6 > set interface me1 192.168.11.199 255.255.255.0
rommon 7 > tftpserver=192.168.11.55

{% endhighlight %}

Now connect the Cisco 4012 to the LAN (using the RJ45 socket on the 4012), and test the connection with :

{% highlight bash %}
rommon 8 > ping 192.168.11.55

{% endhighlight %}


### Boot into 4-5-2


At the ROMMON prompt, with the tftp server set as above :

{% highlight bash %}
rommon 9 > boot CAT4000/cat4000.4-5-2.bin
#... various diagnostics...
# Finally ...
(password) {ENTER for a blank, default password}
Console > enable
(admin-password) {ENTER for a blank, default password}
Console (enable) >
# This  is now booted into 4-5-2, ready for IOS commands...

{% endhighlight %}


### Upgrade ROM to 6-1-5


(paraphrasing slightly on the Cisco questions) :

{% highlight bash %}
Console > (enable) copy tftp flash
tftp server address [] 192.168.11.55
ftp file [] CAT4000/cat4000-promupgrade.6-1-5.bin
local file [...] cat4000-promupgrade.6-1-5.bin
# downloading...
CCCCCCCCCCCCCCC ... CCCCCCCCCCCCC
Console > (enable)
Console > (enable) show boot
#... last line must read 'boot:image specified by the boot system commands'
Console > (enable) set boot system flash bootflash:cat4000-promupgrade.6-1-5.bin prepend
Console > (enable) reset
# ... rebooting ...
# hopefully get to ROMMON once again
rommon 1 > set
# ROM VERSION: 6.1(5)

{% endhighlight %}


### Boot into 6-4-15


Now, with the upgraded ROMMON, booting into 6-4-15 should be possible :

{% highlight bash %}
rommon 1 > set ip route default 192.168.11.55
rommon 2 > set interface me1 192.168.11.199 255.255.255.0
rommon 3 > tftpserver=192.168.11.55
rommon 3 > boot CAT4000/cat4000.6-4-15.bin
#... various diagnostics...
# Finally ...
(password) {ENTER for a blank, default password}
Console > enable
(admin-password) {ENTER for a blank, default password}
Console > (enable)
# This is now booted into 6-4-15, ready for IOS commands...

{% endhighlight %}


### Clean up the flash drive, download local 6-4-15



{% highlight bash %}
Console > (enable) clear boot system flash bootflash:cat4000-promupgrade.6-1-5.bin
Console > (enable) del bootflash:cat4000-promupgrade.6-1-5.bin
Console > (enable) squeeze bootflash:
Console > (enable) copy tftp flash
IP address or name of remote host [192.168.11.55]?
Name of file to copy from []? CAT4000/cat4000.6-4-15.bin
Flash device [bootflash]?
Name of file to copy to [cat4000.6-4-15.bin]? `

`11534208 bytes available on device bootflash, proceed (y/n) [n]? y
CCCC ... CCCCCCCCC


{% endhighlight %}


{% highlight bash %}
File has been copied successfully.
Console > (enable) set boot system flash bootflash:cat4000.6-4-15.bin prepend
BOOT variable =bootflash:cat4000.6-4-15.bin,1;
Console > (enable) reset system

{% endhighlight %}


### Autoboot into (local) 6-4-15


This should just work...  Here's the output, just to show a working installation (the Fan Failed at the end is just because the second power supply was not plugged in) :

{% highlight bash %}
0:00.513570: No gateway has been specified
0:00.515263: ig0: 00:30:19:31:b2:fe is 192.168.11.199
0:00.515883: netmask: 255.255.255.0
0:00.516260: broadcast: 192.168.11.255
0:00.516627: gateway: 0.0.0.0
WS-X4012 bootrom version 6.1(5), built on 2003.03.19 16:59:08
H/W Revisions:    Meteor: 4    Comet: 10    Board: 2
Supervisor MAC addresses: 00:30:19:31:af:00 through 00:30:19:31:b2:ff (1024 addresses)
Installed memory: 64 MB
Testing LEDs.... done!
The system will autoboot in 5 seconds.
Type control-C to prevent autobooting.
rommon 1 >
The system will now begin autobooting.
Autobooting image: "bootflash:cat4000.6-4-15.bin"
CCCCCCCCCC ... CCCCCCCCCCCCCCCCCCCCCCCC
#
Starting Off-line Diagnostics
Mapping in TempFs
Board type is WS-X4012
DiagBootMode value is "post"
Loading diagnostics... 

Power-on-self-test for Module 1:  WS-X4012
Status: (. = Pass, F = Fail)
processor: .           cpu sdram: .           eprom: .
nvram: .               flash: .               enet console port: .
switch port 0: .       switch port 1: .       switch port 2: .
switch port 3: .       switch port 4: .       switch port 5: .
switch port 6: .       switch port 7: .       switch port 8: .
switch port 9: .       switch port 10: .      switch port 11: .
switch registers: .    switch sram: .
Module 1 Passed
Exiting Off-line Diagnostics

Testing Switch Chip 0 switching memory...passed.
Cisco Systems, Inc. Console

2009 Jul 31 06:59:39 %SYS-2-PS_NFANFAIL:Power supply 2 and power supply fan failed

Enter password:
Console >

{% endhighlight %}
