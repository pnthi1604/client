<template>
    <tr>
        <td>
            <div class="item">
                <img v-lazy="orderItem?.productId?.imageId?.imageUrl" alt="Sản phẩm" width="100" height="100" class="item-img">
                <p class="item-name">
                    {{ shortForm(orderItem?.productId?.name) }}
                </p>
            </div>
        </td>
        <!-- <td>{{ borrowDate ? borrowDate : "Đang cập nhật" }}</td> -->
        <!-- <td>{{ returnDate ? returnDate : "Đang cập nhật" }}</td> -->
        <td>{{ orderItem?.borrowingTime }}</td>
        <td>{{ orderItem?.quantity }}</td>
        <td>{{ orderItem?.price }}</td>
        <td>{{ orderItem?.quantity * orderItem?.price }}</td>
        <td class="func">
            <btn nameBtn="Xem" styleBtn="btn-primary" @click="handleShowDetail" class="btn-func"></btn>
        </td>
    </tr>
</template>

<script>
import Btn from "@/components/Common/Btn.vue"

export default {
    components: {
        Btn
    },
    props: {
        orderItem: {
            type: Object,
            default: null,
        },
    },
    emits: ['showDetail'],
    data() {
        return {
            returnDate: null,
            borrowDate: null,
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
        convertFormDate(stringDate) {
            if (!stringDate)
                return ""
            let formatDate = new Date(stringDate);
            const date = formatDate.getDate();
            const month = formatDate.getMonth() + 1;
            const year = formatDate.getFullYear();

            const hours = formatDate.getHours();
            const minutes = formatDate.getMinutes();
            const seconds = formatDate.getSeconds();
            formatDate = `${date}/${month}/${year} lúc ${hours}h:${minutes}m:${seconds}s`;
            return formatDate
        },
        handleShowDetail() {
            this.$emit("showDetail", this.orderItem);
        },
    },
}
</script>

<style scoped>
p {
    margin: 0;
    padding: 0;
}

.product {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    text-align: left;
}

.func {
    display: flex;
    justify-content: space-around;
    border: none;
}

.btn-func {
    width: 60px;
    margin-top: 4px;
    display: block;
}
</style>