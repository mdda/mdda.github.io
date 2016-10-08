---
date: 2016-10-05
title: Dropzone with an Express Backend
category: OSS
tags:
- dropzone
- nodejs
- express
layout: post
published: true
---
{% include JB/setup %}

The uploader behaviour for ```Dropzone``` changed from previous versions, 
making the links to sample code in the ```Dropzone``` documentation outdated ( I only discovered the change 
after updating to a new version of a site template that I was using - and seeing that my previous working code stopped working... )

The following works with the following (fairly current) versions : Dropzone v4.3.0, Express v4.13.4

### In the GUI

{% highlight html %}
<link href="/t/css/plugins/dropzone/dropzone.css" rel="stylesheet"/>
<form id="my-awesome-dropzone" action="" method="post" enctype="multipart/form-data" class="dropzone">
  <div class="fallback">
    <input name="source_file[]" type="file" multiple="multiple"/>
  </div>
  <div class="form-group pull-right">
    <button id="batch-upload" type="submit" class="btn btn-danger">Upload Now! </button>
  </div>
</form>
{% endhighlight %}

{% highlight javascript %}
<script src="/t/js/plugins/dropzone/dropzone.js"></script>
<script>
$(document).ready(function() {
  
    Dropzone.options.myAwesomeDropzone = {
      url:'/batch/upload',
      autoProcessQueue: false,
      //paramName:'source_file', // Name used to transfer the file(s) (will have '[i=0,1,2,3,4...]' appended)
      paramName: function(n) { return 'source_file[]';},  // Don't enumerate the transfers
      uploadMultiple: true,
      parallelUploads: 4,  // default is 2
      //maxFilesize: 2, // MB

      init: function() {
        var myDropzone = this;
        this.on("completemultiple", function(files, response) {  // was queuecomplete
          console.log("Complete!");
          
          // Now reload page...
          location.reload(true);  // true => force server reload
          console.log("Reloaded?");
        });
        
        this.on("addedfile", function() { 
          console.log("Added File! - show the upload button");
          $('#batch-upload').show();
        });
        
        $('#batch-upload').click( function(e) {
          console.log("Clicked on upload button"); // , e.target.href
          
          e.preventDefault();
          e.stopPropagation();
          
          myDropzone.processQueue();
        }).hide();
        
      }
      
    };      
    
  });  
</script>
{% endhighlight %}

### On the Express server 

{% highlight javascript %}
var express = require('express');
var upload_files = require('multer')();

// .. regular set-up for 'app' ..

app.post('/batch/upload', upload_files.array('source_file[]'), process_upload); 

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var sanitize = require("sanitize-filename");

function process_upload(req, res) {
  if(req.files) { 
    console.log("req.files.length = ", req.files.length);
    
    var upload_dir='uploads';  //somewhere relevant
    
    Promise.resolve(req.files)
      .each(function(file_incoming, idx) {
          console.log("  Writing POSTed data :", file_incoming.originalname);
          var sanitized_filename = sanitize(file_incoming.originalname);
          var file_to_save = path.join( upload_dir, sanitized_filename );
          
          return fs
            .writeFileAsync(file_to_save, file_incoming.buffer)    
      })
      // .catch() code not included for clarity : Clearly you'll need to do some error checking...
      .then( _ => {
        console.log("Added files : Success");
        return res.sendStatus(200);
      });

  }
  
}

{% endhighlight %}
