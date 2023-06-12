import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import Ponto from "./views/Ponto.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/ponto", component: Ponto }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
