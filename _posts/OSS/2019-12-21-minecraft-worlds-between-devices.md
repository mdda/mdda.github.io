---
date: 2019-12-21
title:  "Minecraft : Moving Worlds"
tagline: Notes
category: OSS
tags:
- Hyperparameters
layout: post
published: false
---
{% include JB/setup %}

# Main Storage - Android - data - com.mojang.minecraftpe - files

ls -l /sdcard/Android/data/com.mojang.minecraftpe/files/
# All the rar files
#-rw-rw---- u0_a85   sdcard_rw 13828449 2019-12-19 12:38 -34jAEKTCAA=.rar
#-rw-rw---- u0_a85   sdcard_rw 15686725 2019-12-19 12:38 HvfDXFqZAAA=.rar
#-rw-rw---- u0_a85   sdcard_rw  1677566 2019-12-19 12:38 clbjXYOfAAA=.rar

# After unraring using 'Unzip Rar' from ???
ls -l /sdcard/Android/data/com.mojang.minecraftpe/files/     
drwxrwx--x u0_a85   sdcard_rw          2019-12-21 05:21 +34jAEKTCAA=
drwxrwx--x u0_a85   sdcard_rw          2019-12-21 05:21 HvfDXFqZAAA=
drwxrwx--x u0_a85   sdcard_rw          2019-12-21 05:21 clbjXYOfAAA=

# NO NEED 
# su
# cd  /data/data/com.mojang.minecraftpe/games/com.mojang/minecraftWorlds
# ls -l 
# # drwx------ u0_a85   u0_a85            2019-12-19 13:17 ygf7XcCoAQA=
# cat ygf7XcCoAQA\=/levelname.txt
# more */levelname.txt
# 
# cp -R '/sdcard/Android/data/com.mojang.minecraftpe/files/HvfDXFqZAAA=' . 
# chown -R u0_a85:u0_a85 'HvfDXFqZAAA='
# chmod -R g-rwx 'HvfDXFqZAAA='
# chmod -R a-rwx 'HvfDXFqZAAA='
# chmod -R u+rwx 'HvfDXFqZAAA='

Apparently, it checks for USB debugging mode currently being used.
(Cable still inserted is Ok, but mode needs to be off)

# mddaMain!
adb pull /sdcard/Android/data/com.mojang.minecraftpe/files/-34jAEKTCAA=.rar

# OurCreative
adb pull /sdcard/Android/data/com.mojang.minecraftpe/files/HvfDXFqZAAA=.rar

# Survival 3000 : 
adb pull /sdcard/Android/data/com.mojang.minecraftpe/files/clbjXYOfAAA=.rar



# On DooGee N10  (Y7??)
adb shell
# No su
cd /sdcard/Android/data/com.mojang.minecraftpe/files/

adb push clbjXYOfAAA= /sdcard/Android/data/com.mojang.minecraftpe/files/

# https://gaming.stackexchange.com/questions/345171/how-do-you-save-a-new-map-you-downloaded-on-to-your-android-on-minecraft
#   suggests : /storage/emulated/0/games/com.mojang/minecraftWorlds/

adb push clbjXYOfAAA= /storage/emulated/0/games/com.mojang/minecraftWorlds/

# Goto Settings - Profile - FileStorageLocation --> External
# Restart MineCraft (it picks up world directories on startup)
# Look on Play page!


adb push clbjXYOfAAA= /storage/emulated/0/games/com.mojang/minecraftWorlds/
adb push HvfDXFqZAAA= /storage/emulated/0/games/com.mojang/minecraftWorlds/
adb push '+34jAEKTCAA=' /storage/emulated/0/games/com.mojang/minecraftWorlds/

# From Onda in /data/data/com.mojang.minecraftpe/games/com.mojang/minecraftWorlds 
10800	./Ho3+XQ+nAAA=  # Spooky Mansion
3976	./ygf7XcCoAQA=  # Muchan survival

