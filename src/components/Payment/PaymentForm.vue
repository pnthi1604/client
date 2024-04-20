<template>
    <form>
        <div class="form-group">
            <label for="phone">Họ và tên</label>
            <input type="text" class="form-control" id="name" placeholder="Enter your name" v-model="name">
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại người nhận</label>
            <input type="text" class="form-control" id="phone" placeholder="Enter phone" v-model="phone">
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ giao hàng</label>
            <input type="text" class="form-control" id="address" placeholder="Enter address" v-model="address">
        </div>
        <div class="btn-submit-form">
            <btn @click="submit"></btn>
        </div>
    </form>
</template>

<script>
import Btn from "@/components/Common/Btn.vue";
export default {
    props: {
        user: {
            type: Object,
        }
    },
    components: {
        Btn,
    },
    created() {
        if (this.user) {
            this.name = this.user.lastName + " " + this.user.firstName;
            this.phone = this.user.phone;
            this.address = this.user.address;
        }
    },
    data() {
        return {
            name: "",
            phone: "",
            address: "",
        };
    },
    methods: {
        submit(event) {
            event.preventDefault();
            this.$emit("submit", {
                name: this.name,
                phone: this.phone,
                address: this.address,
            });
        }
    }
}
</script>

<style scoped>
.btn-submit-form {
    text-align: center;
}
</style>