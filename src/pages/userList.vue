<template>
  <div>
    <div class="head user-wraap bg-w">
      <h1 class="border-b">用户列表</h1>
      <ul class="user-list">
        <li
          v-for="item in userList"
          :key="item._id"
          @click="goChatRoom(item._id,item.user)"
          class="user-item"
        >
          <i class="dib user-name text-center">{{ item.user ? item.user.substring(0,1) : ''}}</i>
          <i class="p-l-10">{{ item.user }}</i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "userList",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userList: state => state.user.userList
    })
  },
  created() {
    let userId = "";
    if (window.localStorage.getItem("isLogin")) {
      userId = JSON.parse(window.localStorage.getItem("isLogin"))._id;
    }
    this.$store.dispatch("user/getUserList", userId);
  },
  methods: {
    goChatRoom(id, name) {
      // const url = "/mChat/user/room/" + id;
      const url = `/mChat/user/room/${id}?name=${name}`;
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
.user-wraap {
  height: auto;
}
.user-list {
  height: 600px;
  overflow: auto;
}
.user-item {
  height: 40px;
  line-height: 40px;
  text-align: left;
  margin: 0 15px;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  cursor: pointer;
}
</style>


