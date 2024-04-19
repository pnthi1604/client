import createApiClient from "./api.service.js"

class PublisherService {
    constructor(baseUrl = "/api/publishers") {
        this.api = createApiClient(baseUrl)
    }

    async getPublishers() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Publishers retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getPublisherById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Publisher retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async createPublisher(publisher) {
        try {
            const data = (await this.api.post("/", publisher)).data
            return {
                status: "success",
                message: data.message || "Publisher created successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updatePublisher(id, publisher) {
        try {
            const data = (await this.api.put(`/${id}`, publisher)).data
            return {
                status: "success",
                message: data.message || "Publisher updated successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async deletePublisher(id) {
        try {
            const data = (await this.api.delete(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Publisher deleted successfully",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new PublisherService()
