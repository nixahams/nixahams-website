import Home from './pages/HomePage.vue';
import About from './pages/AboutPage.vue';
import Repeaters from './pages/RepeatersPage.vue';
import Roster from './pages/RosterPage.vue';
import Announcements from './pages/AnnouncePage.vue';
import Contacts from './pages/ContactPage.vue';
import Media from './pages/MediaPage.vue';
import Staff from './pages/StaffPage.vue';
import Invalid from './pages/InvalidPage.vue';

export default[
    { path: '/', component: Home},
    { path: '/about', component: About},
    { path: '/repeaters', component: Repeaters},
    { path: '/about', component: About},
    { path: '/roster', component: Roster},
    { path: '/announcements', component: Announcements},
    { path: '/contacts', component: Contacts},
    { path: '/media', component: Media},
    { path: '/staff', component: Staff},
    { path: '*', component: Invalid},
];