import Vue from 'vue'
import Router from 'vue-router'
import Login from './login/Index.vue'
import Main from '@/components/Main.vue'
import Home from './home/Index.vue'
import ShopList from './mallManage/shopList/Index.vue'
import MallList from './mallManage/mallList/Index.vue'
import ShopListDetail from './mallManage/shopListDetail/Index.vue'
import ForgetPwd from './login/ForgetPwd.vue'
import ResetPsd from './resetPsd/Index.vue'
import AllProcess from './task/allProcess/Index.vue'
import DoTask from './task/doTask/Index.vue'
import Launched from './task/launched/Index.vue'
import MyTask from './task/myTask/Index.vue'
import TaskDetail from './task/taskDetail/Index.vue'
import Mall from './mall/Index.vue'
import MallEidit from './mall/mallEidit/Index.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
      },
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forget',
      name: 'forget',
      component: ForgetPwd
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/main/home',
          name: 'home',
          component: Home
        },
        {
          path: '/main/shopList',
          name: 'shopList',
          component: ShopList
        },
        {
          path: '/main/mallList',
          name: 'mallList',
          component: MallList
        },
        {
          path: '/main/shopListDetail',
          name: 'shopListDetail',
          component: ShopListDetail
        },
        {
          path: '/main/resetPsd',
          name: 'resetPsd',
          component: ResetPsd
        },
        {
          path: '/main/allProcess',
          name: 'allProcess',
          component: AllProcess
        },
        {
          path: '/main/doTask',
          name: 'doTask',
          component: DoTask
        },
        {
          path: '/main/launched',
          name: 'launched',
          component: Launched
        },
        {
          path: '/main/myTask',
          name: 'myTask',
          component: MyTask
        },
        {
          path: '/main/taskDetail',
          name: 'taskDetail',
          component: TaskDetail
        },
        {
          path: '/main/mall',
          name: 'mall',
          component: Mall
        },
        {
          path: '/main/mallEidit',
          name: 'mallEidit',
          component: MallEidit
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('token') || to.name === 'login' || to.name === 'register' || to.name === 'forget') {
    next()
  } else {
    next('/')
  }
})
export default router
