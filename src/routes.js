import Home from './pages/HomePage.vue';
import About from './pages/AboutPage.vue';
import Repeaters from './pages/RepeatersPage.vue';
import Roster from './pages/RosterPage.vue';
import Announcements from './pages/AnnouncePage.vue';
import Contact from './pages/ContactPage.vue';
import Media from './pages/MediaPage.vue';
import Staff from './pages/StaffPage.vue';
import Donate from './pages/DonationPage.vue';
import Alpha from './pages/AlphaPage.vue';
import Invalid from './pages/InvalidPage.vue';

import Success from './pages/SuccessPage.vue';
import Cancel from './pages/CancelPage.vue';

export default[
    { path: '/', component: Home},
    { path: '/about', component: About},
    { path: '/repeaters', component: Repeaters},
    { path: '/about', component: About},
    { path: '/roster', component: Roster},
    { path: '/announcements', component: Announcements},
    { path: '/contact', component: Contact},
    { path: '/media', component: Media},
    { path: '/staff', component: Staff},
    { path: '/donate', component: Donate},
    { path: '/alpha', component: Alpha},
    { path: '*', component: Invalid},

    { path: '/success', component: Success},
    { path: '/cancel', component: Cancel},
];