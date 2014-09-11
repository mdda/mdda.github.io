---
comments: false
date: 2010-05-25 18:30:42+00:00
title: Building Titanium SDK on Fedora
category: OSS
wordpress_id: 328
wp_parent: '0'
wp_slug: building-titanium-sdk-on-fedora
tags:
- android
- fedora
- mobile
- titanium
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


These direct steps (using the openjdk, not the Sun one) are confirmed to work...

Below, the following are our (typical) values : 

{% highlight bash %}
MY_ANDROID_SDK : /path-to-android-sdk-installation-root/android-sdk-linux_86
MY_TITANIUM_DEVELOPER_DIR : /path-to-titanium-developer-installation-root/Titanium Developer-1.2.1
MY_TITANIUM_FILES_DIR : /path-to-my-home-directory/.titanium
MY_TITANIUM_SDK : /any-suitable-directory/  

{% endhighlight %}

Note that _MY_TITANIUM_FILES_DIR_ is the default created/used by the Titanium Developer program, which one runs from _MY_TITANIUM_DEVELOPER_DIR_ using _./Titanium Developer_



## Check that the build tools are installed


On Fedora (and this assumes that the openjdk is being used, rather than the Sun JDK) :

{% highlight bash %}
yum -y install scons java-1.6.0-openjdk-devel
alternatives --config javac  # Check that this is set to the openjdk path : /usr/lib/jvm/java-1.6.0-openjdk.x86_64/bin/javac

{% endhighlight %}



## Ensure correct android modules loaded


Since we're coding for Android 1.6, we need the 'level 4' APIs.  Go into the 'Android SDK and AVD Manager' which is located in _MY_ANDROID_SDK/tools/_ as an executable called _android_.

There, chose, and install at least the following :

{% highlight bash %}
Android SDK Tools, revision 6
SDK Platform Android 1.6, API 4, revision 2
Google APIs by Google Inc., Android API 4, revision 2 

{% endhighlight %}
where higher revision numbers would most likely work too.  Importantly, though, the API numbers should match.



## Download and build the latest Titanium API code



{% highlight bash %}
cd ${MY_TITANIUM_SDK}
git clone git://github.com/appcelerator/titanium_mobile.git

{% endhighlight %}
Now go into the code base and build everything (using the paths as above) :

{% highlight bash %}
cd titanium_mobile/
JAVA_HOME=/usr/lib/jvm/java-1.6.0-openjdk.x86_64/ ANDROID_SDK=${MY_ANDROID_SDK} scons

{% endhighlight %}
This will create a zip file of the newly built Titanium SDK modules in : _${MY_TITANIUM_SDK}/titanium_mobile/dist_.  Have a look :

{% highlight bash %}
ls -l dist/

{% endhighlight %}
Hopefully, there will be a new zip file called something like : _mobilesdk-1.3.1-linux.zip_ 



## Unzip the new SDK so that Titanium Developer can find it


Go to the 'working directory' of Titanium Developer (not the application directory), and unzip the zip file built in the previous step :

{% highlight bash %}
cd ${MY_TITANIUM_FILES_DIR}
unzip ${MY_TITANIUM_SDK}/titanium_mobile/dist/mobilesdk-1.3.1-linux.zip 

{% endhighlight %}



## Fire up Titanium Developer, and change the project



{% highlight bash %}
cd ${MY_TITANIUM_DEVELOPER_DIR}
./Titanium\ Developer

{% endhighlight %}
Chose the project that you're working on, and change the SDK version it depends on via the drop-down on the Project's Edit tab (listed as 'Titanium SDK') : There should be a new '1.3.1' SDK listed.

