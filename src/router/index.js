import { createRouter, createWebHistory } from "vue-router";
import { hamfestRoutes } from "./hamfest";
import { netRoutes } from "./nets";
import { useUserStore } from "@/stores/userStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/pages/HomePage.vue"),
    },
    // Group related routes
    ...netRoutes,
    ...hamfestRoutes,
    // Auth routes
    {
      path: "/login",
      name: "Login",
      component: () => import("@/pages/Login.vue"),
    },
    {
      path: "/register",
      name: "AccountSetup",
      component: () => import("@/pages/AccountSetup.vue"),
    },
    {
      path: "/create-account",
      name: "CreateAccount",
      component: () => import("@/pages/CreateAccount.vue"),
    },
    {
      path: "/admin",
      name: "Admin",
      component: () => import("@/admin/pages/AdminPage.vue"),
      meta: {
        requiresAuth: true,
        allowedRoles: ["Admin", "Officer"],
      },
    },
    // Error routes
    {
      path: "/404",
      name: "PageNotExist",
      component: () => import("@/pages/InvalidPage.vue"),
      meta: { needsAuth: false },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
      name: "NotFound",
    },
  ],
});

/**
 * Navigation guard to check authentication and role requirements
 */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // Wait for hydration to complete if it's still loading
  if (userStore.loading) {
    await new Promise((resolve) => {
      const checkLoading = setInterval(() => {
        if (!userStore.loading) {
          clearInterval(checkLoading);
          resolve();
        }
      }, 100);
    });
  }

  // Check if route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!userStore.isAuthenticated) {
      next({ name: "Login", query: { redirect: to.fullPath } });
      return;
    }

    // Then checks for required roles
    if (to.meta.allowedRoles) {
      const hasRequiredRole = to.meta.allowedRoles.some((role) =>
        userStore.roles.includes(role)
      );

      if (!hasRequiredRole) {
        next({ name: "Home" });
        return;
      }
    }
  }

  next();
});

export default router;
