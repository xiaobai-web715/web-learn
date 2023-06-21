import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import store from './store/index';
import App from './App.vue';
const debounce = (fn: ResizeObserverCallback, delay: number) => {
    let timer: number | undefined;
    return function () {
        let context = this;
        let args = arguments as any;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
};

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
    constructor(callback: ResizeObserverCallback) {
        callback = debounce(callback, 16);
        super(callback);
    }
};
const router = createRouter({
    history: createWebHistory(),
    routes: []
});
let app = createApp(App);
app.use(store).use(router).mount('#app');
