<template>
  <h1>To-Do 페이지</h1>

  <div v-if="loading">Loading..</div>

  <form v-else @submit.prevent="saveTodo">
    <div class="row">
      <div class="col-6">
        <label>Subject</label>
        <input v-model="todo.subject" type="text" class="form-control" />
      </div>

      <div class="col-6">
        <label>Status</label>
        <div>
          <button
            type="button"
            class="btn btn-success"
            :class="todo.completed ? 'btn-success' : 'btn-danger'"
            @click="toggleTodoStatus"
          >
            {{ todo.completed ? "Completed" : "Incompleted" }}
          </button>
        </div>
      </div>
    </div>

    <div class="mt-4 d-flex" style="gap: 12px">
      <button type="submit" class="btn btn-primary" :disabled="!isChanged">
        저장
      </button>
      <button class="btn btn-outline-dark" @click="moveToTodoListPage">
        취소
      </button>
    </div>
  </form>

  <toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import { ref, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import _ from "lodash";

import Toast from "@/components/Toast.vue";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const todo = ref(null);
    const originTodo = ref(null);

    const isChanged = computed(() => {
      return !_.isEqual(todo.value, originTodo.value);
    });

    const showToast = ref(false);
    const toastMessage = ref("");
    const toastAlertType = ref("success");

    const loading = ref(true);
    const timeoutID = ref(null);

    const getTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todos`, {
          params: route.params,
        });

        todo.value = { ...response.data?.[0] };
        originTodo.value = { ...response.data?.[0] };
        loading.value = false;
      } catch (_e) {
        triggerToast("[로딩 실패] 잠시 후 다시 시도해 주세요", "danger");
      }
    };
    getTodo();

    const toggleTodoStatus = () => {
      const { completed } = todo.value;
      todo.value.completed = !completed;
    };

    const triggerToast = (message, type = "success") => {
      const { value } = showToast;

      toastMessage.value = message;
      toastAlertType.value = type;
      showToast.value = !value;

      timeoutID.value = setTimeout(() => {
        showToast.value = false;
        toastMessage.value = "";
      }, 2000);
    };

    const saveTodo = async () => {
      try {
        const response = await axios.put(
          `http://localhost:3000/todos/${todo.value.id}`,
          {
            ...todo.value,
          },
        );

        originTodo.value = { ...response.data };
        todo.value = { ...response.data };

        triggerToast("저장 완료 🐫", "success");
      } catch (_e) {
        triggerToast("[저장 실패] 잠시 후 다시 실행해 주세요", "danger");
      }
    };

    const moveToTodoListPage = () => {
      router.push({
        name: "todos",
      });
    };

    onUnmounted(() => {
      clearTimeout(timeoutID);
    });

    return {
      todo,
      loading,
      isChanged,
      showToast,
      toastMessage,
      toastAlertType,
      toggleTodoStatus,
      saveTodo,
      moveToTodoListPage,
    };
  },

  components: {
    Toast,
  },
};
</script>

<style scoped lang="scss">
//
</style>
