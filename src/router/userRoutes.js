import Home from "@/views/Home.vue";
import Product from "@/views/Product.vue";

const routes = [
    {
        path: "/",
        redirect: "/user",
    },
    {
        path: "/user",
        children: [
            {
                path: "",
                component: Home,
                name: "userPage",
            },
            {
                path: "/products",
                component: Product,
                name: "productPage"
            }
        ]
    }
]

export default routes;