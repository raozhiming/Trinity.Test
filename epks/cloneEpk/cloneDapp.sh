#!/bin/bash

clone_clount=0
# dapp_path=""

# usage() {
#     echo "cloneDapp.sh -c clone_clount -n dapp_path"
# }

# while getopts "c:n:" arg #选项后面的冒号表示该选项需要参数
# do
#     case $arg in
#         c)
#             echo "a's arg:$OPTARG" #参数存在$OPTARG中
#             clone_clount=$OPTARG
#             ;;
#         n)
#             echo "b's arg:$OPTARG"
#             dapp_path=$OPTARG
#             ;;
#         ?)  #当有不认识的选项的时候arg为?
#             echo "unkonw argument"
#             exit 1
#         ;;
#     esac
# done


if [ $# -ge 1 ] ; then
    clone_clount=$1
else
    usage()
    exit 1
fi

echo "clone clount:"$clone_clount

modifyManifest() {
    echo "manifest"
    dapp_name=$1
    echo $dapp_name
    sed -i '/"id"/c\  "id": "org.elastos.trinity.'$dapp_name'",' splashscreen/manifest.json
    # todo author:name
    sed -i '/"name": /c\  "name": "'$dapp_name'",' splashscreen/manifest.json
}

packageEpk() {
    echo "packageEpk"
    cd splashscreen
    zip -r $1.epk *
    cd ..
    mv splashscreen/$1.epk epk/
}

for (( i = 0; i < $clone_clount; i++ ));do
    modifyManifest "mytest"$i
    packageEpk "mytest"$i
done
