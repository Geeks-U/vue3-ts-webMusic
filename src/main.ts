import { createApp } from 'vue'
// import './style.css'  // 引入根组件样式
import App from './App.vue'  // 引入根组件
import router from './router/index'  // 引入路由
import { createPinia } from 'pinia'  // 引入 Pinia
import piniaPersistedState from 'pinia-plugin-persistedstate'  // 引入持久化插件

createApp(App)
  .use(router)  // 使用路由
  .use(createPinia().use(piniaPersistedState))  // 使用 Pinia 和持久化插件
  .mount('#app')
