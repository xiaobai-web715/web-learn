import { createApp } from 'vue';
import store from './store';
import router from './router';
import App from './App.vue';
import {routerBeforeEach} from '@/router/route';
import '@/assets/public.scss';
import ElementPlus from 'element-plus';
import * as Antd from 'ant-design-vue';
import ElementUI from 'element-ui';
import mitt from 'mitt';
import 'element-plus/dist/index.css';

const eventHub = mitt();
routerBeforeEach(router, store); //动态权限路由管理

const app = createApp(App);
app.config.globalProperties.eventHub = eventHub;
app.use(store).use(router).use(ElementPlus).use(Antd).mount('#app');
