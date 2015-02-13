---
layout: post
category: AI
title: Namecard OCR in Javascript
tagline: Presentation link
date: 2014-08-25
tags: [Presentation,javascript,nodejs,tesseract,dv]
published: true
---
{% include JB/setup %}

One thing that has always bothered me as a regular MeetUp participant is that 
I usually arrive home with a small collection of business cards (aka namecards in Asia),
and the most direct method of getting that data into my address book
was manual typing.  Therefore, doing OCR via a mobile camera's phone seemed like 
an interesting project that would solve a problem that I already had 
(as evidenced by the dozen neat stacks of cards waiting to be typed in on a table at home).

I decided to prototype in Javascript (rather than Python, or more amitiously Scala) 
because various component pieces already had nice interfaces to nodejs, 
which could also run as the backend web-server.  In addition, the actual 
code (run initially on the server) would be able to run on the phone itself.

### Presentation Link

I recently gave a <strong><a href="http://redcatlabs.com/2014-08-25_OCR-v0.01/" target="_blank">presentation about this project</a></strong> 
at the [Singapore Talk.js MeetUp Group](http://www.meetup.com/Singapore-JS/events/197757042/).

![Presentation Screenshot]({{ site.url }}/assets/img/2014-08-25_OCR-v0.01_600x390.png)

If there are any questions about the presentation, please ask below, or via the MeetUp group (or at
the next NodeSchool!).

![Presentation Content Example]({{ site.url }}/assets/img/2014-08-25_OCR-v0.01_6_600x390.png)
