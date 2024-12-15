<template>
    <div class="card h-100" style="width: 260px; height: 400px;">
  <!-- 圖片會根據卡片的大小自動調整，保持比例 -->
  <img class="card-img-top" alt="item.chineseName" src="../assets/images/SAO.jpg" style="object-fit: cover; height: 100%; width: 100%;">
        
  <div class="card-body d-flex flex-column" style="height: 50%; overflow: hidden;">
    <!-- 文字部分放在圖片下方，並自動調整 -->
    <h5 class="card-title">{{ item.chineseName }}</h5>
            <div class="card-text text-danger text-end">{{ item.releasedDate }}</div>
            <div class="row mt-auto">
                <div class="col text-start">
                    <a href="#" class="btn btn-primary" @click="doclick1(item.id)">開啟修改</a>
                </div>
                <div class="col text-end">
                    <a href="#" class="btn btn-primary" @click="doclick2(item.id)">刪除</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(["item"]);
    const emits = defineEmits(["openUpdate", "delete"]);

    // 點擊開啟修改
    function doclick1(id) {
        emits("openUpdate", "update", id);
    }

    // 點擊刪除
    function doclick2(id) {
        emits("delete", id);
    }
</script>

<style scoped>
    /* 你可以在這裡加上額外的樣式來控制圖片顯示和其他部分的外觀 */
    .card-img-top {
        object-fit: cover; /* 使圖片不失真地填充 */
        max-width: 100%; /* 確保圖片不超出容器 */
    }

    .card-body {
        padding: 20px;
    }

    .btn {
        margin-top: 10px;
    }

    /* 卡片間距 */
    .card {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加陰影，讓卡片更突出 */
    }


    /* 按鈕的間距 */
    .btn {
        margin-top: 10px;
    }
</style>

<!-- <template>
    <div class="card">
        <img class="card-img-top" :alt="item.chineseName" :src="item.photo" :style="{ width: 'auto', height: '400px' } >
        <div class="card-body">
            <h5 class="card-title">{{ item.chineseName }}</h5>
            <div class="card-text text-danger text-end">{{ item.releasedDate }}</div>
            <div class="row">
                <div class="col text-start">
                    <a href="#" class="btn btn-primary" @click="doclick1(item.id)">開啟修改</a>
                </div>
                <div class="col text-end">
                    <a href="#" class="btn btn-primary" @click="doclick2(item.id)">刪除</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(["item"]);
    const emits = defineEmits(["openUpdate", "delete"]);

    function doclick1(id) {
        emits("openUpdate", "update", id);
    }
    function doclick2(id) {
        emits("delete", id);
    }
</script>
    
<style>
    
</style> -->