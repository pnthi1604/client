<template>
    <div class="product-card">
        <img :src="product.imageId.imageUrl" alt="Product Image" class="product-image" @click.stop="showDetail">
        <div class="product-info" @click.stop="showDetail">
            <p class="product-name">{{ shortForm(product.name) }}</p>
            <p class="product-price">Giá: {{ product.price }}</p>
        </div>
        <button class="btn-add" @click="addCart">
            Thêm giỏ hàng
        </button>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true
        }
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

.product-info {
    font-size: 16px;
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
    height: 10%;
    margin-top: 12px;
}

.btn-add:hover {
    background-color: darkgreen;
}
</style>