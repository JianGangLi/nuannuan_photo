import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import lazyPlugin from 'vue3-lazy'
import vPreviewImage from 'v-preview-image'

const app = createApp(App)
app.use(lazyPlugin, {
    loading: 'loading.svg',
    error: 'error.svg',

})
app.use(vPreviewImage, {
    enabledMaskClose: true, // 是否开启点击遮罩关闭(默认为true)
    enabledEscClose: true, // 是否开启esc按键关闭(默认为true)
    enabledMouseZoom: true, // 是否开启鼠标滚轮缩放(默认为true)
    activeColor: 'green', // 预览图中选中图片的背景颜色(默认为rgba(239, 84, 78, 0.7))
    previewStyle: { width: 'auto', height: 'auto', objectFit: 'cover' }, // 预览图样式
    showDownloadBtn: true // 显示下载按钮
})
app.mount('#app')