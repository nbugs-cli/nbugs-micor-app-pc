#! /bin/bash

# 获取版本号
VERSION=`cat -n ./package.json | tail -n +3 | head -n 1 | awk -F '"' '{print $4}'`;
FILE="$VERSION.tar.gz";
ENV=$1

# 删除本地所有压缩文件
if [ -f *.tar.gz ];then
  echo 'remove gz';
  rm -rf *.tar.gz;
fi

# 打包压缩文件
tar -zcvf $FILE dist;
echo 'dist gzip success';

# 判断压缩包是否存在
if [ -f $FILE ];then
  echo 'dist is exit';
  nbugs-ship-cdn $FILE --base '' --env $ENV;
  rm -rf *.tar.gz;
else
  echo 'dist is not exit';
  exit
fi
