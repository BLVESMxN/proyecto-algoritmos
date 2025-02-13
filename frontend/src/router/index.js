import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GraphView from "../views/GraphView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/graph", component: GraphView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
