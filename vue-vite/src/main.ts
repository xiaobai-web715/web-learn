import { createApp } from 'vue'
import store from './store'
import router from './router';
import App from './App.vue'
import {routerBeforeEach} from '@/router/route'

routerBeforeEach(router, store); //动态权限路由管理

createApp(App).use(store).use(router).mount('#app')
