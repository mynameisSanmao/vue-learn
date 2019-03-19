<template>
  <div>
    <div class="head user-wraap bg-w">
      <header class="other-name border-b">{{ name }}</header>
      <main class>
        <ul>
          <li
            class="user-item"
            v-for="item in chatmsg"
            :key="item._id"
            :class="{'textl':item.from==id}"
          >{{ item.content }}</li>
        </ul>
        <section class="msg-edit">
          <div class="dib msg-left">
            <input type="text" class="msg-input" v-model="msg" @keyup.enter="sendMsg">
          </div>
          <div class="dib msg-right">
            <button class="msg-btn" @click="sendMsg">发送</button>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "chatRoom",
  data() {
    return {
      name: "",
      id: "",
      userInfo: {},
      msg: ""
    };
  },
  computed: {
    ...mapState({
      chatmsg: state => state.user.chatmsg
    })
  },
  created() {
    this.name = this.$route.query.name;
    this.id = this.$route.params.id;
    if (window.localStorage.getItem("isLogin")) {
      this.userInfo = JSON.parse(window.localStorage.getItem("isLogin"));
    }
  },
  mounted() {
    let self = this;
    let chatObjId = {
      from_id: self.userInfo._id,
      to_id: self.id
    };
    if (!this.chatmsg.length) {
      this.$store.dispatch("user/getMsgList", chatObjId);
      this.$store.dispatch("user/recvmsg", this.userInfo._id);
    }
  },
  methods: {
    //发送消息
    sendMsg() {
      const from = this.userInfo._id;
      const to = this.id;
      const msg = this.msg;
      this.$store.dispatch("user/sendMsg", { from, to, msg });
      this.msg = "";
    }
  }
};
</script>
<style scoped>
.other-name {
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  font-weight: 600;
}
.user-item {
  height: 40px;
  line-height: 40px;
  text-align: right;
  margin: 0 15px;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
.msg-edit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  box-sizing: border-box;
}
.msg-left {
  margin-left: 15px;
  flex: 1;
  display: flex;
}
.msg-right {
  margin-right: 15px;
}
.msg-input {
  background: #fff;
  height: 30px;
  border: 1px solid #f5f7fc;
  width: 99%;
  padding-right: 10px;
  box-sizing: border-box;
}
.msg-btn {
  width: 100px;
  height: 30px;
  border: 1px solid #f5f7fc;
  border-radius: 10px;
  cursor: pointer;
}
.msg-btn:hover {
  background-color: #f6f6f6;
  transition: background-color 0.5s;
}
.textl {
  text-align: left;
}
.textr {
  text-align: right;
}
</style>


