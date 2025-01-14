// Create separate route modules
export const hamfestRoutes = [
  {
    path: "/hamfest",
    name: "AboutHamfest",
    component: () => import("@/pages/Hamfest/AboutHamfest.vue"),
  },
  {
    path: "/hamfest/tickets",
    name: "HamfestTickets",
    component: () => import("@/pages/Hamfest/HamfestTickets.vue"),
  },
  {
    path: "/hamfest/attendees",
    name: "HamfestAttendees",
    component: () => import("@/pages/Hamfest/HamfestAttendees.vue"),
    meta: { needsAuth: true },
  },
  {
    path: "/hamfest/thankyou",
    name: "HamfestThankYou",
    component: () => import("@/pages/Hamfest/ThankYou.vue"),
  },
];
