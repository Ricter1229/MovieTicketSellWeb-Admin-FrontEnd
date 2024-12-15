<template>
    <div>
        <h1>我是臨時結帳頁面</h1>
        <div class="d-flex">
            <RouterLink :to="{ name: 'check-choose-deatil-link' }" class=" btn btn-info">上一頁</RouterLink>
            <RouterLink :to="{ name: 'ticket-detail-link' }" class="ms-auto btn btn-info">結帳成功</RouterLink>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>