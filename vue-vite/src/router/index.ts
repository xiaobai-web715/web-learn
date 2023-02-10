import {createRouter, RouteRecordRaw, createWebHistory} from 'vue-router';
import Home from '../view/Home.vue';
import Base from '../view/Base/index.vue';
import Login from '../view/Login.vue';
import Register from '@/view/Register.vue';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: '/register',
        component: Register
    }
];

export const dynamicRouter: Array<RouteRecordRaw> = [
    {
        path: '/', 
        component: Base,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home
            }
        ]
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});