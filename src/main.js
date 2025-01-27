import { createApp } from "vue";
import App from "../App.vue";
import router from "./router"; // Router configuration
import { createPinia } from "pinia"; // State management
import VueCookies from "vue-cookies";
import axios from "./utils/axiosClient"; // Centralized Axios configuration
import { useUserStore } from "./stores/userStore"; // User store
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Bootstrap and Font Awesome
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

// Toast configuration
const toastOptions = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
};

// Create Vue app instance
const app = createApp(App);

// Install plugins
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(VueCookies, { expires: "7d" }); // Optional: Only include if cookies are necessary
app.use(Toast, toastOptions);

const userStore = useUserStore();
userStore.hydrate();

// Register global components
app.component("font-awesome-icon", FontAwesomeIcon);

// Mount the app
app.mount("#app");
