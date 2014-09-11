---
comments: false
date: 2011-10-07 22:15:08+00:00
title: Building a Python LibreOffice Extension
category: OSS
wordpress_id: 459
wp_parent: '0'
wp_slug: python-libreoffice
tags:
- libreoffice
- openoffice
- python
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Here's a pretty minimal setup for building an extension for LibreOffice in Python.  

Working backwards, I've called the extension `mdda_fns.oxt`.  Here's the makefile, which is in the root of the package development tree :

{% highlight bash %}
make
all:	clean zip install

clean:
	unopkg remove mdda_fns.oxt
	rm mdda_fns.oxt
	
zip:
	zip -r mdda_fns.oxt \
		description.xml \
		META-INF/manifest.xml \
		Addons.xcu \
		src/Interface.py \
		package/img/icon_42x42.png \
		package/desc_en.txt \
		package/license_en-GB.txt 

install:
	unopkg add mdda_fns.oxt
{% endhighlight %}
The essential files for anything to work are : 



	
  * `description.xml` : Contains overall information about the extension : names, descriptions, licensing, help information, upgrading, etc.  The filename for this file is FIXED;

	
  * `META-INF/manifest.xml` : Contains a file listing of the extension package (which is rolled up into the zip/oxt.  Along with each file, the filetype identifies how it will be treated when the system loads it in.    The filename for this file is FIXED;

	
  * `Addons.xcu` : Contains an XML description of how the extension is wired into the actual LibreOffice GUI : As a menu-item, ToolButton on a Toolbar; etc;  Arbitrary filename (listed in 'manifest.xml')

	
  * `src/Interface.py` : This is a Python file, which I've put in the interface code. Arbitrary filename (listed in 'manifest.xml');

	
  * `package/` : This directory houses stuff related to the overall package : see 'description.xml';



Here is the contents of those files : 
  
  

**_description.xml_**

{% highlight bash %}
xml
<?xml version="1.0" encoding="UTF-8"?>
<description xmlns="http://openoffice.org/extensions/description/2006" 
xmlns:d="http://openoffice.org/extensions/description/2006"
xmlns:xlink="http://www.w3.org/1999/xlink">
 
  <version value="1.0" />   
 
  <identifier value="com.platformedia.libreoffice.extensions.mdda_fn" />
 
<!–  <platform value="windows_x86,solaris_sparc" />  !–>
  <platform value="all" />
 
  <dependencies>
    <OpenOffice.org-minimal-version value="3.3" d:name="OpenOffice.org 3.3"/>
  </dependencies>
 
  <update-information>
    <src xlink:href="http://extensions.openoffice.org/testarea/desktop/license/update/lic3.update.xml" />
  </update-information>
  
  <registration>
<!–  
   <simple-license accept-by="admin" suppress-on-update="true" >
     <license-text xlink:href="package/license_en-GB.txt" lang="en-GB" />
   </simple-license>
!–>
  </registration>
  <publisher>
<!–  
   <name xlink:href="http://extensions.openoffice.org/testarea/desktop/publisher/publisher_en.html" lang="en">PLATFORMedia :: mdda</name>
!–>
    <name xlink:href="http://platformedia.com/" lang="en">PLATFORMedia</name>
  </publisher>
 
  <release-notes>
    <src xlink:href="http://extensions.openoffice.org/testarea/desktop/publisher/release-notes_en.txt" lang="en" />
  </release-notes>
 
  <display-name>
    <name lang="en">mdda helper extension</name>
  </display-name>
 
  <icon>
    <default xlink:href="package/img/icon_42x42.png" />
    <high-contrast xlink:href="package/img/icon_42x42.png" />
  </icon>
 
  <extension-description>
    <src xlink:href="package/desc_en.txt" lang="en" />
  </extension-description>
 
</description>
{% endhighlight %}

**_META-INF/manifest.xml_**

{% highlight bash %}
xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE manifest:manifest PUBLIC "-//OpenOffice.org//DTD Manifest 1.0//EN" "Manifest.dtd">
<manifest:manifest xmlns:manifest="http://openoffice.org/2001/manifest">
  <manifest:file-entry manifest:media-type="application/vnd.sun.star.configuration-data" 
                      manifest:full-path="Addons.xcu"/>                     
                       
  <manifest:file-entry manifest:media-type="application/vnd.sun.star.uno-component;type=Python" 
                      manifest:full-path="src/Interface.py"/>
  
<!–
 <manifest:file-entry manifest:media-type="application/vnd.sun.star.framework-script" 
                      manifest:full-path="package"/>
!–>

</manifest:manifest>
{% endhighlight %}

**_Addons.xcu_** : Here, I've commented out the toolbar and image stuff : I just want to put a top menubar entry.

Also, see the _vnd.sun.star.script:_ entry?  That's what's required if you want to preprocess this as a script file (of the sort one would put in `~/.libreoffice/3/user/Scripts/python/`.  But it gets very awkward to address these from the UI elements.  Much better to use the `service:` type, and create the named interface (note how `com.platformedia.libreoffice.extensions.mdda_fn.TestButton` is defined in the .py file below).

Note that the menu is defined to work for spreadsheets (search for 'Context'), so that it won't appear if one is loading up a wordprocessing document.


{% highlight bash %}
xml
<?xml version="1.0" encoding="UTF-8"?>
<oor:component-data xmlns:oor="http://openoffice.org/2001/registry"
                   xmlns:xs="http://www.w3.org/2001/XMLSchema" oor:name="Addons"
                   oor:package="org.openoffice.Office">
 
<!– See : http://wiki.services.openoffice.org/wiki/Documentation/DevGuide/WritingUNO/AddOns/Menus !–>
    <node oor:name="AddonUI">
        <node oor:name="OfficeMenuBar">
            <node oor:name="com.platformedia.libreoffice.extensions.mdda_fn" oor:op="replace">
                <prop oor:name="Title" oor:type="xs:string">
                    <value/>
                    <value xml:lang="en-US">~mdda</value>
                </prop>
<!–                
               <prop oor:name="Target" oor:type="xs:string">
                   <value>_self</value>
               </prop>
               <prop oor:name="ImageIdentifier" oor:type="xs:string">
                   <value/>
               </prop>
!–>                
                <node oor:name="Submenu">
                    <node oor:name="m1" oor:op="replace">
                        <prop oor:name="URL" oor:type="xs:string">
<!–                        
<value>vnd.sun.star.script:mdda_fns.oxt|src|Interface.py$Something?language=Python&amp;location=user:uno_packages</value>
!–>                            
<value>service:com.platformedia.libreoffice.extensions.mdda_fn.TestButton?execute</value>
                        </prop>
                        <prop oor:name="Title" oor:type="xs:string">
                            <value/>
                            <value xml:lang="en-US">TestButton</value>
                        </prop>
                        <prop oor:name="Target" oor:type="xs:string">
                            <value>_self</value>
                        </prop>
                        <prop oor:name="Context" oor:type="xs:string">
<!–
                           <value>com.sun.star.text.TextDocument</value>
!–>                            
                            <value>com.sun.star.sheet.SpreadsheetDocument</value>
                        </prop>
                    </node>
                </node>
            </node>
        </node>
    
<!–    
       <node oor:name="OfficeToolBar">
           <node oor:name="name.vojta.openoffice.Wavelet" oor:op="replace">
               <node oor:name="m1" oor:op="replace">
                   <prop oor:name="URL" oor:type="xs:string">
                       <value>service:name.vojta.openoffice.Wavelet?execute</value>
                   </prop>
                   <prop oor:name="ImageIdentifier" oor:type="xs:string">
                       <value/>
                   </prop>
                   <prop oor:name="Title" oor:type="xs:string">
                       <value/>
                       <value xml:lang="en-US">Wavelet</value>
                   </prop>
                   <prop oor:name="Target" oor:type="xs:string">
                       <value>_self</value>
                   </prop>
                   <prop oor:name="Context" oor:type="xs:string">
!- –                    
                      <value>com.sun.star.text.TextDocument</value>
!- –                       
                      <value>com.sun.star.sheet.SpreadsheetDocument</value>
                   </prop>
               </node>
           </node>
       </node>        
!–>                       
<!–    
       <node oor:name="Images">
           <node oor:name="name.vojta.openoffice.Wavelet.image1" oor:op="replace">
               <prop oor:name="URL">
                   <value>service:name.vojta.openoffice.Wavelet?execute</value>
               </prop>
               <node oor:name="UserDefinedImages">
                   <prop oor:name="ImageSmallURL" oor:type="xs:string">
                       <value>%origin%/images/WaveletSmall.bmp</value>
                   </prop>
                   <prop oor:name="ImageBigURL" oor:type="xs:string">
                       <value>%origin%/images/WaveletBig.bmp</value>
                   </prop>
               </node>
           </node>
       </node>
!–>                       
        
    </node>
 </oor:component-data>
{% endhighlight %}

**_src/Interface.py_** : Also noteworthy is the interface definition code half-way down the script, and also the '__main__' code that allows one to test the extension quickly (in this case, it loads up a test workbook, and presses the button in the python file for inspection).  To retest, you'll need to close up oocalc and relaunch.  print comments go to stdout (the command line terminal, usually).

{% highlight bash %}
python
import uno
import unohelper
from com.sun.star.task import XJobExecutor

class TestButton( unohelper.Base, XJobExecutor ):
    def __init__( self, ctx ):
        self.ctx = ctx
 
    def trigger( self, args ):
        desktop = self.ctx.ServiceManager.createInstanceWithContext("com.sun.star.frame.Desktop", self.ctx )
 
        doc = desktop.getCurrentComponent()
        print("Pressed Button!")
        
g_ImplementationHelper = unohelper.ImplementationHelper()
g_ImplementationHelper.addImplementation(
    TestButton,
    "com.platformedia.libreoffice.extensions.mdda_fn.TestButton",
    ("com.sun.star.task.Job",),
)


if __name__ == "__main__":
    import os
 
    # Start OpenOffice.org, listen for connections and open testing document
    #os.system( "/etc/openoffice.org-1.9/program/soffice '-accept=socket,host=localhost,port=2002;urp;' -writer ./WaveletTest.odt &" )
    os.system( "/usr/bin/oocalc '-accept=socket,host=localhost,port=2002;urp;' ./Test-mdda-fns.ods &" )
 
    # Get local context info
    localContext = uno.getComponentContext()
    resolver = localContext.ServiceManager.createInstanceWithContext("com.sun.star.bridge.UnoUrlResolver", localContext )
 
    ctx = None
 
    # Wait until the OO.o starts and connection is established
    while ctx == None:
        try:
            ctx = resolver.resolve("uno:socket,host=localhost,port=2002;urp;StarOffice.ComponentContext" )
        except:
            pass
 
    print("About to do TestButton")
 
    # Trigger our job
    testjob = TestButton( ctx )
    testjob.trigger( () )

    print("Done TestButton")
{% endhighlight %}


**Notes :  Essential packaging info**

  * http://user.services.openoffice.org/en/forum/viewtopic.php?f=45&t;=43398	
	
  * http://wiki.services.openoffice.org/wiki/UNO_component_packaging#Python_component_testing
	
  * http://wiki.services.openoffice.org/wiki/Documentation/DevGuide/Extensions/Extensions


Hope this helps someone.

