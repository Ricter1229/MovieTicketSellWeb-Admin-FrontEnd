<template>
    <div class="main">

        <!--  -->
        <div class="card card-outer">
            <div class="card-header">
                <h3 class="center">電影管理</h3>
                <div class="row-top">
                    <div class="">
                        <button type="button" class="btn btn-primary insert" @click="openModal('insert')">
                            開啟新增
                        </button>
                    </div>
                    <div class="center">
                        <input type="text" placeholder="電影名稱查詢" v-model.lazy="findName" @input="callFind(1)" >
                    </div>
        
                </div>
                <div class="sl-outer">
                    <MovieSelect class="sl" :options="[2, 3, 4, 5, 8, 10]"
                    :total="total" v-model="rows" @change="callFind(1)" ></MovieSelect>
                </div>
            <br>
    
            <div class="row">
            <div class="center" v-show="total>0">
                    <Paginate 
                        class="pages"
                        v-model="current"    
                        :page-count="pages"
                        :click-handler="callFind"
                        :initial-page="current"
                        :first-last-button="true"
                        first-button-text="&lt;&lt;"
                        last-button-text="&gt;&gt;"
                        prev-text="&lt;"
                        next-text="&gt;">
                    </Paginate>
                </div>
            </div>
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <div  class="movie-sec">
                        <div v-if="!isNoData" style="height: 500px;" v-for="movie in movies" :key="movie.id">
                            <MovieCard :item="movie" @open-update="openModal" @delete="callRemove">
                            </MovieCard>
                        </div>
                        <div v-else class="text-center text-muted" style="padding: 20px;" >
                            沒有資料
                        </div>
                    </div>
                    <br>
    
                </blockquote>
            </div>
        </div>
        <!--  -->
            <!-- <h3>電影管理</h3>
            <div class="row">
                <div class="col-3">
                    <button type="button" class="btn btn-primary" @click="openModal('insert')">
                        開啟新增
                    </button>
                </div>
                <div class="col-6">
                    <input type="text" placeholder="電影名稱查詢" v-model.lazy="findName" @input="callFind(1)" >
                </div>
        
                <div class="col-3">
                    <MovieSelect :options="[2, 3, 4, 5, 8, 10]"
                    :total="total" v-model="rows" @change="callFind(1)" ></MovieSelect>
                </div>
            </div>
            <br>
    
            <div class="row">
            <div class="col-6" v-show="total>0">
                    <Paginate 
                        v-model="current"    
                        :page-count="pages"
                        :click-handler="callFind"
                        :initial-page="current"
                        :first-last-button="true"
                        first-button-text="&lt;&lt;"
                        last-button-text="&gt;&gt;"
                        prev-text="&lt;"
                        next-text="&gt;">
                    </Paginate>
                </div>
            </div>
            <br> -->
    
            <!-- <div class="row">
                <div v-if="!isNoData" class="col-lg-3 col-md-6" style="height: 500px;" v-for="movie in movies" :key="movie.id">
                    <MovieCard :item="movie" @open-update="openModal" @delete="callRemove">
                    </MovieCard>
                </div>
                <div v-else class="text-center text-muted" style="padding: 20px;" >
                    沒有資料
                </div>
            </div>
            <br>
     -->
    
            <MovieModal ref="movieModalRef" v-model:movie="movie"
                :is-show-insert-button="isShowInsertButton" @insert="callCreate" @update="callModify">
            </MovieModal>
    </div>
</template>
    
