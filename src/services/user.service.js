import createApiClient from "./api.service.js"

// backend:
// router.route('/')
//     .get(middleware.auth.adminAuth, controller.User.getAll)
//     .post(controller.User.create)

// router.route('/:id')
//     .get(controller.User.getById)
//     .put(controller.User.update)
//     .delete(controller.User.delete)

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

class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl)
    }

    async getUserById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "User retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updateUser(id, user) {
        try {
            const data = (await this.api.put(`/${id}`, user)).data
            return {
                status: "success",
                message: data.message || "User updated successfully",
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

export default new UserService()
