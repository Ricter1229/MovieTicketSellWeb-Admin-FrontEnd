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
                                    <!-- <img src="@/assets/images/1.jpg" alt="" class="mainImg">
                                    <input type="file" name="" id="" class="mainChoo"> -->
                                    <CinemaPhotoSet :cinema="cinema" :validationFlag="validationFlag" @update-main-photo="receiveData" @validation-state-mainphoto="handleValidationStateMain" :key="cinemaMainphotoKey"></CinemaPhotoSet>
                                    
                                </section>
                                <section class="middle">
                                    <!-- <div class="bar ">
                                        <label for="" class="lb">影城名稱:</label><input type="text" placeholder="影城名稱" class="enterbar">
                                    </div>
                                    <div class="bar">
                                        <label for="" class="lb ">影城區域:</label><input type="text" placeholder="影城區域" class="enterbar">
                                    </div>
                                    <div class="bar">
                                        <label for="" class="lb">影城地址:</label><input type="text" placeholder="影城地址" class="enterbar">
                                    </div>
                                    <div class="bar">
                                        <label for="" class="lb">連絡電話:</label><input type="text" placeholder="連絡電話" class="enterbar">
                                    </div>
                                    -->
                                    <ChinemaInforInsert :cinema="cinema" :key="cinemaInforInsertKey" @update-cinema="receiveData" @validation-state-infor="handleValidationStateInfor" :validationFlag="validationFlag"></ChinemaInforInsert>
                                </section>
                                <section class="right" >
                                    <textarea name="introduce" id="introduce" cols="30" rows="10" class="textBar" v-model="receiveCinema.introduce" @input="handleInputChange"  @blur="handleInputChange" :class="{ 'is-invalid': errorsIntro.introduce }" placeholder="需大於20個字"></textarea>
                                    <p class="error" :key="cinemaTextAreaKey">{{ errorsIntro.introduce|| ' '  }}</p>
                                </section>
                            </section>

                        
                            
                                <!-- <label for="" class="lb">其他圖片:</label><input type="file" placeholder="其他圖片" class="enterbar">
                        -->

                              <!-- 文件选择器 -->
                               <div class="subPhoto" >

                                   <div class="bar">
                                       <!-- <label for="" class="lb">其他圖片:</label> -->
                                       <input type="file" class="subsInput" ref="fileInput" accept="image/gif, image/jpeg, image/png" multiple @change="handleFileChange" @blur="validatePhoto" @click="validatePhoto"/>
                                    </div>
                                    <button @click.prevent="clickSubsInput" class="subsInputBtn">上傳輔視覺圖</button>
                                   <p class="error" :key="cinemaSubPhotoKey" >{{errorsIntro.subphoto|| ' '  }}</p>

                               </div>

                            <section class="storeSubPhotoDtos">
                              
                                <CinemaSubsInsert :storeSubPhotoDtos="receiveCinema.storeSubPhotoDtos" @remove-image="removeImage" :validatePhoto="validationBlurFlag" @validation-state-subphoto="handleValidationSubPhoto"></CinemaSubsInsert>
                            </section>

                            <section class="allAuditorium">
                        
                                <!-- <section class="auditorium">
                                    <section class="oneAud">
                                        <label for="">廳名稱: </label>

                                        <input type="text">
                                    </section>
                                    <input type="file" name="" id=""  class="auditoriumSeat">
                                    <section class="btns">
                                        <button class="edit">edit</button>
                                        <button class="delete">delete</button>
                                    </section>
                                </section>

                                <section class="auditorium">
                                    <section class="oneAud">
                                        <label for="">廳名稱: </label>

                                        <input type="text">
                                    </section>
                                    <input type="file" name="" id=""  class="auditoriumSeat">
                                    <section class="btns">
                                        <button class="edit">edit</button>
                                        <button class="delete">delete</button>
                                    </section>
                                </section> -->
                                <!-- <button  class="addBtn">➕</button> -->
                                <CinemaAuditoriumInsert :key="cinemaAuditoriumKey" :cinema="cinema" @update-auditorium="receiveData"></CinemaAuditoriumInsert>
                            </section>

                            
                            <!-- test -->
                                <!-- <div>{{ receiveCinema.name }}</div>
                                <div>{{ receiveCinema.region }}</div>
                                <div>{{ receiveCinema.address }}</div>
                                <div>{{ receiveCinema.phoneNo }}</div>
                                <div>{{ receiveCinema.introduce }}</div>
                                <div v-for="img in receiveCinema.storeSubPhotoDtos">{{ img.url }}</div> -->
                                <!-- <div @click="infor">顯示</div> -->
                            <!-- test -->
                        </form>
                        
                    <!--  -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="doclick1" v-show="isShowInsertButton"  >新增</button>
                        <button type="button" class="btn btn-primary" @click="doclick2(receiveCinema.storeId)" v-show="!isShowInsertButton"  :validationFlag="validationFlag">修改</button>
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
    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
    import Swal from 'sweetalert2';
    import axios from 'axios';
    import { ref, onMounted,defineProps,nextTick,watch,toRaw, defineEmits } from 'vue';
    const fileInput = ref(null);
       // 存储图片信息
       const receiveCinema=ref({
    storeId:null,
    name: "",
    region: null,
    address: "",
    phoneNo: "",
    introduce: "",
    position: "",
    storeSubPhotoDtos: [],
    mainPhoto:"",
    // auditoriumName: '',
    // seat: {},
    });
    const props = defineProps(["cinema", "isShowInsertButton"]);
    //驗證
    // const hasValidationErrors = ref(true); // 控制按钮的禁用状态
   
   const validationFlag=ref(false);
   const validationBlurFlag=ref(false);
    const errorsIntro = ref({
  "introduce": '',
  "subphoto":'',
});
    const errors=ref({
        infor:false,
        mainPhoto:false,
        intro:false,
        subPhoto:false,
    });
