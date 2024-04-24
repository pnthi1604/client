<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">
                    <p>
                        Sản phẩm
                    </p>
                </th>
                <th scope="col">
                    <p>
                        Hạn mượn
                    </p>
                </th>
                <th scope="col">
                    <p>
                        Số lượng
                    </p>
                </th>
                <th scope="col">
                    <p>
                        Đơn giá
                    </p>
                </th>
                <th scope="col">
                    <p>
                        Thành tiền
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            <bill-item v-for="cart in carts" :key="cart._id" :cart="cart"></bill-item>
            <tr>
                <td colspan="4">
                    <p class="total-value">
                        Tổng thanh toán
                    </p>
                </td>
                <td>
                    <p class="total-value">
                        {{ totalValue }}
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import BillItem from "@/components/Payment/BillItem.vue";

export default {
    components: {
        BillItem,
    },
    props: {
        carts: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
        }
    },
    computed: {
        totalValue() {
            return this.carts.reduce((total, cart) => total + cart.productId.price * cart.quantity, 0);
        }
    },
    methods() {

    }
}
</script>

<style scoped>
p {
    margin: 0;
    padding: 0;
}

.total-value {
    font-weight: bold;
}
</style>