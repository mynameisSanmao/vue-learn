<template>
  <div>
    <header class="head-title head pr">
      <div class="dib">M-Chat 注册</div>

      <div class="has-account">已有账号？
        <router-link to="/login">立即登录</router-link>
      </div>
    </header>
    <img alt="Vue logo" src="../assets/logo.png">
    <my-from :model="inputData" :rules="rules" ref="form">
      <my-from-item label="用户名" prop="name">
        <!-- <div class="dib"> -->
        <my-input v-model="inputData.name" @input="myInput"></my-input>
        <!-- </div> -->
      </my-from-item>

      <my-from-item label="密码" prop="pass">
        <my-input v-model="inputData.pass" type="password"></my-input>
      </my-from-item>
    </my-from>
    <footer class="btn-group">
      <button @click="handleSubmit">注册</button>
      <button @click="handleRe">重置</button>
    </footer>
  </div>
</template>
<script>
import myInput from "./myInput.vue";
import myFromItem from "./myFromItem.vue";
import myFrom from "./myFrom.vue";
export default {
  name: "Register",
  components: {
    myInput,
    myFromItem,
    myFrom
  },
  data() {
    return {
      inputData: {
        name: "",
        pass: ""
      },
      rules: {
        name: [{ message: "请输入用户名", required: true }],
        pass: [{ message: "请输入密码", required: true }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          window.alert("提交成功");
        } else {
          window.alert("表单校验失败");
        }
      });

      let self = this;
      let obj = {
        user: self.inputData.name,
        pwd: self.inputData.pass
      };
      if (self.inputData.name && self.inputData.pass) {
        this.$store.dispatch("user/register", obj);
      }
    },
    handleRe() {
      this.$refs.form.resite();
    },
    myInput() {}
  }
};
</script>
<style scoped>
.head-title {
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  font-weight: 700;
}
.has-account {
  height: 20px;
  line-height: normal;
  position: absolute;
  top: 8px;
  right: 0;
  font-size: 14px;
  font-weight: 100;
  cursor: pointer;
}
</style>


