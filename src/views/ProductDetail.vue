<template>
    <div class="container-top">
        <greeting :title="title"></greeting>
    </div>
    <product-detail :product="product"></product-detail>
    <div class="container mt-5">
        <div class="row">
            <quantity-input @changeQuantity="handleInputQuantityChange"></quantity-input>
            <div class="col-md-6">
                <btn :nameBtn="'Thêm vào giỏ hàng'" @submit="addCart"></btn>
            </div>
        </div>
    </div>
</template>

<script>
import Greeting from '@/components/Common/Greeting.vue';
import ProductDetail from '@/components/Product/ProductDetail.vue';
import Btn from "@/components/Common/Btn.vue";
import QuantityInput from '@/components/Common/QuantityInput.vue';
import { mapStores } from 'pinia';
import authStore from '@/stores/auth.store';
import cartService from '@/services/cart.service';

export default {
    computed: {
        ...mapStores(authStore),
    },
    components: {
        Greeting,
        ProductDetail,
        Btn,
        QuantityInput,
    },
    created() {
        this.product = JSON.parse(this.$route.query.data)
    },
    data() {
        return {
            title: 'Chi tiết sản phẩm',
            product: "",
            quantity: 1
        }
    },
    methods: {
        async addCart() {
            const response = await cartService.addToCart(this.authStore.getUser._id, this.product._id, this.quantity);
            alert(response.message)
        },
        handleInputQuantityChange(value) {
            this.quantity = value
        },
    },
};
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}
</style>