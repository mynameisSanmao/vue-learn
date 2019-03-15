<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p style="color:red;">{{ error }}</p>
  </div>
</template>
<script>
//校验
import Schema from "async-validator";
import Emitter from "../mixins/emitter.js";
export default {
  name: "myFromItem",
  inject: ["form"],
  mixins: [Emitter],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop];
    }
  },
  mounted() {
    this.$on("validator", this.validator);
    if (this.prop) {
      this.dispatch("myFrom", "on-form-item-add", this);
      this.initialValue = this.fieldValue;
    }
  },
  data() {
    return {
      error: "",
      initialValue: {}
    };
  },
  methods: {
    // 重置数据
    resetField() {
      this.error = "";
      this.form.model[this.prop] = this.initialValue;
    },
    validator() {
      //执行具体校验工作
      //1.获取校验规则
      const rules = this.form.rules[this.prop];

      //2.获取数据模型
      const value = this.form.model[this.prop];

      //3.校验对象
      const descriptor = { [this.prop]: rules };

      //4.创建校验器
      const schema = new Schema(descriptor);

      //校验
      schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    }
  }
};
</script>
<style scoped>
</style>


