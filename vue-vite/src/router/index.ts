/*
 * @Author: ***
 * @Date: 2023-11-30 20:56:05
 * @LastEditTime: 2024-08-14 09:07:02
 * @LastEditors: ***
 * @Description: 
 * @FilePath: \web-learn\vue-vite\src\router\index.ts
 * 加油搞起来
 */
import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import Home from '../view/Home.vue';
import Base from '../view/Base/index.vue';
import Login from '../view/Login.vue';
import testVXTable from '../view/testVXTable.vue';
import Register from '@/view/Register.vue';
import nestingTable from '@/view/nestingTable.vue';
import flowChart from '@/view/flowChart.vue';   
import testComputed from '@/view/testComputed.vue';
import testKey from '@/view/testKey.vue';
import map from '@/view/map/index.vue';
import {
    qiankunWindow
} from 'vite-plugin-qiankun/dist/helper.js';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/test-vx_table',
        name: 'test-vx_table',
        component: testVXTable
    },
    {
        path: '/nestingTable',
        name: 'nestingTable',
        component: nestingTable
    },
    {
        path: '/flowChart',
        name: 'FlowChart',
        component: flowChart
    },
    {
        path: '/testComputed',
        name: 'testComputed',
        component: testComputed
    },
    {
        path: '/testKey',
        name: 'testKey',
        component: testKey
    },
    {
        path: '/map',
        name: 'map',
        component: map
    }
];

export const dynamicRouter: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
        component: Base,
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
    history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? 'app-vue-vite' : 'vite'),
    routes,
});