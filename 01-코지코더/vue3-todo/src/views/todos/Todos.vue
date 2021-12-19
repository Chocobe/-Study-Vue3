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

    <Pagination
      v-if="todos.length"
      :numberOfPages="numberOfPages"
      :currentPage="currentPage"
      @click="getTodos"
    />
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import myAxios from "@/myAxios";

import TodoList from "@/components/TodoList.vue";
import Pagination from "@/components/Pagination.vue";

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
        const res = await myAxios.get("todos", {
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
        await myAxios.post("todos", {
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
        await myAxios.patch(`todos/${todo.id}`, {
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
        await myAxios.delete(`todos/${todoId}`);
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
    Pagination,
  },
};
</script>

<style scoped lang="scss">
//
</style>
