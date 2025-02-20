import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import terser from '@rollup/plugin-terser' /// 压缩代码 删除注释
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), terser({
        compress: {
            drop_console: true,
        },
    }),

    ],
    server: {
        host: "0.0.0.0",
        port: 8111,
    },
    base: './',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),

        }
    },

})
