<template>
    <!-- <div v-if="!isDeleting" @click="toggle('editing')" class="addButton">
        {{ isEditing ? "結束編輯" : "編輯廣告" }}
    </div> -->
        <!-- <div v-if="!isEditing" @click="toggle('deleting')" class="addButton">
        {{ isDeleting ? "退出刪除" : "進行刪除" }}    </div> -->
    <div class="form-check form-switch form-check-reverse" v-if="!isDeleting">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckReverse"   @click="toggle('editing')">
  <label class="form-check-label" for="flexSwitchCheckReverse"> {{ isEditing ? "結束編輯" : "編輯廣告" }}</label>
</div>
<div class="form-check form-switch form-check-reverse" v-if="!isEditing">
<input class="form-check-input" type="checkbox" id="flexSwitchCheckReverse"   @click="toggle('deleting')">
<label class="form-check-label" for="flexSwitchCheckReverse"> {{ isDeleting ? "退出刪除" : "進行刪除" }}</label>
</div>

    <div @click="insertAds" class="addButton" v-if="isEditing">新增廣告</div>
    <button type="button" class="btn btn-outline-danger bt"  @click.prevent="callDelete" v-if="isDeleting">刪除</button>

    <button type="button" class="btn btn-outline-success bt" @click.prevent="doUpdate" v-if="isEditing">保存</button>



    <section class="ads">
        
        <input class="upload" type="file" accept="image/gif, image/jpeg, image/png" multiple @input="handleFileChange" />
        <VueDraggableNext v-model="StoreAdsPhotoDtos" @end="updateOrder" :disabled="!isEditing">
            <div class="preview-item" v-for="(adPhoto, index) in StoreAdsPhotoDtos" :key="adPhoto.sortId">
                        <img :src="adPhoto.photo" v-if="adPhoto" alt="Uploaded Image" class="adImg" @click="a"/>
                        <input type="checkbox" :id="'checkbox-' + adPhoto.id" v-model="selectedIds" :value="adPhoto.id" v-if="isDeleting"/>
            </div>
        </VueDraggableNext>
    </section>


    <!-- <div @click="test">圖片測試</div> -->
  </template>
  
  <script setup>
  import { onMounted, ref,watch } from 'vue';
  import Swal from 'sweetalert2';
  import axios from 'axios';
  import { VueDraggableNext } from 'vue-draggable-next';
  const selectedIds = ref([]);
  function a(){
    console.log("StoreAdsPhotoDtos",StoreAdsPhotoDtos.value);
    console.log("selectedIds",selectedIds.value);
  }
  const isEditing = ref(false);
  const isDeleting = ref(false);
  const dataChange = ref(false);
  watch(()=>dataChange.value,()=>{
    callFind();
  },
  { deep: true }
    )

  function toggle(method) {
    Swal.fire({
                    title: "Loading.....",
                    showConfirmButton: false,
                    allowOutsideClick: false,
    });
    if(method==="editing"){
        isEditing.value = !isEditing.value;
        if(isEditing.value==false){
            console.log("dataChange.value",dataChange.value);
            console.log("!dataChange.value",!dataChange.value);
            dataChange.value=!dataChange.value;
        }
    }else if(method==="deleting"){
        isDeleting.value = !isDeleting.value;
       
    }
    setTimeout(()=>{
        Swal.close();

    },300);
}

  const StoreAdsPhotoDtos = ref([]);
  
  const updateOrder = async () => {
    const newOrder = StoreAdsPhotoDtos.value.map((StoreAdsPhotoDto, index) => ({
      id: StoreAdsPhotoDto.id,
      photo:StoreAdsPhotoDto.photo,
      sortId: index,
    }));
    StoreAdsPhotoDtos.value=newOrder;
    console.log("更新順序StoreAdsPhotoDtos",StoreAdsPhotoDtos.value);
    console.log('更新順序：', newOrder);
  };

  onMounted(()=>{
    callFind();
    console.log("StoreAdsPhotoDtos",StoreAdsPhotoDtos);
  })

  function insertAds(){
    console.log("a");
    const upload=document.querySelector(".upload");
    console.log("upload",upload);
    upload.click();
  }
  function callDelete(){
    console.log("刪除");
    callRemove();

  }

  async function callRemove() {
        console.log("callRemove");
            const result = await Swal.fire({
                title: "確定刪除嗎？",
                showCancelButton: true,
            });
            if(result.isConfirmed) {
                const rawData = {
                    ads: selectedIds.value,
                };
                console.log("rawData",rawData);
                Swal.fire({
                    title: "Loading.....",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                try {
                    const response = await axios.delete(`http://localhost:8080/storeads/deleteadds`,{
                data: rawData,
            });
                    if(response.data.success) {
                        console.log("刪除完更新");
                        callFind();
                        Swal.fire({
                            icon: "success",
                            title: response.data.message,
                        })
                        .then(() => {
                            updateOrder();
                            setTimeout(()=>{
                                callUpdate();

                            },300);

                            
                            dataChange.value=!dataChange;
                   
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

  async function callFind() {

            Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
      
            axios.get("http://localhost:8080/storeads/allads").then(function(response) {

                console.log("response.data.success", response.data.success);
                if(response.data.success){
                    StoreAdsPhotoDtos.value=response.data.list;
                    setTimeout(function() {
                        console.log(response.data.list)
                        console.log("StoreAdsPhotoDtos.value111", StoreAdsPhotoDtos.value);
                        Swal.close();
                    }, 800);
                }
            }).catch(function(error) {
                console.log("error", error);
                Swal.fire({
                    icon: "error", //success, error, warning, info, question,,,,
                    title: "查詢失敗:"+ error.message,
                });
            });
        }

  async function callUpdate() {
    
    Swal.fire({
        title: "Loading.....",
        showConfirmButton: false,
        allowOutsideClick: false,
    });
    console.log('新增的StoreAdsPhotoDtos.value',StoreAdsPhotoDtos.value);
    const rawData = {
        ads: StoreAdsPhotoDtos.value,
    };
    console.log('新增：');
    console.log('rawData',rawData);
     await axios.put("http://localhost:8080/storeads/update", rawData).then(function(response) {
        // console.log('axiosrawData',rawData);
        
    
            console.log("response.data.list",response.data.list);

        if(response.data.success) {
            dataChange.value=!dataChange;
            Swal.fire({
                icon: "success",
                title: response.data.message,
            })
        }else{
            Swal.fire({
                icon: "error",
                title: response.data.message,
            })
        }
    }).catch(function(error) {
        console.log("error", error);
        Swal.fire({
            icon: "error", //success, error, warning, info, question,,,,
            title: "新增失敗",
        });
    });
}
async function doUpdate() {

    callUpdate();
    setTimeout(()=>{

        callFind();
    },500);

}

    function handleFileChange(event) {
        const files = Array.from(event.target.files); // 获取多个文件
        console.log("執行了");
        if(files.length!=0){

            files.forEach((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    StoreAdsPhotoDtos.value.push({
                        id:null,
                        photo:e.target.result,
                        sortId:StoreAdsPhotoDtos.value.length,
                    }),
                    console.log();
            };
                
            }
        );
        }   
        
    }
  
    
  </script>
  <style>
  .bt{
    float: right;
    margin: 10px 40px 0px 0px;
  }
    .adImg{
        width: 900px;
        height: 300px;
        margin-top: 10PX;
        
    }
    .addButton{
        display: block;
        height:50px;
        background-color: gray;
        text-align: center;
        line-height: 80px;
    }
    template{
        background-color: black;
    }
    .upload{
        opacity: 0;
        position: absolute;
        z-index: -1;
    }
    .ads{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 60px;
        margin-bottom: 60px;
    }
</style>