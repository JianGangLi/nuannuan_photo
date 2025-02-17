import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * 缩放图片并保存到新位置
 * @param {string} inputPath - 输入图片路径
 * @param {string} outputPath - 输出图片路径
 * @param {number} scale - 缩放比例 (0-1)
 * @returns {Promise<{success: boolean, originalSize: string, newSize: string}>}
 */
export const resizeImage = async (inputPath, outputPath, scale = 0.2) => {
    try {
        // 获取图片信息
        const metadata = await sharp(inputPath).metadata();

        // 计算新尺寸
        const newWidth = Math.round(metadata.width * scale);
        const newHeight = Math.round(metadata.height * scale);

        // 确保输出目录存在
        await fs.mkdir(path.dirname(outputPath), { recursive: true });

        // 处理图片
        await sharp(inputPath)
            .resize(newWidth, newHeight)
            .toFile(outputPath);

        return {
            success: true,
            originalSize: `${metadata.width}x${metadata.height}`,
            newSize: `${newWidth}x${newHeight}`,
            file: path.basename(inputPath)
        };

    } catch (error) {
        console.error(`图片处理失败: ${error.message}`);
        return {
            success: false,
            error: error.message,
            file: path.basename(inputPath)
        };
    }
};

