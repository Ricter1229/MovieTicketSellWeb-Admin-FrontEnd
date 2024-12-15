<template>
    <section class="hero-section">
        <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active" v-for="(imgURL, index) in imgURLs">
                    <img :src="imgURL" :alt="`Movie Poster ${index}`" class="img-fluid">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            <div class="movie-buttons d-flex flex-column align-items-center">
                <a href="#" class="movie-button"><i class="fas fa-film me-2"></i>立即觀看</a>
                <RouterLink to="/movie" class="movie-button">購票資訊</RouterLink>
                <!-- <a href="#" class="movie-button"><i class="fas fa-ticket-alt me-2"></i>購票資訊</a> -->
            </div>
        </div>
    </section>
</template>

<script setup>
    const imgURLs = [
        'https://www.vscinemas.com.tw/vsweb/upload/homepage/homepage_20241112009.jpg',
        'https://www.vscinemas.com.tw/vsweb/upload/homepage/homepage_20241112007.jpg',
        'https://www.vscinemas.com.tw/vsweb/upload/homepage/homepage_20241112009.jpg',
        'https://www.vscinemas.com.tw/vsweb/upload/homepage/homepage_20241112005.jpg',
    ]
</script>

<style scoped>
/* Movie Grid */
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
    /* movie button */
    .movie-buttons {
        position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        width: 100%;
        z-index: 2;
    }

    .movie-button {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        color: white;
        padding: 12px 30px;
        border-radius: 30px;
        margin-bottom: 15px;
        width: auto;
        min-width: 200px;
        font-size: 1.2em;
        text-decoration: none;
        display: inline-block;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .movie-button:hover {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
</style>