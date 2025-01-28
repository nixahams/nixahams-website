export const netRoutes = [
  {
    path: "/nets",
    name: "nets",
    component: () => import("@/pages/NetsPage.vue"),
  },
  {
    path: "/nets/regional",
    name: "regional",
    component: () => import("@/pages/RegionalNetsPage.vue"),
  },
  {
    path: "/nets/preamble",
    name: "preamble",
    component: () => import("@/pages/PreambleNetsPage.vue"),
  },
  {
    path: "/nets/interest",
    name: "interest",
    component: () => import("@/pages/InterestNetsPage.vue"),
  },
];
