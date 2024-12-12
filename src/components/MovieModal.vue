<template>
    <div ref="refExampleModal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">電影資料管理</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td class="fw-bold">電影名稱 :</td>
                                <td><input type="text" class="form-control" :value="movie.chineseName"
                                        @input="doinput($event, 'chineseName')"></td>
                            </tr>
                            <tr>
                                <td class="fw-bold">電影英文名稱 :</td>
                                <td><input type="text" class="form-control" :value="movie.englishName"
                                        @input="doinput($event, 'englishName')"></td>
                            </tr>
                            <tr>
                                <td class="fw-bold">卡司 :</td>
                                <td><textarea type="text" class="form-control" rows="3" :value="movie.cast"
                                        @input="doinput($event, 'cast')"></textarea></td>
                            </tr>
                            <tr>
                                <td class="fw-bold">上檔日期 :</td>
                                <td>
                                    <DatePicker
                                        v-model:value="releasedDate"
                                        type="date"
                                        format="YYYY-MM-DD"
                                        class="form-control"
                                        placeholder="請選擇上檔日期"
                                        @change="updateMinOutOfDate"
                                    /> 
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">下檔日期 :</td>
                                <td>
                                    <DatePicker
                                        v-model:value="outOfDate"
                                        type="date"
                                        format="YYYY-MM-DD"
                                        class="form-control"
                                        placeholder="請選擇下檔日期"
                                        :disabled-date="disableOutOfDate"
                                        @change="changeOutofDate"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">簡介 :</td>
                                <td><textarea class="form-control" rows="3" :value="movie.intro"
                                        @input="doinput($event, 'intro')"></textarea></td>
                            </tr>
                            <tr>
                                <td class="fw-bold">票價 :</td>
                                <td><input type="number" class="form-control" :value="movie.price"
                                        @input="doinput($event, 'price')"></td>
                            </tr>
                            <tr>
                                <td class="fw-bold">電影類型 :</td>
                                <td><input type="text" class="form-control" :value="movie.style"
                                        @input="doinput($event, 'style')"></td>
                            </tr>
                            <tr>
                                <td class="fw-bold">電影版本 :</td>
                                <td>
                                    <div v-if="movieVersions.length == 0">
                                        <input type="text" class="form-control" :value="movie.version"
                                            @click="clickOpenModal">
                                    </div>
                                    <div v-else class="version-box d-flex flex-wrap">
                                        <span v-for="movieVersion in movieVersions" @click="clickOpenModal" class="badge bg-info m-1">
                                            {{ movieVersion.version }}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">時長 :</td>
                                <td>
                                    <DatePicker
                                        v-model:value="runTime"
                                        type="time"
                                        format="HH:mm"
                                        class="form-control"
                                        value-type="format"
                                        placeholder="請選擇電影時長"
                                        @change="changeRunTime"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">預告片 :</td>
                                <td><input type="text" class="form-control" :value="movie.commercialFilmURL"
                                        @input="doinput($event, 'commercialFilmURL')"></td>
                            </tr>
                            <tr>
                                <td class="fw-bold">電影視覺圖 :</td>
                                <td>
                                    <input type="file" class="form-control" accept="image/gif, image/jpeg, image/png"
                                        @change="handleFileChange" ref="fileInputRef" >
                                    <img v-if="photo.mainPhoto" :src="photo.mainPhoto" alt="Image Preview" class="img-thumbnail mt-2">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                    <button type="button" class="btn btn-primary" @click="emits('insert')"
                        v-show="isShowInsertButton">新增</button>
                    <button type="button" class="btn btn-primary" @click="emits('update')"
                        v-show="!isShowInsertButton">修改</button>
                </div>
            </div>
        </div>
    </div>
    <MovieVersionModel ref="movieVersionModalRef"  v-model:movieVersions="movieVersions" @updateVersions="handleUpdateVersions"></MovieVersionModel>
</template>


<script setup>
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
import { onMounted, ref } from 'vue';

