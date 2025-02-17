#!/bin/sh

# 1. 从 Git 仓库拉取最新代码
git pull || { echo "Git pull failed"; exit 1; }

# 2. 停止名为 nuannuan_photo 的容器（如果存在）
docker stop nuannuan_photo || echo "不存在nuannuan_photo这个容器"

# 3. 删除名为 nuannuan_photo 的容器（如果存在）
docker rm nuannuan_photo || echo "不存在nuannuan_photo这个容器"

# 4. 使用 Dockerfile 构建镜像，并命名为 nuannuan_photo
docker build -t nuannuan_photo . || { echo "Docker 镜像编译失败"; exit 1; }

# 5. 使用 docker-compose 启动服务
docker-compose up -d || { echo "Docker-compose up 启动失败"; exit 1; }

echo "运行完成!"