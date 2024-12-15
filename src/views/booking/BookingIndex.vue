<template>
    <div class="container d-flex">
        <!-- 主內容 -->
        <div class="main-content d-flex flex-column flex-grow-1">
            <!-- 路由視圖 -->
            <div class="router-view flex-grow-1">
                <RouterView></RouterView>
            </div>

            <!-- 下一頁按鈕 -->
            <RouterLink 
                :to="{ name: 'choose-ticket-link' }" 
                class="btn btn-info mt-3"
                v-if="isChildRouteVisible">
                下一頁
            </RouterLink>
        </div>

        <!-- 購物車 -->
        <div v-if="shoppingCartVisible" class="shopping-cart bg-light p-3 rounded">
            <ShoppingCart></ShoppingCart>
        </div>
    </div>
</template>

<script setup>
    import useBookingStore from '@/stores/bookingStore';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import ShoppingCart from './ShoppingCart.vue';

    const bookingStore = useBookingStore()

    // 獲取當前路由
    const route = useRoute();

    // 計算當前是否是子路由
    const isChildRouteVisible = computed(() => {
        // 判斷當前路由名稱是否屬於需要隱藏按鈕的路由名稱
        return ['booking-link'].includes(route.name);
    });

    const shoppingCartVisible = computed(() => {
        // 判斷當前路由名稱是否屬於需要隱藏按鈕的路由名稱
        return ['choose-ticket-link', 'choose-seat-link'].includes(route.name);
    });
</script>

<style scoped>
/* 主容器布局 */
.container {
    display: flex;
    /*min-height: 90vh;  整页高度 */
}

/* 主內容部分樣式 */
.main-content {
    display: flex;
    flex-direction: column; /* 垂直布局 */
    flex-grow: 1; /* 占据剩余空间 */
    min-height: 87vh; /* 整页高度 */
    max-height: 87vh; /* 整页高度 */
    overflow: hidden; /* 防止多余滚动 */
}

/* RouterView 的樣式 */
.router-view {
    flex-grow: 1; /* 动态占据剩余空间 */
    overflow-y: auto; /* 如果内容超出，允许滚动 */
}

/* 下一頁按鈕樣式 */
.btn {
    align-self: flex-end; /* 固定在底部 */
}

/* 購物車部分樣式 */
.shopping-cart {
    flex-basis: 25%; /* 固定购物车宽度占比 */
    max-width: 300px; /* 最大宽度限制 */
    border: 1px solid #ddd; /* 添加边框 */
    background-color: #f8f9fa; /* 浅色背景 */
    border-radius: 5px; /* 圆角 */
    overflow-y: auto; /* 如果购物车内容超出，允许滚动 */
}

/* 外边距 */
.mt-3 {
    margin-top: 1rem !important;
}

.p-3 {
    padding: 1rem !important;
}
</style>