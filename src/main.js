import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import {library} from '@fortawesome/fontawesome-svg-core'
library.add(fas);
import {fas} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'




createApp(App)
// .use(BootstrapVue)
// .use(IconsPlugin)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount("#app")

