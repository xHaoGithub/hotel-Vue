import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home'
import Login from '../components/login'
import '../assets/logo.jpg'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/'
Vue.prototype.$http = axios

Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 代表将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数, 表示放行
  // next() 放行, next('/login') 强制跳转
  if (to.path === '/login') {
    return next()
  }
  // 从 sessionStroge 中获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

export default router
