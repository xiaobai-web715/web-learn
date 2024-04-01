import 'ant-design-vue/dist/reset.css'
import { createApp } from 'vue'
import antd from "ant-design-vue"
import router from './router'
import Index from './index.vue'
import 'virtual:uno.css'
import './style.css'

createApp(Index).use(router).use(antd).mount('#app')
