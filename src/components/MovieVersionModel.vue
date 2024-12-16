<template>
    <div>
        <div class="modal fade" ref="movieVersionModalRef" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">選擇版本</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="version-box">
                            <div v-for="version in versions" :key="version.id">
                                <button class="oneVersion" v-if="!isSelect(version)" @click="chooseVersion(version)">{{ version.version }}</button>
                            </div>
                        </div>
                        <hr v-if="selectVersions.length != 0">
                        <div class="version-box" v-if="selectVersions.length != 0">
                            <div v-for="selectVersion in selectVersions" :key="selectVersion.id">
                                <button class="oneVersion" @click="deleteVersion(selectVersion)">{{ selectVersion.version }}</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="clear" class="btn btn-secondary" >清空</button>
                        <button type="button" @click="save" class="btn btn-primary">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { defineEmits, defineProps } from 'vue';
import axiosInstance from '@/utils/axiosInstance';

const emit = defineEmits(['updateVersions']);
const props = defineProps(["movieVersions"]);

const movieVersionModal = ref(null)
const movieVersionModalRef = ref(null)
const selectVersions = ref([])
const versions = ref([])
// 初始化 Modal
onMounted(() => {
    movieVersionModal.value = new bootstrapBundleMin.Modal(movieVersionModalRef.value);
    getVersionFromDB()
});

const openModal = () => {
    // 初始化 selectVersions
    if (Array.isArray(props.movieVersions) && props.movieVersions.length > 0) {
        // 将 { version: "IMAX" } 转换为 { id: null, name: "IMAX" }
        selectVersions.value = props.movieVersions.map((version) => {            
            return typeof version === "string"
                ? { id: null, version: version } // 如果是字符串格式化为对象
                : { id: version.id || null, version: version.version  || "" }; // 保留现有的对象结构
        });
    } else {
        selectVersions.value = []; // 如果没有数据，初始化为空数组
    }
    movieVersionModal.value.show()    
}

const getVersionFromDB = async () => {
    const response = await axiosInstance.get('/api/version/')
    versions.value = response.data.data
}

const chooseVersion = version => {
    selectVersions.value.push(version)
}

const isSelect = version => {
    return selectVersions.value.some((v) => v.id === version.id);
}

const deleteVersion = version => {
    const index = selectVersions.value.findIndex((v) => v.id === version.id );
    if (index !== -1) {
        selectVersions.value.splice(index, 1);
    } else {
        console.error('Version not found:', version);
    }
}

const clear = () => selectVersions.value = []

const save = () => {
    emit('updateVersions', selectVersions.value); // 更新父组件
    movieVersionModal.value.hide()    
}
defineExpose({
    openModal, clear
})

</script>

<style scoped>
.version-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px; /* 控制按钮之间的间距 */
    justify-content: flex-start;

}

.oneVersion {
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    width: fit-content;
    border-radius: 15px;
}

.btn {
    padding: 10px 15px; /* 增加按钮的内边距 */
    border-radius: 5px; /* 按钮圆角 */
}

</style>