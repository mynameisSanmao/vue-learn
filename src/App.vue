<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <my-from :model="inputData" :rules="rules" ref="form">
      <my-from-item label="用户名" prop="name">
        <div>
          <my-input v-model="inputData.name" @input="myInput"></my-input>
        </div>
      </my-from-item>

      <hr>
      <my-from-item label="密码" prop="pass">
        <my-input v-model="inputData.pass" type="password"></my-input>
      </my-from-item>
    </my-from>
    <button @click="handleSubmit">提交</button>
    <button @click="handleRe">重置</button>
  </div>
</template>

<script>
import myInput from "./components/myInput.vue";
import myFromItem from "./components/myFromItem.vue";
import myFrom from "./components/myFrom.vue";

export default {
  name: "app",
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
    },
    handleRe() {
      this.$refs.form.resite();
    },
    myInput() {}
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
