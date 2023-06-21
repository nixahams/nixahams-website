import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const app = createApp(App);

app.use(BootstrapVue);
app.use(IconsPlugin);
app.use(router);

app.config.productionTip = false;

app.mount("#app");
