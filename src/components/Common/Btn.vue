<template>
    <button type="submit" :class="'btn ' + styleBtn" @click="handleSubmit"> {{ nameBtn }}</button>
</template>

<script>
export default {
    emits: ['submit'],
    props: {
        nameBtn: {
            type: String,
            default: 'Submit'
        },
        styleBtn: {
            type: String,
            default: 'btn-primary'
        }
    },
    methods: {
        handleSubmit(event) {
            this.$emit('submit', event);
        }
    }
}
</script>

<style scoped>
button {
    min-width: 100px;
}
</style>