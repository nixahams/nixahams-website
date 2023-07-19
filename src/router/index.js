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
import Profile from "@/pages/ProfilePage.vue";

// Hamfest Pages
import Hamfest from "@/pages/Hamfest/HamfestAttendees.vue";

import admin from "@/admin/pages/AdminPage.vue";
//admin routes
import adminPage from "@/admin/testAdmin.vue";
import DashBoard from "@/admin/pages/AdminDash.vue";
import DashBoard_EMAIL from "@/admin/pages/dashboard/DashEmail.vue";
import DashBoard_DONATIONS from "@/admin/pages/dashboard/DashDonate.vue";
import DashBoard_VISITORS from "@/admin/pages/dashboard/DashVisitor.vue";

import EditPages from "@/admin/pages/AdminEdit.vue";
import EditPages_BANNER from "@/admin/pages/edit/EditBanner.vue";
import EditPages_NETS from "@/admin/pages/edit/EditNet.vue";
import EditPages_REPEATERS from "@/admin/pages/edit/EditRepeater.vue";
import EditPages_MEETING from "@/admin/pages/edit/EditMeeting.vue";
import EditPages_DMR from "@/admin/pages/edit/EditDmr.vue";
import EditPages_ROSTER from "@/admin/pages/edit/EditRoster.vue";
import EditPages_OFFICERS from "@/admin/pages/edit/EditOfficer.vue";
import EditPages_CONSTITUTION from "@/admin/pages/edit/ByLaws.vue";

import Settings from "@/admin/pages/AdminSetting.vue";
import Settings_PASSWORD from "@/admin/pages/setting/SettingPassword.vue";
import Settings_COLORS from "@/admin/pages/setting/SettingColor.vue";

import DevLogs from "@/admin/pages/DevLogs.vue";
import InvalidAdmin from "@/admin/pages/InvalidPage.vue";

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
    { path: "/profile", component: Profile, meta: { needsAuth: true } },
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
      component: Hamfest,
      name: "hamfest",
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
      path: "/admin1",
      component: adminPage,
      name: "admin1",
      meta: { needsAuth: true },
      children: [
        { path: "404", component: InvalidAdmin },
        { path: "", redirect: "admin/dashboard", meta: { needsAuth: true } },
        {
          path: "dashboard",
          component: DashBoard,
          name: "dash",
          meta: { needsAuth: true },
          children: [
            {
              path: "email",
              component: DashBoard_EMAIL,
              meta: { needsAuth: true },
            },
            {
              path: "donations",
              component: DashBoard_DONATIONS,
              meta: { needsAuth: true },
            },
            {
              path: "visitors",
              component: DashBoard_VISITORS,
              meta: { needsAuth: true },
            },
            {
              path: "/:catchAll(.*)",
              redirect: "/test34534553345534345345",
              name: "NotFound",
            },
          ],
        },
        {
          path: "edit",
          component: EditPages,
          name: "edit",
          meta: { needsAuth: true },
          children: [
            {
              path: "banner",
              component: EditPages_BANNER,
              meta: { needsAuth: true },
            },
            {
              path: "net",
              component: EditPages_NETS,
              meta: { needsAuth: true },
            },
            {
              path: "repeater",
              component: EditPages_REPEATERS,
              meta: { needsAuth: true },
            },
            {
              path: "officer",
              component: EditPages_OFFICERS,
              meta: { needsAuth: true },
            },
            {
              path: "dmr",
              component: EditPages_DMR,
              meta: { needsAuth: true },
            },
            {
              path: "roster",
              component: EditPages_ROSTER,
              meta: { needsAuth: true },
            },
            {
              path: "meeting",
              component: EditPages_MEETING,
              meta: { needsAuth: true },
            },
            {
              path: "constitution",
              component: EditPages_CONSTITUTION,
              meta: { needsAuth: true },
            },
            { path: "/:catchAll(.*)", redirect: "404", name: "NotFound" },
            { path: "404", component: InvalidAdmin },
          ],
        },
        {
          path: "settings",
          component: Settings,
          name: "settings",
          meta: { needsAuth: true },
          children: [
            {
              path: "password",
              component: Settings_PASSWORD,
              meta: { needsAuth: true },
            },
            {
              path: "color",
              component: Settings_COLORS,
              meta: { needsAuth: true },
            },
            { path: "/:catchAll(.*)", redirect: "404", name: "NotFound" },
            { path: "404", component: InvalidAdmin, meta: { needsAuth: true } },
          ],
        },
        { path: "devlogs", component: DevLogs, meta: { needsAuth: true } },
        { path: "/:catchAll(.*)", redirect: "admin/404" },
      ],
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

export default router;
