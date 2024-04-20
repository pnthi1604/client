<template>
    <div class="container-top">
        <greeting :title="tilte"></greeting>
    </div>
    <div class="row">
        <div class="col-8 custom-border-right">
            <greeting :title="nameBill" class="greeting-bill"></greeting>
            <bill :carts="carts"></bill>

        </div>
        <div class="col-4">
            <p class="title-form-info-payment">
                Thông tin giao hàng
            </p>
            <payment-form :user="user" @submit="handleSubmit"></payment-form>
        </div>
    </div>
</template>

<script>
import Greeting from "@/components/Common/Greeting.vue";
import InputSearch from "@/components/Common/InputSearch.vue";
import Bill from '@/components/Payment/Bill.vue';
import PaymentForm from "@/components/Payment/PaymentForm.vue";
import { mapStores } from "pinia";
import useAuthStore from "@/stores/auth.store.js";

export default {
    computed: {
        ...mapStores(useAuthStore),
    },
    data() {
        return {
            tilte: "Thanh toán",
            carts: [],
            nameBill: "Hóa đơn",
            user: null
        };
    },
    created() {
        if (!this.$route.query?.data) {
            alert("Có lỗi xảy ra, quay lại giỏ hàng");
            this.$router.push({ name: "CartPage" });
            return;
        }
        this.carts = JSON.parse(this.$route.query.data);
        if (this.authStore.user) {
            this.user = this.authStore.user;
        }
    },
    components: {
        Greeting,
        InputSearch,
        Bill,
        PaymentForm,
    },
    methods: {
        handleSubmit(data) {
            console.log(data);
        }
    }
}
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}

.greeting-bill, .title-form-info-payment {
    font-size: 24px !important;
    color: black !important;
    text-align: center;
    margin-bottom: 20px;
}

.custom-border-right {
    border-right: 2px solid #ccc; /* Độ dày và màu sắc của đường kẻ dọc */
}
</style>