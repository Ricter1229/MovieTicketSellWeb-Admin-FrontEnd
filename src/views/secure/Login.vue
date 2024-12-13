<template>
    <div class="login-container">
        <h3>登入</h3>
        <form>
            <div>
                <div class="form-group">
                    <label for="username">帳號: </label>
                    <input type="text" id="username" v-model="username" @focus="clearError()">
                    <span class="error-message">{{ message }}</span>
                </div>
                <div class="form-group">
                    <label for="password">密碼: </label>
                    <input type="text" id="password" v-model="password" @focus="clearError()">
                </div>
                <div class="form-group">
                    <button type="button" @click="login()">Login</button>
                </div>
                <div class="form-group">
                    <a href="#" @click.prevent="openForgotPasswordModal">忘記密碼?</a>
                </div>
            </div>
        </form>

        <div v-if="showForgotPasswordModal" class="modal">
            <div class="modal-content">
                <h3>忘記密碼</h3>
                <input v-model="resetUsername" placeholder="輸入您的使用者帳號" />
                <button @click="sendResetPasswordRequest">發送重設密碼郵件</button>
                <button @click="closeForgotPasswordModal">取消</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axiosapi from "@/plugins/axios.js"
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import useUsersStore from '@/store/users.js';

const usersStore = useUsersStore();
const router = useRouter();

const username = ref(null);
const password = ref(null);
const message = ref(null);

const showForgotPasswordModal = ref(false);
const resetUsername = ref("");

// Open Modal
function openForgotPasswordModal() {
    showForgotPasswordModal.value = true;
}

// Close Modal
function closeForgotPasswordModal() {
    showForgotPasswordModal.value = false;
}

function clearError() {
    message.value = "";
}

async function login() {

    if (username.value === "") {
        username.value = null;
    }
    if (password.value === "") {
        password.value = null;
    }
    let request = {
        username: username.value,
        password: password.value
    };

    axiosapi.defaults.headers.authorization = "";
    usersStore.setId("");
    usersStore.setAccount("");
    usersStore.setEmail("");
    usersStore.setPhone("");
    usersStore.setBirthDate("");
    usersStore.setLogin(false);
    try {
        const response = await axiosapi.post("/ajax/secure/login", request);
        const {id, account, phone, birthDate, email } = response.data;

        if (response.data.success) {
            usersStore.setId(id);
            usersStore.setAccount(account);
            usersStore.setPhone(phone);
            usersStore.setBirthDate(birthDate);
            usersStore.setEmail(email);
            usersStore.setLogin(true);

            Swal.fire({
                icon: "success",
                title: response.data.message,
            })
            
            router.push({ name: "main-page-link" });
        } else {
            message.value = response.data.message;
            Swal.fire({
                icon: "warning",
                title: response.data.message,
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "查詢失敗:" + error.message,
        });
    }
}

// 傳送修改密碼
async function sendResetPasswordRequest() {
    try {
        const response = await axiosapi.post("/ajax/secure/forgot-password", {
            username: resetUsername.value,
        });

        if (response.data.success) {
            Swal.fire({
                icon: "success",
                title: "重設密碼的郵件已發送，請檢查您的信箱。",
            }).then(() => {
                closeForgotPasswordModal();
            });
        } else {
            Swal.fire({ icon: "warning", title: response.data.message });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: `發送失敗: ${error.message}`,
        });
    }
}

</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
}

h3 {
    text-align: center;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #333;
}

input[type="text"] {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

.error-message {
    color: red;
    font-size: 0.9em;
}

p {
    text-align: center;
    color: #333;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
}

.modal-content h3 {
    margin-bottom: 20px;
}

.modal-content input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.modal-content button {
    margin: 5px;
}
</style>