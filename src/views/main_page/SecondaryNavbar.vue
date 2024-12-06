<template>
    <nav class="secondary-nav">
        <div class="container">
            <div class="navbar-nav d-flex flex-row justify-content-center">
                <a class="nav-link" href="#"><i class="fas fa-fire me-2"></i>熱映中</a>
                <a class="nav-link" href="#"><i class="fas fa-calendar-alt me-2"></i>即將上映</a>
                <a class="nav-link" href="#"><i class="fas fa-plus me-2"></i>更多電影</a>
            </div>
        </div>
    </nav>
</template>

<script setup>

</script>

<style scoped> 
    /* Secondary Navigation */
    
    .secondary-nav {
        background: linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 100%);
        padding: 1rem 0;
        margin: 2rem 0;
    }

    .secondary-nav .nav-link {
        position: relative;
        padding: 0.8rem 2rem !important;
        font-weight: 500;
    }

    .secondary-nav .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: linear-gradient(45deg, #FF3CAC, #784BA0);
        transition: all 0.3s ease;
        transform: translateX(-50%);
    }

    .secondary-nav .nav-link:hover::after {
        width: 80%;
    }
</style>