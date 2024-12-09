<template>
    <div class="container movie-grid">
        <div class="row g-4">
            <div class="col-md-15 col-lg"  v-for="movie in movies">
                <div class="movie-item" >
                    <img :src="movie.imgURL" :alt="movie.name">
                    <div class="movie-buttons">
                        <a href="#" class="movie-button">立即觀看</a>
                        <RouterLink to="/movie" class="movie-button">購票資訊</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const movies = [
        {
            imgURL: "https://www.vscinemas.com.tw/vsweb/upload/film/film_20241021011.jpg",
            name: "紅色一號"
        },
        {
            imgURL: "https://www.vscinemas.com.tw/vsweb/upload/film/film_20241104001.jpg",
            name: "海洋奇緣2"
        },
        {
            imgURL: "https://www.vscinemas.com.tw/vsweb/upload/film/film_20241023003.jpg",
            name: "焚城"
        },
        {
            imgURL: "https://www.vscinemas.com.tw/vsweb/upload/film/film_20240308003.jpg",
            name: "荒野機器人"
        },
        {
            imgURL: "https://www.vscinemas.com.tw/vsweb/upload/film/film_20241023001.jpg",
            name: "幸福國度"
        },
    ]
</script>

<style scoped>
/* Movie Buttons */
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

    /* Responsive Adjustments */
    @media (max-width: 768px) {
        .hero-section img {
            height: 60vh;
        }

        .movie-button {
            min-width: 160px;
            font-size: 1.1em;
        }

        .movie-item {
            height: 400px;
        }
    }
</style>