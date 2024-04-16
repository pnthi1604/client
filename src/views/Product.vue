<template>
    <greeting :title="title"></greeting>
    <div class="list-product">
        <product-card v-for="product in products" :key="product.id" :product="product"></product-card>
    </div>
</template>

<script>
import Greeting from '@/components/Utils/Greeting.vue';
import ProductCard from '@/components/Product/ProductCard.vue';
import productService from '@/services/product.service';

export default {
    data() {
        return {
            products: []
        };
    },  
    components: {
        Greeting,
        ProductCard
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        async getProducts() {
            this.products = (await productService.getProducts()).data
        }
    },
}
</script>

<style scoped>
</style>