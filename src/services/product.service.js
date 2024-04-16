import createApiClient from "./api.service.js"

class ProductService {
    constructor(baseUrl = "/api/products") {
        this.api = createApiClient(baseUrl)
    }

    async getProducts() {
        return (await this.api.get("/")).data
    }
}

export default new ProductService()
