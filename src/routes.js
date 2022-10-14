import Home from './pages/HomePage.vue';
import About from './pages/AboutPage.vue';
import Repeaters from './pages/RepeatersPage.vue';
import Roster from './pages/RosterPage.vue';
import Newsletter from './pages/NewsLetterPage.vue';
import Contacts from './pages/ContactPage.vue';
import Meetings from './pages/MeetingPage.vue';
import Invalid from './pages/InvalidPage.vue';

export default[
    { path: '/', component: Home},
    { path: '/about', component: About},
    { path: '/repeaters', component: Repeaters},
    { path: '/about', component: About},
    { path: '/roster', component: Roster},
    { path: '/newsletter', component: Newsletter},
    { path: '/contacts', component: Contacts},
    { path: '/meetings', component: Meetings},
    { path: '/404', component: Invalid},
];