<template>
    
    <section class="body">

        <section class="top">
            <form action="" class="search">
                <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="findName" @change.prevent="callFind()">
                <label for="floatingInput">店名搜尋</label>
            </div>
            </form>
            <form action="" class="search">
                <div class="form-floating">
                    <select class="form-select sl1" id="floatingSelectGrid" @change="regionChoose($event.target.value)">
                        <option selected value="">無</option>
                        <option :value="region.regionNum" v-for="region in regions" >{{region.region}}</option>
                    </select>
                <label for="floatingSelectGrid">地區搜尋</label>
                </div>
                <div class="form-floating sl">
                    <select class="form-select sl2" id="floatingSelectGrid" v-model="fullName" @change="callFind()">
                        <option value="" selected>無</option>
                    <option :value="cinema.name" v-for="cinema in regionCinemas">{{cinema.name}}</option>
                    </select>
                <label for="floatingSelectGrid">店名</label>
                </div>
            </form>
        </section>
      

        <!-- <section class="top">
            <form action="" class="search">
                <label for="sto">店名搜尋:</label>
                <input type="text" id="sto" placeholder="店名" v-model="findName" @change.prevent="callFind()">
            </form>
            <form action="" class="search">
                <label for="sec">地區搜尋:</label>
                <select name="sec" id="sec" @change="regionChoose($event.target.value)">
                    <option value="">無</option>
                    <option :value="region.regionNum" v-for="region in regions" >{{region.region}}</option>
                </select>
                <select name="" id="" class="sl" v-model="fullName" @change="callFind()">
                    <option value="">無</option>
                    <option :value="cinema.name" v-for="cinema in regionCinemas">{{cinema.name}}</option>
                </select>
            </form>
        </section> -->
        <!-- <CinemaSearch></CinemaSearch> -->
        <main>
            <section class="main_sec">
                
                <button class="btn btn-secondary insert" type="button"  @click="openModal('insert')">新增</button>
                
                <table class="table main_table">
        <thead class="table-light main_thead">
            <tr>
                <th class="edit"></th>
                <th class="name">影城名稱</th>
                <th class="address">影城地址</th>
                <th class="phone">聯絡方式</th>
                <th class="delete"></th>
            </tr>
        </thead>
        <tbody class="main_tbody">

<!-- td -->
            <CinemaStoresFind v-for="cinema in cinemas" :key="cinema.storeId" :item="cinema" @open-update="openModal" @delete="callRemove"></CinemaStoresFind>
        </tbody>
    </table>
    <section class="pagi">
        
        <Paginate :first-last-button="true" first-button-text="&lt;&lt;" last-button-text="&gt;&gt;" prev-text="&lt;" next-text="&gt;" :page-count="pages" :initial-page="current" :click-handler="callFindByPagi" v-model="current" >
        </Paginate>
    </section>
                <CinemaModal ref="cinemaModalRef" v-model:cinema="cinema" :is-show-insert-button="isShowInsertButton" @insert="callCreate" @update="callModify" :current="current" @find="callFind(current)"></CinemaModal>
            </section>
        </main>
    </section>
</template>
    