# Moved to /storage/emulated/0/games/com.mojang/minecraftWorlds/
#10800	./Ho3+XQ+nAAA=  # Spooky Mansion
adb pull /storage/emulated/0/games/com.mojang/minecraftWorlds/Ho3+XQ+nAAA= .
#3976	./ygf7XcCoAQA=  # Muchan survival
adb pull /storage/emulated/0/games/com.mojang/minecraftWorlds/ygf7XcCoAQA= .

adb push Ho3+XQ+nAAA= /storage/emulated/0/games/com.mojang/minecraftWorlds/ 
adb push ygf7XcCoAQA= /storage/emulated/0/games/com.mojang/minecraftWorlds/


#OLD# On Samsung Tab A7 (2020) : 
#OLD#   /sdcard/games/com.mojang/minecraftWorlds/    

# On Samsung Tab A7 (2020) : 
#   /sdcard/Android/data/com.mojang.minecraftpe/files/games/com.mojang/minecraftWorlds/
# On square:
#   /home/andrewsm/Downloads/Minecraft/2023-04-11_Tab9-2020/

drwxrwx--x 3 u0_a200 sdcard_rw 3488 2023-04-06 20:35 2YNsXh+VAAA=
drwxrwx--x 3 u0_a200 sdcard_rw 3488 2023-03-25 10:09 QZAEXkp2AwA=
drwxrwx--x 3 u0_a200 sdcard_rw 3488 2022-11-06 17:29 LKgQXr07AQA=

drwxrwx--x 3 u0_a200 sdcard_rw 3488 2022-09-04 18:29 ygf7XcCoAQA=
drwxrwx--x 5 u0_a200 sdcard_rw 3488 2022-09-04 17:52 hCXqYkpOAQA=
drwxrwx--x 5 u0_a200 sdcard_rw 3488 2022-08-03 15:15 bcTSYjWXNgA=
drwxrwx--x 3 u0_a200 sdcard_rw 3488 2022-03-19 16:35 LQ6rYaJ3AgA=
drwxrwx--x 3 u0_a200 sdcard_rw 3488 2021-12-27 16:49 DX7JYcH2AgA=
drwxrwx--x 3 u0_a200 sdcard_rw 3488 2021-12-05 18:03 aI6sYRcmFwA=
drwxrwx--x 3 u0_a200 sdcard_rw 3488 2021-12-05 17:43 wYmsYQz2BAA=
drwxrwx--x 3 u0_a200 sdcard_rw 3488 2021-12-04 14:40 8YQJX69OmAA=
drwxrwx--x 3 u0_a200 sdcard_rw 3488 2021-12-04 14:40 iI5sXiBTKgA=
drwxrwx--x 3 u0_a200 sdcard_rw 3488 2021-12-04 14:40 0jgSXipLGwA=
drwxrwx--x 3 u0_a200 sdcard_rw 3488 2021-12-04 14:40 Ho3+XQ+nAAA=

adb pull /sdcard/Android/data/com.mojang.minecraftpe/files/games/com.mojang/minecraftWorlds .

# From Onda in /data/data/com.mojang.minecraftpe/games/com.mojang/minecraftWorlds 
drwxrwx--x root     sdcard_rw          2020-01-02 11:47 +34jAEKTCAA=  # mddaMain!
drwxrwx--x root     sdcard_rw          2019-12-27 00:46 HvfDXFqZAAA=  # OurCreative
drwxrwx--x root     sdcard_rw          2019-12-22 06:27 clbjXYOfAAA=  # Survival3000
 
adb pull '/storage/emulated/0/games/com.mojang/minecraftWorlds/+34jAEKTCAA='
adb pull '/storage/emulated/0/games/com.mojang/minecraftWorlds/HvfDXFqZAAA='
adb pull '/storage/emulated/0/games/com.mojang/minecraftWorlds/clbjXYOfAAA='
 
scp -r -P 2222 clbjXYOfAAA\= user@192.168.1.19:/storage/emulated/0/games/com.mojang/minecraftWorlds/
scp -r -P 2222 \+34jAEKTCAA\=/ user@192.168.1.19:/storage/emulated/0/games/com.mojang/minecraftWorlds/
scp -r -P 2222 HvfDXFqZAAA\=/ user@192.168.1.19:/storage/emulated/0/games/com.mojang/minecraftWorlds/

