import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'
import A from '@/pages/a.vue'
import index from '@/pages/index.vue'
Vue.use(Router)
var isLogin = false;
if (window.localStorage.getItem('login')) {
  isLogin = window.localStorage.getItem('login');
} else {
  isLogin = false;
}
var routes = [{
    path: '/',
    name: "index",
    redirect: to => {
      if (isLogin) {
        return '/mChat'
      } else {
        return '/login'
      }
    }
  },
  {
    path: '/login',
    name: "Login",
    component: login
  },
  {
    path: '/mChat',
    component: index,
    meta: {
      requireAuth: true, // 判断是否需要登录
    },
    children: [{
        path: '',
        redirect: to => {
          return 'a'
        }
      },
      {
        path: 'a',
        name: 'A',
        component: A,
        meta: {
          requireAuth: true, // 判断是否需要登录
        },
      }
    ]
  }
]
export default new Router({
  mode: 'history',
  base: __dirname,
  routes: routes
})