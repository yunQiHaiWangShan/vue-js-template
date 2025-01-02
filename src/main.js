import App from './App.vue'
import router from './router'

// 导入基础样式
import './styles/element/index.scss'
import './styles/index.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')
