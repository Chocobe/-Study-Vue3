<template>
  <h1>Todo 페이지</h1>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    console.log(route.params.id);
  },
};
</script>

<style scoped lang="scss">
//
</style>
