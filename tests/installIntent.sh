#!/bin/bash


if [ $# -ge 1 ] ; then
    adb shell am start -a android.intent.action.VIEW -d file:///storage/emulated/0/$1 -t *.epk
else
    echo "installIntent.sh xxx.epk"
fi


