<template>
    <div class="container">
        <login :isRegister="isRegister" :titleForm="titleForm" @submit="handleSubmit"></login>
        <div class="not-have-account">
            <p>Bạn chưa có tài khoản?
                <router-link to="/register">Đăng ký ngay</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import Login from "@/components/Auth/Auth.vue";
import authService from "@/services/auth.service";
import useUserStore from '@/stores/user.store';
import { mapStores } from 'pinia'
import useAuthStore from "@/stores/auth.store"

export default {
    computed: {
        ...mapStores(useUserStore),
        ...mapStores(useAuthStore)
    },
    data() {
        return {
            isRegister: false,
            titleForm: 'Đăng nhập'
        };
    },
    components: {
        Login,
    },
    methods: {
        async handleSubmit(data) {
            try {
                const response = await authService.login(data)
                this.authStore.setRole(response?.data?.data?.role)
                alert(response.data.message)
                this.$router.push({ name: "userPage"})
            } catch (err) {
                alert(err.response.data.message)
            }
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 400px;
}

.not-have-account {
    margin-top: 20px;
    text-align: center;
}
</style>