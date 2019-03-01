#!/bin/bash

if [ $# -ge 1 ] ; then
    pattern=$1
else
    pattern="*.epk"
fi


epkArray=`adb shell ls /storage/emulated/0/${pattern}`

for data in ${epkArray[@]}
do
    epkPath="file://"${data}
    echo $epkPath
    adb shell am start -a android.intent.action.VIEW -d $epkPath -t *.epk

    sleep 5
done
