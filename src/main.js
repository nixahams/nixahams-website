<<<<<<< HEAD
import { createApp } from "vue";
import App from "../App.vue";
import router from "./router";
import { createStore } from "vuex";
import createPersistedState from "vuex-plugin-persistedstate";
import axios from "axios";

// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fas);
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// User Instance
const store = createStore({
  plugins: [createPersistedState()],
  state() {
    return {
      loggedIn: false,
      user: {},
    };
  },
  mutations: {
    changeLoggedIn(state, payload) {
      state.loggedIn = payload;
    },
    changeUser(state, payload) {
      state.user = payload;
    },
  },
  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },
    user(state) {
      return state.user;
    },
  },
});

//check if route needs auth
router.beforeEach((to, from, next) => {
  // console.log(store.state.user)
  // console.log("This route needs Auth: ", to.meta.needsAuth)
  let user = store.state.user;
  if (to.meta.needsAuth) {
    if (store.state.user.callsign === undefined) {
      next("/account?method=login");
    }
    axios({
      method: "post",
      url: "/users/login",
      data: {
        username: user.email,
        password: user.password,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (!!res.data.callsign) {
          next("/account?method=login");
        } else {
          next();
        }
      })
      .catch((error) => {
        console.log(error);
        next("/account?method=login");
      });
  } else {
    next();
  }
});

//http://localhost:4001/
//axios.defaults.baseURL = "https://strp-wbhk-1234.herokuapp.com";
axios.defaults.baseURL = "http://localhost:4001/";
import VueCookies from "vue-cookies";

const app = createApp(App);
app
  .use(router)
  .use(store)
  .use(VueCookies, { expires: "7d" })
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
=======
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon)

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
>>>>>>> master
