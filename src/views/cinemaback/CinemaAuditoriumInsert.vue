<template>
    <section  class="oneauditorium" v-for="(aud, index) in allAuditoriums.auditoriums" :key="index">
        <section class="auditorium">
            <section class="oneAud">
                <label for="" class="lb">廳名稱: </label>
    
                <input type="text" :value="aud.auditoriumName" @change="doInput($event,index,'name')">

                
            </section>
            <input type="file" name="" id="" class="auditoriumSeat" accept="application/json"  @change="doInput($event,index,'json')">
        </section>
                    <button type="button" class="btn btn-danger delete" @click="deleteAuditorium(index)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
            
    </section>
    <button type="button" class="btn btn-light addBtn" @click="addAuditorium">➕</button>
    <!-- <div @click="test">json測試</div> -->
</template>
    
<script setup>
    import { ref,defineEmits,defineProps,watch,toRaw } from 'vue';
    const emits=defineEmits(["update-auditorium"]);
    const allAuditoriums = ref({
        auditoriums:[
            { auditoriumName: '', seat: {} }
        ]});
        
        const props = defineProps([
        "cinema",
        ]);
        // watch(
        //     () => props.cinema,
        //     () => {
        //         allAuditoriums.value.auditoriums = [...(props.cinema.auditoriums) ]; 
        //     },
        //     { immediate: true, deep: true }
        // );
        // function test(){
        //     console.log("json測試");
        //     console.log(props.cinema.auditoriums);
        //     console.log(typeof(props.cinema.auditoriums));
        // }
    const addAuditorium = () => {
        // 每次点击按钮，向 auditoriums 数组添加一个新的空对象
        allAuditoriums.value.auditoriums.push({ auditoriumName: '', seat: {} });
    };
    const deleteAuditorium = (index) => {
    // 删除指定索引的 auditorium
    allAuditoriums.value.auditoriums.splice(index, 1);
    emits("update-auditorium", allAuditoriums.value);
};
//向上傳值
function doInput(event, index,type){
    if(type==="json"){
        console.log("json");
        console.log(allAuditoriums.value.auditoriums[0].auditoriumName);
        const file=event.target.files[0];
        if(file){
            const reader=new FileReader;
            // reader.readAsDataURL(file);
            reader.onload=(e)=>{
                try {
                    const jsonContent = JSON.parse(e.target.result); // 解析 JSON
                    allAuditoriums.value.auditoriums[index].seat = jsonContent; // 更新对应影厅的座位数据
                    emits("update-auditorium", allAuditoriums.value); // 触发更新事件
                } catch (error) {
                    console.error("文件解析失败:", error);
                }
            };
            reader.readAsText(file);
        }
        event.target.value = '';
    }
    if(type==="name"){
        console.log("name");
        console.log(allAuditoriums.value.auditoriums[index].auditoriumName);
        allAuditoriums.value.auditoriums[index].auditoriumName=event.target.value;
        emits("update-auditorium", allAuditoriums.value);
    }
};
</script>
    
<style scoped>
    .auditorium{
        border: 2px dotted gray;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        border-radius: 5px;
        margin-bottom: 10px;
        position: relative;
        width: 400px;
    }

    .oneAud{
        margin-bottom: 10px;
    }
    .lb{
        margin-right: 10px;
    }
    .addBtn{
        margin-top: 40px;
        margin-bottom: 40px;

    }
    .auditoriumSeat{
        text-align: center;
        margin-left: 60px;
    }
    .oneauditorium{
        display: flex;
        align-items: center;
       
    }
    .delete{
        margin-left: 20px;
    }
</style>