import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login') // 路由懒加载，使用倒了路由界面再去请求
  }
]

const router = new VueRouter({
  routes
})

export default router
