---
comments: false
date: 2011-07-16 22:59:43+00:00
title: 'MythTV / lircd updates on Fedora : Hauppauge'
category: OSS
wordpress_id: 453
wp_parent: '0'
wp_slug: mythtv-lircd-updates
tags:
- fedora
- Hauppauge-PVR350
- mythtv
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


I've been maintaining a PVR350 on an old Dell 2.4GHz since _forever_.  

Latest updates (to MythTV 24.1, and licrd 0.9.0.7) have made big changes.  But it's all working again, including a serial IR blaster.  The following is just for my easy reference, and anyone else who now finds their Grey Hauppauge remote control is emitting new key-presses (or worse, no longer talking to the system).  

To re-set up the whole lircd thing (when the new licrd changes appeared), I followed "Debian Wheezy amd64 Hauppauge PVR 350" on http://www.mythtv.org/wiki/LIRC#Setting_Up_The_Devinput_Option .


{% highlight bash %}
# more /home/myth/mythtv/irw-all-keys-hauppage
0000000080010161 00 KEY_SELECT devinput
0000000080010164 00 KEY_POWER2 devinput

0000000080010179 00 KEY_TV devinput
0000000080010189 00 KEY_VIDEO devinput
0000000080010188 00 KEY_AUDIO devinput
00000000800100d4 00 KEY_CAMERA devinput

000000008001016d 00 KEY_EPG devinput
0000000080010181 00 KEY_RADIO devinput

0000000080010069 00 KEY_LEFT devinput
0000000080010067 00 KEY_UP devinput
0000000080010160 00 KEY_OK devinput
000000008001006a 00 KEY_RIGHT devinput
000000008001006c 00 KEY_DOWN devinput

00000000800100ae 00 KEY_EXIT devinput
000000008001008b 00 KEY_MENU devinput

0000000080010073 00 KEY_VOLUMEUP devinput
0000000080010072 00 KEY_VOLUMEDOWN devinput

000000008001019c 00 KEY_PREVIOUS devinput
0000000080010071 00 KEY_MUTE devinput

0000000080010192 00 KEY_CHANNELUP devinput
0000000080010193 00 KEY_CHANNELDOWN devinput

00000000800100a7 00 KEY_RECORD devinput
0000000080010080 00 KEY_STOP devinput

00000000800100a8 00 KEY_REWIND devinput
00000000800100cf 00 KEY_PLAY devinput
00000000800100d0 00 KEY_FASTFORWARD devinput

00000000800100a5 00 KEY_PREVIOUSSONG devinput
0000000080010077 00 KEY_PAUSE devinput
00000000800100a3 00 KEY_NEXTSONG devinput

0000000080010002 00 KEY_1 devinput
0000000080010003 00 KEY_2 devinput
0000000080010004 00 KEY_3 devinput

0000000080010005 00 KEY_4 devinput
0000000080010006 00 KEY_5 devinput
0000000080010007 00 KEY_6 devinput

0000000080010008 00 KEY_7 devinput
0000000080010009 00 KEY_8 devinput
000000008001000a 00 KEY_9 devinput

0000000080010184 00 KEY_TEXT devinput
000000008001000b 00 KEY_0 devinput
0000000080010172 00 KEY_SUBTITLE devinput

000000008001018e 00 KEY_RED devinput
000000008001018f 00 KEY_GREEN devinput
0000000080010190 00 KEY_YELLOW devinput
0000000080010191 00 KEY_BLUE devinput

{% endhighlight %}
