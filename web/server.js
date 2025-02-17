import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// 将 import.meta.url 转换为 __dirname 的等效形式
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8081;

// 从 "dist" 目录提供静态文件
app.use(express.static(path.join(__dirname, 'dist')));

// 处理 SPA（单页应用）路由
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器正在运行，访问地址：http://localhost:${PORT}`);
});