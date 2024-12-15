<template>
    <div class="container main-div">
        <h3>臨時作為訂票按鈕頁面</h3>
        <button @click="openModal">訂票</button>
    </div>

    <ChooseStoreAndTimeModal ref="chooseModalRef"></ChooseStoreAndTimeModal>
</template>

<script setup>
    import { ref } from 'vue';
    import ChooseStoreAndTimeModal from './ChooseStoreAndTimeModal.vue';

    const chooseModalRef = ref(null);
    
    const openModal = () => {
        // 調用子組件的方法顯示模態框
        chooseModalRef.value.openModal();
    };
</script>

<style scoped>
    .main-div {
        padding-top: 90px; /* 添加與 Navbar 高度一致的內邊距 */
    }
    /* div {
        font-family: 'Noto Sans TC', sans-serif;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #0a0a0a;
        color: white;
    } */
</style>