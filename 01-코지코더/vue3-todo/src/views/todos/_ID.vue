<template>
  <h1>To-Do 페이지</h1>
  <TodoForm :isEditingType="true" />
</template>

<script>
import TodoForm from "@/components/TodoForm.vue";

export default {
  components: {
    TodoForm,
  },
};
</script>

<style scoped lang="scss">
//
</style>