//圖片input驗證觸發
    function validatePhoto() {
        errorsIntro.value.subphoto = "* 請上傳至少3張圖片";
        validationBlurFlag.value=!validationBlurFlag.value;
        
        console.log("validationBlurFlag.value",validationBlurFlag.value);
}
// 验证内容是否大于20字
const validateIntroduce = () => {
    console.log("receiveCinema.value.introduce",receiveCinema.value.introduce);
    if(receiveCinema.value.introduce==undefined){
        return errorsIntro.value.introduce = '* 介紹內容需大於20個字';
    }
  if (receiveCinema.value.introduce.length <= 20) {
    errorsIntro.value.introduce = '* 介紹內容需大於20個字';
  } else {
    errorsIntro.value.introduce = '';
  }
};

// 用于验证表单
const validateForm = () => {
  validateIntroduce(); // 调用验证函数
  if(errorsIntro.value.introduce!=''){
    errors.value.intro=true;
  }else{
    errors.value.intro=false;
  }
};
watch(()=>validationFlag,
    ()=>{
        console.log("2222")
        validateIntroduce();
  });


const handleInputChange = () => {
    console.log("114514");
//   validateIntroduce(); // 每次输入变化时验证
  validateForm();
};
// 子组件的验证状态回调
const handleValidationStateInfor = (hasErrors) => {
    // hasValidationErrors.value = hasErrors;
    errors.value.infor=hasErrors;
    // console.log("hasErrors",hasErrors)
    // console.log("hasValidationErrors.value",hasValidationErrors.value)
};

const handleValidationStateMain = (hasErrors) => {
    // hasValidationErrors.value = hasErrors;
    errors.value.mainPhoto=hasErrors;
    console.log("hasErrors",hasErrors)
    // console.log("hasValidationErrors.value",hasValidationErrors.value)
};

const handleValidationSubPhoto = (hasErrors) => {
        
//       if (hasErrors == true) {
//     errorsIntro.value.subphoto = "* 請上傳至少3張圖片";
//   } else {
//     errorsIntro.value.subphoto = ""; // 如果有图片，清除错误信息
//   }
  if (hasErrors == false) {
    errorsIntro.value.subphoto = ""; // 如果有图片，清除错误信息
  } 
    errors.value.subPhoto=hasErrors;
    console.log("hasErrors",hasErrors)
    // console.log("hasValidationErrors.value",hasValidationErrors.value)
};

    // 控制 Cinema組件重置 的 key
