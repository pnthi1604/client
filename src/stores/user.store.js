import { defineStore } from 'pinia'
import authService from '@/services/auth.service'

const userStore = defineStore('user', {
    state: () => ({
        users: [],
        loginUser: null,
    }),
    getters: {
        getAllUser(state) {
            return state.users
        },
    },
    actions: {
        async login(data) {
            const response = await authService.login(data)
            this.loginUser = response.data
            return response
        }
    },
})

export default userStore