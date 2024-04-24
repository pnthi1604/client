<template>
    <div class="">
        <div class="container-top">
            <greeting :title="title"></greeting>
        </div>
        <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
        <div class="list-product">
            <product-cart v-for="product in filterProducts" :key="product._id" :product="product"
                @showDetail="handleShowDetail" @addCart="addCart">
            </product-cart>
        </div>
    </div>
</template>

<script>
import Greeting from '@/components/Common/Greeting.vue';
import productService from '@/services/product.service';
import cartService from '@/services/cart.service';
import InputSearch from '@/components/Common/InputSearch.vue';
import ProductCart from '@/components/Product/ProductCart.vue';
import { mapStores } from 'pinia';
import authStore from '@/stores/auth.store';

export default {
    computed: {
        ...mapStores(authStore),
    },
    emits: ['login'],
    data() {
        return {
            title: 'Sản phẩm',
            products: [],
            filterProducts: [],
            searchTerm: "",
            searchBy: "Tìm kiếm theo sản phẩm, tác giả, nhà xuất bản"
        };
    },
    components: {
        Greeting,
        InputSearch,
        ProductCart,
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterProducts = this.products;
            else
                this.filterProducts = this.products.filter(product => {
                    return product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        product.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        product.publisherId.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
        },
        async getProducts() {
            const res = await productService.getProducts();
            if (res.status == "error") {
                alert(res.message);
                return
            }
            this.products = res.data;
            this.filterProducts = this.products;
        },
        async handleDeleteProduct(product) {
            if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
                await this.deleteProduct(product._id);
                await this.getProducts()
                this.filter()
            }
        },
        async deleteProduct(id) {
            const res = await productService.deleteProduct(id);
            if (res.status == "error")
                alert(res.message)
        },
        handleShowDetail(product) {
            this.$router.push({
                name: 'productDetailPage',
                params: {
                    id: product._id
                },
            });
        },
        async addCart(product) {
            if (!this.authStore.getUser) {
                this.$emit('login');
                return
            }
            const response = await cartService.addToCart(this.authStore.getUser._id, product._id, 1);
            alert(response.message)
        }
    },
}
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}

.input-search {
    margin-bottom: 12px;
}

.list-product {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}

.btn-add-product {
    margin: 0 auto;
}
</style>