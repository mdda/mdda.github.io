---
layout: page
title: Blog{mdda}
tagline: thought process / brain dump
---
{% include JB/setup %}

This is an attempt to centralize my blogging efforts, with the assumption that Google is smart enough to get people to the content 
that they are after, rather than me having to go to great lengths to prevent the various streams from mixing.

## Artificial Intelligence (AI) Stuff <small>Background &amp; Disclaimer</small>

This blog contains a sprinkling of my thoughts on (strong) Artificial Intelligence.

An eon ago, I did a PhD "Strategy Learning in Financial Markets" at Cambridge University in the UK.  I focussed my energy on Genetic Algorithm and Genetic Programming techniques - largely because I wasn't persuaded by the Neural Network hype at the time.

But now Machine Learning is a new 'web-scale' area of research, I've decided to get my toes wet again, most specifically on the least sexy area : Questions relevant to Machine Consciousness.

Please forgive me if the posts aren't crystal clear : Many of the ideas aren't fully formed yet. However, I hope that something useful will start to percolate to the surface as time progresses. 
    
### Recent Posts

<ul class="posts">
  {% for post in site.posts limit:10 %}
    {% if post.categories contains 'ai' %}
      <li>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">
        {% unless post.published == false %}
         {{ post.title }}
        {% else %}
         <s>{{ post.title }}</s>
        {% endunless %}
      </a></li>
    {% endif %}
  {% endfor %}
</ul>


## Open Source Stuff <small>Background &amp; Disclaimer</small>

This blog is also a repository of 'how to make it work' fixes that will hopefully save people time - for problems/situations that I've run into personally.

As well as trying to be generally supportive of the various excellent OSS projects that I come across, putting up these posts also serves to remind me how I did things - so some of them may be a little rough. 

### Recent Posts

<ul class="posts">
  {% for post in site.posts limit:10 %}
    {% if post.categories contains 'oss' %}
      <li>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">
        {% unless post.published == false %}
         {{ post.title }}
        {% else %}
         <s>{{ post.title }}</s>
        {% endunless %}
      </a></li>
    {% endif %}
  {% endfor %}
</ul>


## To-Do

So many things, so few hours in the day...
