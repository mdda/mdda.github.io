---
date: 2017-01-30
title: Installing Adobe Acrobat Reader on Fedora 25
tagline: Sigh
category: OSS
tags:
- Adobe
layout: post
published: false
---
{% include JB/setup %}


{% highlight bash %}
(env) [andrewsm@square tmp]$ wget http://ardownload.adobe.com/pub/adobe/reader/unix/9.x/9.5.5/enu/AdbeRdr9.5.5-1_i486linux_enu.rpm
--2017-01-31 20:37:47--  http://ardownload.adobe.com/pub/adobe/reader/unix/9.x/9.5.5/enu/AdbeRdr9.5.5-1_i486linux_enu.rpm

Resolving ardownload.adobe.com (ardownload.adobe.com)... 132.147.115.18, 132.147.115.11
Connecting to ardownload.adobe.com (ardownload.adobe.com)|132.147.115.18|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 60118961 (57M) [audio/x-rpm]
Saving to: ‘AdbeRdr9.5.5-1_i486linux_enu.rpm’

AdbeRdr9.5.5-1_i486linux_enu.rpm                    100%[===================================================================================================================>]  57.33M   339KB/s    in 2m 57s  

2017-01-31 20:40:46 (331 KB/s) - ‘AdbeRdr9.5.5-1_i486linux_enu.rpm’ saved [60118961/60118961]

(env) [andrewsm@square tmp]$ su
Password: 
(env) [root@square tmp]# 
(env) [root@square tmp]# dnf install libcanberra-gtk2.i686 adwaita-gtk2-theme.i686 PackageKit-gtk3-module.i686
Last metadata expiration check: 0:30:13 ago on Tue Jan 31 20:52:15 2017.
Dependencies resolved.
======================================================================================================================================
 Package    Arch                                       VersionRepository                                   Size
======================================================================================================================================
Installing:
 PackageKit-glib     i686     1.1.5-1.fc25                                           updates                                     130 k
 PackageKit-glib     x86_64   1.1.5-1.fc25                                           updates                                     132 k
 PackageKit-gtk3-module            i686     1.1.5-1.fc25                                           updates                                      17 k
 adwaita-gtk2-theme  i686     3.22.2-1.fc25                                          fedora                                      128 k
 alsa-lib   i686              1.1.1-2.fc25                                           fedora                                      411 k
 at-spi2-atki686              2.22.0-1.fc25                                          fedora                                       84 k
 at-spi2-core    i686         2.22.0-1.fc25                                          fedora                                      161 k
 atk        i686              2.22.0-1.fc25                                          fedora                                      263 k
 audit-libs i686              2.7.1-1.fc25                                           updates                                     105 k
 avahi-libs i686              0.6.32-4.fc25                                          fedora                                       61 k
 bzip2-libs i686              1.0.6-21.fc25                                          updates                                      44 k
 cairo      i686              1.14.8-1.fc25                                          updates                                     750 k
 cairo-gobject       i686     1.14.8-1.fc25                                          updates                                      29 k
 colord-libsi686              1.3.4-1.fc25                                           updates                                     199 k
 cups-libs  i686              1:2.2.0-5.fc25                                         updates                                     415 k
 dbus-libs  i686              1:1.11.8-1.fc25                                        updates                                     176 k
 dconf      i686              0.26.0-1.fc25                                          fedora                                      100 k
 expat      i686              2.2.0-1.fc25                                           fedora                                       92 k
 flac-libs  i686              1.3.2-1.fc25                                           updates                                     217 k
 fontconfig i686              2.12.1-1.fc25                                          fedora                                      250 k
 freetype   i686              2.6.5-1.fc25                                           fedora                                      364 k
 gdk-pixbuf2i686              2.36.4-1.fc25                                          updates                                     461 k
 gdk-pixbuf2-modules i686     2.36.4-1.fc25                                          updates                                      98 k
 glib-networking     i686     2.50.0-1.fc25                                          fedora                                      136 k
 glib2      i686              2.50.2-1.fc25                                          updates                                     2.3 M
 gmp        i686              1:6.1.1-1.fc25                                         fedora                                      297 k
 gnutls     i686              3.5.8-1.fc25                                           updates                                     711 k
 graphite2  i686              1.3.6-1.fc25                                           fedora                                      117 k
 gsm        i686              1.0.16-1.fc25                                          updates                                      34 k
 gstreamer1 i686              1.10.2-1.fc25                                          updates                                     1.2 M
 gtk2       i686              2.24.31-2.fc25                                         fedora                                      3.4 M
 gtk3       i686              3.22.7-1.fc25                                          updates                                     4.3 M
 harfbuzz   i686              1.3.2-1.fc25                                           fedora                                      191 k
 jasper-libsi686              1.900.13-1.fc25                                        fedora                                      151 k
 jbigkit-libs    i686         2.1-5.fc24                                             fedora                                       52 k
 json-c     i686              0.12-7.fc24                                            fedora                                       31 k
 json-glib  i686              1.2.2-1.fc25                                           fedora                                      138 k
 keyutils-libs   i686         1.5.9-8.fc24                                           fedora                                       45 k
 krb5-libs  i686              1.14.4-4.fc25                                          fedora                                      749 k
 lcms2      i686              2.8-2.fc25                                             fedora                                      159 k
 libICE     i686              1.0.9-5.fc25                                           fedora                                       70 k
 libSM      i686              1.2.2-4.fc24                                           fedora                                       43 k
 libX11     i686              1.6.4-4.fc25                                           updates                                     623 k
 libXau     i686              1.0.8-6.fc24                                           fedora                                       34 k
 libXcomposite  i686          0.4.4-8.fc24                                           fedora                                       27 k
 libXcursor i686              1.1.14-6.fc24                                          fedora                                       35 k
 libXdamage i686              1.1.4-8.fc24                                           fedora                                       25 k
 libXext    i686              1.3.3-4.fc24                                           fedora                                       43 k
 libXfixes  i686              5.0.3-1.fc25                                           fedora                                       22 k
 libXft     i686              2.3.2-4.fc24                                           fedora                                       62 k
 libXi      i686              1.7.8-2.fc25                                           fedora                                       46 k
 libXineramai686              1.1.3-6.fc24                                           fedora                                       18 k
 libXrandr  i686              1.5.1-1.fc25                                           fedora                                       30 k
 libXrender i686              0.9.10-1.fc25                                          fedora                                       30 k
 libXtst    i686              1.2.3-1.fc25                                           fedora                                       24 k
 libXxf86vm i686              1.1.4-3.fc24                                           fedora                                       22 k
 libasyncns i686              0.8-10.fc24                                            fedora                                       31 k
 libblkid   i686              2.28.2-1.fc25                                          fedora                                      187 k
 libcanberrai686              0.30-11.fc24                                           fedora                                       85 k
 libcanberra-gtk2   i686      0.30-11.fc24                                           fedora                                       29 k
 libcanberra-gtk3   i686      0.30-11.fc24                                           fedora                                       35 k
 libcap     i686              2.25-2.fc25                                            fedora                                       53 k
 libcap-ng  i686              0.7.8-1.fc25                                           fedora                                       30 k
 libcom_err i686              1.43.3-1.fc25                                          updates                                      33 k
 libdatrie  i686              0.2.9-3.fc25                                           fedora                                       32 k
 libdrm     i686              2.4.74-1.fc25                                          updates                                     158 k
 libepoxy   i686              1.3.1-3.fc25                                           fedora                                      208 k
 libffi     i686              3.1-9.fc24                                             fedora                                       34 k
 libgcc     i686              6.3.1-1.fc25                                           updates                                      99 k
 libgcrypt  i686              1.6.6-1.fc25                                           fedora                                      356 k
 libgpg-error                      i686     1.24-1.fc25                                            fedora                                      161 k
 libgusb    i686              0.2.9-1.fc25                                           fedora                                       46 k
 libidn     i686              1.33-1.fc25                                            fedora                                      233 k
 libjpeg-turbo                     i686     1.5.1-0.fc25                                           fedora                                      164 k
 libmodman  i686              2.0.1-12.fc24                                          fedora                                       34 k
 libmount   i686              2.28.2-1.fc25                                          fedora                                      200 k
 libogg     i686              2:1.3.2-5.fc24                                         fedora                                       29 k
 libpciaccess                      i686     0.13.4-3.fc24                                          fedora                                       32 k
 libpng     i686              2:1.6.27-1.fc25                                        updates                                     125 k
 libproxy   i686              0.4.14-1.fc25                                          updates                                      71 k
 libselinux i686              2.5-13.fc25                                            updates                                     165 k
 libsepol   i686              2.5-10.fc25                                            fedora                                      299 k
 libsndfile i686              1.0.27-1.fc25                                          updates                                     204 k
 libsoup    i686              2.56.0-2.fc25                                          fedora                                      393 k
 libstdc++  i686              6.3.1-1.fc25                                           updates                                     485 k
 libtasn1   i686              4.9-1.fc25                                             fedora                                      329 k
 libtdb     i686              1.3.11-1.fc25                                          fedora                                       53 k
 libthai    i686              0.1.25-1.fc25                                          fedora                                      198 k
 libtiff    i686              4.0.7-2.fc25                                           updates                                     179 k
 libtool-ltdl        i686     2.4.6-13.fc25                                          updates                                      55 k
 libunistring        i686     0.9.4-3.fc24                                           fedora                                      324 k
 libusbx    i686              1.0.21-1.fc25                                          fedora                                       67 k
 libuuid    i686              2.28.2-1.fc25                                          fedora                                       81 k
 libverto   i686              0.2.6-6.fc24                                           fedora                                       21 k
 libvorbis  i686              1:1.3.5-1.fc25                                         updates                                     188 k
 libwayland-client   i686     1.12.0-1.fc25                                          fedora                                       35 k
 libwayland-cursor   i686     1.12.0-1.fc25                                          fedora                                       24 k
 libwayland-server   i686     1.12.0-1.fc25                                          fedora                                       40 k
 libxcb     i686              1.12-1.fc25                                            fedora                                      227 k
 libxkbcommon        i686     0.6.1-1.fc25                                           fedora                                      115 k
 libxml2    i686              2.9.3-4.fc25                                           fedora                                      691 k
 libxshmfence        i686     1.2-3.fc24                                             fedora                                       12 k
 lz4        i686              1.7.5-1.fc25                                           updates                                     101 k
 mesa-libEGLi686              13.0.3-5.fc25                                          updates                                     102 k
 mesa-libGL i686              13.0.3-5.fc25                                          updates                                     179 k
 mesa-libgbmi686              13.0.3-5.fc25                                          updates                                      43 k
 mesa-libglapi       i686     13.0.3-5.fc25                                          updates                                      59 k
 mesa-libwayland-egl i686     13.0.3-5.fc25                                          updates                                      25 k
 nettle     i686              3.3-1.fc25                                             fedora                                      324 k
 openssl-libs        i686     1:1.0.2j-3.fc25                                        updates                                     1.0 M
 p11-kit    i686              0.23.2-2.fc24                                          fedora                                      148 k
 pango      i686              1.40.3-1.fc25                                          fedora                                      284 k
 pcre       i686              8.39-6.fc25                                            fedora                                      198 k
 pixman     i686              0.34.0-2.fc24                                          fedora                                      264 k
 pulseaudio-libs                   i686     9.0-1.fc25                                             fedora                                      587 k
 rest       i686              0.8.0-1.fc25                                           fedora                                       66 k
 sqlite-libsi686              3.14.2-1.fc25                                          fedora                                      470 k
 systemd-libs                      i686     231-10.fc25                                            fedora                                      444 k
 tcp_wrappers-libs                 i686     7.6-83.fc25                                            fedora                                       72 k
 xz-libs    i686              5.2.2-2.fc24                                           fedora                                       98 k
 zlib       i686              1.2.8-10.fc24                                          fedora                                       98 k
