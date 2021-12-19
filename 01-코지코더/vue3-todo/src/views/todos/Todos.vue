<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>Todo List</h2>
      <button class="btn btn-primary" @click="moveToTodoCreate">
        Create Todo
      </button>
    </div>

    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="검색"
      @keyup.enter="searchTodos"
    />

    <hr />

    <div style="color: red">{{ error }}</div>

    <div class="mt-2" v-if="!todos.length">There is noting to display</div>

    <TodoList
      :todos="todos"
      @toggleTodo="toggleTodo"
      @deleteTodo="deleteTodo"
    />

    <hr />

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a
            class="page-link"
            @click.prevent="getTodos(currentPage - 1)"
            style="cursor: pointer"
          >
            Previous
          </a>
        </li>
        <li
          v-for="page in numberOfPages"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
          style="cursor: pointer"
        >
          <a class="page-link" @click.prevent="getTodos(page)">{{ page }}</a>
        </li>
        <li v-if="numberOfPages !== currentPage" class="page-item">
          <a
            class="page-link"
            @click.prevent="getTodos(currentPage + 1)"
            style="cursor: pointer"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  </div>

  <transition name="fade">
    <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
  </transition>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import TodoList from "@/components/TodoList.vue";
import Toast from "@/components/Toast.vue";

import { useToast } from "@/composables/useToast";

export default {
  setup() {
    const todos = ref([]);
    const error = ref("");

    const numberOfTodos = ref(0);
    const limit = 3;
    const currentPage = ref(1);

    const numberOfPages = computed(() => {
      return Math.floor(numberOfTodos.value / limit) + 1;
    });

    const searchText = ref("");

    const { showToast, toastMessage, toastAlertType, triggerToast } =
      useToast();

    const getTodos = async (page = currentPage.value) => {
      error.value = "";
      currentPage.value = page;

      try {
        const res = await axios.get("http://localhost:3000/todos", {
          params: {
            subject_like: searchText.value,
            _sort: "id",
            _order: "desc",
            _limit: limit,
            _page: page,
          },
        });

        numberOfTodos.value = +res.headers["x-total-count"];
        todos.value = res.data;
      } catch (err) {
        triggerToast("todos 를 받아오지 못하였습니다..", "danger");
      }
    };
    getTodos();

    const addTodo = async todo => {
      error.value = "";

      try {
        await axios.post("http://localhost:3000/todos", {
          subject: todo.subject,
          completed: todo.completed,
        });

        getTodos(1);
      } catch (err) {
        triggerToast("Something went wrong", "danger");
      }
    };

    const toggleTodo = async (idx, completed) => {
      console.log(`completed: ${completed}`);

      const todo = todos.value[idx];

      try {
        error.value = "";
        await axios.patch(`http://localhost:3000/todos/${todo.id}`, {
          completed,
        });

        todo.completed = completed;
      } catch (err) {
        triggerToast("네트워크가 원활하지 않습니다.", "danger");
      }
    };

    const deleteTodo = async todoId => {
      error.value = "";

      try {
        await axios.delete(`http://localhost:3000/todos/${todoId}`);
        getTodos(1);
      } catch (err) {
        triggerToast("[삭제 실패] 네트워크가 원활하지 않습니다.", "danger");
      }
    };

    let timeoutID = undefined;

    watch(searchText, () => {
      !isNaN(timeoutID) && clearTimeout(timeoutID);

      timeoutID = setTimeout(() => {
        getTodos(1);
      }, 2000);
    });

    const searchTodos = () => {
      !isNaN(timeoutID) && clearTimeout(timeoutID);
      getTodos(1);
    };

    const $router = useRouter();

    const moveToTodoCreate = () => {
      $router.push({
        name: "todoCreate",
      });
    };

    return {
      todos,
      error,
      numberOfPages,
      currentPage,

      getTodos,
      addTodo,
      toggleTodo,
      deleteTodo,
      searchTodos,

      searchText,

      moveToTodoCreate,

      showToast,
      toastMessage,
      toastAlertType,
    };
  },

  components: {
    TodoList,
    Toast,
  },
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
