import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'
import register from '@/components/register.vue'
import index from '@/pages/index.vue'
import chatRoom from '@/pages/chatRoom.vue'
import userList from '@/pages/userList.vue'
Vue.use(Router)
var isLogin = false;
if (window.localStorage.getItem('isLogin')) {
  isLogin = JSON.parse(window.localStorage.getItem('isLogin'))._id;
} else {
  isLogin = false;
}
var routes = [{
    path: '/',
    redirect: to => {
      if (isLogin) {
        return '/mChat'
      } else {
        return '/register'
      }
    }
  },
  {
    path: '/login',
    name: "Login",
    component: login
  },
  {
    path: '/register',
    name: "Register",
    component: register
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
          return 'user/list'
        }
      },
      {
        path: 'user/list',
        component: userList,
        meta: {
          requireAuth: true // 判断是否需要登录
        },
      },
      {
        path: 'user/room/:id',
        component: chatRoom,
        meta: {
          requireAuth: true // 判断是否需要登录
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