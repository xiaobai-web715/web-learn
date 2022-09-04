import {createApp} from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
const store = createStore({
    state: {
        count: 11
    },
    mutations: {
        increment (state) {
            state.count++;
        }
    }
})
let app = createApp(App);
app.use(store).mount('#app');
