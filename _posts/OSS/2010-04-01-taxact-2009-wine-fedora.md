---
comments: false
date: 2010-04-16 04:23:29+00:00
title: Running TaxAct 2009 with Wine on Fedora
category: OSS
wordpress_id: 318
wp_parent: '0'
wp_slug: taxact-2009-wine-fedora
tags:
- fedora
- TaxAct
- wine
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Having to dual-boot into WinXP or Vista to run a tax program once a year is really bothersome.  So, this year (the night before taxes were due), I set on the path of submitting my taxes without leaving Fedora.  

I'd used TaxAct before (business and personal), so it was natural to want to see whether it would work in wine.

Install wine from scratch

{% highlight bash %}
yum install wine cabextract
<./code>`

Install winetricks to streamline the process :

{% endhighlight %}
cd ~/.wine
wget http://www.kegel.com/wine/winetricks
chmod 755 winetricks

{% highlight bash %}
Fix winetricks so that the i686 vs. 86x64 dual installations don't confuse it :

{% endhighlight %}
scite winetricks

{% highlight bash %}
Change :

{% endhighlight %}
*)
WINE=${WINE:-wine}

{% highlight bash %}
To :

{% endhighlight %}
*)
WINE=${WINE:-wine32}

{% highlight bash %}
Use winetricks to install some prerequisites :

{% endhighlight %}
./winetricks winxp
./winetricks ie6

{% highlight bash %}
Installation :

{% endhighlight %}
wine path_to_downloaded_installer/ta09dxdw.exe

{% highlight bash %}
Running :

{% endhighlight %}
wine32  drive_c/2nd\ Story\ Software/TaxACT\ 2009/TaxACT09.exe

```

What doesn't work : 



	
  * Help text area at the bottom of screen has major issues with scrolling (apparently because the authors are trying to do some bit-blitting to speed up scrolling).

	
  * Upload of final filing didn't immediately work, though that may be due to servers at the other end.



What works :

	
  * Basically the whole tax preparation appears to work just fine, even the pop-up calculator/worksheets.  Overall, this was a much better experience than expected.

	
  * The program automatically downloads and installs the state tax module as required : this worked fine

	
  * The program checked for updates too, but, since I had installed the most recent version, no updates were required, so the update mechanism is untested.

	
  * Doing the state submission requires entering credit card information into the program - that seemed to work without a hitch

	
  * Since submitting the filing electronically didn't go through as expected, TaxAct offered a 'manual upload' system so that they would be the ones submitting the filing.  The file to be uploaded is (like) : `~/.wine/drive_c/windows/profiles/andrewsm/My\ Documents/TaxACT\ 2009/EFiles/mvnlmyhlXXXXjokyat_9.efr`

	
  * Now there's no real need for dual booting ...


