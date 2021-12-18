<template>
  <div v-for="(todo, idx) in todos" :key="idx" class="card mt-2">
    <div
      style="cursor: pointer"
      class="card-body p-2 d-flex align-items-center"
      @click="moveToPage(todo.id)"
    >
      <div class="flex-grow-1">
        <input
          class="mx-2"
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(idx, $event)"
          @click.stop
        />

        <span :class="{ todo_completed: todo.completed }">
          {{ todo.subject }}
        </span>
      </div>

      <div>
        <button
          class="btn btn-danger btn-sm"
          @click.stop="() => openModal(todo.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>

  <teleport to="#modal">
    <Modal v-if="isShowModal" @delete="deleteTodo" @close="closeModal" />
  </teleport>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Modal from "@/components/Modal.vue";

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

    const isShowModal = ref(false);
    const todoDeleteId = ref(null);

    const deleteTodo = () => {
      emit("deleteTodo", todoDeleteId.value);
      isShowModal.value = false;
      todoDeleteId.value = null;
    };

    const openModal = todoId => {
      todoDeleteId.value = todoId;
      isShowModal.value = true;
    };

    const closeModal = () => {
      todoDeleteId.value = null;
      isShowModal.value = false;
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

      isShowModal,
      openModal,
      closeModal,
    };
  },

  components: {
    Modal,
  },
};
</script>

<style>
.todo_completed {
  color: #383841;
  text-decoration: line-through;
}
</style>
