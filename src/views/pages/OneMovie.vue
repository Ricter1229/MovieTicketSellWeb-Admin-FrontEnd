<template>
  <div class="container">
    <!-- Movie Title -->
    <h2 class="title">{{ movie.chineseName }}</h2>

    <div class="row movie-info">
      <!-- Movie Image and Title -->
      <div class="card" style="width: 18rem;">
        <img v-if="movie.photo" :src="movie.photo" class="card-img-top" :alt="movie.chineseName" style="height: 400px; object-fit: cover;">
        <img v-else src="https://via.placeholder.com/150" class="card-img-top" alt="Placeholder Image" style="height: 400px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">{{ movie.chineseName }}</h5>
          <p class="card-text">{{ movie.englishName }}</p>
        </div>
      </div>

      <!-- Movie Details -->
      <div class="movie-details">
        <p><strong>CAST：</strong>{{ movie.cast }}</p>
        <p><strong>類型：</strong>{{ movie.style }}</p>
        <p><strong>片長：</strong>{{ movie.runTime }}</p>
        <p><strong>價格：</strong>{{ movie.price }} 元</p>
        <p><strong>上映日期：</strong>{{ movie.releasedDate }}</p>
        <p><strong>結束日期：</strong>{{ movie.outOfDate }}</p>
      </div>
    </div>

    <!-- Plot Synopsis -->
    <h3 class="subtitle">劇情簡介</h3>
    <p class="synopsis">
      {{ movie.intro }}
    </p>

    <!-- Trailer Video -->
    <div class="video-container">
      <iframe 
        width="100%" 
        height="315" 
        :src="movie.commercialFilmURL" 
        title="電影預告片" 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
  </div>
</template>

<script>
import axiosapi from '@/utils/axiosInstance.js';
import Swal from 'sweetalert2';

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      movie: {}  // 儲存電影資料
    };
  },
  mounted() {
    if (this.id) {
      this.callFindById(this.id);
    }
  },
  methods: {
    async callFindById(id) {
      Swal.fire({
        title: "Loading.....",
        showConfirmButton: false,
        allowOutsideClick: false,
      });

      try {
        const response = await axiosapi.get(`/api/movie/movies/${id}`);
        console.log(response);

        // Check if the response is JSON and successful
        if (response.headers['content-type'].includes('application/json')) {
          if (!response.data.success) {
            const errorMessage = response.data.message || "無法獲取電影資料，請稍後再試";
            throw new Error("API 查詢失敗: " + errorMessage);
          }

          if (Array.isArray(response.data.list) && response.data.list.length > 0) {
            this.movie = response.data.list[0];  // Set the movie data
          } else {
            throw new Error("未找到電影資料");
          }
        } else {
          throw new Error("API路徑錯誤或伺服器配置問題。");
        }

        setTimeout(() => {
          Swal.close();
        }, 500);
      } catch (error) {
        console.error("Error", error);
        Swal.fire({
          icon: "error",
          title: `查詢失敗: ${error.message}`,
          text: "請查看控制台。",
        });
      }
    }
  }
};
</script>

<style scoped>
/* Container for the whole content */
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Title styling */
.title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
  color: #2C3E50;
}

/* Row layout for the movie image and details */
.row.movie-info {
  display: flex;
  gap: 30px;
  justify-content: space-between;
  margin-bottom: 30px;
}

/* Styling for movie details */
.movie-details {
  flex: 1;
  font-size: 1rem;
}

.movie-details p {
  margin: 10px 0;
}

.movie-details strong {
  color: #2980B9;
}

/* Subtitle styling */
.subtitle {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #34495E;
}

/* Synopsis paragraph styling */
.synopsis {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #7F8C8D;
  margin-bottom: 30px;
}

/* Video container styling */
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* Aspect ratio for 16:9 videos */
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: #000;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
