<template>
  <form @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-grow-1" style="margin-right: 10px">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="Type new To-Do"
        />
      </div>

      <div>
        <button class="btn btn-primary" type="submit">Add</button>
      </div>
    </div>

    <div v-show="hasError" style="color: #ff1493">
      This Field cannot be empty
    </div>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  setup(_props, context) {
    const todo = ref("");
    const hasError = ref(false);

    const onSubmit = () => {
      if (!todo.value) {
        hasError.value = true;
        return;
      }

      context.emit("addTodo", {
        id: Date.now(),
        subject: todo.value,
        completed: false,
      });

      todo.value = "";
      hasError.value = false;
    };

    return {
      todo,
      hasError,
      onSubmit,
    };
  },
};
</script>

<style scoped lang="scss">
//
</style>
