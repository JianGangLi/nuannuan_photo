import express from 'express';
import fs from 'fs/promises';  // 使用 promises API
import path from 'path';
import cors from 'cors'; // 引入 CORS 中间件
// 获取当前文件所在的目录
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

app.use(cors()); // 默认情况下，允许所有来源
// app.use(express.static('public')); // 托管静态文件

// 获取图片列表
app.get('/api/images', async (req, res) => {

    try {
        const files = await fs.readdir('./public/images'); // 使用 async/await 获取目录内容
        const images = files.filter(file => ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase()));
        // 对文件名进行排序，最近的排在前面
        images.sort((a, b) => {
            if (a < b) {
                return 1;
            } else if (a > b) {
                return -1;
            } else {
                return 0;
            }
        });
        res.json(images); // 返回文件名列表
    } catch (err) {
        res.status(500).json({ error: 'Unable to read directory' });
    }
});

const port = 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
