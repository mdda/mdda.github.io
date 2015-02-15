---
comments: true
date: 2011-05-28 05:11:30+00:00
title: 'Ughh : OpenVZ and packet sniffing...'
category: OSS
wordpress_id: 387
wp_parent: '0'
wp_slug: openvz-and-packet-sniffing
tags:
- fedora
- firewall
- openvz
- security
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Before you attempt to experiment with knockd and/or fwknop, Google around a little for venet0 and packet sniffing.

The virtualization of the interfaces by OpenVZ apparently mangles the IP headers for packet sniffers (like fwknop uses to listen to DROP'd packets).  And they then fail to trigger the next step of cleverness (opening the SSH/22 port, for example).

i.e. : fwknop will not work on OpenVZ

Please let me know if I'm wrong : I would love to be...

