<template>
  <div v-if="loading">Loading..</div>

  <form v-else @submit.prevent="saveTodo">
    <div class="row">
      <div class="col-6">
        <Input v-model="todo.subject" label="서브젝트" :error="subjectError" />
      </div>

      <div v-if="isEditingType" class="col-6">
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

      <div class="col-12">
        <label>Body</label>

        <textarea
          v-model="todo.body"
          class="form-control"
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </div>

    <div class="mt-4 d-flex" style="gap: 12px">
      <button type="submit" class="btn btn-primary" :disabled="!isChanged">
        {{ isEditingType ? "수정" : "생성" }}
      </button>

      <button class="btn btn-outline-dark" @click="moveToTodoListPage">
        취소
      </button>
    </div>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useToast } from "@/composables/useToast";

import myAxios from "@/myAxios";
import _ from "lodash";

import Input from "@/components/Input.vue";

export default {
  props: {
    isEditingType: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const todo = ref({
      subject: "",
      completed: false,
      body: "",
    });
    const originTodo = ref(null);

    const isChanged = computed(() => {
      return !_.isEqual(todo.value, originTodo.value);
    });

    const { showToast, toastMessage, toastAlertType, triggerToast } =
      useToast();

    const loading = ref(false);

    const getTodo = async () => {
      try {
        loading.value = true;

        const response = await myAxios.get(`todos`, {
          params: route.params,
        });

        todo.value = { ...response.data?.[0] };
        originTodo.value = { ...response.data?.[0] };
        loading.value = false;
      } catch (_e) {
        triggerToast("[로딩 실패] 잠시 후 다시 시도해 주세요", "danger");
      }
    };
    props.isEditingType && getTodo();

    const toggleTodoStatus = () => {
      const { completed } = todo.value;
      todo.value.completed = !completed;
    };

    const subjectError = ref("");

    const saveTodo = async () => {
      subjectError.value = "";

      if (!todo.value.subject) {
        subjectError.value = "subject 는 필수 입력 입니다.";
        return;
      }

      try {
        let response;
        let payload = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        };
        let resultMessage = "";

        if (props.isEditingType) {
          response = await myAxios.put(`todos/${todo.value.id}`, payload);

          resultMessage = "수정 완료";
          originTodo.value = { ...response.data };
          todo.value = { ...response.data };
        } else {
          await myAxios.post("todos", payload);

          resultMessage = "생성 완료";
          todo.value = {
            subject: "",
            body: "",
            completed: false,
          };
        }

        triggerToast(resultMessage, "success");

        if (!props.isEditingType) {
          router.push({
            name: "todos",
          });
        }
      } catch (_e) {
        triggerToast("[저장 실패] 잠시 후 다시 실행해 주세요", "danger");
      }
    };

    const moveToTodoListPage = () => {
      router.push({
        name: "todos",
      });
    };

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
      subjectError,
    };
  },

  components: {
    Input,
  },
};
</script>

<style scoped lang="scss">
//
</style>
