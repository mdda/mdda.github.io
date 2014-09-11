---
comments: true
date: 2009-09-17 20:45:00+00:00
title: Funambol with MySQL on Fedora 10
category: OSS
wordpress_id: 171
wp_parent: '0'
wp_slug: funambol-with-mysql-on-fedora-10
tags:
- fedora
- Funambol
- mysql
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


_Much of this is adapted from the text of http://schattenschreiber.org/diary/2009/05/20/installing-the-funambol-bundled-server-under-ubuntu-server-amd64-mysql-lighttpd/_

Installing funambol isn’t as easy as it might be - mostly because it ships with it's own java/jre version, which I figure is needless duplication.  Here’s a little step-by-step guide for getting it installed nicely on Fedora.  You will need some command line literacy though :



	
  1. Download `funambol-8.0.0.bin` on your server - this machine can be set up entirely remotely (without a screen).

	
  2. Install the bundle. I went for `/usr/lib/Funambol` as an installation directory, the default is `/opt/Funambol`. It shouldn’t matter much. Installation is started by issuing `sh funambol-8.0.0.bin` while ssh‘d into the server.  The installation path entered for this should be `/usr/lib`.  From now on, I’ll assume the Funambol bundle to be installed in `/usr/lib/Funambol`.

	
  3. Java : If you don’t have it installed already, `yum install java-1.6.0-openjdk mysql-connector-java`.  Next, so that Funambol uses your machine-wide java, edit `/usr/lib/Funambol/bin/funambol` to contain the following near the top :

{% highlight bash %}
export JAVA_HOME="/usr/lib/jvm/jre"
export JRE_HOME=$JAVA_HOME
{% endhighlight %}

Once that's done, you can save some space on the server using `rm -rf /usr/lib/Funambol/tools/jre-1.5.0`.

	
  4. MySQL Engine : Also in  `/usr/lib/Funambol/bin/funambol_ change _COMED=true_ to _COMED=false` somewhere around line 50 while you’re at it (this prevents the start/stop script from trying to start or stop the Hypersonic database, since we’re going to use MySQL).  After that, `rm -rf /usr/lib/Funambol/tools/hypersonic` to save yet a bit more disk space

	
  5. MySQL backend : Edit `/usr/lib/Funambol/ds-server/install.properties`.  Line 24 will have to be changed from `dbms=hypersonic_ to _dbms=mysql`.  Next, comment out the existing mysql example setup and add a new one, fixed up :

{% highlight bash %}
#jdbc.classpath=../tools/hypersonic/lib/hsqldb.jar
#jdbc.driver=org.hsqldb.jdbcDriver
#jdbc.url=jdbc:hsqldb:hsql://localhost/funambol
#jdbc.user=sa
#jdbc.password=

jdbc.classpath=/usr/share/java/mysql-connector-java.jar
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost/funambol?characterEncoding=UTF-8
jdbc.user=funambol
jdbc.password=funambol
{% endhighlight %}


	
  6. MySQL database : If you haven’t already done so, create a mysql database with the same name, username and password as you specified in _install.properties_.

	
  7. MySQL tables : The funambol mysql database must be populated by calling the Funambol install script through _/usr/lib/Funambol/bin/install_.  Just answer yes (”y”) everywhere, unless you don’t want the web demo, in which case you answer no to that question, of course.

	
  8. Funambol itself should now run, which you can check by calling `/usr/lib/Funambol/bin/funambol` start. Check with `ps ax | grep funambol` (which should return 4 decent-sized lines of info - with `...jmxremote.port={8081,7101,4101,3101})`. You should now be able to visit `http://YOUR_SERVER:8080`.  The server name isn't critical here (localhost, and IP address, whatever) just so long as it resolves to your machine.  Also, be careful that no other process has already 'taken' 8080.  To check that the the ports have been successfully grabbed, use `netstat -ln -A inet`.



  9. To make Funambol start automagically, create `/etc/init.d/funambol` with the following content (and `chmod 755 /etc/init.d/funambol` afterwards) :

{% highlight bash %}
#! /bin/bash
#
# funambol   Start the funambol services
#
NAME="funambol"
FUNAMBOL_HOME=/usr/lib/Funambol/bin
FUNAMBOL_USER=root
case "$1" in
start)
echo -ne "Starting $NAME.\n"
cd $FUNAMBOL_HOME
/bin/su $FUNAMBOL_USER funambol start
;;

stop)
echo -ne "Stopping $NAME.\n"
cd $FUNAMBOL_HOME
/bin/su $FUNAMBOL_USER funambol stop
;;

*)
echo "Usage: /etc/init.d/funambol {start|stop}"
exit 1
;;
esac

exit 0
{% endhighlight %}

If it doesn’t work for some reason and you need help, I can recommend #funambol on freenode.net with a tip o’ the hat to 'alpha-' there.



### Funambol server admin setup


Now, the funambol server admin password needs to be changed from the default :



	
  1. Download `funamboladmin-8.0.0.tgz` on a machine with a screen.  If your server has a useable screen, there's no need for a separate download, the admin stuff will be in the admin folder of the main install

	
  2. If you've downloaded the separate funamboladmin tar package : `tar -xzf funambol-admin-8.0.0.tgz`.

	
  3. Run the admin frontend with `cd Funambol/admin/bin/frontendadmin`.  It may complain about java versions (my frontend machine doesn't have any java installed, so I'm guessing that the download has it's own version).

	
  4. The frontend looks like a java GUI (swing?), and you'll need to 'File-Login' to the server that you created above.  The initial frontend has the admin user and default password already filled in : just press 'go'.

	
  5. To update the password, drill down the options 'tree' to Users, and search the usernames for 'admin'.  Edit that user, updating the password.  Once that's done, you'll need to relogin to the Funambol server (since your login is no longer presenting a valid password).

	
  6. Now everything is secure, you can move on to the user stuff at a more leisurely pace...



