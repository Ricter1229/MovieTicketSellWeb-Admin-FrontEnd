<template>
    <div class="main-div" >
        <MovieSection></MovieSection>
        <SecondaryNavbar></SecondaryNavbar>
        <MovieGrid></MovieGrid>
    </div>
</template>

<script setup>
    import MovieSection from './MovieSection.vue';
    import SecondaryNavbar from './SecondaryNavbar.vue';
    import MovieGrid from './MovieGrid.vue';
</script>

<style scoped>
    .main-div {
        overflow-y: auto; /* 滾動內容 */
    }
    div {
        font-family: 'Noto Sans TC', sans-serif;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #0a0a0a;
        color: white;
    }
    .movie-grid {
        padding: 2rem 0;
    }

    .movie-item {
        position: relative;
        margin-bottom: 2rem;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        height: calc(100vh - 200px);
    }

    .movie-item:hover {
        transform: translateY(-10px);
    }

    .movie-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%);
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .movie-item:hover::before {
        opacity: 1;
    }

    .movie-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .movie-item:hover img {
        transform: scale(1.05);
    }

    .movie-item .movie-buttons {
        opacity: 0;
        transition: all 0.3s ease;
    }

    .movie-item:hover .movie-buttons {
        opacity: 1;
    }

    .movie-item .movie-button {
        font-size: 1em;
        padding: 8px 20px;
        min-width: 150px;
    }
</style>