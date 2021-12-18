<template>
  <div
    class="alert alert-success toast-box"
    :class="`alert-${type}`"
    role="alert"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "기본값",
    },

    type: {
      type: String,
      default: "success",
    },
  },
};
</script>

<style scoped lang="scss">
.toast-box {
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>
