<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        Chocobe
      </router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" :to="{ name: 'todos' }">
              Todos
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script>
export default {
  //
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
