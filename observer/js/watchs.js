import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs'
import { resizeImage } from './generateThumbnail.js';
// 定义要监控的图片文件扩展名
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

export class ImageWatcher {
    constructor(watchPath) {
        this.watchPath = watchPath;
        this.thumbnailsPath = watchPath.replace(/images/g, "thumbnails")
        this.watcher = null;
    }

    start() {
        // 检查文件夹是否存在
        if (!fs.existsSync(this.watchPath)) {
            // 如果文件夹不存在，则创建它
            fs.mkdirSync(this.watchPath, { recursive: true });
            console.log('文件夹已创建');
        } else {
            console.log('文件夹已存在');
        }
        if (!fs.existsSync(this.thumbnailsPath)) {
            // 如果文件夹不存在，则创建它
            fs.mkdirSync(this.thumbnailsPath, { recursive: true });
            console.log('文件夹已创建');
        } else {
            console.log('文件夹已存在');
        }
        // 创建 watcher 实例
        this.watcher = chokidar.watch(this.watchPath, {
            persistent: true, // 保持程序运行
            ignoreInitial: false, // false 表示启动时会触发 add 事件
            ignored: /(^|[\/\\])\../, // 忽略隐藏文件
            usePolling: true,  // 启用轮询
            interval: 1000,    // 每秒检查一次文件变化
        });

        // 只监控图片文件
        this.watcher.on('all', (event, filePath) => {
            const ext = path.extname(filePath).toLowerCase();
            if (!IMAGE_EXTENSIONS.includes(ext)) return;
            const thumbnailsImg = `${this.thumbnailsPath}/${path.basename(filePath)}`
            console.log("thumbnailsImg", thumbnailsImg);
            switch (event) {
                case 'add':
                    // 新增图片 生成缩略图
                    resizeImage(filePath, thumbnailsImg);
                    break;
                case 'unlink':
                    // console.log(`删除图片: ${filePath}`);
                    // 删除图片，删除缩略图
                    fs.rm(thumbnailsImg, { force: true }, (err) => {
                        if (err) {
                            console.error('不存在这个缩略图文件:', thumbnailsImg);
                        } else {
                            console.log(`${thumbnailsImg}随着原图删除，缩略图删除成功`);
                        }
                    });
                case 'change':
                    resizeImage(filePath, thumbnailsImg);
                    // console.log(`修改图片: ${filePath}`);
                    break;
            }
        });

        // 错误处理
        this.watcher.on('error', error => {
            console.error('监控出错:', error);
        });

        // 监控就绪
        this.watcher.on('ready', () => {
            console.log('开始监控图片文件...');
        });

        // 保持程序运行
        process.on('SIGINT', () => {
            this.stop().then(() => {
                console.log('停止监控');
                process.exit(0);
            });
        });
    }

    async stop() {
        if (this.watcher) {
            await this.watcher.close();
        }
    }
}

