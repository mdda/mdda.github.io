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

