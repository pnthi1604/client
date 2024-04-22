import createApiClient from "./api.service.js"

// backend:
// router.route("/:userId")
//     .get(middleware.auth.userAuth, controller.Cart.getAll)
//     // .delete(middleware.auth.userAuth, controller.Cart.deleteAll)

// router.route("/:userId/:productId")
//     .post(middleware.auth.userAuth, controller.Cart.update)
//     .delete(middleware.auth.userAuth, controller.Cart.delete)

// router.route("/add-cart/:userId/:productId")
//     .post(middleware.auth.userAuth, controller.Cart.add)

// form similar to product.service.js
// async getProducts() {
//     try {
//         const data = (await this.api.get("/")).data
//         return {
//             status: "success",
//             message: data.message || "Products retrieved successfully",
//             data: data.data,
//         }
//     } catch (err) {
//         return {
//             status: "error",
//             message: err.response.data.message,
//         }
//     }
// }

class CartService {
    constructor(baseUrl = "/api/carts") {
        this.api = createApiClient(baseUrl)
    }

    async getCarts(userId) {
        try {
            const data = (await this.api.get(`/${userId}`)).data
            return {
                status: "success",
                message: data.message || "Cart retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getCart({ userId, productId, cartId }) {
        try {
            if (cartId) {
                const data = (await this.api.get(`/cart/${cartId}`)).data
                return {
                    status: "success",
                    message: data.message || "Cart retrieved successfully",
                    data: data.data,
                }
            } else {
                const data = (await this.api.get(`/${userId}/${productId}`)).data
                return {
                    status: "success",
                    message: data.message || "Cart retrieved successfully",
                    data: data.data,
                }
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updateCart(userId, productId, quantity) {
        try {
            const data = (await this.api.post(`/${userId}/${productId}`, { quantity })).data
            return {
                status: "success",
                message: data.message || "Cart updated successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async addToCart(userId, productId, quantity) {
        try {
            const data = (await this.api.post(`/add-cart/${userId}/${productId}`, { quantity })).data
            return {
                status: "success",
                message: data.message || "Product added to cart successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async deleteCart(userId, productId) {
        try {
            const data = (await this.api.delete(`/${userId}/${productId}`)).data
            return {
                status: "success",
                message: data.message || "Product removed from cart successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new CartService()
