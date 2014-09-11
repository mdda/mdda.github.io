---
comments: false
date: 2011-01-30 01:35:55+00:00
title: Pylons File Upload
category: OSS
wordpress_id: 379
wp_parent: '0'
wp_slug: pylons-file-upload
tags:
- pylons
- python
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


This code snippet should clear up the confusing documentation when it comes to uploading an **optional** picture :

{% highlight bash %}
python
import os
from pylons import config
import shutil

class MyController(BaseController):
    def picture(self, registration=False):
        if 'send_picture' in request.params:
            if ('picture' in request.params) and hasattr(request.params['picture'], 'filename'): 
                picture = request.params['picture']
                log.debug("GOT PICTURE ! '%s'" % (picture.filename, ))
                profile.picture = "%d-%s" % (user.id, picture.filename.replace(os.sep, '_'), )
                
                permanent_file = open(
                 os.path.join(
                  config['app_conf']['picture_store'],
                  profile.picture,
                 ),
                 'wb'
                )
                shutil.copyfileobj(picture.file, permanent_file)
                picture.file.close()
                permanent_file.close()

{% endhighlight %}
