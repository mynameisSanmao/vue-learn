import Vue from 'vue'
import Vuex from 'vuex'
import money from './modules/a';
import count from './modules/b';
import login from './modules/login';

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    money,
    count,
    login
  }
})