import createApiClient from "./api.service.js"

class OrderService {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl)
    }

    async createOrder(cartsId, infoPayment) {
        try {
            const data = (await this.api.post("/", {
                cartsId,
                infoPayment,
            
            })).data
            return {
                status: "success",
                message: data.message || "Order created successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getOrder(orderId) {
        try {
            const data = (await this.api.get(`/${orderId}`)).data
            return {
                status: "success",
                message: data.message || "Order retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updateOrder({adminId, orderId, orderStatus}) {
        try {
            let data;
            if (adminId)
                data = (await this.api.put(`/admin/${adminId}/${orderId}`, { orderStatus })).data
            else
                data = (await this.api.put(`/user/${orderId}`, { orderStatus })).data
            return {
                status: "success",
                message: data.message || "Order updated successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getOrdersByUserId(userId) {
        try {
            const data = (await this.api.get(`/user/${userId}`)).data
            return {
                status: "success",
                message: data.message || "Orders retrieved successfully",
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

export default new OrderService()