import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import TablePage from "../views/TablePage.vue";
import LoginPage from "../views/LoginPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/table",
    name: "Table",
    component: TablePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
