import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// })
const router = createRouter({
  history: createWebHistory(), // 인자를 비워두세요
  routes,
})
export default router
