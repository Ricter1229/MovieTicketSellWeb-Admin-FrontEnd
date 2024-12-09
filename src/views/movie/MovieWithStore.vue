<template>
    <div class="container d-flex">
        <!-- 影城选择 -->
        <div class="box-container">
            <div class="d-flex">
                <div style="flex-grow: 1;">
                    <select v-model="nowStore" @change="initializeDroppedItems">
                        <option v-for="store in stores" :key="store.id" :value="store">{{ store.name }}</option>
                    </select>
                </div>

                <!-- 存檔 清空按鈕 -->
                <div>
                    <button class="btn btn-outline-success">存檔</button>
                    <button @click="clearInput" class="btn btn-outline-secondary">清空</button>
                </div>
            </div>

            <!-- 拖放目标区域 -->
            <div class="content-container" @dragover.prevent @drop="handleDrop">
                <div v-for="(item, index) in droppedItems[nowStore.id]" :key="index" class="dropped-item card">
                    <img :src="item.mainPhoto" :alt="item.movie.chineseName" class="card-img-top" />
                    <p class="card-text">{{ item.movie.chineseName }}</p>
                </div>
            </div>
        </div>

        <!-- 可拖拽的电影卡片 -->
        <div class="movie-box-container">
            <div class="card" v-for="movieCard in movieCards" :key="movieCard.movie.id" draggable="true"
                @dragstart="handleDragStart(movieCard)">
                <img :src="movieCard.mainPhoto" class="card-img-top" :alt="movieCard.movie.chineseName" />
                <div class="card-body">
                    <p class="card-text">{{ movieCard.movie.chineseName }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/utils/axiosInstance';

// 数据声明
const stores = [
    { id: 1, name: 'taipei' },
    { id: 2, name: 'tai' },
    { id: 3, name: 'pei' },
];

const movieCards = ref([]); // 可选电影
const droppedItems = ref({}); // 拖放后的数据结构
const currentDraggedItem = ref(null); // 当前拖拽的电影
const nowStore = ref(stores[0]); // 当前选中的影城

// 初始化影城数据
const initializeDroppedItems = () => {
    if (!droppedItems.value[nowStore.value.id]) {
        droppedItems.value[nowStore.value.id] = [];
    }
};

// 拖拽开始处理
const handleDragStart = (movieCard) => {
    currentDraggedItem.value = movieCard;
};

// 拖拽放置处理
const handleDrop = () => {
    if (currentDraggedItem.value && nowStore.value) {
        // 获取当前影城的存储数组
        const storeItems = droppedItems.value[nowStore.value.id];
        
        // 检查当前拖拽的电影是否已存在
        const exists = storeItems.some((item) => item.movie.id == currentDraggedItem.value.movie.id);
        
        if (!exists) {
            // 添加电影到影城
            storeItems.push({ ...currentDraggedItem.value });
            droppedItems.value[nowStore.value] = storeItems; // 更新影城的存储数据
        }
        // 清空当前拖拽数据
        currentDraggedItem.value = null;
    }
    console.log('Dropped Items:', droppedItems.value);
};

// 清空為儲存進資料庫的電影排程資料
const clearInput = () => {
    // 检查当前影城是否存在
    if (!nowStore.value) {
        console.warn('No store selected. Cannot clear schedule.');
        return;
    }

    const storeKey = nowStore.value.id; // 当前影城ID

    // 检查 droppedItems 是否有对应的影城数据
    if (droppedItems.value[storeKey]) {
        // 清空当前影城的所有排程
        droppedItems.value[storeKey] = [];
        console.log(`Cleared schedule for Store: ${nowStore.value.name}`);
    } else {
        console.warn(`No schedule found for Store: ${nowStore.value.name}`);
    }
}

// 加载电影数据
const getMovieCards = async () => {
    const request = {
        start: 0,
        max: 4,
        dir: false,
        order: 'id',
        chineseName: '',
    };
    const response = await axiosInstance.post('/api/movie/find', request);
    movieCards.value = response.data.list;
};

// 页面初始化
onMounted(() => {
    getMovieCards();
    initializeDroppedItems();
});
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
}

.box-container {
    margin: 20px;
    flex: 1;
    border: 1px solid black;
    border-radius: 15px;
    padding: 10px;
}

.content-container {
    height: 600px;
    border: 1px solid black;
    border-radius: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
}

.content-container img {
    height: 300px;
}

.movie-box-container {
    width: 300px;
    padding: 10px;
    border: 1px solid red;
    border-radius: 15px;
}

.card {
    margin-bottom: 15px;
}

.card-img-top {
    height: 150px;
    object-fit: cover;
    margin-bottom: 10px;
}

.dropped-item {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    background-color: #f9f9f9;
    height: 360px;
}
</style>