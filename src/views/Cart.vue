<template>
    <div class="container-top">
        <greeting :title="title"></greeting>
        <btn class="btn-add-product" nameBtn="Đặt hàng" @click="orderProduct"></btn>
    </div>
    <input-search @search="handleSearch" class="input-search"></input-search>
    <div class="row">
        <table class="table">
            <thead class="">
                <tr>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Hạn mượn</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Chọn sản phẩm</th>
                    <th scope="col">Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <cart-item v-for="cart in filterCarts" 
                    :key="cart._id" :cart="cart" 
                    @delete="handleDelete"
                    @showDetail="handleShowDetail"
                    @incrementQuantity="incrementQuantity"
                    @decrementQuantity="decrementQuantity"
                    >
                </cart-item>
            </tbody>
        </table>
    </div>
</template>

<script>
import Greeting from '@/components/Common/Greeting.vue';
import Btn from '@/components/Common/Btn.vue';
import InputSearch from '@/components/Common/InputSearch.vue';
import cartService from '@/services/cart.service';
import { mapStores } from 'pinia';
import authStore from '@/stores/auth.store';
import productService from '@/services/product.service';
import CartItem from '@/components/Product/CartItem.vue';

export default {
    computed: {
        ...mapStores(authStore),
    },
    data() {
        return {
            title: 'Giỏ hàng',
            carts: [],
            filterCarts: [],
            searchTerm: ""
        };
    },
    components: {
        Greeting,
        Btn,
        InputSearch,
        CartItem,
    },
    async created() {
        await this.getCarts();
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterCarts = this.carts;
            else
                this.filterCarts = this.carts.filter(cart => {
                    return cart.productId.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
        },
        async getCarts() {
            const res = await cartService.getCarts(this.authStore.getUser._id);
            if (res.status == "error") {
                alert(res.message);
                return
            }
            this.carts = res.data;
            this.filterCarts = this.carts;
        },
        orderProduct() {
            this.$router.push({
                name: 'paymentPage',
            });
        },
        async handleDelete(cart) {
            if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
                const res = await cartService.deleteCart(cart.userId._id, cart.productId._id)
                if (res.status == "error")
                    alert(res.message)
                await this.getCarts()
                this.filter()
            }
        },
        async handleShowDetail(cart) {
            console.log({
                "cart in show detail": cart
            })
            const res = await productService.getProductById(cart.productId._id)
            if (res.status == "error") {
                alert(res.message)
                return
            }
            console.log({
                "product in show detail": res.data
            })
            const product = res.data
            this.$router.push({
                name: 'productDetailPage',
                params: {
                    id: product._id
                },
                query: {
                    data: JSON.stringify(product)
                }
            });
        },
        async incrementQuantity({cart, count}) {
            const res = await cartService.updateCart(cart.userId._id, cart.productId._id, count)
            if (res.status == "error") {
                alert(res.message)
                return
            }
            await this.getCarts()
            this.filter()
        },
        async decrementQuantity({cart, count}) {
            const res = await cartService.updateCart(cart.userId._id, cart.productId._id, count)
            if (res.status == "error") {
                alert(res.message)
                return
            }
            await this.getCarts()
            this.filter()
        }
    },
}
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}

.table {
    text-align: center;
}

.input-search {
    margin-bottom: 12px;
}

.list-product {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.btn-add-product {
    margin: 0 auto;
}
</style>