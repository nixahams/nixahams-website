import Home from "./pages/HomePage.vue";
import Nets from "./pages/NetsPage.vue";
import Nets_Regional from "./pages/RegionalNetsPage.vue";
import Nets_Preamble from "./pages/PreambleNetsPage.vue";
import Nets_Interest from "./pages/InterestNetsPage.vue";
import Repeaters from "./pages/RepeatersPage.vue";
import Meetings from "./pages/MeetingPage.vue";
import Roster from "./pages/RosterPage.vue";
// import History from './pages/HistoryPage.vue';
import DMR from "./pages/DMRPage.vue";
import Bylaw from "./pages/BylawPage.vue";
import Officers from "./pages/OfficersPage.vue";
// import Donate from './pages/DonationPage.vue';
import Contact from "./pages/ContactPage.vue";
import Testing from "./pages/TestingPage.vue";
import Invalid from "./pages/InvalidPage.vue";

import Alpha from "./pages/AlphaPage.vue";
import Success from "./pages/SuccessPage.vue";

import adminPage from "./pages/testAdmin.vue";
// import About from './pages/AboutPage.vue';

export default [
  { path: "/", component: Home },
  { path: "/nets", component: Nets },
  { path: "/nets/regional", component: Nets_Regional },
  { path: "/nets/preamble", component: Nets_Preamble },
  { path: "/nets/interest", component: Nets_Interest },
  { path: "/repeaters", component: Repeaters },
  { path: "/meetings", component: Meetings },
  { path: "/roster", component: Roster },
  // { path: '/history', component: History},
  { path: "/dmr", component: DMR },
  { path: "/bylaws", component: Bylaw },
  { path: "/officers", component: Officers },
  // { path: '/donate', component: Donate},
  { path: "/contact", component: Contact },
  { path: "/testing", component: Testing },
  { path: "*", component: Invalid },

  { path: "/alpha", component: Alpha },
  { path: "/success", component: Success },

  { path: "/testlogin", component: adminPage,
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    }
  },
  // { path: '/about', component: About},
];

import axios from 'axios';

//check login status before rendering component
const guard = function(to, from, next) {
  // check for valid auth token
  const herokuURL = `http://localhost:4001`

  axios.get(herokuURL+"/users/isloggedin").then(response => {
      // Token is valid, so continue
      console.log(response)
      next();
  }).catch(error => {
      // There was an error so redirect
      console.log(error)
      window.location.href = "#/";
  })
};