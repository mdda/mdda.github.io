---
comments: false
date: 2008-04-14 03:30:00+00:00
title: Adding a Disclaimer to TWiki Print format
category: OSS
wordpress_id: 141
wp_parent: '0'
wp_slug: adding-a-disclaimer-to-twiki-print-format
tags:
- fedora
- twiki
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


This is pretty hackish - but it seems to work Ok.  
  


### Putting your Disclaimers on the Bottom

  
  
Edit the variable `WEBCOPYRIGHT` on the page `TWiki.TWikiPreferences`.  For instance, make the line read like this :  

{% highlight bash %}
* Set WEBCOPYRIGHT = %MAKETEXT{"Copyright &(C)[_1] by PLATFORMedia LLC.  " args="1999-%GMTIME{$year}%"}%   
 This has been prepared solely for informational purposes.  It is not an offer, recommendation or solicitation to buy or sell, nor is it an official confirmation of terms.    

{% endhighlight %}
### Adding your Logo to the Top

  
  
Create a topic `TWiki.WebTopBarPrint` which contains the logos required for the printable page (based on `TWiki.WebTopBar`).  
  
Also, so that the Print format includes the Logo at the top, edit the file `twiki/templates/viewprint.pattern.tmpl` to contain :  

{% highlight bash %}
%TMPL:INCLUDE{"viewtopbarprint"}%  

{% endhighlight %}
near the top, and copy the file `viewtopbar.pattern.tmpl` to a new copy `viewtopbarprint.pattern.tmpl` which has the definition of TOPBAR changed to have `%INCLUDE{"%TWIKIWEB%.WebTopBarPrint"}%` instead of the existing `%INCLUDE{"%TWIKIWEB%.WebTopBar"}%`.  
  
Also, to remove the background image behind the logo, change :  

{% highlight bash %}
<div id="patternTopBar">  

{% endhighlight %}
to :  

{% highlight bash %}
<div id="patternTopBar" style="background-image:none;">  

{% endhighlight %}
and (finally) to get the logo to display on 'media=print' you'll need to comment out this section in `twiki/pub/TWiki/PatternSkin/print.css` :  

{% highlight bash %}
#patternTopBar,  
       #patternClearHeaderCenter,  
       #patternClearHeaderLeft,  
       #patternClearHeaderRight,  
       #patternTopBarContentsOuter {  
               display:none;  
       }  

{% endhighlight %}
### Forcing Printer Page-Breaks

  
Here's the code snippet you can litter on pages that print awkwardly :  

{% highlight bash %}
<DIV style="page-break-after:always"></DIV>  

{% endhighlight %}
