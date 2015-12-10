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



The following issue on the rtl8723bs github page makes more sense, after delving into audio issues (since it also mentions i915) :
*   https://github.com/hadess/rtl8723bs/issues/33


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

... but DSDT patch doesn't seem to be necessary with 64-bit Fedora (need to check this).


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

After rebooting, check which DSDT we're running :

cat /sys/firmware/acpi/tables/DSDT > dsdt.dat
iasl -d dsdt.dat
more dsdt.dsl
>> /HAD
# "Intel(R) HDMI Audio Driver - HAD"

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


I wonder what's the driver, snd-soc-sst-byt-rt5640-mach, or snd-soc-rt5640?
I modprobe both of them. But it doesn't work.


modprobe -v snd-soc-sst-byt-rt5640-mach
modprobe -v snd-soc-sst-bytcr-rt5640 

ls -l /sys/bus/acpi/devices/ | grep 10EC56
>> lrwxrwxrwx 1 root root 0 Dec  4 22:01 10EC5640:00 -> ../../../devices/LNXSYSTM:00/LNXSYBUS:00/80860F41:01/10EC5640:00

cat /sys/bus/acpi/devices/10EC5640\:00/status
>> 0

# Now run :
./linuxium-dsdt-patch.sh 
# and reboot...
shutdown -r now

cat /sys/bus/acpi/devices/10EC5640\:00/status
>> 0

more  /sys/bus/acpi/devices/10EC5640\:00/path
>> \_SB_.I2C2.RTEK

more  /sys/bus/acpi/devices/HAD0F28:00/status
>> 15

more  /sys/bus/acpi/devices/HAD0F28:00/path
>> \_SB_.HAD_

grep CONFIG_SND_SOC /boot/config-4.2.6-301.fc23.x86_64 

CONFIG_SND_SOC=m
CONFIG_SND_SOC_AC97_BUS=y
CONFIG_SND_SOC_GENERIC_DMAENGINE_PCM=y
# CONFIG_SND_SOC_FSL_ASRC is not set
# CONFIG_SND_SOC_FSL_SAI is not set
# CONFIG_SND_SOC_FSL_SSI is not set
# CONFIG_SND_SOC_FSL_SPDIF is not set
# CONFIG_SND_SOC_FSL_ESAI is not set
# CONFIG_SND_SOC_IMX_AUDMUX is not set
CONFIG_SND_SOC_INTEL_SST=m
CONFIG_SND_SOC_INTEL_SST_ACPI=m
CONFIG_SND_SOC_INTEL_HASWELL=m
CONFIG_SND_SOC_INTEL_BAYTRAIL=m
CONFIG_SND_SOC_INTEL_HASWELL_MACH=m
>> CONFIG_SND_SOC_INTEL_BYT_RT5640_MACH=m
CONFIG_SND_SOC_INTEL_BYT_MAX98090_MACH=m
CONFIG_SND_SOC_INTEL_BROADWELL_MACH=m
CONFIG_SND_SOC_INTEL_BYTCR_RT5640_MACH=m
CONFIG_SND_SOC_INTEL_CHT_BSW_RT5672_MACH=m
CONFIG_SND_SOC_INTEL_CHT_BSW_RT5645_MACH=m
CONFIG_SND_SOC_INTEL_CHT_BSW_MAX98090_TI_MACH=m


modprobe -v snd-soc-sst-byt-rt5640-mach
modprobe -v snd-soc-sst-bytcr-rt5640
 
##modprobe -v baytrail-pcm-audio
modprobe -v snd-soc-sst-baytrail-pcm

more /proc/asound/cards
>> --- no soundcards ---

grep DSP /proc/interrupts
>> (NOTHING)

dmesg | grep -i bay
>>[    7.585877] iTCO_wdt: Found a Bay Trail SoC TCO device (Version=3, TCOBASE=0x0460)


I've got the patch working on the meegopad. 
It seems that the ACPI device HAD0F28 was marked as not ready. 
Its readiness is controlled by a flag (OSSL) in the DSDT, 
so I just forced it ready by returning a status of 0x0F 
and getting grub to provide a custom DSDT. 
Once I did this the audio came to life.


--- Interesting comment : https://plus.google.com/+IanMORRISON/posts/UNWdwRMqy3j

Tyler Yeomans
Aug 17, 2015 
+Ian MORRISON after running the DSDT fix, investigating dmesg I see:
rt5640 i2c-10EC5640:00: Device with ID register 6281 is not rt5640/39 does this mean I have a different chipset?﻿

Ian MORRISON (Linuxium)
Aug 18, 2015
+Tyler Yeomans You can ignore it as you'll be using the Intel HDMI audio driver.﻿





-- Related module: baytrailudio (hdmi_audio, 0.20150605), i915 (from kernel)

https://github.com/01org/baytrailaudio



Package: oem-audio-i915-baytrail-dkms
Priority: optional
Section: misc
Installed-Size: 2879
Maintainer: Canonical Commercial Engineering <commercial-engineering@canonical.com>
Architecture: all
Version: 0.20150605
Depends: dkms (>= 1.95)
Filename: pool/public/o/oem-audio-i915-baytrail-dkms/oem-audio-i915-baytrail-dkms_0.20150605_all.deb
Size: 483750
SHA256: cca048c5c63dcd214f3e6106757f2f8c6ebb2acb13e52db1007bdad4b17843b0
SHA1: 08503e667ba861ecd43beeb84fb50fca869319ee
MD5sum: 25d8144460951c43d814636aecf0d3fd
Description: oem-audio-i915-baytrail driver in DKMS format.
Description-md5: bf6ddc65aaa4ad962330761eab2d0760

