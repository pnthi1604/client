<template>
    <button type="submit" class="btn btn-primary" @click="submit">Submit</button>
</template>

<script>
export default {
    methods: {
        submit(event) {
            event.preventDefault();
            this.$emit('submit');
        }
    }

}
</script>

<style scoped>
button {
    width: 100px;
}
</style>