Upgrading:
 audit      x86_64                                     2.7.1-1.fc25                                           updates                                     238 k
 audit-libs x86_64                                     2.7.1-1.fc25                                           updates                                     104 k
 audit-libs-python                                          x86_64                                     2.7.1-1.fc25                                           updates                                      76 k
 audit-libs-python3                                         x86_64                                     2.7.1-1.fc25                                           updates                                      76 k
 cups       x86_64                                     1:2.2.0-5.fc25                                         updates                                     1.3 M
 cups-clientx86_64                                     1:2.2.0-5.fc25                                         updates                                     156 k
 cups-filesystem                                            noarch                                     1:2.2.0-5.fc25                                         updates                                     101 k
 cups-libs  x86_64                                     1:2.2.0-5.fc25                                         updates                                     411 k
 gdk-pixbuf2x86_64                                     2.36.4-1.fc25                                          updates                                     455 k
 gdk-pixbuf2-modules                                        x86_64                                     2.36.4-1.fc25                                          updates                                      96 k
 gdk-pixbuf2-xlib                                           x86_64                                     2.36.4-1.fc25                                          updates                                      49 k
 gnutls     x86_64                                     3.5.8-1.fc25                                           updates                                     736 k
 gtk3       x86_64                                     3.22.7-1.fc25                                          updates                                     4.3 M
 libX11     x86_64                                     1.6.4-4.fc25                                           updates                                     614 k
 libX11-common                                              noarch                                     1.6.4-4.fc25                                           updates                                     165 k
 libproxy   x86_64                                     0.4.14-1.fc25                                          updates                                      67 k
 libtiff    x86_64                                     4.0.7-2.fc25                                           updates                                     175 k
 mesa-libEGLx86_64                                     13.0.3-5.fc25                                          updates                                     101 k
 mesa-libGL x86_64                                     13.0.3-5.fc25                                          updates                                     163 k
 mesa-libGLES                                               x86_64                                     13.0.3-5.fc25                                          updates                                      33 k
 mesa-libgbmx86_64                                     13.0.3-5.fc25                                          updates                                      42 k
 mesa-libglapi                                              x86_64                                     13.0.3-5.fc25                                          updates                                      49 k
 mesa-libwayland-egl                                        x86_64                                     13.0.3-5.fc25                                          updates                                      25 k

Transaction Summary
================================================================================================================================================================================================================
Install  121 Packages
Upgrade   23 Packages

