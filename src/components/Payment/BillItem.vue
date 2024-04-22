<template>
    <tr>
        <td>
            <div class="d-flex">
                <img :src="cart.productId.imageId.imageUrl" alt="product" class="img-fluid" style="width: 50px; height: 50px;">
                <div class="d-flex flex-column justify-content-center">
                    <p>{{ shortForm(cart.productId.name, 30) }}</p>
                </div>
            </div>
        </td>
        <td>{{ cart.productId.borrowingTime }}</td>
        <td>{{ cart.quantity }}</td>
        <td>{{ cart.productId.price }}</td>
        <td>{{ cart.quantity * cart.productId.price }}</td>
    </tr>
</template>

<script>

export default {
    props: {
        cart: {
            type: Object,
            default: null,
        },
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
        }
    },
}
</script>