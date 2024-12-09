<template>
    <div ref="refExampleModal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Movie</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table>
                    <tbody>
                        <tr>
                            <td>電影名稱 : </td>
                            <td><input type="text" :value="movie.chineseName" @input="doinput($event, 'chineseName')"></td>
                        </tr>
                        <tr>
                            <td>電影英文名稱 : </td>
                            <td><input type="text" :value="movie.englishName" @input="doinput($event, 'englishName')"></td>
                        </tr>
                        <tr>
                            <td>卡司 : </td>
                            <td><input type="text" :value="movie.cast" @input="doinput($event, 'cast')"></td>
                        </tr>
                        <tr>
                            <td>上檔日期 : </td>
                            <td><input type="text" :value="movie.releasedDate" @input="doinput($event, 'releasedDate')"></td>
                        </tr>
                        <tr>
                            <td>下檔日期 : </td>
                            <td><input type="text" :value="movie.outOfDate" @input="doinput($event, 'outOfDate')"></td>
                        </tr>
                        <tr>
                            <td>簡介 : </td>
                            <td><input type="text" :value="movie.intro" @input="doinput($event, 'intro')"></td>
                        </tr>
                        <tr>
                            <td>票價 : </td>
                            <td><input type="text" :value="movie.price" @input="doinput($event, 'price')"></td>
                        </tr>
                        <tr>
                            <td>電影類型 : </td>
                            <td><input type="text" :value="movie.style" @input="doinput($event, 'style')"></td>
                        </tr>
                        <tr>
                            <td>時長 : </td>
                            <td><input type="text" :value="movie.runTime" @input="doinput($event, 'runTime')"></td>
                        </tr>
                        <tr>
                            <td>預告片 : </td>
                            <td><input type="text" :value="movie.commercialFilmURL" @input="doinput($event, 'commercialFilmURL')"></td>
                        </tr>
                        <tr>
                            <td>電影視覺圖 : </td>
                            <td><input type="file" :value="movie.photo" @input="doinput($event, 'photo')"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="emits('insert')" v-show="isShowInsertButton">新增</button>
                <button type="button" class="btn btn-primary" @click="emits('update')" v-show="!isShowInsertButton">修改</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
 const props = defineProps(["movie", "isShowInsertButton"]);
const emits = defineEmits(["update:movie", "insert", "update"]);
function doinput(event, key) {
    const data = {
        ...props.movie,
        [key]: event.target.value
    };
    emits("update:movie", data);
}
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { onMounted, ref } from 'vue';
const refExampleModal = ref(null);
const modal = ref(null);
onMounted(function() {
    modal.value = new bootstrap.Modal(refExampleModal.value);
});
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

<style>

</style>