Total download size: 40 M
Is this ok [y/N]: y
Downloading Packages:
(1/144): audit-libs-python3-2.7-1.fc25_2.7.1-1.fc25.x86_64.drpm                  84 kB/s |  21 kB     00:00    
(2/144): audit-libs-2.7-1.fc25_2.7.1-1.fc25.x86_64.drpm                          98 kB/s |  26 kB     00:00    
(3/144): audit-libs-python-2.7-1.fc25_2.7.1-1.fc25.x86_64.drpm                   76 kB/s |  21 kB     00:00    
(4/144): gdk-pixbuf2-xlib-2.36.3-1.fc25_2.36.4-1.fc25.x86_64.drpm               161 kB/s |  14 kB     00:00    
[DRPM] audit-libs-python3-2.7-1.fc25_2.7.1-1.fc25.x86_64.drpm: done                                            
[DRPM] audit-libs-2.7-1.fc25_2.7.1-1.fc25.x86_64.drpm: done    
[DRPM] audit-libs-python-2.7-1.fc25_2.7.1-1.fc25.x86_64.drpm: done                                             
(5/144): gdk-pixbuf2-modules-2.36.3-1.fc25_2.36.4-1.fc25.x86_64.drpm            181 kB/s |  28 kB     00:00    
[DRPM] gdk-pixbuf2-xlib-2.36.3-1.fc25_2.36.4-1.fc25.x86_64.drpm: done                                          
(6/144): gdk-pixbuf2-2.36.3-1.fc25_2.36.4-1.fc25.x86_64.drpm                    295 kB/s |  53 kB     00:00    
(7/144): libtiff-4.0.7-1.fc25_4.0.7-2.fc25.x86_64.drpm                          438 kB/s |  38 kB     00:00    
(8/144): adwaita-gtk2-theme-3.22.2-1.fc25.i686.rpm                              4.8 MB/s | 128 kB     00:00    
(9/144): libcanberra-gtk2-0.30-11.fc24.i686.rpm                                 477 kB/s |  29 kB     00:00    
(10/144): fontconfig-2.12.1-1.fc25.i686.rpm                                     6.7 MB/s | 250 kB     00:00    
(11/144): freetype-2.6.5-1.fc25.i686.rpm                                        5.8 MB/s | 364 kB     00:00    
(12/144): libcanberra-0.30-11.fc24.i686.rpm                                     2.7 MB/s |  85 kB     00:00    
(13/144): libcanberra-gtk3-0.30-11.fc24.i686.rpm                                3.8 MB/s |  35 kB     00:00    
(14/144): libtdb-1.3.11-1.fc25.i686.rpm                                         3.9 MB/s |  53 kB     00:00    
(15/144): pango-1.40.3-1.fc25.i686.rpm                                          4.0 MB/s | 284 kB     00:00    
(16/144): expat-2.2.0-1.fc25.i686.rpm                                           3.3 MB/s |  92 kB     00:00    
(17/144): zlib-1.2.8-10.fc24.i686.rpm                                           3.9 MB/s |  98 kB     00:00    
(18/144): libXcomposite-0.4.4-8.fc24.i686.rpm                                   3.2 MB/s |  27 kB     00:00    
(19/144): libXcursor-1.1.14-6.fc24.i686.rpm                                     3.5 MB/s |  35 kB     00:00    
(20/144): libXdamage-1.1.4-8.fc24.i686.rpm                                      2.8 MB/s |  25 kB     00:00    
(21/144): libXext-1.3.3-4.fc24.i686.rpm                                         3.5 MB/s |  43 kB     00:00    
(22/144): libXfixes-5.0.3-1.fc25.i686.rpm                                       3.1 MB/s |  22 kB     00:00    
(23/144): libXinerama-1.1.3-6.fc24.i686.rpm                                     2.6 MB/s |  18 kB     00:00    
(24/144): libXrandr-1.5.1-1.fc25.i686.rpm                                       3.7 MB/s |  30 kB     00:00    
(25/144): libXrender-0.9.10-1.fc25.i686.rpm                                     3.5 MB/s |  30 kB     00:00    
(26/144): atk-2.22.0-1.fc25.i686.rpm                                            715 kB/s | 263 kB     00:00    
(27/144): harfbuzz-1.3.2-1.fc25.i686.rpm                                        3.1 MB/s | 191 kB     00:00    
(28/144): alsa-lib-1.1.1-2.fc25.i686.rpm                                        4.4 MB/s | 411 kB     00:00    
(29/144): libXft-2.3.2-4.fc24.i686.rpm                                          3.4 MB/s |  62 kB     00:00    
(30/144): graphite2-1.3.6-1.fc25.i686.rpm                                       3.4 MB/s | 117 kB     00:00    
(31/144): libdatrie-0.2.9-3.fc25.i686.rpm                                       3.5 MB/s |  32 kB     00:00    
(32/144): libthai-0.1.25-1.fc25.i686.rpm                                        3.9 MB/s | 198 kB     00:00    
(33/144): gtk2-2.24.31-2.fc25.i686.rpm                                          6.1 MB/s | 3.4 MB     00:00    
(34/144): avahi-libs-0.6.32-4.fc25.i686.rpm                                     1.1 MB/s |  61 kB     00:00    
(35/144): audit-libs-2.7.1-1.fc25.i686.rpm                                      612 kB/s | 105 kB     00:00    
(36/144): krb5-libs-1.14.4-4.fc25.i686.rpm                                      7.4 MB/s | 749 kB     00:00    
(37/144): keyutils-libs-1.5.9-8.fc24.i686.rpm                                   604 kB/s |  45 kB     00:00    
(38/144): libverto-0.2.6-6.fc24.i686.rpm                                        3.0 MB/s |  21 kB     00:00    
(39/144): libcap-ng-0.7.8-1.fc25.i686.rpm                                       114 kB/s |  30 kB     00:00    
(40/144): gmp-6.1.1-1.fc25.i686.rpm                                             1.7 MB/s | 297 kB     00:00    
(41/144): cups-libs-2.2.0-5.fc25.i686.rpm                                       671 kB/s | 415 kB     00:00    
(42/144): libidn-1.33-1.fc25.i686.rpm                                           5.8 MB/s | 233 kB     00:00    
(43/144): libunistring-0.9.4-3.fc24.i686.rpm                                    4.8 MB/s | 324 kB     00:00    
(44/144): nettle-3.3-1.fc25.i686.rpm                                            5.4 MB/s | 324 kB     00:00    
(45/144): p11-kit-0.23.2-2.fc24.i686.rpm                                        2.0 MB/s | 148 kB     00:00    
(46/144): libffi-3.1-9.fc24.i686.rpm                                            494 kB/s |  34 kB     00:00    
(47/144): PackageKit-gtk3-module-1.1.5-1.fc25.i686.rpm                          173 kB/s |  17 kB     00:00    
(48/144): sqlite-libs-3.14.2-1.fc25.i686.rpm                                    5.4 MB/s | 470 kB     00:00    
(49/144): PackageKit-glib-1.1.5-1.fc25.i686.rpm                                 536 kB/s | 130 kB     00:00    
(50/144): gnutls-3.5.8-1.fc25.i686.rpm                                          610 kB/s | 711 kB     00:01    
(51/144): gdk-pixbuf2-modules-2.36.4-1.fc25.i686.rpm                            406 kB/s |  98 kB     00:00    
(52/144): jasper-libs-1.900.13-1.fc25.i686.rpm                                  1.8 MB/s | 151 kB     00:00    
(53/144): PackageKit-glib-1.1.5-1.fc25.x86_64.rpm                               146 kB/s | 132 kB     00:00    
(54/144): libjpeg-turbo-1.5.1-0.fc25.i686.rpm                                   2.7 MB/s | 164 kB     00:00    
(55/144): at-spi2-atk-2.22.0-1.fc25.i686.rpm                                    2.6 MB/s |  84 kB     00:00    
(56/144): json-glib-1.2.2-1.fc25.i686.rpm                                       2.9 MB/s | 138 kB     00:00    
(57/144): libepoxy-1.3.1-3.fc25.i686.rpm                                        5.3 MB/s | 208 kB     00:00    
(58/144): libwayland-client-1.12.0-1.fc25.i686.rpm                              953 kB/s |  35 kB     00:00    
(59/144): libwayland-cursor-1.12.0-1.fc25.i686.rpm                              548 kB/s |  24 kB     00:00    
(60/144): rest-0.8.0-1.fc25.i686.rpm                                            1.7 MB/s |  66 kB     00:00    
(61/144): at-spi2-core-2.22.0-1.fc25.i686.rpm                                   3.6 MB/s | 161 kB     00:00    
(62/144): gdk-pixbuf2-2.36.4-1.fc25.i686.rpm                                    383 kB/s | 461 kB     00:01    
(63/144): libsoup-2.56.0-2.fc25.i686.rpm                                        8.5 MB/s | 393 kB     00:00    
(64/144): libXtst-1.2.3-1.fc25.i686.rpm                                         3.8 MB/s |  24 kB     00:00    
(65/144): glib-networking-2.50.0-1.fc25.i686.rpm                                6.6 MB/s | 136 kB     00:00    
(66/144): xz-libs-5.2.2-2.fc24.i686.rpm                                         3.2 MB/s |  98 kB     00:00    
(67/144): libxml2-2.9.3-4.fc25.i686.rpm                                         4.7 MB/s | 691 kB     00:00    
(68/144): libxcb-1.12-1.fc25.i686.rpm                                           2.9 MB/s | 227 kB     00:00    
(69/144): libXau-1.0.8-6.fc24.i686.rpm                                          2.8 MB/s |  34 kB     00:00    
(70/144): libproxy-0.4.14-1.fc25.i686.rpm                                       284 kB/s |  71 kB     00:00    
(71/144): libmodman-2.0.1-12.fc24.i686.rpm                                      524 kB/s |  34 kB     00:00    
(72/144): libtiff-4.0.7-2.fc25.i686.rpm                                         528 kB/s | 179 kB     00:00    
(73/144): jbigkit-libs-2.1-5.fc24.i686.rpm                                      611 kB/s |  52 kB     00:00    
(74/144): libX11-1.6.4-4.fc25.i686.rpm                                          573 kB/s | 623 kB     00:01    
(75/144): libwayland-server-1.12.0-1.fc25.i686.rpm                              557 kB/s |  40 kB     00:00    
(76/144): mesa-libEGL-13.0.3-5.fc25.i686.rpm                                    296 kB/s | 102 kB     00:00    
(77/144): libxshmfence-1.2-3.fc24.i686.rpm                                       46 kB/s |  12 kB     00:00    
(78/144): mesa-libwayland-egl-13.0.3-5.fc25.i686.rpm                            150 kB/s |  25 kB     00:00    
(79/144): mesa-libgbm-13.0.3-5.fc25.i686.rpm                                     59 kB/s |  43 kB     00:00    
(80/144): pulseaudio-libs-9.0-1.fc25.i686.rpm                                   4.0 MB/s | 587 kB     00:00    
(81/144): json-c-0.12-7.fc24.i686.rpm                                           1.8 MB/s |  31 kB     00:00    
(82/144): libICE-1.0.9-5.fc25.i686.rpm                                          4.8 MB/s |  70 kB     00:00    
(83/144): libSM-1.2.2-4.fc24.i686.rpm                                           2.7 MB/s |  43 kB     00:00    
(84/144): libasyncns-0.8-10.fc24.i686.rpm                                       101 kB/s |  31 kB     00:00    
(85/144): libcap-2.25-2.fc25.i686.rpm                                           779 kB/s |  53 kB     00:00    
(86/144): openssl-libs-1.0.2j-3.fc25.i686.rpm                                   951 kB/s | 1.0 MB     00:01    
(87/144): tcp_wrappers-libs-7.6-83.fc25.i686.rpm                                805 kB/s |  72 kB     00:00    
(88/144): libuuid-2.28.2-1.fc25.i686.rpm                                        1.2 MB/s |  81 kB     00:00    
(89/144): systemd-libs-231-10.fc25.i686.rpm                                     3.3 MB/s | 444 kB     00:00    
(90/144): libgpg-error-1.24-1.fc25.i686.rpm                                     5.4 MB/s | 161 kB     00:00    
(91/144): libgcrypt-1.6.6-1.fc25.i686.rpm                                       3.4 MB/s | 356 kB     00:00    
(92/144): bzip2-libs-1.0.6-21.fc25.i686.rpm                                     175 kB/s |  44 kB     00:00    
(93/144): cairo-gobject-1.14.8-1.fc25.i686.rpm                                  172 kB/s |  29 kB     00:00    
(94/144): mesa-libGL-13.0.3-5.fc25.i686.rpm                                     536 kB/s | 179 kB     00:00    
(95/144): pixman-0.34.0-2.fc24.i686.rpm                                         5.6 MB/s | 264 kB     00:00    
(96/144): cairo-1.14.8-1.fc25.i686.rpm                                          808 kB/s | 750 kB     00:00    
(97/144): libXxf86vm-1.1.4-3.fc24.i686.rpm                                      820 kB/s |  22 kB     00:00    
(98/144): mesa-libglapi-13.0.3-5.fc25.i686.rpm                                  348 kB/s |  59 kB     00:00    
(99/144): lcms2-2.8-2.fc25.i686.rpm                                             5.5 MB/s | 159 kB     00:00    
(100/144): libgusb-0.2.9-1.fc25.i686.rpm                                        3.4 MB/s |  46 kB     00:00    
(101/144): libusbx-1.0.21-1.fc25.i686.rpm                                       1.8 MB/s |  67 kB     00:00    
(102/144): dbus-libs-1.11.8-1.fc25.i686.rpm                                     691 kB/s | 176 kB     00:00    
(103/144): colord-libs-1.3.4-1.fc25.i686.rpm                                    536 kB/s | 199 kB     00:00    
(104/144): gtk3-3.22.7-1.fc25.i686.rpm                                          955 kB/s | 4.3 MB     00:04    
(105/144): libmount-2.28.2-1.fc25.i686.rpm                                      8.3 MB/s | 200 kB     00:00    
(106/144): libblkid-2.28.2-1.fc25.i686.rpm                                      6.4 MB/s | 187 kB     00:00    
(107/144): pcre-8.39-6.fc25.i686.rpm                                            1.4 MB/s | 198 kB     00:00    
(108/144): libXi-1.7.8-2.fc25.i686.rpm                                          1.2 MB/s |  46 kB     00:00    
(109/144): libcom_err-1.43.3-1.fc25.i686.rpm                                    190 kB/s |  33 kB     00:00    
(110/144): libdrm-2.4.74-1.fc25.i686.rpm                                        269 kB/s | 158 kB     00:00    
(111/144): libpciaccess-0.13.4-3.fc24.i686.rpm                                  4.7 MB/s |  32 kB     00:00    
(112/144): libgcc-6.3.1-1.fc25.i686.rpm                                         298 kB/s |  99 kB     00:00    
(113/144): libpng-1.6.27-1.fc25.i686.rpm                                        300 kB/s | 125 kB     00:00    
(114/144): gstreamer1-1.10.2-1.fc25.i686.rpm                                    592 kB/s | 1.2 MB     00:02    
(115/144): libselinux-2.5-13.fc25.i686.rpm                                      397 kB/s | 165 kB     00:00    
(116/144): libsepol-2.5-10.fc25.i686.rpm                                        4.3 MB/s | 299 kB     00:00    
(117/144): glib2-2.50.2-1.fc25.i686.rpm                                         969 kB/s | 2.3 MB     00:02    
(118/144): libsndfile-1.0.27-1.fc25.i686.rpm                                    428 kB/s | 204 kB     00:00    
(119/144): libogg-1.3.2-5.fc24.i686.rpm                                         2.1 MB/s |  29 kB     00:00    
(120/144): gsm-1.0.16-1.fc25.i686.rpm                                           151 kB/s |  34 kB     00:00    
(121/144): flac-libs-1.3.2-1.fc25.i686.rpm                                      437 kB/s | 217 kB     00:00    
(122/144): libtasn1-4.9-1.fc25.i686.rpm                                         3.5 MB/s | 329 kB     00:00    
(123/144): libtool-ltdl-2.4.6-13.fc25.i686.rpm                                  319 kB/s |  55 kB     00:00    
(124/144): libxkbcommon-0.6.1-1.fc25.i686.rpm                                   1.4 MB/s | 115 kB     00:00    
(125/144): lz4-1.7.5-1.fc25.i686.rpm                                            577 kB/s | 101 kB     00:00    
(126/144): dconf-0.26.0-1.fc25.i686.rpm                                         1.5 MB/s | 100 kB     00:00    
(127/144): libvorbis-1.3.5-1.fc25.i686.rpm                                      377 kB/s | 188 kB     00:00    
(128/144): audit-2.7.1-1.fc25.x86_64.rpm                                        708 kB/s | 238 kB     00:00    
(129/144): libstdc++-6.3.1-1.fc25.i686.rpm                                      489 kB/s | 485 kB     00:00    
(130/144): cups-client-2.2.0-5.fc25.x86_64.rpm                                  566 kB/s | 156 kB     00:00    
(131/144): cups-filesystem-2.2.0-5.fc25.noarch.rpm                              303 kB/s | 101 kB     00:00    
(132/144): cups-libs-2.2.0-5.fc25.x86_64.rpm                                    458 kB/s | 411 kB     00:00    
(133/144): gnutls-3.5.8-1.fc25.x86_64.rpm                                       689 kB/s | 736 kB     00:01    
(134/144): cups-2.2.0-5.fc25.x86_64.rpm                                         753 kB/s | 1.3 MB     00:01    
(135/144): libX11-common-1.6.4-4.fc25.noarch.rpm                                635 kB/s | 165 kB     00:00    
(136/144): libproxy-0.4.14-1.fc25.x86_64.rpm                                    374 kB/s |  67 kB     00:00    
(137/144): libX11-1.6.4-4.fc25.x86_64.rpm                                       810 kB/s | 614 kB     00:00    
(138/144): mesa-libEGL-13.0.3-5.fc25.x86_64.rpm                                 479 kB/s | 101 kB     00:00    
(139/144): mesa-libglapi-13.0.3-5.fc25.x86_64.rpm                               257 kB/s |  49 kB     00:00    
(140/144): mesa-libGL-13.0.3-5.fc25.x86_64.rpm                                  388 kB/s | 163 kB     00:00    
(141/144): mesa-libGLES-13.0.3-5.fc25.x86_64.rpm                                167 kB/s |  33 kB     00:00    
(142/144): mesa-libgbm-13.0.3-5.fc25.x86_64.rpm                                 227 kB/s |  42 kB     00:00    
(143/144): mesa-libwayland-egl-13.0.3-5.fc25.x86_64.rpm                         103 kB/s |  25 kB     00:00    
(144/144): gtk3-3.22.7-1.fc25.x86_64.rpm                                        907 kB/s | 4.3 MB     00:04    
[DRPM] gdk-pixbuf2-modules-2.36.3-1.fc25_2.36.4-1.fc25.x86_64.drpm: done                                       
[DRPM] gdk-pixbuf2-2.36.3-1.fc25_2.36.4-1.fc25.x86_64.drpm: done                                               
[DRPM] libtiff-4.0.7-1.fc25_4.0.7-2.fc25.x86_64.drpm: done     
--------------------------------------------------------------------------------------------------------------------------------------
Total                           2.1 MB/s |  39 MB     00:19     
Delta RPMs reduced 40.2 MB of updates to 39.3 MB (2.1% saved)
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Installing  : libgcc-6.3.1-1.fc25.i686                  1/167 
  Installing  : zlib-1.2.8-10.fc24.i686                   2/167 
  Upgrading   : audit-libs-2.7.1-1.fc25.x86_64            3/167 
  Installing  : libstdc++-6.3.1-1.fc25.i686               4/167 
  Installing  : libpng-2:1.6.27-1.fc25.i686               5/167 
  Installing  : libffi-3.1-9.fc24.i686                    6/167 
  Installing  : libwayland-client-1.12.0-1.fc25.i686      7/167 
  Installing  : expat-2.2.0-1.fc25.i686                   8/167 
  Upgrading   : gdk-pixbuf2-2.36.4-1.fc25.x86_64          9/167 
  Installing  : libtool-ltdl-2.4.6-13.fc25.i686          10/167 
  Installing  : libogg-2:1.3.2-5.fc24.i686               11/167 
  Installing  : libvorbis-1:1.3.5-1.fc25.i686            12/167 
  Installing  : libcom_err-1.43.3-1.fc25.i686            13/167 
  Installing  : libuuid-2.28.2-1.fc25.i686               14/167 
  Installing  : libjpeg-turbo-1.5.1-0.fc25.i686          15/167 
  Installing  : libtdb-1.3.11-1.fc25.i686                16/167 
  Upgrading   : mesa-libglapi-13.0.3-5.fc25.x86_64       17/167 
  Upgrading   : libtiff-4.0.7-2.fc25.x86_64              18/167 
  Upgrading   : libX11-common-1.6.4-4.fc25.noarch        19/167 
  Upgrading   : libX11-1.6.4-4.fc25.x86_64               20/167 
  Installing  : p11-kit-0.23.2-2.fc24.i686               21/167 
  Installing  : libwayland-server-1.12.0-1.fc25.i686     22/167 
  Installing  : libtasn1-4.9-1.fc25.i686                 23/167 
  Upgrading   : gnutls-3.5.8-1.fc25.x86_64               24/167 
  Upgrading   : cups-libs-1:2.2.0-5.fc25.x86_64          25/167 
  Installing  : pcre-8.39-6.fc25.i686                    26/167 
  Installing  : pixman-0.34.0-2.fc24.i686                27/167 
  Installing  : libgpg-error-1.24-1.fc25.i686            28/167 
  Installing  : libcap-2.25-2.fc25.i686                  29/167 
  Installing  : libICE-1.0.9-5.fc25.i686                 30/167 
  Installing  : libxshmfence-1.2-3.fc24.i686             31/167 
  Installing  : xz-libs-5.2.2-2.fc24.i686                32/167 
  Installing  : libxml2-2.9.3-4.fc25.i686                33/167 
  Installing  : sqlite-libs-3.14.2-1.fc25.i686           34/167 
  Installing  : gmp-1:6.1.1-1.fc25.i686                  35/167 
  Upgrading   : cups-client-1:2.2.0-5.fc25.x86_64        36/167 
  Upgrading   : gdk-pixbuf2-modules-2.36.4-1.fc25.x86_64 37/167 
  Upgrading   : audit-2.7.1-1.fc25.x86_64                38/167 
  Upgrading   : mesa-libwayland-egl-13.0.3-5.fc25.x86_64 39/167 
  Upgrading   : mesa-libgbm-13.0.3-5.fc25.x86_64         40/167 
  Upgrading   : cups-filesystem-1:2.2.0-5.fc25.noarch    41/167 
  Installing  : nettle-3.3-1.fc25.i686                   42/167 
  Installing  : libSM-1.2.2-4.fc24.i686                  43/167 
  Installing  : libgcrypt-1.6.6-1.fc25.i686              44/167 
  Installing  : jasper-libs-1.900.13-1.fc25.i686         45/167 
  Installing  : libblkid-2.28.2-1.fc25.i686              46/167 
  Installing  : flac-libs-1.3.2-1.fc25.i686              47/167 
  Installing  : libwayland-cursor-1.12.0-1.fc25.i686     48/167 
  Installing  : graphite2-1.3.6-1.fc25.i686              49/167 
  Installing  : libmodman-2.0.1-12.fc24.i686             50/167 
  Installing  : libproxy-0.4.14-1.fc25.i686              51/167 
  Installing  : lz4-1.7.5-1.fc25.i686                    52/167 
  Installing  : libxkbcommon-0.6.1-1.fc25.i686           53/167 
  Installing  : gsm-1.0.16-1.fc25.i686                   54/167 
  Installing  : libsndfile-1.0.27-1.fc25.i686            55/167 
  Installing  : libsepol-2.5-10.fc25.i686                56/167 
  Installing  : libselinux-2.5-13.fc25.i686              57/167 
  Installing  : systemd-libs-231-10.fc25.i686            58/167 
  Installing  : dbus-libs-1:1.11.8-1.fc25.i686           59/167 
  Installing  : libusbx-1.0.21-1.fc25.i686               60/167 
  Installing  : avahi-libs-0.6.32-4.fc25.i686            61/167 
  Installing  : mesa-libglapi-13.0.3-5.fc25.i686         62/167 
  Installing  : libmount-2.28.2-1.fc25.i686              63/167 
  Installing  : glib2-2.50.2-1.fc25.i686                 64/167 
  Installing  : atk-2.22.0-1.fc25.i686                   65/167 
  Installing  : gdk-pixbuf2-2.36.4-1.fc25.i686           66/167 
  Installing  : PackageKit-glib-1.1.5-1.fc25.i686        67/167 
  Installing  : json-glib-1.2.2-1.fc25.i686              68/167 
  Installing  : libgusb-0.2.9-1.fc25.i686                69/167 
  Installing  : gstreamer1-1.10.2-1.fc25.i686            70/167 
  Installing  : libpciaccess-0.13.4-3.fc24.i686          71/167 
  Installing  : libdrm-2.4.74-1.fc25.i686                72/167 
  Installing  : mesa-libgbm-13.0.3-5.fc25.i686           73/167 
  Installing  : lcms2-2.8-2.fc25.i686                    74/167 
  Installing  : colord-libs-1.3.4-1.fc25.i686            75/167 
  Installing  : bzip2-libs-1.0.6-21.fc25.i686            76/167 
  Installing  : freetype-2.6.5-1.fc25.i686               77/167 
  Installing  : fontconfig-2.12.1-1.fc25.i686            78/167 
  Installing  : harfbuzz-1.3.2-1.fc25.i686               79/167 
  Installing  : tcp_wrappers-libs-7.6-83.fc25.i686       80/167 
  Installing  : libasyncns-0.8-10.fc24.i686              81/167 
  Installing  : json-c-0.12-7.fc24.i686                  82/167 
  Installing  : mesa-libwayland-egl-13.0.3-5.fc25.i686   83/167 
  Installing  : jbigkit-libs-2.1-5.fc24.i686             84/167 
  Installing  : libtiff-4.0.7-2.fc25.i686                85/167 
  Installing  : gdk-pixbuf2-modules-2.36.4-1.fc25.i686   86/167 
  Installing  : libXau-1.0.8-6.fc24.i686                 87/167 
  Installing  : libxcb-1.12-1.fc25.i686                  88/167 
  Installing  : libX11-1.6.4-4.fc25.i686                 89/167 
  Installing  : libXext-1.3.3-4.fc24.i686                90/167 
  Installing  : libXrender-0.9.10-1.fc25.i686            91/167 
  Installing  : libXfixes-5.0.3-1.fc25.i686              92/167 
  Installing  : libXdamage-1.1.4-8.fc24.i686             93/167 
  Installing  : libXi-1.7.8-2.fc25.i686                  94/167 
  Installing  : libXtst-1.2.3-1.fc25.i686                95/167 
  Installing  : libXcursor-1.1.14-6.fc24.i686            96/167 
  Installing  : libXrandr-1.5.1-1.fc25.i686              97/167 
  Installing  : libXinerama-1.1.3-6.fc24.i686            98/167 
  Installing  : libXcomposite-0.4.4-8.fc24.i686          99/167 
  Installing  : mesa-libEGL-13.0.3-5.fc25.i686          100/167 
  Installing  : at-spi2-core-2.22.0-1.fc25.i686         101/167 
  Installing  : at-spi2-atk-2.22.0-1.fc25.i686          102/167 
  Installing  : pulseaudio-libs-9.0-1.fc25.i686         103/167 
  Installing  : libXft-2.3.2-4.fc24.i686                104/167 
  Installing  : libXxf86vm-1.1.4-3.fc24.i686            105/167 
  Installing  : mesa-libGL-13.0.3-5.fc25.i686           106/167 
  Installing  : cairo-1.14.8-1.fc25.i686                107/167 
  Installing  : cairo-gobject-1.14.8-1.fc25.i686        108/167 
  Installing  : libepoxy-1.3.1-3.fc25.i686              109/167 
  Installing  : libunistring-0.9.4-3.fc24.i686          110/167 
  Installing  : libidn-1.33-1.fc25.i686                 111/167 
  Installing  : gnutls-3.5.8-1.fc25.i686                112/167 
  Installing  : glib-networking-2.50.0-1.fc25.i686      113/167 
  Installing  : libverto-0.2.6-6.fc24.i686              114/167 
  Installing  : keyutils-libs-1.5.9-8.fc24.i686         115/167 
  Installing  : krb5-libs-1.14.4-4.fc25.i686            116/167 
  Installing  : openssl-libs-1:1.0.2j-3.fc25.i686       117/167 
  Installing  : libsoup-2.56.0-2.fc25.i686              118/167 
  Installing  : rest-0.8.0-1.fc25.i686                  119/167 
  Installing  : libcap-ng-0.7.8-1.fc25.i686             120/167 
  Installing  : audit-libs-2.7.1-1.fc25.i686            121/167 
  Installing  : cups-libs-1:2.2.0-5.fc25.i686           122/167 
  Installing  : libdatrie-0.2.9-3.fc25.i686             123/167 
  Installing  : libthai-0.1.25-1.fc25.i686              124/167 
  Installing  : pango-1.40.3-1.fc25.i686                125/167 
  Installing  : gtk2-2.24.31-2.fc25.i686                126/167 
  Installing  : gtk3-3.22.7-1.fc25.i686                 127/167 
  Installing  : alsa-lib-1.1.1-2.fc25.i686              128/167 
  Upgrading   : cups-1:2.2.0-5.fc25.x86_64              129/167 
  Upgrading   : mesa-libEGL-13.0.3-5.fc25.x86_64        130/167 
  Upgrading   : gtk3-3.22.7-1.fc25.x86_64               131/167 
  Upgrading   : audit-libs-python3-2.7.1-1.fc25.x86_64  132/167 
  Upgrading   : gdk-pixbuf2-xlib-2.36.4-1.fc25.x86_64   133/167 
  Upgrading   : mesa-libGL-13.0.3-5.fc25.x86_64         134/167 
  Upgrading   : mesa-libGLES-13.0.3-5.fc25.x86_64       135/167 
  Upgrading   : audit-libs-python-2.7.1-1.fc25.x86_64   136/167 
  Upgrading   : libproxy-0.4.14-1.fc25.x86_64           137/167 
  Installing  : PackageKit-glib-1.1.5-1.fc25.x86_64     138/167 
  Installing  : libcanberra-0.30-11.fc24.i686           139/167 
  Installing  : libcanberra-gtk3-0.30-11.fc24.i686      140/167 
  Installing  : libcanberra-gtk2-0.30-11.fc24.i686      141/167 
  Installing  : PackageKit-gtk3-module-1.1.5-1.fc25.i686142/167 
  Installing  : adwaita-gtk2-theme-3.22.2-1.fc25.i686   143/167 
  Installing  : dconf-0.26.0-1.fc25.i686                144/167 
  Cleanup     : cups-1:2.2.0-4.fc25.x86_64              145/167 
  Cleanup     : gtk3-3.22.6-1.fc25.x86_64               146/167 
  Cleanup     : cups-client-1:2.2.0-4.fc25.x86_64       147/167 
  Cleanup     : gdk-pixbuf2-xlib-2.36.3-1.fc25.x86_64   148/167 
  Cleanup     : cups-libs-1:2.2.0-4.fc25.x86_64         149/167 
  Cleanup     : gdk-pixbuf2-modules-2.36.3-1.fc25.x86_64150/167 
  Cleanup     : mesa-libGL-13.0.3-1.fc25.x86_64         151/167 
  Cleanup     : mesa-libEGL-13.0.3-1.fc25.x86_64        152/167 
  Cleanup     : audit-libs-python3-2.7-1.fc25.x86_64    153/167 
  Cleanup     : audit-2.7-1.fc25.x86_64                 154/167 
  Cleanup     : libX11-1.6.4-2.fc25.x86_64              155/167 
  Cleanup     : mesa-libGLES-13.0.3-1.fc25.x86_64       156/167 
  Cleanup     : audit-libs-python-2.7-1.fc25.x86_64     157/167 
  Cleanup     : libX11-common-1.6.4-2.fc25.noarch       158/167 
  Cleanup     : cups-filesystem-1:2.2.0-4.fc25.noarch   159/167 
  Cleanup     : audit-libs-2.7-1.fc25.x86_64            160/167 
  Cleanup     : mesa-libglapi-13.0.3-1.fc25.x86_64      161/167 
  Cleanup     : mesa-libgbm-13.0.3-1.fc25.x86_64        162/167 
  Cleanup     : gdk-pixbuf2-2.36.3-1.fc25.x86_64        163/167 
  Cleanup     : libtiff-4.0.7-1.fc25.x86_64             164/167 
  Cleanup     : gnutls-3.5.7-3.fc25.x86_64              165/167 
  Cleanup     : mesa-libwayland-egl-13.0.3-1.fc25.x86_64166/167 
  Cleanup     : libproxy-0.4.13-1.fc25.x86_64           167/167 
  Verifying   : libcanberra-gtk2-0.30-11.fc24.i686        1/167 
  Verifying   : adwaita-gtk2-theme-3.22.2-1.fc25.i686     2/167 
  Verifying   : atk-2.22.0-1.fc25.i686                    3/167 
  Verifying   : fontconfig-2.12.1-1.fc25.i686             4/167 
  Verifying   : freetype-2.6.5-1.fc25.i686                5/167 
  Verifying   : gtk2-2.24.31-2.fc25.i686                  6/167 
  Verifying   : libcanberra-0.30-11.fc24.i686             7/167 
  Verifying   : libcanberra-gtk3-0.30-11.fc24.i686        8/167 
  Verifying   : libtdb-1.3.11-1.fc25.i686                 9/167 
  Verifying   : pango-1.40.3-1.fc25.i686                 10/167 
  Verifying   : expat-2.2.0-1.fc25.i686                  11/167 
  Verifying   : zlib-1.2.8-10.fc24.i686                  12/167 
  Verifying   : libXcomposite-0.4.4-8.fc24.i686          13/167 
  Verifying   : libXcursor-1.1.14-6.fc24.i686            14/167 
  Verifying   : libXdamage-1.1.4-8.fc24.i686             15/167 
  Verifying   : libXext-1.3.3-4.fc24.i686                16/167 
  Verifying   : libXfixes-5.0.3-1.fc25.i686              17/167 
  Verifying   : libXinerama-1.1.3-6.fc24.i686            18/167 
  Verifying   : libXrandr-1.5.1-1.fc25.i686              19/167 
  Verifying   : libXrender-0.9.10-1.fc25.i686            20/167 
  Verifying   : alsa-lib-1.1.1-2.fc25.i686               21/167 
  Verifying   : harfbuzz-1.3.2-1.fc25.i686               22/167 
  Verifying   : libXft-2.3.2-4.fc24.i686                 23/167 
  Verifying   : libthai-0.1.25-1.fc25.i686               24/167 
  Verifying   : graphite2-1.3.6-1.fc25.i686              25/167 
  Verifying   : libdatrie-0.2.9-3.fc25.i686              26/167 
  Verifying   : cups-libs-1:2.2.0-5.fc25.i686            27/167 
  Verifying   : audit-libs-2.7.1-1.fc25.i686             28/167 
  Verifying   : avahi-libs-0.6.32-4.fc25.i686            29/167 
  Verifying   : krb5-libs-1.14.4-4.fc25.i686             30/167 
  Verifying   : libcap-ng-0.7.8-1.fc25.i686              31/167 
  Verifying   : keyutils-libs-1.5.9-8.fc24.i686          32/167 
  Verifying   : libverto-0.2.6-6.fc24.i686               33/167 
  Verifying   : gnutls-3.5.8-1.fc25.i686                 34/167 
  Verifying   : gmp-1:6.1.1-1.fc25.i686                  35/167 
  Verifying   : libidn-1.33-1.fc25.i686                  36/167 
  Verifying   : libunistring-0.9.4-3.fc24.i686           37/167 
  Verifying   : nettle-3.3-1.fc25.i686                   38/167 
  Verifying   : p11-kit-0.23.2-2.fc24.i686               39/167 
  Verifying   : libffi-3.1-9.fc24.i686                   40/167 
  Verifying   : PackageKit-gtk3-module-1.1.5-1.fc25.i686 41/167 
  Verifying   : PackageKit-glib-1.1.5-1.fc25.i686        42/167 
  Verifying   : sqlite-libs-3.14.2-1.fc25.i686           43/167 
  Verifying   : PackageKit-glib-1.1.5-1.fc25.x86_64      44/167 
  Verifying   : gdk-pixbuf2-2.36.4-1.fc25.i686           45/167 
  Verifying   : gdk-pixbuf2-modules-2.36.4-1.fc25.i686   46/167 
  Verifying   : jasper-libs-1.900.13-1.fc25.i686         47/167 
  Verifying   : libjpeg-turbo-1.5.1-0.fc25.i686          48/167 
  Verifying   : gtk3-3.22.7-1.fc25.i686                  49/167 
  Verifying   : at-spi2-atk-2.22.0-1.fc25.i686           50/167 
  Verifying   : json-glib-1.2.2-1.fc25.i686              51/167 
  Verifying   : libepoxy-1.3.1-3.fc25.i686               52/167 
  Verifying   : libwayland-client-1.12.0-1.fc25.i686     53/167 
  Verifying   : libwayland-cursor-1.12.0-1.fc25.i686     54/167 
  Verifying   : rest-0.8.0-1.fc25.i686                   55/167 
  Verifying   : at-spi2-core-2.22.0-1.fc25.i686          56/167 
  Verifying   : libsoup-2.56.0-2.fc25.i686               57/167 
  Verifying   : libxml2-2.9.3-4.fc25.i686                58/167 
  Verifying   : libXtst-1.2.3-1.fc25.i686                59/167 
  Verifying   : glib-networking-2.50.0-1.fc25.i686       60/167 
  Verifying   : xz-libs-5.2.2-2.fc24.i686                61/167 
  Verifying   : libX11-1.6.4-4.fc25.i686                 62/167 
  Verifying   : libxcb-1.12-1.fc25.i686                  63/167 
  Verifying   : libXau-1.0.8-6.fc24.i686                 64/167 
  Verifying   : libproxy-0.4.14-1.fc25.i686              65/167 
  Verifying   : libmodman-2.0.1-12.fc24.i686             66/167 
  Verifying   : libtiff-4.0.7-2.fc25.i686                67/167 
  Verifying   : jbigkit-libs-2.1-5.fc24.i686             68/167 
  Verifying   : mesa-libEGL-13.0.3-5.fc25.i686           69/167 
  Verifying   : libwayland-server-1.12.0-1.fc25.i686     70/167 
  Verifying   : libxshmfence-1.2-3.fc24.i686             71/167 
  Verifying   : mesa-libgbm-13.0.3-5.fc25.i686           72/167 
  Verifying   : mesa-libwayland-egl-13.0.3-5.fc25.i686   73/167 
  Verifying   : openssl-libs-1:1.0.2j-3.fc25.i686        74/167 
  Verifying   : pulseaudio-libs-9.0-1.fc25.i686          75/167 
  Verifying   : json-c-0.12-7.fc24.i686                  76/167 
  Verifying   : libICE-1.0.9-5.fc25.i686                 77/167 
  Verifying   : libSM-1.2.2-4.fc24.i686                  78/167 
  Verifying   : libasyncns-0.8-10.fc24.i686              79/167 
  Verifying   : libcap-2.25-2.fc25.i686                  80/167 
  Verifying   : tcp_wrappers-libs-7.6-83.fc25.i686       81/167 
  Verifying   : libuuid-2.28.2-1.fc25.i686               82/167 
  Verifying   : systemd-libs-231-10.fc25.i686            83/167 
  Verifying   : libgcrypt-1.6.6-1.fc25.i686              84/167 
  Verifying   : libgpg-error-1.24-1.fc25.i686            85/167 
  Verifying   : bzip2-libs-1.0.6-21.fc25.i686            86/167 
  Verifying   : cairo-1.14.8-1.fc25.i686                 87/167 
  Verifying   : cairo-gobject-1.14.8-1.fc25.i686         88/167 
  Verifying   : mesa-libGL-13.0.3-5.fc25.i686            89/167 
  Verifying   : pixman-0.34.0-2.fc24.i686                90/167 
  Verifying   : mesa-libglapi-13.0.3-5.fc25.i686         91/167 
  Verifying   : libXxf86vm-1.1.4-3.fc24.i686             92/167 
  Verifying   : colord-libs-1.3.4-1.fc25.i686            93/167 
  Verifying   : lcms2-2.8-2.fc25.i686                    94/167 
  Verifying   : libgusb-0.2.9-1.fc25.i686                95/167 
  Verifying   : libusbx-1.0.21-1.fc25.i686               96/167 
  Verifying   : dbus-libs-1:1.11.8-1.fc25.i686           97/167 
  Verifying   : glib2-2.50.2-1.fc25.i686                 98/167 
  Verifying   : pcre-8.39-6.fc25.i686                    99/167 
  Verifying   : libmount-2.28.2-1.fc25.i686             100/167 
  Verifying   : libblkid-2.28.2-1.fc25.i686             101/167 
  Verifying   : gstreamer1-1.10.2-1.fc25.i686           102/167 
  Verifying   : libXi-1.7.8-2.fc25.i686                 103/167 
  Verifying   : libcom_err-1.43.3-1.fc25.i686           104/167 
  Verifying   : libdrm-2.4.74-1.fc25.i686               105/167 
  Verifying   : libpciaccess-0.13.4-3.fc24.i686         106/167 
  Verifying   : libgcc-6.3.1-1.fc25.i686                107/167 
  Verifying   : libpng-2:1.6.27-1.fc25.i686             108/167 
  Verifying   : libselinux-2.5-13.fc25.i686             109/167 
  Verifying   : libsepol-2.5-10.fc25.i686               110/167 
  Verifying   : libsndfile-1.0.27-1.fc25.i686           111/167 
  Verifying   : flac-libs-1.3.2-1.fc25.i686             112/167 
  Verifying   : gsm-1.0.16-1.fc25.i686                  113/167 
  Verifying   : libogg-2:1.3.2-5.fc24.i686              114/167 
  Verifying   : libstdc++-6.3.1-1.fc25.i686             115/167 
  Verifying   : libtasn1-4.9-1.fc25.i686                116/167 
  Verifying   : libtool-ltdl-2.4.6-13.fc25.i686         117/167 
  Verifying   : libvorbis-1:1.3.5-1.fc25.i686           118/167 
  Verifying   : libxkbcommon-0.6.1-1.fc25.i686          119/167 
  Verifying   : lz4-1.7.5-1.fc25.i686                   120/167 
  Verifying   : dconf-0.26.0-1.fc25.i686                121/167 
  Verifying   : audit-libs-2.7.1-1.fc25.x86_64          122/167 
  Verifying   : audit-libs-python3-2.7.1-1.fc25.x86_64  123/167 
  Verifying   : audit-libs-python-2.7.1-1.fc25.x86_64   124/167 
  Verifying   : audit-2.7.1-1.fc25.x86_64               125/167 
  Verifying   : cups-libs-1:2.2.0-5.fc25.x86_64         126/167 
  Verifying   : cups-client-1:2.2.0-5.fc25.x86_64       127/167 
  Verifying   : cups-1:2.2.0-5.fc25.x86_64              128/167 
  Verifying   : cups-filesystem-1:2.2.0-5.fc25.noarch   129/167 
  Verifying   : gnutls-3.5.8-1.fc25.x86_64              130/167 
  Verifying   : gdk-pixbuf2-2.36.4-1.fc25.x86_64        131/167 
  Verifying   : gdk-pixbuf2-xlib-2.36.4-1.fc25.x86_64   132/167 
  Verifying   : gdk-pixbuf2-modules-2.36.4-1.fc25.x86_64133/167 
  Verifying   : gtk3-3.22.7-1.fc25.x86_64               134/167 
  Verifying   : libX11-1.6.4-4.fc25.x86_64              135/167 
  Verifying   : libX11-common-1.6.4-4.fc25.noarch       136/167 
  Verifying   : libproxy-0.4.14-1.fc25.x86_64           137/167 
  Verifying   : libtiff-4.0.7-2.fc25.x86_64             138/167 
  Verifying   : mesa-libEGL-13.0.3-5.fc25.x86_64        139/167 
  Verifying   : mesa-libGL-13.0.3-5.fc25.x86_64         140/167 
  Verifying   : mesa-libglapi-13.0.3-5.fc25.x86_64      141/167 
  Verifying   : mesa-libGLES-13.0.3-5.fc25.x86_64       142/167 
  Verifying   : mesa-libgbm-13.0.3-5.fc25.x86_64        143/167 
  Verifying   : mesa-libwayland-egl-13.0.3-5.fc25.x86_64144/167 
  Verifying   : gtk3-3.22.6-1.fc25.x86_64               145/167 
  Verifying   : gnutls-3.5.7-3.fc25.x86_64              146/167 
  Verifying   : cups-1:2.2.0-4.fc25.x86_64              147/167 
  Verifying   : cups-client-1:2.2.0-4.fc25.x86_64       148/167 
  Verifying   : cups-filesystem-1:2.2.0-4.fc25.noarch   149/167 
  Verifying   : gdk-pixbuf2-2.36.3-1.fc25.x86_64        150/167 
  Verifying   : gdk-pixbuf2-modules-2.36.3-1.fc25.x86_64151/167 
  Verifying   : cups-libs-1:2.2.0-4.fc25.x86_64         152/167 
  Verifying   : gdk-pixbuf2-xlib-2.36.3-1.fc25.x86_64   153/167 
  Verifying   : libX11-1.6.4-2.fc25.x86_64              154/167 
  Verifying   : libX11-common-1.6.4-2.fc25.noarch       155/167 
  Verifying   : libproxy-0.4.13-1.fc25.x86_64           156/167 
  Verifying   : mesa-libEGL-13.0.3-1.fc25.x86_64        157/167 
  Verifying   : mesa-libGL-13.0.3-1.fc25.x86_64         158/167 
  Verifying   : audit-2.7-1.fc25.x86_64                 159/167 
  Verifying   : audit-libs-2.7-1.fc25.x86_64            160/167 
  Verifying   : audit-libs-python-2.7-1.fc25.x86_64     161/167 
  Verifying   : audit-libs-python3-2.7-1.fc25.x86_64    162/167 
  Verifying   : mesa-libglapi-13.0.3-1.fc25.x86_64      163/167 
  Verifying   : mesa-libGLES-13.0.3-1.fc25.x86_64       164/167 
  Verifying   : mesa-libgbm-13.0.3-1.fc25.x86_64        165/167 
  Verifying   : mesa-libwayland-egl-13.0.3-1.fc25.x86_64166/167 
  Verifying   : libtiff-4.0.7-1.fc25.x86_64             167/167 

