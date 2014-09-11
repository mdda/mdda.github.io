---
comments: true
date: 2014-06-03
title: Building VisualSFM on Fedora FC20
category: OSS
tags:
- fedora
- linux
- opencl
- fc20
- visualsfm
- structure from motion
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


The VisualSFM system is the recommended way to use PMVS and CMVS : 

  * http://www.di.ens.fr/pmvs/
  * http://www.di.ens.fr/cmvs/

So, download the Linux 64-bit source code from : 
{% highlight bash %}
http://ccwu.me/vsfm/
{% endhighlight %}

### The Process for Running VisualSFM : 

The following have to be run in a coordinated fashion, which is what VisualSFM does : 

  * Bundler
  
  * CMVS
  
  * PMVS2

 
Emphasising this, the notes for CMVS state : You should ALWAYS use CMVS after Bundler and before PMVS2 (even when your image set is small), because :

  * PMVS2 will run faster and produce more accurate results with the produced clusters (see the bullet below for the reasoning.)
  
  * CMVS produces option files (option-0000, option-0001, ...) for PMVS2 and a script file (pmvs.sh) containing PMVS2 commands. You just need to run pmvs.sh.
  
  * CMVS produces "vis.dat", which is an optional input file for PMVS2 containing image-neighborhood information. PMVS2 should run significantly faster with this additional input file.

  * Besides clustering input images, CMVS also removes redundant images that are unnecessary for MVS reconstructions, which speeds up PMVS2 as well as improves reconstruction accuracy (redundant image clusters without enough baseline degrades reconstruction accuracy.)



### This is not going to be easy...

See installation instructions for Ubuntu: : 

   * http://www.10flow.com/2012/08/15/building-visualsfm-on-ubuntu-12-04-precise-pangolin-desktop-64-bit/

And the notes : 

   * http://abstract.cs.washington.edu/~ccwu/vsfm/vsfm.cgi?linux64

Ultimately, we have to : 

   * Go through each sub-module in turn 
   
   * Get them to compile cleanly
   
   * Copy the resulting `.so` to the main VisualSFM directory structure
   

### Building SIFT

Source files : 

   * http://cs.unc.edu/~ccwu/siftgpu/
   
   * http://cs.unc.edu/~ccwu/siftgpu/download.html

{% highlight bash %}
mv ~/Downloads/SiftGPU-V400.zip .
unzip SiftGPU-V400.zip
cd SiftGPU
make
{% endhighlight %}

Errors : 

{% highlight bash %}
/usr/bin/ld: cannot find -lGLEW
/usr/bin/ld: cannot find -lglut
/usr/bin/ld: cannot find -lIL
{% endhighlight %}

Therefore :

{% highlight bash %}
yum install freeglut-devel glew-devel DevIL-devel
{% endhighlight %}

Compiles OK (with warnings).  Next : Copy resultant .so into vsfm : 

{% highlight bash %}
cd ..
cp SiftGPU/bin/libsiftgpu.so vsfm/bin/
{% endhighlight %}



### MultiCore Bundle Adjustment

Source files : 

  * http://grail.cs.washington.edu/projects/mcba/
  
{% highlight bash %}
wget http://grail.cs.washington.edu/projects/mcba/pba_v1.0.5.zip
unzip pba_v1.0.5.zip
cd pba
make -f makefile_no_gpu 
## or 'make' if there is a GPU...
{% endhighlight %}

Compiles OK (with warnings).  Next : Copy resultant (relevant) executable into vsfm : 

{% highlight bash %}
cd ..
#cp  pba/bin/libpba_no_gpu.so vsfm/bin/
cp  pba/bin/libpba_no_gpu.so vsfm/bin/libpba.so 
{% endhighlight %}

### PMVS2

Source files : 

   * http://www.di.ens.fr/pmvs/
   
   * http://www.di.ens.fr/pmvs/documentation.html
   
{% highlight bash %}
wget http://www.di.ens.fr/pmvs/pmvs-2-fix0.tar.gz
tar -xzf pmvs-2-fix0.tar.gz 
cd pmvs-2/program/main
make
{% endhighlight %}

Errors : 

{% highlight bash %}
ERROR : boost::shared_ptr
ERROR : ../base/pmvs/optim.h:6:30: fatal error: gsl/gsl_multimin.h: No such file or directory
ERROR : ../base/image/image.cc:8:21: fatal error: jpeglib.h: No such file or directory
{% endhighlight %}

Therefore : 

{% highlight bash %}
yum install boost-devel gsl-devel libjpeg-turbo-devel blas-devel
{% endhighlight %}


BUT : make still has errors : 
{% highlight bash %}
ERROR : ../base/numeric/mylapack.cc:6:25: fatal error: clapack/f2c.h: No such file or directory
{% endhighlight %}

This is an actual programming problem : The lapack files have been refactored on Fedora.

