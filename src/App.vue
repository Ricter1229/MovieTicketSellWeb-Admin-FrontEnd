<template>
	<div class="layout" >
		<header :style="{ paddingBottom: navbarHeight + 'px' }">
			<Navigationbar class="navbar" @updateHeight="updateNavbarHeight" ></Navigationbar>
		</header>
		<div class="content" >
			<RouterView></RouterView>
		</div>
	</div>
</template>

<script setup>
	import 'bootstrap/dist/css/bootstrap.min.css'
	import 'bootstrap/dist/js/bootstrap.bundle.min.js'
	
	
	import Navigationbar from './components/Navigationbar.vue';

	import { ref } from 'vue';

	const navbarHeight = ref(0);// 儲存 Navigationbar 的高度
	
	const updateNavbarHeight = (height) => {
		navbarHeight.value = height;
	};
</script>

<style scoped>
header {
	display: block; /* 确保 header 可见 */
	position: relative; /* 避免被 position 相关设置影响 */
}

/* 使用 Flexbox 布局 */
.layout {
	display: flex;
	flex-direction: column;
	height: 100vh; /* 讓內容滿屏 */
	overflow: hidden;
}

.navbar {
	flex-shrink: 0; /* 固定高度，避免壓縮 */
	z-index: 10; /* 確保 Navbar 在最上層 */
	box-sizing: border-box;
}

.content {
	flex-grow: 1; /* 填充剩餘空間 */	
	height: 100vh;
    overflow-y: auto; /* 整个页面滚动 */
}
</style>