import AdminPage from "@/admin/pages/AdminPage.vue";
import RepeaterAdmin from "@/admin/pages/RepeaterAdmin.vue";

export const adminRoutes = [
  {
    path: "/admin",
    component: AdminPage,
    meta: {
      requiresAuth: true,
      allowedRoles: ["Admin", "Officer"],
    },
    children: [
      {
        path: "", // Default admin route
        name: "AdminDashboard",
        component: () => import("@/admin/pages/DashboardAdmin.vue"),
      },
      {
        path: "repeaters",
        name: "AdminRepeaters",
        component: RepeaterAdmin,
      },
      {
        path: "announcements",
        name: "AdminAnnouncements",
        component: () => import("@/admin/pages/AnnouncementAdmin.vue"),
      },
      {
        path: "meetings",
        name: "AdminMeetings",
        component: () => import("@/admin/pages/MeetingAdmin.vue"),
      },
      {
        path: "members",
        name: "AdminMembers",
        component: () => import("@/admin/pages/MemberAdmin.vue"),
      },
      {
        path: "officers",
        name: "AdminOfficers",
        component: () => import("@/admin/pages/OfficerAdmin.vue"),
      },
      {
        path: "nets",
        name: "AdminNets",
        component: () => import("@/admin/pages/NetAdmin.vue"),
      },
    ],
  },
];
