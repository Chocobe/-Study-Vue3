<template>
  <router-view />

  <div class="container">
    <h2>Todo List</h2>

    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="검색"
      @keyup.enter="searchTodos"
    />

    <hr />

    <TodoSimpleForm @addTodo="addTodo" />

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
</template>

<script>
import { ref, computed, watch } from "vue";
import axios from "axios";

import TodoSimpleForm from "@/components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";

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
        error.value = "todos 를 받아오지 못하였습니다..";
        console.log(err);
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
        error.value = "Something went wrong";
        console.log(err);
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
        error.value = "네트워크가 원활하지 않습니다.";
        console.log(err);
      }
    };

    const deleteTodo = async idx => {
      error.value = "";
      const { id } = todos.value[idx];

      try {
        await axios.delete(`http://localhost:3000/todos/${id}`);
        getTodos(1);
      } catch (err) {
        console.log(err);
      }
    };

    let timeoutId = undefined;

    watch(searchText, () => {
      !isNaN(timeoutId) && clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        getTodos(1);
      }, 2000);
    });

    const searchTodos = () => {
      !isNaN(timeoutId) && clearTimeout(timeoutId);
      getTodos(1);
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
    };
  },

  components: {
    TodoSimpleForm,
    TodoList,
  },
};
</script>

<style scoped lang="scss"></style>
