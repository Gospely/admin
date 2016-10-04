#! /bin/bash/
# 为编辑admin文件而做的前期准备工作
# 打开新终端并打开数据库的表
gnome-terminal -t "goepel" -x bash -c "source ./gospel.sh;exec nash;"
# 打开网页效果
firefox localhost:8087
