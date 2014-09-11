---
comments: false
date: 2008-07-28 14:42:00+00:00
title: Some MySQL compatibility functions for sqlite
category: OSS
wordpress_id: 147
wp_parent: '0'
wp_slug: some-mysql-compatibility-functions-for-sqlite
tags:
- mysql
- perl
- sqlite
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Here are a couple of additional functions to increase interoperability between MySQL code and sqlite :  
  
```  
unless($dbh = DBI->connect("DBI:SQLite:dbname=$db_login{file}", "", "") ) {  
die "Cannot connect to database - version : ".$dbh->{sqlite_version};  
}  
$dbh->func( 'UNIX_TIMESTAMP', 1, sub { return POSIX::mktime(POSIX::strptime($_[0], '%Y-%m-%d %H:%M:%S')); }, 'create_function' );  
$dbh->func( 'FROM_UNIXTIME', 1,  sub { return POSIX::strftime('%Y-%m-%d %H:%M:%S', localtime($_[0])); }, 'create_function' );  
```  
  
to make this work, you'll need to install the following packages from CPAN :  
  
```  
Time::Local  
POSIX  
POSIX::strptime  
```  
  
Also recommended : the SQLite Manager addon for Firefox.
