<template>
  <Modal>
    <template #title>Delete Modal 🐫</template>

    <template #body>삭제 하시겠습니까??? 🐫</template>

    <template #footer>
      <button class="btn btn-secondary" @click="onClose">Close</button>
      <button class="btn btn-danger" @click="onDelete">삭제</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  setup(_props, { emit }) {
    const onClose = () => {
      emit("close");
    };

    const onDelete = () => {
      emit("delete");
    };

    return {
      onClose,
      onDelete,
    };
  },

  components: {
    Modal,
  },
};
</script>

<style></style>
