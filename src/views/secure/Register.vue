<template>
    <h3>註冊</h3>
    <form>
        <table>
            <tbody>
                <tr>
                    <td>ID : </td>
                    <td><input type="text" v-model="username" @focus="clearError('username')"></td>
                    <td>{{ errors.username }}</td>
                </tr>
                <tr>
                    <td>PWD : </td>
                    <td><input type="password" v-model="password" @focus="clearError('password')"></td>
                    <td>{{ errors.password }}</td>
                </tr>
                <tr>
                    <td>Email : </td>
                    <td><input type="email" v-model="email" @focus="clearError('email')"></td>
                    <td>{{ errors.email }}</td>
                </tr>
                <tr>
                    <td>Phone : </td>
                    <td><input type="text" v-model="phoneNum" @focus="clearError('phoneNum')"></td>
                    <td>{{ errors.phoneNum }}</td>
                </tr>
                <tr>
                    <td>Birth Date : </td>
                    <td><input type="date" v-model="birthDate" @focus="clearError('birthDate')"></td>
                    <td>{{ errors.birthDate }}</td>
                </tr>
                <tr>
                    <td> </td>
                    <td align="right"><button type="button" @click="register()">Register</button></td>
                </tr>
            </tbody>
        </table>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import axiosapi from '@/utils/axiosInstance.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form fields
const username = ref(null);
const password = ref(null);
const email = ref(null);
const phoneNum = ref(null);
const birthDate = ref(null);

// Error messages
const errors = ref({
    username: null,
    password: null,
    email: null,
    phoneNum: null,
    birthDate: null,
});

// Clear error for a specific field
function clearError(field) {
    errors.value[field] = null;
}

// Register function
async function register() {
    Swal.fire({
        title: "Registering.....",
        showConfirmButton: false,
        allowOutsideClick: false,
    });

    // Reset errors
    for (let key in errors.value) {
        errors.value[key] = null;
    }

    // Validation
    if (!username.value) errors.value.username = "Username is required";
    if (!password.value) errors.value.password = "Password is required";
    if (!email.value) errors.value.email = "Email is required";
    if (!phoneNum.value) errors.value.phoneNum = "Phone number is required";
    if (!birthDate.value) errors.value.birthDate = "Birth date is required";

    // Stop if validation fails
    if (Object.values(errors.value).some((error) => error)) {
        Swal.close();
        return;
    }

    // Request payload
    let request = {
        account: username.value,
        password: password.value,
        email: email.value,
        phoneNo: phoneNum.value,
        birthDate: birthDate.value,
    };

    try {
        const response = await axiosapi.post("/ajax/secure/register", request);

        console.log(response)
        if (response.data.success) {
            console.log("Registration Successful");
            Swal.fire({
                icon: "success",
                title: response.data.message,
            }).then(() => {
                router.push({ name: "login-link" });
            });
        } else {
            console.log("Registration Failed: ", response.data.message);
            Swal.fire({
                icon: "warning",
                title: response.data.message,
            });
        }
    } catch (error) {
        console.log("error", error);
        Swal.fire({
            icon: "error",
            title: "Registration failed: " + error.message,
        });
    }
}
</script>
