<template>
    <div class="col-md-6">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Số lượng</span>
            </div>
            <input type="number" class="form-control" value="1" min="1" id="quantityInput" v-model="quantity">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            quantity: 1
        }
    },
    watch: {
        quantity: function (value) {
            this.$emit('changeQuantity', value)
        }
    },
}
</script>

<style scoped>
</style>