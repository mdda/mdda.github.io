---
layout: post
#date: 2014-07-14
title: Fixing up Author and Committer emails in a Repo
#type: oss-blog
#oss-blog: [index]
category: oss
tags:
- linux
- git
- github
---
{% include JB/setup %}

GitHub doesn't add emails that it doesn't recognize into your 'contributor score' (and activity calendar, etc).

This can be a particular gotcha if one develops on a local machine and commits as 'username@localhost' for instance.


Steps to Fix the emails
--------------------------------

First, get fully in-sync with the current GitHub state : 

```
git pull
git push
```

For certainty, update your ```.git/config``` to reflect the user you actually want to be :

```bash
#more .git/config
...
[user]
	name = Martin Andrews
	email = GitHub@example.com
...
```

Now, examine which emails need updating :

```bash
git log --all --format='Author=%aN <%aE>; Committer=%cN <%cE>' | sort -u
```

Let's assume that each of these should actually be ```GitHub@example.com```.  For each of the 'wrong' user emails : 

```bash
git filter-branch -f --env-filter '
  m="$GIT_AUTHOR_EMAIL"
  if [ "$GIT_AUTHOR_EMAIL" = "username@localhost" ]
  then
    m="GitHub@example.com"
  fi
  export GIT_COMMITTER_EMAIL="$m"
  export GIT_AUTHOR_EMAIL="$m"
' -- --all
```

Finally, because this has been a history-slamming change, GitHub requires : 

```bash
git push -f
```

All done.
