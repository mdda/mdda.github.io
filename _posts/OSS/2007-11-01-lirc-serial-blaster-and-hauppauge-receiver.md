---
comments: false
date: 2007-11-06 05:37:00+00:00
title: LIRC Serial Blaster and Hauppauge Receiver
category: OSS
wordpress_id: 136
wp_parent: '0'
wp_slug: lirc-serial-blaster-and-hauppauge-receiver
tags:
- blaster
- fc7
- Hauppauge-PVR350
- lirc
- receiver
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


### The Situation

  
I have a Hauppauge PVR350 card, which includes an IR receiver (connected via a 2.5mm socket on the card), but I also need to control an external cable box via an IR blaster (bought from irblaster.info), and have COM1 free.  
  
Actually, since I have a Belkin MediaPilot keyboard (mostly) working, I won't need to use the Hauppauge remote control, but I've included the set-up just in case.  
  


### The Solution

  
Into `/etc/modprobe.conf` :   
  

{% highlight bash %}
# This is for the PVR350 IR receiver  
alias char-major-61-0 lirc_i2c  
install lirc_i2c /sbin/modprobe ivtv; /sbin/modprobe --ignore-install lirc_i2c  
  
# This is for the InfraRed on the Serial Port COM1  
alias char-major-61-1 lirc_serial  
install lirc_serial /bin/setserial /dev/ttyS0 uart none ; /sbin/modprobe --ignore-install lirc_serial  
options lirc_serial irq=4 io=0x3f8  
  
# Version for COM2  
#install lirc_serial /bin/setserial /dev/ttyS1 uart none ; /sbin/modprobe --ignore-install lirc_serial  
#options lirc_serial irq=3 io=0x2f8  

{% endhighlight %}
To get the devices loaded in the right order, we need to do the lircd setup manually.  So, into `/etc/rc.local` append :  
  

{% highlight bash %}
/sbin/modprobe lirc_i2c  
/sbin/modprobe lirc_serial  
  
# This will be the lirc_i2c    (hauppauge receiver)  
/usr/sbin/lircd --device=/dev/lirc0 --output=/dev/lircd  
  
# This will be the COM1 device (blaster)  
/usr/sbin/lircd --driver=default --device=/dev/lirc1 --output=/dev/lircd1 --pidfile=/var/run/lircd1.pid  

{% endhighlight %}
To get the IR commands correctly received and sent, you need to add the IR code definition files (one after another) into `/etc/lircd.conf`.  Each of these files looks like :  
  

{% highlight bash %}
begin remote  
 name  Hauppauge  
 bits           13  
 flags SHIFT_ENC  
 eps            30  
 aeps          100  
  
 one           950   830  
 zero          950   830  
 plead         960  
 gap          89584  
 repeat_bit      2  
  
     begin codes  
         TV                       0x000000000000100F  
         RADIO                    0x000000000000100C  
         FULL_SCREEN              0x000000000000102E  
         CH+                      0x0000000000001020  
         CH-                      0x0000000000001021  
  
...  
  
         1                        0x0000000000001001  
         2                        0x0000000000001002  
         3                        0x0000000000001003  
         4                        0x0000000000001004  
         5                        0x0000000000001005  
         6                        0x0000000000001006  
         7                        0x0000000000001007  
         8                        0x0000000000001008  
         9                        0x0000000000001009  
         0                        0x0000000000001000  
         RESERVED                 0x000000000000101E  
         MINIMIZE                 0x0000000000001026  
     end codes  
end remote  

{% endhighlight %}
Get the full details from http://lirc.sourceforge.net/remotes/.  
  
To allow the received codes to trigger events within MythTV, you need a file that looks like this in `~/.myth/lircrc` :  
  

{% highlight bash %}
begin  
prog = mythtv  
button = TV  
repeat = 3  
config = F5  
end  
  
begin  
prog = mythtv  
button = Videos  
repeat = 3  
config = F2  
end  
  
...  

{% endhighlight %}
And finally, to change the channel on the cable box, you need to add a reference to a script like the following 'change-channel-lirc.pl' to the appropriate input channel via myth-setup :  
  
  

{% highlight bash %}
#!/usr/bin/perl  
  
use Time::HiRes qw(sleep); # Since perl's builtin sleep on does integer seconds  
  
# make sure to set this string to the corresponding remote in /etc/lircd.conf  
my $remote_name = "mycablebox";  
  
# Intra-digit time interval in seconds  
my $spacing=.2;  
  
# This is the lirc device to send the commands to  
my $device="--device=/dev/lircd1";  
  
sub change_channel {  
my($channel_digit) = @_;  
# print "Sending : $channel_digit\n";  
system ("irsend $device SEND_ONCE $remote_name $channel_digit");  
sleep $spacing;  
}  
  
my $channel=$ARGV[0];  
foreach my $digit (split('', $channel)) {  
change_channel($digit);  
}  
#system ("irsend $device SEND_ONCE $remote_name ENTER");  

{% endhighlight %}
