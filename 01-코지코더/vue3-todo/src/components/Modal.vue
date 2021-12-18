<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Todo</h5>
          <button type="button" class="btn-close" @click="onClose"></button>
        </div>
        <div class="modal-body">삭제 하시겠습니까?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="onClose">
            Close
          </button>
          <button type="button" class="btn btn-danger" @click="onDelete">
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style scoped lang="scss">
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(#383841, 0.5);

  z-index: 4;
}
</style>
