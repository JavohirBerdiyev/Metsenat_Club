import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import { useAuthStore } from "../store";



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
    path: "/home",
    name: "Home",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token; // Check if the user is authenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to the login page if authentication is required but the user is not authenticated
    next("/login");
  } else {
    // Continue to the next route
    next();
  }
});


export default router;
