import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login/index.vue'), // 懒加载组件
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router