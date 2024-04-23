<template>
    <div class="product-card">
        <img :src="product.imageId.imageUrl" alt="Product Image" class="product-image" @click.stop="showDetail">
        <div class="product-info" @click="showDetail">
            <p class="product-name text-size-12">{{ shortForm(product.name, 24) }}</p>
            <p class="product-price text-size-12">Giá: {{ product.price }}</p>
            <p class="product-quantity text-size-12">Số lượng còn lại: {{ product.quantity }}</p>
        </div>

        <btn :nameBtn="'Thêm giỏ hàng'" @submit="addCart" :styleBtn="'btn-success btn-add'"></btn>
    </div>
</template>

<script>
import Btn from "@/components/Common/Btn.vue";

export default {
    emits: ['showDetail', 'addCart'],
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    components: {
        Btn
    },
    methods: {
        shortForm(text, maxLength) {
            if (!text)
                return ""
            if (!maxLength)
                maxLength = 1000
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        },
        showDetail() {
            console.log({
                product_show_detail: this.product,
            })
            this.$emit('showDetail', this.product);
        },
        addCart() {
            this.$emit('addCart', this.product);
        }
    },
};
</script>

<style scoped>
p {
    padding: 0;
    margin: 0;
}

.text-size-12 {
    font-size: 12px;
}

.product-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px;
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
    box-shadow: 3px 3px 10px #e0e0e0;
}

.product-card:hover {
    box-shadow: 0px 4px 18px #a9a9a9;
    cursor: pointer;
}

.product-info {
    margin-top: 12px;
}

.product-info .product-price {
    font-weight: bold;
}

.product-image {
    width: 100%;
    height: 60%;
    border-radius: 5px;
}

.btn-add {
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin-top: 12px;
    height: 36px;
}

.btn-add:hover {
    background-color: darkgreen;
}
</style>