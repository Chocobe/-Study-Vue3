<template>
  <div class="name">{{ name }}</div>
  <div class="user">{{ user }}</div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    const name = ref("초코비");

    const user = reactive({
      id: 0,
      name: "Chocobe",
    });

    return {
      name,
      user,
    };
  },
};
</script>

<style lang="scss">
.name,
.user {
  margin-left: 50px;
  color: #03a9f4;
  font-size: 24px;
  font-weight: 900;
}
</style>
