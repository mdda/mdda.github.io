---
published: true
comments: true
date: 2014-11-21
title: Install CUDA SDK for Nvidia Optimus on Fedora FC20
category: OSS
tags:
- fedora
- linux
- cuda
- Nvidia
- Optimus
- bumblebee
- fc20
layout: post
---
{% include JB/setup %}

Surprisingly, the proprietary Nvidia driver doesn't bring in the SDK required for compiling modules (unlike the OpenCL stuff, which is apparently something Nvidia does, but doesn't like to speak about).


### Installing on Linux :: RPM 

First steps from the [Linux install document from Nvidia](http://developer.download.nvidia.com/compute/cuda/6_5/rel/docs/CUDA_Getting_Started_Linux.pdf)
would be :

{% highlight bash %}
# uninstall previous cuda-repo-fedoraXX rpms - Nvidia hasn't figured out Fedora numbering yet
yum localinstall <download-directory>/cuda-repo-fedora20-6.5-14.x86_64.rpm
{% endhighlight %}

Unfortunately, the RPM method doesn't 'respect' ```bumblebee```, so need to install manually (without new Nvidia card drivers from RPM directly).


### Installing on Linux :: RUN

Download the ['Run' version rather than the 'RPM' one](https://developer.nvidia.com/cuda-downloads?sid=655255) :

{% highlight bash %}
# NB: It's large! ::  972,320,904 Nov 24 16:48 cuda_6.5.14_linux_64.run
cd <download-directory>
chmod 700 cuda_6.5.14_linux_64.run 
./cuda_6.5.14_linux_64.run 

# to use more recent compiler ()
./cuda_6.5.14_linux_64.run --override

Do you accept the previously read EULA? (accept/decline/quit): accept
Install NVIDIA Accelerated Graphics Driver for Linux-x86_64 340.29? ((y)es/(n)o/(q)uit): n
Install the CUDA 6.5 Toolkit? ((y)es/(n)o/(q)uit): yes
Enter Toolkit Location [ default is /usr/local/cuda-6.5 ]: 
Do you want to install a symbolic link at /usr/local/cuda? ((y)es/(n)o/(q)uit): y
Install the CUDA 6.5 Samples? ((y)es/(n)o/(q)uit): y
Enter CUDA Samples Location [ default is /root ]: 
Installing the CUDA Toolkit in /usr/local/cuda-6.5 ...
Missing recommended library: libGLU.so
Missing recommended library: libXmu.so

Installing the CUDA Samples in /root ...
Copying samples to /root/NVIDIA_CUDA-6.5_Samples now...
Finished copying samples.

===========
= Summary =
===========

Driver:   Not Selected
Toolkit:  Installed in /usr/local/cuda-6.5
Samples:  Installed in /root, but missing recommended libraries

Please make sure that
 -   PATH includes /usr/local/cuda-6.5/bin
 -   LD_LIBRARY_PATH includes /usr/local/cuda-6.5/lib64, or, add /usr/local/cuda-6.5/lib64 to /etc/ld.so.conf and run ldconfig as root

To uninstall the CUDA Toolkit, run the uninstall script in /usr/local/cuda-6.5/bin
To uninstall the NVIDIA Driver, run nvidia-uninstall

Please see CUDA_Getting_Started_Guide_For_Linux.pdf in /usr/local/cuda-6.5/doc/pdf for detailed information on setting up CUDA.

***WARNING: Incomplete installation! This installation did not install the CUDA Driver. A driver of version at least 340.00 is required for CUDA 6.5 functionality to work.
To install the driver using this installer, run the following command, replacing <CudaInstaller> with the name of this run file:
    sudo <CudaInstaller>.run -silent -driver

Logfile is /tmp/cuda_install_2542.log
{% endhighlight %}

### Finishing up

Better ```ld.conf``` approach for Fedora, as root : 

{% highlight bash %}
echo "/usr/local/cuda-6.5/lib64" > /etc/ld.so.conf.d/cuda.conf && ldconfig
{% endhighlight %}

And for the user that needs to use the compiler & other tools, edit ```~/.bash_profile``` :

{% highlight bash %}
# add (before the export PATH): 
PATH=$PATH:/usr/local/cuda-6.5/bin
{% endhighlight %}