#### Updating the PMVS2 source 

Update `../base/numeric/mylapack.cc` ::

FROM :: 

{% highlight bash %}
extern "C" {
#include <clapack/f2c.h>
#include <clapack/clapack.h>
};
{% endhighlight %}

TO :: 

{% highlight bash %}
extern "C" {
//#include <clapack/f2c.h>
//#include <clapack/clapack.h>
#include <lapacke/lapacke.h>
};
#define integer int
{% endhighlight %}


Update `../base/numeric/mylapack.h` ::

FROM :: 

{% highlight bash %}
static void lls(std::vector<float>& A,
                  std::vector<float>& b,
                  long int width, long int height);
  
  static void lls(std::vector<double>& A,
                  std::vector<double>& b,
                  long int width, long int height);
{% endhighlight %}
                  
TO:: 

{% highlight bash %}
static void lls(std::vector<float>& A,
                  std::vector<float>& b,
                  int width, int height);
  
  static void lls(std::vector<double>& A,
                  std::vector<double>& b,
                  int width, int height);
{% endhighlight %}

Now it should compile fine :

{% highlight bash %}
make 
cd ../../..
{% endhighlight %}

Copy resultant executable into vsfm : 

{% highlight bash %}
cp pmvs-2/program/main/pmvs2 vsfm/bin/
{% endhighlight %}

###  Graculus

Source files : (Need to send email to authors) :

  * http://www.cs.utexas.edu/users/dml/Software/graclus.html

{% highlight bash %}
mv ~/Downloads/_u_www_users_dml_Software_graclus1.2.tar.gz .
tar -xzf _u_www_users_dml_Software_graclus1.2.tar.gz
cd graclus1.2/
{% endhighlight %}

Need to change Makeile.in: 

FROM ::

{% highlight bash %}
# What options to be used by the compiler
COPTIONS = -DNUMBITS=32
{% endhighlight %}

TO ::

{% highlight bash %}
# What options to be used by the compiler
COPTIONS = -DNUMBITS=64
{% endhighlight %}

The this works with warnings :

{% highlight bash %}
make 
cd ..
{% endhighlight %}

Copy resultant executable into vsfm : 

{% highlight bash %}
cp graclus1.2/graclus vsfm/bin/
{% endhighlight %}


### CMVS

Source files : 

   * http://www.di.ens.fr/cmvs/

{% highlight bash %}
wget http://www.di.ens.fr/cmvs/cmvs-fix2.tar.gz
tar -xzf cmvs-fix2.tar.gz 
cd cmvs/program/main
{% endhighlight %}

Update Makefile TO ::  (as distributed, file is just purposefully broken)

{% highlight bash %}
#Your INCLUDE path (e.g., -I/usr/include)
YOUR_INCLUDE_PATH =

#Your metis directory (contains header files under graclus1.2/metisLib/)
YOUR_INCLUDE_METIS_PATH = -I../../../graclus1.2/metisLib

#Your LDLIBRARY path (e.g., -L/usr/lib)
YOUR_LDLIB_PATH = -L../../../graclus1.2
{% endhighlight %}

#### Updating the CMVS source 

Once again, the `lapack` references need updating (same methodology as PVMS2)

Edit `../base/numeric/lapack.cc` and `lapack.h` as in pmvs-2

Next, edit the source file `cmvs/program/base/cmvs/bundle.cc` by adding these includes at the top of the file:

{% highlight bash %}
#include <vector>
#include <numeric>
{% endhighlight %}

And now edit `cmvs/program/main/genOption.cc` by adding this include statement at the top:

{% highlight bash %}
#include <stdlib.h>
{% endhighlight %}

This should now work : 

{% highlight bash %}
make
{% endhighlight %}

Copy resultant executable(s) into vsfm :

{% highlight bash %}
cp cmvs/program/main/cmvs vsfm/bin/
cp cmvs/program/main/genOption vsfm/bin
{% endhighlight %}


### Running Whole Enchilada

{% highlight bash %}
cd vsfm/bin
./VisualSFM
{% endhighlight %}

or, (if you don't want to make the Library path changes in your `.bash_profile`) : 

{% highlight bash %}
LD_LIBRARY_PATH=$LD_LIBRARY_PATH:. ./VisualSFM 
{% endhighlight %}


### Error when trying to ">>" : Step C: Sparse 3D reconstruction

Problem : 

{% highlight bash %}
libpba.so: cannot open shared object file: No such file or directory
ERROR: unable to Load libpba.so (Multicore Bundle Adjustment). Make sure you have libpba.so in the VisualSFM bin folder; Run <ldd> to check its dependencies.
{% endhighlight %}

Solution : 

  * Need to rename the nogpu version if that's what was built above...



### Running VisualSFM (finally)

See the following for an introductory How-To on using VisualSFM : https://github.com/dddExperiments/SFMToolkit

