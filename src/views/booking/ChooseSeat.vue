<template>

    <!-- 左側主內容 -->
    <div class="main-content flex-grow-1 me-3">
        <!-- 影廳畫面 -->
        <div class="theater-view">
            <!-- 螢幕(前方) -->
            <div class="screen text-center py-2 bg-light">
                there is a screen
            </div>
            <!-- 座位 -->
            <div class="seating-list-container d-flex justify-content-center align-items-center mt-3">
                <SeatingList></SeatingList>
            </div>
        </div>

        <!-- 上/下一頁按鈕 最下面 -->
        <div class="d-flex justify-content-between mt-4">
            <RouterLink :to="{ name: 'choose-ticket-link' }" class="btn btn-info">上一頁</RouterLink>
            <RouterLink :to="{ name: 'check-choose-deatil-link' }" class="btn btn-info">下一頁</RouterLink>
        </div>
    </div>
    
</template>

<script setup>
    import SeatingList from './SeatingList.vue';
    import useBookingStore from '@/stores/bookingStore';
    const bookingStore = useBookingStore()
</script>

<style scoped>
/* 主內容 */
.main-content {
    display: flex;
    flex-direction: column; /* 垂直布局 */
    min-height: 100vh; /* 覆盖全屏高度 */
    padding: 20px; /* 内边距 */
    background-color: #f8f9fa; /* 背景色 */
    border-right: 1px solid #ddd; /* 分隔左侧内容与其他部分 */
    overflow: hidden; /* 防止内容溢出产生滚动 */
}

/* 影廳畫面 */
.theater-view {
    flex-grow: 1; /* 动态填充剩余空间 */
    display: flex;
    flex-direction: column; /* 垂直布局 */
    align-items: center; /* 水平居中 */
    justify-content: space-between; /* 上下分布 */
}

/* 螢幕 (前方) */
.screen {
    width: 100%;
    max-width: 600px; /* 最大宽度 */
    margin: 0 auto;
    border-radius: 5px;
    font-weight: bold;
    background-color: #e9ecef; /* 灰色背景 */
    border: 1px solid #ccc; /* 边框 */
}

/* 座位列表容器 */
.seating-list-container {
    flex-grow: 1; /* 动态填充剩余空间 */
    display: flex;
    justify-content: center;
    align-items: center; /* 垂直居中 */
    width: 100%;
    max-width: 800px; /* 最大宽度 */
    background-color: #ffffff; /* 白色背景 */
    border-radius: 10px; /* 圆角 */
    border: 1px solid #ddd; /* 边框 */
    padding: 20px; /* 内边距 */
    overflow-y: auto; /* 垂直滚动 */
}

/* 上/下一頁按鈕容器 */
.d-flex {
    margin-top: auto; /* 按钮始终贴近底部 */
}

/* 按钮样式 */
.btn {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.btn-info {
    background-color: #17a2b8;
    border: none;
    color: white;
}

.btn-info:hover {
    background-color: #138496;
    color: #fff;
}
</style>