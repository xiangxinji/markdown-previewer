import '@/assets/styles/highlight.scss'
import '@/assets/styles/base.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

const app = createApp(App)
app.use(router)
app.mount('#app')
