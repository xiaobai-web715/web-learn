import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import store from './store/index';
import App from './App.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: []
});
let app = createApp(App);
app.use(store).use(router).mount('#app');
