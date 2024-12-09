<template>
    <div class="box">
    <!-- 如果没有图像，显示添加图标 -->
    <div v-if="!photo.mainPhoto" class="add" @click="triggerFileInput">➕</div>

    <!-- 如果有图像，显示图像并允许重新上传 -->
    <img v-if="photo.mainPhoto" :src="photo.mainPhoto" alt="Image Preview" class="preview-image" @click="triggerFileInput" />

    <!-- 隐藏的文件选择框 -->
    <input type="file" ref="fileInput" class="theFile" accept="image/gif, image/jpeg, image/png" @change="handleFileChange" />
  </div>
  <!-- <div @click="test">teeeeeeest</div> -->
</template>
    
<script setup>
    import { ref,defineProps,watch } from 'vue';

// 用于保存上传的图像信息
// const image = ref(null);
const photo = ref({
  mainPhoto:"",
});
//清除圖片
const props = defineProps([
    "cinema",
    ]);

// function test(){
//   console.log(typeof(photo.value));
//   console.log(photo.value.mainPhoto);
// }

    // 當 inputData 更新時，同步到 localInput
watch(
  () => props.cinema,
  () => {
    photo.value.mainPhoto = props.cinema.mainPhoto; 
  },
  // { immediate: true, deep: true }
);
// 处理文件上传
const emits = defineEmits(["update-main-photo"]);

function handleFileChange(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
    
    photo.value.mainPhoto=e.target.result;
    console.log(photo.value.mainPhoto);
      emits("update-main-photo", photo.value);
    };
    
  }
  event.target.value = '';
};

// 点击图片或添加图标时触发文件输入框
function triggerFileInput() {
  const fileInput = document.querySelector('.theFile');
  fileInput.click();
}
</script>
    
<style scoped>
.box {

    height: 250px;
    width:  350px;
  text-align: center;
  position: relative;
}

.add {
  font: bold 100px Tahoma;
  color: #ccc;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.theFile {
    height: 250px;
    width:  350px;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
        .mainImg{
        height: 250px;
        width:  350px;
        }

</style>