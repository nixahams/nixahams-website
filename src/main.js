import { createApp } from "vue";
import App from "../App.vue";
import router from "./router"; // Router configuration
import { createPinia } from "pinia"; // State management
import VueCookies from "vue-cookies";
import axios from "./utils/axiosClient"; // Centralized Axios configuration
import { useUserStore } from "./stores/userStore"; // User store

// Bootstrap and Font Awesome
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

// Create Vue app instance
const app = createApp(App);

// Install plugins
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(VueCookies, { expires: "7d" }); // Optional: Only include if cookies are necessary

const userStore = useUserStore();
userStore.hydrate();

// Register global components
app.component("font-awesome-icon", FontAwesomeIcon);

// Mount the app
app.mount("#app");
