---
comments: false
date: 2009-07-12 00:33:00+00:00
title: Magento install on OpenVZ
category: OSS
wordpress_id: 167
wp_parent: '0'
wp_slug: magento-install-on-openvz
tags:
- fedora
- Magento
- openvz
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


This one is a little embarrassing.

Just trying to install Magento on a new (fresh) container.  Running across the following style of error (when executing _./pear install magento-core/Mage_All_Latest-stable_) :


{% highlight bash %}
Starting to download Lib_ZF_Locale-1.7.2.2.tgz (1,279,370 bytes)
...done: 1,279,370 bytes
install ok: channel://connect.magentocommerce.com/core/Lib_ZF_Locale-1.7.2.2

Notice: Undefined variable: php_errormsg in Installer.php on line 566
PHP Notice:  Undefined variable: php_errormsg in /home/complex/www/magento/downloader/pearlib/php/PEAR/Installer.php on line 566
ERROR: failed to write ./lib/Zend/Pdf/Element/.tmpObject.php:
install ok: channel://connect.magentocommerce.com/core/Lib_Varien-1.3.2.2
ERROR: unable to unpack ./downloader/pearlib/download/Mage_Core_Modules-1.3.2.2.tgz
ERROR: unable to unpack ./downloader/pearlib/download/Mage_Core_Adminhtml-1.3.2.2.tgz

{% endhighlight %}


### Solution


Turns out that the default Quota for the OpenVZ container I had was extremely small.  Magento (or pear) doesn't complain about disk space explicitly...

In the host _/etc/vz/vz.conf_, all I had to do was adjust the :


{% highlight bash %}
## Disk quota parameters
#DISK_QUOTA=yes
DISK_QUOTA=no

{% endhighlight %}

and then run (in the Magento container) :

{% highlight bash %}
cd magento # This is the base directory of the Magento installation
rm -rf downloader/pearlib/cache/* downloader/pearlib/download/*
./pear mage-setup .
./pear install magento-core/Mage_All_Latest-stable

{% endhighlight %}

D'oh
