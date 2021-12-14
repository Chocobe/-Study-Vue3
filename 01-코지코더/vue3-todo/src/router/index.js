import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/todos",
      name: "todos",
      component: () => import("@/views/todos/Todos.vue"),
    },
    {
      path: "/todos/:id",
      name: "todo",
      component: () => import("@/views/todos/_ID.vue"),
    },
  ],
});

export default router;
