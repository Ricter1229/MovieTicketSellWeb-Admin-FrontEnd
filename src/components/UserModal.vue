<template>
    <div ref="refExampleModal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">User</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table>
                        <tbody>
                            <tr>
                                <td>Account : </td>
                                <td><input type="text" :value="user?.account" @input="doinput($event, 'account')"></td>
                            </tr>
                            <tr>
                                <td>Phone : </td>
                                <td><input type="text" :value="user?.phone" @input="doinput($event, 'phone')"></td>
                            </tr>
                            <tr>
                                <td>Birth Date : </td>
                                <td><input type="date" :value="user?.birthDate" @input="doinput($event, 'birthDate')"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="confirmUpdate" v-show="!isShowInsertButton">修改</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    const props = defineProps({
        user: {
            type: Object,
            default: () => ({})
        },
        isShowInsertButton: {
            type: Boolean,
            default: false
        }
    });
    const emits = defineEmits(["update:user", "confirm"]);

    function doinput(event, key) {
        const data = {
            ...props.user,
            [key]: event.target.value
        };
        emits("update:user", data);
    }

    function confirmUpdate() {
        emits("confirm");
    }

    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
    import { onMounted, ref } from 'vue';

    const refExampleModal = ref(null);
    const modal = ref(null);

    onMounted(() => {
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
