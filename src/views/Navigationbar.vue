<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <span class="navbar-brand">後端管理</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link active" aria-current="page" >首頁</RouterLink>
                    </li>

                    <li class="nav-item dropdown" >
                        <span class="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                role="button" aria-expanded="false">
                            電影管理
                        </span>
                        <ul class="dropdown-menu">
                            <li><RouterLink class="dropdown-item" to="/movie">電影</RouterLink></li>
                            <li><RouterLink class="dropdown-item" to="/moviefront">電影前端暫放用</RouterLink></li>
                            <!-- <li><RouterLink class="dropdown-item" to="/onemovie">單一電影前端暫放用</RouterLink></li> -->
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>

</script>
    
<style>
    
</style>