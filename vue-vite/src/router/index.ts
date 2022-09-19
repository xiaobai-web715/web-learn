import {createRouter, RouteRecordRaw, createWebHistory} from 'vue-router';
import Home from '@/view/Home.vue';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    }, {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "NotFound" */'@/view/NotFound.vue'),
    }
];

export default createRouter({
    history: createWebHistory(),
    routes,
});