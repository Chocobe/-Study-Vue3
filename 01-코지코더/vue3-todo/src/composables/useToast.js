import { ref, onUnmounted } from "vue";

export const useToast = () => {
  const showToast = ref(false);
  const toastMessage = ref("");
  const toastAlertType = ref("danger");

  let timeoutID = null;

  const triggerToast = (message, type) => {
    toastMessage.value = message;
    toastAlertType.value = type;
    showToast.value = true;

    timeoutID = setTimeout(() => {
      showToast.value = false;
      toastMessage.value = "";
      toastAlertType.value = "";
    }, 3000);
  };

  onUnmounted(() => {
    clearTimeout(timeoutID);
  });

  return {
    showToast,
    toastMessage,
    toastAlertType,
    triggerToast,
  };
};
