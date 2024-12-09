<template>
    <section class="top">
        <form action="" class="search">
            <input type="text" placeholder="店名">
            <button>搜尋</button>
        </form>
        <form action="" class="search">
            <select name="" id="">
                <option value="">北部</option>
                <option value="">中部</option>
                <option value="">南部</option>
            </select>
            <select name="" id="" class="sl">
                <option value="">oo店</option>
                <option value="">oo店</option>
                <option value="">oo店</option>
            </select>
            <button>搜尋</button>
        </form>
    </section>
</template>
    
<script setup>
    
</script>
    
<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .top{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 40px;
    }
    .search{
        margin: 10px;
    }
</style>