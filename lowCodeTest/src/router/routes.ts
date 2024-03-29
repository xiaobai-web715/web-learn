import Table from "../page/table.vue"
import App from "../App.vue"
const routes = [
    {
        path: "/",
        name: "Home",
        component: App,
    },
    {
        path: "/table",
        name: "Table",
        component: Table
    }
]

export default routes