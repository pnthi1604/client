<template>
    <div class="">
        <div class="container-top">
            <greeting :title="tilte"></greeting>
        </div>
        <div class="row">
            <div class="col-8 custom-border-right">
                <title-form :title="titleBill"></title-form>
                <bill :carts="carts"></bill>
            </div>
            <div class="col-4">
                <title-form :title="titleFormInfoPayment"></title-form>
                <payment-form :user="user" @submit="handleSubmit" :key="user.key"></payment-form>
            </div>
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
import orderService from "@/services/order.service.js";
import TitleForm from "@/components/Common/TitleForm.vue";
import cartService from "@/services/cart.service";

export default {
    computed: {
        ...mapStores(useAuthStore),
    },
    data() {
        return {
            tilte: "Đặt hàng",
            carts: [],
            user: {
                key: new Date(),
            },
            titleBill: "Hóa đơn",
            titleFormInfoPayment: "Thông tin thanh toán",
        };
    },
    beforeMount: async function(){
        if (!this.$route.query?.data) {
            alert("Có lỗi xảy ra, quay lại giỏ hàng");
            this.$router.push({ name: "CartPage" });
            return;
        }
        const cartsId = JSON.parse(this.$route.query.data);
        this.carts = await Promise.all(cartsId.map(async (cartId) => {
            const res = await cartService.getCart({ cartId });
            return res.data;
        }));
        this.user = {
            ...this.authStore.user,
            key: new Date(),
        };
    },
    components: {
        Greeting,
        InputSearch,
        Bill,
        PaymentForm,
        TitleForm,
    },
    methods: {
        async handleSubmit(infoPayment) {
            const cartsId = this.carts.map((cart) => cart._id);
            const resCreateOrder = await orderService.createOrder(cartsId, infoPayment);
            if (resCreateOrder.status == "success") {
                alert("Đặt hàng thành công");
                this.$router.push({ name: "orderPage" });
            } else {
                alert("Đặt hàng thất bại");
            }
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