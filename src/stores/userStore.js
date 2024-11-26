import { defineStore } from "pinia";
import axios from "../utils/axiosClient";

/**
 * This store manages the user state. It is responsible for handling user
 * roles, authentication, and user data.
 */

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
    roles: [],
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => state.user !== null,
    isUser: (state) => state.roles.includes("user"),
    isMember: (state) => state.roles.includes("member"),
    isTech: (state) => state.roles.includes("tech"),
    isHamfestAdmin: (state) => state.roles.includes("hamfest_admin"),
    isOfficer: (state) => state.roles.includes("officer"),
    isAdmin: (state) => state.roles.includes("admin"),
  },

  actions: {
    async hydrate() {
      try {
        this.loading = true;
        const response = await axios.get("/v1/auth");
        this.user = response.data.user;
        this.roles = response.data.roles || [];
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },

    login(email, password) {
      // Use axios to authenticate the user
      this.loading = true;
      try {
        const credentials = { email: email, password: password };
        axios.post("/v1/auth/login", credentials).then((response) => {
          this.user = response.data.user;
          this.roles = response.data.roles;
          this.loading = false;
        });
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    logout() {
      // Use axios to logout the user
      this.loading = true;
      try {
        axios.post("/v1/auth/logout").then(() => {
          this.user = null;
          this.roles = [];
          this.loading = false;
        });
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
  },
});
