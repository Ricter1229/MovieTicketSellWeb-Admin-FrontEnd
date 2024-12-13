<template>
    <div class="reset-password-container">
        <h2>重設密碼</h2>
        <form @submit.prevent="resetPassword">
            <div class="form-group">
                <label for="new-password">新密碼</label>
                <input type="password" id="new-password" v-model="newPassword" required />
            </div>
            <div class="form-group">
                <label for="confirm-password">確認密碼</label>
                <input type="password" id="confirm-password" v-model="confirmPassword" required />
            </div>
            <button type="submit" class="btn btn-primary">重設密碼</button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import Swal from "sweetalert2";
    import axiosapi from "@/plugins/axios.js"

    const route = useRoute();
    const router = useRouter();
    const newPassword = ref("");
    const confirmPassword = ref("");

    async function resetPassword() {
        if (newPassword.value === "") {
            Swal.fire({ icon: "warning", title: "請輸入新密碼！" });
            return;
        } else if (newPassword.value.length < 8) {
            Swal.fire({ icon: "warning", title: "密碼長度至少8位！" });
            return;
        } else if (!/[a-z]/.test(newPassword.value) || !/[0-9]/.test(newPassword.value)) {
            Swal.fire({ icon: "warning", title: "密碼必須包含字母和數字！" });
            return;
        }

        if (newPassword.value !== confirmPassword.value) {
            Swal.fire({ icon: "error", title: "密碼不匹配！" });
            return;
        }

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

<style scoped>
.reset-password-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn:hover {
    background-color: #0056b3;
}
</style>