---
comments: false
date: 2010-09-15 18:54:41+00:00
title: Stupidly simple SQLalchemy model migration
category: OSS
wordpress_id: 342
wp_parent: '0'
wp_slug: sqlalchemy-model-migration
tags:
- pylons
- python
- sqlalchemy
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


After looking around the web for an SQLalchemy model migration assistant, we found no satisfactory equivalent to the migration tool that people love for Ruby.

In particular sqlalchemy-migrate seems like it's an overkill (in addition, sqlalchemy-migrate is fiddly to set up with Pylons).

There's also a project call miruku, but that is also a little illusive, somehow.

PLATFORMedia has published a simple 150 line script that parses the Pylons INI file (augmented with a line that points to the model.metadata variable definition), and allows just two actions :



	
  1. diff the current database vs. the what the models want

	
  2. commit the changes required to bring the two into sync.


The script is dependent on sqlalchemy-migrate, but it would probably sit better as a Paster-Pylons plug-in.

It is located at [http://github.com/mdda/sqlalchemy-migrate-pylons](http://github.com/mdda/sqlalchemy-migrate-pylons).
