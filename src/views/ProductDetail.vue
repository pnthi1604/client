<template>
    <div class="">
        <div class="container-top">
            <greeting :title="title"></greeting>
        </div>
        <product-detail :product="product"></product-detail>
        <div class="container mt-5">
            <div class="row">
                <quantity-input @changeQuantity="handleInputQuantityChange"></quantity-input>
                <div class="col-md-6">
                    <btn :nameBtn="'Thêm vào giỏ'" @submit="addCart"></btn>
                </div>
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
import productService from '@/services/product.service';

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
    beforeMount: async function() {
        const res = await productService.getProductById(this.$route.params.id);
        if (res.status == "success")
            this.product = res.data;
        else {
            alert(res.message)
        }
    },
    data() {
        return {
            title: 'Chi tiết sản phẩm',
            product: {},
            quantity: 1
        }
    },
    methods: {
        async addCart() {
            if (!this.authStore.getUser) {
                alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng")
                this.$router.push({
                    name: "login",
                })
                return
            }
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