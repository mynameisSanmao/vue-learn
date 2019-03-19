<template>
  <div>
    <header class="header-bar">
      <div class="head h-100">
        <div class="fl">欢迎进入MChat！</div>
        <div class="fr">
          <i class="dib user-name">{{ userInfo.user ? userInfo.user.substring(0,1) : ''}}</i>
          <i>{{userInfo.user}}</i>
          <i class="dib user-back font-size-12" @click="logOut">退出</i>
        </div>
      </div>
    </header>
    <router-view></router-view>
    <!-- <footer>沟通从未如此困难</footer> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "index",

  data() {
    return {
      userInfo: {
        user: ""
      }
    };
  },
  created() {
    if (window.localStorage.getItem("isLogin")) {
      this.userInfo = JSON.parse(window.localStorage.getItem("isLogin"));
    }
  },
  methods: {
    /**
     * @desc 退出登录
     */
    logOut() {
      window.localStorage.removeItem("isLogin");
      const url = "/register";
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
.header-bar {
  height: 40px;
  line-height: 40px;
  background: #f8f8f8;
  color: #999;
}

.user-back {
  margin-left: 10px;
  cursor: pointer;
}
.user-back:hover {
  color: #31bbac;
}
</style>


