<template>
  <h1 class="home">Home Page</h1>
  <div>count: {{ count }}</div>

  <button @click="increaseCount">카운트 증가</button>
</template>

<script>
import { useCount } from "@/composables/useCount";

export default {
  setup() {
    const { count } = useCount();

    return { count };
  },
};
</script>

<style scoped lang="scss">
.home {
  margin: 20px 0;

  color: #ff1493;
  text-shadow: 0 3px 6px #03a9f4;
  text-align: center;
  font-weight: 900;
}
</style>