const cinemaAuditoriumKey = ref(0);
const cinemaInforInsertKey = ref(0);
const cinemaTextAreaKey = ref(0);
const cinemaMainphotoKey=ref(0);
const cinemaSubPhotoKey=ref(0);
// 控制 Cinema組件重置 的 事件
function resetCinemaAuditorium() {
  cinemaAuditoriumKey.value++; // 修改 key，触发子组件重建
  console.log("cinemaAuditoriumKey.value",cinemaAuditoriumKey.value);
}
function resetCinemaInforInsert() {
  cinemaInforInsertKey.value++; // 修改 key，触发子组件重建
  console.log("cinemaInforInsertKey.value",cinemaInforInsertKey.value);
}
function resetCinemaMainphotoKey() {
    cinemaMainphotoKey.value++; // 修改 key，触发子组件重建
  console.log("cinemaInforInsertKey.value",cinemaInforInsertKey.value);
}
function resetCinemaSubPhotoKey() {
    cinemaSubPhotoKey.value++; // 修改 key，触发子组件重建
  console.log("cinemaSubPhotoKey.value",cinemaInforInsertKey.value);
}

    onMounted(() => {
        nextTick(() => {
            if (!fileInput.value) {
                console.error("fileInput reference is not initialized.");
            }
            modal.value = new bootstrap.Modal(refExampleModal.value);
        });
        const modalElement = refExampleModal.value;
        if (modalElement) {
            modalElement.addEventListener('hide.bs.modal', () => {
                // 清空文件輸入框的值
                if (fileInput.value) {
                    fileInput.value.value = '';
                }
                // 清空文件的數據
                receiveCinema.value.storeSubPhotoDtos = [];
                receiveCinema.value={};
                
                cinemaTextAreaKey.value++;
                console.log("cinemaTextAreaKey.value",cinemaTextAreaKey.value);
                errorsIntro.value.introduce="";
                errorsIntro.value.subphoto="";
                console.log("errorsIntro.value.subphoto",errorsIntro.value.subphoto);
                resetCinemaAuditorium();
                resetCinemaInforInsert();
                resetCinemaMainphotoKey();
                resetCinemaSubPhotoKey();
            });
         
        }
        
        
    });
 
 

    // 監聽 props.cinema 的變化
    watch(
    () => props.cinema, // 監聽目標
    (newCinema) => {
        receiveCinema.value = Object.assign(receiveCinema.value, newCinema); // 賦值
    },
    { immediate: true } // 初始化時立即執行一次
    );

    const receiveData=(newData)=>{
        console.log('B 組件接收到來自 C 的更新數據：', newData);
        console.log(typeof(newData));
        Object.assign(receiveCinema.value, newData);
        console.log('cinema obj資訊');
        console.log(JSON.stringify(receiveCinema.value, null, 2));
    }
    
   


