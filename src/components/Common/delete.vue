<template>
    <td> {{ value }}</td>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            required: true,
        },
    },
}
</script>

<style scoped>
</style>