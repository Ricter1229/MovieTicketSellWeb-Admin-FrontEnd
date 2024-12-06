<template>

    <div class="bar ">
        <label for="" class="lb" >影城名稱:</label><input type="text" placeholder="影城名稱" class="enterbar" :value="cinemaInput.name" @input="doinput('name', $event.target.value)">
    </div>
    <div class="bar">
        <label for="" class="lb ">影城區域:</label>
        <select name="" id="" class="enterbar"  :value="cinemaInput.region" @change="doinput('region', $event.target.value)">
            <option value="1">北</option>
            <option value="2">中</option>
            <option value="3">南</option>
            <option value="4">東</option>
        </select>
    </div>
    <div class="bar">
        <label for="" class="lb">影城地址:</label><input type="text" placeholder="影城地址" class="enterbar" :value="cinemaInput.address" @input="doinput('address', $event.target.value)">
    </div>
    <div class="bar">
        <label for="" class="lb">連絡電話:</label><input type="text" placeholder="連絡電話" class="enterbar" :value="cinemaInput.phoneNo" @input="doinput('phoneNo', $event.target.value)">
    </div>
    <div class="bar">
        <label for="" class="lb">經緯度:</label><input type="text" placeholder="經緯度" class="enterbar" :value="cinemaInput.position" @input="doinput('position', $event.target.value)">
    </div>
</template>
    
<script setup>
    import { defineProps,ref,watch,toRaw } from 'vue';
    const cinemaInput = ref('');
    // 接收父组件传递的 `cinema` 和 `doinput` 方法
    const props = defineProps([
    "cinema",
    ]);

    // 當 inputData 更新時，同步到 localInput
watch(
  () => props.cinema,
  (newVal) => {
    cinemaInput.value = { ...toRaw(newVal) }; 
  },
  { immediate: true, deep: true }
);


    const emits = defineEmits(["update-cinema"]);
    const doinput = (field, value) => {
  cinemaInput.value[field] = value; // 更新本地字段
  emits("update-cinema", { ...cinemaInput.value }); // 将更新数据发送到父组件
};

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