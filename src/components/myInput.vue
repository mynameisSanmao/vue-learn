<template>
  <div class="dib">
    <input :type="type" :value="value" @input="onInput" class="text-input">
  </div>
</template>
<script>
export default {
  name: "myInput",
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {};
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
      this.$parent.$emit("validator");
    }
  }
};
</script>
<style scoped>
.text-input {
  padding: 0;
  padding-left: 5px;
  height: 30px;
  border-radius: 10px;
}
</style>