Installed:
  PackageKit-glib.i686 1.1.5-1.fc25       PackageKit-glib.x86_64 1.1.5-1.fc25     PackageKit-gtk3-module.i686 1.1.5-1.fc25    adwaita-gtk2-theme.i686 3.22.2-1.fc25    alsa-lib.i686 1.1.1-2.fc25           
  at-spi2-atk.i686 2.22.0-1.fc25          at-spi2-core.i686 2.22.0-1.fc25         atk.i686 2.22.0-1.fc25                      audit-libs.i686 2.7.1-1.fc25             avahi-libs.i686 0.6.32-4.fc25        
  bzip2-libs.i686 1.0.6-21.fc25           cairo.i686 1.14.8-1.fc25                cairo-gobject.i686 1.14.8-1.fc25            colord-libs.i686 1.3.4-1.fc25            cups-libs.i686 1:2.2.0-5.fc25        
  dbus-libs.i686 1:1.11.8-1.fc25          dconf.i686 0.26.0-1.fc25                expat.i686 2.2.0-1.fc25                     flac-libs.i686 1.3.2-1.fc25              fontconfig.i686 2.12.1-1.fc25        
  freetype.i686 2.6.5-1.fc25              gdk-pixbuf2.i686 2.36.4-1.fc25          gdk-pixbuf2-modules.i686 2.36.4-1.fc25      glib-networking.i686 2.50.0-1.fc25       glib2.i686 2.50.2-1.fc25             
  gmp.i686 1:6.1.1-1.fc25                 gnutls.i686 3.5.8-1.fc25                graphite2.i686 1.3.6-1.fc25                 gsm.i686 1.0.16-1.fc25                   gstreamer1.i686 1.10.2-1.fc25        
  gtk2.i686 2.24.31-2.fc25                gtk3.i686 3.22.7-1.fc25                 harfbuzz.i686 1.3.2-1.fc25                  jasper-libs.i686 1.900.13-1.fc25         jbigkit-libs.i686 2.1-5.fc24         
  json-c.i686 0.12-7.fc24                 json-glib.i686 1.2.2-1.fc25             keyutils-libs.i686 1.5.9-8.fc24             krb5-libs.i686 1.14.4-4.fc25             lcms2.i686 2.8-2.fc25                
  libICE.i686 1.0.9-5.fc25                libSM.i686 1.2.2-4.fc24                 libX11.i686 1.6.4-4.fc25                    libXau.i686 1.0.8-6.fc24                 libXcomposite.i686 0.4.4-8.fc24      
  libXcursor.i686 1.1.14-6.fc24           libXdamage.i686 1.1.4-8.fc24            libXext.i686 1.3.3-4.fc24                   libXfixes.i686 5.0.3-1.fc25              libXft.i686 2.3.2-4.fc24             
  libXi.i686 1.7.8-2.fc25                 libXinerama.i686 1.1.3-6.fc24           libXrandr.i686 1.5.1-1.fc25                 libXrender.i686 0.9.10-1.fc25            libXtst.i686 1.2.3-1.fc25            
  libXxf86vm.i686 1.1.4-3.fc24            libasyncns.i686 0.8-10.fc24             libblkid.i686 2.28.2-1.fc25                 libcanberra.i686 0.30-11.fc24            libcanberra-gtk2.i686 0.30-11.fc24   
  libcanberra-gtk3.i686 0.30-11.fc24      libcap.i686 2.25-2.fc25                 libcap-ng.i686 0.7.8-1.fc25                 libcom_err.i686 1.43.3-1.fc25            libdatrie.i686 0.2.9-3.fc25          
  libdrm.i686 2.4.74-1.fc25               libepoxy.i686 1.3.1-3.fc25              libffi.i686 3.1-9.fc24                      libgcc.i686 6.3.1-1.fc25                 libgcrypt.i686 1.6.6-1.fc25          
  libgpg-error.i686 1.24-1.fc25           libgusb.i686 0.2.9-1.fc25               libidn.i686 1.33-1.fc25                     libjpeg-turbo.i686 1.5.1-0.fc25          libmodman.i686 2.0.1-12.fc24         
  libmount.i686 2.28.2-1.fc25             libogg.i686 2:1.3.2-5.fc24              libpciaccess.i686 0.13.4-3.fc24             libpng.i686 2:1.6.27-1.fc25              libproxy.i686 0.4.14-1.fc25          
  libselinux.i686 2.5-13.fc25             libsepol.i686 2.5-10.fc25               libsndfile.i686 1.0.27-1.fc25               libsoup.i686 2.56.0-2.fc25               libstdc++.i686 6.3.1-1.fc25          
  libtasn1.i686 4.9-1.fc25                libtdb.i686 1.3.11-1.fc25               libthai.i686 0.1.25-1.fc25                  libtiff.i686 4.0.7-2.fc25                libtool-ltdl.i686 2.4.6-13.fc25      
  libunistring.i686 0.9.4-3.fc24          libusbx.i686 1.0.21-1.fc25              libuuid.i686 2.28.2-1.fc25                  libverto.i686 0.2.6-6.fc24               libvorbis.i686 1:1.3.5-1.fc25        
  libwayland-client.i686 1.12.0-1.fc25    libwayland-cursor.i686 1.12.0-1.fc25    libwayland-server.i686 1.12.0-1.fc25        libxcb.i686 1.12-1.fc25                  libxkbcommon.i686 0.6.1-1.fc25       
  libxml2.i686 2.9.3-4.fc25               libxshmfence.i686 1.2-3.fc24            lz4.i686 1.7.5-1.fc25                       mesa-libEGL.i686 13.0.3-5.fc25           mesa-libGL.i686 13.0.3-5.fc25        
  mesa-libgbm.i686 13.0.3-5.fc25          mesa-libglapi.i686 13.0.3-5.fc25        mesa-libwayland-egl.i686 13.0.3-5.fc25      nettle.i686 3.3-1.fc25                   openssl-libs.i686 1:1.0.2j-3.fc25    
  p11-kit.i686 0.23.2-2.fc24              pango.i686 1.40.3-1.fc25                pcre.i686 8.39-6.fc25                       pixman.i686 0.34.0-2.fc24                pulseaudio-libs.i686 9.0-1.fc25      
  rest.i686 0.8.0-1.fc25                  sqlite-libs.i686 3.14.2-1.fc25          systemd-libs.i686 231-10.fc25               tcp_wrappers-libs.i686 7.6-83.fc25       xz-libs.i686 5.2.2-2.fc24            
  zlib.i686 1.2.8-10.fc24                

