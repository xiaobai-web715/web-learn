import { createApp, App as AppI } from 'vue';
import store from './store/index.js';
import router from './router/index.js';
import App from './App.vue';
import {routerBeforeEach} from '@/router/route.js';
import '@/assets/public.scss';
import ElementPlus from 'element-plus';
import * as Antd from 'ant-design-vue';
import ElementUI from 'element-ui';
import mitt from 'mitt';
import 'element-plus/dist/index.css';


let instance: AppI<Element> | null = null;
function render (props) {
    const { container } = props;
    const eventHub = mitt();
    routerBeforeEach(router, store); //动态权限路由管理
    instance = createApp(App);
    instance.config.globalProperties.eventHub = eventHub;
    instance.use(store).use(router).use(ElementPlus).use(Antd).mount(
        container ? container.querySelector('#app') : '#app'
    );
}
if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}

export async function bootstrap() {
    console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
    console.log('[vue] props from main framework', props);
    render(props);
}

export async function unmount() {
    (instance as AppI<Element>).unmount();
    instance = null;
}
