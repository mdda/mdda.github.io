---
date: 2019-02-11
title: Importing into Blender
category: OSS
tags:
- fedora
- linux
- video
- blender
layout: post
published: false
---
{% include JB/setup %}


For _whatever_ reason, I want to get some animated characters into Blender.  Here are 
the results during my random walk through Google/Internet on the topic.


### Free 3D models

*  https://renderpeople.com/free-3d-people/ref/3/


### Free ```blender``` models

*  [Rigged young dragon](https://www.blendswap.com/blends/view/697)
*  [Rigged man head](https://www.blendswap.com/blends/view/92838)


### Import ```unitypackage``` 

*   [Asset Store example](https://assetstore.unity.com/packages/3d/characters/humanoids/emika-127213)

Even though a ```.unitypackage``` unpacks using ```tar -xzf...```, there's
more detailed packaging information inside.  Fortunately, there's a repo that deals
with this, to give us clean Assets and FBXs :

{% highlight bash %}
git clone https://github.com/gered/extractunitypackage
python extractunitypackage/extractunitypackage.py Emika.unitypackage

ls -l Emika/Assets/Suriyun/
#total 400
#drwxrwxr-x. 5 andrewsm andrewsm   4096 Feb 10 15:47 Animations
#drwxrwxr-x. 6 andrewsm andrewsm   4096 Feb 10 15:47 Emika
#-rw-r--r--. 1 andrewsm andrewsm 376553 Sep 14 00:19 Emika.unity
# ...
{% endhighlight %}

That being said, still doesn't seem to be a seamless process (scaling and bone issue immediately apparent for model when imported into ```blender```).



###  [MikuMikuDance](https://en.wikipedia.org/wiki/MikuMikuDance) as a starting point

Maybe possible to run under ```Wine``` ...

*   [MikuMikeDance Tutorial](https://sites.google.com/view/evpvp/)



###  MikuMikuDance - import without Windows installation of MMD

Current 'active' branch of Blender import code : 
*   https://github.com/powroupi/blender_mmd_tools   # Branch : dev_test !
*   https://github.com/powroupi/blender_mmd_tools/wiki/Documentation

And updater script to make the models more 'blendery' :
*   https://gist.github.com/powroupi/e78b71c2931a831bc9b895dca0d8ee7b


*   [Open MMD/PMX in Blender (Miku Miku Dance 3D Model Format Import Plug-In Tutorial)](https://www.youtube.com/watch?v=v-JfPYz5Nvo)

*   Helpful instructions (when subtitled) : [Importar modelos y animaciones MMD en Blender](https://www.youtube.com/watch?v=vfvTNDNBI3I)

*   https://www.deviantart.com/crazy4anime09/art/MMD-to-Blender-2-79-Tutorial-718326270


Also a promising export from Blender (running on a Mac) to UnReal : 

*   [MMD Unreal Engine - Cloth Physics / Toon Shader Test](https://www.youtube.com/watch?v=fbbuS7TqiX0)
*   [Same author - no camera moves, no flex either](https://www.youtube.com/watch?v=TLHObOy2u84)
*   [Same author - no camera moves, has flex, and ground](https://www.youtube.com/watch?v=N1VGdqgnIO8)

Try with : [YYB式初音ミクver1.02](https://bowlroll.net/file/52777)
Or (seems like a credit-only license) : [Through DeviantArt](https://www.deviantart.com/aprinceofvoid/art/Idolm-ster-White-Dress-Miku-DL-684333728)

And links from [mmd-downloads-galore](https://www.deviantart.com/mmd-downloads-galore) : 

*   [Mr Mr on DeviantArt](https://www.deviantart.com/spardatwins/art/MMD-Mr-Mr-Girls-Generation-Motion-Data-DL-717916719) : [Download](https://www.mediafire.com/file/ww4162sw2dq1jvc/MrMr+Motion%28by+Iven+Padilla%29.zip)
*   [Viva Happy on DeviantArt](https://www.deviantart.com/shiro-nekovocaloid/art/MMD-Viva-Happy-Miku-Hatsune-Download-602407942) : [DL with pass](https://bowlroll.net/file/27406)
*   [Love! Snow! Real Magic!](https://bowlroll.net/file/30993)
*   [Inspiration](https://www.deviantart.com/ureshiiiiii/art/MMD-Motion-DL-Inspiration-694820131) : [YouTube](https://www.youtube.com/watch?v=t_SOAyQbtIc)

*   [Clothes](https://www.deviantart.com/mmd-downloads-galore/gallery/39472355/Clothes)

Or YouTube search for "MMD Motion DL".

*   [Follow the Leader](https://www.youtube.com/watch?v=5_4TKRgEr9U) - by [Natsumi San](https://www.deviantart.com/natsumisempai)
    +    [Motion](https://bowlroll.net/file/112837)
    +    [Cats Ears](https://www.deviantart.com/o-dsv-o/art/MMD-Cat-Ears-DL-591912752)  (non-commercial, though)

*   [Human Poses to MMD motions](https://github.com/peterljq/OpenMMD)
    +    CS Undergraduate @ NTU Singapore. Statistical Learning Enthusiast : https://peterljq.github.io

*   [Large Miku model](https://www.deviantart.com/digitrevx/art/Hatsune-Miku-V4X-Model-Digitrevx-Release-646928464) - credit to Digitrevx

DeviantArt [commissioned 'trace'](https://www.deviantart.com/natsumisempai/art/MMD-Commission-WiggleWiggle-Motion-Trace-785202018) :

*  [Original Song](https://www.youtube.com/watch?v=SkRSXFQerZs)
*  [Source dancer](https://www.youtube.com/watch?v=pepBDkHsx5M)
*  [MMD version](https://www.youtube.com/watch?v=BWW6cTXj9J4)
*  Model DL = [South Dakota](https://bowlroll.net/file/188411) - 



{% highlight bash %}

{% endhighlight %}


