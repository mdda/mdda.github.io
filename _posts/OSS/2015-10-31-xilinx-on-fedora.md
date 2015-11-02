---
date: 2015-10-31
title: Xilinx FPGA Toolchain on Fedora Linux
category: OSS
tags:
- fedora
- linux
- Xilinx
- FPGA
layout: post
published: true
---
{% include JB/setup %}

Installation of the Xilinx ISE WebPack product took *way too much time* during the 
recent Singapore FPGA-for-fun Saturday workshop.

Of course, it's easy to complain about proprietary software *just because*, but
in this case it was made extra-frustrating because Xilinx's proprietary component
to install their proprietary (but free-in-cost) license key was broken.  So, 
in effect, their 'welcome to the family' process was a lesson on why proprietary software is doomed - 
and caused entirely through Xilinx's own insistence on hiding what they're 
doing license-wise (since the software itself seemed to work fine).

Xilinx Installation (including license key installer work-around)
----------------------------------------------------------------------

1.   Register at the [Xilinx website](https://secure.xilinx.com/webreg/login.do), 
     and request a free license to the ISE Webpack product - it will be sent to you via email 
1.   Download the license key (since their installer fails to even run)
1.   Download the Linux ISE Webpack ```tar``` file  : ```Xilinx_ISE_DS_Lin_14.7_1015_1.tar```
1.   ```tar -xf Xilinx_ISE_DS_Lin_14.7_1015_1.tar```, and run (as ```root``` user, though
     this may not be necessary beyond the creation of the installation directory) :

{% highlight bash %}
# 14.7 xilinx 2 ise webpack

./xsetup

# Install location : /opt/Xilinx 
# Choose : ISE WebPACK (not ISE Design Suite System Edition)
#   No need to chose anything but the defaults from here...

# Now install the license key manually to the directory in your local home :
cp ~/Downloads/Xilinx.lic ~/.Xilinx/

# Running the software
cd /opt/Xilinx/14.7/ISE_DS/ISE/bin/lin64
./ise &
{% endhighlight %}


### ?Potentially? useful

*   [Helpful, but old, problem posting](http://stackoverflow.com/questions/15119734/how-to-launch-xilinx-ise-web-pack-under-ubuntu)

*   Equivalent version :

{% highlight bash %}
cd /opt/Xilinx/14.7/ISE_DS/

#sudo . settings64.sh

$ /path_to_the_installation_dir/14.4/ISE_DS/ISE/bin/lin64/ise
$ /path_to_the_installation_dir/14.4/ISE_DS/ISE/bin/lin64/coregen
$ /path_to_the_installation_dir/14.4/ISE_DS/EDK/bin/lin64/xps
$ /path_to_the_installation_dir/14.4/ISE_DS/EDK/bin/lin64/xsdk
{% endhighlight %}


Next Steps:
------------------------------------------------
  
1.  Open a project file : ```VHDL-HELLO-WORLD.xise```
1.  This will use : ```helloworld.vhd```
1.  Run-all on the project (to get 'three green ticks') 
1.  This will create : ```mystery.bit```, which is a binary that needs to be uploaded to a Xilinx device


### Final thing to solve : Papilio Loader
  
*  [Papilio Loader main page](http://papilio.cc/index.php?n=Papilio.PapilioLoaderV2)
  
*  [Papilio Loader](http://forum.gadgetfactory.net/index.php?/files/file/10-papilio-loader-gui/)

*  [Papilio Loader download](http://forum.gadgetfactory.net/index.php?/files/download/10-papilio-loader-gui/)
   +  Agree to Disclaimer

{% highlight bash %}
mv ~/Downloads/Papilio-Loader-V2.8.zip .
unzip Papilio-Loader-V2.8.zip 
cd papilio-loader/
sudo dnf install libftdi-devel
java -jar ...
{% endhighlight %}

*  [Papilio Loader PROBLEMS](https://github.com/GadgetFactory/DesignLab/issues/15)
   +   On Fedora (22) the issue seems to be that ```libftdi.so``` has been updated to ```libftdi1.so```, which 
       the loader ```.jar``` file fails to find
   +   Moreover, the ```.jar``` file wants a 32-bit version (and the 64-bit version *documentation* 
       conflicts with the 32-bit install)
   +   Even with the 32-bit version, you'll need to do something along the lines of : 
   
{% highlight bash %}
cd /lib
ln -s libftdi.so.1 libftdi1.so.2
{% endhighlight %}
   
   +   With that done, though, I was still getting errors regarding rights to the ```USB``` 
       device (which weren't sufficiently well explained to help solve the problem)
   +   One hour in : Time to *GIVE UP* on Papilio (for the weekend, at least)

