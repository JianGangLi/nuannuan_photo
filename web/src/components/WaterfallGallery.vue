<!-- WaterfallGallery.vue -->
<template>

    <div class="waterfall-container">
        <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="waterfall-column">
            <div v-for="(item, itemIndex) in column" :key="item.thumbnail" class="waterfall-item"
                @click="preview(item.original)">
                <img v-lazy="item.thumbnail" :alt="item.thumbnail" class="waterfall-image" />
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { preview } from 'v-preview-image'


interface ImgDataType {
    thumbnail: string;
    original: string;
}



const props = defineProps<{
    imgDataList: ImgDataType[];
    minColumnWidth?: number; // 每列的最小宽度
}>();

// 响应式状态
const columns = ref<ImgDataType[][]>([]);

const columnCount = ref(3); // 默认列数

// 计算列数
const calculateColumnCount = () => {
    const containerWidth = document.querySelector('.waterfall-container')?.clientWidth || 0;
    const minWidth = props.minColumnWidth || 300; // 默认最小列宽为300px
    const gap = 10; // 列间距
    const newColumnCount = Math.max(1, Math.floor((containerWidth + gap) / (minWidth + gap)));

    if (newColumnCount !== columnCount.value) {
        columnCount.value = newColumnCount;
        distributeImages();
    }
};

// 分配图片到列中
const distributeImages = () => {
    // 重置所有列
    columns.value = Array.from({ length: columnCount.value }, () => []);

    // 按顺序分配图片到每一列
    props.imgDataList.forEach((img, index) => {
        const columnIndex = index % columnCount.value;
        columns.value[columnIndex].push(img);
    });
};


// 处理窗口调整
const handleResize = () => {
    console.log("resize");
    calculateColumnCount();
};



// 监听图片数据变化
watch(() => props.imgDataList, () => {
    distributeImages();
}, { immediate: true });

// 组件挂载时初始化
onMounted(() => {

    calculateColumnCount();
    window.addEventListener('resize', handleResize);
});

// 组件卸载时清理
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.waterfall-container {
    display: flex;
    gap: 10px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
}

.waterfall-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.waterfall-item {
    break-inside: avoid;
    cursor: pointer;
    transition: transform 0.2s;
    width: 100%;
}

.waterfall-item:hover {
    transform: scale(1.02);
}

.waterfall-image {
    width: 100%;
    /* height: auto; */
    min-height: 300px;
    display: block;
    border-radius: 4px;

}
</style>