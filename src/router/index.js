import { createRouter, createWebHistory } from "vue-router";
import { hamfestRoutes } from "./hamfest";
import { netRoutes } from "./nets";
import { useUserStore } from "@/stores/userStore";
import { adminRoutes } from "./admin";
import AnnouncementDetailPage from "@/pages/AnnouncementDetailPage.vue";

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
    //...hamfestRoutes,
    ...adminRoutes,
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
      path: "/profile",
      name: "Profile",
      component: () => import("@/pages/ProfilePage.vue"),
    },
    {
      path: "/roster",
      name: "Membership",
      component: () => import("@/pages/RosterPage.vue"),
    },
    {
      path: "/meetings",
      name: "Meetings",
      component: () => import("@/pages/MeetingPage.vue"),
    },
    {
      path: "/dmr",
      name: "DMR",
      component: () => import("@/pages/DMRPage.vue"),
    },
    {
      path: "/bylaws",
      name: "Bylaws",
      component: () => import("@/pages/BylawPage.vue"),
    },
    {
      path: "/officers",
      name: "Officers",
      component: () => import("@/pages/OfficersPage.vue"),
    },
    {
      path: "/contact",
      name: "Contact",
      component: () => import("@/pages/ContactPage.vue"),
    },
    {
      path: "/repeaters",
      name: "Repeaters",
      component: () => import("@/pages/RepeatersPage.vue"),
    },
    {
      path: "/repeaters/:id",
      name: "RepeaterDetails",
      component: () => import("../pages/RepeaterDetailsPage.vue"),
    },
    // {
    //   path: "/hamfest/tickets",
    //   component: HamfestTickets,
    //   name: "HamfestTickets",
    // },
    // {
    //   path: "/hamfest/thankyou",
    //   component: HamfestThankYou,
    //   name: "HamfestThankYou",
    // },
    {
      path: "/announcements",
      name: "Announcements",
      component: () => import("@/pages/AnnouncementsPage.vue"),
    },
    {
      path: "/announcements/:id",
      name: "AnnouncementDetail",
      component: AnnouncementDetailPage,
    },
    {
      path: "/testing",
      name: "Testing",
      component: () => import("@/pages/LicenseTestingPage.vue"),
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
