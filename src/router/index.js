import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/HomePage.vue";
import Nets from "@/pages/NetsPage.vue";
import Nets_Regional from "@/pages/RegionalNetsPage.vue";
import Nets_Preamble from "@/pages/PreambleNetsPage.vue";
import Nets_Interest from "@/pages/InterestNetsPage.vue";
import Repeaters from "@/pages/RepeatersPage.vue";
import Meetings from "@/pages/MeetingPage.vue";
import Roster from "@/pages/RosterPage.vue";
import DMR from "@/pages/DMRPage.vue";
import Bylaw from "@/pages/BylawPage.vue";
import Officers from "@/pages/OfficersPage.vue";
import Invalid from "@/pages/InvalidPage.vue";
import Contact from "@/pages/ContactPage.vue";
// import Alpha from "@/pages/AlphaPage.vue";
import Account from "@/pages/AccountPage.vue";
// import Donate from '@/pages/DonationPage.vue';
import Profile from "@/pages/Profile.vue";
import HamfestTickets from "@/pages/Hamfest/HamfestTickets.vue";
import HamfestThankYou from "@/pages/Hamfest/ThankYou.vue";
import AccountSetup from "@/pages/AccountSetup.vue";
import CreateAccount from "@/pages/CreateAccount.vue";

// Hamfest Pages
import HamfestAttendees from "@/pages/Hamfest/HamfestAttendees.vue";
import AboutHamfest from "@/pages/Hamfest/AboutHamfest.vue";

import admin from "@/admin/pages/AdminPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, name: "home" },
    { path: "/nets", component: Nets, name: "nets" },
    {
      path: "/nets/regional",
      component: Nets_Regional,
      name: "regional",
      meta: { needsAuth: false },
    },
    {
      path: "/nets/preamble",
      component: Nets_Preamble,
      name: "preamble",
      meta: { needsAuth: false },
    },
    {
      path: "/nets/interest",
      component: Nets_Interest,
      name: "interest",
      meta: { needsAuth: false },
    },
    {
      path: "/repeaters",
      component: Repeaters,
      name: "repeaters",
      meta: { needsAuth: false },
    },
    {
      path: "/meetings",
      component: Meetings,
      name: "meetings",
      meta: { needsAuth: false },
    },
    {
      path: "/roster",
      component: Roster,
      name: "roster",
      meta: { needsAuth: false },
    },
    { path: "/dmr", component: DMR, name: "dmr", meta: { needsAuth: false } },
    { path: "/bylaws", component: Bylaw, name: "bylaws" },
    {
      path: "/officers",
      component: Officers,
      name: "officers",
      meta: { needsAuth: false },
    },
    {
      path: "/contact",
      component: Contact,
      name: "contact",
      meta: { needsAuth: false },
    },
    // { path: "/alpha", component: Alpha, meta: { needsAuth: false }},
    { path: "/profile", component: Profile, name: "profile" },
    //props method creates a prop from URL query
    {
      path: "/account",
      component: Account,
      name: "Account",
      props(route) {
        return { method: route.query.method };
      },
    },
    {
      path: "/hamfest/attendees",
      component: HamfestAttendees,
      name: "HamfestAttendees",
      meta: { needsAuth: true },
    },
    {
      path: "/hamfest",
      component: AboutHamfest,
      name: "AboutHamfest",
    },
    {
      path: "/hamfest/tickets",
      component: HamfestTickets,
      name: "HamfestTickets",
    },
    {
      path: "/hamfest/thankyou",
      component: HamfestThankYou,
      name: "HamfestThankYou",
    },
    {
      path: "/register",
      component: AccountSetup,
      name: "AccountSetup",
    },
    // { path: '/donate', component: Donate},
    // { path: "/:pathMatch(.*)*", component: Invalid },
    {
      path: "/admin",
      component: admin,
      name: "admin",
      meta: { needsAuth: true },
    },
    {
      path: "/create-account",
      component: CreateAccount,
      name: "CreateAccount",
    },
    { path: "/:pathMatch(.*)*", redirect: "/404", name: "NotFound" },
    {
      path: "/404",
      name: "PageNotExist",
      component: () => Invalid,
      meta: { needsAuth: false },
    },
  ],
});

// Global navigation guard
// router.beforeEach(async (to, from, next) => {
//   const userStore = useUserStore();

//   if (to.meta.needsAuth) {
//     // Check if user is authenticated
//     if (!userStore.isAuthenticated) {
//       return next("/account?method=login");
//     }

//     try {
//       // Example: Verify user session
//       const isAuthenticated = await axios.post("/users/verify", {
//         email: userStore.user.email,
//       });
//       if (!isAuthenticated.data.valid) {
//         userStore.logout();
//         return next("/account?method=login");
//       }
//       next();
//     } catch (error) {
//       console.error("Authentication error:", error);
//       return next("/account?method=login");
//     }
//   } else {
//     next();
//   }
// });

export default router;
