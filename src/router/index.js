import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login') // 路由懒加载，使用倒了路由界面再去请求
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName:"base" */ '@/views/Video')
      },
      {
        path: '/my',
        component: () => import(/* webpackChunkName:"base" */ '@/views/My')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      }
    ]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName:"search" */'@/views/Search')
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName:"user" */'@/views/User')
  }
]

const router = new VueRouter({
  routes
})

export default router
