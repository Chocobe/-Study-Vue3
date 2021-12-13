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

    <div style="color: red">{{ error }}</div>

    <div class="mt-2" v-if="!filteredTodos.length">
      There is noting to display
    </div>

    <TodoList
      :todos="filteredTodos"
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

    const obj = ref({
      a: 1,
      b: "a",
    });

    watch(
      () => [obj.value.a, obj.value.b],
      (cur, prev) => {
        console.log("와치 동작");
        console.log(cur);
        console.log(prev);
      },
      { deep: true },
    );

    setTimeout(() => {
      obj.value.a = 3;
    }, 1000);

    setTimeout(() => {
      obj.value.b = "🚀🚀🚀";
    }, 3000);

    // watch([currentPage, numberOfTodos], (cur, prev) => {
    //   console.log("와치!!!");
    //   console.log(cur);
    //   console.log(prev);
    // });

    const numberOfPages = computed(() => {
      return Math.floor(numberOfTodos.value / limit) + 1;
    });

    const getTodos = async (page = currentPage.value) => {
      error.value = "";
      currentPage.value = page;

      try {
        const res = await axios.get(
          `http://localhost:3000/todos?_limit=${limit}&_page=${page}`,
        );

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
        const { data } = await axios.post("http://localhost:3000/todos", {
          subject: todo.subject,
          completed: todo.completed,
        });

        todos.value.push(data);
      } catch (err) {
        error.value = "Something went wrong";
        console.log(err);
      }
    };

    const toggleTodo = async idx => {
      const todo = todos.value[idx];

      try {
        error.value = "";

        const completed = !todo.completed;
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
        todos.value.splice(idx, 1);
      } catch (err) {
        console.log(err);
      }
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
      todos,
      error,
      numberOfPages,
      currentPage,

      getTodos,
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
