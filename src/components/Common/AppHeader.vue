<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <nav-item :title="'Trang chủ'" :routerName="'userPage'" class="navbar-brand"></nav-item>
        <nav-item :title="'Sản phẩm'" :routerName="'productPage'" class="navbar-brand"></nav-item>
        <nav-item :title="'Giỏ hàng'" :routerName="'cartPage'" class="navbar-brand"></nav-item>
        <nav-item :title="'Đơn hàng'" :routerName="'orderPage'" class="navbar-brand"></nav-item>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                aria-expanded="false">
            </button>
            <div class="dropdown-menu">
                <router-link v-if="role==guestRole" class="dropdown-item" :to="{name: 'login'}">Đăng nhập</router-link>
                <router-link v-if="role==userRole" class="dropdown-item" @click="logout" :to="{name: 'login'}">Đăng xuất</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import NavItem from "@/components/Common/NavItem.vue";
import useAuthStore from "@/stores/auth.store.js";
import { mapStores } from "pinia";

export default {
    computed: {
        ...mapStores(useAuthStore),
        role() {
            return this.authStore.getRole
        }
    },
    components: {
        NavItem,
    },
    data() {
        return {
            guestRole: "guest",
            userRole: "user"            
        }
        
    },
    methods: {
        logout() {
            this.authStore.setRole(this.guestRole)
        }
    }
}
</script>

<style scoped>
.dropdown {
    margin-left: auto;
}
</style>
