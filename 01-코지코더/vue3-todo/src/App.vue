<template>
  <Navbar />

  <div class="container">
    <router-view />
  </div>

  <Toast />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Toast from "@/components/Toast.vue";

export default {
  components: {
    Navbar,
    Toast,
  },
};
</script>

<style scoped lang="scss">
.menu {
  margin: 10px auto;

  &-itemWrapper {
    display: flex;
    justify-content: center;
    list-style-type: none;

    &-item {
      padding: 4px 20px;

      font-size: 2rem;
      font-weight: 900;

      & > a {
        color: inherit;
        text-decoration: none;

        &:hover {
          color: #999;
        }
      }
    }
  }
}
</style>
