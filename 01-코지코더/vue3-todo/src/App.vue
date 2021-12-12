<template>
  <div class="container">
    <h2>Todo List</h2>

    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="검색"
    />

    <hr />

    <TodoSimpleForm @addTodo="addTodo" />

    <div class="mt-2" v-if="!filteredTodos.length">
      There is noting to display
    </div>

    <TodoList
      :todos="filteredTodos"
      @toggleTodo="toggleTodo"
      @deleteTodo="deleteTodo"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";

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

    const searchText = ref("");
    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter(todo =>
          todo.subject.includes(searchText.value),
        );
      } else {
        return todos.value;
      }
    });

    return {
      todo,
      todos,
      hasError,
      addTodo,
      toggleTodo,
      deleteTodo,

      searchText,
      filteredTodos,
    };
  },

  components: {
    TodoSimpleForm,
    TodoList,
  },
};
</script>

<style scoped lang="scss"></style>
