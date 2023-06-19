import {createApp} from 'vue';
import store from './store/index';
import App from './App.vue';
let app = createApp(App);
app.use(store).mount('#app');
