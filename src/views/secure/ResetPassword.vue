<template>
    <div>
        <h3>重設密碼</h3>
        <input v-model="newPassword" type="password" placeholder="輸入新密碼" />
        <button @click="resetPassword">重設密碼</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import axiosapi from '@/utils/axiosInstance.js'

const route = useRoute();
const router = useRouter();
const newPassword = ref("");

async function resetPassword() {
    try {
        const token = route.query.token;
        const response = await axiosapi.post("/ajax/secure/reset-password", {
            token,
            password: newPassword.value,
        });

        if (response.data.success) {
            Swal.fire({
                icon: "success",
                title: "密碼重設成功！",
            }).then(() => {
                router.push({ name: "login-link" });
            });
        } else {
            Swal.fire({ icon: "error", title: response.data.message });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: `重設失敗: ${error.message}`,
        });
    }
}
</script>