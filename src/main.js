import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import css from './assets/css/main.css'
import axios from "axios";
// axios.baseURI = "http//:localhost:9093";
// Vue.prototype.$http = axios;
Vue.config.productionTip = false
// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限

    var isLogin = false;
    if (window.localStorage.getItem('isLogin')) {
      isLogin = JSON.parse(window.localStorage.getItem('isLogin'))._id;
    } else {
      isLogin = false;
    }
    if (isLogin) { // 判断当前的token是否存在 ； 登录存入的token
      next();
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next();
  }
});
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')