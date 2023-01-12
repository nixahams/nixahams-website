import Home from './pages/HomePage.vue';
// import About from './pages/AboutPage.vue';
import Repeaters from './pages/RepeatersPage.vue';
import Roster from './pages/RosterPage.vue';
import Nets from './pages/NetsPage.vue';
import Contact from './pages/ContactPage.vue';
import History from './pages/HistoryPage.vue';
import Officers from './pages/OfficersPage.vue';
import Donate from './pages/DonationPage.vue';
import Alpha from './pages/AlphaPage.vue';
import Invalid from './pages/InvalidPage.vue';

import Success from './pages/SuccessPage.vue';
import Cancel from './pages/CancelPage.vue';

export default[
    { path: '/', component: Home},
    // { path: '/about', component: About},
    { path: '/repeaters', component: Repeaters},
    { path: '/roster', component: Roster},
    { path: '/nets', component: Nets},
    { path: '/contact', component: Contact},
    { path: '/history', component: History},
    { path: '/officers', component: Officers},
    { path: '/donate', component: Donate},
    { path: '/alpha', component: Alpha},
    { path: '*', component: Invalid},

    { path: '/success', component: Success},
    { path: '/cancel', component: Cancel},
];