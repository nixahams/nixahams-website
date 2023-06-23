import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";
import axios from "axios";

// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fas);
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// User Instance
const user = createStore({
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

axios.defaults.baseURL = "http://localhost:4001";

const app = createApp(App);
app.use(router);
app.use(user);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
