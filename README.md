## 运行docker 容器
``` bash
docker run -d -p 18081:8081 -p 13123:3000 \
  -v /mnt/sata2-1/nas_data/暖暖相册:/app/observer/public/images \
  -v /mnt/sata2-1/nas_data/暖暖相册:/app/server/public/images \
  -v /mnt/sata2-1/nas_data/暖暖相册:/app/web/dist/images \
  -v /mnt/sata2-1/nas_data/相册缩略图:/app/observer/public/thumbnails \
  -v /mnt/sata2-1/nas_data/相册缩略图:/app/server/public/thumbnails \
  -v /mnt/sata2-1/nas_data/相册缩略图:/app/web/dist/thumbnails \
  -e TZ=Asia/Shanghai \
  --name nuannuan_photo \
  --restart always \
  nuannuan_photo:latest
```

## 本地环境运行
``` bash
# prod
# 设置环境变量DomainName=域名:端口
# 也可以直接在/web/src/App.vue文件中修改域名
cd web && npm run build && cd .. && pm2 start ecosystem.config.js
```
## 测试环境运行
``` bash
# dev
pm2 start ecosystem.config.js && cd web && npm run dev
```
## 更新命令
```
sh ./run.sh
```

## 反向代理
反代的时候，正常的域名反代到vue到127.0.0.1:18081  

获取图片路径的时候，路径/api/images 要反代到127.0.0.1:13123

这边的端口是看你容器映射的宿主机端口，18081:8081 -p 13123:3000

> nginx 举例

``` nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:18081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /api/images {
        proxy_pass http://127.0.0.1:13123;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

```