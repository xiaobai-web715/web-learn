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
import {
    renderWithQiankun,
    qiankunWindow,
    QiankunProps,
} from 'vite-plugin-qiankun/dist/helper.js';


let instance: AppI<Element> | null = null;
function render (props) {
    const { container } = props;
    const eventHub = mitt();
    routerBeforeEach(router, store); //动态权限路由管理
    instance = createApp(App);
    console.log('instance', instance, props);
    instance.config.globalProperties.eventHub = eventHub;
    instance.use(store).use(router).use(ElementPlus).use(Antd).mount(
        container ? container.querySelector('#app') : '#app'
    );
}
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render({});
} else {
    renderWithQiankun({
        bootstrap() {
            console.log('[vue] vue app bootstraped');
        },
        mount(props) { // 获取主应用传入数据
            console.log('[vue] props from main framework', props);
            render(props);
        },
        unmount(props) {
            console.log('[vue] props from main unmount', props);
            (instance as AppI<Element>).unmount();
            instance = null;
        },
        update(props) {
            console.log('[vue] props from main update', props);
        },
      });
}
