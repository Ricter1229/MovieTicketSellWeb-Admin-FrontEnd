<template>
    <div class="container d-flex">
        <!-- 影城选择只加了card -->
        <div class="card card-left">
            <div class="card-header">
                <div class="box-container">
                    <div class="d-flex">
                        <div>

                            <div class="form-floating cinema">
                                <select class="form-select" id="floatingSelect" aria-label="Floating label select example"  v-model="nowStore" @change="initializeDroppedItems">
                                    <option v-for="store in stores" :key="store.id" :value="store">{{ store.name }}</option>
                                </select>
                                <label for="floatingSelect">影城</label>
                            </div>

                            <!-- <select v-model="nowStore" @change="initializeDroppedItems">
                                <option v-for="store in stores" :key="store.id" :value="store">{{ store.name }}</option>
                            </select> -->
                        </div>
                        <div>
                            <!--  -->
                            <div class="form-floating version">
                                <select class="form-select" id="floatingSelect" aria-label="Floating label select example" v-model="nowVersionId" @change="initializeDroppedItems" >
                                    <option v-for="versionId in (droppedItems[nowStore?.storeId] ? Object.keys(droppedItems[nowStore?.storeId]).sort((a, b) => Number(a) - Number(b)) : [])"
                                    :value="versionId">{{ versions.find(version => version.id == versionId)?.version || 'Unknown' }}</option>
                                </select>
                                <label for="floatingSelect">電影版本</label>
                            </div>
                            <!--  -->
                            <!-- <select v-model="nowVersionId" @change="initializeDroppedItems">
                                <option
                                    v-for="versionId in (droppedItems[nowStore?.storeId] ? Object.keys(droppedItems[nowStore?.storeId]).sort((a, b) => Number(a) - Number(b)) : [])"
                                    :value="versionId">
                                    {{ versions.find(version => version.id == versionId)?.version || 'Unknown' }}
                                </option>
                            </select> -->
                        </div>
                        <div class="btns">
                            <button class="btn btn-outline-success" @click="saveSchedule">存檔</button>
                            <button @click="clearInput" class="btn btn-outline-secondary">清空</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <!-- 拖放目标区域 -->
                <div class="content-container" @dragover.prevent @drop="handleDrop">
                    <div v-for="(item, index) in droppedItems[nowStore?.storeId]?.[nowVersionId]" :key="index"
                        class="dropped-item card">
                        <img :src="item.mainPhoto" :alt="item.movie.chineseName" class="card-img-top" />
                        <p class="card-text">{{ item.movie.chineseName }}</p>
                    </div>
                </div>
            </div>
        
         </div>
         <!-- <div class="card card-left">
            <div class="card-header">
                <div class="box-container">
                    <div class="d-flex">
                        <div style="flex-grow: 1;">
                            <select v-model="nowStore" @change="initializeDroppedItems">
                                <option v-for="store in stores" :key="store.id" :value="store">{{ store.name }}</option>
                            </select>
                        </div>
                        <div style="flex-grow: 1;">
                            <select v-model="nowVersionId" @change="initializeDroppedItems">
                                <option
                                    v-for="versionId in (droppedItems[nowStore?.storeId] ? Object.keys(droppedItems[nowStore?.storeId]).sort((a, b) => Number(a) - Number(b)) : [])"
                                    :value="versionId">
                                    {{ versions.find(version => version.id == versionId)?.version || 'Unknown' }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <button class="btn btn-outline-success" @click="saveSchedule">存檔</button>
                            <button @click="clearInput" class="btn btn-outline-secondary">清空</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <!-- 拖放目标区域 -->
                <!-- <div class="content-container" @dragover.prevent @drop="handleDrop">
                    <div v-for="(item, index) in droppedItems[nowStore?.storeId]?.[nowVersionId]" :key="index"
                        class="dropped-item card">
                        <img :src="item.mainPhoto" :alt="item.movie.chineseName" class="card-img-top" />
                        <p class="card-text">{{ item.movie.chineseName }}</p>
                    </div>
                </div>
            </div>
        
         </div> -->
    
    <hr>
    <div class="card card-right text-bg-secondary mb-3">
        <div class="card-header">
            <div>
                <div class="d-flex align-items-center justify-content-between">
                    <button @click="loadPreviousVersion" class="btn btn-sm btn-secondary">&lt;</button>
                    <!--  -->
                    <div class="form-floating">
                        <select class="form-select version-right" id="floatingSelect" aria-label="Floating label select example" v-model="selectedVersionId" @change="fetchMovies">
                            <option v-for="version in versions" :key="version.id" :value="version.id"> {{ version.version }}</option>
                        </select>
                        <label for="floatingSelect">電影版本</label>
                    </div>
                    <!--  -->
                    <!-- <select v-model="selectedVersionId" @change="fetchMovies">
                        <option v-for="version in versions" :key="version.id" :value="version.id">
                            {{ version.version }}
                        </option>
                    </select> -->
                    <button @click="loadNextVersion" class="btn btn-sm btn-secondary">&gt;</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div v-for="movieCard in movieCards" :key="movieCard.id" draggable="true"
                @dragstart="handleDragStart(movieCard)">
                <div v-if="!isMovieInDroppedItems(movieCard)" class="card">
                    <img :src="movieCard.mainPhoto" class="card-img-top" :alt="movieCard.movie.chineseName" />
                    <div class="card-body">
                        <p class="card-text">{{ movieCard.movie.chineseName }}</p>
                    </div>
                </div>
            </div>
            <div v-if="totalPages > 1">
                <button @click="loadPreviousPage" class="btn btn-sm btn-secondary">&lt;</button>
                <button @click="loadNextPage" class="btn btn-sm btn-secondary">&gt;</button>
            </div>
        </div>
    </div>
        <!-- 可拖拽的电影卡片 -->
        <!-- <div class="movie-box-container">
            <div>
                <div class="d-flex align-items-center justify-content-between">
                    <button @click="loadPreviousVersion" class="btn btn-sm btn-secondary">&lt;</button>
                    <select v-model="selectedVersionId" @change="fetchMovies">
                        <option v-for="version in versions" :key="version.id" :value="version.id">
                            {{ version.version }}
                        </option>
                    </select>
                    <button @click="loadNextVersion" class="btn btn-sm btn-secondary">&gt;</button>
                </div>
            </div>
            <div v-for="movieCard in movieCards" :key="movieCard.id" draggable="true"
                @dragstart="handleDragStart(movieCard)">
                <div v-if="!isMovieInDroppedItems(movieCard)" class="card">
                    <img :src="movieCard.mainPhoto" class="card-img-top" :alt="movieCard.movie.chineseName" />
                    <div class="card-body">
                        <p class="card-text">{{ movieCard.movie.chineseName }}</p>
                    </div>
                </div>
            </div>
            <div v-if="totalPages > 1">
                <button @click="loadPreviousPage" class="btn btn-sm btn-secondary">&lt;</button>
                <button @click="loadNextPage" class="btn btn-sm btn-secondary">&gt;</button>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import axiosInstance from '@/utils/axiosInstance';
import Swal from 'sweetalert2';

// 数据声明
const stores = ref([]);
const movieCards = ref([]); // 可选电影
const droppedItems = ref({}); // 拖放后的数据结构
const currentDraggedItem = ref(null); // 当前拖拽的电影
const nowStore = ref(null); // 当前选中的影城
const versions = ref([]); // 版本数据
const selectedVersionId = ref(null); // 当前选中的版本
const nowVersionId = ref(0)
const page = ref(0); // 当前页码
const size = ref(5); // 每页大小
const totalPages = ref(null)

const getStore = async () => {
    const request = {}
    const response = await axiosInstance.post('/store/find',request)
    stores.value = response.data.list
    nowStore.value = stores.value[0]    
    loadByDB()
}

// 获取至少有一个电影的版本
const getVersionAleastOneMovie = async () => {
    const response = await axiosInstance.get('/api/version/aleast-one-movie');
    versions.value = response.data.data;
    selectedVersionId.value = versions.value[0]?.id;
    if (versions.value.length > 0) {
        nowVersionId.value = versions.value[0].id; // 默认选择第一个版本
    }
};

// 初始化影城数据
const initializeDroppedItems = () => {
    const storeId = nowStore.value?.storeId;
    const versionId = selectedVersionId.value || nowStore.value;

    // 初始化影城层
    if (!droppedItems.value[storeId]) {
        droppedItems.value[storeId] = {};
    }

    // 初始化版本层
    if (!droppedItems.value[storeId][versionId]) {
        droppedItems.value[storeId][versionId] = [];
    }
};

// 获取电影数据
const fetchMovies = async () => {
    const request = {
        versionId: selectedVersionId.value,
        page: page.value,
        size: size.value,
    };
    try {
        const response = await axiosInstance.post('/api/movie-version/', request);

        const movies = response.data.data.movies.map((movie) => ({
            ...movie,
            versionId: selectedVersionId.value,
            mainPhoto: movie.movie.mimeType + movie.movie.photo,
        }));
        movieCards.value = movies;
        nowVersionId.value = selectedVersionId.value
        totalPages.value = response.data.data.totalPages
        console.log(movieCards.value);

    } catch (error) {
        console.error('Failed to fetch movies:', error);
    }

};


// 判断电影是否已经被拖放
const isMovieInDroppedItems = (movieCard) => {
    const storeId = nowStore.value.storeId;
    const versionId = selectedVersionId.value;
    const versionItems = droppedItems.value[storeId]?.[versionId] || [];
    return versionItems.some(item => item.movie.movieId == movieCard.movie.movieId);
};

// 拖拽开始处理
const handleDragStart = (movieCard) => {
    currentDraggedItem.value = movieCard;
};

// 拖拽放置处理
const handleDrop = () => {
    if (currentDraggedItem.value && nowStore.value && selectedVersionId.value) {
        const storeId = nowStore.value.storeId;
        const versionId = selectedVersionId.value;

        // 初始化影城和版本数据
        initializeDroppedItems();

        // 获取当前影城和版本的存储数组
        const versionItems = droppedItems.value[storeId][versionId];

        // 检查当前拖拽的电影是否已存在
        const exists = versionItems.some((item) => item.movie.movieId == currentDraggedItem.value.movie.movieId);

        if (!exists) {
            // 添加电影到影城和版本
            droppedItems.value = {
                ...droppedItems.value, // 保留其他数据
                [storeId]: {
                    ...droppedItems.value[storeId], // 保留其他版本
                    [versionId]: [...versionItems, { ...currentDraggedItem.value }], // 添加新数据
                },
            };
        }

        // 清空当前拖拽数据
        currentDraggedItem.value = null;
    }
};

// 清空未保存进数据库的电影排程数据
const clearInput = () => {
    if (nowStore.value && selectedVersionId.value) {
        const storeId = nowStore.value.storeId;
        const versionId = selectedVersionId.value;

        // 检查是否存在对应的影城和版本数据
        if (droppedItems.value[storeId] && droppedItems.value[storeId][versionId]) {
            droppedItems.value[storeId][versionId] = [];
        } else {
            console.warn(`No schedule found for Store: ${nowStore.value.name}, Version: ${selectedVersionId.value}`);
        }
    }
};

// 保存影城排程
const saveSchedule = async () => {
    const storeId = nowStore.value.storeId;
    const versionId = selectedVersionId.value;

    // console.log(droppedItems.value[storeId][versionId][0].movieVersionId);
    const packagedData = []
    packagedData.push({ storeId, movieVersionIds: [] })

    for (let i = 1; i <= versions.value.length; i++) {
        if (droppedItems.value[storeId]?.[i]?.length != 0) {
            for (let j = 0; j < droppedItems.value[storeId][i]?.length; j++) {
                packagedData[0].movieVersionIds.push(droppedItems.value[storeId][i][j].movieVersionId);
            }
        }
    }

    const request = {
        storeReleaseMovie: packagedData
    }
    console.log(request);

    try {
        await axiosInstance.post("/api/store-release-movie/", request)
        Swal.fire("sucess")
    } catch (error) {
        Swal.fire("error")
    }
};

const loadByDB = async () => {
    const storeId = nowStore.value?.storeId
    const request = {
        storeId: storeId
    }
    const response = await axiosInstance.post("/api/store-release-movie/all", request)
    console.log(request);

    const tempMovie = response.data.data
    for (let i = 0; i < tempMovie?.length; i++) {
        const versionId = tempMovie[i]?.versionId;

        // 初始化 droppedItems.value[storeId] 和其子层级
        if (!droppedItems.value[storeId]) {
            droppedItems.value[storeId] = {};
        }

        if (!droppedItems.value[storeId][versionId]) {
            droppedItems.value[storeId][versionId] = [];
        }

        // 添加电影信息到 droppedItems
        droppedItems.value[storeId][versionId].push({
            movieVersionId: tempMovie[i].movieVersionId,
            mainPhoto: tempMovie[i].movie.mimeType + tempMovie[i].movie.photo,
            versionId: versionId,
            movie: {
                chineseName: tempMovie[i].movie.chineseName,
                mimeType: tempMovie[i].movie.mimeType,
                movieId: tempMovie[i].movie.id,
                photo: tempMovie[i].movie.photo,
            },
        });
    }
    console.log(droppedItems.value);

}

// 页面初始化
onMounted(async () => {
    await getVersionAleastOneMovie();
    getStore()
    fetchMovies();
    
    initializeDroppedItems();
});

watch(nowStore, () => {
    const storeId = nowStore.value.storeId;
    const versionsForStore = Object.keys(droppedItems.value[storeId] || {});

    if (versionsForStore.length > 0) {
        nowVersionId.value = versionsForStore[0]; // 默认选择第一个版本
    } else {
        nowVersionId.value = null; // 如果没有版本，清空
    }
});
watch([nowStore, selectedVersionId], () => {
    initializeDroppedItems();
});


// 加载上一页电影
const loadPreviousPage = () => {
    if (page.value > 1) {
        page.value -= 1;
        fetchMovies();
    }
};

// 加载下一页电影
const loadNextPage = () => {
    page.value += 1;
    fetchMovies();
};

// 加载上一版本
const loadPreviousVersion = () => {
    if (selectedVersionId.value > 1) {
        selectedVersionId.value -= 1;
        fetchMovies();
    }
};

// 加载下一页版本
const loadNextVersion = () => {
    selectedVersionId.value += 1;
    fetchMovies();
};

</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}
.btn{
    margin-left: 20px;
}

.box-container {
    /* margin: 20px; */
    flex: 1;
    /* border: 1px solid black; */
    border-radius: 15px;
    padding: 10px;
    width: 800px;
}

.content-container {
    /* height: 100vh; */
    /* border: 1px solid black; */
    border-radius: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding: 10px;
}

.movie-box-container {
    width: 300px;
    height: 100vh;
    padding: 10px;
    border: 1px solid red;
    border-radius: 15px;
    overflow-y: auto;
}

.card {
    margin-bottom: 15px;
}
.card-left{
    width: 950px;
}
.card-right{
    width: 400px;
    margin-left: 40px;
}

.cinema{
    width: 300px;
    margin-right: 20px;
}
.version{
    width: 220px;

}
.version-right{
    background-color: rgb(241, 241, 241);

}
.card-img-top {
    height: 250px;
    width: 200px;
    object-fit:fill;
    margin-bottom: 10px;
}

.btns{
    margin-left: 80px;
}
.dropped-item {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    background-color: #f9f9f9;
    height: 340px;
    width: 250px;
}
hr{
    border: 2px dashed black;
    margin: 0px 0px 0px 20px;
}
</style>
