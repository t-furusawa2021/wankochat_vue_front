import Vue from 'vue'
import VueRouter from 'vue-router'
// コンポーネント群
import ChatComponent from "../components/ChatComponent"
import LoginComponent from "../components/LoginComponent"
import HomeComponent from "../components/HomeComponent"
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent,
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatComponent,
    meta: { authOnly: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent,
    meta: { guestOnly: true }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
