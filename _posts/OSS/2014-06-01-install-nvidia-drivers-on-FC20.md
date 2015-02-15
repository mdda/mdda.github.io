---
comments: true
date: 2014-05-28 
title: Install nvidia drivers on Fedora FC20
category: OSS
tags:
- Nvidia
- fedora
- linux
- opencl
- fc20
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Basic steps : 

  * Install nvidia Proprietary Drivers (mainly CUDA-oriented instructions)

  * Install additional SDK stuff for OpenCL 
  
  * Prove that the install worked
  
  
### Download and install the nVidia driver

For the official links, see : 

  * [Nvidia OpenCL information (limited)](https://developer.nvidia.com/opencl)
  * [Nvidia driver download links](http://www.nvidia.com/Download/index.aspx?lang=en-us)


The 64-bit linux driver takes me to :

  * [64-bit linux driver download page](http://www.nvidia.com/download/driverResults.aspx/75019/en-us)


So that I can download : 

  * NVIDIA-Linux-x86_64-331.67.run


NB : This has to be downloaded via a browser, so, since the target machine is (essentially) headless, 
I have to download to a regular machine and then rsync it over.

{% highlight bash %}
bash
mkdir install
cd install 

## See : http://www.if-not-true-then-false.com/2014/fedora-20-nvidia-guide/

rsync -avz user@example.com:~/Downloads/NVIDIA-Linux-x86_64-331.67.run .
{% endhighlight %}

### Prepare the Machine

Before this will work on a 'virgin' Fedora Core 20 machine : 

{% highlight bash %}
bash
yum -y install yum-utils
yum -y install git joe wget

## For nvidia install (and gcc-c++ for samples)
yum -y install gcc gcc-c++ kernel-devel 

yum update
{% endhighlight %}

Then ```reboot```.


### Install the nVidia driver

Need to stop X to install drivers, and make the script executable : 

{% highlight bash %}
bash
service lightdm stop

chmod 744 NVIDIA-Linux-x86_64-331.67.run 
./NVIDIA-Linux-x86_64-331.67.run 
{% endhighlight %}

During the running of the script : 

  * Allow it to create a modprobe file to disable noveau

  * "No" to 32-bit compat
  
  * "No" to modify XF86Config or xorg.conf


### Rewrite the initramfs to prevent ```nouveau``` being loaded

{% highlight bash %}
bash
mv /boot/initramfs-$(uname -r).img /boot/initramfs-$(uname -r)-nouveau.img
dracut /boot/initramfs-$(uname -r).img $(uname -r)
reboot
{% endhighlight %}

Having done that : 

  * lsmod should shows no nouveau driver present
  
  * Actual hardaare display is still showing (it's connected to the Intel integrated board)


Moreover :

  * lsmod shows new nvidia driver present

  * Login display (and XFCE) is still showing on Intel integrated board


### NVidia GPU Computing SDK 

The SDK includes the OpenCL interface stuff, though it doesn't advertise it much.

Go to : 

  * [Nvidia's GPU computing SDK page](https://developer.nvidia.com/gpu-computing-sdk)
  
  
The latest versions of the GPU Computing SDK and the CUDA Toolkit (which is required to compile the SDK code samples) are available on the CUDA Downloads Page.

  * [NVidia's CUDA downloads page](https://developer.nvidia.com/cuda-downloads)


{% highlight bash %}
bash
yum install http://developer.download.nvidia.com/compute/cuda/repos/fedora19/x86_64/cuda-repo-fedora19-6.0-37.x86_64.rpm
yum install cuda  ## 1.6Gb of stuff!!

## Sample source installed in : 
# /usr/local/cuda-6.0/samples/1_Utilities/deviceQuery

cd /usr/local/cuda-6.0/bin
./nvcc -V
{% endhighlight %}

### Now, sync up git

So further steps can be created remotely and synced seamlessly.

As local user : 

{% highlight bash %}
bash
ssh-keygen
cat "Host *.example.com
  Port 6666
" > ~/.ssh/config
chmod 600 .ssh/config 
git clone git@git.example.com:stuff.git
{% endhighlight %}

Amend ~/.bash_profile to include : 

{% highlight bash %}
bash
PATH=$PATH:/usr/local/cuda-6.0/bin
export PATH
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda-6.0/lib64
export LIBRARY_PATH=$LIBRARY_PATH:/usr/local/cuda-6.0/lib64
{% endhighlight %}


### Install the CUDA samples in personal directory (for fun)

{% highlight bash %}
bash
cuda-install-samples-6.0.sh .
cd NVIDIA_CUDA-6.0_Samples/
make
{% endhighlight %}

Appears to work!!  

  * ... 15mins elapses for all of compilation (on a i7-4770) ...


### Run some of the provided scripts as a (CUDA) test

{% highlight bash %}
bash
cd ~/NVIDIA_CUDA-6.0_Samples/bin/x86_64/linux/release
{% endhighlight %}

#### ```./bandwidthTest``` 

{% highlight bash %}
bash
[CUDA Bandwidth Test] - Starting...
Running on...

 Device 0: GeForce GTX 760
 Quick Mode

 Host to Device Bandwidth, 1 Device(s)
 PINNED Memory Transfers
   Transfer Size (Bytes)	Bandwidth(MB/s)
   33554432			12114.9

 Device to Host Bandwidth, 1 Device(s)
 PINNED Memory Transfers
   Transfer Size (Bytes)	Bandwidth(MB/s)
   33554432			12430.5

 Device to Device Bandwidth, 1 Device(s)
 PINNED Memory Transfers
   Transfer Size (Bytes)	Bandwidth(MB/s)
   33554432			150777.8

Result = PASS
{% endhighlight %}

#### ```./deviceQuery```

{% highlight bash %}
bash

./deviceQuery Starting...

 CUDA Device Query (Runtime API) version (CUDART static linking)

Detected 1 CUDA Capable device(s)

Device 0: "GeForce GTX 760"
  CUDA Driver Version / Runtime Version          6.0 / 6.0
  CUDA Capability Major/Minor version number:    3.0
  Total amount of global memory:                 2048 MBytes (2147287040 bytes)
  ( 6) Multiprocessors, (192) CUDA Cores/MP:     1152 CUDA Cores
  GPU Clock rate:                                1137 MHz (1.14 GHz)
  Memory Clock rate:                             3100 Mhz
  Memory Bus Width:                              256-bit
  L2 Cache Size:                                 524288 bytes
  Maximum Texture Dimension Size (x,y,z)         1D=(65536), 2D=(65536, 65536), 3D=(4096, 4096, 4096)
  Maximum Layered 1D Texture Size, (num) layers  1D=(16384), 2048 layers
  Maximum Layered 2D Texture Size, (num) layers  2D=(16384, 16384), 2048 layers
  Total amount of constant memory:               65536 bytes
  Total amount of shared memory per block:       49152 bytes
  Total number of registers available per block: 65536
  Warp size:                                     32
  Maximum number of threads per multiprocessor:  2048
  Maximum number of threads per block:           1024
  Max dimension size of a thread block (x,y,z): (1024, 1024, 64)
  Max dimension size of a grid size    (x,y,z): (2147483647, 65535, 65535)
  Maximum memory pitch:                          2147483647 bytes
  Texture alignment:                             512 bytes
  Concurrent copy and kernel execution:          Yes with 1 copy engine(s)
  Run time limit on kernels:                     No
  Integrated GPU sharing Host Memory:            No
  Support host page-locked memory mapping:       Yes
  Alignment requirement for Surfaces:            Yes
  Device has ECC support:                        Disabled
  Device supports Unified Addressing (UVA):      Yes
  Device PCI Bus ID / PCI location ID:           1 / 0
  Compute Mode:
     < Default (multiple host threads can use ::cudaSetDevice() with device simultaneously) >

deviceQuery, CUDA Driver = CUDART, CUDA Driver Version = 6.0, CUDA Runtime Version = 6.0, NumDevs = 1, Device0 = GeForce GTX 760
Result = PASS
{% endhighlight %}


### Now for the OpenCL tools 

Useful resource : 

  * http://wiki.tiker.net/OpenCLHowTo
  
  
Check that the correct ICD files appear to be installed in : ```/etc/OpenCL/vendors/nvidia.icd ```.   YES!

Now install the generic ```opencl``` headers, etc : 

{% highlight bash %}
bash
yum install opencl-headers

curl https://codeload.github.com/hpc12/tools/tar.gz/master | tar xvfz -
cd tools-master/
make ## Appears to work if LD_LIBRARY_PATH and LIBRARY_PATH are set
{% endhighlight %}

### Run a few OpenCL tools 

#### ```./print-devices```

{% highlight bash %}
bash
platform 0: vendor 'NVIDIA Corporation'
  device 0: 'GeForce GTX 760'
{% endhighlight %}

#### ```./cl-demo 1000000 10```

{% highlight bash %}
bash
Choose platform:
[0] NVIDIA Corporation
Enter choice: 0
Choose device:
[0] GeForce GTX 760
Enter choice: 0
---------------------------------------------------------------------
NAME: GeForce GTX 760
VENDOR: NVIDIA Corporation
PROFILE: FULL_PROFILE
VERSION: OpenCL 1.1 CUDA
EXTENSIONS: cl_khr_byte_addressable_store cl_khr_icd cl_khr_gl_sharing cl_nv_compiler_options cl_nv_device_attribute_query cl_nv_pragma_unroll  cl_khr_global_int32_base_atomics cl_khr_global_int32_extended_atomics cl_khr_local_int32_base_atomics cl_khr_local_int32_extended_atomics cl_khr_fp64 
DRIVER_VERSION: 331.62

Type: GPU 
EXECUTION_CAPABILITIES: Kernel 
GLOBAL_MEM_CACHE_TYPE: Read-Write (2)
CL_DEVICE_LOCAL_MEM_TYPE: Local (1)
SINGLE_FP_CONFIG: 0x3f
QUEUE_PROPERTIES: 0x3

VENDOR_ID: 4318
MAX_COMPUTE_UNITS: 6
MAX_WORK_ITEM_DIMENSIONS: 3
MAX_WORK_GROUP_SIZE: 1024
PREFERRED_VECTOR_WIDTH_CHAR: 1
PREFERRED_VECTOR_WIDTH_SHORT: 1
PREFERRED_VECTOR_WIDTH_INT: 1
PREFERRED_VECTOR_WIDTH_LONG: 1
PREFERRED_VECTOR_WIDTH_FLOAT: 1
PREFERRED_VECTOR_WIDTH_DOUBLE: 1
MAX_CLOCK_FREQUENCY: 1137
ADDRESS_BITS: 32
MAX_MEM_ALLOC_SIZE: 536821760
IMAGE_SUPPORT: 1
MAX_READ_IMAGE_ARGS: 256
MAX_WRITE_IMAGE_ARGS: 16
IMAGE2D_MAX_WIDTH: 32768
IMAGE2D_MAX_HEIGHT: 32768
IMAGE3D_MAX_WIDTH: 4096
IMAGE3D_MAX_HEIGHT: 4096
IMAGE3D_MAX_DEPTH: 4096
MAX_SAMPLERS: 32
MAX_PARAMETER_SIZE: 4352
MEM_BASE_ADDR_ALIGN: 4096
MIN_DATA_TYPE_ALIGN_SIZE: 128
GLOBAL_MEM_CACHELINE_SIZE: 128
GLOBAL_MEM_CACHE_SIZE: 98304
GLOBAL_MEM_SIZE: 2147287040
MAX_CONSTANT_BUFFER_SIZE: 65536
MAX_CONSTANT_ARGS: 9
LOCAL_MEM_SIZE: 49152
ERROR_CORRECTION_SUPPORT: 0
PROFILING_TIMER_RESOLUTION: 1000
ENDIAN_LITTLE: 1
AVAILABLE: 1
COMPILER_AVAILABLE: 1
MAX_WORK_GROUP_SIZES: 1024 1024 64 
---------------------------------------------------------------------
*** Kernel compilation resulted in non-empty log message.
*** Set environment variable CL_HELPER_PRINT_COMPILER_OUTPUT=1 to see more.
*** NOTE: this may include compiler warnings and other important messages
***   about your code.
*** Set CL_HELPER_NO_COMPILER_OUTPUT_NAG=1 to disable this message.
0.000169 s
141.693987 GB/s
GOOD
{% endhighlight %}


#### Entirely unhelpful side-track ( Please ignore )

The following seemed like a blind alley : There's no need to do this...

  * From https://developer.nvidia.com/opencl "Device Query"
  
{% highlight bash %}
bash
wget http://developer.download.nvidia.com/compute/DevZone/OpenCL/Projects/oclDeviceQuery.tar.gz
tar -xzf oclDeviceQuery.tar.gz 

cd "NVIDIA GPU Computing SDK/OpenCL/src/oclDeviceQuery"
## For "/usr/bin/ld: cannot find -lOpenCL" :
# see : http://askubuntu.com/questions/77140/cannot-find-lopencl-error-when-making-the-cuda-sdk
## For "/usr/bin/ld: cannot find -lshrutil_x86_64" : 
# see : https://devtalk.nvidia.com/default/topic/468526/cuda-programming-and-performance/-usr-bin-ld-cannot-find-lshrutil_x86_64/

LIBRARY_PATH=/usr/lib64/nvidia/:$LIBRARY_PATH make
{% endhighlight %}




