---
comments: false
date: 2009-06-12 18:43:00+00:00
title: roundcube and twiki integration
category: OSS
wordpress_id: 166
wp_parent: '0'
wp_slug: roundcube-and-twiki-integration
tags:
- fedora
- lighttpd
- roundcube
- twiki
layout: post
from_mdda_blog: true
---
{% include JB/setup %}


Roundcube is a beautiful IMAP webmail client.  In order to integrate is properly with an enterprise TWiki installation, 'single authentication' needed to be implemented - so that the sign-on for TWiki (which is htpasswd style authenticated by lighttpd) can be used for the roundcube authentication seamlessly.

Since the TWiki login/passwords are different from the IMAP login/password pairs, an additional column had to be added to the roundcubemail:users table :

{% highlight bash %}
ALTER TABLE users ADD imappass VARCHAR(128) NOT NULL;  # (from memory)

{% endhighlight %}

Then, the following patches must be applied to _/usr/share/roundcubemail/index.php_ :

...


{% highlight bash %}
// set IMAP host
$host = $RCMAIL->autoselect_host();

// mdda added start
// check if HTTP AUTH is set and fill $POST vars
if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
$dbh = rcmail::get_instance()->get_dbh();

$query = "SELECT * FROM ".get_table_name('users')." WHERE %s=?";
$sql_result = $dbh->query(sprintf($query, 'alias'), $_SERVER['PHP_AUTH_USER']);

if ($sql_arr = $dbh->fetch_assoc($sql_result)) {
$_POST['_user'] = $sql_arr['username'];
$_POST['_pass'] = $sql_arr['imappass'];
}
}
// mdda added end

// check if client supports cookies
if (empty($_COOKIE)) {
$OUTPUT->show_message("cookiesdisabled", 'warning');
}

{% endhighlight %}

...


{% highlight bash %}
// end session
else if (($RCMAIL->task=='logout' || $RCMAIL->action=='logout') && isset($_SESSION['user_id'])) {
$OUTPUT->show_message('loggedout');
$RCMAIL->logout_actions();
$RCMAIL->kill_session();

// mdda added start
echo '
';
// mdda added end

}

{% endhighlight %}

...

Having done that, the following can be put onto a TWiki page, to automatically log in the user to roundcube :


{% highlight bash %}
* [WebMail](javascript: document.roundcube_login.submit();) - read your Email






{% endhighlight %}
