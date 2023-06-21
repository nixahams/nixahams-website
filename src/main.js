import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'




createApp(App)
// .use(BootstrapVue)
// .use(IconsPlugin)
.use(router)
.component('icon', FontAwesomeIcon)
.mount("#app")

