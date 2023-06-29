import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter); //enables routing

const router = new VueRouter({
  routes,
}); //routes stores in an array of objects

Vue.config.productionTip = false;

// Set up Axios
axios.defaults.baseURL = "https://strp-wbhk-1234.herokuapp.com";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
