<template>
  <div class="container">
    <h2>Todo List</h2>

    <TodoSimpleForm @addTodo="addTodo" />

    <div v-if="!todos.length">ToDo 를 입력해 주세요.</div>

    <TodoList
      :todos="todos"
      @toggleTodo="toggleTodo"
      @deleteTodo="deleteTodo"
    />
  </div>
</template>

<script>
import { ref } from "vue";

import TodoSimpleForm from "@/components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";

export default {
  setup() {
    const todo = ref("초코비");
    const todos = ref([
      {
        id: 1,
        subject: "Chain of Responsibilities 복습",
        completed: false,
      },
      {
        id: 2,
        subject: "Vue3 스터디",
        completed: false,
      },
    ]);

    const hasError = ref(false);

    const addTodo = todo => {
      todos.value.push(todo);
    };

    const toggleTodo = idx => {
      const targetTodo = todos.value[idx];
      const { completed } = targetTodo;
      targetTodo.completed = !completed;
    };

    const deleteTodo = idx => {
      todos.value.splice(idx, 1);
    };

    return {
      todo,
      todos,
      hasError,
      addTodo,
      toggleTodo,
      deleteTodo,
    };
  },

  components: {
    TodoSimpleForm,
    TodoList,
  },
};
</script>

<style scoped lang="scss"></style>
