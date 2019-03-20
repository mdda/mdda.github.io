---
date: 2019-03-14
title:  "TF.summit highlights"
tagline: Presentation
category: AI
tags:
- Presentation
- TensorFlow
- TF.summit
- EdgeTPU
- TFLite
layout: post
published: true
---
{% include JB/setup %}



### Presentation Link

Sam Witteveen and I started the TensorFlow and Deep Learning Singapore group on MeetUp in February 2017,
and [the twenty-third MeetUp, aka TensorFlow and Deep Learning : The latest from #TFDevSummit](https://www.meetup.com/TensorFlow-and-Deep-Learning-Singapore/events/259442585/),
was again hosted by Google Singapore.  

At the Meetup, Sam talked about the upgrade path to the newly available (in alpha) TensorFlow 2.0, which 
was followed up by Aurélien Géron, who focused on "@tf.function()".

For my part, I gave a talk titled "NeurIPS Lightning Talks", which discussed three topics (two from NeurIPS) in a "Lightning Talk" style.  

The evening was rounded out by Jason Zaman, who described the new TensorFlow SIG (Special Interest Group) system, 
in which he is the lead of the TensorFlow Build SIG.


<!--

TF.summit notes ::


Nice stuff at  :

*  TensorFlow 2.0 now alpha.  RC in "spring"
*  TensorFlow Lite (soon : Keras functions for sparsification and quantisation)
*  Swift (though no SavedModel yet)
*  TensorFlow Probability
*  UniRoma in Codice Ratio



---------

 9:50 : 5-minute talks
        -  Ultrasound
        -  tf.jl  Julia
        -  NetEase.cn (AR translation, inc. offline, in TF.lite)
        -  Uber (tf.js debugging tool : "Manifold")
        -  Alibaba.cn (AI Cloud, inc TAO optimizer & FPGA)
        -  tf.lattice (monotonicity guarantee for models)  https://arxiv.org/pdf/1709.06680.pdf
        -  Unicode and ragged tensors (tf.ragged)
        -  Education (teachable machine, move mirror, PoseNet) : AI experiments
        
10:45 : 
    Hacker Room
 
11:15 :    TF2.0 and porting models

12:00 : Lunch with Community contributions panel

 1:15 : Research and the Future
        -  Exascale (FP16) weather prediction
        -  Federated learning (tf/federated)
        -  Mesh TF (TPU pods)   (for 1.13, TODO=2.0)
           -  Noam built 5Bn Transformer model (512 TPUv2 pod) 
              -  1bn perp 23.5  
              -  WMT14 en-fr 14.2?
        -  Sonnet : pip install dm-sonnet
           -  DeepMind was torch7-based
           -  TF better for distributed processing
           -  All done for research usage (ignore production)
           -  Setups (modules shared between all)
              -  2 for (un)supervised learning
              -  4 for reinforcement learning
              -  N for custom (eg: AlphaStar)
           -  "Sonnet2" : tf.Module (stateful container)
              -  multiple forward methods
              -  name scoping
           -  Replication of data (~ DistributionStrategy )
           -  Beta release "in the summer"
              -  BigGAN is in Sonnet (TPU pod)
              -  AlphaStar (v. custom training cycles)
              

---------

tf.data : 
  -  Is on-the-fly BPE realistic
  -  Is on-the-fly word replacement realistic
  
TensorBoard
  -  TPU performance monitor?

TF.jl :  
  -  vs. Swift?

tf.ragged : 
  -  TPUs?
  -  tf.data on-the-fly

Estimators can do multi-node async (regular tf.keras cannot)
  and are effectively a way of getting ParameterServerStrategy *now*

Example : How is this efficiently using a dataset?
    for inputs, labels in train_data:
        train_step(inputs, labels)

---------

g.co/coral
https://coral.withgoogle.com/

Any Linux computer with a USB port
*  Debian 6.0 or higher, or any derivative thereof (such as Ubuntu 10.0+)
*  System architecture of either x86_64 or ARM64 with ARMv8 instruction set

Not sure whether Fedora will work...

wget http://storage.googleapis.com/cloud-iot-edge-pretrained-models/edgetpu_api.tar.gz
tar -xzf edgetpu_api.tar.gz  # 32Mb
cd python-tflite-source
bash ./install.sh

"""
Recognized as Linux on x86_64!
Warning: During normal operation, the Edge TPU Accelerator may heat up, depending
on the computation workloads and operating frequency. Touching the metal part of the
device after it has been operating for an extended period of time may lead to discomfort
and/or skin burns. As such, when running at the default operating frequency, the device is
intended to safely operate at an ambient temperature of 35C or less. Or when running at
the maximum operating frequency, it should be operated at an ambient temperature of
25C or less.

Google does not accept any responsibility for any loss or damage if the device is operated
outside of the recommended ambient temperature range.
.............................................................
Would you like to enable the maximum operating frequency? Y/NN
Using default operating frequency.
Install dependent libraries.
## Wants sudo password...
### BUUUUT : Clearly the install.sh expect Ubuntu (apt-get etc)
"""

#sudo apt-get install -y 
#  libusb-1.0-0-dev zlib1g-dev libgoogle-glog-dev 
#  libjpeg-dev libunwind-dev libc++-dev libc++abi-dev
#  swig 
#  python3-setuptools python3-numpy python3-dev 

dnf install python3-setuptools python3-numpy python3-devel \
            swig \
            libjpeg-turbo libunwind libcxx libcxxabi \
            libusb zlib glog
            
            ?libusb (installed)
            ?libusbx (installed)
            ?libusbx-devel (installed)
            ?python3-libusb1
            
            ?zlib-devel (installed)
            
            ?glog-devel
            
            # libjpeg-turbo-devel libunwind-devel


# Plug in the Accelerator using the provided USB 3.0 cable. 
# (If you already plugged it in, remove it and replug it so the just-installed udev rule can take effect.)


. env3/bin/activate
#  tensorflow 1.13

./install # Need to be root for some of this...

# tail -f /var/log/messages # has this ominous news (see last line) :

## Mar 11 02:55:49 changi kernel: usb 3-1: new SuperSpeed USB device number 2 using xhci_hcd
## Mar 11 02:55:49 changi kernel: usb 3-1: New USB device found, idVendor=1a6e, idProduct=089a
## Mar 11 02:55:49 changi kernel: usb 3-1: New USB device strings: Mfr=0, Product=0, SerialNumber=0
## Mar 11 02:55:49 changi mtp-probe[19971]: checking bus 3, device 2: "/sys/devices/pci0000:00/0000:00:14.0/usb3/3-1"
## Mar 11 02:55:49 changi mtp-probe[19971]: bus: 3, device: 2 was not an MTP device
## Mar 11 02:55:49 changi journal[3790]: unhandled action 'bind' on /sys/devices/pci0000:00/0000:00:14.0/usb3/3-1

Step 1 : Remove 'plugdev' from .rules
Step 2 : MODE="0660", ?

Without USB device :
[root@changi python-tflite-source]# lsusb
Bus 001 Device 002: ID 8087:8000 Intel Corp. 
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 003 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 002 Device 005: ID 046d:c534 Logitech, Inc. Unifying Receiver
Bus 002 Device 004: ID 04f3:0021 Elan Microelectronics Corp. 
Bus 002 Device 021: ID 04ca:3006 Lite-On Technology Corp. 
Bus 002 Device 002: ID 04f2:b3f6 Chicony Electronics Co., Ltd HD WebCam (Acer)
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub


With USB device :
[root@changi python-tflite-source]# lsusb
Bus 001 Device 002: ID 8087:8000 Intel Corp. 
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 003 Device 004: ID 1a6e:089a Global Unichip Corp. ##############  this one ############
Bus 003 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 002 Device 005: ID 046d:c534 Logitech, Inc. Unifying Receiver
Bus 002 Device 004: ID 04f3:0021 Elan Microelectronics Corp. 
Bus 002 Device 021: ID 04ca:3006 Lite-On Technology Corp. 
Bus 002 Device 002: ID 04f2:b3f6 Chicony Electronics Co., Ltd HD WebCam (Acer)
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub

... appears to be on the USB3.0 hub == GOOD!

ls -l /sys/devices/pci0000:00/0000:00:14.0/usb3/3-1/
--w-------. 1 root root  4096 Mar 12 00:49 remove
-r--r--r--. 1 root root  4096 Mar 12 00:49 speed
lrwxrwxrwx. 1 root root     0 Mar 12 00:49 subsystem -> ../../../../../bus/usb
-rw-r--r--. 1 root root  4096 Mar 12 00:49 uevent
-r--r--r--. 1 root root  4096 Mar 12 00:49 urbnum
-r--r--r--. 1 root root  4096 Mar 12 00:49 version

After udev change :

Doesn't appear to make any difference



# From the python-tflite-source directory
cd edgetpu/

python3 demo/classify_image.py \
--model test_data/mobilenet_v2_1.0_224_inat_bird_quant_edgetpu.tflite \
--label test_data/inat_bird_labels.txt \
--image test_data/parrot.jpg

# After ~20sec : 
##  Failed to retreive TPU context
##  Node number 0 (edgetpu-custom-op) failed to prepare.
# This is same error as when EdgeTPU device not connected at all...


# After upgrade from 
#  kernel-4.16.5-300.fc28.x86_64  to  kernel-4.20.11-100.fc28.x86_64
# and reboot into new kernel:

uname -a
# Linux changi 4.20.11-100.fc28.x86_64 #1 SMP Wed Feb 20 15:51:24 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux

Mar 12 21:28:17 changi kernel: usb 3-1: new SuperSpeed Gen 1 USB device number 6 using xhci_hcd
## The following line is slightly different in the newer kernel
Mar 12 21:28:17 changi kernel: usb 3-1: New USB device found, idVendor=1a6e, idProduct=089a, bcdDevice= 1.00
Mar 12 21:28:17 changi kernel: usb 3-1: New USB device strings: Mfr=0, Product=0, SerialNumber=0
Mar 12 21:28:17 changi mtp-probe[8160]: checking bus 3, device 6: "/sys/devices/pci0000:00/0000:00:14.0/usb3/3-1"
Mar 12 21:28:17 changi mtp-probe[8160]: bus: 3, device: 6 was not an MTP device
Mar 12 21:28:17 changi journal[1945]: unhandled action 'bind' on /sys/devices/pci0000:00/0000:00:14.0/usb3/3-1


# Haven't even gone into 'pip'

python3 demo/classify_image.py --model test_data/mobilenet_v2_1.0_224_inat_bird_quant_edgetpu.tflite --label test_data/inat_bird_labels.txt --image test_data/parrot.jpg
---------------------------
Ara macao (Scarlet Macaw)
Score :  0.61328125
---------------------------
Platycercus elegans (Crimson Rosella)
Score :  0.15234375



Sadly (from a debugging perspective), the previous kernel also works : 

uname -a
# Linux changi 4.16.5-300.fc28.x86_64 #1 SMP Fri Apr 27 17:38:36 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux

---------------------------
Ara macao (Scarlet Macaw)
Score :  0.61328125
---------------------------
Platycercus elegans (Crimson Rosella)
Score :  0.15234375


But what about a picture of a HotDog? == Background...

Tell-tale sign that this MobileNet isn't trained on ImageNet, but rather on a Birds corpus.
Data directory also appears to have a Coco-trained model.

---------------------------

NB:  My EdgeTPU is next appearing in a demo in Jakarta on the 22-March-2019  (Christiano)

---------------------------

Answered question (via disqus) 

  Very interesting presentation indeed.
  However, I got a question regarding the Keras Quantization API.
  Is there any documentation regarding it? 
  It would be useful to know how this quantization scheme works (per channel, in 2^i numbers, etc).

  Thanks!

    For the Keras piece, the original talk framed it as more of "this is how it will look" rather than "this is what you can do now". 
    Here's the place it's talked about in the Summit video : https://youtu.be/DKosV_-4pdQ

---------

NetEase: Course

Presentation slides (as PDF) : http://redcatlabs.com/downloads/2019-03-14_TFandDL_TFLite.pdf

!-->



The slides for my talk (as a 3.8Mb PDF) are here :

<a href="http://redcatlabs.com/downloads/2019-03-14_TFandDL_TFLite.pdf" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2019-03-14_TFandDL_TFLite_1_600x390.png)
</a>

If there are any questions about the presentation please ask below, 
or contact me using the details given on the slides themselves.

<a href="http://redcatlabs.com/downloads/2019-03-14_TFandDL_TFLite.pdf" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2019-03-14_TFandDL_TFLite_55_600x390.png)
</a>


PS:  And if you liked the content, please 'star' my <a href="https://github.com/mdda/deep-learning-workshop" target="_blank">Deep Learning Workshop</a> repo ::
<!-- From :: https://buttons.github.io/ -->
<!-- Place this tag where you want the button to render. -->
<span style="position:relative;top:5px;">
<a aria-label="Star mdda/deep-learning-workshop on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/mdda/deep-learning-workshop#stargazers_count" data-count-href="/mdda/deep-learning-workshop/stargazers" data-icon="octicon-star" href="https://github.com/mdda/deep-learning-workshop" class="github-button">Star</a>
<!-- Place this tag right after the last button or just before your close body tag. -->
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
</span>

