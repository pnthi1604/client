<template>
    <div class="container">
        <login :isRegister="false" :titleForm="titleForm" @submit="handleSubmit"></login>
    </div>
</template>

<script>
import Login from "@/components/Auth/Auth.vue";
import authService from "@/services/auth.service";
import { mapStores } from 'pinia'
import useAuthStore from "@/stores/auth.store"
import userService from "@/services/user.service"

export default {
    computed: {
        ...mapStores(useAuthStore)
    },
    data() {
        return {
            titleForm: 'Đăng nhập'
        };
    },
    components: {
        Login,
    },
    methods: {
        async handleSubmit(data) {
            const res = await authService.login(data);
            if (res.status == "success") {
                const responseGetUser = await userService.getUserById(res.data.id)
                if (responseGetUser.status == "error") {
                    alert(responseGetUser.message)
                    return
                }
                this.authStore.setUser(responseGetUser.data)
                this.authStore.setRole(res.data.role)
                localStorage.setItem("role", res.data.role)
                localStorage.setItem("user", JSON.stringify(responseGetUser.data))
                alert(res.message)
                this.$emit('login')
                this.$router.push({ name: "userPage"})
            } else {
                alert(res.message)
            }
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 400px;
}
</style>