import MovieVersionModel from "./MovieVersionModel.vue";
const movieVersionModalRef = ref(null)
const movieVersions = ref([])
const clickOpenModal = () => {
    if (modal.value) {
        modal.value.hide(); // 尝试关闭前一个模态框
    } else {
        console.log("failed");
    }
    movieVersionModalRef.value.clear()
    movieVersionModalRef.value.openModal();
}
const handleUpdateVersions = (versions) => {
    showModal()
    movieVersions.value = versions
    
    const data = {
        ...props.movie,
        ['movieVersions']: movieVersions
    };
    emits("update:movie", data);
}

const props = defineProps(["movie", "isShowInsertButton"]);
const emits = defineEmits(["update:movie", "insert", "update"]);
const minOutOfDate = ref(null)
// 日期
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import dayjs from "dayjs";

const releasedDate = ref(null)
const outOfDate = ref(null)

const updateMinOutOfDate = (date) => {
    const formatDate = dayjs(date).format('YYYY-MM-DD');
    minOutOfDate.value = formatDate;
    if (outOfDate.value && outOfDate.value < releasedDate.value) {
        outOfDate.value = null; // 清空无效的下档日期
    }
    minOutOfDate.value = formatDate
    const data = {
        ...props.movie,
        ['releasedDate']: formatDate
    };
    emits("update:movie", data);
};
// 动态禁用早于上档日期的日期
const disableOutOfDate = (date) => {
    return releasedDate.value && date < new Date(releasedDate.value);
};
const changeOutofDate = date => {
    const formatDate = dayjs(date).format('YYYY-MM-DD');
    minOutOfDate.value = formatDate
    const data = {
        ...props.movie,
        ['outOfDate']: formatDate
    };
    emits("update:movie", data);
}
// 時長
const runTime = ref(null)
const changeRunTime = time => {
    const data = {
        ...props.movie,
        ['runTime']: time
    };
    emits("update:movie", data);
}


function doinput(event, key) {

    const data = {
        ...props.movie,
        [key]: event.target.value
    };
    emits("update:movie", data);
}
const refExampleModal = ref(null);
const modal = ref(null);
const fileInputRef = ref(null)
const init = () => {
    movieVersions.value = []
    releasedDate.value = null
    outOfDate.value = null
    minOutOfDate.value = null
    runTime.value = null
    if (photo.value) {
        photo.value.mainPhoto = ""; // 清空图片
    } else {
        console.warn("photo is not initialized");
    }
    if (fileInputRef.value) {
        fileInputRef.value.value = ""; // 清空文件输入框的值
    }
}
const updateFirstAssignment = () => {
    if (props.movie.runTime) {
        runTime.value = props.movie.runTime; // 设置初始值
    }
    if (props.movie.releasedDate) {
        releasedDate.value = new Date(props.movie.releasedDate) // 设置初始值
    }
    if (props.movie.outOfDate) {
        outOfDate.value = new Date(props.movie.outOfDate)  // 设置初始值
    }
    if (props.movie.mimeType && props.movie.photo) {
        photo.value.mainPhoto = `${props.movie.mimeType}${props.movie.photo}`  // 设置初始值
    }    
    if(props.movie.movieVersionBeans.length != 0) {
        movieVersions.value = props.movie.movieVersionBeans.map((versionBean) => ({
            id: versionBean.versionBean.id,
            version: versionBean.versionBean.version,
        })); // 深拷贝
    }
}

onMounted(function () {
    modal.value = new bootstrap.Modal(refExampleModal.value, {backdrop: 'static'});
    
});
function showModal() {
    modal.value.show();
}
function hideModal() {
    modal.value.hide();
}
defineExpose({
    showModal, hideModal, init, updateFirstAssignment
});



const photo = ref({
    mainPhoto: "",
});

function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            photo.value.mainPhoto = e.target.result;
            const data = {
                ...props.movie,
                ["photo"]: photo.value.mainPhoto
            };
            emits("update:movie", data);
        };
    }
};
</script>

<style scoped>
.version-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.img-thumbnail {
    max-height: 200px;
    object-fit: cover;
}

table {
    width: 100%;
}

td:first-child {
    width: 30%;
}

</style>