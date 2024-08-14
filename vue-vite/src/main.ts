/*
 * @Author: ***
 * @Date: 2024-06-23 11:26:22
 * @LastEditTime: 2024-08-14 08:58:49
 * @LastEditors: ***
 * @Description: 
 * @FilePath: \web-learn\vue-vite\src\main.ts
 * 加油搞起来
 */
import { createApp, App as AppI } from 'vue';
import store from './store/index.js';
import router from './router/index.js';
import App from './App.vue';
import { routerBeforeEach } from '@/router/route.js';
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
import VxeTable from 'vxe-table';
import 'vxe-table/lib/style.css';

const test = import.meta.env.BASE_URL;
let instance: AppI<Element> | null = null;
function render(props) {
    const { container } = props;
    const eventHub = mitt();
    routerBeforeEach(router, store); //动态权限路由管理
    instance = createApp(App);
    console.log('instance', instance, props);
    instance.config.globalProperties.eventHub = eventHub;
    instance.use(store).use(router).use(ElementPlus).use(Antd).use(VxeTable).mount(
        container ? container.querySelector('#app') : '#app'
    );
}
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render({});
} else if (window.__POWERED_BY_WUJIE__) {
    let instance: any;
    window.__WUJIE_MOUNT = () => {
        render({});
    };
    window.__WUJIE_UNMOUNT = () => {
        instance.unmount();
    };
    /*
        由于vite是异步加载，而无界可能采用fiber执行机制
        所以mount的调用时机无法确认，框架调用时可能vite
        还没有加载回来，这里采用主动调用防止用没有mount
        无界mount函数内置标记，不用担心重复mount
    */
    window.__WUJIE.mount();
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