Upgraded:
  audit.x86_64 2.7.1-1.fc25               audit-libs.x86_64 2.7.1-1.fc25          audit-libs-python.x86_64 2.7.1-1.fc25      audit-libs-python3.x86_64 2.7.1-1.fc25   cups.x86_64 1:2.2.0-5.fc25                
  cups-client.x86_64 1:2.2.0-5.fc25       cups-filesystem.noarch 1:2.2.0-5.fc25   cups-libs.x86_64 1:2.2.0-5.fc25            gdk-pixbuf2.x86_64 2.36.4-1.fc25         gdk-pixbuf2-modules.x86_64 2.36.4-1.fc25  
  gdk-pixbuf2-xlib.x86_64 2.36.4-1.fc25   gnutls.x86_64 3.5.8-1.fc25              gtk3.x86_64 3.22.7-1.fc25                  libX11.x86_64 1.6.4-4.fc25               libX11-common.noarch 1.6.4-4.fc25         
  libproxy.x86_64 0.4.14-1.fc25           libtiff.x86_64 4.0.7-2.fc25             mesa-libEGL.x86_64 13.0.3-5.fc25           mesa-libGL.x86_64 13.0.3-5.fc25          mesa-libGLES.x86_64 13.0.3-5.fc25         
  mesa-libgbm.x86_64 13.0.3-5.fc25        mesa-libglapi.x86_64 13.0.3-5.fc25      mesa-libwayland-egl.x86_64 13.0.3-5.fc25  

