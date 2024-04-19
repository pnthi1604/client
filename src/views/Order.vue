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
            tilte: "Đơn hàng!",
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