<template>
    <input type="checkbox" class="choose-product" id="choose" name="choose" @change="changeChooseCheckbox">
</template>

<script>
export default {
    methods: {
        changeChooseCheckbox(event) {
            this.$emit('changeChooseCheckbox', event);
        }
    }
}
</script>

<style scoped>
.choose-product {
    width: 24px;
    height: 24px;
}

.choose-product:hover {
    cursor: pointer;
}
</style>