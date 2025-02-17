<template>
    <div id="container-app">
        <WaterfallGallery :imgDataList="imgDataList" :minColumnWidth="500" />
    </div>
</template>

<script setup lang="ts">
import WaterfallGallery from './components/WaterfallGallery.vue';
import { ref, onMounted } from 'vue';

interface imgDataType {
    thumbnail: string;
    original: string;
}


const imgDataList = ref<imgDataType[]>([]);

onMounted(async () => {
    try {

        let url = 'http://localhost:3000/api/images';
        if (import.meta.env.MODE === 'production') {

            url = `/api/images`
        }

        const response = await fetch("/api/images");

        const data: string[] = await response.json();
        console.log("data==", data);
        imgDataList.value = data.map((v) => {
            return {
                thumbnail: `thumbnails/${v}`,
                original: `images/${v}`,
            };
        });
        console.log(imgDataList.value);
    } catch (error) {
        console.error('Error fetching images:', error);
    }

});
</script>

<style>
#container-app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    /* text-align: center; */
    padding: 10px;
    width: 100%;
}
</style>