i915-baytrail issues ::
  https://lists.debian.org/debian-devel/2015/09/msg00553.html
    http://intel.archive.canonical.com/pool/public/o/oem-audio-i915-baytrail-dkms/
  https://lists.debian.org/debian-devel/2015/09/msg00560.html 
    :: points out that kernel may be quite new
    After cross checking the missing label / function / file etc in lxr website, the code confirmed have been changed from 3.16 --> 3.18 in large extend.  
    The i915 folder from the DKMS source package can be replaced with the Linux kernel source one (/drivers/gpu/drm/i915), almost all errors gone.
    The only error left is the missing reference from hdmi_audio_if.h which was actually backported from intel gma source code from kernel 2.6.x.
    I think the effort to port kernel 2.6.x source code to 3.18 is overwhelming.  So better stay at 3.16.

  https://wiki.edubuntu.org/Audio/i915
    3.16 and forward : Standard driver (i915) 

  http://mailman.alsa-project.org/pipermail/alsa-devel/2015-July/094335.html
    Here's what a good boot of baytrail-pcm-audio looks like : 
        [   15.552097] byt-rt5640 byt-rt5640: ASoC: CPU DAI baytrail-pcm-audio not registered
        [   15.632979] (NULL device *): FW version: 04.05.13.a0
        [   15.632986] (NULL device *): Build type: a0
        [   15.632990] (NULL device *): Build date: Apr  2 2014 14:14:39
        [   15.691461] byt-rt5640 byt-rt5640: rt5640-aif1 <-> baytrail-pcm-audio mapping ok
    Firmware options :
      http://mailman.alsa-project.org/pipermail/alsa-devel/2015-July/094401.html    
    
    Can you try the bytcr_rt5640 machine driver as the byt-rt5640 machine
    driver will be getting deprecated (since it only works with a small
    number of FWs). The bytcr_rt5640 driver works with a wider range of FW.
    
    Liam Girdwood <liam.r.girdwood at intel.com> wrote:
      When testing the bytcr_rt5640 machine driver give also a try to the latest firmwares:
      https://git.kernel.org/cgit/linux/kernel/git/vkoul/firmware.git/tree/intel?h=byt
      I had some success with fw_sst_0f28_ssp0.bin

    snd-soc-sst-bytcr-rt5640 will be loaded automatically if you use snd-intel-sst-acpi instead of snd-soc-sst-acpi, 
    you can blacklist the latter using a file in /etc/modprobe.d (look up the details), 
    or just remove snd-soc-sst-acpi.ko from the installation dir as a dirty hack.

    Note that different drivers expect different firmwares, you cannot mix them:
      snd-soc-sst-acpi   -> fw_sst_0f28.bin-48kHz_i2s_master
      snd-intel-sst-acpi -> fw_sst_0f28.bin
      snd-intel-sst-acpi -> fw_sst_0f28_ssp0.bin (renamed to fw_sst_0f28.bin)

    http://mailman.alsa-project.org/pipermail/alsa-devel/2015-July/094428.html
      Very thorough writing from a user (or two) with Vinod@intel
      
        This is dpcm enabled driver.  So please route the FE to BE and it should work...

        Nicolas, this can be done by using the commands from here:
        http://mailman.alsa-project.org/pipermail/alsa-devel/2015-June/094080.html

        In particular:
        amixer -c0 sset 'codec_out0 mix 0 pcm0_in' on
        amixer -c0 sset 'media0_out mix 0 media1_in' on

        $ cat /proc/interrupts | grep sst    
        7:          0          0          0          0   IO-APIC 28-fasteoi   intel_sst_driver
      
        Sorry I should have been clearer. The dynamic debug allows you to enbale debug logs without recompiling

        So after boot:
        echo -n 'module snd_soc_sst_mfld_platform +p' > /sys/kernel/debug/dynamic_debug/control

        this will enable prints, so when you start audio, the firmware would be
        downloaded, and please grab the dmesg ouput and send...

        A final note, you also need to set the right codec controls to get audio; 
        setting the FE-BE path is necessary to make playback "work" but it may not be enough to actually get sound, 
        so make sure you run the full script Vinod provided in :
        http://mailman.alsa-project.org/pipermail/alsa-devel/2015-June/094080.html

        http://mailman.alsa-project.org/pipermail/alsa-devel/2015-July/094663.html
          Ah, sorry, the info from that bug report is outdated, for the snd-intel-sst-acpi you have to change
            sound/soc/intel/atom/sst/sst_acpi.c:
            
            
        
Restarting sound system after update:
Update from prior message: I fixed sound, using Pulseaudio. 
I had to "apt-get install pavucontrol", and then issue "alsa -force-reload". 
But now, sound works with vmlinuz-3.19.0-22-generic. Thanks everyone!



Freezes? ::  https://github.com/hadess/rtl8723bs/issues/33
4. set kernel command line parameter to include: intel_pstate=disabled 






http://netbook-remix.archive.canonical.com/updates/pool/public/o/oem-audio-i915-baytrail-dkms/oem-audio-i915-baytrail-dkms_0.20150605.tar.gz


dnf remove midori* claws* pidgin* transmission*
dnf remove abiword* gnumeric* orage* 
dnf install joe screen


Bluetooth comment :
  http://sparkylinux.org/forum/index.php?topic=3269.0
    Solved for external usb dongle using blueman instead of the shipped available bluetooth-mate that does not work, so removed bluetooth-mate completely then installed blueman with synaptic.
    
    mate-bluetooth has been dropped in favor of blueman, but there is no stable release available atm. 
    You should replace it with another bluetooth client, like xcfe4-bluetooth for example.
