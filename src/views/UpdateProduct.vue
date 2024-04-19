<template>
    <div class="container">
        <title-form :title="title"></title-form>
        <product-form @submit="handleSubmit"></product-form>
    </div>
</template>

<script>
import ProductForm from "@/components/Product/ProductForm.vue";
import TitleForm from "@/components/Common/TitleForm.vue";
import productService from "@/services/product.service";
import imageService from "@/services/image.service"

export default {
    components: {
        ProductForm,
        TitleForm
    },
    data() {
        return {
            title: "Thêm sản phẩm"
        }
    },
    created() {
        if (this.$route.params.id) {
            this.title = "Cập nhật sản phẩm"
        }
    },
    methods: {
        async handleSubmit(data) {
            const { file, ...productData } = data;
            console.log({file})
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const resImage = await imageService.uploadImage(formData)
                if (resImage.status === "error") {
                    alert(resImage.message)
                    return
                }
                productData.imageId = resImage.data._id
            }

            if (!productData.imageId) {
                alert("Hình ảnh là bắt buộc!")
                return
            }

            let resProduct = null
            if (!this.$route.params.id) {
                console.log({productData})  
                resProduct = await productService.createProduct(productData)
            } else {
                resProduct = await productService.updateProduct(this.$route.params.id, productData)
            }
            alert(resProduct.message)
            if (resProduct.status == "success") {
                this.$router.push({ name: "productPage" })
            }
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 400px;
}
</style>