<script setup>
    import CinemaSearch from './CinemaSearch.vue';
    import CinemaStoresFind from './CinemaStoresFind.vue';
    import CinemaModal from './CinemaModal.vue';
    import Swal from 'sweetalert2';
    import axios from 'axios';
    import { ref,onMounted } from 'vue';
    const cinemas=ref([]);
    const regionCinemas=ref([]);
    const cinema=ref({
    });
    const isShowInsertButton=ref(true);
    const cinemaModalRef=ref(null);
    const regionFilter=ref("");
    const regions=ref([]);
    
    function display(){
        console.log("current.value");
        console.log(current.value);
        console.log("start.value");
        console.log(start.value);
    }

    function openModal(action,storeId){
        if(action==="insert"){
            isShowInsertButton.value=true;
            cinema.value={};
            console.log(cinema.value);
        }else{
            console.log("123:"+storeId);
            isShowInsertButton.value=false;
            callFindById(storeId);
            console.log(cinema.value);
            console.log(cinemas.value[storeId]);

            // callFindById(id);

        }
        cinemaModalRef.value.showModal();
    }
    
    function regionChoose(regionNum){
        // console.log("數字");
        console.log("regionNum",regionNum);
        regionFilter.value=regionNum;
        console.log("regionFilter.value",regionFilter.value);
        callFindByRegion();
    }

    //網頁分頁
    import Paginate from 'vuejs-paginate-next';

    const fullName=ref("");
    const findName=ref("");
    //總筆數
    const total=ref(0);
    //分頁總數
    const pages=ref(10);
    //目前頁碼
    const current=ref(1);
    //起始資料位置
    const start=ref(0);
    //最大筆數
    const max=ref(8);
    const lastPageRows=ref(0);

    onMounted(function(){
        callFind();
        callFindRegion();
        callFindByRegion();
    });

 
    async function callFindRegion() {
            Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            axios.get("http://localhost:8080/store/regions/findall").then(function(response) {

                regions.value=response.data.list;
                setTimeout(function() {
                    Swal.close();
                }, 500);
            }).catch(function(error) {
                console.log("error", error);
                Swal.fire({
                    icon: "error", //success, error, warning, info, question,,,,
                    title: "查詢失敗:"+ error.message,
                });
            });
        }
    async function callRemove(id) {
        console.log("callRemove");
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
                    const response = await axios.delete(`http://localhost:8080/store/movies/${id}`);
                    if(response.data.success) {
                        Swal.fire({
                            icon: "success",
                            title: response.data.message,
                        })
                        .then(() => {
                            console.log("current.value");
        console.log(current.value);
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

    async function callFindByPagi(page) {
        console.log("page");
        console.log(page);

            //計算分頁
            if(page){
                start.value=(page-1)*max.value;
                console.log("start.value");
                console.log(start.value);
                console.log("total.value");
                console.log(total.value);
            
                current.value=page;
            }else{
                start.value=0;
                current.value=1;
                // start.value = (current.value - 1) * max.value;
            }

            if(findName.value===""){
                findName.value=null;
            }
            let request={
                start:start.value,
                max:max.value,
                dir:false,order:"id",
                findName:findName.value,
            }

            Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            

            
            axios.post("http://localhost:8080/store/find", request).then(function(response) {
                //分頁start
                total.value=response.data.count;
                pages.value=Math.ceil(total.value/max.value);
                lastPageRows.value=total.value%max.value;
                
                
                console.log("response", response.data.count);
                console.log("response", response.data.list);
                setTimeout(function() {
                    console.log(response.data.list)
                    cinemas.value=response.data.list;
                    Swal.close();
                }, 500);
            }).catch(function(error) {
                console.log("error", error);
                Swal.fire({
                    icon: "error", //success, error, warning, info, question,,,,
                    title: "查詢失敗:"+ error.message,
                });
            });
        }
        async function callFind(page) {
        console.log("page",page);

            //計算分頁
            if(page){
                start.value=(page-1)*max.value;

                if(total.value==(start.value+1)&&total!=1){
                    console.log("進了");
                    current.value=page-1;
                    start.value-=max.value;
                }else{

                    current.value=page;
                }
            }else{
                start.value=0;
                current.value=1;
                // start.value = (current.value - 1) * max.value;
            }
            if(regionFilter.value===""){
                regionFilter.value=null;
            }
            if(findName.value===""){
                findName.value=null;
            }fullName
            if(fullName.value===""){
                fullName.value=null;
            }
            let request={
                start:start.value,
                max:max.value,
                dir:false,order:"id",
                findName:findName.value,
                regionFilter:regionFilter.value,
                fullName:fullName.value,
            }

            Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            

            
            axios.post("http://localhost:8080/store/find", request).then(function(response) {
                //分頁start
                total.value=response.data.count;
                pages.value=Math.ceil(total.value/max.value);
                lastPageRows.value=total.value%max.value;
                
                console.log("fullName.value", fullName.value);
                console.log("response.data.count", response.data.count);
                console.log("response.data.list", response.data.list);
                console.log("response.data", response.data);
                console.log("response.data.success", response.data.success);
                if(response.data.success){
                    cinemas.value=response.data.list;
                    setTimeout(function() {
                        console.log(response.data.list)
                        
                        Swal.close();
                    }, 500);
                }
            }).catch(function(error) {
                console.log("error", error);
                Swal.fire({
                    icon: "error", //success, error, warning, info, question,,,,
                    title: "查詢失敗:"+ error.message,
                });
            });
        }
        async function callFindByRegion() {


            
            if(regionFilter.value===""){
                regionFilter.value=null;
            }
            
            let request={
                regionFilter:regionFilter.value,
            }

            Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            

            
            axios.post("http://localhost:8080/store/regions/find", request).then(function(response) {
                //分頁start     
                console.log("response.data.count", response.data.count);
                console.log("response.data.list", response.data.list);
                console.log("response.data", response.data);
                console.log("response.data.success", response.data.success);
                if(response.data.success){
                    regionCinemas.value=response.data.list;
                    setTimeout(function() {
                        console.log(response.data.list)
                        
                        Swal.close();
                    }, 500);
                }
            }).catch(function(error) {
                console.log("error", error);
                Swal.fire({
                    icon: "error", //success, error, warning, info, question,,,,
                    title: "查詢失敗:"+ error.message,
                });
            });
        }
        async function callFindById(storeId) {
        console.log("callFindById",storeId);
        Swal.fire({
            title: "Loading.....",
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        try {
            const response = await axios.get(`http://localhost:8080/store/find/${storeId}`);
            console.log("response", response.data.list[0]);
            if(response.data.list){
                cinema.value=response.data.list[0];
            }
            setTimeout(function() {
                Swal.close();
            }, 500);
        } catch(error) {
            console.log("error", error);
            Swal.fire({
                icon: "error", //success, error, warning, info, question,,,,
                title: "查詢失敗:"+ error.message,
            });
        }
    }
    
    </script>
    
<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .form-control{
        width: 400px;

    }
    .sl1{
    width: 120px;
    }
    .sl2{
        width: 400px;
    }
    .topForm{
        width: 700px;
    }
    .body{
        background-color: rgb(231, 228, 228);
        height:1000px;
        width: 100%;
    }
    .main_table{
        margin-top: 20px;
        width: 1200px;
    }
    .main_thead{
        height: 50px;
    }
    .main_thead>tr>th{
        text-align: center;
    }
    .insert{
        width: 300px;
    }
    .sl{
        margin-left: 20px;
    }
    label{
        margin-right: 10px;
    }
    .main_sec{
        display: flex;
        justify-content:center;
        align-items: center;
        flex-direction: column;
        margin-top: 50px;
    }
    .edit{
        width: 100px;
    }
    .name{
        width: 800px;
    }
    .address{
        width: 1800px;
    }
    .phone{
        width: 700px;
    }
    .delete{
        width: 200px;
    }
    .top{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 40px;
    }
    .search{
        margin: 10px;
        display: flex;
    }
    .pagi{
        display: flex;
        justify-content: center;
        align-items: center;

    }
</style>