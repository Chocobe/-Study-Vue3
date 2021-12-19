import { reactive } from "vue";

export const useCount = () => {
  const state = reactive({
    count: 0,
  });

  return state;
};
