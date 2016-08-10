---
date: 2016-08-10
title: Tesseract and Python on Fedora
category: OSS
tags:
- fedora
- linux
- tesseract
- python
- opencv
layout: post
published: true
---
{% include JB/setup %}

Fedora, while including a comprehensive ```tesseract``` set of ```rpm```s, doesn't have the equivalent of 
```tesseract-python```, so I needed something to build/import easily.

However, quick Google searches offer [several solutions](https://www.quora.com/How-do-I-use-PyTesser-and-Tesseract-OCR-in-Ubuntu-with-Python) that now look inappropriate : 

*  [pip install tesseract](https://code.google.com/archive/p/python-tesseract/) appears to contain a complete, old
  ```tesseract``` build - it's 40Mb

*  [pip install pytesseract](https://pypi.python.org/pypi/pytesseract) is GPL3, which is inappropriate for my use-case

*  Using ```tesseract``` directly via commandline embedding

However, reading the ```tesseract``` project's wiki pages on github indicate that there are several
other choices available, and I (somewhat arbitrarily) chose [```tesserocr```](https://github.com/sirfz/tesserocr), which is MIT licensed, and 
has a fairly comprehensive API into the 'raw' ```tesseract``` C/C++ code.


### Installation of ```tesserocr```

{% highlight bash %}
sudo dnf install tesseract-devel
pip install tesserocr
{% endhighlight %}


### Usage

The following also includes hints for interoperability with ```opencv``` using ```pillow``` (for ```PIL```), which 
can be helpful in cleaning up the image prior to textextraction.   It's useful to pre-clean, even though ```tesseract``` 
iteself does some cleaning, because there's often application-specific knowledge that can be used more effectively than
the ```tesseract``` generic methods.


{% highlight python %}
from tesserocr import PyTessBaseAPI, RIL, PSM

im = cleaned_view

from PIL import Image
im_pil = Image.fromarray(cv2.cvtColor(im, cv2.COLOR_BGR2RGB))

plt.imshow(im_pil, 'gray')
plt.show()

#  PSM : https://github.com/sirfz/tesserocr/blob/3c699c8cff7a7c5552e7bf51d5631bbf95414c9c/tesseract.pxd#L214
with PyTessBaseAPI(psm=PSM.SINGLE_BLOCK) as ocr:
    ocr.SetImage(im_pil)
    
    boxes = ocr.GetComponentImages(RIL.TEXTLINE, True)
    print 'Found {} textline image components.'.format(len(boxes))
    
    for i, (im, box, _, _) in enumerate(boxes):
        # box is a dict with x, y, w and h keys
        ocr.SetRectangle(box['x'], box['y'], box['w'], box['h'])
        
        ocrResult = ocr.GetUTF8Text()
        conf = ocr.MeanTextConf()
        
        print (u"Box[{0}]: x={x}, y={y}, w={w}, h={h}, "
               "confidence: {1}, text: {2}").format(i, conf, ocrResult.replace('\n',''), **box)    
{% endhighlight %}
