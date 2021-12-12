<template>
  <div class="container">
    <h2>Todo List</h2>

    <TodoSimpleForm @addTodo="addTodo" />

    <div v-if="!todos.length">ToDo 를 입력해 주세요.</div>

    <div v-for="(todo, idx) in todos" :key="idx" class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input
            class="form-check-input"
            type="checkbox"
            :id="todo.id"
            v-model="todo.completed"
          />

          <label
            class="form-check-label"
            :class="{ todo_completed: todo.completed }"
            :for="todo.id"
          >
            {{ todo.subject }}
          </label>
        </div>

        <div>
          <button class="btn btn-danger btn-sm" @click="() => deleteTodo(idx)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import TodoSimpleForm from "@/components/TodoSimpleForm.vue";

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

    const deleteTodo = idx => {
      todos.value.splice(idx, 1);
    };

    return {
      todo,
      todos,
      hasError,
      addTodo,
      deleteTodo,
    };
  },

  components: {
    TodoSimpleForm,
  },
};
</script>

<style scoped lang="scss">
.todo_completed {
  color: #383841;
  text-decoration: line-through;
}
</style>