<script setup>
    import Paginate from 'vuejs-paginate-next';
    import {ref , onMounted} from 'vue'
    import { useRoute } from 'vue-router';
    import Swal from 'sweetalert2';
    import axiosapi from '@/utils/axiosInstance'
    import MovieCard from '@/components/MovieCard.vue';
    import MovieSelect from '@/components/MovieSelect.vue';
    import MovieModal from '@/components/MovieModal.vue';

    const movies = ref([]);
    let isNoData = false

    //分頁 start
    const findName = ref("");
    const start = ref(0);
    const rows = ref(4);
    const current = ref(1);
    const pages = ref(0);
    const total = ref(0);
    const lastPageRows = ref(0);
    //分頁 end

    //modal
    const movie = ref({});
    const movieModalRef = ref(null);
    const isShowInsertButton = ref(true);
    function openModal(action, id) {        
        movieModalRef.value.init()
        if(action==="insert") {
            isShowInsertButton.value = true;
            movie.value = {};
        } else {
            isShowInsertButton.value = false;
            callFindById(id).then(() => {
                movieModalRef.value.updateFirstAssignment();
            });
        }
        movieModalRef.value.showModal();
    }
    //end

    onMounted(function() {
        callFind(current.value);
    });

    async function callFind(page) {
        // Swal.fire({
        //     title: "Loading.....",
        //     showConfirmButton: false,
        //     allowOutsideClick: false,
        // });
        if(page) {
            current.value = page;
            start.value = (page - 1) * rows.value;
        } else {
            current.value = 1;
            start.value = 0;
        }
        if(findName.value ==="") {
            findName.value = null;
        }
        let request = {
            start: start.value,
            max: rows.value,
            dir: false,
            order:"id",
            chineseName : findName.value
        }
        let uri = "/api/movie/find";
        await axiosapi.post(uri , request).then(function(response) {
            if (response.data.list && response.data.list.length > 0) {
                movies.value = response.data.list;
                isNoData = false
                //分頁start
                total.value = response.data.count;
                pages.value = Math.ceil(total.value / rows.value);
                lastPageRows.value = total.value % rows.value;
                //分頁end
                setTimeout(function () {
                    Swal.close();
                },500);
            } else {
                isNoData = true
            }
            
        }).catch(function(error) {
            console.log("error", error);
            Swal.fire({
                icon: "error",
                title: "查詢失敗:"+ error.message,
            });
        });
    }
    
    async function callFindById(id) {
        Swal.fire({
            title: "Loading.....",
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        try {
            const response = await axiosapi.get(`/api/movie/movies/${id}`);
            movie.value = response.data.list[0].movie;
            
            setTimeout(function() {
                Swal.close();
            }, 500);
        } catch(error) {
            console.log("error", error);
            Swal.fire({
                icon: "error",
                title: "查詢失敗:"+ error.message,
            });
        }
    }
    
    async function callRemove(id) {
        const result = await Swal.fire({
            title: "確定刪除嗎？",
            showCancelButton: true,
        });
        if(result.isConfirmed) {
            Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            try {
                const response = await axiosapi.delete(`/api/movie/movies/${id}`);
                if(response.data.success) {
                    Swal.fire({
                        icon: "success",
                        title: response.data.message,
                    }).then(function(result) {
                        if(lastPageRows.value==1 && current.value > 1) {
                            current.value = current.value - 1;
                        }
                        callFind(current.value);
                    });
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: response.data.message,
                    });
                }
            } catch(error) {
                Swal.fire({
                    icon: "error",
                    title: "刪除失敗:"+ error.message,
                });
            }
        }
    }

    async function callCreate() {
        Swal.fire({
            title: "Loading.....",
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        try {
            let request = movie.value;
            console.log(request);
            const response = await axiosapi.post("/api/movie/addMovie", request);
            
            if(response.data.success) {
                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                }).then(function(result) {
                    movieModalRef.value.hideModal();
                    callFind(current.value);
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: response.data.message,
                });
            }
        } catch(error) {
            Swal.fire({
                icon: "error",
                title: "新增失敗:"+ error.message,
            });
        }      
    }

    async function callModify() {
        Swal.fire({
            title: "Loading.....",
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        try {
            let request = movie.value;
            const response = await axiosapi.put(`/api/movie/movies/${movie.value.id}`, request);
            if(response.data.success) {
                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                }).then(function(result) {
                    movieModalRef.value.hideModal();
                    callFind(current.value);
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: response.data.message,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "刪除失敗:"+ error.message,
            });
        }      
    }

</script>
    
<style scoped>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
h3{
    margin-top: 20px;
    margin-bottom: 40px;
}
    .main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .row-top{
        display: flex;
        justify-content: center;
    }
    .insert{
        margin-right: 20px;
    }
    .card-outer{
        /* width: 1300px; */
        margin-top: 60px;
        height: auto;
    }
    .sl-outer{
        position: relative;
    }
    .sl{
        position: absolute;
        top:-35px;
        right: 0px;
        width: auto;
        margin: 0;
    }
    .pages{
        margin-bottom: 10px;
    }
    .center{
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .movie-sec{
        display: flex;
        flex-wrap: wrap;
        padding: 20px 50px 20px 50px;
        gap: 30px;
    }

</style>