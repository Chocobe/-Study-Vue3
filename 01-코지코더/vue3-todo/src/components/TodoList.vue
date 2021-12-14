<template>
  <div v-for="(todo, idx) in todos" :key="idx" class="card mt-2">
    <div
      class="card-body p-2 d-flex align-items-center"
      @click="moveToPage(todo.id)"
    >
      <div class="form-check flex-grow-1">
        <input
          class="form-check-input"
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(idx, $event)"
          @click.stop
        />

        <label
          style="cursor: pointer"
          class="form-check-label"
          :class="{ todo_completed: todo.completed }"
        >
          {{ todo.subject }}
        </label>
      </div>

      <div>
        <button
          class="btn btn-danger btn-sm"
          @click.stop="() => deleteTodo(idx)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

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
    const toggleTodo = (idx, e) => {
      console.log(`checked: `);
      console.log(e);

      emit("toggleTodo", idx, event.target.checked);
    };

    const deleteTodo = idx => {
      emit("deleteTodo", idx);
    };

    const $router = useRouter();
    const moveToPage = id => {
      $router.push({
        name: "todo",
        params: { id },
      });
    };

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
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
