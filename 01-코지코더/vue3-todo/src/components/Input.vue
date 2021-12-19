<template>
  <div class="form-group">
    <label>{{ label }}</label>

    <input
      :value="modelValue"
      @input="onInput"
      type="text"
      class="form-control"
    />

    <div v-if="error" class="text-red">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },

    error: {
      type: String,
      default: "",
    },

    modelValue: {
      type: String,
      default: "",
    },
  },

  setup(_props, { emit }) {
    const onInput = ({ target: { value } }) => {
      emit("update:modelValue", value);
    };

    return {
      onInput,
    };
  },
};
</script>

<style scoped lang="scss">
.text-red {
  color: #ff1493;
}
</style>
