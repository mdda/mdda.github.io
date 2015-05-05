---
layout: post
category: OSS
title: Talk.js Talk on Microservices System
tagline: Presentation link
date: 2015-05-05
tags: [Presentation,JS]
published: false
---
{% include JB/setup %}

I'm not sure how things are shaping up for Thursday night talk-wise, 
but I'd be happy to give a quick talk on Sphinx Documentation for JS. 
Or do a bigger one on the various tools I've been pulling together for 
the (somewhat large) project I'm doing 
(including microservices, messaging, configuration, language-agnostic, etc).

FWIW, the Machine Learning project that I'm doing is an 18month-to-build kind of thing. 
For various reasons (including my own interest) it consists of a webserver frontend 
(node-express-jade, plus socket.io), plus a bunch of services where the actual work gets done. 
It's designed to language-agnostic, which is why node-yaml-config is used everywhere, 
as well as http (using hapi for the node pieces), and a sprinkling of nanomsg for PUB-SUB things. 
Because there's caching and other asynchrony, throw in some bluebird promises. 
And because I want to limit my MS-facing surface area, there's ODBC from node-as-a-service too. 
And I probably ought to mention of the Sphinx-aware documentation too. 
And if you know any Singaporeans looking for a job...

@timoxley --- so it's rather a 'putting it all together' kind of talk, rather than a 'use JS-technique X' one.





Wanting to get acquainted with the Go language, I found a Kaggle competition
(the [Reverse Game-of-Life](http://www.kaggle.com/c/conway-s-reverse-game-of-life)) 
that seemed approachable, and launched into it.

The presentation was a rerun of my [previous talk](/oss/2014/06/05/reverse-gol/) - 
because two Singapore GoLang meet-ups joined forces.  Fortunately, 
the I wasn't heckled too badly by the half of the audience who had already heard it.

### Presentation Link

I recently gave a <strong><a href="http://redcatlabs.com/2014-10-14_Reverse-GoL/" target="_blank">presentation about this project</a></strong> 
to the combined GoSG Groups [the Facebook-oriented Singapore Gophers](https://www.facebook.com/events/322218307949631/)
and [the original GoSG MeetUp Group](http://www.meetup.com/golangsg/events/212375352/).

![Presentation Screenshot]({{ site.url }}/assets/img/2014-10-14_Reverse-GoL_600x390.png)

If there are any questions about the presentation, please ask below, or via the MeetUp/Facebook group.

![Presentation Content Example]({{ site.url }}/assets/img/2014-10-14_Reverse-GoL_11_600x390.png)
