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
published: false
---
{% include JB/setup %}

{% highlight bash %}
{% endhighlight %}


# 14.7 xilinx 2 ise webpack

/run/media/andrewsm/NEW-WD-2TB/
  Xilinx-Tools/Xilinx_ISE_DS_Lin_14.7_1015_1.tar
  
  ./xsetup
    # Choose : ISE WebPACK (not ISE Design Suite System Edition)
  http://stackoverflow.com/questions/15119734/how-to-launch-xilinx-ise-web-pack-under-ubuntu
  
    #cd       /opt/Xilinx/14.7/ISE_DS/ISE/bin/lin64/ise
    #sudo . settings64.sh

    $ /path_to_the_installation_dir/14.4/ISE_DS/ISE/bin/lin64/ise
    $ /path_to_the_installation_dir/14.4/ISE_DS/ISE/bin/lin64/coregen
    $ /path_to_the_installation_dir/14.4/ISE_DS/EDK/bin/lin64/xps
    $ /path_to_the_installation_dir/14.4/ISE_DS/EDK/bin/lin64/xsdk

    File to run :
      /opt/Xilinx/14.7/ISE_DS/ISE/bin/lin64/ise
    
    
  https://secure.xilinx.com/webreg/login.do
  # Download license file sent from Xilinx in email :
  
  cp ~/Downloads/Xilinx.lic ~/.Xilinx/
  cd /opt/Xilinx/14.7/ISE_DS/ISE/bin/lin64
  ./ise &
  
  open project:
    VHDL-HELLO-WORLD.xise
  
  helloworld.vhd

  mystery.bit
  
  http://forum.gadgetfactory.net/index.php?/files/file/10-papilio-loader-gui/
  http://forum.gadgetfactory.net/index.php?/files/download/10-papilio-loader-gui/
    Agree to Disclaimer
  mv ~/Downloads/Papilio-Loader-V2.8.zip .
  unzip Papilio-Loader-V2.8.zip 
  cd papilio-loader/
  sudo dnf install libftdi-devel
  java -jar 

  http://papilio.cc/index.php?n=Papilio.PapilioLoaderV2
  
  
  https://github.com/GadgetFactory/DesignLab/issues/15
  
  

Xilinx : 
  Spartan 3E FPGA
    XC3S500E
      papilio-one-500k
      
  Spartan-6 : http://www.xilinx.com/support/documentation/data_sheets/ds160.pdf
    LX-4
    LX-9
      Papilio Pro  $85 
        16 DSP slices
    LX-16         
    LX-25
      XuLA2-LX25   $119
    LX-45 
      Pipistrello  $149
    LX-75 
      11k slices
    LX-100 
    LX-150

  7-series
    Have internal dynamic clock management

  Artix-7
    Arty 
      35T
  
  Zynq
    DSP Slices
    ARM 
    
  Ultrascale
    DSP Slices
  
Altera
  Have internal dynamic clock management
  
  Cylone-IV
    DE2-115 board
      ==  EP4CE115
        115k blocks
        266 multipliers
    150?
    
  Cylone-IV
    ep4ce6e22c8n datasheet
        
  http://blog.kevmod.com/2015/04/quick-report-altera-vs-xilinx-for-hobbyists/
     "1 Xilinx slice = 2 Altera LEs"
  
"older FPGAs (S3, Cyclone IV and before)"


http://papilio.cc/
  Has a 'wings' system ( ~shields) 

Pmod is 'standard' pinout for daughter boards



Papilio-Pro
  Spartan-6 LX-9 
  64Mbit SRAM
  

    


Zynq 
  Kintec-7 FPGA 
  Dual ARM core  (i.e. Raspberry-Pi /2)

Parallella  ~$100
  
BeMicro
  https://www.arrow.com/en/reference-designs/bemicro-cv-a9-fpga-development-kit-features-low-cost-28nm-cyclone-v-e-device-5cefa9f23c8n-and-is-the-perfect-platform-for-small-footprint-embedded-applications/80092271AA830AEFEBE14BA843994F0D
    5CEFA9F23C8N
    The CV-A9 with 301K Logic Elements, over 12Mbits of on-chip RAM and 684 variable precision DSP blocks
    
    
Papillo : 
  VGA / SVGA is fine
  HDMI really difficult (but possible/limited)
  

hamsterworks.co.nz
nandland.com
fpga4fun.com


https://joelw.id.au/FPGA/CheapFPGADevelopmentBoards


fpgarduino
  Arduino on the FPGA
    Allows much more flexibility in IO...
    
Definition language
  Fundamental tooling (can be mixed)
    Verilog : .v files
      Often used in America
      Terse

    VHDL : .???
      Often used in Europe
      More verbose

  Haskell 
    Clash
      Michal/
      
    Kansas Lava
      Go"rge
    
  Python
    MyHDL
      


    
ZPUino
  http://www.alvie.com/zpuino/
  