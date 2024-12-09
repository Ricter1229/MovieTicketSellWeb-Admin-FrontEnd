<template>
    <h3>登入</h3>
    <form>
        <table v-if="!codeSent">
            <tbody>
                <tr>
                    <td>ID : </td>
                    <td><input type="text" v-model="username" @focus="clearError()"></td>
                    <td>{{ message }}</td>
                </tr>
                <tr>
                    <td>PWD : </td>
                    <td><input type="text" v-model="password" @focus="clearError()"></td>
                    <td></td>
                </tr>
                <tr>
                    <td> </td>
                    <td align="right"><button type="button" @click="login()">Login</button></td>
                </tr>
            </tbody>
        </table>

        <div v-else>
            <p>請輸入您收到的驗證碼：</p>
            <input type="text" v-model="validationCodeInput" placeholder="Validation Code" />
            <button type="button" @click="validateCode()">Validate Code</button>
        </div>
    </form>

    <div>
        <button @click="openForgotPasswordModal">忘記密碼?</button>

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
import axiosapi from '@/utils/axiosInstance.js'
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import useUsersStore from '@/store/users.js';

const usersStore = useUsersStore();
const router = useRouter();

const username = ref(null);
const password = ref(null);
const message = ref(null);

const validationCodeInput = ref("");
const codeSent = ref(false);

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
    usersStore.setEmail("");
    usersStore.setLogin(false);
    try {
        const response = await axiosapi.post("/ajax/secure/login", request);

        if (response.data.success) {
            sessionStorage.setItem("user", response.data.user);
            sessionStorage.setItem("token", response.data.token);
            const expirationTime = new Date().getTime() + 60 * 5 * 1000; // 5分鐘後過期
            sessionStorage.setItem("validationCode", response.data.validationCode);
            sessionStorage.setItem("codeExpiration", expirationTime);

            Swal.fire({
                icon: "success",
                title: "驗證碼已寄出，請檢查您的信箱。",
                // title: response.data.message,
            })

            codeSent.value = true; //驗證碼步驟
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

function validateCode() {
    const storedCode = sessionStorage.getItem("validationCode");
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");

    const storedExpiration = sessionStorage.getItem("codeExpiration");
    const currentTime = new Date().getTime();
    if (currentTime > storedExpiration) {
        Swal.fire({ icon: "error", title: "驗證碼已過期，請重新登入。" });
        sessionStorage.removeItem("validationCode");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("codeExpiration");
        codeSent.value = false;
        return
    }

    if (storedCode == validationCodeInput.value) {
        Swal.fire({
            icon: "success",
            title: "hello",
        }).then(function (result) {
            axiosapi.defaults.headers.authorization = "Bearer " + token;
            sessionStorage.removeItem("validationCode");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("codeExpiration");
            usersStore.setEmail(user);
            usersStore.setLogin(true);
            router.push({ name: "home-link" });
        })
    } else {
        Swal.fire({
            icon: "error",
            title: "驗證碼錯誤，請重試。",
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
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
}
</style>