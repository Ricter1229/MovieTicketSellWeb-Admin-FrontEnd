<template>
    
            <div class="preview-item" v-for="(photo, index) in props.storeSubPhotoDtos" :key="index" @change="checkPhoto" >
                <img :src="photo.photo" alt="Uploaded Image" class="subImg" />
                <button @click.prevent="$emit('remove-image',index)" class="remove-btn">Remove</button>
            </div>
    <!-- <div @click="test">圖片測試</div> -->
</template>
    
<script setup>
import { defineProps,watch,defineEmits } from 'vue';

// 接收父组件传递的属性
const props=defineProps(['storeSubPhotoDtos',"validatePhoto"]);
const emits = defineEmits(["validation-state-subphoto"]);
// function test(){
//     // console.log(image);
//     console.log(props.storeSubPhotoDtos);
// }
watch(()=>props.storeSubPhotoDtos,
function checkPhoto(){
    // console.log("sub");
  const hasError=validatePhotos();
//   console.log("hasError",hasError);
    emits("validation-state-subphoto", hasError);
})
watch(()=>props.validatePhoto,
function checkPhoto(){
    // console.log("sub");
  const hasError=validatePhotos();
//   console.log("hasError",hasError);
    emits("validation-state-subphoto", hasError);
})
function validatePhotos() {
    // console.log("props.storeSubPhotoDtos",props.storeSubPhotoDtos);
    if(props.storeSubPhotoDtos==undefined){
        return true;
    }
  if (props.storeSubPhotoDtos.length<3) {
    return true;
  } else {
    return false;
  }
}
</script>
    
<style scoped>
    .subImg{
        height: 170px;
        width:  250px;
        margin-bottom: 20px;
        margin-right: 20px;
    }
    .preview-item{
        position: relative;
    }
    .remove-btn{
        position: absolute;
        right: 30px;
        top:10px;
    }
</style>