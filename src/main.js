import { createApp } from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const app = createApp({});

app.use(BootstrapVue);
app.use(IconsPlugin);
app.use(VueRouter); //enables routing

const router = new VueRouter({
  routes,
}); //routes stores in an array of objects

app.use(router);

app.config.productionTip = false;

app.mount("#app");
