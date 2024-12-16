<template>

    <!-- <div class="bar ">
        <label for="" class="lb" >影城名稱(只能包含中文、英文和數字):</label>
        <input type="text" placeholder="影城名稱,需大於2個字" class="enterbar" :value="cinemaInput.name" @input="doinput('name', $event.target.value)" @blur="doinput('name', $event.target.value)">
        <p class="error">{{ errors.name || ' ' }}</p>
    </div> -->
    <div class="form-floating mb-3 bar">
        <input type="text" placeholder="影城名稱,需大於2個字" class="form-control enterbar" id="floatingInput" :value="cinemaInput.name" @input="doinput('name', $event.target.value)" @blur="doinput('name', $event.target.value)" @change.prevent="callFind()">
        <label for="floatingInput">影城名稱(只能包含中文、英文和數字):</label>
        <p class="error">{{ errors.name || ' ' }}</p>
    </div>
    <!-- <div class="bar">
        <label for="" class="lb ">影城區域:</label>
        <select name="" id="" class="enterbar"  :value="cinemaInput.region" @change="doinput('region', $event.target.value)" @blur="doinput('region', $event.target.value)">
            <option value="1">北</option>
            <option value="2">中</option>
            <option value="3">南</option>
            <option value="4">東</option>
        </select>
        <p class="error">{{ errors.region || ' '}}</p>
    </div> -->
    <div class="form-floating sl bar">
        <select class="form-select enterbar" id="floatingSelectGrid" :value="cinemaInput.region" @change="doinput('region', $event.target.value)" @blur="doinput('region', $event.target.value)">
            <option value="1" selected>北</option>
            <option value="2" selected>中</option>
            <option value="3" selected>南</option>
            <option value="4" selected>東</option>
        </select>
        <label for="floatingSelectGrid">影城區域:</label>    
        <p class="error">{{ errors.region || ' '}}</p>
    </div>
    <!-- <div class="bar">
        <label for="" class="lb">影城地址(只能包含中文、英文和數字):</label>
        <input type="text" placeholder="影城地址，需大於6個字" class="enterbar" :value="cinemaInput.address" @input="doinput('address', $event.target.value)" @blur="doinput('address', $event.target.value)">
        <p class="error">{{ errors.address || ' ' }}</p>
    </div> -->
    <div class="form-floating mb-3 bar">
        <input type="text" placeholder="影城地址，需大於6個字" class="form-control enterbar" id="floatingInput" :value="cinemaInput.address" @input="doinput('address', $event.target.value)" @blur="doinput('address', $event.target.value)">
        <label for="floatingInput">影城地址(只能包含中文、英文和數字):</label>
        <p class="error">{{ errors.address || ' ' }}</p>
    </div>
    <!-- <div class="bar">
        <label for="" class="lb">連絡電話:</label><input type="text" placeholder="連絡電話，請輸入10碼數字" class="enterbar" :value="cinemaInput.phoneNo" @input="doinput('phoneNo', $event.target.value)" @blur="doinput('phoneNo', $event.target.value)">
        <p class="error">{{ errors.phoneNo || ' ' }}</p>
    </div> -->
    
    <div class="form-floating mb-3 bar">
        <input type="text" placeholder="連絡電話，請輸入10碼數字" class="form-control enterbar" id="floatingInput" :value="cinemaInput.phoneNo" @input="doinput('phoneNo', $event.target.value)" @blur="doinput('phoneNo', $event.target.value)">
        <label for="floatingInput">連絡電話:</label>
        <p class="error">{{ errors.phoneNo|| ' ' }}</p>
    </div>

    <!-- <div class="bar">
        <label for="" class="lb">經緯度(ex:22.221,121.5843):</label><input type="text" placeholder="經緯度，格式22~25,120~122" class="enterbar" :value="cinemaInput.position" @input="doinput('position', $event.target.value)" @blur="doinput('position', $event.target.value)">
        <p class="error">{{ errors.position || ' ' }}</p>
    </div> -->

    <div class="form-floating mb-3 bar">
        <input type="text" placeholder="連絡電話，請輸入10碼數字" class="form-control enterbar" id="floatingInput" :value="cinemaInput.position" @input="doinput('position', $event.target.value)" @blur="doinput('position', $event.target.value)">
        <label for="floatingInput">經緯度(格式22~25,120~122):</label>
        <p class="error">{{ errors.position|| ' ' }}</p>
    </div>
</template>
    
<script setup>
    import { defineProps,ref,watch,toRaw,onMounted } from 'vue';
    const cinemaInput = ref('');
    const errors = ref({});

//     onMounted(() => {

// });

// 接收父组件传递的 `cinema` 和 `doinput` 方法
const props = defineProps([
"cinema",
"validationFlag"
]);
//驗證,當flag傳進來就遍歷input
    watch(()=>props.validationFlag,
    ()=>{
        // console.log("2222")
  const fields = ['name', 'region', 'address', 'phoneNo', 'position'];
  fields.forEach(field => {
    validateField(field, cinemaInput.value[field] || '');
  });
    })
    //驗證規則
    const validateField = (field, value) => {
        switch (field) {
            case 'name':
                if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(value)|| value.length < 2) {
                    errors.value.name = '* 影城名稱需大於2個字';
                } else {
                    errors.value.name = '';
                }
                break;
            case 'region':
                if (!['1', '2', '3', '4'].includes(String(value))) {
                    errors.value.region = '* 請選擇有效的影城區域';
                    console.log("請選擇有效的影城區域",!['1', '2', '3', '4'].includes(value));
                    console.log("value",value)
                } else {
                    errors.value.region = '';
                }
                break;
            case 'address':
                if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(value) || value.length <= 6) {
                    errors.value.address = '* 影城地址需大於6個字，且只能包含中文、英文和數字';
                } else {
                    errors.value.address = '';
                }
                break;
            case 'phoneNo':
                if (!/^[0-9\-()#*\s]+$/.test(value) || value.length <= 10) {
                    errors.value.phoneNo = '* 連絡電話需大於10個字，且只能包含數字、()-#*和空格';
                } else {
                    errors.value.phoneNo = '';
                }
                break;
            case 'position':
                if (!/^2[2-5](\.\d+)?,12[0-2](\.\d+)?$/.test(value)) {
                    errors.value.position = '* 經緯度格式不正確，應為22~25,120~122的格式\n(ex:22.221,121.5843)';
                } else {
                    errors.value.position = '';
                }
                break;
            default:
                break;
        }
        emitValidationState(); 
    };
    const emitValidationState = () => {
        // console.log("執行")
        const hasErrors = Object.values(errors.value).some((err) => err !== '');
        emits("validation-state-infor", hasErrors); // 通知父组件验证状态
    };

    // 當 inputData 更新時，同步到 localInput
watch(
  () => props.cinema,
  (newVal) => {
    cinemaInput.value = { ...toRaw(newVal) }; 
  },
  { immediate: true, deep: true }
);


    const emits = defineEmits(["update-cinema","validation-state-infor"]);
    const doinput = (field, value) => {
  cinemaInput.value[field] = value; // 更新本地字段
  validateField(field, value); // 執行驗證
  emits("update-cinema", { ...cinemaInput.value }); // 将更新数据发送到父组件
};

</script>
    
<style scoped>
    .lb{
        font-size: 16px;
        line-height: 16px;
        vertical-align: middle;

    }
   .bar{
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
   }
    .enterbar{
        width: 300px;
        height: 30px;
    }
    .error {
    color: var(--error-color, red);
    font-size: 12px;
    width: 330px;
    margin-top: 4px;
    height: 6px;
}
</style>