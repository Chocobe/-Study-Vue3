<template>
  <!-- <div v-for="(todo, idx) in todos" :key="idx" class="card mt-2"> -->
  <List :items="todos">
    <template #default="{ item, index }">
      <div
        style="cursor: pointer"
        class="card-body p-2 d-flex align-items-center"
        @click="moveToPage(item.id)"
      >
        <div class="flex-grow-1">
          <input
            class="mx-2"
            type="checkbox"
            :checked="item.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
          />

          <span :class="{ todo_completed: item.completed }">
            {{ item.subject }}
          </span>
        </div>

        <div>
          <button
            class="btn btn-danger btn-sm"
            @click.stop="() => openModal(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
  </List>

  <teleport to="#modal">
    <DeleteModal v-if="isShowModal" @delete="deleteTodo" @close="closeModal">
      <template v-slot:title>Delete Todo 🐫🐫🐫</template>

      <template v-slot:body>삭제하시겠습니까???</template>

      <template v-slot:footer>🚀🚀🚀</template>
    </DeleteModal>
  </teleport>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import List from "@/components/List.vue";
import DeleteModal from "@/components/DeleteModal.vue";

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

      emit("toggleTodo", idx, e.target.checked);
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
    List,
    DeleteModal,
  },
};
</script>

<style>
.todo_completed {
  color: #383841;
  text-decoration: line-through;
}
</style>
