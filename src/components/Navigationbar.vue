<template>
    <!-- <nav ref="navbarRef" class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div class="container-fluid">
            <RouterLink to="/" class="navbar-brand">CinemaVerse</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
    
                    <li v-if="!usersStore.isLogin" class="nav-item">
                        <RouterLink to="/secure/login" class="nav-link" aria-current="page" >登入</RouterLink>
                    </li>
                    <li v-if="!usersStore.isLogin" class="nav-item">
                        <RouterLink to="/secure/register" class="nav-link" aria-current="page" >註冊</RouterLink>
                    </li>
                    <li v-else class="nav-item">
                        <button @click="logout" class="nav-link btn btn-link">登出</button>
                    </li>
                    
                    <li class="nav-item dropdown" >
                        <span class="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                role="button" aria-expanded="false">
                            電影管理
                        </span>
                        <ul class="dropdown-menu">
                            <li><RouterLink class="dropdown-item" to="/movie">電影</RouterLink></li>
                            <li><RouterLink class="dropdown-item" to="/moviefront">電影前端暫放用</RouterLink></li>
                            
                        </ul>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/backend" class="nav-link" aria-current="page" >影城後台</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/ads/set" class="nav-link" aria-current="page" >廣告管理</RouterLink>
                    </li>


                    <li class="nav-item">
                        <RouterLink to="/test" class="nav-link" aria-current="page" >測試store</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav> -->

    <nav ref="navbarRef" class="navbar bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <RouterLink to="/" class="navbar-brand">CinemaVerse</RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <!-- <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li> -->
          <ul class="navbar-nav">
            <li class="nav-item">
                <RouterLink to="/admin" class="nav-link" aria-current="page" >admin</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/secure/login" class="nav-link" aria-current="page" >登入</RouterLink>
            </li>
            <li class="nav-item">
            
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    電影排程
                    </a>
                    <ul class="dropdown-menu">
                        <li class="nav-item"><RouterLink to="/moviewithstore" class="nav-link" aria-current="page" >電影選店</RouterLink></li>
                        <li class="nav-item">
                            <RouterLink to="/calender" class="nav-link" aria-current="page" >電影行程</RouterLink>
                        </li>
                        
                    </ul>
                </li>
                
            </li>
            
            <!-- <li v-if="!usersStore.isLogin" class="nav-item">
                <RouterLink to="/secure/login" class="nav-link" aria-current="page" >登入</RouterLink>
            </li>
            <li v-if="!usersStore.isLogin" class="nav-item">
                <RouterLink to="/secure/register" class="nav-link" aria-current="page" >註冊</RouterLink>
            </li>
            <li v-else class="nav-item">
                <button @click="logout" class="nav-link btn btn-link">登出</button>
            </li> -->

            <li class="nav-item">
                <RouterLink to="/movie" class="nav-link" aria-current="page" >電影管理</RouterLink>
            </li>

            <!-- <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul> -->

            <!-- <li class="nav-item">
                <RouterLink to="/backend" class="nav-link" aria-current="page" >影城後台</RouterLink>
            </li> -->
            <li class="nav-item">
                <RouterLink to="/ads/set" class="nav-link" aria-current="page" >廣告管理</RouterLink>
            </li>

<!-- temp test -->
        <li class="nav-item">
            <RouterLink to="/test" class="nav-link" aria-current="page" >測試store</RouterLink>
        </li>
        </ul>
        <!-- <form class="d-flex mt-3" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> -->
      </div>
    </div>
  </div>
</nav>
</template>

<script setup>
    import useUsersStore from '@/store/users.js';
    const usersStore = useUsersStore();

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
        
        /* background-color: rgba(0, 0, 0, 0.8) !important; */
        /* backdrop-filter: blur(10px); */
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
        /* color: white !important; */
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