Complete!
(env) [root@square tmp]# ls -l 
total 151332
-rw-rw-r--. 1 andrewsm andrewsm 60118961 May 10  2013 AdbeRdr9.5.5-1_i486linux_enu.rpm
drwxrwxr-x. 2 andrewsm andrewsm     4096 Dec 11  2015 anaconda
-rw-rw-r--. 1 andrewsm andrewsm  3355664 Dec 11  2015 anaconda-23.19-1.1awb.src.rpm
-rw-rw-r--. 1 andrewsm andrewsm    96044 Dec 11  2015 baytrail-firmware-1.2-1awb.src.rpm
drwxrwxr-x. 2 andrewsm andrewsm    12288 Dec 11  2015 kernel
-rw-rw-r--. 1 andrewsm andrewsm 91358885 Dec 11  2015 kernel-4.2.0-0.rc6.git0.1.1awb.src.rpm
drwxrwxr-x. 3 andrewsm andrewsm     4096 Sep 18  2015 npm-16689-ph9kCgkW
(env) [root@square tmp]# 
(env) [root@square tmp]# dnf install AdbeRdr9.5.5-1_i486linux_enu.rpm
Last metadata expiration check: 0:39:54 ago on Tue Jan 31 20:52:15 2017.
Dependencies resolved.
======================================================================================================================================
 Package                                               Arch                                        Version                                              Repository                                         Size
