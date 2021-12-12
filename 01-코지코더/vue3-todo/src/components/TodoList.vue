<template>
  <div v-for="(todo, idx) in todos" :key="idx" class="card mt-2">
    <div class="card-body p-2 d-flex align-items-center">
      <div class="form-check flex-grow-1">
        <input
          class="form-check-input"
          type="checkbox"
          :id="todo.id"
          :checked="todo.completed"
          @change="() => toggleTodo(idx)"
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
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  emits: ["toggleTodo", "deleteTodo"],

  setup(_props, { emit }) {
    const toggleTodo = idx => {
      emit("toggleTodo", idx);
    };

    const deleteTodo = idx => {
      emit("deleteTodo", idx);
    };

    return {
      toggleTodo,
      deleteTodo,
    };
  },
};
</script>

<style>
.todo_completed {
  color: #383841;
  text-decoration: line-through;
}
</style>
