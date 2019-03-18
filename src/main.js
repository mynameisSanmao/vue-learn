import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
Vue.config.productionTip = false
// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    console.log('需要登录');
    if (false) { // 判断当前的token是否存在 ； 登录存入的token
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