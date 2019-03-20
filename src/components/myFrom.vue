<template>
  <form class="head">
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: "myFrom",
  provide() {
    // 把表单实例作为参数传递下去，子代可以直接使用 myFrom组件的任何数据和方法
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      default: function() {
        return {};
      },
      required: true
    },
    rules: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  created() {
    this.$on("on-form-item-add", field => {
      if (field) this.fields.push(field);
    });
  },
  data() {
    return {
      fields: []
    };
  },
  methods: {
    validate(callback) {
      return new Promise(resolve => {
        let valid = true;
        let count = 0;
        this.fields.forEach(field => {
          field.validator("", errors => {
            if (errors) {
              valid = false;
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid);
              if (typeof callback === "function") {
                callback(valid);
              }
            }
          });
        });
      });
    },
    resite() {
      this.fields.forEach(field => {
        field.resetField();
      });
    }
  }
};
</script>
<style scoped>
</style>


