import { createApp } from 'vue'
import antd from "ant-design-vue"
import router from './router'
import './style.css'
import Index from './index.vue'

createApp(Index).use(router).use(antd).mount('#app')
