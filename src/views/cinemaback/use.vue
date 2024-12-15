
<template>
    <section class="body">

        <CinemaSearch></CinemaSearch>
        <main>
            <section class="main_sec">
                
                <button class="btn btn-secondary insert" type="button"  @click="openModal('insert')">新增</button>
                
                <table class="table main_table">
        <thead class="table-light main_thead">
            <tr>
                <th></th>
                <th>影城名稱</th>
                <th class="address">影城地址</th>
                <th>聯絡方式</th>
                <th></th>
            </tr>
        </thead>
        <tbody class="main_tbody">


            <CinemaStoresFind v-for="cinema in cinemas" :key="cinema.id" :item="cinema" @open-update="openModal" @delete="callRemove"></CinemaStoresFind>

        </tbody>
    </table>
                <CinemaModal ref="cinemaModalRef" v-model:cinema="cinema" :is-show-insert-button="isShowInsertButton" @insert="callCreate" @update="callModify"></CinemaModal>
            </section>
            
        </main>
    </section>
    
</template>
    
<script setup>
    import CinemaSearch from './CinemaSearch.vue';
    import CinemaStoresFind from './CinemaStoresFind.vue';
    import CinemaModal from './CinemaModal.vue';
    import { ref } from 'vue';
    import { onMounted } from 'vue';
    const cinemas=ref([
        {name:"ccc店",address:"台北市信義區松壽路20號",phoneNo:"1234567890",region:"南"},
        {name:"ccc店",address:"台北市信義區松壽路20號",phoneNo:"1234567890",region:"南"},
    ]);
    const cinema=ref({});
    const isShowInsertButton=ref(true);
    const cinemaModalRef=ref(null);

    function openModal(action,id){
        if(action==="insert"){
            isShowInsertButton.value=true;
            cinema.value={};
        }else{
            isShowInsertButton.value=false;
            cinema.value={name:"ccc店",address:"台北市信義區松壽路20號",phoneNo:"1234567890",region:"南",introduce:"dsadasdadaffafafad"};
            // callFindById(id);

        }
        cinemaModalRef.value.showModal();
    }
    

</script>
    
<style scoped>
</style>
CinemaModal.vue
<template>
  
    <div class="container">

        <div class="modal" ref="refExampleModal" tabindex="-1" id="insertModal0" data-bs-backdrop="static">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">檔案上傳</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <!-- 內容 -->
                        <form action="/somewhere/to/upload" enctype="multipart/form-data">
                            <section class="main_top">
                                <section class="left">
                                    <CinemaPhotoSet :cinema="cinema"></CinemaPhotoSet>
                                    
                                </section>
                                <section class="middle">

                                    <ChinemaInforInsert v-model:cinema="cinema"></ChinemaInforInsert>
                                </section>
                                <section class="right">
                                    <textarea name="" id="" cols="30" rows="10" class="textBar" v-model="cinema.introduce"></textarea>
                                </section>
                            </section>

                            <div class="bar">
                                <label for="" class="lb">其他圖片:</label><input type="file" ref="fileInput" accept="image/gif, image/jpeg, image/png" multiple @change="handleFileChange" />
                            </div>

                            <section class="photos">
                              
                                <CinemaSubsInsert :images="images" @remove-image="removeImage"></CinemaSubsInsert>
                            </section>

                            <section class="allAuditorium">
 
                                <CinemaAuditoriumInsert></CinemaAuditoriumInsert>
                            </section>

                                <div>{{ cinema.value.name }}</div>
                                <div>{{ cinema.region }}</div>
                                <div>{{ cinema.address }}</div>
                                <div>{{ cinema.phoneNo }}</div>
                                <div v-for="img in cinema.images">{{ img.url }}</div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="doclick1" v-show="isShowInsertButton">新增</button>
                        <button type="button" class="btn btn-primary" @click="doclick2" v-show="!isShowInsertButton">修改</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
    
<script setup>
    import CinemaPhotoSet from './CinemaPhotoSet.vue';
    import ChinemaInforInsert from './ChinemaInforInsert.vue';
    import CinemaSubsInsert from './CinemaSubsInsert.vue'
    import CinemaAuditoriumInsert from './CinemaAuditoriumInsert.vue';

    import { ref, onMounted } from 'vue';
    import { defineProps } from 'vue';
    // 存储图片信息
const cinema=ref({
    
});
const fileInput = ref(null);

onMounted(() => {
  if (!fileInput.value) {
    console.error("fileInput reference is not initialized.");
  }
        modal.value = new bootstrap.Modal(refExampleModal.value);

    });

// 处理文件上传
function handleFileChange(event) {
    const files = Array.from(event.target.files); // 获取多个文件
    files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            cinema.images.value.push({
                file, // 保存文件对象
                url: e.target.result, // 保存预览 URL
            });
        };
        reader.readAsDataURL(file);
    });
}

// 删除图片
function removeImage(index) {
    cinema.images.value.splice(index, 1);

    // 重建文件列表
  const dataTransfer = new DataTransfer();
  cinema.images.value.forEach((image) => {
    dataTransfer.items.add(image.file);
  });

  // 更新文件输入框的文件列表
  fileInput.value.files = dataTransfer.files;
}

// 模拟提交表单
function handleUpload() {
    console.log('Submit form logic here');
}

const props = defineProps(["cinema", "isShowInsertButton"]);
    const emits = defineEmits(["insert", "update"]);
    
    function doclick1() {
        emits("insert");
        hideModal();
    }
    function doclick2() {
        emits("update");
        hideModal();
    }

    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"

    const refExampleModal = ref(null);
    const modal = ref(null);

    function showModal() {
        modal.value.show();
    }
    function hideModal() {
        modal.value.hide();
    }
    defineExpose({
        showModal, hideModal,
    });
</script>
    
<style scoped>

</style>
ChinemaInforInsert.vue:
<template>

    <div class="bar ">
        <label for="" class="lb" >影城名稱:</label><input type="text" placeholder="影城名稱" class="enterbar" :value="cinema.name" @input="doinput($event, 'name')">
    </div>
    <div class="bar">
        <label for="" class="lb ">影城區域:</label><input type="text" placeholder="影城區域" class="enterbar" :value="cinema.region" @input="doinput($event, 'region')">
    </div>
    <div class="bar">
        <label for="" class="lb">影城地址:</label><input type="text" placeholder="影城地址" class="enterbar" :value="cinema.address" @input="doinput($event, 'address')">
    </div>
    <div class="bar">
        <label for="" class="lb">連絡電話:</label><input type="text" placeholder="連絡電話" class="enterbar" :value="cinema.phoneNo" @input="doinput($event, 'phoneNo')">
    </div>

</template>
    
<script setup>
    import { defineProps } from 'vue';
    // 接收父组件传递的 `cinema` 和 `doinput` 方法
    const props = defineProps([
    "cinema",
    ]);
    const emits = defineEmits(["update:cinema"]);

    function doinput(event, key) {
        const data = {
            ...props.cinema,
            [key]: event.target.value
        };
        emits("update:cinema", data);
    }


</script>
    
<style scoped>
    .lb{
        font-size: 16px;
        line-height: 16px;
        vertical-align: middle;
        margin-left: 60px;
    }
   
    .enterbar{
        width: 240px;
        height: 30px;
    }
</style>
