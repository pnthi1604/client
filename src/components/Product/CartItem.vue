<template>
    <tr>
        <td>
            <div class="item">
                <img :src="cart.productId.imageId.imageUrl" alt="Sản phẩm" width="100" height="100" class="item-img">
                <p class="item-name">
                    {{ shortForm(cart.productId.name) }}
                </p>
            </div>
        </td>
        <td>
            {{ cart.productId.price }} đồng
        </td>
        <td>
            {{ cart.productId.borrowingTime }} ngày
        </td>
        <td>
            <count-btn :count="cart.quantity" @increment="incrementQuantity" @decrement="decrementQuantity"></count-btn>
        </td>
        <td>
            <input type="checkbox" class="choose-product" id="choose" name="choose" value="checkboxValue" @change="handleChangeChooseProduct">
        </td>
        <td>
            <btn nameBtn="Xem" styleBtn="btn-primary" @click="handleShowDetail" class="btn-func"></btn>
            <btn nameBtn="Xóa" styleBtn="btn-danger" @click="handleDelete" class="btn-func"></btn>
        </td>
    </tr>
</template>

<script>
import Btn from "@/components/Common/Btn.vue"
import CountBtn from '../Common/CountBtn.vue';

export default {
    props: {
        cart: {
            type: Object,
            required: true
        }
    },
    components: {
        Btn,
        CountBtn,
    },
    methods: {
        shortForm(text, maxLength) {
            if (!maxLength)
                maxLength = 20
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        },
        handleDelete() {
            this.$emit('delete', this.cart);
        },
        handleShowDetail() {
            this.$emit('showDetail', this.cart);
        },
        handleChangeChooseProduct(event) {
            this.$emit('changeChooseProduct', {
                cart: this.cart,
                checked: event.target.checked
            });
        },
        incrementQuantity(count) {
            this.$emit('incrementQuantity', {
                cart: this.cart,
                count: count
            });
        },
        decrementQuantity(count) {
            this.$emit('decrementQuantity', {
                cart: this.cart,
                count: count
            });
        }
    }
};
</script>

<style scoped>
.item {
    display: flex;
}

.item .item-name {
    margin-left: 10px;
    padding: 0;
    font-size: 14px;
}

.item .item-img {
    object-fit: cover;
    object-position: center;
    margin: 0;
    padding: 0;
}

.choose-product {
    width: 24px;
    height: 24px;
}

.choose-product:hover {
    cursor: pointer;
}

.btn-func {
    width: 60px;
    margin-top: 4px;
    display: block;
}
</style>