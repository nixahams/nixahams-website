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
import Alpha from "@/pages/AlphaPage.vue";
import Account from "@/pages/AccountPage.vue";
// import Donate from '@/pages/DonationPage.vue';



import Profile from "@/pages/ProfilePage.vue";

//admin routes
import adminPage from "@/admin/testAdmin.vue";
import DashBoard from '@/admin/pages/AdminDash.vue';
// import DashBoard_EMAIL from '@/admin/pages/dashboard/DashEmail.vue';
// import DashBoard_DONATIONS from '@/admin/pages/dashboard/DashDonate.vue';
// import DashBoard_VISITORS from '@/admin/pages/dashboard/DashVisitor.vue';

// import EditPages from '@/admin/pages/AdminEdit.vue';
// import EditPages_BANNER from '@/admin/pages/edit/EditBanner.vue';
// import EditPages_NETS from '@/admin/pages/edit/EditNet.vue';
// import EditPages_REPEATERS from '@/admin/pages/edit/EditRepeater.vue';
// import EditPages_MEETING from '@/admin/pages/edit/EditMeeting.vue';
// import EditPages_DMR from '@/admin/pages/edit/EditDmr.vue';
// import EditPages_ROSTER from '@/admin/pages/edit/EditRoster.vue';
// import EditPages_OFFICERS from '@/admin/pages/edit/EditOfficer.vue';
// import EditPages_CONSTITUTION from '@/admin/pages/edit/ByLaws.vue';

// import Settings from '@/admin/pages/AdminSetting.vue';
// import Settings_PASSWORD from '@/admin/pages/setting/SettingPassword.vue';
// import Settings_COLORS from '@/admin/pages/setting/SettingColor.vue';

// import DevLogs from '@/admin/pages/DevLogs.vue';
import InvalidAdmin from '@/admin/pages/InvalidPage.vue';



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, name: "home" },
    { path: "/nets", component: Nets, name: "nets"},
    { path: "/nets/regional", component: Nets_Regional, name: "regional"},
    { path: "/nets/preamble", component: Nets_Preamble, name: "preamble"},
    { path: "/nets/interest", component: Nets_Interest, name: "interest"},
    { path: "/repeaters", component: Repeaters, name: "repeaters" },
    { path: "/meetings", component: Meetings, name: "meetings" },
    { path: "/roster", component: Roster, name: "roster" },
    { path: "/dmr", component: DMR, name: "dmr" },
    { path: "/bylaws", component: Bylaw, name: "bylaws" },
    { path: "/officers", component: Officers, name: "officers" },
    { path: "/contact", component: Contact, name: "contact" },
    { path: "/alpha", component: Alpha},
    { path: "/profile", component: Profile},
    //props method creates a prop from URL query
    { path: "/account", component: Account, name: "Account",props(route) {return {  method: route.query.method }}},
    // { path: '/donate', component: Donate},
    // { path: "/:pathMatch(.*)*", component: Invalid },

    { 
      path: '/admin', 
      component: adminPage, 
      name: 'admin',
      meta: { needsAuth: true },
      children: [
        { path: '/', redirect: '/dashboard'},
        { path: '/dashboard', component: DashBoard},
        { path: '/404', component: InvalidAdmin},
        { path: "/:catchAll(.*)", redirect: '404'},
      ],
    },
    
    { path: "/:catchAll(.*)", redirect: '/404', name: "NotFound",},
    {
      path: '/404',
      name: 'PageNotExist',
      component: () => Invalid
    }
  ],
});


router.beforeEach((to, from, next) => {
  //check if route needs auth
  if(to.meta.needsAuth)
  {
    console.log()
    next();
    return
    let self = this;
    axios({
      method: "post",
      url: "/users/login",
      data: {
        username: self.email,
        password: self.password,
      },
      withCredentials: true,
    })
    .then((res) => {
      next();
    })
    .catch((error) => {
      console.log(error)
      next('/login')
    });
  }else{
    next();
  }
})





export default router;
