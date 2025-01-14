import { defineStore } from "pinia";
import axios from "../utils/axiosClient";

/**
 * This store manages the user state. It is responsible for handling user
 * roles, authentication, and user data.
 */

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: (() => {
      try {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
      } catch (e) {
        return null;
      }
    })(),
    roles: (() => {
      try {
        const rolesData = localStorage.getItem("roles");
        return rolesData ? JSON.parse(rolesData) : [];
      } catch (e) {
        return [];
      }
    })(),
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
        this.setUser(response.data.user);
        this.setRoles(response.data.roles || []);
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
        // Clear stored data if auth check fails
        this.clearAuth();
      }
    },

    setUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    setRoles(roles) {
      this.roles = roles;
      localStorage.setItem("roles", JSON.stringify(roles));
    },

    clearAuth() {
      this.user = null;
      this.roles = [];
      localStorage.removeItem("user");
      localStorage.removeItem("roles");
    },

    async login(email, password) {
      this.loading = true;
      try {
        const credentials = { email, password };
        const response = await axios.post("/v1/auth/login", credentials);
        this.setUser(response.data.user);
        this.setRoles(response.data.roles);
        await this.hydrate();
        this.loading = false;
        return true;
      } catch (error) {
        console.error(error);
        this.loading = false;
        return false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        await axios.post("/v1/auth/logout");
        this.clearAuth();
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
  },
});
