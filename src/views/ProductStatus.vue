<template>
    <div class="container-top">
        <greeting :title="title"></greeting>
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
                            Ngày mượn
                        </p>
                    </th>
                    <th scope="col">
                        <p>
                            Ngày trả
                        </p>
                    </th>
                    <th scope="col">
                        <p>
                            Trạng thái
                        </p>
                    </th>
                    <th scope="col">
                        <p>
                            Chức năng
                        </p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item._id">
                    <td>
                        <div class="item">
                            <img :src="item.productId.imageId.imageUrl" alt="Sản phẩm" width="100" height="100" class="item-img">
                            <p class="item-name">
                                {{ shortForm(item.productId.name) }}
                            </p>
                        </div>
                    </td>
                    <td>{{ convertFormDate(item.borrowDate) }}</td>
                    <td>{{ convertFormDate(item.returnDate) }}</td>
                    <td>{{ item.status }}</td>
                    <td class="func">
                        <btn v-if="item.status == 'Đang mượn'" nameBtn="Trả sách" styleBtn="btn-warning" @click="handleReturnProduct(item)"
                            class="btn-func"></btn>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Greeting from '@/components/Common/Greeting.vue';
import BoxStatusOrder from "@/components/Order/BoxStatusOrder.vue";
import TitleForm from "@/components/Common/TitleForm.vue";
import imageService from '@/services/image.service';
import returnProductService from '@/services/returnProduct.service';
import useAuthStore from '@/stores/auth.store';
import { mapStores } from 'pinia';
import Btn from '@/components/Common/Btn.vue';

export default {
    computed: {
        ...mapStores(useAuthStore),
    },
    components: {
        Greeting,
        BoxStatusOrder,
        TitleForm,
        Btn,
    },
    data() {
        return {
            title: 'Sách đã mượn',
            items: [],
            statuses: [],
        };
    },
    beforeMount: async function () {
        await this.formData()
    },
    methods: {
        async formData() {
            const userId = this.authStore.getUser._id;
            const resGetReturnProducts = await returnProductService.getByUserId(userId);
            if (resGetReturnProducts.status == "error") {
                alert(resGetReturnProducts.message);
                this.$router.push({
                    name: "userPage",
                })
                return
            }
            this.items = await Promise.all(resGetReturnProducts.data.map(async (item) => {
                const resGetImage = await imageService.getImageById(item.productId.imageId);
                const imageUrl = resGetImage?.data?.imageUrl || "";
                item.productId.imageId = {
                    ...item.productId.imageId,
                    imageUrl,
                }
                // handle Status
                const currentDate = new Date()
                const { returnDate } = item;
                const returnDateObj = new Date(returnDate);
                if (currentDate > returnDateObj && item.status == "Đang mượn")
                    item.status = "Trễ hạn"
                return item;
            }));

            // sort items by status and returnDate
            this.items.sort((a, b) => {
                const prio = {
                    "Trễ hạn": 10,
                    "Đang mượn": 5,
                    "Đã trả": 1,
                }
                const priA = prio[a.status]
                const priB = prio[b.status]
                if (priA != priB)
                    return priB - priA
                const dateA = new Date(a.returnDate);
                const dateB = new Date(b.returnDate);
                return dateB - dateA;
            })
        },
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
        async handleReturnProduct(item) {
            const resUpdateReturnProduct = await returnProductService.update(item._id, {
                status: "Đã trả",
            });
            if (resUpdateReturnProduct.status == "error") {
                alert(resUpdateReturnProduct.message);
                return
            } else {
                alert("Trả sách thành công");
                const index = this.items.findIndex(i => i._id == resUpdateReturnProduct.data._id);
                this.items[index].status = resUpdateReturnProduct.data.status
            }
        }
    },
}
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
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