<template>
    <div class="container-top">
        <greeting :title="title"></greeting>
        <completed-invoice :orderItems="orderItems" @showDetail="handleShowDetail"></completed-invoice>
    </div>
</template>

<script>
import Greeting from '@/components/Common/Greeting.vue';
import BoxStatusOrder from "@/components/Order/BoxStatusOrder.vue";
import TitleForm from "@/components/Common/TitleForm.vue";
import CompletedInvoice from '@/components/Order/CompletedInvoice.vue';
import imageService from '@/services/image.service';
import orderService from '@/services/order.service';
import useAuthStore from '@/stores/auth.store';
import { mapStores } from 'pinia';

export default {
    computed: {
        ...mapStores(useAuthStore),
    },
    components: {
        Greeting,
        BoxStatusOrder,
        TitleForm,
        CompletedInvoice,
    },
    data() {
        return {
            title: 'Sách đã mượn',
            orderItems: [],
            order: {},
        };
    },
    beforeMount: async function() {
        const userId = this.authStore.getUser._id;

        // get all Order by user id
        const resGetOrders = await orderService.getOrdersByUserId(userId);
        if (resGetOrders.status == "error") {
            alert(resGetOrders.message);
            this.$router.push({
                name: "userPage",
            })
            return
        }

        // get all OrderItems by Order
        this.orderItems = resGetOrders.data.map(order => {
            return order.orderItemsId;
        }).flat();


        // get image by orderItem.productId.imageId
        this.orderItems = await Promise.all(this.orderItems.map(async orderItem => {
            const imageId = orderItem.productId.imageId
            const resGetImage = await imageService.getImageById(imageId);
            const imageUrl = resGetImage?.data?.imageUrl || "";
            orderItem.productId.imageId = {
                ...orderItem.productId.imageId,
                imageUrl,
            }
            return orderItem;
        }))

        // filter orderItems with returnDate and borrowDate not null
        this.orderItems = this.orderItems.filter(orderItem => {
            return orderItem.borrowDate && orderItem.returnDate;
        })
    },
    methods: {
        handleShowDetail(product) {
            this.$router.push({
                name: "productDetailPage",
                params: {
                    id: product._id,
                },
            });
        },
    },
}
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}
</style>