function clickSubsInput(){
    const subsInput=document.querySelector(".subsInput");
    subsInput.click();
}

    // 处理文件上传
    function handleFileChange(event) {
        const files = Array.from(event.target.files); // 获取多个文件
        const imagesBase64 = [];
        if(files.length!=0){

            files.forEach((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
            // const base64String = e.target.result; // 取得 Base64 字符串
                const base64String = e.target.result;
                // const base64Data = base64String.substring(21);
            
                imagesBase64.push({
                    photo: base64String, // Base64 編碼
                    file, // 原始文件
                });
                console.log(imagesBase64);
                // 更新到 receiveCinema
                // Object.assign(receiveCinema.value.storeSubPhotoDtos, imagesBase64);
                receiveCinema.value.storeSubPhotoDtos = [...imagesBase64];
                console.log(receiveCinema.value.storeSubPhotoDtos);
            };
                
            });
        }
        validatePhoto();
        
    }

    // 删除图片
    function removeImage(index) {
    
    callRemove(index);
    
    //     // 重建文件列表
    // const dataTransfer = new DataTransfer();
    // receiveCinema.value.storeSubPhotoDtos.forEach((image) => {
    //     dataTransfer.items.add(image.file);
    // },
    // );

    // // 更新文件输入框的文件列表
    // fileInput.value.files = dataTransfer.files;
    }

 


    const emits = defineEmits(["insert", "update","find"]);
    
    function doclick1() {
        validationFlag.value=!(validationFlag.value);
        //textarea呼叫驗證
        validateForm();
        validatePhoto();
        setTimeout(()=>{
            if(errors.value.infor==false &&
            errors.value.mainPhoto==false&&
            errors.value.intro==false&&
            errors.value.subPhoto==false
            ){

                callInsert();
                hideModal();
            }
        },500)
        
    }
    function doclick2(storeId) {
        validationFlag.value=!(validationFlag.value);
        //textarea呼叫驗證
        validateForm();
        validatePhoto();
        console.log('validationFlag.value',validationFlag.value);
        setTimeout(()=>{
            if(errors.value.infor==false&&
            errors.value.mainPhoto==false&&
            errors.value.intro==false&&
            errors.value.subPhoto==false
            ){

                callModify(storeId);
                hideModal();
            }
    },500)
    }

    
    //modal顯示邏輯
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



    async function callRemove(index) {
        console.log("callRemove");
            const result = await Swal.fire({
                title: "確定刪除嗎？",
                showCancelButton: true,
            });
            if(result.isConfirmed) {
                receiveCinema.value.storeSubPhotoDtos.splice(index, 1);
                Swal.fire({
                    title: "Loading.....",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                Swal.fire({
                    icon: "success",
                    title: "處理完成",
                });
                // try {
                //     const response = await axios.delete(`http://localhost:8080/store/subphoto/delete/${id}`);
                //     if(response.data.success) {
                        
                //     } else {
                //         Swal.fire({
                //             icon: "warning",
                //             title: response.data.message,
                //         });
                //     }
                // } catch(error) {
                //     Swal.fire({
                //         icon: "error",
                //         title: "刪除失敗:"+ error.message,
                //     });
                // }
            }
        }

    async function callModify(storeId) {
            console.log("callModify");
            Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            try {
                const rawData = toRaw(receiveCinema.value);
                const response = await axios.put(`http://localhost:8080/store/update/${storeId}`, rawData);
                if(response.data.success) {
                    Swal.fire({
                        icon: "success",
                        title: response.data.message,
                    }).then(
                        ()=>{
                            emits("find");
                        }
                    );
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

     async function callInsert() {
    
            Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            const rawData = toRaw(receiveCinema.value);

            axios.post("http://localhost:8080/store/insert", rawData).then(function(response) {
                
                
                // setTimeout(function() {
                //     // cinemas.value=response.data.list;
                    console.log(response.data.list);
                //     Swal.close();
                // }, 500);
                if(response.data.success) {
                    Swal.fire({
                        icon: "success",
                        title: response.data.message,
                    }).then(() => {
                // 触发一个自定义事件，通知父组件执行 callFind
                emits("find");  // 'find' 是父组件处理该事件的自定义事件名称
            });
                }
            }).catch(function(error) {
                console.log("error", error);
                Swal.fire({
                    icon: "error", //success, error, warning, info, question,,,,
                    title: "新增失敗",
                });
            });
        }
</script>
    
<style scoped>
    form{
        width: auto;
    }
    .main_top{
        margin-top: 10px;
        display: flex;
        padding: 10px;
    }

    .left{
            flex:1 1 180px ;
            text-align: center;
            padding: 20px 0px 10px 0px;
            margin-top: 40px;
            margin-right: 10px;
    }
    .middle{
        flex: 1.5 1 450px;
        display: flex;
        /* flex-direction: column;
        align-items: center; */
        flex-wrap: wrap;

        padding: 10px 0px 20px 0px;
    }
    .right{
        flex: 0.8 1 200px;
        padding: 20px 20px 10px 00px;
        
    }
    .subsInput{
        position: absolute;
        opacity: 0;
    }
    .subsInputBtn{
        margin-top: 10px;
    }
    .allAuditorium{
        margin: 40px 0px 40px 130px;
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 400px;
    }



    .storeSubPhotoDtos{
        display: flex;
        flex-wrap: wrap;
        margin: 10px 0px 0px 180px;
        border: 2px dotted gray;
        padding: 20px 0px 20px 20px;
        float: left;
        width: 840px;
        height:  auto;
    }

    .textBar{
        height: 350px;
        width:  380px;
    }
    .lb{
        font-size: 16px;
        line-height: 16px;
        vertical-align: middle;
        margin-right: 20px;
    }
   .bar{
    text-align: center;
   }
    .enterbar{
        width: 240px;
        height: 30px;
    }
    .error {
    color: var(--error-color, red);
    font-size: 12px;
    width: 330px;
    margin-top: 4px;
    height: 6px;
    text-align: center;
}
.subPhoto{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>