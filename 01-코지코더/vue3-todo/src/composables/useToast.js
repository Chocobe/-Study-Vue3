import { computed } from "vue";
import { useStore } from "vuex";

export const useToast = () => {
  const $store = useStore();
  const toasts = computed(() => $store.state.toast.toasts);

  // const showToast = computed(() => $store.state.toast.showToast);
  // const toastMessage = computed(
  //   () => $store.getters["toast/toastMessageWithSmile"],
  // );
  // const toastAlertType = computed(() => $store.state.toast.toastAlertType);

  const triggerToast = (message, type) => {
    $store.dispatch("toast/triggerToast", { message, type });
  };

  return {
    toasts,
    // showToast,
    // toastMessage,
    // toastAlertType,
    triggerToast,
  };
};
