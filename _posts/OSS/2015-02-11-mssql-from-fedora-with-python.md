---
date: 2015-02-11
title: Connecting to MSSQL from Fedora (and then Python)
category: OSS
tags:
- fedora
- linux
- mssql
layout: post
published: false
---
{% include JB/setup %}

With a heavy heart, I find myself having to talk to an MSSQL database.
Fortunately, I can do this from a Linux (Fedora) VPS, so all is not lost.

For the following write-up (which are really just notes to myself), these links were helpful :

  *  [ububtu instructions](http://blog.tryolabs.com/2012/06/25/connecting-sql-server-database-python-under-ubuntu/) - clear but not directly applicable
  *  [Helpful hints from Stackoverflow](http://stackoverflow.com/questions/18474538/connect-to-mssql-server-2008-on-linux)
  *  [Fedora notes](http://wiki.tcl.tk/6193) - wrong target language, though

### Step 1 : Check there's no firewall in the way

```telnet 192.168.x.y 1433``` into the port to check that the response differs from one with no server sitting on it.

### Step 2 : Install FreeTDS

This is the one that Fedora supports :

{% highlight bash %}
yum install freetds freetds-devel unixODBC unixODBC-devel 
{% endhighlight %}

In order to connect to the database, add it as an entry into ```/etc/freetds.conf``` :

{% highlight bash %}
[arbitrary-tds-server-title]
	host = hostname.of.the.server
	port = 1433
	tds version = 7.0
{% endhighlight %}

### Step 3 : Check that simple queries run (command line)

Using the ```tsql``` utility (from FreeTDS), test that the basic connection works 
(each SQL command needs to be followed by 'go' on a separate line to get it to execute) :

{% highlight bash %}
tsql -H hostname.of.the.server -p portnumber -U username-for-db -P
#(enter password, not-in-history)
{% endhighlight %}

or, alternatively : 

{% highlight bash %}
tsql -S arbitrary-tds-server-title -U username-for-db -P
#(enter password, not-in-history)
{% endhighlight %}

When the ```tsql``` prompt comes up, 
    
{% highlight bash %}
# Do a fully-qualified query 
select count(*) from DATABASENAME.dbo.TABLENAME

# Do the same, drilled down
use DATABASENAME
select count(*) from TABLENAME

# Get a listing of the tables available
SELECT * FROM information_schema.tables where TABLE_TYPE = 'BASE TABLE'
{% endhighlight %}

### Step 4 : Set up ODBC configurations

Firstly, find the driver locations (on disk!) to put into ```/etc/odbcinst.ini``` :

{% highlight bash %}
find / -iname 'libtds*'
{% endhighlight %}

Then, create a suitable entry in ```/etc/odbcinst.ini```, so that ODBC know to talk to the FreeTDS drivers :

{% highlight bash %}
[FreeTDS]
Description = MS SQL database access with Free TDS
Driver64		= /usr/lib64/libtdsodbc.so
Setup64		  = /usr/lib64/libtdsS.so
FileUsage	= 1
{% endhighlight %}

Then, create an entry in ```/etc/odbc.ini``` (which may have to be created) :

{% highlight bash %}
[sqlserverdatasource-name-is-arbitrary]
Driver = FreeTDS
Description = ODBC connection via FreeTDS
Trace = No
Servername = arbitrary-tds-server-title
#Database = <name of your database>
{% endhighlight %}

### Step 5 : Set up Python connection to ODBC

{% highlight bash %}
yum install pyodbc
{% endhighlight %}

And then one can use it in the Python shell :

{% highlight bash %}
python
>>> import pyodbc
>>> dsn='sqlserverdatasource-name-is-arbitrary'
>>> user='username-for-db'
>>> password='XXXXXXXX'
>>> database='DATABASENAME'
>>> con_string = 'DSN=%s;UID=%s;PWD=%s;DATABASE=%s;' % (dsn, user, password, database)
>>> cnxn = pyodbc.connect(con_string)
>>> cursor = cnxn.cursor()
>>> cursor.execute("select count(*) from TABLENAME")
<pyodbc.Cursor object at 0x7fe4fd2a0b10>
>>> row=cursor.fetchone()
>>> row
(249619, )
{% endhighlight %}


### Step 6 : Read up on ODBC databases in Python

For more, see the [PyODBC getting started guide](https://code.google.com/p/pyodbc/wiki/GettingStarted).


