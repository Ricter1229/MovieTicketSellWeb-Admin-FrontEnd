<template>
    <nav ref="navbarRef" class="navbar navbar-expand-lg">
        <div class="container">
            <RouterLink to="/" class="navbar-brand">CinemaVerse</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
    
                    
                    <li class="nav-item">
                        <RouterLink to="/backend" class="nav-link" aria-current="page" >影城後台</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/ads/set" class="nav-link" aria-current="page" >廣告上傳</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>



    const logout = () => {
        usersStore.logout();
        alert("您已成功登出。");
    };
    import { onMounted, ref } from 'vue';
    const navbarRef = ref(null); 
    const emits = defineEmits(["updateHeight"])
    onMounted(() => {
        const navbarHeight = navbarRef.value.offsetHeight;
        emits('updateHeight', navbarHeight); 
    });
</script>

<style scoped>
    .navbar {
        
        background-color: rgba(0, 0, 0, 0.8) !important;
        backdrop-filter: blur(10px);
        position: fixed;
        width: 100%;
        z-index: 1000;
        padding: 1rem 0;
        transition: all 0.3s ease;
    }

    .navbar-brand {
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(45deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .navbar .nav-link {
        color: white !important;
        padding: 0.5rem 1.2rem !important;
        margin: 0 0.3rem;
        font-size: 1.1em;
        transition: all 0.3s ease;
        border-radius: 25px;
    }

    .navbar .nav-link:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
    }
</style>