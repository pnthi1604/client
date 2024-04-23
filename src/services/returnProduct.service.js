import createApiClient from "./api.service.js"

class ReturnProductService {
    constructor(baseUrl = "/api/return-products") {
        this.api = createApiClient(baseUrl)
    }

    async getAll() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Record return products retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async create(data) {
        try {
            const res = (await this.api.post("/", data)).data
            return {
                status: "success",
                message: data.message || "Record return product created successfully",
                data: res.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getById(id) {
        try {
            const data = (await this.api.get("/" + id)).data
            return {
                status: "success",
                message: data.message || "Record return product retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getByUserId(id) {
        try {
            const data = (await this.api.get(`user/${id}`)).data
            return {
                status: "success",
                message: data.message || "Record return product retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async update(id, data) {
        try {
            const res = (await this.api.put("/" + id, data)).data
            return {
                status: "success",
                message: data.message || "Record return product updated successfully",
                data: res.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new ReturnProductService()
