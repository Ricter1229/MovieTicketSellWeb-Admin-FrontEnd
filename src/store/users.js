import { defineStore } from "pinia";
import { ref } from "vue";

const useUsersStore = defineStore("users", function() {
    const email = ref("");
    function setEmail(val) {
        email.value = val;
    }

    const isLogin = ref(false);
    function setLogin(val) {
        isLogin.value = val;
    }

    function logout() {
        email.value = "";
        isLogin.value = false;
        sessionStorage.removeItem("users");
    }

    return {
        email, setEmail, isLogin, setLogin, logout,
    }
}, {
    persist: {
        storage: sessionStorage,
        paths: ["email", "isLogin"]
    }
});

export default useUsersStore;
