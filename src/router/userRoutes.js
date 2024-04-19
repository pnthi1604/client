import Home from "@/views/Home.vue";
import Product from "@/views/Product.vue";
import Order from "@/views/Order.vue";
import ProductDetai from "@/views/ProductDetail.vue";
import Cart from "@/views/Cart.vue";
import Payment from "@/views/Payment.vue";

const routes = [
    {
        path: "/",
        redirect: "/user",
    },
    {
        path: "/user",
        props: true,
        children: [
            {
                path: "",
                component: Home,
                name: "userPage",
            },
            {
                path: "products",
                children: [
                    {
                        path: "",
                        component: Product,
                        name: "productPage",
                    },
                    {
                        path: "detail/:id",
                        name: "productDetailPage",
                        component: ProductDetai,
                    },
                ]
            },
            {
                path: "orders",
                component: Order,
                name: "orderPage",
                meta : {
                    requiresAuth: true,
                    role: "user",
                },
            },
            {
                path: "carts",
                component: Cart,
                name: "cartPage",
                meta : {
                    requiresAuth: true,
                    role: "user",
                },
            },
            {
                path: "payment",
                component: Payment,
                name: "paymentPage",
                meta : {
                    requiresAuth: true,
                    role: "user",
                },
            }
        ],
    }
]

export default routes;