======================================================================================================================================
Installing:
 AdobeReader_enu                                       i486                                        9.5.5-1                                              @commandline                                       57 M
 gdk-pixbuf2-xlib             i686      2.36.4-1.fc25                                        updates                                            49 k
 libXt i686               1.1.5-3.fc24                                         fedora                                            175 k
 mesa-libGLU                  i686      9.0.0-10.fc24                                        fedora                                            184 k
 pangox-compat                i686      0.0.2-7.fc24                                         fedora                                             61 k
 pangox-compat                                         x86_64                                      0.0.2-7.fc24                                         fedora                                             61 k

Transaction Summary
======================================================================================================================================
Install  6 Packages

Total size: 58 M
Total download size: 530 k
Installed size: 136 M
Is this ok [y/N]: y
Downloading Packages:
(1/5): mesa-libGLU-9.0.0-10.fc24.i686.rpm                                       4.1 MB/s | 184 kB     00:00    
(2/5): pangox-compat-0.0.2-7.fc24.i686.rpm                                      929 kB/s |  61 kB     00:00    
(3/5): pangox-compat-0.0.2-7.fc24.x86_64.rpm                                    1.7 MB/s |  61 kB     00:00    
(4/5): libXt-1.1.5-3.fc24.i686.rpm                                              1.8 MB/s | 175 kB     00:00    
(5/5): gdk-pixbuf2-xlib-2.36.4-1.fc25.i686.rpm                                   16 kB/s |  49 kB     00:03    
--------------------------------------------------------------------------------------------------------------------------------------
Total                            83 kB/s | 530 kB     00:06     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Installing  : gdk-pixbuf2-xlib-2.36.4-1.fc25.i686         1/6 
  Installing  : pangox-compat-0.0.2-7.fc24.i686             2/6 
  Installing  : mesa-libGLU-9.0.0-10.fc24.i686              3/6 
  Installing  : libXt-1.1.5-3.fc24.i686                     4/6 
  Installing  : AdobeReader_enu-9.5.5-1.i486                5/6 
  Installing  : pangox-compat-0.0.2-7.fc24.x86_64           6/6 
  Verifying   : AdobeReader_enu-9.5.5-1.i486                1/6 
  Verifying   : libXt-1.1.5-3.fc24.i686                     2/6 
  Verifying   : mesa-libGLU-9.0.0-10.fc24.i686              3/6 
  Verifying   : pangox-compat-0.0.2-7.fc24.i686             4/6 
  Verifying   : pangox-compat-0.0.2-7.fc24.x86_64           5/6 
  Verifying   : gdk-pixbuf2-xlib-2.36.4-1.fc25.i686         6/6 

Installed:
  AdobeReader_enu.i486 9.5.5-1    gdk-pixbuf2-xlib.i686 2.36.4-1.fc25    libXt.i686 1.1.5-3.fc24    mesa-libGLU.i686 9.0.0-10.fc24    pangox-compat.i686 0.0.2-7.fc24    pangox-compat.x86_64 0.0.2-7.fc24   
{% endhighlight %}


Complete!
