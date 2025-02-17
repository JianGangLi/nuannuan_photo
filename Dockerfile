# 使用 Node.js 20.18 作为基础镜像
FROM node:20.18

RUN npm config set registry https://registry.npmmirror.com/
# 设置工作目录为 /app
WORKDIR /app

# 安装 pnpm 和 pm2
RUN npm install -g pnpm pm2

RUN pnpm config set registry https://registry.npmmirror.com/
# 拷贝当前目录下的 observer、server 和 web 目录到工作目录中
COPY . /app
RUN rm -rf /app/web/public/thumbnails
RUN rm -rf /app/web/public/images
RUN rm -rf /app/observer/public/thumbnails
RUN rm -rf /app/observer/public/images
RUN rm -rf /app/server/public/thumbnails
RUN rm -rf /app/server/public/images

# 分别进入 observer、server 和 web 目录安装依赖
WORKDIR /app/observer
RUN pnpm install --frozen-lockfile

WORKDIR /app/server
RUN pnpm install --frozen-lockfile


WORKDIR /app/web
RUN pnpm install --frozen-lockfile
RUN pnpm run build

WORKDIR /app
# 暴露 8081 端口
EXPOSE 8081 3000

# 启动命令，使用 pm2 启动应用
CMD ["pm2", "start", "ecosystem.config.js", "--no-daemon"]
