import { defineStore } from "pinia";
import { ref } from "vue";

const useUsersStore = defineStore("userData", function () {
    const id = ref("");
    function setId(val) {
        id.value = val;
    }

    const account = ref("");
    function setAccount(val) {
        account.value = val;
    }

    const email = ref("");
    function setEmail(val) {
        email.value = val;
    }

    const phone = ref("");
    function setPhone(val) {
        phone.value = val;
    }

    const birthDate = ref("");
    function setBirthDate(val) {
        birthDate.value = val;
    }

    const isLogin = ref(false);
    function setLogin(val) {
        isLogin.value = val;
    }

    function logout() {
        setId(null);
        setAccount("");
        setEmail("");
        setPhone("");
        setBirthDate("");
        setLogin(false);
    }

    return {
        id, setId, account, setAccount, email, setEmail, phone, setPhone, birthDate, setBirthDate, isLogin, setLogin, logout,
    }
}, {
    persist: {
        storage: sessionStorage,
        paths: ["id", "account", "email", "phone", "birthDate", "isLogin"]
    }
});

export default useUsersStore;
