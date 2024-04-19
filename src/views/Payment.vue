<template>
    <input-search></input-search>
    <greeting :title="tilte"></greeting>
</template>

<script>
import Greeting from "@/components/Common/Greeting.vue";
import InputSearch from "@/components/Common/InputSearch.vue";

export default {
    data() {
        return {
            tilte: "Thanh toán",
        };
    },
    components: {
        Greeting,
        InputSearch,
    },
}
</script>

<style>
</style>