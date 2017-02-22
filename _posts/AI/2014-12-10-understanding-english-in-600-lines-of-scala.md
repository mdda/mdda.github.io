---
layout: post
category: AI
title: Understanding English - In 600 lines of Scala
tagline: Presentation link
date: 2014-12-10
tags: [NLP,NeuralNetworks,Presentation]
published: true
---
{% include JB/setup %}

Over the summer, I put together a Part-of-Speech and Dependency Parser unspired by the following two blog posts : 

  * <a href="http://honnibal.wordpress.com/2013/09/11/a-good-part-of-speechpos-tagger-in-about-200-lines-of-python/">a good Part-of-Speech tagger in about 200 lines of Python</a>

  * <a href="http://honnibal.wordpress.com/2013/12/18/a-simple-fast-algorithm-for-natural-language-dependency-parsing/">a simple, fast algorithm for Natural Language Dependency Parsing</a>

My version includes a copy of the 
[original BSD Python code](https://gist.github.com/syllog1sm/10343947)) for reference, 
but the goal was to implement the same (minimalist) approach in Scala.

For various other reasons, the project scope expanded slightly to include
a ZeroMQ-based server component, so that the Dependency Parser could
be used as a micro-service.

### Presentation Link

I recently gave a <strong><a href="http://redcatlabs.com/2014-12-10_ParsingEnglish.scala/" target="_blank">presentation about this project</a></strong> 
to the [Singapore Scala MeetUp Group](http://www.meetup.com/Singapore-Scala-Programmers/events/218727190/).

<a href="http://redcatlabs.com/2014-12-10_ParsingEnglish.scala/" target="_blank">
![Presentation Screenshot]({{ site.url }}/assets/img/2014-12-10_ParsingEnglish.scala_600x390.png)
</a>

If there are any questions about the presentation, please ask below, or via the MeetUp group.

<a href="http://redcatlabs.com/2014-12-10_ParsingEnglish.scala/#/5" target="_blank">
![Presentation Content Example]({{ site.url }}/assets/img/2014-12-10_ParsingEnglish.scala_5_600x390.png)
</a>
