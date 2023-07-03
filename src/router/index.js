import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/HomePage.vue";
import Nets from "../pages/NetsPage.vue";
import Nets_Regional from "../pages/RegionalNetsPage.vue";
import Nets_Preamble from "../pages/PreambleNetsPage.vue";
import Nets_Interest from "../pages/InterestNetsPage.vue";
import Repeaters from "../pages/RepeatersPage.vue";
import Meetings from "../pages/MeetingPage.vue";
import Roster from "../pages/RosterPage.vue";
import DMR from "../pages/DMRPage.vue";
import Bylaw from "../pages/BylawPage.vue";
import Officers from "../pages/OfficersPage.vue";
import Invalid from "../pages/InvalidPage.vue";
import Contact from "../pages/ContactPage.vue";
import Alpha from "../pages/AlphaPage.vue";
import Account from "../pages/AccountPage.vue";



import adminPage from "../adminpages/testAdmin.vue";
import Profile from "../pages/ProfilePage.vue";

// import Donate from '../pages/DonationPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/nets", component: Nets },
    { path: "/nets/regional", component: Nets_Regional },
    { path: "/nets/preamble", component: Nets_Preamble },
    { path: "/nets/interest", component: Nets_Interest },
    { path: "/repeaters", component: Repeaters },
    { path: "/meetings", component: Meetings },
    { path: "/roster", component: Roster },
    { path: "/dmr", component: DMR },
    { path: "/bylaws", component: Bylaw },
    { path: "/officers", component: Officers },
    { path: "/contact", component: Contact },
    { path: "/alpha", component: Alpha },
    { path: "/profile", component: Profile },
    //props method creates a prop from URL query
    { path: "/account", component: Account, name: "Account",props(route) {return {  method: route.query.method }}},
    // { path: '/donate', component: Donate},
    // { path: "/:pathMatch(.*)*", component: Invalid },

    { path: "/testlogin", component: adminPage,
      beforeEnter: (to, from, next) => {
        guard(to, from, next);
      }
    },
    
    { path: "/:catchAll(.*)", redirect: '/404', name: "NotFound",},
    {
      path: '/404',
      name: 'PageNotExist',
      component: () => Invalid
    }
  ],
});



//check login status before rendering component
import axios from 'axios';
const guard = function(to, from, next) {
  // check for valid auth token
  // const herokuURL = `http://localhost:4001`

  axios.get("/users/isloggedin").then(response => {
      // Token is valid, so continue
      console.log(response)
      next();
  }).catch(error => {
      // There was an error so redirect
      console.log(error)
      window.location.href = "/";
  })
};

export default router;
