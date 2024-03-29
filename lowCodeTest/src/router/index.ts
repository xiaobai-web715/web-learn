import routes from "./routes"
import * as VueRouter from "vue-router"
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router