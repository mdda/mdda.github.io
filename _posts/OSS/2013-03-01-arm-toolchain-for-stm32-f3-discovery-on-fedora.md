---
comments: true
date: 2013-03-21 05:24:28+00:00
title: ARM Toolchain for STM32-F3 Discovery on Fedora
category: OSS
wordpress_id: 563
wp_parent: '0'
wp_slug: arm-toolchain-for-stm32-f3-discovery-on-fedora
tags:
- ARM
- fedora
- linux
- STM32
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Basic steps : 

  * Install stlink, so that linux recognizes the STM32 card over USB

  * Install OpenOCD, which provides a 'virtual JTAG' debugging environment

  * <del>Redherring : CodeSourcery</del>

  * Install ARM gnu tools 'gcc-arm-embedded'

  * Download the STM32-F3 supplier code (includes the demo .hex file, for instance)

  * Get the STM32-F3-Discovery template

  * Make the template's simple blinking LED demo work

  * Reflash the initial demo using stlink

  * Off to do our own projects...


### Install stlink



Have a look at [the stlink github site](https://github.com/texane/stlink).  It's confirmed to work (by me) : 

{% highlight bash %}
git clone git://github.com/texane/stlink.git
cd stlink
./autogen.sh
./configure
## Tells us to install libusb1
su -c "yum install libusb1-devel"
./configure
make
su -c "make install"
su -c "cp 49-stlinkv2.rules /etc/udev/rules.d/"
#either reboot or execute
su -c "udevadm control --reload-rules"

# Not plugged in, the following gives no output : 
ls -l /dev/stlink*

# When plugged in, gives following output : 
# "lrwxrwxrwx. 1 root root 15 Mar 17 04:06 /dev/stlinkv2_1 -> bus/usb/003/004"

# All done setting up stlink
cd ..

{% endhighlight %}



### Install OpenOCD



Have a look at the [SourceForge site for the OpenOCD project](http://sourceforge.net/projects/openocd/).  Then install it :

{% highlight bash %}
git clone git://openocd.git.sourceforge.net/gitroot/openocd/openocd
cd openocd
su -c "yum install libtool texinfo"
./bootstrap
# Wait a while for sub-projects to git clone themselves
./configure --prefix=/usr --enable-maintainer-mode --enable-stlink
make
su -c "make install"

# All done setting up openocd
cd ..

{% endhighlight %}

NB : the following should show the config file we're interested in using :

{% highlight bash %}
ls -l /usr/share/openocd/scripts/board/stm32f3discovery.cfg

{% endhighlight %}



### CodeSourcery (A bit of a red herring)

CodeSourcery seems to be the toolchain that's easiest to set up.  However, the email sign-up thing is a bit grating, and at the end of the day, I decided to ditch their binaries, and go for the something closer to the metal.  The following looks like it would work...

{% highlight bash %}
## Sign up for CodeSourcery LITE 
#wget https://sourcery.mentor.com/GNUToolchain/package10928/public/arm-none-eabi/arm-2012.09-63-arm-none-eabi.bin
## Actually, this is probably a red herring : Let's go for more genuine OSS
#rm arm-2012.09-63-arm-none-eabi.bin
## Finished with CodeSourcery 

{% endhighlight %}



### Get the 'Official' ARM gnu gcc toolchain



Goto : [the ARM gcc-arm-embedded site]() to download the Linux installation tarball on the RHS :

{% highlight bash %}
mv ~/Downloads/gcc-arm-none-eabi-4_7-2012q4-20121208-linux.tar.bz2 .
bunzip2 gcc-arm-none-eabi-4_7-2012q4-20121208-linux.tar.bz2 
tar -xf gcc-arm-none-eabi-4_7-2012q4-20121208-linux.tar
rm gcc-arm-none-eabi-4_7-2012q4-20121208-linux.tar
cd gcc-arm-none-eabi-4_7-2012q4

{% endhighlight %}

Add the binaries into your PATH (NB: this apparently needs to be an absolute path, and yours will differ): 

{% highlight bash %}
pwd
## : /home/andrewsm/sketchpad/teensized/STM32-F3-Discovery/gcc-arm-none-eabi-4_7-2012q4
PATH="/home/andrewsm/sketchpad/teensized/STM32-F3-Discovery/gcc-arm-none-eabi-4_7-2012q4/bin:$PATH"`
{% endhighlight %}

Finish up :

{% highlight bash %}
# All done setting up(!) the arm-none-eabi toolchain
cd ..

{% endhighlight %}



### STM dev kit download (for examples)



Visit : [the STM download site](http://www.st.com/web/en/catalog/tools/PF258154), and download the zip file :

{% highlight bash %}
mv ~/Downloads/stm32f3discovery_fw.zip .
unzip stm32f3discovery_fw.zip
cd STM32F3-Discovery_FW_V1.1.0/
# Sample code in ./Projects

# Original demo code in :
# STM32F3-Discovery_FW_V1.1.0/Project/Demonstration/Binary/STM32F3_Discovery_Demo_V1.1.0.hex

cd ..
rm stm32f3discovery_fw.zip

{% endhighlight %}



### Get the STM32-F3-Discovery template



Oh, I didn't yet mention that a lot of the magic is done here.  But just getting to this stage was pretty involved, so I thought I'd write it all out long-hand.  

Anyway, without further ado, here's the magic sauce (not created by me) :

{% highlight bash %}
git clone git://github.com/mblythe86/stm32f3-discovery-basic-template.git
cd stm32f3-discovery-basic-template

# make the sample project
make

# Check that the .elf contains something reasonable...
arm-none-eabi-objdump -d main.elf 

## Change the makefile to enable OpenOCD to find our board 
#OPENOCD_BOARD_DIR=/home/andrewsm/sketchpad/teensized/STM32-F3-Discovery/openocd/tcl/board

# Recompile and Upload to the board
make program

# Done with ensuring that STM32 project template works
cd ..

{% endhighlight %}





### Reflash the initial demo... using stlink


The .hex file for the original demo code for the STM32F3 is in :

{% highlight bash %}
STM32F3-Discovery_FW_V1.1.0/Project/Demonstration/Binary/STM32F3_Discovery_Demo_V1.1.0.hex

{% endhighlight %}

Let's reflash that back onto the board to prove that nothing irreversible has happened :

{% highlight bash %}
openocd \
 -f /home/andrewsm/sketchpad/teensized/STM32-F3-Discovery/openocd/tcl/board/stm32f3discovery.cfg \
 -f ./stm32f3-discovery-basic-template/extra/stm32f3-openocd.cfg \
 -c "reset halt" \
 -c "flash write_image erase ./STM32F3-Discovery_FW_V1.1.0/Project/Demonstration/Binary/STM32F3_Discovery_Demo_V1.1.0.hex" \
 -c "shutdown"

{% endhighlight %}



### Now let's move fowards with our own sample project



{% highlight bash %}
cp -R stm32f3-discovery-basic-template project-test
cd project-test 
# ...


{% endhighlight %}
