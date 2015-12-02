---
date: 2015-11-30
title: Fedora Linux onto Intel Compute Stick
category: OSS
tags:
- fedora
- Intel Compute Stick
- linux
layout: post
published: false
---
{% include JB/setup %}

I recently won an [Intel Compute Stick](http://www.intel.com/content/www/us/en/compute-stick/intel-compute-stick.html) 
(Windows version) at the [Singapore FinTech 'Compliance' Hackathon](http://e27.co/event/fintechathon/)
(aka the Fintechathon).  The Windows version has 2Gb of RAM, and 32Gb of ~SSD 
(compared that to the version with Ubuntu 14.04 LTS 64-bit installed, which only comes with 1Gb and 8Gb respectively - go figure).

~ssd = emmc

Of course, booting into Windows was not an option.  
However, my distribution preference is Fedora 
(rather than Ubuntu, which obviously has received more attention from Intel, since it's the officially supported version).

Installing Fedora on the device turned into (yet another) weekend of frustration and small gains...

### Getting WiFi going

The chipset Intel is using is the [RTL8723BS](http://www.anandtech.com/show/9167/intel-compute-stick-review), 
which provides WiFi and Bluetooth as a bundle, over ```SDIO```,  which is a bit of an odd combination.

With the Fedora 23 live image installed (destructively, so there's no going back) 
onto the Compute Stick's ~SSD, there are kernel modules already there.  So as root, one can :

{% highlight bash %}
find /lib/modules/`uname -r`/ | grep 8723

mkdir compute-stick
[andrewsm@square tools]$ cd compute-stick/
[andrewsm@square compute-stick]$ git clone https://github.com/hadess/rtl8723bs

cd rtl8723bs
make

[root@tv rtl8723bs]# make install
install -p -m 644 r8723bs.ko  /lib/modules/4.2.6-301.fc23.x86_64/kernel/drivers/net/wireless/
/sbin/depmod -a 4.2.6-301.fc23.x86_64

[root@tv rtl8723bs]# lsmod | grep 8723

[root@tv rtl8723bs]# modprobe r8723bs

[root@tv rtl8723bs]# lsmod | grep 8723
r8723bs               602112  0
cfg80211              536576  3 mac80211,rtlwifi,r8723bs
mmc_core              122880  4 mmc_block,sdhci,sdhci_acpi,r8723bs

[root@tv rtl8723bs]# dmesg
...

[  993.052987] cfg80211: World regulatory domain updated:
[  993.052997] cfg80211:  DFS Master region: unset
[  993.053001] cfg80211:   (start_freq - end_freq @ bandwidth), (max_antenna_gain, max_eirp), (dfs_cac_time)
[  993.053007] cfg80211:   (2402000 KHz - 2472000 KHz @ 40000 KHz), (N/A, 2000 mBm), (N/A)
[  993.053012] cfg80211:   (2457000 KHz - 2482000 KHz @ 40000 KHz), (N/A, 2000 mBm), (N/A)
[  993.053016] cfg80211:   (2474000 KHz - 2494000 KHz @ 20000 KHz), (N/A, 2000 mBm), (N/A)
[  993.053021] cfg80211:   (5170000 KHz - 5250000 KHz @ 80000 KHz, 160000 KHz AUTO), (N/A, 2000 mBm), (N/A)
[  993.053027] cfg80211:   (5250000 KHz - 5330000 KHz @ 80000 KHz, 160000 KHz AUTO), (N/A, 2000 mBm), (0 s)
[  993.053031] cfg80211:   (5490000 KHz - 5730000 KHz @ 160000 KHz), (N/A, 2000 mBm), (0 s)
[  993.053036] cfg80211:   (5735000 KHz - 5835000 KHz @ 80000 KHz), (N/A, 2000 mBm), (N/A)
[  993.053040] cfg80211:   (57240000 KHz - 63720000 KHz @ 2160000 KHz), (N/A, 0 mBm), (N/A)
[ 1653.924169] perf interrupt took too long (2542 > 2500), lowering kernel.perf_event_max_sample_rate to 50000
[ 3325.845416] r8723bs: module verification failed: signature and/or required key missing - tainting kernel
[ 3325.850910] RTL8723BS: module init start
[ 3325.850918] RTL8723BS: rtl8723bs v4.3.5.5_12290.20140916_BTCOEX20140507-4E40
[ 3325.850922] RTL8723BS: rtl8723bs BT-Coex version = BTCOEX20140507-4E40
[ 3325.991969] RTL8723BS: rtw_ndev_init(wlan0)
[ 3325.997080] RTL8723BS: module init ret =0
[ 3326.022776] IPv6: ADDRCONF(NETDEV_UP): wlan0: link is not ready
[ 3326.027503] rtl8723bs: accquire FW from file:rtlwifi/rtl8723bs_nic.bin
[ 3327.435310] IPv6: ADDRCONF(NETDEV_UP): wlan0: link is not ready
[ 3327.452542] cfg80211: Regulatory domain changed to country: SG
[ 3327.452554] cfg80211:  DFS Master region: FCC
[ 3327.452559] cfg80211:   (start_freq - end_freq @ bandwidth), (max_antenna_gain, max_eirp), (dfs_cac_time)
[ 3327.452568] cfg80211:   (2402000 KHz - 2482000 KHz @ 40000 KHz), (N/A, 2000 mBm), (N/A)
[ 3327.452577] cfg80211:   (5170000 KHz - 5250000 KHz @ 80000 KHz, 160000 KHz AUTO), (N/A, 1700 mBm), (N/A)
[ 3327.452585] cfg80211:   (5250000 KHz - 5330000 KHz @ 80000 KHz, 160000 KHz AUTO), (N/A, 2400 mBm), (0 s)
[ 3327.452593] cfg80211:   (5490000 KHz - 5730000 KHz @ 160000 KHz), (N/A, 2400 mBm), (0 s)
[ 3327.452599] cfg80211:   (5735000 KHz - 5835000 KHz @ 80000 KHz), (N/A, 3000 mBm), (N/A)
[ 3327.504981] IPv6: ADDRCONF(NETDEV_UP): wlan0: link is not ready
[ 3329.235611] RTL8723BS: nolinked power save enter
[ 3330.813484] RTL8723BS: nolinked power save leave
[ 3332.802227] RTL8723BS: nolinked power save enter

[root@tv rtl8723bs]# iwconfig 
wlan0     IEEE 802.11bgn  ESSID:"Zhone_7D33"  Nickname:"<WIFI@REALTEK>"
          Mode:Managed  Frequency:2.452 GHz  Access Point: 02:02:71:32:7D:34   
          Bit Rate:72.2 Mb/s   Sensitivity:0/0  
          Retry:off   RTS thr:off   Fragment thr:off
          Encryption key:****-****-****-****-****-****-****-****   Security mode:open
          Power Management:off
          Link Quality=94/100  Signal level=60/100  Noise level=0/100
          Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0
          Tx excessive retries:0  Invalid misc:0   Missed beacon:0

wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.60  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::2ac2:ddff:fe5f:a987  prefixlen 64  scopeid 0x20<link>
        ether 28:c2:dd:5f:a9:87  txqueuelen 1000  (Ethernet)
        RX packets 20  bytes 3382 (3.3 KiB)
        RX errors 0  dropped 18  overruns 0  frame 0
        TX packets 41  bytes 6535 (6.3 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0



WOOHOO !

{% endhighlight %}

Very interesting :

*  https://copr-be.cloud.fedoraproject.org/results/baoboa/fedlet-64bit/fedora-23-x86_64/
   + 00140215-dkms-rtl8723bs/
   + 00140216-dkms-gt9xx/

*  https://communities.intel.com/thread/75295

From http://labs.isee.biz/index.php/How_to_setup_Marvell_88w8686_SDIO_wifi :

{% highlight bash %}
iwconfig
ifconfig eth1 up
iwlist eth1 scan
iwconfig eth1 txpower auto essid MyPlace channel 4
udhcpc -i eth1
{% endhighlight %}


http://kodi.wiki/view/HOW-TO:Install_Kodi_on_Fedora_22_using_RPMFusion_packages

systemctl stop firewalld
dnf remove firewalld

sed --in-place=.bak 's/^SELINUX\=enforcing/SELINUX\=disabled/g' /etc/selinux/config

dnf install --nogpgcheck \
  http://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm  \
  http://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
  
systemctl poweroff

systemctl reboot



gt9xx is touchscreen driver (not useful for the Compute Stick)

oem-audio-i915-baytrail-dkms 
chestersmill 
oem-settings-audio-i915-baytrail-dkms 
rtl8723bs-Bluetooth-dkms
rtl8723bs-Bluetooth-misc 
rtl8723bs-dkms

Intel SST Audio Device (WDM)
  drmk.sys
  isstrtc
  portcls
  realtek_fw_sst
  MsApoFxProxy
  
 hdmi-sound patch
 This version does not need a DSDT patch to get sound to work when booting from 64-bit and therefore maybe more preferable for some.  

 oem-audio-i915-baytrail-dkms_0.20150605_all.deb ??
 >>> Intel HDMI audio driver intel i915 hdmi baytrail audio
 
 64-bit bootloader I've made an additional Ubuntu LiveCD. This version does not need a DSDT patch to get sound to work when booting from 64-bit and therefore maybe more preferable for some. 
 
 Intel Z3735F device.

 Error message in forum :
 [ 3514.915957] baytrail-pcm-audio baytrail-pcm-audio: ASoC: baytrail-pcm-audio hw params failed: -110
 
 then applied my 'dsdt-patch.sh' once installed to get sound. 
   :: https://sites.google.com/site/ianwmorrison/Downhome/Topic3
   
 
 
Note on HD Audio Bitstreaming

As of April 2015, the Intel graphics drivers for Bay Trail-T (32-bit) have support 
only for bitstreaming of DTS, Dolby Digital and Dolby Digital Plus. 
This means that Netflix and other similar OTT sites are in the clear. 
However, users hoping to take advantage of lossless HD audio in Blu-ray backups are going to be disappointed. 
In any case, streaming of Blu-rays over a 802.11n Wi-Fi network will result in a bad user experience. 
So, it is possible that the absence of HD audio bitstreaming will not bother too many consumers.

 
### ```linuxium-dsdt-patch.sh```

https://www.happyassassin.net/fedlet-a-fedora-remix-for-bay-trail-tablets/

Changes :

*   ```dnf --assumeyes install acpica-tools```  # About 1Mb download

Need ```update-grub2``` : No, it is ```grub2-mkconfig``` in Fedora

##ln -sf /boot/efi/EFI/fedora/grub.cfg /etc/grub2-efi.cfg
##grub2-mkconfig -o /boot/efi/EFI/fedora/grub.cfg

grub2-mkconfig -o /boot/grub2/grub.cfg


And change ```\${libdir}/grub/grub-mkconfig_lib``` to ??  /usr/share/grub instead of /usr/lib/grub




is the solution.

/etc/grub2.cfg -> ../boot/grub2/grub.cfg

is a bad link.



### ```linuxium-dsdt-patch.sh``` Updated for Fedora

{% highlight bash %}
#!/bin/sh

# Linuxium's installation script for audio DSDT patch

if [ -d /target ]; then
	echo "$0: Do not run this script from a LiveCD ... exiting."
	exit
fi

if [ ! `which iasl` ]; then
	DEFAULT_GATEWAY=`ip r | grep default | cut -d ' ' -f 3`
	if ( ! ping -q -w 1 -c 1 "${DEFAULT_GATEWAY}" > /dev/null 2>&1 ); then
		echo "$0: Not connected to internet ... exiting."
		exit
	fi
	dnf --assumeyes install acpica-tools  # About 1Mb download
	if [ ! `which iasl` ]; then
		echo "$0: Missing 'iasl' ... run 'dnf --assumeyes install acpica-tools' mannually to install."
		exit
	fi
fi
if [ -d /tmp/dsdt.$$ ]; then
	echo "$0: Cannot create temporary work directory '/tmp/dsdt.$$' ... exiting."
	exit
fi
echo "$0: Started ..."
mkdir /tmp/dsdt.$$
cd /tmp/dsdt.$$
cat /sys/firmware/acpi/tables/DSDT > dsdt.dat
iasl -d dsdt.dat > /dev/null 2>&1
sed -i '/Device (HAD/,/Return (Zero)/s/(Zero)/(0x0F)/' dsdt.dsl
iasl -tc dsdt.dsl > /dev/null 2>&1
cp dsdt.aml /boot
cat <<+ > /etc/grub.d/01_acpi
#! /bin/sh -e

# Uncomment to load custom ACPI table
GRUB_CUSTOM_ACPI="/boot/dsdt.aml"

# DON'T MODIFY ANYTHING BELOW THIS LINE!

prefix=/usr
exec_prefix=\${prefix}
datadir=\${exec_prefix}/share

. \${datadir}/grub/grub-mkconfig_lib

# Load custom ACPI table
if [ x\${GRUB_CUSTOM_ACPI} != x ] && [ -f \${GRUB_CUSTOM_ACPI} ] \\
        && is_path_readable_by_grub \${GRUB_CUSTOM_ACPI}; then
    echo "Found custom ACPI table: \${GRUB_CUSTOM_ACPI}" >&2
    prepare_grub_to_access_device \`\${grub_probe} --target=device \${GRUB_CUSTOM_ACPI}\` | sed -e "s/^/ /"
    cat << EOF
acpi (\\\$root)\`make_system_path_relative_to_its_root \${GRUB_CUSTOM_ACPI}\`
EOF
fi
+
chmod 0755 /etc/grub.d/01_acpi
echo "$0: Installing ..."
grub2-mkconfig -o /boot/efi/EFI/fedora/grub.cfg
cd
rm -rf /tmp/dsdt.$$
echo "$0: Finished."
{% endhighlight %}




Sound

On most hardware, you should be able to make sound work with this ALSA state file. Download it and run 
alsactl -f /path/to/t100_B.state restore


https://github.com/AdamWill/baytrail-m/blob/master/alsa/t100_B.state

https://github.com/AdamWill/baytrail-m

Non-Free Driver required ? :: libva-driver-intel 

https://www.happyassassin.net/fedlet/repo/SRPMS/



diff --git a/drivers/mfd/intel_soc_pmic_core.c b/drivers/mfd/intel_soc_pmic_core.c

A backport of Rawhide’s linux-firmware package, which contains the firmware needed for the sound adapter

Kernel update: based on latest Rawhide, sound (and LPSS) support built in 
(but not working until you provide fw_sst_0f28.bin* in /usr/lib/firmware/intel and apply this mixer config), 
shutdown/reboot should work on Venue 8 Pro, T100 and Miix 2


DONE ::
dnf install libva-driver-intel  # from rpmfusion


## tried : 
modprobe -v snd-soc-sst-baytrail-pcm

Complaints : 
[    7.545573] sst-acpi 80860F28:00: No matching ASoC machine driver found
[    7.805593] intel_sst_acpi 80860F28:00: No matching machine driver found

Very Promising ::
https://bugzilla.kernel.org/show_bug.cgi?id=86581


http://netbook-remix.archive.canonical.com/updates/pool/public/o/oem-audio-i915-baytrail-dkms/oem-audio-i915-baytrail-dkms_0.20150605.tar.gz
