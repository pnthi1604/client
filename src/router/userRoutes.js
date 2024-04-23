import Home from "@/views/Home.vue";
import Product from "@/views/Product.vue";
import Cart from "@/views/Cart.vue";
import Payment from "@/views/Payment.vue";
import Order from "@/views/Order.vue";
import OrderDatail from "@/views/OrderDetail.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import ProductStatus from "@/views/ProductStatus.vue";

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
                        path: ":id",
                        name: "productDetailPage",
                        component: ProductDetail,
                    },
                ]
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
            }, 
            {
                path: "orders",
                meta : {
                    requiresAuth: true,
                    role: "user",
                },
                children: [
                    {
                        path: "",
                        component: Order,
                        name: "orderPage",
                    },
                    {
                        path: ":id",
                        component: OrderDatail,
                        name: "orderDetailPage",
                    },
                    {
                        path: "product-status",
                        component: ProductStatus,
                        name: "productStatusPage",
                    },
                ],
            },
        ],
    }
]

export default routes;