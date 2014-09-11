---
comments: true
date: 2014-06-05
title: Install Radeon OpenCL drivers on Fedora FC20
category: OSS
tags:
- AMD
- radeon
- HD5570
- fedora
- linux
- opencl
- fc20
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Basic steps : 

  * Install ATI Official Drivers (see other post)

  * Install additional SDK stuff for OpenCL 
  
  * Prove that the install worked


### Get the OpenCL SDK

File name (search on AMD site) : `AMD-APP-SDK` : http://developer.amd.com/tools-and-sdks/opencl-zone/opencl-tools-sdks/amd-accelerated-parallel-processing-app-sdk/

There is a way to get `wget` to provide a suitable phoney browser `user-agent`, but it escapes me for now.  It's a 130Mb file...

{% highlight bash %}
yum install opencl-headers
mkdir AMD-APP-SDK
mv AMD-APP-SDK-v2.9-lnx64.tgz AMD-APP-SDK/
cd AMD-APP-SDK/
tar -tzf AMD-APP-SDK-v2.9-lnx64.tgz 
more ReadMe.txt 
./Install-AMD-APP.sh 
{% endhighlight %}

Check whether the icd files are right : 
{% highlight bash %}
more /etc/OpenCL/vendors/amdocl64.icd 
{% endhighlight %}

### Checking whether the card is there 

Fedora has a clinfo package, which is useful :

{% highlight bash %}
yum install clinfo
clinfo
{% endhighlight %}

Gives : 

{% highlight bash %}
No protocol specified
Number of platforms                               1
  Platform Name                                   AMD Accelerated Parallel Processing
  Platform Vendor                                 Advanced Micro Devices, Inc.
  Platform Version                                OpenCL 1.2 AMD-APP (1526.3)
  Platform Profile                                FULL_PROFILE
  Platform Extensions                             cl_khr_icd cl_amd_event_callback cl_amd_offline_devices

  Platform Name                                   AMD Accelerated Parallel Processing
Number of devices                                 1
  Device Name                                     AMD Phenom(tm) II X4 830 Processor
  Device Vendor                                   AuthenticAMD
  Device Version                                  OpenCL 1.2 AMD-APP (1526.3)
  Driver Version                                  1526.3 (sse2)
  Device OpenCL C Version                         OpenCL C 1.2
  Device Type                                     CPU
  Device Profile                                  FULL_PROFILE
  Device Board Name                              
  Max compute units                               4
  Max clock frequency                             800MHz
  Device Partition                                (core, cl_ext_device_fission)
    Max number of sub-devices                     4
    Supported partition types                     equally, by counts, by affinity domain
    Supported affinity domains                    L1 cache, L2 cache, L3 cache, next partitionable
    Supported partition types (ext)               equally, by counts, by affinity domain
    Supported affinity domains (ext)              L3 cache, L2 cache, L1 cache, next fissionable
  Max work item dimensions                        3
    Max work item size[0]                         1024
    Max work item size[1]                         1024
    Max work item size[2]                         1024
  Max work group size                             1024
  Preferred work group size multiple              1
  Preferred / native vector sizes                
    char                                                16 / 16     
    short                                                8 / 8      
    int                                                  4 / 4      
    long                                                 2 / 2      
    half                                                 2 / 2        (n/a)
    float                                                4 / 4      
    double                                               2 / 2        (cl_khr_fp64)
  Half-precision   Floating-point support         (n/a)
  Single-precision Floating-point support       
    Denormals                                     Yes
    Infinity and NANs                             Yes
    Round to nearest                              Yes
    Round to zero                                 Yes
    Round to infinity                             Yes
    IEEE754-2008 fused multiply-add               Yes
    Correctly-rounded divide and sqrt operations  Yes
    Support is emulated in software               No
  Double-precision Floating-point support         (cl_khr_fp64)
    Denormals                                     Yes
    Infinity and NANs                             Yes
    Round to nearest                              Yes
    Round to zero                                 Yes
    Round to infinity                             Yes
    IEEE754-2008 fused multiply-add               Yes
    Correctly-rounded divide and sqrt operations  No
    Support is emulated in software               No
  Address bits                                    64, Little-Endian
  Global memory size                              8372871168 ( 7.798GB)
  Error Correction support                        No
  Max memory allocation                           2147483648 (     2GB)
  Unified memory for Host and Device              Yes
  Minimum alignment for any data type             128 bytes
  Alignment of base address                       1024 bits (128 bytes)
  Global Memory cache type                        Read/Write
  Global Memory cache size                        65536 (    64KB)
  Global Memory cache line                        64 bytes
  Image support                                   Yes
    Max number of samplers per kernel             16
    Max 1D image size                             65536 pixels
    Max 1D or 2D image array size                 2048 images
    Max 2D image size                             8192x8192 pixels
    Max 3D image size                             2048x2048x2048 pixels
    Max number of read image args                 128
    Max number of write image args                8
  Local memory type                               Global
  Local memory size                               32768 (    32KB)
  Max constant buffer size                        65536 (    64KB)
  Max number of constant args                     8
  Max size of kernel argument                     4096 (     4KB)
  Queue properties                               
    Out-of-order execution                        No
    Profiling                                     Yes
  Profiling timer resolution                      1ns
  Profiling timer offset since Epoch (AMD)        1401389366941759323ns (Fri May 30 02:49:26 2014)
  Execution capabilities                         
    Run OpenCL kernels                            Yes
    Run native kernels                            Yes
  Prefer user sync for interops                   Yes
  printf() buffer size                            65536 (    64KB)
  Device Built-in kernels                        
  Device Available                                Yes
  Compiler Available                              Yes
  Linker Available                                No
  Device Extensions                               cl_khr_fp64 cl_amd_fp64 cl_khr_global_int32_base_atomics cl_khr_global_int32_extended_atomics cl_khr_local_int32_base_atomics cl_khr_local_int32_extended_atomics cl_khr_int64_base_atomics cl_khr_int64_extended_atomics cl_khr_3d_image_writes cl_khr_byte_addressable_store cl_khr_gl_sharing cl_ext_device_fission cl_amd_device_attribute_query cl_amd_vec3 cl_amd_printf cl_amd_media_ops cl_amd_media_ops2 cl_amd_popcnt cl_khr_spir cl_khr_gl_event
{% endhighlight %}

